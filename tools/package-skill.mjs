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
fs.rmSync(zip, { force: true });
// bsdtar (built into Windows 10+, macOS) writes zip with -a
const t = spawnSync("tar", ["-a", "-c", "-f", zip, "-C", path.join(P.root, "skill"), "everyday-engineering"], { stdio: "inherit" });
if (t.status !== 0 || !fs.existsSync(zip)) fail("Could not create the zip (needs the `tar` command).");
ok(`Skill packaged: ${rel(zip)} (${(fs.statSync(zip).size / 1024).toFixed(0)} KB)`);
info("Upload it in Claude.ai → Settings → Capabilities → Skills (replace the old version).");
