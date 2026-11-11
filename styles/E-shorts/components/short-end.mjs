export default {
  name: "short-end",
  describe: "Vertical end card for Shorts: logo + 'Full video on the channel'. Added automatically by `npm run shorts`; not used in scenes.yaml.",
  params: { text: "line under the logo" },
  required: [],
  navy: true,
  css: `
.se { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.2rem; text-align:center; padding: 0 2rem; }
.se-logo { width:5rem; height:5rem; display:block; }
.se-text { font-size:1.5rem; font-weight:800; color:#fff; }
.se-name { font-size:0.9rem; color: var(--marker); font-weight:600; }`,
  render(p, ctx) {
    const html = `<div class="se"><img class="se-logo" id="${ctx.uid("l")}" src="${ctx.asset("brand:logo.svg")}" alt=""><div class="se-text" id="${ctx.uid("t")}">${ctx.rich(p.text ?? "Full video on the channel")}</div><div class="se-name">${ctx.esc(ctx.brand.name)}</div></div>`;
    return { html, js: ctx.call("pop", `#${ctx.uid("l")}`, 0.1) + ctx.call("rise", `#${ctx.uid("t")}`, 0.3), fullBleed: true };
  },
};
