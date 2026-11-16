// Overlap report: opens a built project in headless Chrome (the one HyperFrames downloaded) and
// returns the text labels that still sit on top of each other after EE.declutter ran.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import http from "node:http";

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".woff2": "font/woff2", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".svg": "image/svg+xml", ".webp": "image/webp", ".wav": "audio/wav", ".mp3": "audio/mpeg" };

function findChrome() {
  const base = path.join(os.homedir(), ".cache", "hyperframes", "chrome");
  const hits = [];
  const walk = (d, depth) => {
    if (depth > 5 || !fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      const p = path.join(d, e.name);
      if (e.isDirectory()) walk(p, depth + 1);
      else if (/^chrome-headless-shell(\.exe)?$/.test(e.name)) hits.push(p);
    }
  };
  walk(base, 0);
  return hits.sort().pop();
}

/** @returns {Promise<{scene:string,a:string,b:string}[] | null>} null when the check could not run */
export async function overlapReport(projectDir) {
  let puppeteer;
  try { puppeteer = (await import("puppeteer-core")).default; } catch { return null; }
  const exe = findChrome();
  if (!exe) return null;
  const server = http.createServer((req, res) => {
    const rel = decodeURIComponent(req.url.split("?")[0]).replace(/^\/+/, "") || "index.html";
    const file = path.join(projectDir, rel);
    if (!file.startsWith(projectDir) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "content-type": TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream" });
    fs.createReadStream(file).pipe(res);
  });
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const browser = await puppeteer.launch({ executablePath: exe, headless: true, args: ["--no-sandbox", "--mute-audio"] });
  try {
    const page = await browser.newPage();
    const meta = JSON.parse(fs.readFileSync(path.join(projectDir, "meta.json"), "utf8"));
    await page.setViewport({ width: meta.width ?? 1920, height: meta.height ?? 1080 });
    await page.goto(`http://127.0.0.1:${server.address().port}/index.html`, { waitUntil: "networkidle0", timeout: 60000 });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await new Promise((r) => setTimeout(r, 1500));
    return await page.evaluate(() => window.__eeOverlaps || []);
  } finally {
    await browser.close();
    server.close();
  }
}

/** One readable line per overlap, scene id first. */
export const overlapLines = (list) => list.map((o) => `${o.scene.replace(/^#/, "")}: "${o.a}" overlaps "${o.b}"`);
