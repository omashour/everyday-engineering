# 7. Backups and moving to another PC

## What's where

| Kept on GitHub (automatic) | Only on this PC (back it up yourself) |
|---|---|
| Topic list, roadmap, covered videos | Voice recordings: `videos\*\audio\` |
| Every video's script, titles, descriptions, captions, upload sheet | Images: `videos\*\assets\` |
| Styles, settings, branding source files | Finished videos: `videos\*\renders\` |
| The app and the Claude.ai skill | Thumbnails: `videos\*\thumbnails\` |
| | Edited Studio projects: `videos\*\project\` |

GitHub only gets small text files on purpose: recordings and videos are large and are your raw material.

## Set up a backup (do this now)

The simplest option: once a week, or after each published video, copy the whole `videos` folder to an external drive or cloud folder (OneDrive, Google Drive). Copying it as one zip file works best with cloud folders.

The most important things to keep are **`audio`** and **`assets`**. With them, the app can rebuild every video exactly. Renders can always be made again.

## Moving to another PC

1. Install on the new PC with [guide 2](02-install-on-a-new-pc.md).
2. Copy the `videos` folder from your backup into the new `everyday-engineering` folder. Say **No** to replacing files that are already there; GitHub's copies are current.
3. Open the app. Every video shows the right stage.
4. Optionally, remove the old PC's copy. Don't use both PCs on the same video at the same time.
