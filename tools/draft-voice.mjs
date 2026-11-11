// npm run draft-voice -- 001
// Makes a quick robot-voice narration with Windows' built-in speech engine, so you can
// preview real timing before recording the Gemini voice. Free, offline, no downloads.
// The draft is saved as audio/narration-draft.wav. Delete it when the real narration arrives.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { parseArgs, videoDir, fail, ok, info, rel } from "./lib/core.mjs";
import { loadVideo, rawAudioFiles } from "./lib/video.mjs";

if (process.platform !== "win32") fail("draft-voice uses Windows speech; on other systems use `npx hyperframes tts`.");
const args = parseArgs();
const dir = videoDir(args._[0]);
const v = loadVideo(dir);
if (rawAudioFiles(dir).length && !args.force) fail("audio/ already has narration files. Remove them or pass --force to add a draft anyway.");

const text = v.scenes.map((s) => String(s.say ?? "").trim()).filter(Boolean).join("\n\n");
const out = path.join(dir, "audio", "narration-draft.wav");
fs.mkdirSync(path.dirname(out), { recursive: true });
const txt = path.join(dir, "audio", "_draft-text.txt");
fs.writeFileSync(txt, text);
const ps = `Add-Type -AssemblyName System.Speech; $v = New-Object System.Speech.Synthesis.SpeechSynthesizer; $v.Rate = ${args.rate ?? 1}; $v.SetOutputToWaveFile('${out.replaceAll("'", "''")}'); $v.Speak([IO.File]::ReadAllText('${txt.replaceAll("'", "''")}')); $v.Dispose()`;
const r = spawnSync("powershell", ["-NoProfile", "-Command", ps], { stdio: "inherit" });
fs.rmSync(txt, { force: true });
if (r.status !== 0 || !fs.existsSync(out)) fail("Windows speech failed.");
ok(`Draft narration: ${rel(out)}`);
info("It is a placeholder. Replace it with the Gemini narration later (delete narration-draft.wav first).");
info(`Next: npm run transcribe -- ${v.name.slice(0, 3)}`);
