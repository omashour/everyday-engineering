// npm run new-video -- T05            (from a backlog topic)
// npm run new-video -- "My own title" (a topic that is not in the backlog)
// Creates videos/NNN-slug/ with empty templates and marks the topic as scripted.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, P, fail, ok, info, readYaml, rel } from "./lib/core.mjs";
import { setTopicStatus } from "./lib/topics.mjs";
import { saveAndPush } from "./lib/git.mjs";

const args = parseArgs();
const arg = args._.join(" ").trim();
if (!arg) fail('Usage: npm run new-video -- T05   or   npm run new-video -- "Title"');
const backlog = readYaml(path.join(P.topics, "backlog.yaml"), []);
const topic = /^T\d+$/i.test(arg) ? backlog.find((t) => t.id.toUpperCase() === arg.toUpperCase()) : null;
if (/^T\d+$/i.test(arg) && !topic) fail(`Topic ${arg} is not in topics/backlog.yaml`);
if (topic?.video) fail(`Topic ${topic.id} already has video ${topic.video}.`);
const title = topic?.title ?? arg;

fs.mkdirSync(P.videos, { recursive: true });
const nums = fs.readdirSync(P.videos).map((d) => parseInt(d, 10)).filter(Number.isFinite);
const num = String(Math.max(0, ...nums) + 1).padStart(3, "0");
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").split("-").slice(0, 6).join("-");
const dir = path.join(P.videos, `${num}-${slug}`);
fs.mkdirSync(path.join(dir, "assets"), { recursive: true });
fs.mkdirSync(path.join(dir, "audio"), { recursive: true });

const w = (f, s) => fs.writeFileSync(path.join(dir, f), s);
w("scenes.yaml", `# Narration (say) and visuals for every scene. Written by Claude, checked by \`npm run validate -- ${num}\`.
video:
  id: "${num}"
  topic: ${topic?.id ?? "null"}
  title: ${JSON.stringify(title)}
  style: ""            # e.g. "B hook + A body"
  playlist: math-for-engineers
  voice_note: ""
  pronounce: {}

scenes:
  - id: S01
    component: title-card
    chapter: "Intro"
    say: >-
      Replace me with the hook.
    params:
      title: ${JSON.stringify(title)}

  - id: S99
    component: end-card
    say: >-
      See you in the next one.
    params:
      line: ""
`);
w("metadata.md", `# YouTube metadata — ${num}\n\n**Title:** ${title}\n**Alternates:** \n\n**Playlist:** \n\n**Description:**\n\nChapters\n[paste chapters.txt here]\n\n**Tags:** \n\n**Pinned comment:** \n`);
w("thumbnail.yaml", `variants:\n  - template: equation\n    text: ""\n    highlight: []\n    tex: ""\n  - template: photo\n    image: ""\n    text: ""\n    highlight: []\n`);
w("shorts.yaml", `shorts:\n  - title: ""\n    hook: ""\n    scenes: []\n    end: "Full video on the channel"\n`);
w("assets-needed.md", `# Assets needed — ${num}\n\nNone yet.\n`);
if (topic) setTopicStatus(topic.id, "scripted", { video: num });
ok(`Created ${rel(dir)}`);
saveAndPush(`${num}: new video "${title}"`);
info("Next: write scenes.yaml (Claude.ai skill does this), then npm run validate -- " + num);
