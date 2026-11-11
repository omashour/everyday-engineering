// Checks a scenes.yaml before anything is built, so mistakes surface early and cheaply.
import fs from "node:fs";
import path from "node:path";
import { loadComponents } from "./components.mjs";
import { tokens, cueTime } from "./timing.mjs";
import { iconExists } from "./kit.mjs";

const ID_RE = /^[A-Za-z][A-Za-z0-9_]*$/;

export async function validateVideo(v, { format = "long" } = {}) {
  const reg = await loadComponents();
  const out = [];
  const err = (msg) => out.push({ level: "error", msg });
  const warn = (msg) => out.push({ level: "warn", msg });
  const seen = new Set();
  let words = 0;
  v.scenes.forEach((s, i) => {
    const where = `scene ${i + 1} (${s.id ?? "no id"})`;
    if (!s.id || !ID_RE.test(s.id)) err(`${where}: id must start with a letter and use only letters/digits, e.g. S01`);
    if (seen.has(s.id)) err(`${where}: duplicate id`);
    seen.add(s.id);
    const comp = reg[s.component];
    if (!comp) {
      err(`${where}: unknown component "${s.component}". Known: ${Object.keys(reg).sort().join(", ")}`);
      return;
    }
    for (const r of comp.required ?? []) if (s.params?.[r] == null) err(`${where}: ${s.component} needs params.${r}`);
    const say = String(s.say ?? "").trim();
    if (!say) warn(`${where}: no narration (say:) — the scene will only last 0.8 s`);
    const n = tokens(say).length;
    words += n;
    // cues must be words that are actually spoken in this scene
    const fakeTiming = { start: 0, tokens: tokens(say), tokenTimes: tokens(say).map((_, k) => k) };
    for (const c of collectCues(s.params)) {
      if (typeof c === "number") continue;
      const want = tokens(c);
      const t = fakeTiming.tokens;
      const found = want.length && t.some((_, k) => want.every((w, j) => t[k + j] === w));
      if (!found) (cueTime(fakeTiming, c) == null ? err : warn)(`${where}: cue "${c}" is not ${cueTime(fakeTiming, c) == null ? "" : "exactly "}in this scene's narration`);
    }
    // files and icons
    for (const src of collect(s.params, (k) => k === "src")) {
      if (typeof src === "string" && !src.startsWith("brand:") && !fs.existsSync(path.join(v.dir, "assets", src))) warn(`${where}: missing asset assets/${src} (see assets-needed.md)`);
    }
    for (const name of collectIcons(s.params)) if (!iconExists(name)) warn(`${where}: unknown icon "${name}" (browse https://tabler.io/icons)`);
  });
  if (v.scenes.length && !["end-card"].includes(v.scenes.at(-1).component)) warn("last scene is not an end-card");
  const first = tokens(v.scenes[0]?.say).length;
  if (format === "long" && first > 50) warn(`hook scene is ${first} words (~${Math.round(first / 2.5)} s). Keep the hook under ~15 s (≈40 words).`);
  const minutes = words / 150;
  if (format === "long" && (minutes < 5 || minutes > 13)) warn(`narration is ${words} words ≈ ${minutes.toFixed(1)} min at 150 wpm (target 6–12 min)`);
  out.words = words;
  out.minutes = minutes;
  return out;
}

function collect(obj, test, acc = []) {
  if (Array.isArray(obj)) obj.forEach((x) => collect(x, test, acc));
  else if (obj && typeof obj === "object") for (const [k, val] of Object.entries(obj)) { if (test(k, val)) acc.push(val); else collect(val, test, acc); }
  return acc;
}
export function collectCues(params) {
  const acc = [];
  collect(params, (k, val) => {
    if (k === "cue" || k.endsWith("_cue")) { acc.push(val); return true; }
    if (k === "row_cues" && Array.isArray(val)) { acc.push(...val); return true; }
    if (k === "cues" && val && typeof val === "object" && !Array.isArray(val)) { acc.push(...Object.values(val)); return true; }
    return false;
  });
  return acc.filter((c) => c != null && c !== "");
}
function collectIcons(params) {
  const acc = [];
  collect(params, (k, val) => {
    if (k === "icon" && typeof val === "string") { acc.push(val); return true; }
    return false;
  });
  collect(params, (k, val) => {
    if (k === "items" && Array.isArray(val)) val.forEach((it) => it?.type === "icon" && it.name && acc.push(it.name));
    return false;
  });
  return acc;
}
