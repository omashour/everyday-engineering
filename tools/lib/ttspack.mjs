// The Gemini voice package and readable script, computed from scenes.yaml.
// Used by `npm run tts-pack` (writes script.md / tts.md) and by the app (copy buttons).
import path from "node:path";
import { readYaml, P } from "./core.mjs";
import { tokens } from "./timing.mjs";

const WPM = 150;
export const mmss = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;

export function ttsPack(v) {
  const voice = readYaml(path.join(P.channel, "voice.yaml"));
  const g = voice.gemini ?? {};
  const maxWords = g.chunk_max_words ?? 280;

  // readable script
  let t = 0, total = 0;
  let scriptMd = `# ${v.meta.title ?? v.name}\n\nGenerated from scenes.yaml. Edit scenes.yaml, not this file.\n\n`;
  for (const s of v.scenes) {
    const n = tokens(s.say).length;
    scriptMd += `### ${s.id} · ${s.component} · ~${mmss(t)}\n\n${String(s.say ?? "").trim() || "_(no narration)_"}\n\n`;
    t += (n / WPM) * 60 + 0.5;
    total += n;
  }
  scriptMd += `---\n${total} words · about ${mmss(t)} at ${WPM} words per minute\n`;

  // chunks split at scene boundaries
  const chunks = [];
  let cur = null;
  for (const s of v.scenes) {
    const say = String(s.say ?? "").trim();
    if (!say) continue;
    const n = tokens(say).length;
    if (!cur || (cur.words + n > maxWords && cur.words > 0)) {
      cur = { scenes: [], parts: [], words: 0 };
      chunks.push(cur);
    }
    cur.scenes.push(s.id);
    cur.parts.push(say);
    cur.words += n;
  }
  const out = chunks.map((c, i) => ({
    n: i + 1,
    file: `narration-${String(i + 1).padStart(2, "0")}.wav`,
    scenes: `${c.scenes[0]}–${c.scenes.at(-1)}`,
    words: c.words,
    length: mmss((c.words / WPM) * 60),
    text: c.parts.join("\n\n"),
  }));
  const pronounce = { ...(voice.pronounce ?? {}), ...(v.meta.pronounce ?? {}) };
  const style = [g.style, v.meta.voice_note].filter(Boolean).join(" ");
  const pack = { model: g.model ?? "gemini-3.8-flash-tts", voice: g.voice ?? null, style, pronounce, chunks: out, totalWords: total, length: mmss(t), maxWords };
  return { ...pack, scriptMd, ttsMd: ttsMarkdown(v, pack) };
}

function ttsMarkdown(v, p) {
  const id = v.name.slice(0, 3);
  let md = `# Voice recording package — ${v.meta.title ?? v.name}

Generated from scenes.yaml.

## Settings
- **Model:** ${p.model}
- **Voice:** ${p.voice ?? "(not chosen yet — set gemini.voice in channel/voice.yaml)"}
- **Language:** English
- **Chunks:** ${p.chunks.length} (about ${p.maxWords} words max each, split at scene boundaries)

## How to record
1. Open the Gemini speech generation page in Google AI Studio and pick the model and voice above.
2. Paste the **Style instructions** below into the style / instructions field (not into the text).
3. For each chunk: paste the chunk text, generate, listen once, download the WAV and save it with the file name shown, in the video's \`audio\` folder (or drop it on the app).
4. Check the pronunciation list while listening; regenerate any chunk that mispronounces a term.
5. Then time the narration (app: "Time the narration", or \`npm run transcribe -- ${id}\`).

If a chunk is too long for the tool, split it at a paragraph break and save the parts as e.g. narration-02a.wav and narration-02b.wav (files are joined in name order).

## Style instructions
\`\`\`
${p.style}
\`\`\`
`;
  const pr = Object.entries(p.pronounce);
  if (pr.length) md += `\n## Pronunciation\n| Term | Say it like |\n|---|---|\n` + pr.map(([k, val]) => `| ${k} | ${val} |`).join("\n") + "\n";
  for (const c of p.chunks) md += `\n## Chunk ${c.n} → save as \`audio/${c.file}\`\nScenes ${c.scenes} · ${c.words} words · about ${c.length}\n\n\`\`\`text\n${c.text}\n\`\`\`\n`;
  return md;
}
