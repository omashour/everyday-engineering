export default {
  name: "end-card",
  describe: "Navy end screen with the logo and two empty slots where YouTube's end-screen video and subscribe elements sit. Always the last scene (5–20 s).",
  params: { line: "short closing line that names no specific upcoming topic, e.g. 'More everyday math, every week'" },
  required: [],
  navy: true,
  css: `
.ec { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:1.2rem; }
.ec-logo { width:3.4rem; height:3.4rem; display:block; }
.ec-name { font-size:1.4rem; font-weight:800; color:#fff; }
.ec-line { font-size:1rem; color:#D8DEEE; text-align:center; max-width:70%; }
.ec-slots { display:flex; gap:2rem; margin-top:0.8rem; }
.ec-slot { width:13rem; height:7.3rem; border:0.12rem dashed rgba(255,255,255,0.35); border-radius:0.5rem; display:block; }
.ec-slot.round { width:7.3rem; border-radius:50%; }
.fmt-short .ec-slots { display:none; }`,
  render(p, ctx) {
    const t = ctx.start + 0.2;
    const html = `<div class="ec">
  <img class="ec-logo" id="${ctx.uid("logo")}" src="${ctx.asset("brand:logo.svg")}" alt="">
  <div class="ec-name" id="${ctx.uid("n")}">${ctx.esc(ctx.brand.name)}</div>
  ${p.line ? `<div class="ec-line" id="${ctx.uid("l")}">${ctx.rich(p.line)}</div>` : ""}
  <div class="ec-slots" id="${ctx.uid("slots")}"><span class="ec-slot"></span><span class="ec-slot round"></span></div>
</div>`;
    const js = ctx.call("pop", `#${ctx.uid("logo")}`, t) + ctx.call("rise", `#${ctx.uid("n")}`, t + 0.25) + ctx.call("fade", `#${ctx.uid("l")}`, t + 0.5) + ctx.call("fade", `#${ctx.uid("slots")}`, t + 0.8);
    return { html, js, fullBleed: true };
  },
};
