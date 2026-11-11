// npm run upload-sheet -- 001
// Writes everything needed for YouTube Studio into two files:
//   videos/001-x/upload.md     — title, full description (chapters filled in), tags, settings
//                                 checklist, end-screen time, pinned comment, Shorts texts
//   videos/001-x/captions.srt  — English captions from the script + narration timing
import fs from "node:fs";
import path from "node:path";
import { parseArgs, videoDir, ok, info, readYaml, rel, P } from "./lib/core.mjs";
import { loadVideo, videoTiming } from "./lib/video.mjs";
import { buildCues, toSrt } from "./lib/captions.mjs";
import { saveAndPush } from "./lib/git.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const v = loadVideo(dir);
const num = v.meta.id ?? v.name.slice(0, 3);
const about = readYaml(path.join(P.channel, "about.yaml"), {});
const yt = about.youtube ?? {};
const warn = [];

// ---- metadata.md fields
const metaFile = path.join(dir, "metadata.md");
const meta = fs.existsSync(metaFile) ? fs.readFileSync(metaFile, "utf8").replace(/\r\n/g, "\n") : "";
const field = (name) => {
  const m = meta.match(new RegExp(`\\*\\*${name}:\\*\\*([\\s\\S]*?)(?=\\n\\*\\*[A-Z][^*]*:\\*\\*|$)`));
  return m ? m[1].trim() : "";
};
const title = field("Title") || v.meta.title || "";
const alternates = field("Alternates");
const playlistId = field("Playlist") || v.meta.playlist || "";
const tags = field("Tags");
const pinned = field("Pinned comment");
let description = field("Description");
if (!meta) warn.push("metadata.md is missing — the title and description come from scenes.yaml only.");

// ---- timing: chapters, end screen, captions
const { timing, draft } = videoTiming(v);
if (draft) warn.push("No recorded narration yet: chapter times, end-screen time and captions are ESTIMATES. Re-run after `npm run transcribe` + `npm run build`.");
const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const chapters = v.scenes.filter((s) => s.chapter).map((s, i) => `${i === 0 ? "0:00" : mmss(timing.scenes[s.id].start)} ${s.chapter}`);
if (chapters.length && chapters.length < 3) warn.push("Fewer than 3 chapters: YouTube won't show chapters. Add `chapter:` to more scenes.");
const chapterBlock = chapters.length ? `Chapters\n${chapters.join("\n")}` : "";
if (/\[paste chapters\.txt here[^\]]*\]/i.test(description)) description = description.replace(/Chapters\s*\n?\s*\[paste chapters\.txt here[^\]]*\]/i, chapterBlock).replace(/\[paste chapters\.txt here[^\]]*\]/i, chapterBlock);
else if (chapterBlock && !/\b0:00\b/.test(description)) description += `\n\n${chapterBlock}`;
if (about.description_footer) description += `\n\n${about.description_footer.trim()}`;
if (about.hashtags) description += `\n\n${about.hashtags.trim()}`;
description = description.replace(/\n{3,}/g, "\n\n").trim();

const cues = buildCues(v.scenes, timing);
const srtFile = path.join(dir, "captions.srt");
fs.writeFileSync(srtFile, toSrt(cues));

const endCard = v.scenes.find((s) => s.component === "end-card");
const endStart = endCard ? timing.scenes[endCard.id].start : null;
const total = timing.total;
if (endCard && total - endStart < 5) warn.push(`The end card is only ${(total - endStart).toFixed(1)} s; YouTube end screens need at least 5 s. Lengthen its narration.`);

// ---- limits YouTube enforces
if (title.length > 100) warn.push(`Title is ${title.length} characters (YouTube max 100; aim for under 60).`);
else if (title.length > 60) warn.push(`Title is ${title.length} characters; it may be cut off on phones (aim for under 60).`);
if (description.length > 5000) warn.push(`Description is ${description.length} characters (max 5000).`);
if (tags.length > 500) warn.push(`Tags are ${tags.length} characters (max 500).`);
if (/[<>]/.test(title + description)) warn.push("YouTube rejects < and > in titles and descriptions; replace them.");

