// npm run status — where every video stands, and what to do next.
import fs from "node:fs";
import path from "node:path";
import { P, readYaml } from "./lib/core.mjs";
import { rawAudioFiles } from "./lib/video.mjs";

const covered = new Set(readYaml(path.join(P.topics, "covered.yaml"), []).map((c) => String(c.video)));
const dirs = fs.existsSync(P.videos) ? fs.readdirSync(P.videos).filter((d) => /^\d{3}-/.test(d)).sort() : [];
if (!dirs.length) console.log("No videos yet. Start one with: npm run new-video -- T05");
for (const d of dirs) {
  const dir = path.join(P.videos, d);
  const has = (f) => fs.existsSync(path.join(dir, f));
  const num = d.slice(0, 3);
  let stage, next;
  if (covered.has(num)) { stage = "published"; next = "—"; }
  else if (has(`renders/${d}.mp4`) && has("upload.md")) { stage = "ready to upload"; next = `upload with upload.md, then npm run publish -- ${num} --url …`; }
  else if (has(`renders/${d}.mp4`)) { stage = "rendered"; next = `npm run upload-sheet -- ${num}`; }
  else if (has("audio/words.json") && has("project/index.html")) { stage = "built"; next = `npm run preview -- ${num}, then npm run render -- ${num}`; }
  else if (has("audio/words.json")) { stage = "transcribed"; next = `npm run build -- ${num}`; }
  else if (rawAudioFiles(dir).length) { stage = "audio in"; next = `npm run transcribe -- ${num}`; }
  else if (has("tts.md")) { stage = "ready to record"; next = `record tts.md in Gemini → audio/`; }
  else if (has("scenes.yaml")) { stage = "scripted"; next = `npm run validate -- ${num}, then npm run tts-pack -- ${num}`; }
  else { stage = "empty"; next = "write scenes.yaml"; }
  console.log(`${d.padEnd(42)} ${stage.padEnd(16)} next: ${next}`);
}
