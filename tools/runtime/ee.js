/* Everyday Engineering animation helpers. Loaded by every generated composition.
   All helpers add tweens to the ONE paused GSAP timeline at absolute times, so
   every frame is reproducible from its time value (HyperFrames determinism). */
(function () {
  const E = {};
  const q = (sel) => document.querySelectorAll(sel);
  const has = (sel) => q(sel).length > 0;

  E.fade = (tl, sel, t, d = 0.4) => has(sel) && tl.fromTo(sel, { opacity: 0 }, { opacity: 1, duration: d, ease: "power1.out" }, t);
  E.rise = (tl, sel, t, d = 0.5) => has(sel) && tl.fromTo(sel, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: d, ease: "power2.out" }, t);
  E.pop = (tl, sel, t, d = 0.45) => has(sel) && tl.fromTo(sel, { opacity: 0, scale: 0.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: d, ease: "back.out(1.8)" }, t);
  E.slide = (tl, sel, t, dx = -60, d = 0.5) => has(sel) && tl.fromTo(sel, { opacity: 0, x: dx }, { opacity: 1, x: 0, duration: d, ease: "power3.out" }, t);
  E.out = (tl, sel, t, d = 0.3) => has(sel) && tl.to(sel, { opacity: 0, duration: d, ease: "power1.in" }, t);

  /* Draw strokes that carry pathLength="1" (lines, paths, polylines). */
  E.draw = (tl, sel, t, d = 0.8) => {
    if (!has(sel)) return;
    tl.fromTo(sel, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: d, ease: "power2.inOut" }, t);
  };
  /* Draw a whole SVG group: strokes draw, everything else fades in after. */
  E.drawGroup = (tl, sel, t, d = 0.8) => {
    const strokes = sel + " .stroke:not(.dashed)";
    if (has(strokes)) E.draw(tl, strokes, t, d);
    const rest = sel + " .pop, " + sel + " foreignObject, " + sel + " .pop-g, " + sel + " .dashed";
    if (has(rest)) tl.fromTo(rest, { opacity: 0 }, { opacity: 1, duration: 0.35 }, t + d * 0.6);
  };
  /* Yellow marker behind text: .mk-bar inside the element grows left to right. */
  E.mark = (tl, sel, t, d = 0.45) => has(sel) && tl.fromTo(sel, { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: d, ease: "power2.out" }, t);
  /* Reveal by wiping a clip-path from left to right. */
  E.wipe = (tl, sel, t, d = 0.7) => has(sel) && tl.fromTo(sel, { clipPath: "inset(0% 100% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: d, ease: "power2.inOut" }, t);
  /* Count a number up inside an element. */
  E.count = (tl, sel, from, to, t, d = 1.2, decimals = 0, prefix = "", suffix = "") => {
    const el = document.querySelector(sel);
    if (!el) return;
    const o = { v: from };
    const fmt = (v) => prefix + Number(v).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + suffix;
    el.textContent = fmt(from);
    tl.to(o, { v: to, duration: d, ease: "power2.out", onUpdate: () => (el.textContent = fmt(o.v)) }, t);
  };
  /* Slow zoom/pan on an image wrapper (Ken Burns). */
  E.kenburns = (tl, sel, t0, t1, from = 1.0, to = 1.12, ox = "50%", oy = "50%") =>
    has(sel) && tl.fromTo(sel, { scale: from, transformOrigin: ox + " " + oy }, { scale: to, duration: Math.max(0.1, t1 - t0), ease: "none" }, t0);
  /* Move an SVG circle along precomputed points [[x,y],...]. */
  E.follow = (tl, sel, pts, t, d = 2, labelSel = null, labelFmt = null) => {
    const el = document.querySelector(sel);
    if (!el || !pts.length) return;
    const lab = labelSel ? document.querySelector(labelSel) : null;
    const o = { i: 0 };
    const place = () => {
      const p = pts[Math.min(pts.length - 1, Math.round(o.i))];
      el.setAttribute("cx", p[0]);
      el.setAttribute("cy", p[1]);
      if (lab) {
        lab.setAttribute("x", p[0] + 18);
        lab.setAttribute("y", p[1] - 18);
        if (labelFmt) lab.textContent = labelFmt(p);
      }
    };
    place();
    tl.fromTo(el, { opacity: 0 }, { opacity: 1, duration: 0.2 }, t);
    tl.to(o, { i: pts.length - 1, duration: d, ease: "power1.inOut", onUpdate: place }, t);
  };
  /* Countdown text 3..2..1 */
  E.countdown = (tl, sel, t, seconds) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const o = { v: seconds };
    el.textContent = String(seconds);
    tl.to(o, { v: 0, duration: seconds, ease: "none", onUpdate: () => (el.textContent = String(Math.max(1, Math.ceil(o.v)))) }, t);
  };

  window.EE = E;
})();
