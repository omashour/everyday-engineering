export default {
  name: "answer-box",
  describe: "Boxed final answer with units, then an optional 'does this make sense?' check line.",
  params: { label: "e.g. 'Answer'", tex: "the answer in LaTeX with units (required)", check: "optional sanity-check sentence", cue: "answer cue", check_cue: "check cue" },
  required: ["tex"],
  css: `
.ab { display:flex; flex-direction:column; align-items:center; gap:1.2rem; }
.ab-label { font-size:0.8rem; font-weight:800; letter-spacing:0.14em; text-transform:uppercase; color: var(--red); }
.ab-box { position:relative; font-size:2.1rem; color: var(--ink); padding:0.6rem 1.6rem; }
.ab-border { position:absolute; inset:0; border:0.16rem solid var(--red); border-radius:0.5rem; display:block; }
.ab-check { display:flex; align-items:center; gap:0.6rem; font-size:1.1rem; color: var(--green); font-weight:600; max-width: 38rem; }
.ab-check .icon { flex: none; }
.ab-check .icon { width:1.4rem; height:1.4rem; }`,
  render(p, ctx) {
    const t = ctx.cue(p.cue) ?? ctx.start + 0.3;
    const html = `<div class="ab"><div class="ab-label" id="${ctx.uid("l")}">${ctx.rich(p.label ?? "Answer")}</div><div class="ab-box" id="${ctx.uid("b")}"><span class="ab-border" id="${ctx.uid("br")}"></span>${ctx.tex(p.tex, false)}</div>${p.check ? `<div class="ab-check" id="${ctx.uid("c")}">${ctx.icon("circle-check")}<span>${ctx.rich(p.check)}</span></div>` : ""}</div>`;
    let js = ctx.call("fade", `#${ctx.uid("l")}`, t) + ctx.call("pop", `#${ctx.uid("b")}`, t + 0.1) + ctx.call("wipe", `#${ctx.uid("br")}`, t + 0.5, 0.6);
    if (p.check) js += ctx.call("rise", `#${ctx.uid("c")}`, ctx.cue(p.check_cue) ?? t + 1.5);
    return { html, js };
  },
};
