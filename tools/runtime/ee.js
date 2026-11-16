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

  /* Shrink a scene evenly (CSS zoom) when its stacked content is taller than the frame, so a
     heading or the last row is never cut off at the top or bottom. Uses layout sizes (offsetTop/
     offsetHeight), which animation transforms don't change. Measured now and again after fonts load. */
  /* grow > 1 also ENLARGES content that is much smaller than the frame (vertical format: phone screens). */
  E.fit = (sel, grow = 1) => {
    const el = document.querySelector(sel);
    if (!el) return;
    const measure = () => {
      if (!el.clientHeight) return; // not laid out yet (measured again once fonts are ready)
      el.style.zoom = ""; el.style.padding = ""; el.style.transform = "";
      // Chrome misplaces SVG foreignObject labels under CSS zoom, so figures with them only shrink, by transform
      const fo = !!el.querySelector("foreignObject");
      const kids = [...el.children].filter((k) => getComputedStyle(k).position !== "absolute");
      if (!kids.length) return;
      const top = Math.min(...kids.map((k) => k.offsetTop)), bottom = Math.max(...kids.map((k) => k.offsetTop + k.offsetHeight));
      const cs = getComputedStyle(el);
      const p = ["Top", "Right", "Bottom", "Left"].map((s) => parseFloat(cs["padding" + s]));
      const room = el.clientHeight - p[0] - p[2], need = bottom - top;
      if (need <= 0) return;
      // width that can't wrap: natural (max-content) width of everything except headings, which re-wrap when zoomed
      const roomW = el.clientWidth - p[1] - p[3];
      const natural = (k) => { const w0 = k.style.width; k.style.width = "max-content"; const w = k.offsetWidth; k.style.width = w0; return w; };
      const needW = Math.max(1, ...kids.filter((k) => !k.classList.contains("heading")).map((k) => Math.min(natural(k), roomW)));
      let z = 1;
      if (need > room + 1) z = Math.max(0.55, (room / need) * 0.98);
      else if (grow > 1) {
        z = Math.min(grow, (room * 0.85) / need, (roomW * 0.95) / needW);
        if (z < 1.08 || fo) z = 1;
      }
      const apply = (zz) => {
        if (fo) { el.style.transformOrigin = "50% 50%"; el.style.transform = zz === 1 ? "" : `scale(${zz})`; return; }
        el.style.zoom = zz === 1 ? "" : String(zz);
        // zoom also shrinks the padding; scale it back up so the safe margins (and Shorts' banner area) stay the same
        el.style.padding = zz === 1 ? "" : p.map((v) => `${(v / zz).toFixed(1)}px`).join(" ");
      };
      apply(z);
      // Width check on what is really drawn (equations, tables, graph labels): nothing may cross the side margins.
      // measure without animation transforms (pop-ins start small, slides start shifted)
      if (!document.getElementById("ee-measure-css")) { const st = document.createElement("style"); st.id = "ee-measure-css"; st.textContent = ".ee-measure, .ee-measure * { transform: none !important; }"; document.head.appendChild(st); }
      el.classList.add("ee-measure");
      for (let pass = 0; pass < 3; pass++) {
        const r = el.getBoundingClientRect();
        const L = r.left + p[3], R = r.right - p[1], C = (L + R) / 2;
        let lo = Infinity, hi = -Infinity;
        for (const d of el.querySelectorAll("*")) {
          const b = d.getBoundingClientRect();
          if (!b.width || !b.height) continue;
          lo = Math.min(lo, b.left); hi = Math.max(hi, b.right);
        }
        if (!(hi > lo)) break;
        const f = Math.min(lo < L - 1 ? (C - L) / (C - lo) : 1, hi > R + 1 ? (R - C) / (hi - C) : 1);
        if (f >= 0.995) break;
        z = Math.max(0.45, (fo ? Math.min(z, f) : z * f) * 0.97);
        if (fo) break; // measured unscaled (transform is off while measuring): one pass is exact
        apply(z);
      }
      el.classList.remove("ee-measure");
    };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  };

  window.EE = E;
})();
