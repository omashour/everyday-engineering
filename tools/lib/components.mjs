// Loads every component from styles/*/components/*.mjs into one registry.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { P } from "./core.mjs";

let cache = null;
export async function loadComponents() {
  if (cache) return cache;
  const reg = {};
  for (const style of fs.readdirSync(P.styles)) {
    const dir = path.join(P.styles, style, "components");
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".mjs"))) {
      const mod = (await import(pathToFileURL(path.join(dir, f)).href)).default;
      if (!mod?.name) continue;
      if (reg[mod.name]) throw new Error(`Duplicate component name "${mod.name}" in ${style}/${f}`);
      reg[mod.name] = { ...mod, style };
    }
  }
  cache = reg;
  return reg;
}
