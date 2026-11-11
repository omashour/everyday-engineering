// npm run render -- 001 [--draft] [--short 1]
// Renders the project to an MP4 in videos/001-x/renders/ on this PC.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, videoDir, fail, hf, ok, info, rel } from "./lib/core.mjs";
import { narrationFile } from "./lib/video.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const name = path.basename(dir);
const proj = args.short ? path.join(dir, "shorts", `short-${args.short}`, "project") : path.join(dir, "project");
if (!fs.existsSync(path.join(proj, "index.html"))) fail(`No project yet. Run: npm run ${args.short ? "shorts" : "build"} -- ${args._[0]}`);
if (!args.short && !narrationFile(dir) && !args.draft) fail("This is still a silent draft (no narration). Add the audio and run transcribe + build first, or pass --draft to render it anyway.");
const quality = args.draft ? "draft" : args.quality ?? "delivery";
const outDir = path.join(dir, "renders");
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, `${name}${args.short ? `-short-${args.short}` : ""}${args.draft ? "-draft" : ""}.mp4`);
info(`Rendering (${quality}) — this can take a few minutes…`);
const code = hf(["render", proj, "--quality", quality, "--output", out]);
if (code !== 0 || !fs.existsSync(out)) fail("Render failed (see the messages above).");
ok(`Rendered ${rel(out)}  (${(fs.statSync(out).size / 1e6).toFixed(1)} MB)`);
