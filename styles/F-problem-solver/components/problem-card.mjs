import { figure } from "../../../tools/lib/figure.mjs";

export default {
  name: "problem-card",
  describe: "Textbook-style problem statement: figure on one side, Given / Find / Assumptions on the other. Opens every solved engineering problem (and the practice problem at the end).",
  params: {
    title: "e.g. 'Problem 1' or 'Practice problem'",
    figure: "optional {view:[w,h], items:[diagram items]}",
    given: "list of text/$math$ items", find: "list of text/$math$ items", assumptions: "optional list",
    cues: "optional {given?, find?, assumptions?} cue phrases",
  },
  required: ["given", "find"],
  css: `
.pc { display:flex; flex-direction:column; gap:0.7rem; align-items:flex-start; }
.pc-title { font-size:0.75rem; font-weight:800; letter-spacing:0.14em; text-transform:uppercase; background: var(--navy); color:#fff; padding:0.2rem 0.7rem; border-radius:0.3rem; }
.pc-sec { display:flex; flex-direction:column; gap:0.25rem; }
.pc-h { font-size:0.8rem; font-weight:800; color: var(--blue); text-transform:uppercase; letter-spacing:0.08em; }
.pc-i { font-size:1.05rem; color: var(--ink); line-height:1.3; }`,
  render(p, ctx) {
    const c = p.cues ?? {};
    let figHtml = "", js = "";
    if (p.figure) {
      const f = figure(p.figure, ctx, "fig", { from: ctx.start + 0.3, to: ctx.start + Math.min(3, ctx.dur * 0.3) });
      figHtml = `<div class="fig-box">${f.html}</div>`;
      js += f.js;
    }
    let col = `<div class="pc">${p.title ? `<div class="pc-title" id="${ctx.uid("t")}">${ctx.rich(p.title)}</div>` : ""}`;
    js += ctx.call("fade", `#${ctx.uid("t")}`, ctx.start + 0.1);
    const sec = (key, label, list, dflt) => {
      if (!list?.length) return;
      col += `<div class="pc-sec" id="${ctx.uid(key)}"><div class="pc-h">${label}</div>${list.map((x) => `<div class="pc-i">${ctx.rich(x)}</div>`).join("")}</div>`;
      js += ctx.call("rise", `#${ctx.uid(key)}`, ctx.cue(c[key]) ?? dflt);
    };
    sec("given", "Given", p.given, ctx.start + ctx.dur * 0.25);
    sec("find", "Find", p.find, ctx.start + ctx.dur * 0.55);
    sec("assumptions", "Assume", p.assumptions, ctx.start + ctx.dur * 0.75);
    col += `</div>`;
    return { html: p.figure ? `<div class="split">${figHtml}${col}</div>` : col, js };
  },
};
