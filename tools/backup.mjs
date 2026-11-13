// npm run backup                 copy every video's audio, assets, thumbnails and renders to the backup folder
// npm run backup -- --restore    copy them back from the backup folder (only files this PC is missing)
// npm run backup -- --to "G:\My Drive\Everyday Engineering backup"   set the folder (remembered on this PC)
// GitHub keeps scripts and plans; this keeps what GitHub doesn't. Nothing is ever deleted.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, fail, ok, info, P } from "./lib/core.mjs";
import { backupConfig, setBackupFolder, recordBackup, backupFiles, syncTree, mb, backupFolderProblem } from "./lib/backup.mjs";

const args = parseArgs();
const folder = typeof args.to === "string" ? args.to : backupConfig().folder;
if (!folder) fail("No backup folder set. Choose one in the app's Settings (or: npm run backup -- --to \"<folder>\").");
const problem = backupFolderProblem(folder);
if (problem) fail(problem);
if (typeof args.to === "string") setBackupFolder(folder);

if (args.restore) {
  if (!fs.existsSync(path.join(folder, "videos"))) fail(`No backup found in ${folder}`);
  info(`Restoring from ${folder} (files already on this PC are left alone)…`);
  const files = backupFiles(folder);
  const r = syncTree(files, folder, P.root, "restore", info);
  ok(`Restored ${r.copied} file(s), ${mb(r.bytes)}. ${r.skipped} were already here.`);
} else {
  try { fs.mkdirSync(folder, { recursive: true }); } catch (e) { fail(`Can't create the backup folder ${folder}: ${e.message}`); }
  info(`Backing up to ${folder} …`);
  const files = backupFiles();
  const r = syncTree(files, P.root, folder, "backup", info);
  fs.writeFileSync(path.join(folder, "README.txt"), "Everyday Engineering backup: each video's audio, assets (images), thumbnails and renders.\r\nTo restore on a PC, set this folder in the app's Settings and press Restore, or copy the videos folder into the everyday-engineering folder.\r\nScripts and plans are on GitHub.\r\n");
  recordBackup({ time: new Date().toISOString(), files: files.length, bytes: files.reduce((s, f) => s + f.size, 0), copied: r.copied });
  ok(`Backed up: ${r.copied} new or changed file(s), ${mb(r.bytes)}. ${r.skipped} were already up to date.`);
  info(`The backup now holds ${files.length} file(s), ${mb(files.reduce((s, f) => s + f.size, 0))}.`);
}
