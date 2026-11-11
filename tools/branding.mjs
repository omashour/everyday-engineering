// npm run branding
// Regenerates the channel art from channel/brand.yaml and channel/about.yaml:
//   channel/branding/logo.svg, logo-sine.svg            (editable vector logo, current + optional refresh)
//   channel/branding/out/profile-800.png                (profile picture)
//   channel/branding/out/profile-circle-preview.png     (how YouTube's circle crop will look)
//   channel/branding/out/banner-2560x1440.png           (upload this)
//   channel/branding/out/banner-safe-area-preview.png   (shows what phones/TVs crop)
//   channel/branding/out/watermark-150.png
//   channel/branding/out/endscreen-1920x1080.png        (background for the last 5–20 s)
import fs from "node:fs";
import path from "node:path";
import { P, brand as loadBrand, readYaml, ok, info, rel, parseArgs } from "./lib/core.mjs";
import { logoSvg } from "./lib/logo.mjs";
import { renderStill } from "./lib/still.mjs";

const args = parseArgs();
const b = loadBrand();
const about = readYaml(path.join(P.channel, "about.yaml"));
const dir = path.join(P.channel, "branding");
const out = path.join(dir, "out");
fs.mkdirSync(out, { recursive: true });

const logo = logoSvg({ colors: b.colors, variant: "classic" });
const logoSine = logoSvg({ colors: b.colors, variant: "sine" });
fs.writeFileSync(path.join(dir, "logo.svg"), logo);
fs.writeFileSync(path.join(dir, "logo-sine.svg"), logoSine);
fs.writeFileSync(path.join(dir, "logo-mark.svg"), logoSvg({ colors: b.colors, variant: "classic", background: false }));
fs.writeFileSync(path.join(dir, "logo-mark-sine.svg"), logoSvg({ colors: b.colors, variant: "sine", background: false }));
ok("Wrote logo.svg, logo-sine.svg and transparent logo-mark versions");
if (args["svg-only"]) process.exit(0);

const which = about.logo_variant === "sine" ? "logo-sine.svg" : "logo.svg";
const logoAsset = [{ from: path.join(dir, which), name: "logo.svg" }, { from: path.join(dir, which.replace("logo", "logo-mark")), name: "logo-mark.svg" }];
const img = `<img src="assets/media/logo.svg" style="width:100%;height:100%;display:block">`;
const mark = `<img src="assets/media/logo-mark.svg" style="width:100%;height:100%;display:block">`;

renderStill({ width: 800, height: 800, html: img, out: path.join(out, "profile-800.png"), assets: logoAsset });
renderStill({ width: 800, height: 800, assets: logoAsset, out: path.join(out, "profile-circle-preview.png"), css: `body,#root{background:#fff}`,
  html: `<div style="position:absolute;inset:0;background:#fff;display:flex;align-items:center;justify-content:center"><div style="width:700px;height:700px;border-radius:50%;overflow:hidden">${img}</div></div>` });
ok("Profile picture");

// Banner: 2560x1440, everything important inside the centre 1235x338 safe area.
const SAFE_W = 1235, SAFE_H = 338;
const sx = (2560 - SAFE_W) / 2, sy = (1440 - SAFE_H) / 2;
const sine = (y, amp, period, x0, x1) => { let d = `M${x0},${y}`; for (let x = x0; x <= x1; x += 8) d += ` L${x},${(y + amp * Math.sin(((x - x0) / period) * 2 * Math.PI)).toFixed(1)}`; return d; };
const decor = `<svg width="2560" height="1440" style="position:absolute;inset:0" viewBox="0 0 2560 1440">
  <g stroke="#ffffff" stroke-opacity="0.07" stroke-width="2">${Array.from({ length: 33 }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="1440"/>`).join("")}${Array.from({ length: 19 }, (_, i) => `<line x1="0" y1="${i * 80}" x2="2560" y2="${i * 80}"/>`).join("")}</g>
  <path d="${sine(1010, 46, 260, 0, 2560)}" fill="none" stroke="${b.colors.marker}" stroke-opacity="0.35" stroke-width="5"/>
  <path d="M120,1300 Q 420,820 760,1300" fill="none" stroke="#fff" stroke-opacity="0.18" stroke-width="5"/>
  <path d="M1800,1300 L1960,980 L2120,1300 Z M1880,1140 L2040,1140" fill="none" stroke="#fff" stroke-opacity="0.18" stroke-width="5"/>
  <circle cx="2350" cy="430" r="90" fill="none" stroke="#fff" stroke-opacity="0.15" stroke-width="5"/><path d="M2350,430 L2420,380" stroke="#fff" stroke-opacity="0.15" stroke-width="5"/>
</svg>`;
const bannerHtml = (showSafe) => `<div style="position:absolute;inset:0;background:${b.colors.navy}">${decor}
  <div style="position:absolute;left:${sx}px;top:${sy}px;width:${SAFE_W}px;height:${SAFE_H}px;display:flex;align-items:center;justify-content:center;gap:36px;padding:0 24px;${showSafe ? "outline:6px dashed #F7C933;" : ""}">
    <div style="width:210px;height:210px;flex:none">${mark}</div>
    <div style="display:flex;flex-direction:column;gap:14px;min-width:0">
      <div style="font:800 76px Inter;color:#fff;letter-spacing:-2px;line-height:1;white-space:nowrap">${b.name}</div>
      <div style="font:600 30px Inter;color:${b.colors.marker};line-height:1.25">${about.banner_line ?? b.tagline}</div>
      <div style="font:400 26px Inter;color:#D8DEEE">${about.banner_schedule ?? ""}</div>
    </div>
  </div>
  ${showSafe ? `<div style="position:absolute;left:${sx}px;top:${sy + SAFE_H + 16}px;font:600 30px Inter;color:#F7C933">Safe area 1235×338: visible on every device</div>` : ""}
</div>`;
renderStill({ width: 2560, height: 1440, html: bannerHtml(false), out: path.join(out, "banner-2560x1440.png"), assets: logoAsset });
renderStill({ width: 2560, height: 1440, html: bannerHtml(true), out: path.join(out, "banner-safe-area-preview.png"), assets: logoAsset });
ok("Banner");

renderStill({ width: 150, height: 150, html: `<div style="position:absolute;inset:0;border-radius:50%;overflow:hidden">${img}</div>`, css: `html,body,#root{background:transparent}`, out: path.join(out, "watermark-150.png"), assets: logoAsset });
ok("Watermark");

renderStill({ width: 1920, height: 1080, assets: logoAsset, out: path.join(out, "endscreen-1920x1080.png"),
  html: `<div style="position:absolute;inset:0;background:${b.colors.navy};display:flex;flex-direction:column;align-items:center;justify-content:center;gap:40px">
  <div style="width:150px;height:150px">${img}</div>
  <div style="font:800 60px Inter;color:#fff">${b.name}</div>
  <div style="display:flex;gap:80px"><div style="width:520px;height:292px;border:5px dashed rgba(255,255,255,.35);border-radius:20px"></div><div style="width:292px;height:292px;border:5px dashed rgba(255,255,255,.35);border-radius:50%"></div></div></div>` });
ok("End-screen background");
info(`All files in ${rel(out)}. Upload them yourself in YouTube Studio → Customization → Branding.`);
