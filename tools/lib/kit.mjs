// Rendering kit shared by all style components: math, rich text, icons, SVG
// diagrams, function graphs and beam (shear/moment) diagrams. Everything is
// computed at build time in Node, so the browser only animates finished SVG.
import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import { P, esc } from "./core.mjs";

// ---------- text & math ----------
export function tex(src, display = false) {
  return katex.renderToString(String(src), { displayMode: display, throwOnError: false, output: "html", strict: "ignore" });
}
/** Rich text: $inline math$, **bold**, ==marker highlight==, {red}text{/red}. */
export function rich(text) {
  const parts = String(text ?? "").split(/(\$[^$]+\$)/g);
  return parts
    .map((p) => {
      if (/^\$[^$]+\$$/.test(p)) return tex(p.slice(1, -1));
      return esc(p)
        .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
        .replace(/==(.+?)==/g, '<span class="mk">$1</span>')
        .replace(/\{red\}(.+?)\{\/red\}/g, '<span class="red">$1</span>');
    })
    .join("");
}

// ---------- icons (Tabler, MIT) ----------
export function icon(name, cls = "") {
  const f = path.join(P.nm, "@tabler", "icons", "icons", "outline", `${name}.svg`);
  if (!fs.existsSync(f)) return `<span class="missing-icon">[icon:${esc(name)}]</span>`;
  return fs
    .readFileSync(f, "utf8")
    .replace(/<!--.*?-->/gs, "")
    .replace(/class="[^"]*"/, `class="icon ${cls}"`)
    .replace(/width="24"\s+height="24"/, 'width="100%" height="100%"');
}
export const iconExists = (name) => fs.existsSync(path.join(P.nm, "@tabler", "icons", "icons", "outline", `${name}.svg`));

// ---------- SVG helpers ----------
const C = (ctx, name, fallback) => (name && ctx.brand.colors[name]) || name || fallback;
const f2 = (n) => Math.round(n * 100) / 100;

function arrowHead(x1, y1, x2, y2, size, color) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const p1 = [x2 - size * Math.cos(a - 0.45), y2 - size * Math.sin(a - 0.45)];
  const p2 = [x2 - size * Math.cos(a + 0.45), y2 - size * Math.sin(a + 0.45)];
  return `<path class="pop" d="M${f2(p1[0])},${f2(p1[1])} L${f2(x2)},${f2(y2)} L${f2(p2[0])},${f2(p2[1])} Z" fill="${color}"/>`;
}
function fo(x, y, html, cls = "", w = 600, h = 200, anchor = "middle") {
  const dx = anchor === "start" ? 0 : anchor === "end" ? -w : -w / 2;
  const jc = anchor === "start" ? "flex-start" : anchor === "end" ? "flex-end" : "center";
  // inner <span> keeps text and math in one line box (flex would drop the spaces between them)
  return `<foreignObject x="${f2(x + dx)}" y="${f2(y - h / 2)}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" class="fo ${cls}" style="justify-content:${jc};text-align:${anchor === "start" ? "left" : anchor === "end" ? "right" : "center"}"><span>${html}</span></div></foreignObject>`;
}

/**
 * Diagram items -> list of {svg, kind, cue}. kind: draw | pop | fade
 * Coordinates are in the viewBox (default 1000 x 600).
 */
