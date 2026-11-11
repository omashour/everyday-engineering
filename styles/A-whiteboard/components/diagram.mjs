import { figure } from "../../../tools/lib/figure.mjs";

export default {
  name: "diagram",
  describe: "A whiteboard drawing built item by item: lines, arrows, shapes, labels, math, icons, dimensions, angles, forces, supports, ground. Also used for free-body diagrams (style F).",
  params: {
    heading: "text",
    view: "[width, height] coordinate space, default [1000, 600]; (0,0) is top-left",
    items: "list of items, each with type and cue?: line|arrow {from,to,label?}, rect {pos,size,label?,fill?}, circle {pos,r,label?,fill?}, polyline|polygon {points}, path {d}, text {pos,text,hand?,size?: s|l|xl,anchor?}, tex {pos,tex,size?}, icon {pos,name,size?}, dim {from,to,label}, angle {pos,from_deg,to_deg,r?,label}, force {pos,angle,length?,label,tail?}, support {pos,kind: pin|roller|fixed,side?}, ground {from,to}. Common: color (brand name or hex), width, dashed",
    caption: "text under the drawing",
  },
  required: ["items"],
  css: `.dg-cap { font-size:1rem; color: var(--muted); text-align:center; }`,
  render(p, ctx) {
    const f = figure({ view: p.view, items: p.items }, ctx, "d");
    let html = p.heading ? `<div class="heading" id="${ctx.uid("h")}">${ctx.rich(p.heading)}</div>` : "";
    html += `<div class="fig-box">${f.html}</div>`;
    if (p.caption) html += `<div class="dg-cap" id="${ctx.uid("cap")}">${ctx.rich(p.caption)}</div>`;
    let js = (p.heading ? ctx.call("rise", `#${ctx.uid("h")}`, ctx.start + 0.15) : "") + f.js;
    if (p.caption) js += ctx.call("fade", `#${ctx.uid("cap")}`, ctx.cue(p.caption_cue) ?? ctx.start + ctx.dur * 0.6);
    return { html, js };
  },
};
