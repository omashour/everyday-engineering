// npm run gallery [-- --short]
// Builds styles/gallery (one scene per component) with estimated timing and saves a
// contact sheet: styles/gallery/contact-sheet[-short].jpg. Use it to test component
// changes and to see what every style looks like.
import fs from "node:fs";
import path from "node:path";
import { P, parseArgs, hf, ok, fail, rel, copyFile } from "./lib/core.mjs";
import { loadVideo } from "./lib/video.mjs";
import { buildTiming, syntheticWords } from "./lib/timing.mjs";
import { buildProject } from "./lib/project.mjs";
import { validateVideo } from "./lib/validate.mjs";

const args = parseArgs();
const fmt = args.short ? "short" : "long";
const dir = path.join(P.styles, "gallery");
const v = loadVideo(dir);
const problems = await validateVideo(v, { format: "gallery" });
for (const p of problems) console.log(`${p.level === "error" ? "✖" : "⚠"} ${p.msg}`);
const { words, duration } = syntheticWords(v.scenes, 120);
const timing = buildTiming(v.scenes, words, duration);
const out = path.join(dir, fmt === "short" ? "project-short" : "project");
const { warnings } = await buildProject({ scenes: v.scenes, timing, fmt, outDir: out, videoDir: dir, audio: null, name: "style-gallery" });
for (const w of warnings) console.log(`⚠ ${w}`);
ok(`Built ${rel(out)}`);
if (!args["no-check"]) hf(["check", out]);
// a frame near the end of every scene (everything revealed)
const at = v.scenes.map((s) => (timing.scenes[s.id].end - 0.35).toFixed(2)).join(",");
const snap = path.join(dir, "_snap");
fs.rmSync(snap, { recursive: true, force: true });
hf(["snapshot", out, "--at", at, "--no-end", "--output", snap], { capture: true });
const sheets = fs.existsSync(snap) ? fs.readdirSync(snap).filter((f) => f.startsWith("contact-sheet")).sort() : [];
if (!sheets.length) fail("No contact sheet was produced.");
sheets.forEach((s, i) => copyFile(path.join(snap, s), path.join(dir, `contact-sheet${fmt === "short" ? "-short" : ""}${sheets.length > 1 ? "-" + (i + 1) : ""}.jpg`)));
fs.rmSync(snap, { recursive: true, force: true });
ok(`Contact sheet(s) saved in ${rel(dir)}`);
