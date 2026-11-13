// npm run upload-sheet -- 001
// Writes videos/001-x/upload.md (everything to paste into YouTube Studio) and captions.srt.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, videoDir, ok, info, rel } from "./lib/core.mjs";
import { loadVideo } from "./lib/video.mjs";
import { uploadSheet } from "./lib/uploadsheet.mjs";
import { saveAndPush } from "./lib/git.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const v = loadVideo(dir);
const { data, md, srt } = uploadSheet(v);
fs.writeFileSync(path.join(dir, "upload.md"), md);
fs.writeFileSync(path.join(dir, "captions.srt"), srt);
ok(`Wrote ${rel(path.join(dir, "upload.md"))} and captions.srt (${data.captionLines} caption lines)`);
if (data.warnings.length) info(`${data.warnings.length} thing(s) to check — see the top of upload.md.`);
saveAndPush(`${data.num}: upload sheet and captions`);
