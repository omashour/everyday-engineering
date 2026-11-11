# Everyday Engineering — video pipeline

Everything for the **Everyday Engineering** YouTube channel: topics, styles, scripts, voice packages, and a local build that turns a script into an editable video project and renders it. Claude.ai does the creative writing; this PC does everything else with free, open-source tools.

```
Claude.ai (skill)                 Gemini 3.8 Flash TTS        This PC (free, local)
─────────────────                 ────────────────────        ───────────────────────────────────────
suggest topics → pick one
suggest styles → pick one
write scenes.yaml + metadata ──►  npm run tts-pack ──► record chunks ──► audio/*.wav
                                                              npm run transcribe   (word timings)
                                                              npm run build        (HyperFrames project)
                                                              npm run preview      (watch / edit in Studio)
                                                              npm run render       (MP4)
                                                              npm run shorts / thumbnail
upload to YouTube ◄───────────────────────────────────────── npm run publish (updates the tracker)
```

## One-time setup (Windows)

1. Install **Node.js 22+** (nodejs.org), **Git** (git-scm.com) and **FFmpeg**:
   ```powershell
   winget install Gyan.FFmpeg
   ```
2. Get the repo and install:
   ```powershell
   git clone <your GitHub repo URL> C:\Users\<you>\everyday-engineering
   cd C:\Users\<you>\everyday-engineering
   npm install
   npx hyperframes doctor
   ```
3. (Recommended) Install the fast, accurate local transcriber once:
   ```powershell
   npx hyperframes models install parakeet
   ```
   Without it, transcription falls back to Whisper (downloads a ~140 MB model on first use).
4. Check everything works: `npm test` and `npm run gallery` (builds every component and saves `styles/gallery/contact-sheet-*.jpg`).

Keep the repo **outside OneDrive**: builds create many files and renders are large.

## Claude.ai setup

1. Run `npm run package-skill` and upload `dist/everyday-engineering-skill.zip` in Claude.ai → **Settings → Capabilities → Skills**. Re-upload whenever components change (the reference inside is generated from the code).
2. Create a Claude.ai **Project** called "Everyday Engineering" and add this GitHub repo as project knowledge, selecting only `topics/`, `styles/index.yaml` and `channel/`. Press "sync" after you push changes.
3. Optional, for automatic tracker/script commits from Claude.ai: add GitHub's official MCP server as a custom connector (Claude.ai → Settings → Connectors → Add custom connector), if your plan supports custom connectors. Without it, Claude.ai gives you the files to save and you commit them.

In the project, just say **"suggest topics"**.

## Making a video

| Step | Command / action |
|---|---|
| 1. Pick topic and style | Claude.ai: "suggest topics", then "suggest styles for T05" |
| 2. Create the folder | `npm run new-video -- T05` |
| 3. Script | Claude.ai writes `scenes.yaml`, `metadata.md`, `thumbnail.yaml`, `shorts.yaml`, `assets-needed.md` → save them into the new folder |
| 4. Check | `npm run validate -- 002` |
| 5. Photos | add any photos listed in `assets-needed.md` to `videos/002-…/assets/` |
| 6. Voice package | `npm run tts-pack -- 002` → open `tts.md` |
| 7. Record | Gemini (AI Studio): paste the style instructions, record each chunk, save as `audio/narration-01.wav`, `-02.wav`… |
| 8. Timing | `npm run transcribe -- 002` |
| 9. Build | `npm run build -- 002` (also writes `chapters.txt`) |
| 10. Watch / edit | `npm run preview -- 002` (HyperFrames Studio: click anything to edit) |
| 11. Render | `npm run render -- 002` → `renders/002-….mp4` |
| 12. Shorts + thumbnails | `npm run shorts -- 002`, `npm run render -- 002 --short 1`, `npm run thumbnail -- 002` |
| 13. Publish | upload, then `npm run publish -- 002 --url https://youtu.be/…` and `git push` |

`npm run status` shows every video's stage and its next command.
Before recording the real voice you can preview timing with a free robot voice: `npm run draft-voice -- 002` (delete `audio/narration-draft.wav` afterwards).

### Editing a video
- **Change words or visuals:** edit `scenes.yaml` (or ask Claude.ai for the changed scene), then `npm run build -- 002`.
- **Fine-tune by hand:** open `npm run preview -- 002` and edit in Studio, or edit `videos/002-…/project/` directly (one file per scene in `compositions/`). The build then refuses to overwrite your edits unless you pass `--force`.

## Channel branding
`channel/brand.yaml` (colors, fonts, formats) and `channel/about.yaml` (description, banner text). `npm run branding` regenerates the logo SVGs and the profile picture, banner (with a safe-area preview), watermark and end-screen images in `channel/branding/out/`. Set your upload day in `about.yaml` first.

## Repository map
| Path | What |
|---|---|
| `channel/` | brand, voice (Gemini settings, pronunciation), about text, logo and branding |
| `styles/styles.yaml` | the styles A–F and what each is best for |
| `styles/*/components/` | the scene components (one file each) |
| `styles/index.yaml` | generated index (`npm run docs`) |
| `styles/gallery/` | one-scene-per-component test video + contact sheets |
| `topics/` | backlog, covered (published) and roadmap |
| `videos/NNN-slug/` | one folder per video: scenes.yaml, metadata, audio, project, renders |
| `skill/everyday-engineering/` | the Claude.ai skill (`npm run package-skill` zips it) |
| `tools/` | all commands (`tools/lib` = engine, `tools/runtime` = in-video helpers) |

Audio, renders and generated projects are not committed (see `.gitignore`); back up `videos/*/audio/` yourself if you want to keep the raw recordings.
