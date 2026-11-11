import test from "node:test";
import assert from "node:assert/strict";
import { solveBeam, evalExpr } from "../lib/kit.mjs";
import { buildTiming, cueTime, tokens, syntheticWords } from "../lib/timing.mjs";

const near = (a, b, eps = 1e-6) => assert.ok(Math.abs(a - b) < eps, `${a} ≉ ${b}`);

test("simply supported beam, centre point load: R = P/2, Mmax = PL/4", () => {
  const b = solveBeam({ length: 4, supports: [{ type: "pin", x: 0 }, { type: "roller", x: 4 }], loads: [{ type: "point", x: 2, P: 10 }] });
  near(b.reactions[0].F, 5);
  near(b.reactions[1].F, 5);
  near(b.M(2), 10);
  near(b.V(1), 5);
  near(b.V(3), -5);
});

test("point load + UDL (gallery problem): R_A = 8.7, R_B = 9.3", () => {
  const b = solveBeam({ length: 6, supports: [{ type: "pin", x: 0 }, { type: "roller", x: 6 }], loads: [{ type: "point", x: 2.4, P: 12 }, { type: "udl", x1: 3, x2: 6, w: 2 }] });
  near(b.reactions[0].F, 8.7);
  near(b.reactions[1].F, 9.3);
  near(b.M(6), 0, 1e-9);
});

test("cantilever, tip load: wall moment PL, M(0) = -PL, M(L) = 0", () => {
  const b = solveBeam({ length: 3, supports: [{ type: "fixed", x: 0 }], loads: [{ type: "point", x: 3, P: 2 }] });
  near(b.reactions[0].F, 2);
  near(b.reactions[0].M, 6);
  near(b.M(0), -6);
  near(b.M(3), 0);
});

test("expressions use JS math with ^ for powers", () => {
  near(evalExpr("(x/3.6)^2/14")(100), 55.11, 0.01);
  near(evalExpr("exp(-0.3*x)*cos(3*x)")(0), 1);
});

test("alignment maps scenes and cues onto transcript words, tolerating small differences", () => {
  const scenes = [
    { id: "S01", say: "Double your speed and your braking distance doesn't double." },
    { id: "S02", say: "It quadruples. Here is 2 times the speed." },
  ];
  // transcript with one wrong word and a number written differently
  const words = "double your speed and your breaking distance doesnt double it quadruples here is two times the speed".split(" ").map((w, i) => ({ text: w, start: i * 0.5, end: i * 0.5 + 0.4 }));
  const t = buildTiming(scenes, words, 10);
  near(t.scenes.S02.speechStart, 9 * 0.5); // "it" is word 9
  near(cueTime(t.scenes.S02, "two times"), 13 * 0.5); // "two" is word 13 (script said "2")
  assert.ok(t.matchedRatio > 0.9);
});

test("tokens normalise apostrophes, punctuation and small numbers", () => {
  assert.deepEqual(tokens("Doesn't it — 2 times?"), ["doesnt", "it", "two", "times"]);
});

test("draft timing is about 150 words per minute", () => {
  const { duration } = syntheticWords([{ say: Array(150).fill("word").join(" ") }]);
  assert.ok(duration > 55 && duration < 70);
});
