import { solveBeam } from "../../../tools/lib/kit.mjs";

const fmt = (v) => {
  const r = Math.round(v * 100) / 100;
  return Math.abs(r) < 1e-9 ? "0" : String(r);
};

export default {
  name: "beam",
  describe: "Beam problem drawn and SOLVED automatically: loads and supports, reactions, then shear-force (V) and bending-moment (M) diagrams with peak values. Statically determinate beams only (two pin/roller supports, or one fixed end).",
  params: {
    length: "beam length (number, required)",
    unit_len: "e.g. 'm'", unit_force: "e.g. 'kN'",
    supports: "list of {type: pin|roller|fixed, x}",
    loads: "list of {type: point, x, P} | {type: udl, x1, x2, w} | {type: moment, x, M}; downward P/w positive, M counter-clockwise positive",
    show: "which panels, default [beam, shear, moment]; add 'reactions' to label reaction values",
    cues: "optional {beam?, reactions?, shear?, moment?} cue phrases",
    heading: "text",
  },
  required: ["length", "supports", "loads"],
  css: `.bm-lbl { font: 600 38px Inter, sans-serif; }`,
  render(p, ctx) {
    const b = solveBeam(p);
    const uL = p.unit_len ?? "m", uF = p.unit_force ?? "kN";
    const show = p.show ?? ["beam", "reactions", "shear", "moment"];
    const panels = ["beam", "shear", "moment"].filter((k) => show.includes(k));
    const BEAM_H = 400, PH = 280, W = 1400, x0 = 170, x1 = 1230;
    const X = (x) => x0 + (x / b.L) * (x1 - x0);
    const C = ctx.brand.colors;
    const c = p.cues ?? {};
    const panelTop = (k) => 20 + (panels.includes("beam") ? (k === 0 ? 0 : BEAM_H + (k - 1) * PH) : k * PH);
    const VH = panelTop(panels.length);
    // exact points where V/M can peak or jump: ends, supports, loads (both sides)
    const crit = [0, b.L, ...p.supports.map((s) => s.x), ...p.loads.flatMap((l) => (l.type === "udl" ? [l.x1, l.x2] : [l.x]))];
    const critX = [...new Set(crit.flatMap((x) => [x - 1e-7, x + 1e-7]).filter((x) => x >= 0 && x <= b.L))];
    let svg = `<svg class="fig" viewBox="0 0 ${W} ${VH}" preserveAspectRatio="xMidYMid meet">`;
    let js = "";
    const text = (x, y, s, color = C.ink, anchor = "middle") => `<text class="bm-lbl" x="${x}" y="${y}" text-anchor="${anchor}" fill="${color}">${s}</text>`;
    const arrowDown = (x, yTip, len, color) => `<line class="stroke" pathLength="1" x1="${x}" y1="${yTip - len}" x2="${x}" y2="${yTip}" stroke="${color}" stroke-width="5"/><path class="pop" d="M${x - 12},${yTip - 20} L${x},${yTip} L${x + 12},${yTip - 20} Z" fill="${color}"/>`;
    const arrowUp = (x, yTip, len, color) => `<line class="stroke" pathLength="1" x1="${x}" y1="${yTip + len}" x2="${x}" y2="${yTip}" stroke="${color}" stroke-width="5"/><path class="pop" d="M${x - 12},${yTip + 20} L${x},${yTip} L${x + 12},${yTip + 20} Z" fill="${color}"/>`;
    let pi = 0;
    const tBeam = ctx.cue(c.beam) ?? ctx.start + 0.4;
    if (panels.includes("beam")) {
      const yb = panelTop(0) + 170;
      let g = `<rect x="${x0}" y="${yb - 14}" width="${x1 - x0}" height="28" rx="4" fill="${C.grid}" stroke="${C.ink}" stroke-width="4"/>`;
      for (const s of p.supports) {
        const x = X(s.x);
        if (s.type === "fixed") {
          g += `<line x1="${x}" y1="${yb - 60}" x2="${x}" y2="${yb + 60}" stroke="${C.ink}" stroke-width="6"/>`;
          const dir = s.x === 0 ? -1 : 1;
          for (let k = -50; k <= 50; k += 20) g += `<line x1="${x}" y1="${yb + k}" x2="${x + dir * 20}" y2="${yb + k + 16}" stroke="${C.ink}" stroke-width="3"/>`;
        } else {
          g += `<path d="M${x},${yb + 14} L${x - 24},${yb + 54} L${x + 24},${yb + 54} Z" fill="none" stroke="${C.ink}" stroke-width="4"/>`;
          if (s.type === "roller") g += `<circle cx="${x - 11}" cy="${yb + 63}" r="8" fill="none" stroke="${C.ink}" stroke-width="3"/><circle cx="${x + 11}" cy="${yb + 63}" r="8" fill="none" stroke="${C.ink}" stroke-width="3"/>`;
        }
      }
      // dimension
      g += `<line x1="${x0}" y1="${yb + 100}" x2="${x1}" y2="${yb + 100}" stroke="${C.muted}" stroke-width="2"/>` + text((x0 + x1) / 2, yb + 140, `L = ${fmt(b.L)} ${uL}`, C.muted);
      svg += `<g id="${ctx.uid("beam")}">${g}</g>`;
      js += ctx.call("fade", `#${ctx.uid("beam")}`, tBeam);
      let lg = "";
      for (const l of p.loads) {
        if (l.type === "point") lg += arrowDown(X(l.x), yb - 16, 90, C.red) + text(X(l.x), yb - 118, `${fmt(l.P)} ${uF}`, C.red);
        if (l.type === "udl") {
          for (let k = 0; k <= 6; k++) { const x = X(l.x1 + ((l.x2 - l.x1) * k) / 6); lg += arrowDown(x, yb - 16, 60, C.red); }
          lg += `<line x1="${X(l.x1)}" y1="${yb - 76}" x2="${X(l.x2)}" y2="${yb - 76}" stroke="${C.red}" stroke-width="4"/>` + text((X(l.x1) + X(l.x2)) / 2, yb - 92, `${fmt(l.w)} ${uF}/${uL}`, C.red);
        }
        if (l.type === "moment") lg += `<path class="stroke" pathLength="1" d="M${X(l.x) + 40},${yb} A40,40 0 1 0 ${X(l.x)},${yb + 40}" fill="none" stroke="${C.red}" stroke-width="5"/>` + text(X(l.x), yb - 60, `${fmt(l.M)} ${uF}·${uL}`, C.red);
      }
      svg += `<g id="${ctx.uid("loads")}">${lg}</g>`;
      js += ctx.call("drawGroup", `#${ctx.uid("loads")}`, tBeam + 0.6, 0.7);
      if (show.includes("reactions")) {
        let rg = "";
        for (const r of b.reactions) {
          const up = r.F >= 0;
          const side = r.x <= b.L / 2 ? -1 : 1;
          rg += up ? arrowUp(X(r.x) + side * 34, yb + 60, 80, C.green) : arrowDown(X(r.x) + side * 34, yb + 140, 80, C.green);
          rg += text(X(r.x) + side * 60, yb + 120, `R = ${fmt(Math.abs(r.F))} ${uF}`, C.green, side < 0 ? "end" : "start");
          if (r.M) rg += text(X(r.x) + side * 60, yb - 60, `M = ${fmt(Math.abs(r.M))} ${uF}·${uL}`, C.green, side < 0 ? "end" : "start");
        }
        svg += `<g id="${ctx.uid("reac")}">${rg}</g>`;
        js += ctx.call("drawGroup", `#${ctx.uid("reac")}`, ctx.cue(c.reactions) ?? tBeam + 2, 0.7);
      }
      pi++;
    }
    const diagram = (key, fn, color, label, unit) => {
      const top = panelTop(pi) + 30, h = PH - 80, mid = top + h / 2;
      const N = 600;
      // samples + the exact critical points, sorted, so jumps and peaks are exact
      const xs = [...new Set([...Array.from({ length: N + 1 }, (_, i) => (b.L * i) / N), ...critX])].sort((a, z) => a - z);
      const vals = xs.map(fn);
      const maxAbs = Math.max(1e-9, ...vals.map(Math.abs));
      const Yv = (v) => mid - (v / maxAbs) * (h / 2 - 10);
      let d = `M${X(0)},${mid} `;
      xs.forEach((x, i) => (d += `L${X(x).toFixed(1)},${Yv(vals[i]).toFixed(1)} `));
      d += `L${X(b.L)},${mid} Z`;
      let g = `<line x1="${x0}" y1="${mid}" x2="${x1}" y2="${mid}" stroke="${C.ink}" stroke-width="3"/>`;
      g += `<path d="${d}" fill="${color}" fill-opacity="0.22" stroke="${color}" stroke-width="5" stroke-linejoin="round"/>`;
      g += text(x0 - 40, mid + 12, label, C.ink, "end");
      // label max and min
      const iMax = vals.reduce((bi, v, i) => (v > vals[bi] ? i : bi), 0), iMin = vals.reduce((bi, v, i) => (v < vals[bi] ? i : bi), 0);
      for (const i of new Set([iMax, iMin])) {
        const v = vals[i];
        if (Math.abs(v) < maxAbs * 0.02) continue;
        const px = Math.min(x1 - 60, Math.max(x0 + 60, X(xs[i])));
        g += `<circle cx="${X(xs[i])}" cy="${Yv(v)}" r="9" fill="${C.red}"/>` + text(px, Yv(v) + (v >= 0 ? -22 : 48), `${fmt(v)} ${unit}`, C.red);
      }
      const id = ctx.uid(key);
      svg += `<g id="${id}">${g}</g>`;
      js += ctx.call("wipe", `#${id}`, ctx.cue(c[key]) ?? ctx.start + ctx.dur * (key === "shear" ? 0.45 : 0.7), 1.2);
      pi++;
    };
    if (panels.includes("shear")) diagram("shear", b.V, C.blue, "V", uF);
    if (panels.includes("moment")) diagram("moment", b.M, C.red, "M", `${uF}·${uL}`);
    svg += `</svg>`;
    let html = p.heading ? `<div class="heading" id="${ctx.uid("h")}">${ctx.rich(p.heading)}</div>` : "";
    if (p.heading) js = ctx.call("rise", `#${ctx.uid("h")}`, ctx.start + 0.15) + js;
    html += `<div class="fig-box">${svg}</div>`;
    return { html, js };
  },
};