export function diagramItems(items = [], ctx) {
  const out = [];
  const ink = C(ctx, "ink"), red = C(ctx, "red");
  for (const it of items) {
    const color = C(ctx, it.color, it.type === "force" ? red : ink);
    const w = it.width ?? 4;
    const dash = it.dashed ? ` stroke-dasharray="1 0"` : "";
    const dashCls = it.dashed ? " dashed" : "";
    const lab = (x, y, anchor = "middle", cls = "") => (it.label ? fo(x, y, rich(it.label), `lbl ${cls}`, 520, 120, anchor) : "");
    switch (it.type) {
      case "line":
      case "arrow": {
        const [x1, y1] = it.from, [x2, y2] = it.to;
        let s = `<line class="stroke${dashCls}" pathLength="1" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`;
        if (it.type === "arrow") s += arrowHead(x1, y1, x2, y2, 18 + w * 2, color);
        if (it.label) {
          const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
          s += lab(mx + (it.label_dx ?? 0), my + (it.label_dy ?? -34));
        }
        out.push({ svg: `<g>${s}</g>`, kind: "draw", cue: it.cue });
        break;
      }
      case "polyline":
      case "polygon": {
        const pts = it.points.map((p) => p.join(",")).join(" ");
        const fill = it.type === "polygon" ? C(ctx, it.fill, "none") : "none";
        out.push({ svg: `<${it.type} class="stroke${dashCls}" pathLength="1" points="${pts}" fill="${fill}" fill-opacity="${it.fill ? 0.25 : 0}" stroke="${color}" stroke-width="${w}" stroke-linejoin="round"/>`, kind: "draw", cue: it.cue });
        break;
      }
      case "path":
        out.push({ svg: `<path class="stroke${dashCls}" pathLength="1" d="${it.d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round"/>`, kind: "draw", cue: it.cue });
        break;
      case "rect": {
        const [x, y] = it.pos, [rw, rh] = it.size;
        const fill = it.fill ? C(ctx, it.fill) : "none";
        let s = `<rect x="${x}" y="${y}" width="${rw}" height="${rh}" rx="${it.radius ?? 6}" fill="${fill}" fill-opacity="${it.fill_opacity ?? (it.fill ? 0.18 : 0)}" stroke="${color}" stroke-width="${w}"/>`;
        if (it.label) s += fo(x + rw / 2, y + rh / 2, rich(it.label), "lbl", rw + 200, rh);
        out.push({ svg: `<g class="pop-g">${s}</g>`, kind: "pop", cue: it.cue });
        break;
      }
      case "circle": {
        const [x, y] = it.pos;
        const fill = it.fill ? C(ctx, it.fill) : "none";
        let s = `<circle cx="${x}" cy="${y}" r="${it.r ?? 20}" fill="${fill}" fill-opacity="${it.fill_opacity ?? (it.fill ? 0.9 : 0)}" stroke="${color}" stroke-width="${w}"/>`;
        if (it.label) s += lab(x, y - (it.r ?? 20) - 34);
        out.push({ svg: `<g class="pop-g">${s}</g>`, kind: "pop", cue: it.cue });
        break;
      }
      case "text":
        out.push({ svg: fo(it.pos[0], it.pos[1], rich(it.text), `txt ${it.hand ? "hand" : ""} ${it.size ? "sz-" + it.size : ""}`, it.box_width ?? 700, 160, it.anchor ?? "middle").replace('class="fo', `style="color:${color}" class="fo`), kind: "fade", cue: it.cue });
        break;
      case "tex":
        out.push({ svg: fo(it.pos[0], it.pos[1], tex(it.tex, true), `math ${it.size ? "sz-" + it.size : ""}`, it.box_width ?? 800, 220, it.anchor ?? "middle"), kind: "fade", cue: it.cue });
        break;
      case "icon": {
        const s = it.size ?? 120;
        out.push({ svg: `<foreignObject x="${it.pos[0] - s / 2}" y="${it.pos[1] - s / 2}" width="${s}" height="${s}"><div xmlns="http://www.w3.org/1999/xhtml" class="ico" style="color:${color};width:${s}px;height:${s}px">${icon(it.name)}</div></foreignObject>`, kind: "pop", cue: it.cue });
        break;
      }
      case "dim": {
        // dimension line with end ticks and a label
        const [x1, y1] = it.from, [x2, y2] = it.to;
        const a = Math.atan2(y2 - y1, x2 - x1), nx = -Math.sin(a) * 14, ny = Math.cos(a) * 14;
        const c2 = C(ctx, it.color, ctx.brand.colors.muted);
        let s = `<line class="stroke" pathLength="1" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c2}" stroke-width="3"/>`;
        s += `<line class="pop" x1="${x1 - nx}" y1="${y1 - ny}" x2="${x1 + nx}" y2="${y1 + ny}" stroke="${c2}" stroke-width="3"/><line class="pop" x1="${x2 - nx}" y1="${y2 - ny}" x2="${x2 + nx}" y2="${y2 + ny}" stroke="${c2}" stroke-width="3"/>`;
        s += arrowHead(x2 - (x2 - x1) * 0.02, y2 - (y2 - y1) * 0.02, x2, y2, 14, c2) + arrowHead(x1 + (x2 - x1) * 0.02, y1 + (y2 - y1) * 0.02, x1, y1, 14, c2);
        s += fo((x1 + x2) / 2 + (it.label_dx ?? 0), (y1 + y2) / 2 + (it.label_dy ?? -36), rich(it.label ?? ""), "lbl", Math.max(700, Math.abs(x2 - x1)), 100);
        out.push({ svg: `<g>${s}</g>`, kind: "draw", cue: it.cue });
        break;
      }
      case "angle": {
        const [cx, cy] = it.pos, r = it.r ?? 70;
        const a0 = (-(it.from_deg ?? 0) * Math.PI) / 180, a1 = (-(it.to_deg ?? 30) * Math.PI) / 180;
        const p0 = [cx + r * Math.cos(a0), cy + r * Math.sin(a0)], p1 = [cx + r * Math.cos(a1), cy + r * Math.sin(a1)];
        const large = Math.abs((it.to_deg ?? 30) - (it.from_deg ?? 0)) > 180 ? 1 : 0;
        const sweep = (it.to_deg ?? 30) > (it.from_deg ?? 0) ? 0 : 1;
        const am = (a0 + a1) / 2;
        let s = `<path class="stroke" pathLength="1" d="M${f2(p0[0])},${f2(p0[1])} A${r},${r} 0 ${large} ${sweep} ${f2(p1[0])},${f2(p1[1])}" fill="none" stroke="${color}" stroke-width="3"/>`;
        s += fo(cx + (r + 50) * Math.cos(am), cy + (r + 50) * Math.sin(am), rich(it.label ?? ""), "lbl", 300, 100);
        out.push({ svg: `<g>${s}</g>`, kind: "draw", cue: it.cue });
        break;
      }
      case "force": {
        // arrow of length L at angle (deg, 0 = right, 90 = up). tail:true => arrow head touches pos (a push)
        const L = it.length ?? 140, a = ((it.angle ?? -90) * Math.PI) / 180;
        const [px, py] = it.pos;
        const dx = Math.cos(a) * L, dy = -Math.sin(a) * L;
        const [x1, y1, x2, y2] = it.tail ? [px - dx, py - dy, px, py] : [px, py, px + dx, py + dy];
        let s = `<line class="stroke" pathLength="1" x1="${f2(x1)}" y1="${f2(y1)}" x2="${f2(x2)}" y2="${f2(y2)}" stroke="${color}" stroke-width="${w + 1}" stroke-linecap="round"/>` + arrowHead(x1, y1, x2, y2, 22, color);
        const lx = (it.tail ? x1 : x2) + Math.cos(a) * (it.tail ? -30 : 30), ly = (it.tail ? y1 : y2) - Math.sin(a) * (it.tail ? -30 : 30);
        if (it.label) s += fo(lx + (it.label_dx ?? 0), ly + (it.label_dy ?? 0), rich(it.label), "lbl red", 320, 100);
        out.push({ svg: `<g>${s}</g>`, kind: "draw", cue: it.cue });
        break;
      }
      case "support":
        out.push({ svg: supportSvg(it, color), kind: "pop", cue: it.cue });
        break;
      case "ground": {
        const [x1, y1] = it.from, [x2] = it.to;
        let s = `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y1}" stroke="${color}" stroke-width="4"/>`;
        for (let x = x1 + 10; x < x2; x += 24) s += `<line x1="${x}" y1="${y1}" x2="${x - 16}" y2="${y1 + 18}" stroke="${color}" stroke-width="2.5"/>`;
        out.push({ svg: `<g class="pop-g">${s}</g>`, kind: "fade", cue: it.cue });
        break;
      }
      default:
        out.push({ svg: `<text x="20" y="40" fill="red">unknown item: ${esc(it.type)}</text>`, kind: "fade" });
    }
  }
  return out;
}

