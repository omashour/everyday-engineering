# 2. Install on a new PC

## The easy way (recommended)

1. Sign in to GitHub in your browser.
2. Open the repo on GitHub → folder **setup** → **Setup Everyday Engineering.cmd** → **Download raw file** (the download icon at the top right of the file).
3. Double-click the downloaded file. If Windows says "Windows protected your PC", click **More info → Run anyway**.
4. Wait. The black window shows six steps:
   1. installs Git, Node.js and FFmpeg (skipped if already there);
   2. downloads the repo to `C:\Users\<you>\everyday-engineering` (a GitHub sign-in window may open: sign in as the channel owner);
   3. installs the tools (a few minutes);
   4. downloads the speech-timing model;
   5. runs the self-tests;
   6. puts an **Everyday Engineering** icon on the desktop and opens the app.
5. If a step says something "did not install", restart the PC and run the file again. It's safe to run more than once; it skips what's done.

From then on, just double-click **Everyday Engineering** on the desktop.

## Daily start

- Double-click the desktop icon. A small black window opens (keep it open while you work) and the app opens in your browser at `http://127.0.0.1:4317`.
- Each start downloads the latest changes from GitHub first, so all your PCs stay in step.
- To stop the app, close the black window.
- The app only works on this PC; nobody on the internet can reach it.

## Bring your old files (if you're moving from another PC)

GitHub has the scripts and plans, but **not** voice recordings, images, videos or thumbnails. Copy them from the old PC or your backup: see [guide 7](07-backups-and-moving.md).

## Check it works

On the app's home page you should see your videos. Open one and press **Watch & edit in Studio**: the HyperFrames editor should open with the video.

## The manual way (only if the setup file fails)

Install **Git** (git-scm.com), **Node.js LTS** (nodejs.org) and **FFmpeg** (`winget install Gyan.FFmpeg` in PowerShell). Then in PowerShell:

```powershell
git clone https://github.com/omashour/everyday-engineering.git $HOME\everyday-engineering
cd $HOME\everyday-engineering
npm install
npx hyperframes models install parakeet
npm test
npm run shortcut
```
