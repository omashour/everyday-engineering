// npm run validate -- 001
// Checks scenes.yaml: components and required params, cue phrases, assets, icons, length, hook.
import { parseArgs, videoDir, fail, ok } from "./lib/core.mjs";
import { loadVideo } from "./lib/video.mjs";
import { validateVideo } from "./lib/validate.mjs";

const args = parseArgs();
const v = loadVideo(videoDir(args._[0]));
const problems = await validateVideo(v);
for (const p of problems) console.log(`${p.level === "error" ? "✖" : "⚠"} ${p.msg}`);
const errors = problems.filter((p) => p.level === "error").length;
console.log(`  ${v.scenes.length} scenes · ${problems.words} words · ~${problems.minutes.toFixed(1)} min`);
if (errors) fail(`${errors} error(s).`);
ok("scenes.yaml is valid.");
