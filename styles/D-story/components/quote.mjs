export default {
  name: "quote",
  describe: "A short quote from a person or report, with attribution. Keep quotes short and accurate; cite the source.",
  params: { text: "the quote (required)", who: "person or source", source: "where it was said/published", cue: "when it appears" },
  required: ["text"],
  css: `
.qt { max-width: 75%; display:flex; flex-direction:column; gap:1rem; }
.fmt-short .qt { max-width: 100%; }
.qt-mark { font-size:5rem; line-height:0.6; color: var(--marker); font-weight:800; height:2.2rem; }
.qt-text { font-size:1.6rem; font-weight:600; color: var(--ink); line-height:1.3; }
.qt-who { font-size:1rem; color: var(--muted); }`,
  render(p, ctx) {
    const t = ctx.cue(p.cue) ?? ctx.start + 0.3;
    const html = `<div class="qt"><div class="qt-mark">“</div><div class="qt-text" id="${ctx.uid("q")}">${ctx.rich(p.text)}</div>${p.who ? `<div class="qt-who" id="${ctx.uid("w")}">— ${ctx.rich(p.who)}${p.source ? `, ${ctx.rich(p.source)}` : ""}</div>` : ""}</div>`;
    return { html, js: ctx.call("rise", `#${ctx.uid("q")}`, t, 0.7) + ctx.call("fade", `#${ctx.uid("w")}`, t + 0.8) };
  },
};
