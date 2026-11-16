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
  projectDir = path.resolve(projectDir);
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
    const idx = fs.readFileSync(path.join(projectDir, "index.html"), "utf8");
    const w = +(idx.match(/data-width="(\d+)"/)?.[1] ?? 1920), h = +(idx.match(/data-height="(\d+)"/)?.[1] ?? 1080);
    await page.setViewport({ width: w, height: h });
    await page.goto(`http://127.0.0.1:${server.address().port}/index.html`, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForFunction(() => window.EE && window.gsap, { timeout: 60000 });
    // HyperFrames' player mounts the scenes at render time; here we mount them ourselves (template + script)
    await page.evaluate(async (w, h) => {
      for (const slot of document.querySelectorAll("[data-composition-src]")) {
        const src = await (await fetch(slot.getAttribute("data-composition-src"))).text();
        const doc = new DOMParser().parseFromString(src, "text/html");
        const tpl = doc.querySelector("template");
        if (!tpl) continue;
        Object.assign(slot.style, { position: "absolute", left: "0", top: "0", width: w + "px", height: h + "px" });
        const frag = tpl.content.cloneNode(true);
        const scripts = [...frag.querySelectorAll("script")];
        scripts.forEach((s) => s.remove());
        slot.appendChild(frag);
        for (const s of scripts) {
          const n = document.createElement("script");
          n.textContent = s.textContent;
          try { document.body.appendChild(n); } catch {}
        }
      }
    }, w, h);
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await new Promise((r) => setTimeout(r, 1500));
    const r = await page.evaluate(() => ({ list: window.__eeOverlaps, labels: document.querySelectorAll(".fo > span, .po-t > *").length, adjusted: document.querySelectorAll("[data-ee-f]").length }));
    if (process.env.EE_DEBUG) console.log("overlap check:", r.labels, "labels,", r.adjusted, "adjusted, ran:", Array.isArray(r.list));
    return Array.isArray(r.list) ? r.list : null; // null: the scenes never ran (check could not run)
  } finally {
    await browser.close();
    server.close();
  }
}

/** One readable line per overlap, scene id first. */
export const overlapLines = (list) => list.map((o) => `${o.scene.replace(/^#/, "")}: "${o.a}" overlaps "${o.b}"`);

/** Print the overlap report for a built project (build, vertical and Shorts scripts call this). */
export async function printOverlaps(projectDir) {
  let list;
  try { list = await overlapReport(projectDir); } catch (e) { console.log(`⚠ Overlap check could not run: ${e.message.split("\n")[0]}`); return; }
  if (list === null) return console.log("⚠ Overlap check could not run (no headless Chrome yet; it is installed with the first render).");
  if (!list.length) return console.log("✔ No overlapping text.");
  console.log(`⚠ Overlapping text, still there after automatic spacing (fix in scenes.yaml: move one label, or shorten it):`);
  for (const l of overlapLines(list)) console.log(`⚠   ${l}`);
}
