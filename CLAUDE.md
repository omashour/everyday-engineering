# Notes for Claude Code in this repo

Pipeline for the Everyday Engineering YouTube channel. README.md explains the workflow; this file covers how the code fits together.

- **Source of truth per video:** `videos/NNN-slug/scenes.yaml` (narration `say` + `component` + `params` per scene). Everything else is generated: `script.md`/`tts.md` (tts-pack), `audio/words.json` (transcribe), `project/` (build), `chapters.txt`, `timing.json`.
- **Build:** `tools/lib/project.mjs` writes `project/index.html` (narration audio + one slot per scene) and `project/compositions/<SceneId>.html` (HyperFrames sub-compositions, scene-local times). Non-ASCII is written as escapes on purpose.
- **Timing:** `tools/lib/timing.mjs` aligns script tokens to transcript words (Needleman–Wunsch); cues are phrases inside a scene's `say`.
- **Components:** `styles/<style>/components/*.mjs`, each exports `{name, describe, params, required, css, navy?, render(p, ctx)}`; `render` returns `{html, js, fullBleed?}` where `js` adds tweens via `ctx.call("fade"|"rise"|"pop"|"draw"|"drawGroup"|"mark"|"wipe"|"slide"|"kenburns"|"count", ...)` (helpers in `tools/runtime/ee.js`). Times from `ctx.cue()` / `ctx.times()` are scene-local.
- **After changing components:** `npm run gallery` (visual check, contact sheet), `npm test`, `npm run docs` (regenerates `styles/index.yaml` and the skill's components.md), `npm run package-skill`.
- **HyperFrames rules that bite:** style the scene root by `#id`, never by class; never tween visibility on `.clip`; no CSS transform on elements GSAP transforms; every `<audio>` needs an id. Run `npx hyperframes check <project>`.
- Never edit files with PowerShell `Get-Content`/`Set-Content` round trips: they corrupt UTF-8 (×, ≈, →). Use the Edit tool or Node.
- The owner asked for automatic GitHub pushes: the work commands call `saveAndPush` (`tools/lib/git.mjs`), controlled by `settings.yaml` → `git.auto_push`. Ask before force-pushing, rewriting history, or changing the channel name/tagline.
