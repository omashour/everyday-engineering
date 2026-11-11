// Narration timing: line the script (scenes[].say) up with transcribed words,
// so every scene and every `at:` cue lands exactly when it is spoken.
// Works without Claude: a token-level sequence alignment (Needleman–Wunsch).

const NUM_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

export function norm(word) {
  let w = String(word).toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9.%]/g, "");
  w = w.replace(/\.$/, "");
  if (/^\d+$/.test(w) && +w <= 10) w = NUM_WORDS[+w];
  return w;
}
export function tokens(text) {
  return String(text ?? "")
    .replace(/[—–-]/g, " ")
    .split(/\s+/)
    .map(norm)
    .filter(Boolean);
}

/** Align token arrays a (script) and b (transcript). Returns map aIndex -> bIndex | -1. */
export function alignTokens(a, b) {
  const n = a.length, m = b.length;
  const W = m + 1;
  const cost = new Uint32Array((n + 1) * W);
  const move = new Uint8Array((n + 1) * W); // 1 diag, 2 up (skip a), 3 left (skip b)
  for (let i = 1; i <= n; i++) { cost[i * W] = i; move[i * W] = 2; }
  for (let j = 1; j <= m; j++) { cost[j] = j; move[j] = 3; }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const same = a[i - 1] === b[j - 1] || near(a[i - 1], b[j - 1]);
      const d = cost[(i - 1) * W + (j - 1)] + (same ? 0 : 2);
      const u = cost[(i - 1) * W + j] + 1;
      const l = cost[i * W + (j - 1)] + 1;
      let best = d, mv = 1;
      if (u < best) { best = u; mv = 2; }
      if (l < best) { best = l; mv = 3; }
      cost[i * W + j] = best;
      move[i * W + j] = mv;
    }
  }
  const map = new Array(n).fill(-1);
  let i = n, j = m;
  while (i > 0 || j > 0) {
    const mv = move[i * W + j];
    if (mv === 1) { map[i - 1] = j - 1; i--; j--; }
    else if (mv === 2) i--;
    else j--;
  }
  return map;
}
function near(x, y) {
  if (x.length < 4 || y.length < 4) return false;
  return x.startsWith(y.slice(0, 4)) && Math.abs(x.length - y.length) <= 2;
}

/**
 * Build timing for scenes.
 * @param scenes  [{id, say, ...}]
 * @param words   [{text,start,end}] transcript (or synthetic)
 * @param duration audio duration (s)
 * @returns {scenes: {id:{start,end,tokenTimes:[]}}, unmatchedRatio}
 */
export function buildTiming(scenes, words, duration) {
  const sceneTok = scenes.map((s) => tokens(s.say));
  const flat = sceneTok.flat();
  const wTok = words.map((w) => norm(w.text));
  const map = alignTokens(flat, wTok);
  // token -> time (start of aligned word; interpolate gaps)
  const times = map.map((j) => (j >= 0 ? words[j].start : null));
  const ends = map.map((j) => (j >= 0 ? words[j].end : null));
  fillGaps(times, 0, duration);
  fillGaps(ends, 0, duration);
  const matched = map.filter((j) => j >= 0).length;
  const out = {};
  let k = 0;
  scenes.forEach((s, idx) => {
    const n = sceneTok[idx].length;
    const tt = times.slice(k, k + n);
    const te = ends.slice(k, k + n);
    out[s.id] = { tokenTimes: tt, tokenEnds: te, tokens: sceneTok[idx], speechStart: tt[0] ?? 0, speechEnd: te[n - 1] ?? 0 };
    k += n;
  });
  // Scene windows: start a little before the first word, end where the next scene starts.
  const LEAD = 0.25;
  scenes.forEach((s, idx) => {
    const t = out[s.id];
    t.start = idx === 0 ? 0 : Math.max(0, t.speechStart - LEAD);
  });
  const TAIL = 1.2;
  scenes.forEach((s, idx) => {
    const t = out[s.id];
    const next = scenes[idx + 1];
    t.end = next ? out[next.id].start : Math.max(duration, t.speechEnd) + TAIL;
    if (t.end - t.start < 0.8) t.end = t.start + 0.8;
  });
  return { scenes: out, matchedRatio: flat.length ? matched / flat.length : 1, total: out[scenes.at(-1).id].end, audioDuration: duration };
}

function fillGaps(arr, lo, hi) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    if (arr[i] != null) continue;
    let p = i - 1; while (p >= 0 && arr[p] == null) p--;
    let q = i + 1; while (q < n && arr[q] == null) q++;
    const a = p >= 0 ? arr[p] : lo, b = q < n ? arr[q] : hi;
    const span = q - p;
    for (let r = Math.max(p + 1, 0); r < q && r < n; r++) arr[r] = a + ((b - a) * (r - p)) / span;
    i = q - 1;
  }
}

/** Find the time a phrase is spoken inside a scene. Returns null if not found. */
export function cueTime(sceneTiming, phrase) {
  if (phrase == null || phrase === "") return null;
  if (typeof phrase === "number") return sceneTiming.start + phrase; // seconds after scene start
  const want = tokens(phrase);
  const have = sceneTiming.tokens;
  if (!want.length) return null;
  for (let i = 0; i + want.length <= have.length; i++) {
    let okAll = true;
    for (let j = 0; j < want.length; j++) if (have[i + j] !== want[j]) { okAll = false; break; }
    if (okAll) return sceneTiming.tokenTimes[i];
  }
  // fallback: first word match
  const i = have.indexOf(want[0]);
  return i >= 0 ? sceneTiming.tokenTimes[i] : null;
}

/** Draft timing when there is no audio yet: ~150 words per minute. */
export function syntheticWords(scenes, wpm = 150) {
  const per = 60 / wpm;
  const words = [];
  let t = 0.4;
  for (const s of scenes) {
    for (const w of String(s.say ?? "").split(/\s+/).filter(Boolean)) {
      const extra = /[.!?]$/.test(w) ? 0.35 : /[,;:]$/.test(w) ? 0.15 : 0;
      words.push({ text: w, start: t, end: t + per * 0.85 });
      t += per + extra;
    }
    t += 0.5;
  }
  return { words, duration: t };
}
