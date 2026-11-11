// Render a single still image (PNG) from HTML through HyperFrames' snapshot,
// so thumbnails and channel art use the same fonts, math and colors as the videos.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { P, brand as loadBrand, copyFile, hf, fail } from "./core.mjs";

export function renderStill({ width, height, html, css = "", out, assets = [] }) {
  const b = loadBrand();
  const c = b.colors;
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ee-still-"));
  for (const f of ["inter-latin-400-normal", "inter-latin-600-normal", "inter-latin-800-normal"]) copyFile(path.join(P.nm, "@fontsource", "inter", "files", f + ".woff2"), path.join(dir, "assets", "fonts", f + ".woff2"));
  copyFile(path.join(P.nm, "@fontsource", "caveat", "files", "caveat-latin-700-normal.woff2"), path.join(dir, "assets", "fonts", "caveat-latin-700-normal.woff2"));
  const kdist = path.join(P.nm, "katex", "dist");
  copyFile(path.join(kdist, "katex.min.css"), path.join(dir, "assets", "katex", "katex.min.css"));
  for (const f of fs.readdirSync(path.join(kdist, "fonts"))) copyFile(path.join(kdist, "fonts", f), path.join(dir, "assets", "katex", "fonts", f));
  copyFile(path.join(P.nm, "gsap", "dist", "gsap.min.js"), path.join(dir, "assets", "vendor", "gsap.min.js"));
  for (const a of assets) copyFile(a.from, path.join(dir, "assets", "media", a.name));
  const base = fs.readFileSync(path.join(P.runtime, "ee.css"), "utf8");
  const doc = `<!doctype html><html lang="en"><head><meta charset="UTF-8" /><meta name="viewport" content="width=${width}, height=${height}" />
<link rel="stylesheet" href="assets/katex/katex.min.css" /><script src="assets/vendor/gsap.min.js"></script>
<style>:root{--navy:${c.navy};--ink:${c.ink};--paper:${c.paper};--text:${c.text};--muted:${c.muted};--marker:${c.marker};--red:${c.red};--blue:${c.blue};--green:${c.green};--grid:${c.grid};--safe:0px;}
html{font-size:40px;} html,body{width:${width}px;height:${height}px;}
${base}
${css}</style></head><body>
<div id="root" data-composition-id="main" data-start="0" data-duration="1" data-width="${width}" data-height="${height}">
<div id="still" class="clip" data-start="0" data-duration="1" style="position:absolute;inset:0">${html}</div>
</div>
<script>const tl = gsap.timeline({ paused: true }); window.__timelines["main"] = tl;</script>
</body></html>`;
  fs.writeFileSync(path.join(dir, "index.html"), doc);
  fs.writeFileSync(path.join(dir, "hyperframes.json"), JSON.stringify({ paths: { assets: "assets" } }));
  const snapDir = path.join(dir, "_snap");
  const r = hf(["snapshot", dir, "--at", "0.5", "--no-end", "--output", snapDir, "--json"], { capture: true });
  const png = fs.existsSync(snapDir) ? fs.readdirSync(snapDir).find((f) => f.endsWith(".png")) : null;
  if (!png) fail(`Snapshot failed:\n${r.out.slice(-1500)}`);
  copyFile(path.join(snapDir, png), out);
  fs.rmSync(dir, { recursive: true, force: true });
  return out;
}
