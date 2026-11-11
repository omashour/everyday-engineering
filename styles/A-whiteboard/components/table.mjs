export default {
  name: "table",
  describe: "Data table whose rows appear one by one, with an optional highlighted cell or row. For values, comparisons, simplex tableaux, results.",
  params: {
    heading: "text",
    headers: "list of column headers (text or $math$)",
    rows: "list of rows, each a list of cells (text or $math$)",
    row_cues: "optional list of cue phrases, one per row",
    highlight: "optional {row, col?, cue?} (0-based); highlights a cell, or the whole row if col is omitted",
  },
  required: ["headers", "rows"],
  css: `
.tb { border-collapse:collapse; font-size:1.2rem; color: var(--ink); margin-top:0.6rem; }
.tb th { background: var(--navy); color:#fff; font-weight:700; padding:0.5rem 1.4rem; }
.tb td { padding:0.55rem 1.4rem; border-bottom:0.06rem solid var(--grid); text-align:center; }
.tb tr.hl td, .tb td.hl { background: var(--marker); font-weight:700; }
.fmt-short .tb { font-size:0.8rem; }`,
  render(p, ctx) {
    const rows = p.rows ?? [];
    const cues = (p.row_cues ?? []).map((c) => ({ cue: c }));
    while (cues.length < rows.length) cues.push({});
    const times = ctx.times(cues);
    const hl = p.highlight;
    let html = p.heading ? `<div class="heading" id="${ctx.uid("h")}">${ctx.rich(p.heading)}</div>` : "";
    html += `<table class="tb"><thead><tr id="${ctx.uid("hd")}">${(p.headers ?? []).map((h) => `<th>${ctx.rich(h)}</th>`).join("")}</tr></thead><tbody>`;
    let js = (p.heading ? ctx.call("rise", `#${ctx.uid("h")}`, ctx.start + 0.15) : "") + ctx.call("fade", `#${ctx.uid("hd")}`, ctx.start + 0.3);
    rows.forEach((r, i) => {
      html += `<tr id="${ctx.uid("r" + i)}">${r.map((c, j) => `<td id="${ctx.uid(`c${i}-${j}`)}">${ctx.rich(c)}</td>`).join("")}</tr>`;
      js += ctx.call("fade", `#${ctx.uid("r" + i)}`, times[i]);
    });
    html += `</tbody></table>`;
    if (hl) {
      // highlight with a class toggled by a zero-length opacity tween on an overlay is fiddly; use background tween
      const sel = hl.col != null ? `#${ctx.uid(`c${hl.row}-${hl.col}`)}` : `#${ctx.uid("r" + hl.row)} td`;
      const t = ctx.cue(hl.cue) ?? (times[hl.row] ?? ctx.start) + 0.8;
      js += `tl.fromTo(${JSON.stringify(sel)}, { backgroundColor: "rgba(247,201,51,0)" }, { backgroundColor: "rgba(247,201,51,1)", duration: 0.4 }, ${t.toFixed(3)});\n`;
    }
    return { html, js };
  },
};
