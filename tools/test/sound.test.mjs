import test from "node:test";
import assert from "node:assert/strict";
import { sfxEvents } from "../lib/sound.mjs";

test("sound effects: whoosh between scenes, ding for answers, never two effects within 0.3 s", () => {
  const calls = [
    { fn: "pop", t: 1.0, component: "photo-overlay" },
    { fn: "pop", t: 1.1, component: "photo-overlay" }, // too close: dropped
    { fn: "mark", t: 3.0, component: "title-card" },
    { fn: "pop", t: 5.0, component: "answer-box" },
    { fn: "rise", t: 6.0, component: "bullets" }, // no sound for rise
    { fn: "pop", t: 9.0, component: "end-card" },
  ];
  const ev = sfxEvents(calls, [{ t: 0, index: 0 }, { t: 2.5, index: 1 }, { t: 8.5, index: 2 }]);
  assert.deepEqual(ev.map((e) => e.kind), ["pop", "whoosh", "swipe", "ding", "whoosh", "chime"]);
  for (let i = 1; i < ev.length; i++) assert.ok(ev[i].t - ev[i - 1].t >= 0.3);
});

test("sound effects: at most 3 pops in any 2 seconds", () => {
  const calls = [0, 0.4, 0.8, 1.2, 1.6].map((t) => ({ fn: "pop", t, component: "graph" }));
  assert.equal(sfxEvents(calls, []).length, 3);
});
