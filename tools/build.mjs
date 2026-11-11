// npm run build -- 001 [--force] [--no-check]
// scenes.yaml + narration timing  ->  videos/001-x/project/ (an editable HyperFrames project)
import fs from "node:fs";
import path from "node:path";
import { parseArgs, videoDir, fail, ok, info, hf, writeJson, rel } from "./lib/core.mjs";
import { loadVideo, videoTiming } from "./lib/video.mjs";
import { buildProject, editedSinceBuild } from "./lib/project.mjs";
import { validateVideo } from "./lib/validate.mjs";
import { saveAndPush } from "./lib/git.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const v = loadVideo(dir);
const problems = await validateVideo(v);
const errors = problems.filter((p) => p.level === "error");
for (const p of problems) console.log(`${p.level === "error" ? "✖" : "⚠"} ${p.msg}`);
if (errors.length) fail(`Fix the ${errors.length} error(s) in scenes.yaml first.`);

const out = path.join(dir, "project");
if (editedSinceBuild(out) && !args.force) {
  fail(`project/index.html was edited since the last build (in Studio or by hand).
  Rebuilding would overwrite those edits. Either keep editing the project directly,
  or run again with --force to regenerate it from scenes.yaml.`);
}

const { timing, audio, draft } = videoTiming(v);
writeJson(path.join(dir, "timing.json"), summarizeTiming(timing));
if (draft) info("No transcribed narration yet → DRAFT build with estimated timing (~150 words/min) and no sound.");
else if (timing.matchedRatio < 0.8) console.log(`⚠ Only ${Math.round(timing.matchedRatio * 100)}% of script words were found in the audio. Did the narration change? Check timing.json.`);

// YouTube chapters from scenes that carry `chapter:` (first one is forced to 0:00)
const chapters = v.scenes.filter((s) => s.chapter).map((s) => ({ name: s.chapter, t: timing.scenes[s.id].start }));
if (chapters.length) {
  chapters[0].t = 0;
  const txt = chapters.map((c) => `${fmtTime(c.t)} ${c.name}`).join("\n") + "\n";
  fs.writeFileSync(path.join(dir, "chapters.txt"), txt);
  info(`Chapters → ${rel(path.join(dir, "chapters.txt"))}${draft ? " (estimated until the real narration is in)" : ""}`);
  if (chapters.length < 3) console.log("⚠ YouTube needs at least 3 chapters to show them.");
}

const { warnings, duration } = await buildProject({ scenes: v.scenes, timing, fmt: "long", outDir: out, videoDir: dir, audio, name: v.name });
for (const w of warnings) console.log(`⚠ ${w}`);
ok(`Built ${rel(out)}  (${fmtTime(duration)}${draft ? ", draft timing" : ""})`);

if (!args["no-check"]) {
  info("Running HyperFrames check (lint + runtime + layout)…");
  const code = hf(["check", out]);
  if (code !== 0) console.log("⚠ HyperFrames check reported problems (see above). The project still opens in preview.");
}
saveAndPush(`${v.name.slice(0, 3)}: build${draft ? " (draft timing)" : ""}`);
info(`Next: npm run preview -- ${v.name.slice(0, 3)}`);

function fmtTime(s) {
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, "0")}`;
}
function summarizeTiming(t) {
  const scenes = {};
  for (const [id, s] of Object.entries(t.scenes)) scenes[id] = { start: +s.start.toFixed(2), end: +s.end.toFixed(2), first_words: s.tokens.slice(0, 6).join(" ") };
  return { total: +t.total.toFixed(2), matched: +(t.matchedRatio * 100).toFixed(1) + "%", scenes };
}
