export default {
  name: "photo-overlay",
  describe: "Real photo of the everyday object with animated engineering overlays on top: measurement lines, arrows, callouts, labels, highlight boxes and math cards. The signature hook style.",
  params: {
    src: "photo in the video's assets/ folder (required)",
    credit: "photo credit / license (required for anything not your own)",
    zoom: "in | out | none (default in, gentle)", focus: "[x%, y%] zoom centre",
    shade: "0–0.7 darkening so overlays stand out (default 0.25)",
    title: "optional banner text at the top",
    overlays: "list, coordinates in % of the frame (0–100), each with cue?: measure {from,to,label}, arrow {from,to,label?}, callout {pos,text,side?: left|right}, label {pos,text}, box {pos,size,label?}, tex {pos,tex}",
  },
  required: ["src"],
  css: `
.po-wrap { position:absolute; inset:0; overflow:hidden; background:#000; }
.po-kb { position:absolute; inset:0; display:block; }
.po-kb img { width:100%; height:100%; object-fit:cover; display:block; }
.po-shade { position:absolute; inset:0; background:#0B1330; display:block; }
.po-svg { position:absolute; inset:0; width:100%; height:100%; overflow:visible; }
.po-fill { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; filter: blur(28px) brightness(0.55); display:block; }
.po-band { position:absolute; left:0; right:0; overflow:hidden; box-shadow:0 10px 40px rgba(0,0,0,0.45); }
.fmt-short .po-pill { font-size:52px; padding:10px 24px; border-radius:16px; }
.fmt-short .po-card { font-size:72px; }
.po-title-row { position:absolute; left: var(--safe); right: var(--safe); top: calc(var(--safe) * 0.6); display:flex; justify-content:center; }
.po-title { background: var(--navy); color:#fff; font-weight:800; font-size:1.3rem; padding:0.4rem 1.1rem; border-radius:0.4rem; text-align:center; max-width:100%; }
.fmt-short .po-title-row { top: var(--safe-top); }
.po-pill { display:inline-block; background:#fff; color: var(--ink); font-weight:700; font-size:30px; padding:6px 16px; border-radius:10px; box-shadow:0 4px 18px rgba(0,0,0,0.35); white-space:nowrap; }
.po-pill.red { background: var(--red); color:#fff; }
.po-pill.yel { background: var(--marker); color: var(--ink); }
.po-card { background:#fff; color: var(--ink); padding:12px 22px; border-radius:12px; box-shadow:0 6px 24px rgba(0,0,0,0.4); font-size:44px; }`,
  render(p, ctx) {
    // Overlay coordinates are always % of a 16:9 photo. In Shorts the photo is shown as a
    // full-width 16:9 band (over a blurred fill), so the overlays still line up with the photo.
    const short = ctx.fmt === "short";
    const W = short ? 1920 : ctx.width, H = short ? 1080 : ctx.height;
    const X = (v) => (v / 100) * W, Y = (v) => (v / 100) * H;
    const ovs = p.overlays ?? [];
    const times = ctx.times(ovs);
    const red = ctx.brand.colors.red, yel = ctx.brand.colors.marker;
    const fo = (x, y, inner, w = 900, h = 220, anchor = "middle") => {
      const dx = anchor === "start" ? 0 : anchor === "end" ? -w : -w / 2;
      const jc = anchor === "start" ? "flex-start" : anchor === "end" ? "flex-end" : "center";
      return `<foreignObject x="${x + dx}" y="${y - h / 2}" width="${w}" height="${h}"><div xmlns="http://www.w3.org/1999/xhtml" style="width:100%;height:100%;display:flex;align-items:center;justify-content:${jc}">${inner}</div></foreignObject>`;
    };
    const head = (x1, y1, x2, y2, c, s = 26) => {
      const a = Math.atan2(y2 - y1, x2 - x1);
      return `<path d="M${x2 - s * Math.cos(a - 0.45)},${y2 - s * Math.sin(a - 0.45)} L${x2},${y2} L${x2 - s * Math.cos(a + 0.45)},${y2 - s * Math.sin(a + 0.45)} Z" fill="${c}"/>`;
    };
    // Keep pills inside the frame: estimate a pill's width from its text, then slide it inward if needed.
    const pillPx = short ? 52 : 30, margin = short ? 40 : 30;
    const pillW = (t) => String(t ?? "").replace(/\$[^$]*\$|\*\*/g, (m) => (m === "**" ? "" : "xxxxxx")).length * pillPx * 0.56 + pillPx * 1.2;
    const fit = (left, w) => Math.min(Math.max(left, margin), W - margin - w); // returns a left edge inside the frame
    let svg = `<svg class="po-svg" viewBox="0 0 ${W} ${H}">`;
    let js = "";
    ovs.forEach((o, i) => {
      const id = ctx.uid("o" + i);
      let g = "";
      let kind = "pop";
      if (o.type === "measure" || o.type === "arrow") {
        const [x1, y1, x2, y2] = [X(o.from[0]), Y(o.from[1]), X(o.to[0]), Y(o.to[1])];
        const c = o.type === "measure" ? yel : red;
        g += `<line class="stroke" pathLength="1" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="7" stroke-linecap="round"/>`;
        g += `<g class="pop">${head(x1, y1, x2, y2, c)}${o.type === "measure" ? head(x2, y2, x1, y1, c) : ""}</g>`;
        if (o.label) g += fo((x1 + x2) / 2 + (o.label_dx ?? 0) * W / 100, (y1 + y2) / 2 + (o.label_dy ?? -6) * H / 100, `<span class="po-pill ${o.type === "measure" ? "yel" : "red"}">${ctx.rich(o.label)}</span>`);
        kind = "draw";
      } else if (o.type === "callout") {
        const [x, y] = [X(o.pos[0]), Y(o.pos[1])];
        const dir = o.side === "left" ? -1 : 1;
        const ex = x + dir * W * 0.08, ey = y - H * 0.08;
        g += `<circle class="pop" cx="${x}" cy="${y}" r="12" fill="${red}" stroke="#fff" stroke-width="4"/>`;
        g += `<polyline class="stroke" pathLength="1" points="${x},${y} ${ex},${ey} ${ex + dir * 40},${ey}" fill="none" stroke="#fff" stroke-width="5"/>`;
        const pw = pillW(o.text), want = dir > 0 ? ex + 50 : ex - 50 - pw;
        g += fo(fit(want, pw), ey, `<span class="po-pill">${ctx.rich(o.text)}</span>`, Math.max(pw, 200) + 40, 200, "start");
        kind = "draw";
      } else if (o.type === "label") {
        const pw = pillW(o.text), lw = Math.min(pw + 40, W - 2 * margin);
        g += fo(fit(X(o.pos[0]) - lw / 2, lw) + lw / 2, Y(o.pos[1]), `<span class="po-pill ${o.color === "red" ? "red" : ""}" style="white-space:normal;text-align:center">${ctx.rich(o.text)}</span>`, lw);
      } else if (o.type === "box") {
        const [x, y, w, h] = [X(o.pos[0]), Y(o.pos[1]), X(o.size[0]), Y(o.size[1])];
        g += `<rect class="stroke" pathLength="1" x="${x}" y="${y}" width="${w}" height="${h}" rx="14" fill="none" stroke="${red}" stroke-width="7"/>`;
        if (o.label) g += fo(x + w / 2, y - 40, `<span class="po-pill red">${ctx.rich(o.label)}</span>`);
        kind = "draw";
      } else if (o.type === "tex") {
        g += fo(X(o.pos[0]), Y(o.pos[1]), `<div class="po-card">${ctx.tex(o.tex, false)}</div>`, 1200, 300);
      }
      svg += `<g id="${id}">${g}</g>`;
      js += kind === "draw" ? ctx.call("drawGroup", `#${id}`, times[i], 0.7) : ctx.call("pop", `#${id}`, times[i]);
    });
    svg += `</svg>`;
    const src = ctx.asset(p.src);
    const [fx, fy] = p.focus ?? [50, 50];
    const bandH = (ctx.width * 9) / 16;
    const kb = `<div class="po-kb" id="${ctx.uid("kb")}" data-layout-allow-overflow><img src="${src}" alt="" style="object-position:${fx}% ${fy}%"><span class="po-shade" style="opacity:${p.shade ?? 0.25}"></span>${svg}</div>`;
    const html = `<div class="po-wrap">
  ${short ? `<img class="po-fill" src="${src}" alt=""><div class="po-band" style="top:${((ctx.height - bandH) / 2).toFixed(1)}px;height:${bandH.toFixed(1)}px">${kb}</div>` : kb}
  ${p.title ? `<div class="po-title-row"><div class="po-title" id="${ctx.uid("t")}">${ctx.rich(p.title)}</div></div>` : ""}
  ${p.credit ? `<div class="credit" data-layout-ignore>${ctx.esc(p.credit)}</div>` : ""}
</div>`;
    const z = p.zoom ?? "in";
    if (z !== "none") js = ctx.call("kenburns", `#${ctx.uid("kb")}`, ctx.start, ctx.end, z === "in" ? 1.0 : 1.06, z === "in" ? 1.06 : 1.0, `${fx}%`, `${fy}%`) + js;
    if (p.title) js += ctx.call("fade", `#${ctx.uid("t")}`, ctx.start + 0.3);
    return { html, js, fullBleed: true };
  },
};
