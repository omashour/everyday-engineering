# 7. Backups and moving to another PC

## What's where

| Kept on GitHub (automatic) | Only on this PC (use the app's backup) |
|---|---|
| Topic list, roadmap, covered videos | Voice recordings: `videos\*\audio\` |
| Every video's script, titles, descriptions, captions, upload sheet | Images: `videos\*\assets\` |
| Styles, settings, branding source files | Thumbnails: `videos\*\thumbnails\` |
| The app and the Claude.ai skill | Finished videos: `videos\*\renders\` |

GitHub only gets small text files on purpose. Recordings and videos are large, and they are your raw material.

## Set up the backup (once per PC)

1. In the app, open **Settings → Backup folder**.
2. Pick a folder that is **not on this PC's drive alone**: a cloud folder (Google Drive, OneDrive, Dropbox) or an external drive. The app lists the cloud folders it finds; click one to use it, or type a full path, e.g. `G:\My Drive\Everyday Engineering backup`.
3. Press **Save settings**, then **Back up now**.

## Back up regularly

The home page shows a **Backup** bar: when you last backed up, and how many files are new or changed since then. Whenever it's highlighted (for example after recording a voice or rendering a video), press **Back up now**.

- Only new or changed files are copied, so it's quick after the first time.
- Nothing is ever deleted from the backup, even if you delete a video on the PC.
- If you use a cloud folder, wait for it to finish syncing before switching off the PC.

Edits made by hand in Studio live in the video's project, which isn't backed up. Render the video after editing; the rendered MP4 is backed up.

## Moving to another PC

1. Install on the new PC with [guide 2](02-install-on-a-new-pc.md).
2. Make sure the backup folder is available on the new PC (sign in to Google Drive/OneDrive, or plug in the drive).
3. In the app: **Settings → Backup folder**, choose the same folder, **Save settings**, then **Restore from backup (new PC)**. Files already on the new PC are left alone.
4. Every video now shows the right stage. Don't work on the same video on two PCs at the same time.

For people who prefer commands: `npm run backup`, `npm run backup -- --restore`, and `npm run backup -- --to "<folder>"`.
