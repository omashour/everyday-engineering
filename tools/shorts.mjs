// npm run shorts -- 001 [--only 1]
// Builds the vertical Shorts listed in shorts.yaml (1080×1920), each with a hook banner on top
// and an end card. Two kinds (see lib/shorts.mjs):
//  - standalone: the Short's own scenes and its own recording (audio/short-N.wav) — recommended;
//  - cut: `scenes: [S01, S08]` reuses the long video's scenes and cuts its narration (older videos).
// Output: videos/001-x/shorts/short-1/project
import fs from "node:fs";
import path from "node:path";
import { parseArgs, videoDir, fail, ok, info, run, hf, rel, esc, brand as loadBrand } from "./lib/core.mjs";
import { loadVideo, videoTiming } from "./lib/video.mjs";
import { buildProject } from "./lib/project.mjs";
import { loadShorts, standaloneTiming } from "./lib/shorts.mjs";
import { rich } from "./lib/kit.mjs";
import { printOverlaps } from "./lib/overlap.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const v = loadVideo(dir);
const shorts = loadShorts(dir);
if (!shorts.length) fail("shorts.yaml lists no Shorts.");
const b = loadBrand();
let longTiming = null;
const long = () => (longTiming ??= videoTiming(v));

for (const sh of shorts) {
  const n = sh.n;
  if (args.only && +args.only !== n) continue;
  const sdir = path.join(dir, "shorts", `short-${n}`);
  fs.mkdirSync(sdir, { recursive: true });
  let scenes, tScenes, cursor, shortAudio = null, audioLen = null;

  if (sh.standalone) {
    // ---- its own script and recording
    const { timing, audio, draft } = standaloneTiming(dir, sh);
    if (draft) console.log(`⚠ Short ${n}: no recording yet (audio/short-${n}.wav) → built silent with estimated timing.`);
    scenes = sh.scenes.map((s) => ({ ...s }));
    tScenes = { ...timing.scenes };
    cursor = timing.total;
    shortAudio = audio;
    audioLen = audio ? timing.audioDuration ?? null : null;
  } else {
    // ---- cut from the long video: scenes play back to back, each keeps its own narration window
    const { timing, audio, draft } = long();
    if (draft) info("No transcribed narration yet → this Short uses estimated timing and is silent.");
    scenes = (sh.spec.scenes ?? []).map((id) => {
      const s = v.scenes.find((x) => x.id === id);
      if (!s) fail(`short ${n}: scene ${id} is not in scenes.yaml`);
      return s;
    });
    const segs = [];
    tScenes = {};
    cursor = 0;
    for (const s of scenes) {
      const t = timing.scenes[s.id];
      // keep the whole last word and a natural breath after it, without reaching into neighbouring scenes
      const k = v.scenes.findIndex((x) => x.id === s.id);
      const prevEnd = k > 0 ? timing.scenes[v.scenes[k - 1].id].speechEnd : 0;
      const nextStart = k + 1 < v.scenes.length ? timing.scenes[v.scenes[k + 1].id].speechStart : Infinity;
      const from = Math.max(0, prevEnd + 0.05, t.speechStart - 0.2);
      const to = Math.min(t.speechEnd + 0.7, nextStart - 0.08);
      segs.push([from, to]);
      const shift = cursor - from;
      tScenes[s.id] = { ...t, start: cursor, end: cursor + (to - from), tokenTimes: t.tokenTimes.map((x) => x + shift), tokenEnds: t.tokenEnds.map((x) => x + shift) };
      cursor += to - from;
    }
    if (audio) {
      shortAudio = path.join(sdir, "narration.wav");
      // short fade in and a gentle fade out on every piece, so cuts never click or chop a word
      const filter = segs.map(([a, z], k) => `[0:a]atrim=${a.toFixed(3)}:${z.toFixed(3)},asetpts=PTS-STARTPTS,afade=t=in:d=0.05,afade=t=out:st=${Math.max(0, z - a - 0.3).toFixed(3)}:d=0.3[s${k}]`).join(";") + ";" + segs.map((_, k) => `[s${k}]`).join("") + `concat=n=${segs.length}:v=0:a=1[out]`;
      if (run("ffmpeg", ["-y", "-v", "error", "-i", `"${audio}"`, "-filter_complex", `"${filter}"`, "-map", "[out]", "-c:a", "pcm_s16le", `"${shortAudio}"`]) !== 0) fail("FFmpeg could not cut the Short's audio.");
    }
  }

  // end card
  const endId = "SEND", endLen = 3;
  scenes.push({ id: endId, component: "short-end", say: "", params: { text: sh.spec.end ?? "Full video on the channel" } });
  tScenes[endId] = { start: cursor, end: cursor + endLen, tokens: [], tokenTimes: [], tokenEnds: [], speechStart: cursor, speechEnd: cursor };
  const total = cursor + endLen;
  if (total > 60) console.log(`⚠ short ${n} is ${total.toFixed(1)} s — YouTube Shorts are best under 60 s.`);

  const hookText = sh.spec.hook;
  const hook = hookText
    ? `\n    <div id="short-hook" class="clip" data-start="0" data-duration="${cursor.toFixed(3)}" data-track-index="2" style="position:absolute;left:70px;right:70px;top:100px;z-index:10;background:${b.colors.navy};color:#fff;font:800 54px/1.15 Inter,sans-serif;padding:18px 34px;border-radius:18px;text-align:center;box-shadow:0 8px 30px rgba(0,0,0,.25)">${rich(hookText)}</div>`
    : "";
  const { warnings, duration } = await buildProject({
    scenes, timing: { scenes: tScenes, total, audioDuration: audioLen ?? cursor }, fmt: "short", outDir: path.join(sdir, "project"), videoDir: dir, audio: shortAudio, name: `${v.name}-short-${n}`,
    // the hook banner is on screen from the very first frame: phones use that frame as the preview
    overlayHtml: hook, overlayJs: "",
  });
  for (const w of warnings) console.log(`⚠ ${w}`);
  ok(`Short ${n}${sh.standalone ? " (own script)" : ""}: ${rel(path.join(sdir, "project"))} (${duration.toFixed(1)} s)  — ${esc(sh.title)}`);
  if (!args["no-check"]) hf(["check", path.join(sdir, "project")]);
  await printOverlaps(path.join(sdir, "project"));
}
info(`Preview: npm run preview -- ${v.name.slice(0, 3)} --short 1     Render: npm run render -- ${v.name.slice(0, 3)} --short 1`);
