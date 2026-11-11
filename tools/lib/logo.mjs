// The channel logo as editable SVG: white gear around a yellow lightbulb on navy.
// variant "classic" = current logo; "sine" = optional refresh with a sine-wave filament.

function gearPath(cx, cy, rOut, rIn, teeth, hole) {
  const pts = [];
  const step = (Math.PI * 2) / teeth;
  for (let i = 0; i < teeth; i++) {
    const a = i * step - Math.PI / 2;
    const w = step * 0.22; // half tooth width at the tip
    const wb = step * 0.3; // half tooth width at the root
    pts.push([a - wb, rIn], [a - w, rOut], [a + w, rOut], [a + wb, rIn]);
  }
  const d = pts.map(([a, r], i) => `${i ? "L" : "M"}${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`).join(" ") + " Z";
  // hole as a circle (evenodd)
  const h = `M${cx + hole},${cy} A${hole},${hole} 0 1 0 ${cx - hole},${cy} A${hole},${hole} 0 1 0 ${cx + hole},${cy} Z`;
  return d + " " + h;
}

export function logoSvg({ colors, variant = "classic", background = true, size = 512 } = {}) {
  const navy = colors.navy, yel = colors.marker;
  const cx = 256, cy = 256;
  const gear = gearPath(cx, cy, 196, 160, 8, 122);
  // bulb: glass circle + neck, then base bands
  const bulb = `<path d="M256,150 C305,150 340,186 340,232 C340,262 324,283 306,299 C298,306 294,314 294,322 L218,322 C218,314 214,306 206,299 C188,283 172,262 172,232 C172,186 207,150 256,150 Z" fill="${yel}"/>`;
  const base = `<rect x="216" y="330" width="80" height="14" rx="7" fill="#fff"/><rect x="220" y="350" width="72" height="14" rx="7" fill="#fff"/><path d="M232,370 L280,370 L270,384 L242,384 Z" fill="#fff"/>`;
  const filament =
    variant === "sine"
      ? `<path d="M226,254 C236,226 246,226 256,254 C266,282 276,282 286,254" fill="none" stroke="${navy}" stroke-width="10" stroke-linecap="round"/><path d="M226,254 L226,318 M286,254 L286,318" stroke="${navy}" stroke-width="10" stroke-linecap="round"/>`
      : `<path d="M238,318 L238,258 C238,240 226,236 226,224 C226,212 242,212 244,224 C246,236 238,240 238,258 M274,318 L274,258 C274,240 286,236 286,224 C286,212 270,212 268,224 C266,236 274,240 274,258" fill="none" stroke="${navy}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/>`;
  const bg = background ? `<rect width="512" height="512" fill="${navy}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="${size}" height="${size}">${bg}<path d="${gear}" fill="#fff" fill-rule="evenodd"/>${bulb}${filament}${base}</svg>\n`;
}
