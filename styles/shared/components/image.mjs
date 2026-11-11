export default {
  name: "image",
  describe: "Full-frame photo with a slow zoom and optional caption. treatment 'archive' gives an old-photo look for history stories.",
  params: {
    src: "file in the video's assets/ folder (required)", caption: "short caption", credit: "photo credit (required for licensed images)",
    zoom: "in | out | none (default in)", focus: "[x%, y%] zoom centre", treatment: "none | archive",
  },
  required: ["src"],
  css: `
.img-wrap { position:absolute; inset:0; overflow:hidden; background:#000; }
.img-kb { position:absolute; inset:0; display:block; }
.img-kb img { width:100%; height:100%; object-fit:cover; display:block; }
.img-archive img { filter: sepia(0.55) contrast(1.05) brightness(0.95); }
.img-cap { position:absolute; left: var(--safe); bottom: calc(var(--safe) * 0.7); background: rgba(27,43,94,0.88); color:#fff; padding:0.45rem 0.9rem; border-radius:0.4rem; font-size:0.95rem; font-weight:600; max-width: 70%; }
.fmt-short .img-cap { bottom: var(--safe-bottom); max-width: 85%; }`,
  render(p, ctx) {
    const src = ctx.asset(p.src);
    const [fx, fy] = p.focus ?? [50, 50];
    const html = `<div class="img-wrap ${p.treatment === "archive" ? "img-archive" : ""}">
  <div class="img-kb" id="${ctx.uid("kb")}"><img src="${src}" alt=""></div>
  ${p.caption ? `<div class="img-cap" id="${ctx.uid("c")}">${ctx.rich(p.caption)}</div>` : ""}
  ${p.credit ? `<div class="credit" data-layout-ignore>${ctx.esc(p.credit)}</div>` : ""}
</div>`;
    const z = p.zoom ?? "in";
    let js = z === "none" ? "" : ctx.call("kenburns", `#${ctx.uid("kb")}`, ctx.start, ctx.end, z === "in" ? 1.0 : 1.12, z === "in" ? 1.12 : 1.0, `${fx}%`, `${fy}%`);
    if (p.caption) js += ctx.call("slide", `#${ctx.uid("c")}`, ctx.cue(p.cue) ?? ctx.start + 0.6, -40);
    return { html, js, fullBleed: true };
  },
};
