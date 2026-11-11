export default {
  name: "timeline",
  describe: "Horizontal timeline of a real event or a person's story; each event appears when spoken.",
  params: { heading: "text", events: "list of {when (e.g. '1940' or '10 June 2000'), text, cue?}" },
  required: ["events"],
  css: `
.tl-wrap { position:relative; width:100%; display:flex; justify-content:space-between; gap:1rem; padding-top:2.2rem; }
.tl-axis { position:absolute; left:0; right:0; top:2.2rem; height:0.18rem; background: var(--ink); display:block; }
.tl-ev { position:relative; flex:1 1 0; display:flex; flex-direction:column; align-items:center; text-align:center; gap:0.5rem; }
.tl-dot { width:1.1rem; height:1.1rem; border-radius:50%; background: var(--red); border:0.2rem solid #fff; box-shadow:0 0 0 0.12rem var(--red); margin-top:-0.55rem; display:block; }
.tl-when { font-weight:800; font-size:1.1rem; color: var(--ink); }
.tl-text { font-size:0.9rem; color: var(--text); line-height:1.3; max-width: 12rem; }
.fmt-short .tl-wrap { flex-direction:column; padding:0 0 0 2rem; gap:1.4rem; }
.fmt-short .tl-axis { left:0.55rem; right:auto; top:0; bottom:0; width:0.18rem; height:auto; }
.fmt-short .tl-ev { flex-direction:row; text-align:left; align-items:flex-start; }
.fmt-short .tl-text { max-width:none; }`,
  render(p, ctx) {
    const ev = p.events ?? [];
    const times = ctx.times(ev);
    let html = p.heading ? `<div class="heading" id="${ctx.uid("h")}">${ctx.rich(p.heading)}</div>` : "";
    html += `<div class="tl-wrap"><span class="tl-axis" id="${ctx.uid("ax")}"></span>`;
    let js = (p.heading ? ctx.call("rise", `#${ctx.uid("h")}`, ctx.start + 0.15) : "") + ctx.call("mark", `#${ctx.uid("ax")}`, ctx.start + 0.3, 0.9);
    ev.forEach((e, i) => {
      html += `<div class="tl-ev" id="${ctx.uid("e" + i)}"><span class="tl-dot"></span><div><div class="tl-when">${ctx.rich(e.when)}</div><div class="tl-text">${ctx.rich(e.text)}</div></div></div>`;
      js += ctx.call("rise", `#${ctx.uid("e" + i)}`, times[i]);
    });
    html += `</div>`;
    return { html, js };
  },
};
