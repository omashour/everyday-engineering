import { figure } from "../../../tools/lib/figure.mjs";

export default {
  name: "equation-steps",
  describe: "Equations built line by line on the whiteboard, with yellow marker, red circle, red handwritten note and boxed answer options. Optional figure beside the lines. Also used for numbered solution steps in style F.",
  params: {
    heading: "text",
    lines: "list of {tex | text, cue?, label? (e.g. 'Step 1'), mark?: true, circle?: true, note?: 'red side note', box?: true (final answer), mark_cue?, circle_cue?, note_cue?}",
    figure: "optional {view:[w,h], items:[diagram items]} shown beside the lines",
    figure_side: "left | right (default left)",
    size: "m | l (bigger math for short derivations)",
  },
  required: ["lines"],
  css: `
.eq-col { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:0.85rem; }
.eq-col.left { align-items:flex-start; padding-left: 1rem; }
.eq-line { position:relative; display:flex; align-items:center; gap:1rem; font-size:1.25rem; color: var(--ink); }
.eq-col.l .eq-line { font-size:1.6rem; }
.eq-label { font-size:0.7rem; font-weight:700; color: var(--blue); text-transform:uppercase; letter-spacing:0.08em; min-width: 4.2rem; }
.eq-body { position:relative; display:inline-block; z-index:0; }
.eq-text { font-size:1.05rem; color: var(--text); max-width: 26rem; line-height:1.3; }
.circ-border { position:absolute; inset:-0.35em -0.6em; border:0.11rem solid var(--red); border-radius:50%; transform: rotate(-2deg); display:block; }
.eq-box { position:absolute; inset:-0.4em -0.7em; border:0.13rem solid var(--red); border-radius:0.35rem; display:block; }
.fmt-short .eq-line { font-size:0.95rem; }
.fmt-short .eq-col.l .eq-line { font-size:1.2rem; }
.fmt-short .note { position:absolute; left:auto; right:0; top:100%; margin:0.3rem 0 0; }
.fmt-short .eq-label { min-width: 0; }`,
  render(p, ctx) {
    const lines = p.lines ?? [];
    let figHtml = "", figJs = "";
    const times = ctx.times(lines);
    if (p.figure) {
      const firstLine = times[0] ?? ctx.start + 0.5;
      const f = figure(p.figure, ctx, "fig", { from: ctx.start + 0.3, to: Math.max(ctx.start + 0.5, firstLine - 0.2) });
      figHtml = `<div class="fig-box">${f.html}</div>`;
      figJs = f.js;
    }
    let col = `<div class="eq-col ${p.figure ? "left" : ""} ${p.size === "l" ? "l" : ""}">`;
    let js = figJs;
    lines.forEach((ln, i) => {
      const id = ctx.uid("ln" + i);
      const body = ln.tex != null ? ctx.tex(ln.tex, false) : `<span class="eq-text">${ctx.rich(ln.text)}</span>`;
      col += `<div class="eq-line" id="${id}">`;
      if (ln.label) col += `<span class="eq-label">${ctx.rich(ln.label)}</span>`;
      col += `<span class="eq-body">`;
      if (ln.mark) col += `<span class="mk-bar" id="${id}-mk"></span>`;
      col += body;
      if (ln.circle) col += `<span class="circ-border" id="${id}-c"></span>`;
      if (ln.box) col += `<span class="eq-box" id="${id}-b"></span>`;
      if (ln.note) col += `<span class="note" id="${id}-n"><span class="note-y"><svg viewBox="0 0 40 20"><path d="M38,10 L4,10 M12,3 L4,10 L12,17" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>${ctx.rich(ln.note)}</span></span>`;
      col += `</span></div>`;
      const t = times[i];
      js += ctx.call("rise", `#${id}`, t);
      if (ln.mark) js += ctx.call("mark", `#${id}-mk`, ctx.cue(ln.mark_cue) ?? t + 0.5);
      if (ln.circle) js += ctx.call("wipe", `#${id}-c`, ctx.cue(ln.circle_cue) ?? t + 0.6, 0.6);
      if (ln.box) js += ctx.call("wipe", `#${id}-b`, t + 0.5, 0.6);
      if (ln.note) js += ctx.call("slide", `#${id}-n`, ctx.cue(ln.note_cue) ?? t + 0.9, 30);
    });
    col += `</div>`;
    let html = p.heading ? `<div class="heading" id="${ctx.uid("h")}">${ctx.rich(p.heading)}</div>` : "";
    if (p.heading) js = ctx.call("rise", `#${ctx.uid("h")}`, ctx.start + 0.15) + js;
    html += p.figure ? `<div class="split">${p.figure_side === "right" ? col + figHtml : figHtml + col}</div>` : col;
    return { html, js };
  },
};
