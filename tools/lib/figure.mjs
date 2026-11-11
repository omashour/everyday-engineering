// Turn a figure spec ({view:[w,h], items:[...]}) into SVG + timed animation calls.
import { diagramItems } from "./kit.mjs";

/**
 * @returns {html, js}  html is an <svg>; js adds one animation per item
 * @param fig   {view:[w,h], items:[...] }
 * @param ctx   component context
 * @param key   unique suffix for ids
 * @param win   {from, to} default time window used for items without a cue
 */
export function figure(fig, ctx, key = "fig", win) {
  if (!fig) return { html: "", js: "" };
  const [w, h] = fig.view ?? [1000, 600];
  const parts = diagramItems(fig.items ?? [], ctx);
  const times = ctx.times(parts, win);
  let svg = `<svg class="fig" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid meet">`;
  let js = "";
  parts.forEach((p, i) => {
    const id = ctx.uid(`${key}-${i}`);
    svg += `<g id="${id}" class="ditem">${p.svg}</g>`;
    const t = times[i];
    if (p.kind === "draw") js += ctx.call("drawGroup", `#${id}`, t, 0.8);
    else if (p.kind === "pop") js += ctx.call("pop", `#${id}`, t);
    else js += ctx.call("fade", `#${id}`, t);
  });
  svg += "</svg>";
  return { html: svg, js };
}
