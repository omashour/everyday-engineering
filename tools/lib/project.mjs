// Assemble one HyperFrames project (index.html + assets) from scenes and timing.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { P, brand as loadBrand, copyFile, esc, rel } from "./core.mjs";
import { tex, rich, icon } from "./kit.mjs";
import { cueTime } from "./timing.mjs";
import { loadComponents } from "./components.mjs";

const HF_VERSION = JSON.parse(fs.readFileSync(path.join(P.root, "package.json"), "utf8")).dependencies.hyperframes;

/** Write non-ASCII characters as escapes so files render the same whatever charset a server assumes. */
const htmlAscii = (s) => s.replace(/[^\x00-\x7F]/gu, (ch) => `&#x${ch.codePointAt(0).toString(16)};`);
const jsAscii = (s) => s.replace(/[^\x00-\x7F]/gu, (ch) => `\\u{${ch.codePointAt(0).toString(16)}}`);
/** Escape markup and script parts of an HTML document separately. */
const cssAscii = (s) => s.replace(/[^\x00-\x7F]/gu, (ch) => `\\${ch.codePointAt(0).toString(16)} `);
function asciiDoc(doc) {
  return doc
    .split(/(<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>)/g)
    .map((part) => (part.startsWith("<script") ? jsAscii(part) : part.startsWith("<style") ? cssAscii(part) : htmlAscii(part)))
    .join("");
}

export function formatOf(brand, fmt) {
  const f = brand.formats[fmt];
  if (!f) throw new Error(`Unknown format ${fmt}`);
  return f;
}

/**
 * @param o.scenes    scenes (from scenes.yaml)
 * @param o.timing    {scenes:{id:{start,end,tokens,tokenTimes}}, total}
 * @param o.fmt       'long' | 'short'
 * @param o.outDir    project directory
 * @param o.videoDir  video folder (assets are looked up in <videoDir>/assets)
 * @param o.audio     absolute path of narration audio or null (silent draft)
 * @param o.overlayHtml optional extra HTML on top of everything (Shorts hook banner)
 * @param o.overlayJs   JS for it
 * @param o.name      project name
 * @returns {warnings: string[], duration}
 */
