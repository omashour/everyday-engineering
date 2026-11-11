// Load one video folder: scenes.yaml, audio, words, timing.
import fs from "node:fs";
import path from "node:path";
import { readYaml, readJson, ffprobeDuration } from "./core.mjs";
import { buildTiming, syntheticWords } from "./timing.mjs";

export function loadVideo(dir) {
  const doc = readYaml(path.join(dir, "scenes.yaml"));
  if (!doc?.scenes?.length) throw new Error(`${path.basename(dir)}/scenes.yaml has no scenes`);
  return { dir, name: path.basename(dir), meta: doc.video ?? {}, scenes: doc.scenes };
}

export const AUDIO_EXT = [".wav", ".mp3", ".m4a", ".flac", ".ogg"];
/** The single narration file used for timing and the build (made by transcribe). */
export function narrationFile(dir) {
  const f = path.join(dir, "audio", "narration-full.wav");
  return fs.existsSync(f) ? f : null;
}
/** Raw audio files the user dropped in audio/ (Gemini chunks or one file). */
export function rawAudioFiles(dir) {
  const a = path.join(dir, "audio");
  if (!fs.existsSync(a)) return [];
  return fs
    .readdirSync(a)
    .filter((f) => AUDIO_EXT.includes(path.extname(f).toLowerCase()) && f !== "narration-full.wav" && !f.startsWith("_"))
    .sort((x, y) => x.localeCompare(y, undefined, { numeric: true }))
    .map((f) => path.join(a, f));
}

/** Timing from real audio if transcribed, else a ~150 wpm draft. */
export function videoTiming(v, { allowDraft = true } = {}) {
  const wordsFile = path.join(v.dir, "audio", "words.json");
  const audio = narrationFile(v.dir);
  if (audio && fs.existsSync(wordsFile)) {
    const words = readJson(wordsFile);
    const timing = buildTiming(v.scenes, words, ffprobeDuration(audio));
    return { timing, audio, draft: false };
  }
  if (!allowDraft) throw new Error("No transcribed audio yet. Put the narration in audio/ and run `npm run transcribe -- <id>`.");
  const { words, duration } = syntheticWords(v.scenes);
  return { timing: buildTiming(v.scenes, words, duration), audio: null, draft: true };
}
