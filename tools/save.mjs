// npm run save [-- "message"]
// Commits everything git tracks and pushes it to GitHub (works even if auto_push is off).
import { parseArgs } from "./lib/core.mjs";
import { saveAndPush } from "./lib/git.mjs";

const args = parseArgs();
const msg = args._.join(" ").trim() || `Save ${new Date().toISOString().slice(0, 16).replace("T", " ")}`;
if (!saveAndPush(msg, { force: true })) process.exitCode = 1;
