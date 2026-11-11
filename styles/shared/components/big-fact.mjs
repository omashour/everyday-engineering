export default {
  name: "big-fact",
  describe: "One huge number or short statement with a label: the surprising fact of a hook. Optional count-up animation.",
  params: {
    value: "text shown, e.g. '4×' or '$614,000' (required)",
    count: "optional {from, to, decimals?, prefix?, suffix?} to count up instead of showing value",
    label: "text above", sub: "text below", navy: "true for navy background", cue: "when the number appears",
  },
  required: ["value"],
  css: `
.bf { display:flex; flex-direction:column; align-items:center; gap:0.5rem; text-align:center; max-width:88%; }
.bf-label { font-size:1.2rem; font-weight:600; color: var(--muted); }
.navy .bf-label { color:#D8DEEE; }
.bf-value { font-size:5.2rem; font-weight:800; line-height:1; color: var(--red); letter-spacing:-0.03em; }
.navy .bf-value { color: var(--marker); }
.bf-sub { font-size:1.1rem; color: var(--ink); }
.navy .bf-sub { color:#fff; }`,
  render(p, ctx) {
    const t = ctx.cue(p.cue) ?? ctx.start + 0.4;
    const html = `<div class="bf">
  ${p.label ? `<div class="bf-label" id="${ctx.uid("l")}">${ctx.rich(p.label)}</div>` : ""}
  <div class="bf-value" id="${ctx.uid("v")}">${ctx.rich(p.value)}</div>
  ${p.sub ? `<div class="bf-sub" id="${ctx.uid("s")}">${ctx.rich(p.sub)}</div>` : ""}
</div>`;
    let js = ctx.call("fade", `#${ctx.uid("l")}`, ctx.start + 0.15) + ctx.call("pop", `#${ctx.uid("v")}`, t, 0.55);
    if (p.count) {
      const c = p.count;
      js += ctx.call("count", `#${ctx.uid("v")}`, c.from ?? 0, c.to, t, c.duration ?? 1.4, c.decimals ?? 0, c.prefix ?? "", c.suffix ?? "");
    }
    if (p.sub) js += ctx.call("rise", `#${ctx.uid("s")}`, ctx.cue(p.sub_cue) ?? t + 0.8);
    return { html, js };
  },
};
