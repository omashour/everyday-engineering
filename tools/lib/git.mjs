// Save work to GitHub automatically: commit everything git tracks (audio, renders and
// builds are excluded by .gitignore) and push. Never stops the calling command:
// if you're offline or GitHub refuses, it warns and the next save catches up.
// Turn off in settings.yaml (git.auto_push: false) or per command with --no-push.
import path from "node:path";
import { spawnSync } from "node:child_process";
import { P, readYaml } from "./core.mjs";

const git = (args) => {
  const r = spawnSync("git", args, { cwd: P.root, encoding: "utf8" });
  return { code: r.status, out: ((r.stdout || "") + (r.stderr || "")).trim() };
};

export function autoPushEnabled(argv = process.argv) {
  if (argv.includes("--no-push")) return false;
  const s = readYaml(path.join(P.root, "settings.yaml"), {});
  return s?.git?.auto_push !== false;
}

/** Commit all changes with `message` and push. Returns true when GitHub is up to date. */
export function saveAndPush(message, { force = false } = {}) {
  if (!force && !autoPushEnabled()) return false;
  if (git(["rev-parse", "--is-inside-work-tree"]).code !== 0) {
    console.log("⚠ Not a git repository: nothing saved to GitHub.");
    return false;
  }
  git(["add", "-A"]);
  const staged = git(["diff", "--cached", "--quiet"]).code !== 0;
  if (staged) {
    const c = git(["commit", "-m", message]);
    if (c.code !== 0) {
      console.log(`⚠ Could not commit: ${c.out.split("\n").slice(-2).join(" ")}`);
      return false;
    }
  }
  const ahead = git(["rev-list", "--count", "@{u}..HEAD"]);
  if (ahead.code === 0 && ahead.out === "0") {
    if (staged) console.log("✔ Saved to GitHub.");
    return true;
  }
  const p = git(["push"]);
  if (p.code !== 0) {
    console.log("⚠ Saved on this PC, but pushing to GitHub failed (offline or not signed in?). It will go up with the next save or `npm run save`.");
    return false;
  }
  console.log(`✔ Saved to GitHub${staged ? `: ${message}` : ""}.`);
  return true;
}
