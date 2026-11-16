// npm run vertical -- 001 [--force] [--no-check]
// The WHOLE video in vertical format (1080×1920) for TikTok, Instagram Reels, Facebook and other
// platforms: same scenes, narration, music and sound effects, laid out for a phone screen.
// Output: videos/001-x/vertical/project  →  render with: npm run render -- 001 --vertical
import path from "node:path";
import { parseArgs, videoDir, fail, ok, info, hf, rel } from "./lib/core.mjs";
import { loadVideo, videoTiming } from "./lib/video.mjs";
import { buildProject, editedSinceBuild } from "./lib/project.mjs";
import { printOverlaps } from "./lib/overlap.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const v = loadVideo(dir);
const out = path.join(dir, "vertical", "project");
if (editedSinceBuild(out) && !args.force) fail("vertical/project was edited since it was built. Run again with --force to rebuild it from scenes.yaml.");

const { timing, audio, draft } = videoTiming(v);
if (draft) info("No transcribed narration yet → vertical draft with estimated timing and no voice.");
const { warnings, duration } = await buildProject({ scenes: v.scenes, timing, fmt: "short", outDir: out, videoDir: dir, audio, name: `${v.name}-vertical` });
for (const w of warnings) console.log(`⚠ ${w}`);
const m = Math.floor(duration / 60), s = Math.round(duration % 60);
ok(`Vertical full video: ${rel(out)}  (${m}:${String(s).padStart(2, "0")})`);
if (!args["no-check"]) hf(["check", out]);
await printOverlaps(out);
info(`Render: npm run render -- ${v.name.slice(0, 3)} --vertical`);
