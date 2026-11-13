# 6. Edit a video and fix problems

## Changing a video

| You want to… | Do this |
|---|---|
| Change words, numbers or a visual | Ask Claude in the same chat: "In S04, change …" It replies with only the changed scene. Paste it in step 1 of the app, then press **Make everything** again. |
| Change what's said | Change the scene as above. In step 3, find the chunk that contains that scene (each chunk lists its scenes), re-record only that chunk and drop it on its box. |
| Move, resize or recolor something by hand | Press **Watch & edit in Studio** (HyperFrames Studio). Click an element to edit it, then render again from the app. |
| Swap an image | Drop the new image on its box in step 2, then **Make everything**. |

After you edit in Studio, rebuilding from the script would replace your hand edits, so the app won't do it silently. Press **1. Build**: it asks before replacing them. Then render with **3. Render final video** rather than "Make everything".

## When something goes wrong

The app shows each job's log. Most messages explain themselves; these are the common ones.

| Message or symptom | Fix |
|---|---|
| "Add these photos first" | Make the image from its prompt in step 2 and drop it on its box. |
| "cue not found" or a visual appears at the wrong moment | The cue phrase must match the spoken words exactly. Paste the message to Claude; it sends the fixed scene. |
| A scene's text overflows or overlaps | Tell Claude which scene ("S04: the equation overlaps the graph") and paste the fixed scene. |
| The voice skips or adds words | Re-generate that chunk in Gemini and drop it again. The app re-times automatically. |
| The narration is out of sync | Press **Time the narration** in step 3, then **Make everything**. |
| "Studio did not start" | Close the app's black window, open the app again, and retry. |
| "Could not update from GitHub" when starting | You're offline or not signed in. The app works with this PC's copy; it saves to GitHub next time. |
| Thumbnail with a photo is missing | Its image wasn't added. Add it in step 2 and press **Make thumbnails** in step 5. |

## Getting help from Claude Code

For anything that isn't fixed by changing the script (the app itself, a new kind of visual), open this repo in **Claude Code** and describe the problem. Paste the job log if there is one.
