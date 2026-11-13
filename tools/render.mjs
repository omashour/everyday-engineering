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
// Windows can't replace a video that's open (in the app's player, a media player or Explorer's preview).
// Move the old one aside first, so we find out now rather than after minutes of rendering.
const old = out.replace(/\.mp4$/, ".previous.mp4");
if (fs.existsSync(out)) {
  try { fs.rmSync(old, { force: true }); fs.renameSync(out, old); }
  catch { fail(`The old ${path.basename(out)} is open somewhere, so it can't be replaced. Close it (a media player, or a folder preview), then try again.`); }
}
info(`Rendering (${quality}) — this can take a few minutes…`);
const code = hf(["render", proj, "--quality", quality, "--output", out]);
if (code !== 0 || !fs.existsSync(out)) {
  if (fs.existsSync(old)) { try { fs.renameSync(old, out); } catch { /* keep .previous */ } }
  fail("Render failed (see the messages above).");
}
try { fs.rmSync(old, { force: true }); } catch { /* still open somewhere; harmless */ }
ok(`Rendered ${rel(out)}  (${(fs.statSync(out).size / 1e6).toFixed(1)} MB)`);
