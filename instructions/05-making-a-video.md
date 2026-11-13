# 5. Make a video, start to finish

Time: about 1–2 hours of your work per video, plus waiting while the PC renders.

## Step 1. Choose the topic (Claude.ai)

1. Refresh the project's Context (Sync, or re-upload the topic files; see [guide 3](03-claude-ai-setup.md)).
2. In a **new chat** in the Everyday Engineering project, type **suggest topics**.
3. Pick one (for example "T05"), or describe your own idea.
4. Claude suggests the two best **styles**. Pick one:

| Style | Best for |
|---|---|
| A Whiteboard Build | Deriving a formula step by step |
| B Real-World Overlay | Labels and math drawn on a real photo |
| C Graph Lab | Curves, growth, change over time |
| D Story / Case Study | A real event or famous engineer |
| F Problem Solver | A worked engineering problem |

Shorts (style E) are made automatically from every video.

## Step 2. Create the video in the app

1. Open the app (desktop icon). On the home page, **Start a new video**: pick the same topic from the list and press **Create video**.
2. Back in Claude.ai, say **write the script**. Claude writes five files: `scenes.yaml`, `metadata.md`, `thumbnail.yaml`, `shorts.yaml` and `assets-needed.md`.
3. In the app's video page, step **1. Script from Claude**: paste Claude's **whole answer** and save. The app splits it into the five files and checks them. If it reports a problem, paste the message back to Claude and paste its fix the same way.

## Step 3. Images

Step **2. Photos** lists every image the script needs, with an **AI prompt** for each.
1. Press **Copy** on a prompt, paste it into Gemini or ChatGPT, and download the image. Ask for a wide 16:9 image if it comes out square.
2. Drop it on that image's box in the app. It's saved under the right name automatically.
3. Using a real photo instead (your own, or a free one from Wikimedia Commons or Openverse)? Ask Claude to change that scene's **credit** to the photo's author and license, and paste the new scene in step 1.

"Make everything" won't start while an image is missing, so videos never render with empty frames.

## Step 4. Voice (Google AI Studio)

Step **3. Voice** shows everything with Copy buttons.
1. Open Google AI Studio → speech generation. Choose model **Gemini 3.8 Flash TTS** and the voice shown in the app.
2. Paste the **style instructions** into the style field.
3. For each **chunk**: copy it, generate, listen, download, and drop the file on that chunk's box. Re-generate if a word sounds wrong; the pronunciation list in the app helps.
4. When all chunks are in, the app times the narration automatically (about a minute).

Tip: **Make a free robot draft voice** lets you preview the whole video before recording the real voice.

## Step 5. Make everything

Step **4. Build and render**: press **Make everything**. In 5–15 minutes it:
- builds the editable video project and renders the MP4;
- builds and renders each Short;
- makes the thumbnails;
- writes the upload sheet and captions.

Everything is saved in the video's folder on your PC: `videos\NNN-name\renders\` (MP4s) and `thumbnails\` (PNGs).

## Step 6. Watch it

Watch the whole video and each Short in the app before uploading. Check:
- the voice and visuals line up;
- nothing is cut off at the edges, and nothing reads "[author]" or similar;
- numbers on screen match what's said.

To change something, see [guide 6](06-editing-and-troubleshooting.md).

## Step 7. Upload to YouTube

Step **6. Upload to YouTube** has every field with a **Copy** button:
1. YouTube Studio → **Create → Upload videos** → choose the MP4 from `renders\`.
2. Copy the **title**, **description** (chapters included) and **tags**.
3. **Thumbnail:** upload `thumb-1.png`, then use **Test & compare** with `thumb-2.png`.
4. **Captions:** upload `captions.srt` (Subtitles → Upload file → With timing).
5. Add it to the **playlist** shown (create the playlist first if it's new).
6. **End screen:** add a video element and a subscribe element over the empty slots in the last scene.
7. Follow the **Settings** checklist (audience, category, AI disclosure), then publish or schedule for your upload day.
8. After it's live, post the **pinned comment** and pin it.
9. **Shorts:** upload each Short MP4 with its own title and description from the same page. Set its **Related video** to the main video.

## Step 8. Mark as published

Paste the YouTube link into **Mark as published**. The app moves the topic to the "covered" list and saves it to GitHub, so Claude won't suggest it again. Then refresh the Claude.ai project context.
