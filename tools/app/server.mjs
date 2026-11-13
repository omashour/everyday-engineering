// Everyday Engineering app: a local web page with buttons for every step.
// Start: double-click "Everyday Engineering" on the desktop (or `npm run app`).
// Listens on 127.0.0.1 only, so nothing outside this PC can reach it.
// The buttons run the same tools as the npm commands (tools/*.mjs).
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";
import YAML from "yaml";
import { P, readYaml } from "../lib/core.mjs";
import { allVideos, videoStage } from "../lib/stage.mjs";
import { loadVideo, rawAudioFiles } from "../lib/video.mjs";
import { validateVideo } from "../lib/validate.mjs";
import { ttsPack } from "../lib/ttspack.mjs";
import { uploadSheet } from "../lib/uploadsheet.mjs";
import { splitClaudeOutput, SCRIPT_FILES } from "../lib/claudeparse.mjs";
import { missingAssets, creditPlaceholders } from "../lib/assets.mjs";
import { backupConfig, setBackupFolder, suggestedFolders, filesSinceBackup, backupFolderProblem } from "../lib/backup.mjs";

const PORT = Number(process.env.EE_PORT ?? 4317);
const PUBLIC = path.join(P.root, "tools", "app", "public");
const DIR_RE = /^\d{3}-[a-z0-9-]+$/;
const AUDIO_EXT = [".wav", ".mp3", ".m4a", ".flac", ".ogg"];
const ASSET_EXT = [".jpg", ".jpeg", ".png", ".webp", ".svg", ".gif", ".mp4", ".webm"];
const TYPES = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".mp4": "video/mp4", ".webm": "video/webm", ".wav": "audio/wav", ".mp3": "audio/mpeg", ".m4a": "audio/mp4", ".srt": "text/plain; charset=utf-8", ".md": "text/plain; charset=utf-8", ".yaml": "text/plain; charset=utf-8", ".json": "application/json" };

