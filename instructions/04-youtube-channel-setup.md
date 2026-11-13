# 4. Set up the YouTube channel

Do this once (and again if you change the logo, banner or upload day).

## 1. Make the branding images

1. In the app, open **Settings** and set your **upload day** (it appears on the banner and in every description).
2. In the repo folder, run `npm run branding`. It creates these in `channel\branding\out\`:

| File | Where it goes in YouTube Studio |
|---|---|
| `profile-800.png` | Customization → Branding → Picture |
| `banner-2560x1440.png` | Customization → Branding → Banner image |
| `watermark-150.png` | Customization → Branding → Video watermark |
| `endscreen-1920x1080.png` | Reference for the end-screen layout (the last scene of every video already leaves room for it) |

`banner-safe-area-preview.png` and `profile-circle-preview.png` only show how they will be cropped. Don't upload them.

## 2. Channel text

Open `channel\about.yaml`. Paste **description** into YouTube Studio → Customization → Basic info → Description. Add any links there too.

## 3. Upload defaults (saves typing on every video)

YouTube Studio → Settings → **Upload defaults**:
- Category: **Education**; language: **English**.
- Audience: "No, it's not made for kids".
- Tags: `engineering, math, everyday engineering`.

## 4. Playlists

Create each playlist when its first video goes up. The app's **Upload to YouTube** step tells you which playlist a video belongs in, and gives you the playlist description to paste. The planned playlists are in `playlists.yaml`:
- **Math for Engineers** (math phase)
- **Why the World Works This Way** (broad-appeal videos)
- **Engineering Problems, Solved Step by Step** (later)
- **Industrial Engineering** (later)

## 5. AI disclosure

The narration voice is AI-generated, and images may be too. When uploading, YouTube asks about "altered or synthetic content". Check YouTube's current guidance, especially for realistic AI images of people or places.
