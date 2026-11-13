// Where a video stands and what to do next. Shared by `npm run status` and the app.
import fs from "node:fs";
import path from "node:path";
import { P, readYaml } from "./core.mjs";
import { rawAudioFiles } from "./video.mjs";

export const STAGES = ["new", "scripted", "ready to record", "audio in", "timed", "built", "rendered", "ready to upload", "published"];

export function videoStage(dirName) {
  const dir = path.join(P.videos, dirName);
  const has = (f) => fs.existsSync(path.join(dir, f));
  const num = dirName.slice(0, 3);
  const covered = new Set(readYaml(path.join(P.topics, "covered.yaml"), []).map((c) => String(c.video)));
  let scripted = false;
  try {
    const doc = readYaml(path.join(dir, "scenes.yaml"), {});
    scripted = (doc.scenes ?? []).some((s) => String(s.say ?? "").trim() && !/^replace me/i.test(String(s.say).trim()));
  } catch { /* invalid yaml → not scripted */ }
  const audio = rawAudioFiles(dir).map((f) => path.basename(f));
  let stage, next, cmd;
  if (covered.has(num)) [stage, next, cmd] = ["published", "Done", null];
  else if (has(`renders/${dirName}.mp4`) && has("upload.md")) [stage, next, cmd] = ["ready to upload", "Upload to YouTube, then mark it published", `npm run publish -- ${num} --url …`];
  else if (has(`renders/${dirName}.mp4`)) [stage, next, cmd] = ["rendered", "Make the upload sheet", `npm run upload-sheet -- ${num}`];
  else if (has("audio/words.json") && has("project/index.html") && audio.length) [stage, next, cmd] = ["built", "Preview it, then render", `npm run render -- ${num}`];
  else if (has("audio/words.json") && audio.length) [stage, next, cmd] = ["timed", "Build the video", `npm run build -- ${num}`];
  else if (audio.length) [stage, next, cmd] = ["audio in", "Time the narration", `npm run transcribe -- ${num}`];
  else if (has("tts.md") && scripted) [stage, next, cmd] = ["ready to record", "Record the voice in Gemini", null];
  else if (scripted) [stage, next, cmd] = ["scripted", "Make the voice package", `npm run tts-pack -- ${num}`];
  else [stage, next, cmd] = ["new", "Add Claude's script files", null];
  let title = dirName;
  try { title = readYaml(path.join(dir, "scenes.yaml"), {}).video?.title ?? dirName; } catch { /* keep folder name */ }
  return { id: num, dir: dirName, title, stage, stageIndex: STAGES.indexOf(stage), next, cmd, audio, draftOnly: audio.length > 0 && audio.every((a) => a.includes("draft")) };
}

export function allVideos() {
  if (!fs.existsSync(P.videos)) return [];
  return fs.readdirSync(P.videos).filter((d) => /^\d{3}-/.test(d)).sort().map(videoStage);
}
