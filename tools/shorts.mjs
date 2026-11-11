// npm run shorts -- 001 [--only 1]
// Builds the vertical Shorts listed in shorts.yaml from the long video's scenes and
// narration: same scenes re-laid out at 1080×1920, audio cut to those scenes, a hook
// banner on top and an end card. Output: videos/001-x/shorts/short-1/project
import fs from "node:fs";
import path from "node:path";
import { parseArgs, videoDir, fail, ok, info, run, hf, readYaml, rel, esc, brand as loadBrand } from "./lib/core.mjs";
import { loadVideo, videoTiming } from "./lib/video.mjs";
import { buildProject } from "./lib/project.mjs";
import { rich } from "./lib/kit.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const v = loadVideo(dir);
const spec = readYaml(path.join(dir, "shorts.yaml"), { shorts: [] });
if (!spec.shorts?.length) fail("shorts.yaml lists no Shorts.");
const { timing, audio, draft } = videoTiming(v);
if (draft) info("No transcribed narration yet → Shorts use estimated timing and are silent.");
const b = loadBrand();

for (const [i, sh] of spec.shorts.entries()) {
  const n = i + 1;
  if (args.only && +args.only !== n) continue;
  const ids = sh.scenes ?? [];
  const scenes = ids.map((id) => {
    const s = v.scenes.find((x) => x.id === id);
    if (!s) fail(`short ${n}: scene ${id} is not in scenes.yaml`);
    return s;
  });
  // Re-time: scenes play back to back; each keeps its own narration window.
  const segs = [];
  const tScenes = {};
  let cursor = 0;
  for (const s of scenes) {
    const t = timing.scenes[s.id];
    const from = Math.max(0, t.speechStart - 0.15), to = t.speechEnd + 0.35;
    segs.push([from, to]);
    const shift = cursor - from;
    tScenes[s.id] = { ...t, start: cursor, end: cursor + (to - from), tokenTimes: t.tokenTimes.map((x) => x + shift), tokenEnds: t.tokenEnds.map((x) => x + shift) };
    cursor += to - from;
  }
  // end card scene
  const endId = "SEND";
  const endLen = 3;
  scenes.push({ id: endId, component: "short-end", say: "", params: { text: sh.end ?? "Full video on the channel" } });
  tScenes[endId] = { start: cursor, end: cursor + endLen, tokens: [], tokenTimes: [], tokenEnds: [], speechStart: cursor, speechEnd: cursor };
  const total = cursor + endLen;
  if (total > 60) console.log(`⚠ short ${n} is ${total.toFixed(1)} s — YouTube Shorts are best under 60 s.`);

  const sdir = path.join(dir, "shorts", `short-${n}`);
  fs.mkdirSync(sdir, { recursive: true });
  let shortAudio = null;
  if (audio) {
    shortAudio = path.join(sdir, "narration.wav");
    const filter = segs.map(([a, z], k) => `[0:a]atrim=${a.toFixed(3)}:${z.toFixed(3)},asetpts=PTS-STARTPTS[s${k}]`).join(";") + ";" + segs.map((_, k) => `[s${k}]`).join("") + `concat=n=${segs.length}:v=0:a=1[out]`;
    if (run("ffmpeg", ["-y", "-v", "error", "-i", `"${audio}"`, "-filter_complex", `"${filter}"`, "-map", "[out]", "-c:a", "pcm_s16le", `"${shortAudio}"`]) !== 0) fail("FFmpeg could not cut the Short's audio.");
  }
  const hook = sh.hook
    ? `\n    <div id="short-hook" class="clip" data-start="0" data-duration="${cursor.toFixed(3)}" data-track-index="2" style="position:absolute;left:70px;right:70px;top:100px;z-index:10;background:${b.colors.navy};color:#fff;font:800 54px/1.15 Inter,sans-serif;padding:18px 34px;border-radius:18px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.25)">${rich(sh.hook)}</div>`
    : "";
  const { warnings, duration } = await buildProject({
    scenes, timing: { scenes: tScenes, total, audioDuration: cursor }, fmt: "short", outDir: path.join(sdir, "project"), videoDir: dir, audio: shortAudio, name: `${v.name}-short-${n}`,
    overlayHtml: hook, overlayJs: sh.hook ? `EE.pop(tl, "#short-hook", 0.15);\n` : "",
  });
  for (const w of warnings) console.log(`⚠ ${w}`);
  ok(`Short ${n}: ${rel(path.join(sdir, "project"))} (${duration.toFixed(1)} s)  — ${esc(sh.title ?? "")}`);
  if (!args["no-check"]) hf(["check", path.join(sdir, "project")]);
}
info(`Preview: npm run preview -- ${v.name.slice(0, 3)} --short 1     Render: npm run render -- ${v.name.slice(0, 3)} --short 1`);