function supportSvg(it, color) {
  const [x, y] = it.pos;
  const t = it.type_of ?? it.kind ?? "pin";
  if (t === "fixed") {
    let s = `<line x1="${x}" y1="${y - 60}" x2="${x}" y2="${y + 60}" stroke="${color}" stroke-width="5"/>`;
    const dir = it.side === "right" ? 1 : -1;
    for (let k = -50; k <= 50; k += 20) s += `<line x1="${x}" y1="${y + k}" x2="${x + dir * 18}" y2="${y + k + 14}" stroke="${color}" stroke-width="2.5"/>`;
    return `<g class="pop-g">${s}</g>`;
  }
  let s = `<path d="M${x},${y} L${x - 26},${y + 42} L${x + 26},${y + 42} Z" fill="none" stroke="${color}" stroke-width="4"/>`;
  if (t === "roller") s += `<circle cx="${x - 13}" cy="${y + 52}" r="8" fill="none" stroke="${color}" stroke-width="3"/><circle cx="${x + 13}" cy="${y + 52}" r="8" fill="none" stroke="${color}" stroke-width="3"/>`;
  const gy = t === "roller" ? y + 62 : y + 42;
  s += `<line x1="${x - 40}" y1="${gy}" x2="${x + 40}" y2="${gy}" stroke="${color}" stroke-width="4"/>`;
  for (let k = -32; k <= 32; k += 16) s += `<line x1="${x + k}" y1="${gy}" x2="${x + k - 12}" y2="${gy + 14}" stroke="${color}" stroke-width="2"/>`;
  return `<g class="pop-g">${s}</g>`;
}

