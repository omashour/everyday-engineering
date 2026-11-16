// Split "everything Claude wrote" into the five video files.
// Finds each file name (in a heading, bold text or a path), then takes the next fenced code block.
export const SCRIPT_FILES = ["scenes.yaml", "metadata.md", "thumbnail.yaml", "shorts.yaml", "assets-needed.md"];

const MARKER = /^[ \t]*={3,}[ \t]*FILE:[ \t]*(scenes\.yaml|metadata\.md|thumbnail\.yaml|shorts\.yaml|assets-needed\.md)[ \t]*={3,}[ \t]*$/gm;

/**
 * The single-block format the skill writes (one Copy button in Claude.ai):
 *   ~~~~~text
 *   ===== FILE: scenes.yaml =====
 *   …
 *   ===== FILE: metadata.md =====
 *   …
 *   ===== END =====
 *   ~~~~~
 * Files may contain their own ``` fences; only the outer fence and the markers matter.
 */
function splitMarkers(src) {
  const marks = [...src.matchAll(MARKER)];
  if (!marks.length) return null;
  // where the content ends: an END marker, else the outer fence that closes the block, else the end
  const last = marks[marks.length - 1];
  let stop = src.length;
  const end = src.slice(last.index).search(/^[ \t]*={3,}[ \t]*END[ \t]*={3,}[ \t]*$/m);
  if (end >= 0) stop = last.index + end;
  else {
    const before = src.slice(0, marks[0].index).match(/(?:^|\n)[ \t]*(`{3,}|~{3,})[^\n]*\n\s*$/);
    if (before) {
      const f = before[1];
      const closes = [...src.slice(last.index).matchAll(new RegExp(`^[ \\t]*${f[0] === "`" ? "`" : "~"}{${f.length},}[ \\t]*$`, "gm"))];
      if (closes.length) stop = last.index + closes[closes.length - 1].index;
    }
  }
  const found = {};
  marks.forEach((m, i) => {
    const from = m.index + m[0].length, to = i + 1 < marks.length ? marks[i + 1].index : stop;
    let body = src.slice(from, to).replace(/^\n+/, "").replace(/\s+$/, "");
    // tolerate a file that was also wrapped in its own fence inside the block
    const wrap = body.match(/^(`{3,}|~{3,})[^\n]*\n([\s\S]*)\n\1[ \t]*$/);
    if (wrap) body = wrap[2];
    if (!found[m[1]]) found[m[1]] = body;
  });
  return found;
}

export function splitClaudeOutput(text) {
  const src = String(text ?? "").replace(/\r\n/g, "\n");
  const marked = splitMarkers(src);
  if (marked) return marked;
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
