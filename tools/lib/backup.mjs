// Backup of what GitHub doesn't keep: each video's recordings, images, thumbnails and renders.
// The backup folder is per PC, so it lives in .local/ (not pushed to GitHub).
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { P, readJson, writeJson } from "./core.mjs";

export const BACKUP_PARTS = ["audio", "assets", "thumbnails", "renders"];
const LOCAL = path.join(P.root, ".local");
const CONF = path.join(LOCAL, "backup.json");

/** {folder, last: {time, files, bytes} | null} */
export function backupConfig() {
  return { folder: "", last: null, ...readJson(CONF, {}) };
}
/** Why a folder can't be used for backups, or "" if it's fine. */
export function backupFolderProblem(folder) {
  if (!path.isAbsolute(folder)) return `The backup folder must be a full path, like G:\\My Drive\\Everyday Engineering backup (got "${folder}").`;
  const f = path.resolve(folder).toLowerCase(), root = path.resolve(P.root).toLowerCase();
  if (f === root || f.startsWith(root + path.sep) || root.startsWith(f + path.sep)) return "The backup folder can't be inside (or contain) the everyday-engineering folder. Pick a cloud folder or another drive.";
  return "";
}
export function setBackupFolder(folder) {
  const c = backupConfig();
  c.folder = String(folder ?? "").trim();
  fs.mkdirSync(LOCAL, { recursive: true });
  writeJson(CONF, c);
  return c;
}
export function recordBackup(last) {
  const c = backupConfig();
  c.last = last;
  fs.mkdirSync(LOCAL, { recursive: true });
  writeJson(CONF, c);
}

/** Cloud-synced folders found on this PC, as suggestions (Google Drive, OneDrive, Dropbox). */
export function suggestedFolders() {
  const home = os.homedir();
  const cands = [];
  for (const d of "DEFGHIJKLMNOPQRSTUVWXYZ") cands.push(`${d}:\\My Drive`);
  try { for (const n of fs.readdirSync(home)) if (/^(OneDrive( - .+)?|Dropbox|Google Drive)$/i.test(n)) cands.push(path.join(home, n)); } catch { /* ignore */ }
  return cands.filter((c) => { try { return fs.statSync(c).isDirectory(); } catch { return false; } })
    .map((c) => path.join(c, "Everyday Engineering backup"));
}

function* walk(dir) {
  let ents = [];
  try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of ents) {
    const f = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(f);
    else if (e.isFile()) yield f;
  }
}

/** Every file to back up: [{rel: "videos/002-x/audio/a.wav", abs, size, mtimeMs}] */
export function backupFiles(root = P.root) {
  const out = [];
  const vids = path.join(root, "videos");
  let dirs = [];
  try { dirs = fs.readdirSync(vids).filter((d) => /^\d{3}-/.test(d)); } catch { /* none */ }
  for (const d of dirs) for (const part of BACKUP_PARTS) for (const abs of walk(path.join(vids, d, part))) {
    const st = fs.statSync(abs);
    out.push({ rel: path.relative(root, abs).replaceAll("\\", "/"), abs, size: st.size, mtimeMs: st.mtimeMs });
  }
  return out;
}

/** Files changed or added since the last backup (for the home-page reminder). */
export function filesSinceBackup() {
  const { last } = backupConfig();
  const since = last?.time ? Date.parse(last.time) : 0;
  return backupFiles().filter((f) => f.mtimeMs > since).length;
}

/**
 * Copy files from one tree to another. Copies a file only if it's missing or different
 * (size or newer time) at the destination. Never deletes anything.
 * mode "backup": repo → folder (newer files replace older ones).
 * mode "restore": folder → repo (only files this PC doesn't have; nothing is overwritten).
 */
export function syncTree(files, fromRoot, toRoot, mode, log = () => {}) {
  let copied = 0, bytes = 0, skipped = 0;
  for (const f of files) {
    const src = path.join(fromRoot, f.rel), dst = path.join(toRoot, f.rel);
    let d = null;
    try { d = fs.statSync(dst); } catch { /* missing */ }
    const need = mode === "restore" ? !d : !d || d.size !== f.size || d.mtimeMs + 2000 < f.mtimeMs;
    if (!need) { skipped++; continue; }
    fs.mkdirSync(path.dirname(dst), { recursive: true });
    fs.copyFileSync(src, dst);
    fs.utimesSync(dst, new Date(), new Date(f.mtimeMs));
    copied++; bytes += f.size;
    log(`  ${f.rel}`);
  }
  return { copied, bytes, skipped };
}

export const mb = (b) => `${(b / 1e6).toFixed(b < 1e7 ? 1 : 0)} MB`;
