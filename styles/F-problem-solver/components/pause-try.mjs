export default {
  name: "pause-try",
  describe: "'Pause and try it' moment with a countdown ring, before the solution. Keep the narration short here (or silent seconds).",
  params: { text: "default 'Pause the video and try it'", seconds: "countdown length, default 5" },
  required: [],
  navy: true,
  css: `
.pt { display:flex; flex-direction:column; align-items:center; gap:1.3rem; }
.pt-icon { width:4rem; height:4rem; color: var(--marker); display:block; }
.pt-text { font-size:1.8rem; font-weight:800; color:#fff; text-align:center; }
.pt-num { font-size:3rem; font-weight:800; color: var(--marker); }`,
  render(p, ctx) {
    const s = p.seconds ?? 5;
    const t = ctx.start + 0.3;
    const html = `<div class="pt"><div class="pt-icon" id="${ctx.uid("i")}">${ctx.icon("player-pause")}</div><div class="pt-text" id="${ctx.uid("t")}">${ctx.rich(p.text ?? "Pause the video and try it")}</div><div class="pt-num" id="${ctx.uid("n")}">${s}</div></div>`;
    return { html, js: ctx.call("pop", `#${ctx.uid("i")}`, t) + ctx.call("rise", `#${ctx.uid("t")}`, t + 0.2) + ctx.call("countdown", `#${ctx.uid("n")}`, t + 0.5, Math.min(s, Math.max(1, ctx.dur - 1))) };
  },
};
