// Split "everything Claude wrote" into the five video files.
// Finds each file name (in a heading, bold text or a path), then takes the next fenced code block.
export const SCRIPT_FILES = ["scenes.yaml", "metadata.md", "thumbnail.yaml", "shorts.yaml", "assets-needed.md"];

export function splitClaudeOutput(text) {
  const src = String(text ?? "").replace(/\r\n/g, "\n");
  const found = {};
  const nameRe = /(scenes\.yaml|metadata\.md|thumbnail\.yaml|shorts\.yaml|assets-needed\.md)/g;
  let m;
  while ((m = nameRe.exec(src))) {
    const name = m[1];
    if (found[name]) continue;
    // the name must sit outside a code block: the next fence after it opens the file's block
    const after = src.slice(m.index);
    const open = after.match(/\n[ \t]*(`{3,}|~{3,})[^\n]*\n/);
    if (!open) continue;
    // and no other file name may appear between the name and that fence
    const between = after.slice(m[0].length, open.index);
    if (/(scenes\.yaml|metadata\.md|thumbnail\.yaml|shorts\.yaml|assets-needed\.md)/.test(between)) continue;
    if (between.split("\n").length > 4) continue;
    const fence = open[1];
    const start = open.index + open[0].length;
    const close = after.slice(start).search(new RegExp(`\\n[ \\t]*${fence[0] === "`" ? "`" : "~"}{${fence.length},}[ \\t]*(\\n|$)`));
    if (close < 0) continue;
    found[name] = after.slice(start, start + close);
    nameRe.lastIndex = m.index + start + close;
  }
  return found;
}