export async function buildProject(o) {
  const brand = loadBrand();
  const F = formatOf(brand, o.fmt);
  const reg = await loadComponents();
  const warnings = [];
  const out = o.outDir;
  fs.mkdirSync(path.join(out, "assets"), { recursive: true });

  // vendor + fonts + katex
  copyFile(path.join(P.nm, "gsap", "dist", "gsap.min.js"), path.join(out, "assets", "vendor", "gsap.min.js"));
  copyFile(path.join(P.runtime, "ee.js"), path.join(out, "assets", "ee.js"));
  for (const f of ["inter-latin-400-normal", "inter-latin-600-normal", "inter-latin-800-normal"]) copyFile(path.join(P.nm, "@fontsource", "inter", "files", f + ".woff2"), path.join(out, "assets", "fonts", f + ".woff2"));
  copyFile(path.join(P.nm, "@fontsource", "caveat", "files", "caveat-latin-700-normal.woff2"), path.join(out, "assets", "fonts", "caveat-latin-700-normal.woff2"));
  const kdist = path.join(P.nm, "katex", "dist");
  copyFile(path.join(kdist, "katex.min.css"), path.join(out, "assets", "katex", "katex.min.css"));
  for (const f of fs.readdirSync(path.join(kdist, "fonts"))) copyFile(path.join(kdist, "fonts", f), path.join(out, "assets", "katex", "fonts", f));

  const assetFn = (src) => {
    let from;
    if (src.startsWith("brand:")) from = path.join(P.channel, "branding", src.slice(6));
    else from = path.join(o.videoDir, "assets", src);
    if (!fs.existsSync(from)) {
      warnings.push(`missing asset: ${rel(from)}`);
      return "";
    }
    const name = path.basename(from);
    copyFile(from, path.join(out, "assets", "media", name));
    return `assets/media/${name}`;
  };

  const c = brand.colors;
  const vars = `:root{--navy:${c.navy};--ink:${c.ink};--paper:${c.paper};--text:${c.text};--muted:${c.muted};--marker:${c.marker};--red:${c.red};--blue:${c.blue};--green:${c.green};--grid:${c.grid};--safe:${F.safe_margin_px}px;--safe-top:${F.safe_top_px ?? F.safe_margin_px}px;--safe-bottom:${F.safe_bottom_px ?? F.safe_margin_px}px;}
html{font-size:${F.base_px}px;}`;
  const baseCss = fs.readFileSync(path.join(P.runtime, "ee.css"), "utf8");

  // One sub-composition file per scene (compositions/S01.html …), with scene-local times.
  // Studio then shows one clip per scene, and each scene can be edited on its own.
  const compDir = path.join(out, "compositions");
  fs.rmSync(compDir, { recursive: true, force: true });
  fs.mkdirSync(compDir, { recursive: true });
  let body = "";
  o.scenes.forEach((sc, idx) => {
    const ta = o.timing.scenes[sc.id];
    const comp = reg[sc.component];
    if (!comp) {
      warnings.push(`${sc.id}: unknown component "${sc.component}"`);
      return;
    }
    const dur = ta.end - ta.start;
    const t = { ...ta, start: 0, end: dur, tokenTimes: ta.tokenTimes.map((x) => x - ta.start), tokenEnds: ta.tokenEnds?.map((x) => x - ta.start) };
    const ctx = makeCtx(sc, t, brand, F, o.fmt, warnings, assetFn);
    let r;
    try {
      r = comp.render(sc.params ?? {}, ctx);
    } catch (e) {
      warnings.push(`${sc.id} (${sc.component}): ${e.message}`);
      r = { html: `<div class="heading">⚠ ${esc(sc.component)}: ${esc(e.message)}</div>`, js: "" };
    }
    const navy = comp.navy || sc.params?.navy;
    let js = idx === 0 ? "" : `EE.fade(tl, "#${sc.id}-in", 0, 0.3);\n`;
    // a very slow drift keeps whiteboard scenes alive without distracting (photo scenes have their own zoom)
    if (!r.fullBleed && sc.params?.drift !== false) js += `EE.kenburns(tl, "#${sc.id}-in", 0, ${dur.toFixed(3)}, 1, 1.03);\n`;
    js += r.js;
    const file = `<!doctype html>
<!-- ${sc.id} · ${sc.component}. Generated by tools/build.mjs from scenes.yaml (times are scene-local, in seconds). -->
<html lang="en">
  <head><meta charset="UTF-8" /></head>
  <body>
    <template>
      <link rel="stylesheet" href="assets/katex/katex.min.css" />
      <style>
#${sc.id} { position:absolute; inset:0; overflow:hidden; background:${navy ? "var(--navy)" : "var(--paper)"}; color:${navy ? "#fff" : "var(--text)"}; }
${comp.css ?? ""}
      </style>
      <div id="${sc.id}" data-composition-id="${sc.id}" data-width="${F.width}" data-height="${F.height}">
        <div class="fmt-${o.fmt}${navy ? " navy" : ""}" style="position:absolute;inset:0">
          <div class="scene-in" id="${sc.id}-in">${r.html}</div>
        </div>
      </div>
      <script>
        (function () {
          const tl = gsap.timeline({ paused: true });
${js}
          window.__timelines["${sc.id}"] = tl;
        })();
      </script>
    </template>
  </body>
</html>
`;
    fs.writeFileSync(path.join(compDir, `${sc.id}.html`), asciiDoc(file));
    body += `\n    <div id="slot-${sc.id}" data-composition-id="${sc.id}" data-composition-src="compositions/${sc.id}.html" data-start="${ta.start.toFixed(3)}" data-duration="${dur.toFixed(3)}" data-track-index="1" data-width="${F.width}" data-height="${F.height}" data-label="${esc(sc.id + " · " + sc.component)}"></div>`;
  });
  const total = o.timing.total;
  let audioTag = "";
  if (o.audio) {
    copyFile(o.audio, path.join(out, "assets", "narration" + path.extname(o.audio)));
    const aDur = Math.min(total, o.timing.audioDuration ?? total);
    audioTag = `\n    <audio id="narration" src="assets/narration${path.extname(o.audio)}" data-start="0" data-duration="${aDur.toFixed(3)}" data-track-index="0" data-volume="1"></audio>`;
  }
  if (brand.music?.file) {
    const mf = path.join(P.assets, "music", brand.music.file);
    if (fs.existsSync(mf)) {
      copyFile(mf, path.join(out, "assets", "music" + path.extname(mf)));
      audioTag += `\n    <audio id="music" src="assets/music${path.extname(mf)}" data-start="0" data-duration="${total.toFixed(3)}" data-track-index="3" data-volume="${brand.music.volume ?? 0.08}"></audio>`;
    }
  }

  const html = `<!doctype html>
<!-- Generated by tools/build.mjs from scenes.yaml. Each scene is a file in compositions/.
     Edit freely in HyperFrames Studio, but note: running the build again regenerates the
     project (it refuses if you edited it, unless you pass --force). -->
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=${F.width}, height=${F.height}" />
    <title>${esc(o.name)}</title>
    <link rel="stylesheet" href="assets/katex/katex.min.css" />
    <script src="assets/vendor/gsap.min.js"></script>
    <script src="assets/ee.js"></script>
    <style>
${vars}
html,body{width:${F.width}px;height:${F.height}px;}
${baseCss}
    </style>
  </head>
  <body>
    <div id="root" class="fmt-${o.fmt}" data-composition-id="main" data-start="0" data-duration="${total.toFixed(3)}" data-width="${F.width}" data-height="${F.height}">${audioTag}${body}${o.overlayHtml ?? ""}
    </div>
    <script>
      const tl = gsap.timeline({ paused: true });
${o.overlayJs ?? ""}
      window.__timelines["main"] = tl;
    </script>
  </body>
</html>
`;
  fs.writeFileSync(path.join(out, "index.html"), asciiDoc(html));
  fs.writeFileSync(path.join(out, "hyperframes.json"), JSON.stringify({ $schema: "https://hyperframes.heygen.com/schema/hyperframes.json", registry: "https://raw.githubusercontent.com/heygen-com/hyperframes/main/registry", paths: { blocks: "compositions", components: "compositions/components", assets: "assets" }, media: { autoProxy: true } }, null, 2));
  const metaFile = path.join(out, "meta.json");
  if (!fs.existsSync(metaFile)) fs.writeFileSync(metaFile, JSON.stringify({ id: o.name, name: o.name, createdAt: new Date().toISOString() }, null, 2));
  fs.writeFileSync(path.join(out, "package.json"), JSON.stringify({ name: o.name, private: true, type: "module", scripts: { dev: `npx --yes hyperframes@${HF_VERSION} preview`, check: `npx --yes hyperframes@${HF_VERSION} check`, render: `npx --yes hyperframes@${HF_VERSION} render` } }, null, 2));
  fs.writeFileSync(path.join(out, ".ee-build.json"), JSON.stringify({ hash: hashProject(out), builtAt: new Date().toISOString() }, null, 2));
  return { warnings, duration: total };
}

