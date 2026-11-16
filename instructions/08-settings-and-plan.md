# 8. Settings, updates and the content plan

## App settings (app → Settings)

| Setting | What it does |
|---|---|
| **Gemini voice** | The voice name shown in every voice step. Keep one voice for the whole channel. |
| **Upload day** | Used in descriptions and on the banner. After changing it, remake the banner (`npm run branding`) and upload it. |
| **Music and sound effects** | Each can be off, quiet, normal or louder. The music is a calm bed generated for each video; it drops under the voice and rises in pauses. Sound effects are soft pops, swipes, whooshes and dings on key moments. Changes apply the next time you press **Make everything**. In Studio, music and effects are separate tracks you can mute. |
| **Vertical full video** | When ticked, **Make everything** also makes the whole video in vertical format for TikTok, Reels and similar (adds a few minutes). You can always make it on its own in step 5. |
| **Current phase** | Which theme Claude suggests topics from (see below). |
| **Backup folder** | Where **Back up now** copies recordings, images and videos (see guide 7). |
| **Save progress to GitHub automatically** | Saves scripts and the topic list to GitHub after each step. Recordings and videos are never uploaded. |

Pronunciations Gemini gets wrong go in `channel\voice.yaml` under `pronounce`.

## Updates

- **The app** updates itself from GitHub every time you start it.
- **The Claude.ai skill** does not. When you're told it changed, re-upload `dist\everyday-engineering-skill.zip` ([guide 3](03-claude-ai-setup.md), step 1).

## The content plan

The channel moves through phases, in this order:

1. **math**, always tied to an engineering use (current)
2. **physics**
3. **chemistry**
4. **eng-fundamentals**: solved engineering problems
5. **industrial**: industrial engineering

Each topic belongs to exactly one phase: its main discipline, not the math it uses. Waiting lines, quality control, factory planning and reliability are **industrial** even though they use math. Claude only suggests topics from the current phase.

To move on: in the app, open **Settings → Current phase**, choose the next phase and press **Save settings**. It's saved to GitHub automatically. Then press **Sync** in your Claude.ai project. From then on, Claude's suggestions and the app's new-video list switch completely to that phase. Ask Claude to "suggest new physics topics for the backlog" when the phase needs more ideas. Long-range ideas are in `topics\roadmap.md`.

## Habits that help the channel grow

- Upload on the same day every week, and post the Shorts during the week between videos.
- Use **Test & compare** on every thumbnail.
- After a month, check YouTube Analytics: which hooks and topics got the most views and watch time. Tell Claude what worked when you ask for topics.
