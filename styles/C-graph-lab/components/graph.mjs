import { evalExpr, graphFrame, niceTicks, samplePath, tex } from "../../../tools/lib/kit.mjs";

export default {
  name: "graph",
  describe: "Animated function plot: axes, curves that draw themselves, shaded area under a curve, labelled points, reference lines and a dot that travels along a curve. For calculus, growth/decay, waves, vibration, queueing curves.",
  params: {
    heading: "text",
    x_range: "[min, max]", y_range: "[min, max]",
    x_label: "axis label ($math$ ok)", y_label: "axis label",
    functions: "list of {expr (JavaScript math in x, e.g. 'x^2/(2*7)', 'exp(-0.3*x)*cos(3*x)'), label? ($math$), color?, dashed?, cue?, from?, to?}",
    area: "optional {expr, from, to, label?, cue?} shaded area under a curve",
    points: "optional list of {x, y, label?, cue?}",
    hlines: "optional list of {y, label?, cue?}", vlines: "optional list of {x, label?, cue?}",
    tracer: "optional {expr, from, to, cue?, duration? (s), label?} dot that travels along the curve",
    side: "optional list of {tex, cue?} equations shown beside the graph",
  },
  required: ["x_range", "y_range"],
  css: `
.gr-side { display:flex; flex-direction:column; gap:0.9rem; align-items:flex-start; font-size:1.25rem; color: var(--ink); }
.gr-ax { font-size: 30px; }`,
  render(p, ctx) {
    const VW = 1200, VH = 760;
    const box = { x: 130, y: 40, w: 1000, h: 600 };
    const gf = graphFrame(p, box);
    const colors = [ctx.brand.colors.blue, ctx.brand.colors.red, ctx.brand.colors.green, ctx.brand.colors.ink];
    const cue = (c, d) => ctx.cue(c) ?? d;
    let svg = `<svg class="fig" viewBox="0 0 ${VW} ${VH}" preserveAspectRatio="xMidYMid meet">`;
    let js = "";
    // axes & grid
    const xt = niceTicks(gf.x0, gf.x1, 8), yt = niceTicks(gf.y0, gf.y1, 6);
    let ax = "";
    for (const v of xt) ax += `<line x1="${gf.X(v)}" y1="${box.y}" x2="${gf.X(v)}" y2="${box.y + box.h}" stroke="${ctx.brand.colors.grid}" stroke-width="2"/><text x="${gf.X(v)}" y="${box.y + box.h + 42}" text-anchor="middle" font-size="36" fill="${ctx.brand.colors.muted}" font-family="Inter">${+v.toFixed(3)}</text>`;
    for (const v of yt) ax += `<line x1="${box.x}" y1="${gf.Y(v)}" x2="${box.x + box.w}" y2="${gf.Y(v)}" stroke="${ctx.brand.colors.grid}" stroke-width="2"/><text x="${box.x - 16}" y="${gf.Y(v) + 12}" text-anchor="end" font-size="36" fill="${ctx.brand.colors.muted}" font-family="Inter">${+v.toFixed(3)}</text>`;
    const ink = ctx.brand.colors.ink;
    const zx = gf.x0 <= 0 && gf.x1 >= 0 ? gf.X(0) : box.x, zy = gf.y0 <= 0 && gf.y1 >= 0 ? gf.Y(0) : box.y + box.h;
    ax += `<line x1="${box.x}" y1="${zy}" x2="${box.x + box.w + 20}" y2="${zy}" stroke="${ink}" stroke-width="4"/><line x1="${zx}" y1="${box.y + box.h}" x2="${zx}" y2="${box.y - 20}" stroke="${ink}" stroke-width="4"/>`;
    const fo = (x, y, html, w = 500, h = 90, anchor = "middle", cls = "") => {
      const dx = anchor === "start" ? 0 : anchor === "end" ? -w : -w / 2;
      const jc = anchor === "start" ? "flex-start" : anchor === "end" ? "flex-end" : "center";
      return `<foreignObject x="${x + dx}" y="${y - h / 2}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" class="fo lbl ${cls}" style="justify-content:${jc}"><span>${html}</span></div></foreignObject>`;
    };
    if (p.x_label) ax += fo(box.x + box.w, box.y + box.h + 85, ctx.rich(p.x_label), 600, 70, "end");
    if (p.y_label) ax += fo(box.x + 20, box.y - 10, ctx.rich(p.y_label), 600, 70, "start");
    svg += `<g id="${ctx.uid("ax")}">${ax}</g>`;
    js += ctx.call("fade", `#${ctx.uid("ax")}`, ctx.start + 0.2, 0.5);

    // area
    if (p.area) {
      const fn = evalExpr(p.area.expr);
      const { pts } = samplePath(fn, gf, p.area.from, p.area.to, 300);
      if (pts.length) {
        const poly = [`${gf.X(p.area.from)},${zy}`, ...pts.map((q) => `${q[0]},${q[1]}`), `${gf.X(p.area.to)},${zy}`].join(" ");
        const id = ctx.uid("area");
        svg += `<g id="${id}"><polygon points="${poly}" fill="${ctx.brand.colors.marker}" fill-opacity="0.55"/>${p.area.label ? fo(gf.X((p.area.from + p.area.to) / 2), (zy + Math.min(...pts.map((q) => q[1]))) / 2 + 20, ctx.rich(p.area.label)) : ""}</g>`;
        js += ctx.call("wipe", `#${id}`, cue(p.area.cue, ctx.start + ctx.dur * 0.5), 1.0);
      }
    }
    // functions
    const fns = p.functions ?? [];
    const ftimes = ctx.times(fns, { from: ctx.start + 0.7 });
    fns.forEach((f, i) => {
      const fn = evalExpr(f.expr);
      const { d, pts } = samplePath(fn, gf, f.from ?? gf.x0, f.to ?? gf.x1);
      const c = ctx.brand.colors[f.color] ?? f.color ?? colors[i % colors.length];
      const id = ctx.uid("f" + i);
      let g = `<path class="stroke ${f.dashed ? "dashed" : ""}" pathLength="1" d="${d}" fill="none" stroke="${c}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>`;
      if (f.label && pts.length) {
        const last = pts[Math.floor(pts.length * (f.label_at ?? 0.85))];
        g += `<g class="pop">${fo(last[0] - 20, last[1] - 70, `<span style="color:${c}">${ctx.rich(f.label)}</span>`, 600, 150, "end")}</g>`;
      }
      svg += `<g id="${id}">${g}</g>`;
      js += ctx.call("drawGroup", `#${id}`, ftimes[i], f.draw_s ?? 1.4);
    });
    // reference lines
    for (const [k, list] of [["h", p.hlines ?? []], ["v", p.vlines ?? []]]) {
      list.forEach((l, i) => {
        const id = ctx.uid(`${k}l${i}`);
        const [x1, y1, x2, y2] = k === "h" ? [box.x, gf.Y(l.y), box.x + box.w, gf.Y(l.y)] : [gf.X(l.x), box.y, gf.X(l.x), box.y + box.h];
        let g = `<line class="dashed" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${ctx.brand.colors.red}" stroke-width="3"/>`;
        if (l.label) g += k === "h" ? fo(box.x + box.w - 10, y1 - 30, ctx.rich(l.label), 600, 70, "end", "red") : fo(x1 + 12, box.y + 30, ctx.rich(l.label), 600, 70, "start", "red");
        svg += `<g id="${id}">${g}</g>`;
        js += ctx.call("fade", `#${id}`, cue(l.cue, ctx.start + ctx.dur * 0.5));
      });
    }
    // points
    const pts = p.points ?? [];
    const ptimes = ctx.times(pts, { from: ctx.start + ctx.dur * 0.35 });
    pts.forEach((q, i) => {
      const id = ctx.uid("p" + i);
      const x = gf.X(q.x), y = gf.Y(q.y);
      svg += `<g id="${id}"><line class="dashed" x1="${x}" y1="${y}" x2="${x}" y2="${zy}" stroke="${ctx.brand.colors.muted}" stroke-width="2"/><circle cx="${x}" cy="${y}" r="13" fill="${ctx.brand.colors.red}" stroke="#fff" stroke-width="4"/>${q.label ? fo(x + 20, y - 42, ctx.rich(q.label), 500, 80, "start") : ""}</g>`;
      js += ctx.call("pop", `#${id}`, ptimes[i]);
    });
    // tracer
    if (p.tracer) {
      const fn = evalExpr(p.tracer.expr);
      const { pts: tp } = samplePath(fn, gf, p.tracer.from ?? gf.x0, p.tracer.to ?? gf.x1, 240);
      const id = ctx.uid("tr");
      svg += `<circle id="${id}" r="15" fill="${ctx.brand.colors.red}" stroke="#fff" stroke-width="5" cx="${tp[0]?.[0] ?? 0}" cy="${tp[0]?.[1] ?? 0}"/>`;
      js += `EE.follow(tl, ${JSON.stringify("#" + id)}, ${JSON.stringify(tp.map((q) => [q[0], q[1]]))}, ${cue(p.tracer.cue, ctx.start + ctx.dur * 0.4).toFixed(3)}, ${p.tracer.duration ?? 3});\n`;
    }
    svg += `</svg>`;
    let html = p.heading ? `<div class="heading" id="${ctx.uid("h")}">${ctx.rich(p.heading)}</div>` : "";
    if (p.heading) js = ctx.call("rise", `#${ctx.uid("h")}`, ctx.start + 0.15) + js;
    const graphBox = `<div class="fig-box">${svg}</div>`;
    if (p.side?.length) {
      const st = ctx.times(p.side, { from: ctx.start + ctx.dur * 0.3 });
      let side = `<div class="gr-side">`;
      p.side.forEach((s, i) => {
        side += `<div id="${ctx.uid("s" + i)}">${tex(s.tex)}</div>`;
        js += ctx.call("rise", `#${ctx.uid("s" + i)}`, st[i]);
      });
      side += `</div>`;
      html += `<div class="split" style="--split:1">${graphBox.replace('class="fig-box"', 'class="fig-box" style="flex:2 1 0"')}${side}</div>`;
    } else html += graphBox;
    return { html, js };
  },
};