/** Hash of index.html + every scene file, to detect edits made after a build. */
export function hashProject(dir) {
  const h = crypto.createHash("sha1");
  const files = [path.join(dir, "index.html")];
  const cd = path.join(dir, "compositions");
  if (fs.existsSync(cd)) for (const f of fs.readdirSync(cd).sort()) files.push(path.join(cd, f));
  for (const f of files) if (fs.existsSync(f)) h.update(f.slice(dir.length)).update(fs.readFileSync(f));
  return h.digest("hex");
}
/** True when the project was edited (in Studio or by hand) since the last build. */
export function editedSinceBuild(outDir) {
  const stamp = path.join(outDir, ".ee-build.json");
  if (!fs.existsSync(path.join(outDir, "index.html")) || !fs.existsSync(stamp)) return false;
  return JSON.parse(fs.readFileSync(stamp, "utf8")).hash !== hashProject(outDir);
}

function makeCtx(sc, t, brand, F, fmt, warnings, assetFn) {
  const start = t.start, end = t.end, dur = end - start;
  const cue = (phrase) => {
    if (phrase == null || phrase === "") return null;
    const v = cueTime(t, phrase);
    if (v == null) warnings.push(`${sc.id}: cue not found in narration: "${phrase}"`);
    return v;
  };
  return {
    id: sc.id, start, end, dur, brand, fmt, width: F.width, height: F.height,
    cue, tex, rich, icon, esc,
    asset: assetFn,
    uid: (s) => `${sc.id}-${s}`,
    call: (fn, ...args) => `EE.${fn}(tl, ${args.map((a) => (typeof a === "number" ? a.toFixed(3) : JSON.stringify(a))).join(", ")});\n`,
    /** One time per item: its cue if given, else spread evenly through the scene. */
    times(items, win = {}) {
      const from = win.from ?? start + 0.5;
      const to = Math.max(from, Math.min(win.to ?? start + Math.max(1, dur * 0.85), end - 0.4));
      const known = items.map((it) => cue(it?.cue));
      const n = known.length;
      const outT = new Array(n);
      for (let i = 0; i < n; i++) {
        if (known[i] != null) { outT[i] = known[i]; continue; }
        let p = i - 1; while (p >= 0 && known[p] == null) p--;
        let q = i + 1; while (q < n && known[q] == null) q++;
        const a = p >= 0 ? known[p] : from, b = q < n ? known[q] : to;
        const lo = p >= 0 ? p : -1, hi = q < n ? q : n;
        const span = hi - lo;
        outT[i] = a + ((b - a) * (i - lo)) / (span || 1);
        if (p < 0 && q >= n) outT[i] = n === 1 ? from : from + ((to - from) * i) / (n - 1);
      }
      for (let i = 1; i < n; i++) if (outT[i] < outT[i - 1]) outT[i] = outT[i - 1];
      return outT;
    },
  };
}
