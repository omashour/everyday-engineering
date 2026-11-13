// Everything YouTube Studio asks for, computed from the video folder.
// Used by `npm run upload-sheet` (writes upload.md + captions.srt) and by the app (copy buttons).
import fs from "node:fs";
import path from "node:path";
import { readYaml, P } from "./core.mjs";
import { videoTiming } from "./video.mjs";
import { buildCues, toSrt } from "./captions.mjs";

const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

/** about.yaml with every [DAY] replaced by upload_day (when it is set). */
export function aboutWithDay() {
  const about = readYaml(path.join(P.channel, "about.yaml"), {});
  const day = about.upload_day;
  if (!day) return about;
  const sub = (x) => (typeof x === "string" ? x.replaceAll("[DAY]", day) : x && typeof x === "object" ? Object.fromEntries(Object.entries(x).map(([k, v]) => [k, sub(v)])) : x);
  return sub(about);
}

export function uploadSheet(v) {
  const dir = v.dir;
  const num = v.meta.id ?? v.name.slice(0, 3);
  const about = aboutWithDay();
  const yt = about.youtube ?? {};
  const warn = [];

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

  const { timing, draft } = videoTiming(v);
  if (draft) warn.push("No recorded narration yet: chapter times, end-screen time and captions are ESTIMATES. Redo this after timing the real narration and rebuilding.");
  const chapters = v.scenes.filter((s) => s.chapter).map((s, i) => `${i === 0 ? "0:00" : mmss(timing.scenes[s.id].start)} ${s.chapter}`);
  if (chapters.length && chapters.length < 3) warn.push("Fewer than 3 chapters: YouTube won't show chapters. Add `chapter:` to more scenes.");
  const chapterBlock = chapters.length ? `Chapters\n${chapters.join("\n")}` : "";
  const ph = /\[paste chapters\.txt here[^\]]*\]/i;
  if (ph.test(description)) description = description.replace(/Chapters\s*\n?\s*\[paste chapters\.txt here[^\]]*\]/i, chapterBlock).replace(ph, chapterBlock);
  else if (chapterBlock && !/\b0:00\b/.test(description)) description += `\n\n${chapterBlock}`;
  if (about.description_footer) description += `\n\n${about.description_footer.trim()}`;
  if (about.hashtags) description += `\n\n${about.hashtags.trim()}`;
  description = description.replace(/\n{3,}/g, "\n\n").trim();

  const cues = buildCues(v.scenes, timing);
  const endCard = v.scenes.find((s) => s.component === "end-card");
  const endStart = endCard ? timing.scenes[endCard.id].start : null;
  const total = timing.total;
  if (endCard && total - endStart < 5) warn.push(`The end card is only ${(total - endStart).toFixed(1)} s; YouTube end screens need at least 5 s. Lengthen its narration.`);

  if (title.length > 100) warn.push(`Title is ${title.length} characters (YouTube max 100; aim for under 60).`);
  else if (title.length > 60) warn.push(`Title is ${title.length} characters; it may be cut off on phones (aim for under 60).`);
  if (description.length > 5000) warn.push(`Description is ${description.length} characters (max 5000).`);
  if (tags.length > 500) warn.push(`Tags are ${tags.length} characters (max 500).`);
  if (/[<>]/.test(title + description)) warn.push("YouTube rejects < and > in titles and descriptions; replace them.");
  if (/\[DAY\]/.test(description)) warn.push("The description still says [DAY]: set your upload day (app → Settings, or upload_day in channel/about.yaml).");

  const exists = (f) => fs.existsSync(path.join(dir, f));
  const video = `renders/${v.name}.mp4`;
  if (!exists(video)) warn.push("The final video isn't rendered yet.");
  const thumbs = ["thumbnails/thumb-1.png", "thumbnails/thumb-2.png", "thumbnails/thumb-3.png"].filter(exists);
  if (!thumbs.length) warn.push("No thumbnails yet.");

  const playlists = readYaml(path.join(P.root, "playlists.yaml"), []);
  const pl = playlists.find((p) => p.id === playlistId || p.title.toLowerCase() === playlistId.toLowerCase());

  const shortsSpec = readYaml(path.join(dir, "shorts.yaml"), { shorts: [] }).shorts ?? [];
  const shorts = shortsSpec.map((sh, i) => {
    const n = i + 1;
    const file = `renders/${v.name}-short-${n}.mp4`;
    if (!exists(file)) warn.push(`Short ${n} isn't rendered yet.`);
    const desc = (sh.description ?? `${sh.hook ?? ""}\n\nFull video: [paste the main video's link]`).trim() + `\n\n${yt.shorts_hashtags ?? "#shorts"}`;
    return { n, file, rendered: exists(file), title: sh.title ?? "", description: desc };
  });

  const settings = [
    ["Playlist", pl?.title ?? (playlistId || "—")],
    ["Audience", yt.audience ?? "No, it's not made for kids"],
    ["Category", yt.category ?? "Education"],
    ["Video language", yt.language ?? "English"],
    ["Caption certification", yt.caption_certification ?? "None"],
    ["License", yt.license ?? "Standard YouTube License"],
    ["Altered or synthetic content", yt.altered_content_note ?? "decide using YouTube's current guidance (the narration voice is AI-generated)"],
  ];
  const endScreen = endStart != null ? `from ${mmss(endStart)} to the end (${(total - endStart).toFixed(0)} s): one video ("Best for viewer") on the rectangle, Subscribe on the circle` : "no end-card scene in this video";
  const data = {
    num, title, alternates, description, tags, pinned, warnings: warn, draft,
    playlist: pl ?? null, settings, endScreen, length: mmss(total),
    files: { video, videoReady: exists(video), thumbnails: thumbs, captions: "captions.srt" },
    shorts, captionLines: cues.length,
  };
  return { data, md: markdown(data), srt: toSrt(cues) };
}

function markdown(d) {
  const L = (b) => (b ? "x" : " ");
  const box = (s) => "```text\n" + s + "\n```";
  return `# Upload sheet — ${d.num}: ${d.title}

Copy each box into YouTube Studio.${d.warnings.length ? `\n\n## ⚠ Check first\n${d.warnings.map((w) => `- ${w}`).join("\n")}` : ""}

## Files
- [${L(d.files.videoReady)}] Video: \`${d.files.video}\`
- [${L(d.files.thumbnails.length)}] Thumbnails${d.files.thumbnails.length > 1 ? " (upload all for YouTube's A/B test: Thumbnail → Test & compare)" : ""}: ${d.files.thumbnails.map((t) => `\`${t}\``).join(", ") || "none yet"}
- [x] Captions: \`captions.srt\` (Subtitles → Add language: English → Upload file → With timing)

## Title (${d.title.length} characters)
${box(d.title)}
${d.alternates ? `Alternates: ${d.alternates}\n` : ""}
## Description (${d.description.length} characters)
${box(d.description)}

## Tags
${box(d.tags)}

## Settings
${d.settings.map(([k, v]) => `- ${k}: **${v}**`).join("\n")}
- End screen: ${d.endScreen}
- Video length: **${d.length}**

## Pinned comment
${box(d.pinned)}
${d.shorts.length ? `\n## Shorts\n${d.shorts.map((s) => `### Short ${s.n}\n- File: \`${s.file}\`${s.rendered ? "" : " (not rendered yet)"}\n- Title: \`${s.title}\`\n- Related video: link it to the main video\n\n${box(s.description)}\n`).join("\n")}` : ""}
## After uploading
Mark it published (app: "Mark as published", or \`npm run publish -- ${d.num} --url <link>\`). It updates the topic list and pushes to GitHub.
`;
}