// ---------- function graphs ----------
const MATH = Object.getOwnPropertyNames(Math);
export function compileExpr(expr) {
  const src = String(expr).replace(/\^/g, "**");
  // eslint-disable-next-line no-new-func
  return new Function("x", ...MATH, `return (${src});`).bind(null);
}
export function evalExpr(expr) {
  const f = compileExpr(expr);
  const args = MATH.map((k) => Math[k]);
  return (x) => {
    const v = f(x, ...args);
    return typeof v === "number" ? v : NaN;
  };
}

export function niceTicks(lo, hi, count = 6) {
  const span = hi - lo, raw = span / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => span / s <= count + 1) ?? raw;
  const out = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10));
  return out;
}

/** Graph frame + mapped helpers. box = {x,y,w,h} in viewBox units. */
export function graphFrame(p, box) {
  const [x0, x1] = p.x_range ?? [0, 10], [y0, y1] = p.y_range ?? [0, 10];
  const X = (x) => box.x + ((x - x0) / (x1 - x0)) * box.w;
  const Y = (y) => box.y + box.h - ((y - y0) / (y1 - y0)) * box.h;
  return { X, Y, x0, x1, y0, y1 };
}
export function samplePath(fn, gf, from, to, n = 500) {
  let d = "", pen = false;
  const pts = [];
  const ylo = gf.y0 - (gf.y1 - gf.y0) * 0.5, yhi = gf.y1 + (gf.y1 - gf.y0) * 0.5;
  for (let i = 0; i <= n; i++) {
    const x = from + ((to - from) * i) / n;
    const y = fn(x);
    if (!Number.isFinite(y) || y < ylo || y > yhi) { pen = false; continue; }
    const px = f2(gf.X(x)), py = f2(gf.Y(Math.max(gf.y0, Math.min(gf.y1, y))));
    d += `${pen ? "L" : "M"}${px},${py} `;
    pts.push([px, py, x, y]);
    pen = true;
  }
  return { d: d.trim(), pts };
}

// ---------- beams: reactions, shear and bending moment ----------
/**
 * Statically determinate beams: two supports (pin/roller) or one fixed end.
 * Loads: {type:'point',x,P} (P>0 downward), {type:'udl',x1,x2,w} (w>0 downward), {type:'moment',x,M} (M>0 counter-clockwise).
 */
export function solveBeam(b) {
  const L = b.length, loads = b.loads ?? [], sup = b.supports ?? [];
  const fixed = sup.find((s) => s.type === "fixed");
  const forces = []; // {x, F (up+)}
  const moments = []; // {x, M (ccw+)}
  for (const l of loads) {
    if (l.type === "point") forces.push({ x: l.x, F: -l.P });
    if (l.type === "udl") forces.push({ x: (l.x1 + l.x2) / 2, F: -l.w * (l.x2 - l.x1), udl: l });
    if (l.type === "moment") moments.push({ x: l.x, M: l.M });
  }
  const reactions = [];
  if (fixed) {
    const Fy = -forces.reduce((s, f) => s + f.F, 0);
    // moment about the fixed point
    const Mf = -(forces.reduce((s, f) => s + f.F * (f.x - fixed.x), 0) + moments.reduce((s, m) => s + m.M, 0));
    reactions.push({ x: fixed.x, F: Fy, M: Mf, type: "fixed" });
  } else {
    if (sup.length !== 2) throw new Error("beam needs two pin/roller supports or one fixed support");
    const [a, c] = sup;
    const sumF = forces.reduce((s, f) => s + f.F, 0);
    const momA = forces.reduce((s, f) => s + f.F * (f.x - a.x), 0) + moments.reduce((s, m) => s + m.M, 0);
    const Rc = -momA / (c.x - a.x);
    const Ra = -sumF - Rc;
    reactions.push({ x: a.x, F: Ra, type: a.type }, { x: c.x, F: Rc, type: c.type });
  }
  const V = (x) => {
    let v = 0;
    for (const r of reactions) if (r.x <= x + 1e-9) v += r.F;
    for (const l of loads) {
      if (l.type === "point" && l.x <= x + 1e-9) v -= l.P;
      if (l.type === "udl" && x > l.x1) v -= l.w * (Math.min(x, l.x2) - l.x1);
    }
    return v;
  };
  const M = (x) => {
    let m = 0;
    for (const r of reactions) if (r.x <= x + 1e-9) { m += r.F * (x - r.x); if (r.M) m -= r.M; }
    for (const l of loads) {
      if (l.type === "point" && l.x <= x + 1e-9) m -= l.P * (x - l.x);
      if (l.type === "udl" && x > l.x1) { const e = Math.min(x, l.x2); m -= l.w * (e - l.x1) * (x - (l.x1 + e) / 2); }
      if (l.type === "moment" && l.x <= x + 1e-9) m -= l.M;
    }
    return m;
  };
  return { L, reactions, V, M };
}
