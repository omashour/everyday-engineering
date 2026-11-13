// npm run shortcut — puts an "Everyday Engineering" icon on the Windows desktop.
import path from "node:path";
import fs from "node:fs";
import { spawnSync } from "node:child_process";
import { P, ok, fail } from "../lib/core.mjs";

if (process.platform !== "win32") fail("Desktop shortcuts are created on Windows only. Start the app with `npm run app`.");
const target = path.join(P.root, "Everyday Engineering.cmd");
const icon = path.join(P.root, "tools", "app", "app.ico");
if (!fs.existsSync(target)) fail(`Missing ${target}`);
const q = (s) => s.replaceAll("'", "''");
const ps = `$d=[Environment]::GetFolderPath('Desktop'); $s=(New-Object -ComObject WScript.Shell).CreateShortcut((Join-Path $d 'Everyday Engineering.lnk')); $s.TargetPath='${q(target)}'; $s.WorkingDirectory='${q(P.root)}'; $s.IconLocation='${q(icon)}'; $s.WindowStyle=7; $s.Description='Everyday Engineering video studio'; $s.Save(); Write-Output (Join-Path $d 'Everyday Engineering.lnk')`;
const r = spawnSync("powershell", ["-NoProfile", "-Command", ps], { encoding: "utf8" });
if (r.status !== 0) fail(r.stderr || "Could not create the shortcut.");
ok(`Desktop shortcut created: ${r.stdout.trim()}`);
