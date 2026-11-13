// Which photos/files a video needs (from scenes.yaml and thumbnail.yaml) and which are missing
// from its assets/ folder. Used by the app to stop "Make everything" before rendering blank photos.
import fs from "node:fs";
import path from "node:path";
import { readYaml } from "./core.mjs";

const MEDIA = /\.(jpe?g|png|webp|gif|svg|mp4|webm)$/i;

function collect(node, where, out) {
  if (typeof node === "string") {
    if (MEDIA.test(node) && !node.startsWith("brand:") && !/^[a-z]+:\/\//i.test(node)) (out[node] ??= new Set()).add(where);
  } else if (Array.isArray(node)) node.forEach((n) => collect(n, where, out));
  else if (node && typeof node === "object") for (const v of Object.values(node)) collect(v, where, out);
}

/** Scenes whose photo credit still has Claude's placeholder, e.g. "Photo: [author], [license]". */
export function creditPlaceholders(vdir) {
  let scenes = [];
  try { scenes = readYaml(path.join(vdir, "scenes.yaml"), {}).scenes ?? []; } catch { return []; }
  return scenes.filter((s) => /\[(author|license|photographer|source)\]/i.test(String(s?.params?.credit ?? ""))).map((s) => s.id);
}

/** @returns {{file: string, usedIn: string[]}[]} files referenced but not present in assets/ */
export function missingAssets(vdir) {
  const need = {};
  let scenes = [];
  try { scenes = readYaml(path.join(vdir, "scenes.yaml"), {}).scenes ?? []; } catch { /* reported by validation */ }
  for (const s of scenes) collect(s?.params, s?.id ?? "a scene", need);
  let variants = [];
  try { variants = readYaml(path.join(vdir, "thumbnail.yaml"), {}).variants ?? []; } catch { /* ignore */ }
  variants.forEach((v, i) => v?.image && collect(v.image, `thumbnail ${i + 1}`, need));
  return Object.entries(need)
    .filter(([f]) => !fs.existsSync(path.join(vdir, "assets", f)))
    .map(([file, w]) => ({ file, usedIn: [...w] }));
}