// ---------------------------------------------------------------- jobs
const jobs = new Map();
let jobSeq = 0;
let preview = null; // { child, url, dir }
const STEP = {
  "tts-pack": ["tts-pack.mjs"], "draft-voice": ["draft-voice.mjs", "--force"], transcribe: ["transcribe.mjs"],
  build: ["build.mjs"], "build-force": ["build.mjs", "--force"], render: ["render.mjs"], shorts: ["shorts.mjs"],
  thumbnail: ["thumbnail.mjs"], "upload-sheet": ["upload-sheet.mjs"], publish: ["publish.mjs"], save: ["save.mjs"],
};
const stripAnsi = (s) => s.replace(/\x1b\[[0-9;?]*[A-Za-z]/g, "").replace(/\r(?!\n)/g, "\n");

function runningJob() {
  return [...jobs.values()].find((j) => j.running);
}
/** steps: [[label, toolArgs]] run one after another; stops at the first failure. */
function startJob(label, steps, video) {
  if (runningJob()) throw new Error(`"${runningJob().label}" is still running. Wait for it to finish.`);
  closeOpenFiles();
  const job = { id: ++jobSeq, label, video, running: true, code: null, log: "", step: "" };
  jobs.set(job.id, job);
  (async () => {
    for (const [name, args] of steps) {
      job.step = name;
      job.log += `\n▶ ${name}\n`;
      const code = await new Promise((resolve) => {
        const child = spawn(process.execPath, [path.join(P.root, "tools", ...args.slice(0, 1)), ...args.slice(1)], { cwd: P.root, env: { ...process.env, FORCE_COLOR: "0", NO_COLOR: "1" } });
        const add = (d) => { job.log = (job.log + stripAnsi(d.toString())).slice(-60000); };
        child.stdout.on("data", add);
        child.stderr.on("data", add);
        child.on("close", resolve);
        child.on("error", (e) => { add(String(e)); resolve(1); });
      });
      if (code !== 0) { job.code = code; job.log += `\n✖ ${name} did not finish (code ${code}).\n`; break; }
      job.code = 0;
    }
    job.running = false;
    job.log += job.code === 0 ? "\n✔ All done.\n" : "";
  })();
  return job;
}

function startPreview(dir, short) {
  stopPreview();
  const proj = short ? path.join(P.videos, dir, "shorts", `short-${short}`, "project") : path.join(P.videos, dir, "project");
  if (!fs.existsSync(path.join(proj, "index.html"))) throw new Error("Build the video first.");
  const bin = path.join(P.nm, "hyperframes", "bin", "hyperframes.mjs");
  const cli = fs.existsSync(bin) ? [process.execPath, [bin]] : [process.platform === "win32" ? "npx.cmd" : "npx", ["hyperframes"]];
  const child = spawn(cli[0], [...cli[1], "preview", proj], { cwd: P.root, env: { ...process.env, FORCE_COLOR: "0", BROWSER: "none" }, shell: cli[0].endsWith(".cmd") });
  preview = { child, url: null, dir, log: "" };
  const grab = (d) => {
    const s = stripAnsi(d.toString());
    preview.log = (preview.log + s).slice(-8000);
    const m = s.match(/https?:\/\/(?:localhost|127\.0\.0\.1):\d+[^\s]*/);
    if (m && !preview.url) preview.url = m[0];
  };
  child.stdout.on("data", grab);
  child.stderr.on("data", grab);
  child.on("close", () => { if (preview?.child === child) preview = null; });
  return preview;
}
function stopPreview() {
  if (!preview) return;
  try {
    if (process.platform === "win32") spawn("taskkill", ["/pid", String(preview.child.pid), "/T", "/F"]);
    else preview.child.kill();
  } catch { /* already gone */ }
  preview = null;
}

// ---------------------------------------------------------------- data
function videoPath(dir, ...rest) {
  if (!DIR_RE.test(dir) || !fs.existsSync(path.join(P.videos, dir))) throw Object.assign(new Error("No such video"), { status: 404 });
  return path.join(P.videos, dir, ...rest);
}
function safeName(name, exts) {
  const base = path.basename(String(name)).replace(/[^A-Za-z0-9._-]+/g, "-");
  if (!exts.includes(path.extname(base).toLowerCase())) throw Object.assign(new Error(`File type not allowed: ${base}`), { status: 400 });
  return base;
}
const list = (d, exts) => (fs.existsSync(d) ? fs.readdirSync(d).filter((f) => !exts || exts.includes(path.extname(f).toLowerCase())).sort() : []);

async function videoDetail(dir) {
  const vdir = videoPath(dir);
  const st = videoStage(dir);
  const out = { ...st, assets: list(path.join(vdir, "assets")), thumbnails: list(path.join(vdir, "thumbnails"), [".png"]), renders: list(path.join(vdir, "renders"), [".mp4"]), files: {} };
  for (const f of SCRIPT_FILES) out.files[f] = fs.existsSync(path.join(vdir, f));
  out.assetsNeeded = fs.existsSync(path.join(vdir, "assets-needed.md")) ? fs.readFileSync(path.join(vdir, "assets-needed.md"), "utf8") : "";
  out.missingAssets = missingAssets(vdir);
  out.creditTodo = creditPlaceholders(vdir);
  out.built = fs.existsSync(path.join(vdir, "project", "index.html"));
  out.timed = fs.existsSync(path.join(vdir, "audio", "words.json")) && fs.existsSync(path.join(vdir, "audio", "narration-full.wav"));
  out.shortsSpec = (readYaml(path.join(vdir, "shorts.yaml"), { shorts: [] }).shorts ?? []).map((s, i) => ({ n: i + 1, title: s.title, built: fs.existsSync(path.join(vdir, "shorts", `short-${i + 1}`, "project", "index.html")) }));
  try {
    const v = loadVideo(vdir);
    const probs = await validateVideo(v);
    out.validation = { problems: probs.map((p) => ({ level: p.level, msg: p.msg })), words: probs.words, minutes: +probs.minutes.toFixed(1), scenes: v.scenes.length };
    out.tts = ttsPack(v);
    delete out.tts.scriptMd;
    delete out.tts.ttsMd;
  } catch (e) {
    out.validation = { problems: [{ level: "error", msg: e.message }], words: 0, minutes: 0, scenes: 0 };
  }
  out.preview = preview && preview.dir === dir ? { url: preview.url } : null;
  return out;
}


function settings() {
  const voice = readYaml(path.join(P.channel, "voice.yaml"), {});
  const about = readYaml(path.join(P.channel, "about.yaml"), {});
  const s = readYaml(path.join(P.root, "settings.yaml"), {});
  const bk = backupConfig();
  return { voice: voice.gemini?.voice ?? "", uploadDay: about.upload_day ?? "", autoPush: s?.git?.auto_push !== false, backup: { folder: bk.folder, last: bk.last, pending: filesSinceBackup(), suggestions: suggestedFolders() } };
}
function setYamlKey(file, keyPath, value) {
  const doc = YAML.parseDocument(fs.readFileSync(file, "utf8"));
  doc.setIn(keyPath, value);
  fs.writeFileSync(file, doc.toString({ lineWidth: 0 }));
}

// ---------------------------------------------------------------- http helpers
const send = (res, code, body, type = "application/json") => {
  res.writeHead(code, { "Content-Type": type, "Cache-Control": "no-store" });
  res.end(type === "application/json" ? JSON.stringify(body) : body);
};
const readBody = (req, limit = 5e6) =>
  new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", (c) => { size += c.length; if (size > limit) { reject(Object.assign(new Error("Too large"), { status: 413 })); req.destroy(); } else chunks.push(c); });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
const json = async (req) => JSON.parse((await readBody(req)).toString("utf8") || "{}");

function serveFile(req, res, file) {
  if (!fs.existsSync(file) || !fs.statSync(file).isFile()) return send(res, 404, { error: "Not found" });
  const type = TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  const size = fs.statSync(file).size;
  const range = req.headers.range?.match(/bytes=(\d*)-(\d*)/);
  if (range) {
    const start = range[1] ? +range[1] : 0, end = range[2] ? +range[2] : size - 1;
    res.writeHead(206, { "Content-Type": type, "Content-Range": `bytes ${start}-${end}/${size}`, "Accept-Ranges": "bytes", "Content-Length": end - start + 1 });
    return stream(fs.createReadStream(file, { start, end }), res);
  }
  res.writeHead(200, { "Content-Type": type, "Content-Length": size, "Accept-Ranges": "bytes", "Cache-Control": "no-store" });
  stream(fs.createReadStream(file), res);
}
// Open file streams. On Windows an open file can't be replaced, so a video playing in the app
// would block re-rendering it: every stream is closed when its request ends and when a job starts.
const openStreams = new Set();
function stream(s, res) {
  openStreams.add(s);
  const done = () => { openStreams.delete(s); s.destroy(); };
  s.on("close", () => openStreams.delete(s));
  res.on("close", done);
  s.pipe(res);
}
function closeOpenFiles() {
  for (const s of openStreams) s.destroy();
  openStreams.clear();
}

function openInOS(target) {
  const cmd = process.platform === "win32" ? ["explorer.exe", [target]] : process.platform === "darwin" ? ["open", [target]] : ["xdg-open", [target]];
  spawn(cmd[0], cmd[1], { detached: true, stdio: "ignore" }).unref();
}

// ---------------------------------------------------------------- routes
async function route(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const p = url.pathname;
  const m = (re) => p.match(re);
  let r;

  if (req.method === "GET" && (p === "/" || p === "/index.html")) return serveFile(req, res, path.join(PUBLIC, "index.html"));
  if (req.method === "GET" && (r = m(/^\/(app\.js|app\.css)$/))) return serveFile(req, res, path.join(PUBLIC, r[1]));
  if (req.method === "GET" && p === "/logo.svg") return serveFile(req, res, path.join(P.channel, "branding", "logo.svg"));

  if (req.method === "GET" && p === "/api/state") {
    const backlog = readYaml(path.join(P.topics, "backlog.yaml"), []);
    const topics = backlog.filter((t) => (t.status ?? "idea") === "idea").map((t) => ({ id: t.id, title: t.title, hook: t.hook, styles: t.styles, phase: t.phase }));
    return send(res, 200, { videos: allVideos(), topics, settings: settings(), job: runningJob() ?? null });
  }
  if (req.method === "POST" && p === "/api/settings") {
    const b = await json(req);
    if (typeof b.voice === "string") setYamlKey(path.join(P.channel, "voice.yaml"), ["gemini", "voice"], b.voice.trim() || null);
    if (typeof b.uploadDay === "string") setYamlKey(path.join(P.channel, "about.yaml"), ["upload_day"], b.uploadDay.trim() || null);
    if (typeof b.autoPush === "boolean") setYamlKey(path.join(P.root, "settings.yaml"), ["git", "auto_push"], b.autoPush);
    if (typeof b.backupFolder === "string") {
      const f = b.backupFolder.trim();
      const problem = f && backupFolderProblem(f);
      if (problem) return send(res, 400, { error: problem });
      setBackupFolder(f);
    }
    return send(res, 200, settings());
  }
  if (req.method === "POST" && p === "/api/backup") {
    const b = await json(req);
    if (!backupConfig().folder) return send(res, 400, { error: "Choose a backup folder in Settings first." });
    const restore = !!b.restore;
    return send(res, 200, { job: startJob(restore ? "Restore from backup" : "Back up", [[restore ? "Restore from backup" : "Back up recordings, images and videos", ["backup.mjs", ...(restore ? ["--restore"] : [])]]]).id });
  }
  if (req.method === "POST" && p === "/api/backup/open") {
    const f = backupConfig().folder;
    if (f && fs.existsSync(f)) openInOS(f);
    return send(res, 200, { ok: true });
  }
  if (req.method === "POST" && p === "/api/new-video") {
    const b = await json(req);
    const arg = String(b.topic ?? "").trim();
    if (!arg) return send(res, 400, { error: "Pick a topic or type a title." });
    const before = new Set(allVideos().map((v) => v.dir));
    const job = startJob(`New video: ${arg}`, [["Create the video folder", ["new-video.mjs", arg]]]);
    const wait = setInterval(() => {
      if (job.running) return;
      clearInterval(wait);
      job.newDir = allVideos().map((v) => v.dir).find((d) => !before.has(d)) ?? null;
    }, 200);
    return send(res, 200, { job: job.id });
  }
  if (req.method === "GET" && (r = m(/^\/api\/jobs\/(\d+)$/))) {
    const job = jobs.get(+r[1]);
    return job ? send(res, 200, job) : send(res, 404, { error: "No such job" });
  }
  if (req.method === "GET" && (r = m(/^\/api\/video\/([^/]+)$/))) return send(res, 200, await videoDetail(r[1]));

  if (req.method === "POST" && (r = m(/^\/api\/video\/([^/]+)\/script$/))) {
    const dir = r[1];
    const b = await json(req);
    let files = b.files ?? {};
    if (b.paste) files = { ...splitClaudeOutput(b.paste), ...files };
    const names = Object.keys(files).filter((f) => SCRIPT_FILES.includes(f));
    if (!names.length) return send(res, 400, { error: "I couldn't find any of the five files (scenes.yaml, metadata.md, thumbnail.yaml, shorts.yaml, assets-needed.md) in what you pasted. Paste Claude's whole answer, including the file names." });
    for (const f of names) fs.writeFileSync(videoPath(dir, f), files[f].replace(/\r\n/g, "\n").trimEnd() + "\n");
    const detail = await videoDetail(dir);
    let job = null;
    if (!detail.validation.problems.some((x) => x.level === "error")) job = startJob("Save script and make the voice package", [["Voice package", ["tts-pack.mjs", detail.id]]], dir).id;
    return send(res, 200, { saved: names, detail, job });
  }
  if (req.method === "PUT" && (r = m(/^\/api\/video\/([^/]+)\/(audio|assets)\/([^/]+)$/))) {
    const [, dir, kind, raw] = r;
    const name = safeName(decodeURIComponent(raw), kind === "audio" ? AUDIO_EXT : ASSET_EXT);
    const target = videoPath(dir, kind, name);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    if (kind === "audio") {
      // a real recording replaces the robot draft; drop any other format of the same chunk
      for (const f of list(videoPath(dir, "audio"), AUDIO_EXT)) {
        if (f === "narration-full.wav") continue;
        if (f.startsWith("narration-draft") || (path.parse(f).name === path.parse(name).name && f !== name)) fs.rmSync(videoPath(dir, "audio", f));
      }
    }
    fs.writeFileSync(target, await readBody(req, 2e9));
    return send(res, 200, { saved: name });
  }
  if (req.method === "DELETE" && (r = m(/^\/api\/video\/([^/]+)\/(audio|assets)\/([^/]+)$/))) {
    const [, dir, kind, raw] = r;
    const target = videoPath(dir, kind, path.basename(decodeURIComponent(raw)));
    if (fs.existsSync(target)) fs.rmSync(target);
    return send(res, 200, { ok: true });
  }
  if (req.method === "POST" && (r = m(/^\/api\/video\/([^/]+)\/run$/))) {
    const dir = r[1];
    videoPath(dir);
    const id = dir.slice(0, 3);
    const b = await json(req);
    const step = b.step;
    let steps;
    if (step === "make-all") {
      const d = await videoDetail(dir);
      if (d.missingAssets.length && !b.allowMissing) return send(res, 400, { error: `Add these photos first (step 2, Photos), or the video renders with empty frames:\n${d.missingAssets.map((a) => `• ${a.file} (used in ${a.usedIn.join(", ")})`).join("\n")}` });
      steps = [];
      if (!d.timed) steps.push(["Time the narration", ["transcribe.mjs", id]]);
      steps.push(["Build the video", ["build.mjs", id, ...(b.force ? ["--force"] : [])]], ["Render the video", ["render.mjs", id]], ["Build the Shorts", ["shorts.mjs", id]]);
      d.shortsSpec.forEach((s) => steps.push([`Render Short ${s.n}`, ["render.mjs", id, "--short", String(s.n)]]));
      steps.push(["Thumbnails", ["thumbnail.mjs", id]], ["Upload sheet", ["upload-sheet.mjs", id]]);
    } else if (step === "render-short") steps = [[`Render Short ${b.n}`, ["render.mjs", id, "--short", String(+b.n || 1)]]];
    else if (step === "render-shorts") steps = (await videoDetail(dir)).shortsSpec.map((s) => [`Render Short ${s.n}`, ["render.mjs", id, "--short", String(s.n)]]);
    else if (step === "publish") {
      const link = String(b.url ?? "").trim();
      if (!/^https:\/\/(www\.)?(youtube\.com|youtu\.be)\/\S+$/.test(link)) return send(res, 400, { error: "Paste the YouTube link of the uploaded video (https://youtu.be/… or https://www.youtube.com/watch?v=…)." });
      steps = [["Mark as published", ["publish.mjs", id, "--url", link]]];
    } else if (STEP[step]) steps = [[b.label ?? step, [STEP[step][0], id, ...STEP[step].slice(1)]]];
    else return send(res, 400, { error: `Unknown step ${step}` });
    if (["build", "build-force", "make-all", "render"].includes(step)) stopPreview();
    return send(res, 200, { job: startJob(b.label ?? step, steps, dir).id });
  }
  if (req.method === "POST" && (r = m(/^\/api\/video\/([^/]+)\/preview$/))) {
    const b = await json(req);
    const pv = startPreview(r[1], b.short);
    for (let i = 0; i < 100 && !pv.url && preview; i++) await new Promise((ok) => setTimeout(ok, 200));
    return pv.url ? send(res, 200, { url: pv.url }) : send(res, 500, { error: `Studio did not start:\n${pv.log.slice(-1500)}` });
  }
  if (req.method === "POST" && p === "/api/preview/stop") { stopPreview(); return send(res, 200, { ok: true }); }
  if (req.method === "GET" && (r = m(/^\/api\/video\/([^/]+)\/upload$/))) {
    const dir = r[1];
    const v = loadVideo(videoPath(dir));
    const { data, md, srt } = uploadSheet(v);
    fs.writeFileSync(videoPath(dir, "upload.md"), md);
    fs.writeFileSync(videoPath(dir, "captions.srt"), srt);
    return send(res, 200, data);
  }
  if (req.method === "GET" && (r = m(/^\/api\/video\/([^/]+)\/file$/))) {
    const rel = url.searchParams.get("path") ?? "";
    if (rel.includes("..") || path.isAbsolute(rel)) return send(res, 400, { error: "Bad path" });
    return serveFile(req, res, videoPath(r[1], rel));
  }
  if (req.method === "POST" && (r = m(/^\/api\/video\/([^/]+)\/open$/))) {
    const b = await json(req);
    const sub = ["", "audio", "assets", "renders", "thumbnails", "project"].includes(b.sub) ? b.sub : "";
    const target = videoPath(r[1], sub);
    fs.mkdirSync(target, { recursive: true });
    if (b.file && SCRIPT_FILES.includes(b.file)) openInOS(videoPath(r[1], b.file));
    else openInOS(target);
    return send(res, 200, { ok: true });
  }
  return send(res, 404, { error: "Not found" });
}

const server = http.createServer(async (req, res) => {
  // Only this PC, and only pages served by this app (blocks other websites from calling it).
  const host = req.headers.host ?? "";
  if (!/^(127\.0\.0\.1|localhost):\d+$/.test(host)) return send(res, 403, { error: "Forbidden" });
  const origin = req.headers.origin;
  if (req.method !== "GET" && origin && !/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin)) return send(res, 403, { error: "Forbidden" });
  try {
    await route(req, res);
  } catch (e) {
    if (!res.headersSent) send(res, e.status ?? 500, { error: e.message });
  }
});

server.on("error", (e) => {
  if (e.code === "EADDRINUSE") {
    console.log(`The app is already running. Opening http://127.0.0.1:${PORT}`);
    if (!process.argv.includes("--no-open")) openInOS(`http://127.0.0.1:${PORT}`);
    process.exit(0);
  }
  throw e;
});
server.listen(PORT, "127.0.0.1", () => {
  const link = `http://127.0.0.1:${PORT}`;
  console.log(`\n  Everyday Engineering is running at ${link}\n  Keep this window open while you work. Close it to stop the app.\n`);
  if (!process.argv.includes("--no-open")) openInOS(link);
});
process.on("exit", stopPreview);
process.on("SIGINT", () => process.exit(0));
