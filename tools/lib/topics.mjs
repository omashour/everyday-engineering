// Edit topics/backlog.yaml in place while keeping its comments and one-line style.
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import { P } from "./core.mjs";

const BACKLOG = path.join(P.topics, "backlog.yaml");
const COVERED = path.join(P.topics, "covered.yaml");

export const PHASES = ["math", "physics", "chemistry", "eng-fundamentals", "industrial"];
export const PHASE_LABEL = { math: "Math (with engineering uses)", physics: "Physics", chemistry: "Chemistry", "eng-fundamentals": "Engineering problems, solved", industrial: "Industrial engineering" };

/** The phase on the first line of backlog.yaml ("# CURRENT PHASE: math"); math if missing. */
export function currentPhase() {
  const m = fs.readFileSync(BACKLOG, "utf8").match(/^# CURRENT PHASE:\s*([\w-]+)/m);
  return m && PHASES.includes(m[1]) ? m[1] : "math";
}
export function setCurrentPhase(phase) {
  if (!PHASES.includes(phase)) throw Object.assign(new Error(`Unknown phase ${phase}`), { status: 400 });
  const s = fs.readFileSync(BACKLOG, "utf8");
  const line = `# CURRENT PHASE: ${phase}`;
  fs.writeFileSync(BACKLOG, /^# CURRENT PHASE:.*$/m.test(s) ? s.replace(/^# CURRENT PHASE:.*$/m, line) : `${line}\n${s}`);
}

export function setTopicStatus(id, status, extra = {}) {
  const doc = YAML.parseDocument(fs.readFileSync(BACKLOG, "utf8"));
  const item = doc.contents.items.find((n) => n.get("id") === id);
  if (!item) return false;
  item.set("status", status);
  for (const [k, v] of Object.entries(extra)) item.set(k, v);
  fs.writeFileSync(BACKLOG, doc.toString({ lineWidth: 0, flowCollectionPadding: false }));
  return true;
}

/**
 * Add topic ideas pasted from Claude.ai to the backlog. Accepts one-line entries
 * (`- {id: T40, title: "…", …}`), a YAML list, or Claude's whole answer (other lines are ignored).
 * Ids that are missing or already used get the next free T-number; titles already in the
 * backlog or covered.yaml are skipped.
 * @returns {{added: {id:string,title:string}[], skipped: {title:string,why:string}[]}}
 */
export function addTopics(text) {
  const entries = [];
  const src = String(text ?? "").replace(/\r\n/g, "\n");
  for (const line of src.split("\n")) {
    const l = line.trim();
    if (!/^-\s*\{.*\}\s*$/.test(l)) continue;
    try { const v = YAML.parse(l); if (Array.isArray(v) && v[0] && typeof v[0] === "object") entries.push(v[0]); } catch { /* not a topic line */ }
  }
  if (!entries.length) {
    // block-style YAML list (`- id: T40\n  title: …`), with or without a code fence
    try {
      const v = YAML.parse(src.replace(/^.*```.*$/gm, "").replace(/^\s*topics\/backlog\.yaml:?\s*$/gm, ""));
      if (Array.isArray(v)) entries.push(...v.filter((x) => x && typeof x === "object"));
    } catch { /* nothing usable */ }
  }
  const doc = YAML.parseDocument(fs.readFileSync(BACKLOG, "utf8"));
  if (!doc.contents || !doc.contents.items) doc.contents = doc.createNode([]);
  const covered = fs.existsSync(COVERED) ? YAML.parse(fs.readFileSync(COVERED, "utf8")) ?? [] : [];
  const backlog = doc.toJS() ?? [];
  const usedIds = new Set([...backlog.map((t) => String(t.id)), ...covered.map((c) => String(c.topic ?? ""))].filter(Boolean));
  const norm = (s) => String(s ?? "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  const usedTitles = new Set([...backlog, ...covered].map((t) => norm(t.title)));
  let next = Math.max(0, ...[...usedIds].map((i) => +(/^T(\d+)$/.exec(i)?.[1] ?? 0))) + 1;
  const added = [], skipped = [];
  for (const e of entries) {
    const title = String(e.title ?? "").trim();
    if (!title) { skipped.push({ title: "(no title)", why: "no title" }); continue; }
    if (usedTitles.has(norm(title))) { skipped.push({ title, why: "already in the backlog or published" }); continue; }
    let id = String(e.id ?? "").trim();
    if (!/^T\d+$/.test(id) || usedIds.has(id)) id = `T${next++}`;
    else next = Math.max(next, +id.slice(1) + 1);
    const phase = PHASES.includes(e.phase) ? e.phase : currentPhase();
    const entry = { id, title, ...Object.fromEntries(Object.entries(e).filter(([k]) => !["id", "title", "phase", "status"].includes(k))), phase, status: "idea" };
    const node = doc.createNode(entry);
    node.flow = true;
    doc.contents.items.push(node);
    usedIds.add(id);
    usedTitles.add(norm(title));
    added.push({ id, title });
  }
  if (added.length) fs.writeFileSync(BACKLOG, doc.toString({ lineWidth: 0, flowCollectionPadding: false }));
  return { added, skipped };
}

export function moveToCovered(id, entry) {
  const doc = YAML.parseDocument(fs.readFileSync(BACKLOG, "utf8"));
  const idx = doc.contents.items.findIndex((n) => n.get("id") === id);
  if (idx >= 0) doc.contents.items.splice(idx, 1);
  fs.writeFileSync(BACKLOG, doc.toString({ lineWidth: 0, flowCollectionPadding: false }));
  const cov = YAML.parseDocument(fs.existsSync(COVERED) ? fs.readFileSync(COVERED, "utf8") : "[]");
  if (!cov.contents || !cov.contents.items) cov.contents = cov.createNode([]);
  // pressing "Mark as published" again replaces the entry instead of adding a second one
  const same = cov.contents.items.findIndex((n) => String(n.get?.("video")) === String(entry.video));
  if (same >= 0) cov.contents.items.splice(same, 1);
  const node = cov.createNode(entry);
  node.flow = true;
  cov.contents.items.push(node);
  fs.writeFileSync(COVERED, cov.toString({ lineWidth: 0, flowCollectionPadding: false }));
}
