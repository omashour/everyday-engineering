# 3. Set up Claude.ai

Do this once. Repeat step 1 whenever you're told the skill changed.

## 1. Install the skill

1. Get the skill file: `dist\everyday-engineering-skill.zip` inside the repo folder. If it isn't there, run `npm run package-skill` in the repo folder (it's rebuilt from the repo, so it's always current).
2. In Claude.ai: click your name (bottom-left) → **Settings → Capabilities → Skills** → upload the zip. If an older version is there, replace it.
3. Make sure **everyday-engineering** is switched on.

## 2. Create the project

1. In Claude.ai, create a **Project** called "Everyday Engineering".
2. **Context** (Claude.ai's name for project knowledge): click **Add**, then either:
   - **GitHub (best):** connect GitHub, pick `omashour/everyday-engineering`, and tick the `topics` folder, the `channel` folder and `styles/index.yaml`; or
   - **Upload:** upload `topics\backlog.yaml` and `topics\covered.yaml` from the repo folder.
3. **Instructions:** click **Add** and paste:

   ```text
   This project is for my YouTube channel Everyday Engineering. For topic ideas, styles, scripts, metadata, thumbnails and Shorts, use the everyday-engineering skill. The topic list is in the project context (backlog.yaml and covered.yaml).
   ```

## 3. Keep Claude up to date

The topic list changes when you start or publish a video (the app saves it to GitHub automatically). Before asking for topics:
- **GitHub context:** press **Sync** on the context in the project.
- **Uploaded files:** remove the old `backlog.yaml` and `covered.yaml` and upload the current ones.

Start a **new chat** for each video. It keeps Claude focused and uses fewer tokens.

## 4. Check it works

Type **suggest topics**. You should get a short table of math topics with IDs like T05 or T14. If there are no T-numbers, Claude isn't seeing the topic list: check step 2.
