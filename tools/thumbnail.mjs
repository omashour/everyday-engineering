// npm run thumbnail -- 001
// Renders every variant in thumbnail.yaml to videos/001-x/thumbnails/thumb-N.png (1280×720),
// using the same fonts, math and colors as the videos. Upload two and let YouTube A/B test them.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, videoDir, fail, ok, readYaml, rel, esc, brand as loadBrand, P } from "./lib/core.mjs";
import { tex } from "./lib/kit.mjs";
import { renderStill } from "./lib/still.mjs";

const args = parseArgs();
const dir = videoDir(args._[0]);
const spec = readYaml(path.join(dir, "thumbnail.yaml"));
const b = loadBrand();
const variants = spec.variants ?? [];
if (!variants.length) fail("thumbnail.yaml has no variants.");
const outDir = path.join(dir, "thumbnails");
fs.mkdirSync(outDir, { recursive: true });

/** Big title text; words listed in `highlight` get the yellow marker. */
function title(text, highlight = [], dark = false) {
  const hl = [].concat(highlight ?? []).filter(Boolean);
  let h = esc(text);
  for (const w of hl) h = h.replace(esc(w), `<span style="background:${b.colors.marker};color:${b.colors.ink};padding:0 12px;border-radius:10px;box-decoration-break:clone;-webkit-box-decoration-break:clone">${esc(w)}</span>`);
  return `<div style="font:800 96px/1.05 Inter,sans-serif;letter-spacing:-2px;color:${dark ? "#fff" : b.colors.ink};${dark ? "text-shadow:0 4px 18px rgba(0,0,0,.6);" : ""}">${h}</div>`;
}
const badge = `<img src="assets/media/logo.svg" style="position:absolute;right:28px;top:28px;width:96px;height:96px;border-radius:50%">`;

variants.forEach((v, i) => {
  const assets = [{ from: path.join(P.channel, "branding", "logo.svg"), name: "logo.svg" }];
  let img = "";
  if (v.image) {
    const f = path.join(dir, "assets", v.image);
    if (!fs.existsSync(f)) fail(`thumbnail ${i + 1}: missing assets/${v.image}`);
    assets.push({ from: f, name: v.image });
    img = `assets/media/${v.image}`;
  }
  const math = v.tex ? tex(v.tex, true) : "";
  let html;
  if ((v.template ?? "equation") === "photo") {
    html = `<div style="position:absolute;inset:0;background:#000"><img src="${img}" style="width:100%;height:100%;object-fit:cover">
      <div style="position:absolute;inset:0;background:linear-gradient(90deg,rgba(11,19,48,.85) 0%,rgba(11,19,48,.55) 45%,rgba(11,19,48,0) 75%)"></div>
      <div style="position:absolute;left:60px;top:0;bottom:0;width:760px;display:flex;flex-direction:column;justify-content:center;gap:24px">${title(v.text, v.highlight, true)}${math ? `<div style="background:#fff;border-radius:16px;padding:10px 26px;font-size:64px;align-self:flex-start">${math}</div>` : ""}</div>${badge}</div>`;
  } else if (v.template === "split") {
    html = `<div style="position:absolute;inset:0;background:#fff;display:flex"><div style="width:52%;height:100%;overflow:hidden"><img src="${img}" style="width:100%;height:100%;object-fit:cover"></div>
      <div style="flex:1;display:flex;flex-direction:column;justify-content:center;gap:30px;padding:0 50px">${title(v.text, v.highlight)}${math ? `<div style="font-size:70px;color:${b.colors.ink};position:relative;align-self:flex-start;padding:6px 24px">${math}<span style="position:absolute;inset:-6px -14px;border:6px solid ${b.colors.red};border-radius:50%;transform:rotate(-3deg)"></span></div>` : ""}</div>${badge}</div>`;
  } else {
    html = `<div style="position:absolute;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px;padding:40px 70px;text-align:center">
      ${title(v.text, v.highlight)}
      ${math ? `<div style="font-size:110px;color:${b.colors.ink};position:relative;padding:4px 40px">${math}<span style="position:absolute;inset:-10px -20px;border:7px solid ${b.colors.red};border-radius:50%;transform:rotate(-3deg)"></span></div>` : ""}
      ${v.note ? `<div style="position:absolute;right:70px;bottom:60px;font:700 64px Caveat,cursive;color:${b.colors.red};transform:rotate(-4deg)">${esc(v.note)}</div>` : ""}${badge}</div>`;
  }
  const out = path.join(outDir, `thumb-${i + 1}.png`);
  renderStill({ width: 1280, height: 720, html, out, assets });
  ok(`Thumbnail ${i + 1} (${v.template ?? "equation"}): ${rel(out)}`);
});
