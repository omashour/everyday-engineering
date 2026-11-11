// Captions (SRT) from the script's own words + the aligned narration timing.
// Using the script (not the transcript) keeps spelling, names and numbers exactly as written.
import { norm } from "./timing.mjs";

/** Original words of a scene, one per timing token (same split rule as tokens()). */
function scriptWords(say) {
  return String(say ?? "")
    .replace(/[—–-]/g, " ")
    .split(/\s+/)
    .filter((w) => norm(w));
}

const MAX_CHARS = 42; // one comfortable caption line
const MAX_DUR = 4.0;

export function buildCues(scenes, timing) {
  const cues = [];
  for (const s of scenes) {
    const t = timing.scenes[s.id];
    const words = scriptWords(s.say);
    if (!words.length || words.length !== t.tokens.length) continue;
    let cur = null;
    words.forEach((w, i) => {
      const start = t.tokenTimes[i], end = t.tokenEnds?.[i] ?? start + 0.3;
      if (!cur) cur = { start, end, text: w };
      else {
        const text = cur.text + " " + w;
        if (text.length > MAX_CHARS || end - cur.start > MAX_DUR) {
          cues.push(cur);
          cur = { start, end, text: w };
        } else {
          cur.text = text;
          cur.end = end;
        }
      }
      // break after sentence ends, so captions follow the speech rhythm
      if (/[.!?]["”']?$/.test(w) && cur.text.length > 12) {
        cues.push(cur);
        cur = null;
      }
    });
    if (cur) cues.push(cur);
  }
  // no overlaps, small minimum duration
  for (let i = 0; i < cues.length; i++) {
    const next = cues[i + 1];
    if (cues[i].end - cues[i].start < 0.7) cues[i].end = cues[i].start + 0.7;
    if (next && cues[i].end > next.start) cues[i].end = next.start - 0.01;
  }
  return cues;
}

const ts = (s) => {
  const ms = Math.max(0, Math.round(s * 1000));
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), sec = Math.floor((ms % 60000) / 1000), r = ms % 1000;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")},${String(r).padStart(3, "0")}`;
};
export function toSrt(cues) {
  return cues.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${c.text}\n`).join("\n");
}
