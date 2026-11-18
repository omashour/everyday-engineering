// npm run package-skill
// Refreshes the generated references and zips the Claude.ai skill:
//   dist/everyday-engineering-skill.zip  → upload in Claude.ai: Settings → Capabilities → Skills
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { P, ok, fail, rel, info } from "./lib/core.mjs";

const r = spawnSync(process.execPath, [path.join(P.root, "tools", "docs.mjs")], { stdio: "inherit" });
if (r.status !== 0) fail("docs generation failed");
const dist = path.join(P.root, "dist");
fs.mkdirSync(dist, { recursive: true });
const zip = path.join(dist, "everyday-engineering-skill.zip");
// bsdtar (built into Windows 10+, macOS) writes zip with -a. On Windows call it by full path:
// Git Bash puts GNU tar first on PATH, which can't write zips. Build to a temp name so a failure
// never leaves dist/ without the previous zip.
const winTar = process.platform === "win32" ? path.join(process.env.SystemRoot ?? "C:\\Windows", "System32", "tar.exe") : null;
const tarCmd = winTar && fs.existsSync(winTar) ? winTar : "tar";
const tmp = path.join(dist, "everyday-engineering-skill.new.zip");
fs.rmSync(tmp, { force: true });
const t = spawnSync(tarCmd, ["-a", "-c", "-f", tmp, "-C", path.join(P.root, "skill"), "everyday-engineering"], { stdio: "inherit" });
if (t.status !== 0 || !fs.existsSync(tmp)) { fs.rmSync(tmp, { force: true }); fail("Could not create the zip (needs the `tar` command)."); }
fs.renameSync(tmp, zip);
ok(`Skill packaged: ${rel(zip)} (${(fs.statSync(zip).size / 1024).toFixed(0)} KB)`);
info("Upload it in Claude.ai → Settings → Capabilities → Skills (replace the old version).");
