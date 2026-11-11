export default {
  name: "bullets",
  describe: "Heading plus 2–5 short points that appear one by one, each optionally with an icon. Points support $math$, **bold**, ==marker==.",
  params: { heading: "text", items: "list of {text, icon?: tabler icon name, cue?}" },
  required: ["items"],
  css: `
.bl { display:flex; flex-direction:column; gap:0.9rem; width: 80%; }
.fmt-short .bl { width: 100%; }
.bl-item { display:flex; align-items:center; gap:0.9rem; font-size:1.35rem; color: var(--text); line-height:1.25; }
.bl-dot { width:0.55rem; height:0.55rem; border-radius:50%; background: var(--red); flex:none; display:block; }
.bl-ico { width:1.6rem; height:1.6rem; flex:none; color: var(--blue); display:block; }`,
  render(p, ctx) {
    const items = p.items ?? [];
    const times = ctx.times(items);
    let html = p.heading ? `<div class="heading" id="${ctx.uid("h")}">${ctx.rich(p.heading)}</div>` : "";
    html += `<div class="bl">`;
    let js = p.heading ? ctx.call("rise", `#${ctx.uid("h")}`, ctx.start + 0.2) : "";
    items.forEach((it, i) => {
      const lead = it.icon ? `<span class="bl-ico">${ctx.icon(it.icon)}</span>` : `<span class="bl-dot"></span>`;
      html += `<div class="bl-item" id="${ctx.uid("i" + i)}">${lead}<div>${ctx.rich(it.text)}</div></div>`;
      js += ctx.call("slide", `#${ctx.uid("i" + i)}`, times[i], -40);
    });
    html += `</div>`;
    return { html, js };
  },
};
