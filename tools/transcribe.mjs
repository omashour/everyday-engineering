// npm run transcribe -- 001
// Joins the narration file(s) in audio/ into audio/narration-full.wav and writes
// word-level timestamps to audio/words.json — all on this PC, no Claude needed.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { parseArgs, videoDir, fail, ok, info, run, hf, readJson, writeJson, rel, readYaml, P } from "./lib/core.mjs";
import { rawAudioFiles } from "./lib/video.mjs";
import { saveAndPush } from "./lib/git.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const files = rawAudioFiles(dir);
if (!files.length) fail(`No audio in ${rel(path.join(dir, "audio"))}/. Save your Gemini narration there (one file, or numbered chunks narration-01.wav, narration-02.wav…).`);

const voice = readYaml(path.join(P.channel, "voice.yaml"));
const gap = voice.transcription?.chunk_gap_s ?? 0.35;
const full = path.join(dir, "audio", "narration-full.wav");
info(`Joining ${files.length} file(s): ${files.map((f) => path.basename(f)).join(", ")}`);
const inputs = files.flatMap((f) => ["-i", `"${f}"`]);
const filter =
  files.map((_, i) => `[${i}:a]aresample=48000,aformat=channel_layouts=mono${i < files.length - 1 ? `,apad=pad_dur=${gap}` : ""}[a${i}]`).join(";") +
  ";" + files.map((_, i) => `[a${i}]`).join("") + `concat=n=${files.length}:v=0:a=1[out]`;
if (run("ffmpeg", ["-y", "-v", "error", ...inputs, "-filter_complex", `"${filter}"`, "-map", "[out]", "-c:a", "pcm_s16le", `"${full}"`]) !== 0) fail("FFmpeg could not join the audio files.");
ok(`Wrote ${rel(full)}`);

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ee-tx-"));
const model = voice.transcription?.model ?? "small.en";
info(`Transcribing locally (model: ${model}; uses Parakeet automatically if installed)…`);
const r = hf(["transcribe", full, "--model", model, "--language", "en", "-d", tmp, "--json"], { capture: true });
const line = r.out.split(/\r?\n/).reverse().find((l) => l.trim().startsWith("{\"ok\""));
const res = line ? JSON.parse(line) : null;
if (!res?.ok || !fs.existsSync(res.transcriptPath)) fail(`Transcription failed:\n${r.out.slice(-1500)}`);
const words = readJson(res.transcriptPath).map(({ text, start, end }) => ({ text, start, end }));
writeJson(path.join(dir, "audio", "words.json"), words);
fs.rmSync(tmp, { recursive: true, force: true });
ok(`${words.length} words timed (${res.engine}) → ${rel(path.join(dir, "audio", "words.json"))}`);
saveAndPush(`${path.basename(dir).slice(0, 3)}: narration timing`);
info(`Next: npm run build -- ${path.basename(dir).slice(0, 3)}`);
