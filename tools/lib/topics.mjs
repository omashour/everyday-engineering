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

export function moveToCovered(id, entry) {
  const doc = YAML.parseDocument(fs.readFileSync(BACKLOG, "utf8"));
  const idx = doc.contents.items.findIndex((n) => n.get("id") === id);
  if (idx >= 0) doc.contents.items.splice(idx, 1);
  fs.writeFileSync(BACKLOG, doc.toString({ lineWidth: 0, flowCollectionPadding: false }));
  const cov = YAML.parseDocument(fs.existsSync(COVERED) ? fs.readFileSync(COVERED, "utf8") : "[]");
  if (!cov.contents || !cov.contents.items) cov.contents = cov.createNode([]);
  const node = cov.createNode(entry);
  node.flow = true;
  cov.contents.items.push(node);
  fs.writeFileSync(COVERED, cov.toString({ lineWidth: 0, flowCollectionPadding: false }));
}
