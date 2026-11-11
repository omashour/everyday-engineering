// Shared helpers: repo paths, YAML/JSON IO, video folder lookup, process runner.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import YAML from "yaml";

// We pass only our own fixed arguments to child processes; hide Node's generic shell warning.
process.noDeprecation = true;

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
export const P = {
  root: ROOT,
  channel: path.join(ROOT, "channel"),
  styles: path.join(ROOT, "styles"),
  topics: path.join(ROOT, "topics"),
  videos: path.join(ROOT, "videos"),
  assets: path.join(ROOT, "assets"),
  nm: path.join(ROOT, "node_modules"),
  runtime: path.join(ROOT, "tools", "runtime"),
};

export function readYaml(file, fallback) {
  if (!fs.existsSync(file)) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing file: ${rel(file)}`);
  }
  try {
    return YAML.parse(fs.readFileSync(file, "utf8")) ?? fallback;
  } catch (e) {
    throw new Error(`Could not parse ${rel(file)}: ${e.message}`);
  }
}
export function writeYaml(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, YAML.stringify(data, { lineWidth: 0 }));
}
export function readJson(file, fallback) {
  if (!fs.existsSync(file)) {
    if (fallback !== undefined) return fallback;
    throw new Error(`Missing file: ${rel(file)}`);
  }
  return JSON.parse(fs.readFileSync(file, "utf8"));
}
export function writeJson(file, data) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
}
export const rel = (p) => path.relative(ROOT, p).replaceAll("\\", "/");

export function brand() {
  return readYaml(path.join(P.channel, "brand.yaml"));
}

/** Resolve a video by number ("1", "001") or folder name. */
export function videoDir(idArg) {
  if (!idArg) fail("Give a video number, e.g. `npm run build -- 001`.");
  if (!fs.existsSync(P.videos)) fail("No videos/ folder yet.");
  const dirs = fs.readdirSync(P.videos).filter((d) => fs.statSync(path.join(P.videos, d)).isDirectory());
  const want = String(idArg).trim();
  const num = /^\d+$/.test(want) ? want.padStart(3, "0") : null;
  const hit = dirs.find((d) => d === want) || (num && dirs.find((d) => d.startsWith(num + "-")));
  if (!hit) fail(`No video folder matches "${want}". Existing: ${dirs.join(", ") || "(none)"}`);
  return path.join(P.videos, hit);
}

export function parseArgs(argv = process.argv.slice(2)) {
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith("--")) {
      const [k, v] = a.slice(2).split("=");
      if (v !== undefined) out[k] = v;
      else if (argv[i + 1] && !argv[i + 1].startsWith("--")) out[k] = argv[++i];
      else out[k] = true;
    } else out._.push(a);
  }
  return out;
}

export function fail(msg) {
  console.error(`\n✖ ${msg}\n`);
  process.exit(1);
}
export const ok = (msg) => console.log(`✔ ${msg}`);
export const info = (msg) => console.log(`  ${msg}`);

/** Run a command, streaming output. Returns exit code. */
export function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { stdio: opts.capture ? "pipe" : "inherit", shell: process.platform === "win32", cwd: opts.cwd || ROOT, encoding: "utf8" });
  if (opts.capture) return { code: r.status, out: (r.stdout || "") + (r.stderr || "") };
  return r.status;
}

/** Run the repo's pinned HyperFrames CLI. */
export function hf(args, opts = {}) {
  const bin = path.join(P.nm, ".bin", process.platform === "win32" ? "hyperframes.cmd" : "hyperframes");
  if (!fs.existsSync(bin)) fail("HyperFrames is not installed. Run `npm install` first.");
  const quoted = process.platform === "win32" ? args.map((a) => (/[\s&()]/.test(a) ? `"${a}"` : a)) : args;
  return run(`"${bin}"`, quoted, opts);
}

export function ffprobeDuration(file) {
  const r = run("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", `"${file}"`], { capture: true });
  const d = parseFloat(r.out);
  if (!Number.isFinite(d)) fail(`Could not read duration of ${rel(file)}. Is FFmpeg installed?`);
  return d;
}

export function copyFile(src, dst) {
  fs.mkdirSync(path.dirname(dst), { recursive: true });
  fs.copyFileSync(src, dst);
}

export const esc = (s) =>
  String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
