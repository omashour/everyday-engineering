// npm run tts-pack -- 001
// From scenes.yaml (the single source of truth) write:
//   script.md  — the readable narration with scene markers and estimated times
//   tts.md     — everything needed to record the voice in Gemini 3.8 Flash TTS
import fs from "node:fs";
import path from "node:path";
import { parseArgs, videoDir, ok, info, rel } from "./lib/core.mjs";
import { loadVideo } from "./lib/video.mjs";
import { ttsPack } from "./lib/ttspack.mjs";
import { saveAndPush } from "./lib/git.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const v = loadVideo(dir);
const p = ttsPack(v);
fs.writeFileSync(path.join(dir, "script.md"), p.scriptMd);
fs.writeFileSync(path.join(dir, "tts.md"), p.ttsMd);
fs.mkdirSync(path.join(dir, "audio"), { recursive: true });
ok(`Wrote ${rel(path.join(dir, "script.md"))} and ${rel(path.join(dir, "tts.md"))} (${p.chunks.length} chunk(s), ${p.totalWords} words, ~${p.length})`);
saveAndPush(`${v.name.slice(0, 3)}: script and voice package`);
info("Record the chunks in Gemini, save them in audio/, then: npm run transcribe -- <id>");
