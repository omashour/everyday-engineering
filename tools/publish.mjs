// npm run publish -- 001 --url https://youtu.be/xxxx [--shorts url1,url2]
// After uploading: records the video in topics/covered.yaml and removes it from the backlog.
import path from "node:path";
import { parseArgs, videoDir, fail, ok, info } from "./lib/core.mjs";
import { loadVideo } from "./lib/video.mjs";
import { moveToCovered } from "./lib/topics.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const v = loadVideo(dir);
if (!args.url || args.url === true) fail("Give the YouTube link: npm run publish -- 001 --url https://youtu.be/…");
const today = new Date().toISOString().slice(0, 10);
const concepts = v.meta.concepts ?? v.scenes.filter((s) => s.chapter).map((s) => s.chapter);
const entry = {
  video: v.meta.id ?? path.basename(dir).slice(0, 3),
  title: v.meta.title,
  published: today,
  style: v.meta.style || null,
  url: args.url,
  topic: v.meta.topic ?? null,
  phase: v.meta.phase ?? "math",
  series: v.meta.series ?? null,
  playlist: v.meta.playlist ?? null,
  concepts,
  shorts: args.shorts ? String(args.shorts).split(",") : [],
};
moveToCovered(v.meta.topic, entry);
ok(`Recorded ${entry.video} as published in topics/covered.yaml${v.meta.topic ? ` and removed ${v.meta.topic} from the backlog` : ""}.`);
info("Commit and push so Claude.ai sees it: git add -A && git commit -m \"Publish " + entry.video + "\" && git push");
