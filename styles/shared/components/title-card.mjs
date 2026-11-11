export default {
  name: "title-card",
  describe: "Navy title card: big title, optional kicker above and subtitle below. Use for the opening title or a chapter break.",
  params: { title: "text (required)", kicker: "small text above", subtitle: "text below", cue: "when it appears" },
  required: ["title"],
  navy: true,
  css: `
.tc { display:flex; flex-direction:column; align-items:center; gap:0.6rem; text-align:center; max-width: 85%; }
.tc-kicker { font-size:0.8rem; font-weight:600; letter-spacing:0.18em; text-transform:uppercase; color: var(--marker); }
.tc-title { font-size:2.6rem; font-weight:800; line-height:1.05; color:#fff; letter-spacing:-0.02em; }
.fmt-short .tc-title { font-size:2.3rem; }
.tc-line { width: 30%; height: 0.22rem; background: var(--marker); border-radius: 0.2rem; display:block; }
.tc-sub { font-size:1rem; color:#D8DEEE; }`,
  render(p, ctx) {
    const t = ctx.cue(p.cue) ?? ctx.start + 0.2;
    const html = `<div class="tc">
  ${p.kicker ? `<div class="tc-kicker" id="${ctx.uid("k")}">${ctx.rich(p.kicker)}</div>` : ""}
  <div class="tc-title" id="${ctx.uid("t")}">${ctx.rich(p.title)}</div>
  <span class="tc-line" id="${ctx.uid("l")}"></span>
  ${p.subtitle ? `<div class="tc-sub" id="${ctx.uid("s")}">${ctx.rich(p.subtitle)}</div>` : ""}
</div>`;
    let js = ctx.call("fade", `#${ctx.uid("k")}`, t) + ctx.call("rise", `#${ctx.uid("t")}`, t + 0.1) + ctx.call("mark", `#${ctx.uid("l")}`, t + 0.45);
    if (p.subtitle) js += ctx.call("fade", `#${ctx.uid("s")}`, t + 0.7);
    return { html, js };
  },
};
