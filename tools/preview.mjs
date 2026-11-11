// npm run preview -- 001 [--short 1]
// Opens HyperFrames Studio on the video's project: play it, scrub it, and edit anything.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, videoDir, fail, hf, info } from "./lib/core.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const proj = args.short ? path.join(dir, "shorts", `short-${args.short}`, "project") : path.join(dir, "project");
if (!fs.existsSync(path.join(proj, "index.html"))) fail(`No project yet. Run: npm run ${args.short ? "shorts" : "build"} -- ${args._[0]}`);
info("Opening HyperFrames Studio (Ctrl+C here to stop it)…");
process.exit(hf(["preview", proj]));
