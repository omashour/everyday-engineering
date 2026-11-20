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
      el.style.zoom = ""; el.style.padding = ""; el.style.scale = "";
      // a red side note that would run past the right margin goes under its line instead (keeps the scene full size)
      const notes = [...el.querySelectorAll(".note")];
      if (notes.length) {
        notes.forEach((n) => n.classList.remove("below"));
        measureCss();
        el.classList.add("ee-measure");
        const edge = el.getBoundingClientRect().right - parseFloat(getComputedStyle(el).paddingRight);
        notes.forEach((n) => { if (n.getBoundingClientRect().right > edge) n.classList.add("below"); });
        el.classList.remove("ee-measure");
      }
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
        if (fo) { el.style.scale = zz === 1 ? "" : String(zz); return; }
        el.style.zoom = zz === 1 ? "" : String(zz);
        // zoom also shrinks the padding; scale it back up so the safe margins (and Shorts' banner area) stay the same
        el.style.padding = zz === 1 ? "" : p.map((v) => `${(v / zz).toFixed(1)}px`).join(" ");
      };
      apply(z);
      // Width check on what is really drawn (equations, tables, graph labels): nothing may cross the side margins.
      // measure without animation transforms (pop-ins start small, slides start shifted)
      measureCss();
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
        if (fo) { apply(z); break; } // measured unscaled (transform is off while measuring): one pass is exact
        apply(z);
      }
      el.classList.remove("ee-measure");
    };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    // measure again whenever the scene gets its size (hidden scenes are shown by the player later)
    if (window.ResizeObserver) { let last = 0; new ResizeObserver(() => { const h = el.clientHeight; if (h && h !== last) { last = h; measure(); } }).observe(el); }
  };

  function measureCss() {
    if (document.getElementById("ee-measure-css")) return;
    const st = document.createElement("style"); st.id = "ee-measure-css";
    st.textContent = ".ee-measure, .ee-measure * { transform: none !important; scale: none !important; }";
    document.head.appendChild(st);
  }

  /* Labels inside SVG figures and graphs (foreignObject text) must not sit on a drawn line, curve, dot,
     arrow head or tick number. Each label that does is moved to the nearest free spot (up/down first,
     then sideways, at most ~3.5 label heights away, inside the drawing). Returns the texts that could not
     be freed. Runs in measuring mode (no animation transforms), so positions are the final ones. */
  function offStrokes(root) {
    const stuck = [];
    for (const svg of root.querySelectorAll("svg")) {
      const labs = [...svg.querySelectorAll(".fo > span")].filter((e) => e.textContent.trim() && e.getBoundingClientRect().width > 0);
      if (!labs.length) continue;
      const ctm = svg.getScreenCTM();
      if (!ctm) continue;
      const inv = ctm.inverse();
      const box = (r) => {
        const a = new DOMPoint(r.left, r.top).matrixTransform(inv), b = new DOMPoint(r.right, r.bottom).matrixTransform(inv);
        return { x0: Math.min(a.x, b.x), y0: Math.min(a.y, b.y), x1: Math.max(a.x, b.x), y1: Math.max(a.y, b.y) };
      };
      // points along every drawn outline: [x, y, clearance]
      const pts = [];
      for (const g of svg.querySelectorAll("line, polyline, polygon, path, circle, rect, ellipse")) {
        if (g.closest("foreignObject") || g.classList.contains("grid")) continue;
        const stroke = g.getAttribute("stroke"), fill = g.getAttribute("fill");
        const hasStroke = !!stroke && stroke !== "none", hasFill = fill !== "none" && (fill != null || g.tagName === "path");
        if (!hasStroke && !hasFill) continue;
        const pad = (hasStroke ? (parseFloat(g.getAttribute("stroke-width")) || 1) / 2 : 0) + 5;
        if (g.tagName === "circle" && +g.getAttribute("r") <= 30 && hasFill) { pts.push([+g.getAttribute("cx"), +g.getAttribute("cy"), +g.getAttribute("r") + pad]); continue; }
        const tmp = g.cloneNode(false);
        ["pathLength", "class", "style", "id"].forEach((a) => tmp.removeAttribute(a));
        svg.appendChild(tmp);
        try {
          const L = tmp.getTotalLength();
          const step = Math.max(3, L / 800);
          for (let d = 0; d <= L + 0.01; d += step) { const q = tmp.getPointAtLength(Math.min(d, L)); pts.push([q.x, q.y, pad]); }
        } catch {}
        tmp.remove();
      }
      const texts = [...svg.querySelectorAll("text")].map((t) => { try { const b = t.getBBox(); return { x0: b.x, y0: b.y, x1: b.x + b.width, y1: b.y + b.height }; } catch { return null; } }).filter(Boolean);
      const vb = svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width ? svg.viewBox.baseVal : null;
      const rects = labs.map((l) => box(l.getBoundingClientRect()));
      const crossesLine = (r) => pts.some(([x, y, c]) => x > r.x0 - c && x < r.x1 + c && y > r.y0 - c && y < r.y1 + c);
      const meets = (a, b) => Math.min(a.x1, b.x1) - Math.max(a.x0, b.x0) > 2 && Math.min(a.y1, b.y1) - Math.max(a.y0, b.y0) > 2;
      const blocked = (r, i) => crossesLine(r) || texts.some((t) => meets(r, t)) || rects.some((o, j) => j !== i && meets(r, o));
      // labels tied to a dot pick their spot first; free labels (curve names, notes) then avoid them
      const order = labs.map((_, i) => i).sort((a, b) => +labs[b].closest("foreignObject").hasAttribute("data-anchor") - +labs[a].closest("foreignObject").hasAttribute("data-anchor"));
      order.forEach((i) => {
        const L = labs[i], r = rects[i];
        const fobj = L.closest("foreignObject");
        const anchor = fobj.getAttribute("data-anchor"); // "x,y,radius": a label that belongs to a dot stays beside it
        if (anchor ? !blocked(r, i) : !crossesLine(r) && !texts.some((t) => meets(r, t))) return;
        const w = r.x1 - r.x0, h = r.y1 - r.y0, step = Math.max(8, h * 0.3);
        const cands = [];
        if (anchor) {
          const [ax, ay, ar] = anchor.split(",").map(Number);
          for (const extra of [10, 24, 40]) {
            const g = ar + extra, d = g * 0.7;
            cands.push([ax + d, ay - d - h], [ax - d - w, ay - d - h], [ax + d, ay + d], [ax - d - w, ay + d], [ax + g, ay - h / 2], [ax - g - w, ay - h / 2], [ax - w / 2, ay - g - h], [ax - w / 2, ay + g]);
          }
        } else {
          const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0], [0.7, 0.7], [-0.7, 0.7], [0.7, -0.7], [-0.7, -0.7]];
          for (let k = 1; k <= 12; k++) for (const [ux, uy] of dirs) cands.push([r.x0 + ux * k * step * (uy ? 1 : 1.4), r.y0 + uy * k * step]);
        }
        let best = null;
        for (const [cx, cy] of cands) {
          const dx = cx - r.x0, dy = cy - r.y0;
          const c = { x0: cx, y0: cy, x1: cx + w, y1: cy + h };
          if (vb && (c.x0 < vb.x - 10 || c.y0 < vb.y - 10 || c.x1 > vb.x + vb.width + 10 || c.y1 > vb.y + vb.height + 10)) continue;
          if (!blocked(c, i)) { best = [dx, dy, c]; break; }
        }
        if (!best) { stuck.push(L.textContent.trim().slice(0, 40)); return; }
        fobj.setAttribute("x", String(parseFloat(fobj.getAttribute("x")) + best[0]));
        fobj.setAttribute("y", String(parseFloat(fobj.getAttribute("y")) + best[1]));
        rects[i] = best[2];
      });
    }
    return stuck;
  }

  /* Labels placed by coordinates (figure/graph labels, photo pills) can land on top of each other.
     Shrink colliding labels a little (to 72% at most), then push one away vertically. Anything still
     overlapping is listed in window.__eeOverlaps (read by the build's overlap report). */
  E.declutter = (sel) => {
    const root = document.querySelector(sel);
    if (!root) return;
    const run = () => {
      measureCss();
      root.classList.add("ee-measure");
      const labs = [...root.querySelectorAll(".fo > span, .po-t > *")].filter((e) => e.textContent.trim() && e.getBoundingClientRect().width > 0);
      const hit = (a, b) => {
        const w = Math.min(a.right, b.right) - Math.max(a.left, b.left), h = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
        return w > 3 && h > 3 ? { w, h } : null;
      };
      const shrink = (L) => {
        const base = +(L.dataset.eeBase || (L.dataset.eeBase = parseFloat(getComputedStyle(L).fontSize)));
        const f = +(L.dataset.eeF || 1);
        if (f <= 0.75) return false;
        L.dataset.eeF = (f * 0.92).toFixed(3);
        L.style.fontSize = (base * f * 0.92).toFixed(2) + "px";
        return true;
      };
      const nudge = (L, dyPx) => {
        const fobj = L.closest("foreignObject");
        if (fobj) {
          const m = fobj.ownerSVGElement && fobj.ownerSVGElement.getScreenCTM();
          const k = m && m.d ? m.d : 1;
          fobj.setAttribute("y", String(parseFloat(fobj.getAttribute("y")) + dyPx / k));
          return;
        }
        const host = L.parentElement, layer = host.parentElement;
        const k = layer.getBoundingClientRect().width / (layer.offsetWidth || 1) || 1;
        host.style.top = (parseFloat(host.style.top) + dyPx / k).toFixed(1) + "px";
      };
      const onLines = offStrokes(root);
      for (let it = 0; it < 10; it++) {
        let any = false;
        for (let i = 0; i < labs.length; i++) for (let j = i + 1; j < labs.length; j++) {
          const A = labs[i], B = labs[j];
          if (A.contains(B) || B.contains(A)) continue;
          const a = A.getBoundingClientRect(), b = B.getBoundingClientRect();
          const o = hit(a, b);
          if (!o) continue;
          any = true;
          const s1 = shrink(A), s2 = shrink(B);
          if (!s1 && !s2) {
            const down = (b.top + b.bottom) / 2 >= (a.top + a.bottom) / 2;
            nudge(B, (down ? 1 : -1) * (o.h + 6));
          }
        }
        if (!any) break;
      }
      const left = [];
      for (let i = 0; i < labs.length; i++) for (let j = i + 1; j < labs.length; j++) {
        if (labs[i].contains(labs[j]) || labs[j].contains(labs[i])) continue;
        if (hit(labs[i].getBoundingClientRect(), labs[j].getBoundingClientRect())) left.push([labs[i].textContent.trim().slice(0, 40), labs[j].textContent.trim().slice(0, 40)]);
      }
      for (const t of onLines) left.push([t, "a line or curve"]);
      root.classList.remove("ee-measure");
      window.__eeOverlaps = (window.__eeOverlaps || []).filter((x) => x.scene !== sel).concat(left.map((p) => ({ scene: sel, a: p[0], b: p[1] })));
    };
    // run once, when the scene is actually laid out (the player keeps inactive scenes hidden) and fonts are in
    let done = false;
    const go = () => {
      if (done || !root.getBoundingClientRect().width) return;
      done = true;
      run();
    };
    const ready = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    ready.then(() => {
      go();
      if (!done && window.ResizeObserver) new ResizeObserver(() => go()).observe(root);
    });
  };

  window.EE = E;
})();