// ---- files
const exists = (f) => fs.existsSync(path.join(dir, f));
const video = `renders/${v.name}.mp4`;
if (!exists(video)) warn.push(`No final render yet: run \`npm run render -- ${num}\`.`);
const thumbs = ["thumbnails/thumb-1.png", "thumbnails/thumb-2.png", "thumbnails/thumb-3.png"].filter(exists);
if (!thumbs.length) warn.push(`No thumbnails yet: run \`npm run thumbnail -- ${num}\`.`);

const playlists = readYaml(path.join(P.root, "playlists.yaml"), []);
const pl = playlists.find((p) => p.id === playlistId || p.title.toLowerCase() === playlistId.toLowerCase());
if (/\[DAY\]/.test(description)) warn.push("The description still says [DAY]: set your upload day in channel/about.yaml (description_footer) and re-run.");

// ---- Shorts
const shorts = readYaml(path.join(dir, "shorts.yaml"), { shorts: [] }).shorts ?? [];
const shortBlocks = shorts.map((sh, i) => {
  const n = i + 1;
  const f = `renders/${v.name}-short-${n}.mp4`;
  if (!exists(f)) warn.push(`Short ${n} not rendered: \`npm run shorts -- ${num}\` then \`npm run render -- ${num} --short ${n}\`.`);
  const desc = (sh.description ?? `${sh.hook ?? ""}\n\nFull video: [paste the main video's link]`).trim() + `\n\n${yt.shorts_hashtags ?? "#shorts"}`;
  return `### Short ${n}\n- File: \`${f}\`${exists(f) ? "" : " (not rendered yet)"}\n- Title: \`${sh.title ?? ""}\`\n- Related video: link it to the main video (Shorts upload → "Related video"), so viewers can jump to the full explanation.\n\nDescription:\n\`\`\`text\n${desc}\n\`\`\`\n`;
});

const L = (b) => (b ? "x" : " ");
const md = `# Upload sheet — ${num}: ${title}

Generated by \`npm run upload-sheet -- ${num}\`. Copy each box into YouTube Studio.${warn.length ? `\n\n## ⚠ Check first\n${warn.map((w) => `- ${w}`).join("\n")}` : ""}

## Files
- [${L(exists(video))}] Video: \`${video}\`
- [${L(thumbs.length)}] Thumbnail${thumbs.length > 1 ? "s (upload all for YouTube's A/B test: Thumbnail → Test & compare)" : ""}: ${thumbs.map((t) => `\`${t}\``).join(", ") || "none yet"}
- [x] Captions: \`captions.srt\` (Subtitles → Add language: English → Upload file → With timing)

## Title (${title.length} characters)
\`\`\`text
${title}
\`\`\`
${alternates ? `Alternates (for YouTube's title A/B test if available, or later re-titling): ${alternates}\n` : ""}
## Description (${description.length} characters)
\`\`\`text
${description}
\`\`\`

## Tags
\`\`\`text
${tags}
\`\`\`

## Settings
- Playlist: **${pl?.title ?? (playlistId || "—")}**${pl ? "" : playlistId ? " (not in playlists.yaml)" : ""}
- Audience: **${yt.audience ?? "No, it's not made for kids"}**
- Category: **${yt.category ?? "Education"}** · Video language: **${yt.language ?? "English"}** · Caption certification: **${yt.caption_certification ?? "None"}**
- License: **${yt.license ?? "Standard YouTube License"}** · Allow embedding: **yes** · Comments: **on**
- Altered or synthetic content: ${yt.altered_content_note ?? "decide per video using YouTube's current guidance on realistic AI-generated content (the narration voice is AI-generated)."}
- End screen: ${endStart != null ? `add elements from **${mmss(endStart)}** to the end (${(total - endStart).toFixed(0)} s): one video (best for viewer) on the left box, subscribe on the round one.` : "no end-card scene in this video."}
- Video length: **${mmss(total)}**

## Pinned comment
\`\`\`text
${pinned}
\`\`\`
${shortBlocks.length ? `\n## Shorts\n${shortBlocks.join("\n")}` : ""}
## After uploading
\`\`\`
npm run publish -- ${num} --url <video link>
\`\`\`
(It records the video as covered and pushes to GitHub automatically.)
`;
fs.writeFileSync(path.join(dir, "upload.md"), md);
ok(`Wrote ${rel(path.join(dir, "upload.md"))} and ${rel(srtFile)} (${cues.length} caption lines)`);
if (warn.length) info(`${warn.length} thing(s) to check — see the top of upload.md.`);
saveAndPush(`${num}: upload sheet and captions`);
