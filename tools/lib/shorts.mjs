// Shorts of a video, from shorts.yaml. Two kinds:
//  - standalone (recommended): the Short has its own scenes and its own narration (`say`), recorded
//    as audio/short-N.wav, timed into audio/short-N-words.json, built on its own;
//  - cut (older videos): `scenes: [S01, S08]` reuses the long video's scenes and cuts its narration.
import fs from "node:fs";
import path from "node:path";
import { readYaml, readJson, ffprobeDuration } from "./core.mjs";
import { AUDIO_EXT } from "./video.mjs";
import { buildTiming, syntheticWords, tokens } from "./timing.mjs";

export const SHORT_AUDIO_RE = /^short-(\d+)\.[a-z0-9]+$/i;

export function loadShorts(dir) {
  const spec = readYaml(path.join(dir, "shorts.yaml"), { shorts: [] }) ?? { shorts: [] };
  return (spec.shorts ?? []).map((sh, i) => {
    const n = i + 1;
    const standalone = Array.isArray(sh.scenes) && sh.scenes.length > 0 && typeof sh.scenes[0] === "object";
    const words = standalone ? sh.scenes.reduce((s, sc) => s + tokens(sc.say).length, 0) : 0;
    return { n, spec: sh, title: sh.title ?? `Short ${n}`, standalone, scenes: standalone ? sh.scenes : null, words };
  });
}

/** The recording the user dropped for Short n (audio/short-n.wav, .mp3 …), or null. */
export function shortRawAudio(dir, n) {
  const a = path.join(dir, "audio");
  if (!fs.existsSync(a)) return null;
  const f = fs.readdirSync(a).find((x) => x.toLowerCase().startsWith(`short-${n}.`) && AUDIO_EXT.includes(path.extname(x).toLowerCase()));
  return f ? path.join(a, f) : null;
}
/** Files made by transcribe for Short n. */
export const shortFiles = (dir, n) => ({ wav: path.join(dir, "audio", `_short-${n}.wav`), words: path.join(dir, "audio", `short-${n}-words.json`) });

export function shortTimed(dir, n) {
  const f = shortFiles(dir, n);
  if (!fs.existsSync(f.wav) || !fs.existsSync(f.words)) return false;
  const raw = shortRawAudio(dir, n);
  return !raw || fs.statSync(f.words).mtimeMs >= fs.statSync(raw).mtimeMs;
}

/** Timing for a standalone Short: from its own recording if timed, else a silent ~150 wpm draft. */
export function standaloneTiming(dir, short) {
  const f = shortFiles(dir, short.n);
  if (shortTimed(dir, short.n)) {
    return { timing: buildTiming(short.scenes, readJson(f.words), ffprobeDuration(f.wav)), audio: f.wav, draft: false };
  }
  const { words, duration } = syntheticWords(short.scenes);
  return { timing: buildTiming(short.scenes, words, duration), audio: null, draft: true };
}
