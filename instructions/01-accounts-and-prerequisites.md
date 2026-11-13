# 1. Accounts and prerequisites

## Accounts

| Account | Used for | Cost |
|---|---|---|
| **GitHub** (owner of `omashour/everyday-engineering`) | Keeps the topic list, scripts and settings; syncs PCs and Claude.ai | Free |
| **Claude.ai** | The `everyday-engineering` skill: topics, styles, scripts, titles, image prompts | Your Claude plan (skills need a plan that supports them) |
| **Google AI Studio** (aistudio.google.com) | Recording the narration with Gemini 3.8 Flash TTS; can also make images | Free tier, or pay per use |
| **ChatGPT** (optional) | Making images, if you prefer it to Gemini | Free tier or plan |
| **YouTube / Google** | The channel itself | Free |

## The PC

- **Windows 10 or 11** with an internet connection.
- **About 10 GB free** for the tools, plus about 100–300 MB per finished video.
- A recent processor. A graphics card speeds up rendering but isn't required.
- Keep the repo **outside OneDrive** (the default is `C:\Users\<you>\everyday-engineering`). Builds create many small files, which OneDrive syncs slowly.

## Software (the setup file installs all of it)

| Program | Why |
|---|---|
| **Git** | Downloads the repo and saves progress to GitHub |
| **Node.js** (LTS) | Runs the app and the video tools |
| **FFmpeg** | Audio and video processing |
| **HyperFrames** (installed by npm) | Turns the script into an editable video project and renders it |
| **Parakeet** speech model (one-time download) | Times each spoken word, so visuals appear on cue |

You don't install these by hand: follow [guide 2](02-install-on-a-new-pc.md).
