/* Everyday Engineering Studio — front end. Talks to tools/app/server.mjs on this PC. */
const $ = (s, el = document) => el.querySelector(s);
const view = $("#view");
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const enc = encodeURIComponent;

async function api(method, url, body, raw) {
  const opt = { method, headers: {} };
  if (raw) opt.body = raw;
  else if (body !== undefined) { opt.body = JSON.stringify(body); opt.headers["Content-Type"] = "application/json"; }
  const r = await fetch(url, opt);
  const data = r.headers.get("content-type")?.includes("json") ? await r.json() : await r.text();
  if (!r.ok) throw new Error(data.error ?? data);
  return data;
}
function toast(msg, ms = 2200) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.add("hidden"), ms);
}
function copyBox(text, rows = "") {
  const id = "c" + Math.random().toString(36).slice(2);
  copyStore[id] = text;
  return `<div class="copy"><pre ${rows}>${esc(text)}</pre><button data-copy="${id}">Copy</button></div>`;
}
const copyStore = {};
document.addEventListener("click", async (e) => {
  const b = e.target.closest("[data-copy]");
  if (!b) return;
  await navigator.clipboard.writeText(copyStore[b.dataset.copy]);
  b.textContent = "Copied ✓";
  setTimeout(() => (b.textContent = "Copy"), 1500);
});

// ------------------------------------------------------------------ jobs
let currentJob = null;
$("#job-toggle").onclick = () => $("#job-log").classList.toggle("hidden");
async function runJob(jobId, onDone) {
  currentJob = jobId;
  const box = $("#job");
  box.classList.remove("hidden", "ok", "fail");
  $("#job-log").textContent = "";
  for (;;) {
    let j;
    try { j = await api("GET", `/api/jobs/${jobId}`); } catch { await sleep(1000); continue; }
    $("#job-title").textContent = j.label;
    $("#job-step").textContent = j.running ? `${j.step}…` : j.code === 0 ? "Done" : "Stopped — open Details to see why";
    const log = $("#job-log");
    const atEnd = log.scrollTop + log.clientHeight >= log.scrollHeight - 20;
    log.textContent = j.log.trim();
    if (atEnd) log.scrollTop = log.scrollHeight;
    if (!j.running) {
      box.classList.add(j.code === 0 ? "ok" : "fail");
      if (j.code !== 0) log.classList.remove("hidden");
      currentJob = null;
      if (j.code === 0) setTimeout(() => !currentJob && box.classList.add("hidden"), 6000);
      onDone?.(j);
      return j;
    }
    await sleep(700);
  }
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function step(dir, stepName, extra = {}, label) {
  try {
    const { job } = await api("POST", `/api/video/${dir}/run`, { step: stepName, label, ...extra });
    await runJob(job, () => render());
  } catch (e) { alert(e.message); }
}

// ------------------------------------------------------------------ router
window.addEventListener("hashchange", render);
async function render() {
  const h = location.hash.slice(1) || "/";
  try {
    if (h.startsWith("/v/")) await renderVideo(h.slice(3));
    else if (h === "/settings") await renderSettings();
    else await renderHome();
  } catch (e) {
    view.innerHTML = `<div class="callout red">${esc(e.message)}</div><p><a href="#/">Back to videos</a></p>`;
  }
}

// ------------------------------------------------------------------ home
const STAGE_LABEL = { new: "Waiting for script", scripted: "Script ready", "ready to record": "Ready to record", "audio in": "Voice added", timed: "Voice timed", built: "Built", rendered: "Rendered", "ready to upload": "Ready to upload", published: "Published" };
async function renderHome() {
  const s = await api("GET", "/api/state");
  if (s.job && !currentJob) runJob(s.job.id, () => render());
  const setup = [];
  if (!s.settings.voice) setup.push("choose your Gemini voice");
  if (!s.settings.uploadDay) setup.push("set your upload day");
  view.innerHTML = `
  <h1>Your videos</h1>
  <p class="muted">Each video goes: script from Claude → voice from Gemini → video here → upload to YouTube.</p>
  ${setup.length ? `<div class="callout">Before your first video: ${setup.join(" and ")} in <a href="#/settings">Settings</a>.</div>` : ""}
  <div class="card">
    <h2>Start a new video</h2>
    <p class="muted small">First ask Claude.ai (in your Everyday Engineering project) to <b>suggest topics</b>, pick one, then create it here.</p>
    <div class="row">
      <select id="topic" class="grow"><option value="">Choose a topic from your list…</option>${s.topics.map((t) => `<option value="${esc(t.id)}">${esc(t.id)} — ${esc(t.title)}</option>`).join("")}</select>
      <span class="muted">or</span>
      <input id="own" class="grow" placeholder="Type your own title" />
      <button class="primary" id="create">Create video</button>
    </div>
  </div>
  <div class="vlist">${s.videos.slice().reverse().map((v) => `
    <a class="card" href="#/v/${v.dir}">
      <div><div class="muted small">Video ${v.id}</div><h2>${esc(v.title)}</h2><div class="small" style="margin-top:6px">Next: <b>${esc(v.next)}</b></div></div>
      <div><span class="pill ${v.stage === "published" ? "done" : ""}">${STAGE_LABEL[v.stage] ?? v.stage}</span><div class="bar" style="margin-top:12px"><i style="width:${Math.round((v.stageIndex / 8) * 100)}%"></i></div></div>
    </a>`).join("") || `<p class="muted">No videos yet.</p>`}</div>`;
  $("#create").onclick = async () => {
    const topic = $("#own").value.trim() || $("#topic").value;
    if (!topic) return alert("Choose a topic or type a title.");
    try {
      const { job } = await api("POST", "/api/new-video", { topic });
      const j = await runJob(job);
      if (j.code === 0) {
        const st = await api("GET", "/api/state");
        const v = st.videos.at(-1);
        location.hash = `#/v/${v.dir}`;
      }
    } catch (e) { alert(e.message); }
  };
}

// ------------------------------------------------------------------ settings
async function renderSettings() {
  const s = (await api("GET", "/api/state")).settings;
  view.innerHTML = `
  <h1>Settings</h1>
  <div class="card">
    <h3>Gemini voice</h3>
    <p class="muted small">Try a few prebuilt voices in Google AI Studio (speech generation, model gemini-3.8-flash-tts), then type the name of the one you like (for example Kore, Charon, Puck, Aoede). Use the same voice for every video.</p>
    <input id="voice" value="${esc(s.voice)}" placeholder="Voice name" />
    <h3>Upload day</h3>
    <p class="muted small">Shown in every description ("New videos every …") and on the banner.</p>
    <select id="day">${["", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday and Thursday", "Tuesday and Friday"].map((d) => `<option ${d === s.uploadDay ? "selected" : ""} value="${d}">${d || "Not set"}</option>`).join("")}</select>
    <h3>GitHub</h3>
    <label class="row small"><input type="checkbox" id="push" ${s.autoPush ? "checked" : ""} /> Save progress to GitHub automatically (scripts and topic list only — never audio or videos)</label>
    <p style="margin-top:16px"><button class="primary" id="save">Save settings</button></p>
  </div>`;
  $("#save").onclick = async () => {
    await api("POST", "/api/settings", { voice: $("#voice").value, uploadDay: $("#day").value, autoPush: $("#push").checked });
    toast("Settings saved");
  };
}

// ------------------------------------------------------------------ video page
async function renderVideo(dir) {
  const d = await api("GET", `/api/video/${dir}`);
  const st = d.stageIndex; // 0 new … 8 published
  const errors = d.validation.problems.filter((p) => p.level === "error");
  const steps = [
    { key: "script", title: "Script from Claude", done: st >= 1 && !errors.length },
    { key: "photos", title: "Photos", done: st >= 1 && !d.missingAssets.length && !d.creditTodo.length, optional: !d.missingAssets.length && !d.creditTodo.length },
    { key: "voice", title: "Voice (Gemini)", done: d.timed && !d.draftOnly },
    { key: "video", title: "Build and render the video", done: d.renders.includes(`${dir}.mp4`) },
    { key: "extras", title: "Shorts and thumbnails", done: d.thumbnails.length > 0 && d.shortsSpec.every((s) => d.renders.includes(`${dir}-short-${s.n}.mp4`)) },
    { key: "youtube", title: "Upload to YouTube", done: d.stage === "published" },
  ];
  const current = steps.find((s) => !s.done && !s.optional)?.key ?? "youtube";
  const body = { script: scriptStep, photos: photosStep, voice: voiceStep, video: videoStep, extras: extrasStep, youtube: youtubeStep };
  view.innerHTML = `
    <p><a href="#/">← All videos</a></p>
    <div class="row"><div class="grow"><div class="muted small">Video ${d.id}</div><h1>${esc(d.title)}</h1></div><span class="pill ${d.stage === "published" ? "done" : ""}">${STAGE_LABEL[d.stage] ?? d.stage}</span></div>
    <p class="muted">Next: <b>${esc(d.next)}</b></p>
    ${steps.map((s, i) => `
      <details class="step ${s.done ? "done" : ""} ${s.key === current ? "current" : ""}" ${s.key === current ? "open" : ""} data-key="${s.key}">
        <summary><span class="num">${s.done ? "✓" : i + 1}</span><h2 class="grow">${s.title}</h2>${s.optional ? `<span class="pill">if needed</span>` : ""}</summary>
        <div class="body" id="body-${s.key}"></div>
      </details>`).join("")}`;
  for (const s of steps) await body[s.key]($(`#body-${s.key}`), d, dir);
  if (!currentJob) {
    const s = await api("GET", "/api/state");
    if (s.job) runJob(s.job.id, () => render());
  }
}

function probsList(v) {
  const list = v.problems.length ? v.problems : [{ level: "ok", msg: "Script checks passed." }];
  return `<ul class="probs">${list.map((p) => `<li class="${p.level === "warn" ? "warn" : p.level}">${esc(p.msg)}</li>`).join("")}</ul>
    <p class="muted small">${v.scenes} scenes · ${v.words} words · about ${v.minutes} min</p>`;
}

function scriptStep(el, d, dir) {
  el.innerHTML = `
    <ol class="howto">
      <li>In Claude.ai (your Everyday Engineering project) ask for the video package for this topic.</li>
      <li>Select <b>all</b> of Claude's answer, copy it, and paste it below. (Or drop the five files onto the box.)</li>
    </ol>
    <textarea id="paste" placeholder="Paste Claude's whole answer here (it contains scenes.yaml, metadata.md, thumbnail.yaml, shorts.yaml and assets-needed.md)"></textarea>
    <div class="row" style="margin-top:8px"><button class="primary" id="savescript">Save script</button>
      <span class="muted small">Files: ${Object.entries(d.files).map(([f, ok]) => `${ok ? "✓" : "✗"} ${f}`).join(" · ")}</span>
      <button class="link" id="openscenes">Open scenes.yaml</button></div>
    <h3>Check</h3>${probsList(d.validation)}
    <p class="muted small">If there's a ✖ error, copy the message into the same Claude.ai chat; Claude sends back only the fixed scene — paste it here or into scenes.yaml.</p>`;
  const ta = $("#paste", el);
  ta.addEventListener("dragover", (e) => { e.preventDefault(); ta.classList.add("over"); });
  ta.addEventListener("drop", async (e) => {
    e.preventDefault();
    const files = {};
    for (const f of e.dataTransfer.files) files[f.name] = await f.text();
    await saveScript(dir, { files });
  });
  $("#savescript", el).onclick = () => saveScript(dir, { paste: ta.value });
  $("#openscenes", el).onclick = () => api("POST", `/api/video/${dir}/open`, { file: "scenes.yaml" });
}
async function saveScript(dir, body) {
  try {
    const r = await api("POST", `/api/video/${dir}/script`, body);
    toast(`Saved: ${r.saved.join(", ")}`, 3000);
    if (r.job) await runJob(r.job);
    render();
  } catch (e) { alert(e.message); }
}

function dropZone(label, onFiles, has = false) {
  const z = document.createElement("div");
  z.className = "drop" + (has ? " has" : "");
  z.innerHTML = label;
  const pick = document.createElement("input");
  pick.type = "file";
  pick.multiple = true;
  pick.className = "hidden";
  z.appendChild(pick);
  z.onclick = () => pick.click();
  pick.onchange = () => onFiles([...pick.files]);
  z.addEventListener("dragover", (e) => { e.preventDefault(); z.classList.add("over"); });
  z.addEventListener("dragleave", () => z.classList.remove("over"));
  z.addEventListener("drop", (e) => { e.preventDefault(); z.classList.remove("over"); onFiles([...e.dataTransfer.files]); });
  return z;
}
async function upload(dir, kind, file, name) {
  await api("PUT", `/api/video/${dir}/${kind}/${enc(name ?? file.name)}`, undefined, file);
}

function photosStep(el, d, dir) {
  el.innerHTML = `
    ${d.missingAssets.length ? `<div class="callout"><b>Still missing:</b> ${d.missingAssets.map((a) => `<code>${esc(a.file)}</code> (used in ${esc(a.usedIn.join(", "))})`).join(", ")}. “Make everything” waits until they're added.</div>` : ""}
    ${d.creditTodo.length ? `<div class="callout"><b>Photo credit not filled in</b> in ${esc(d.creditTodo.join(", "))}: the video would show “[author], [license]”. Ask Claude for the scene with the real credit (author and license from the photo's page) and paste it in step 1.</div>` : ""}
    <p class="muted small">Photos the script needs (from assets-needed.md). Use your own photos or free ones from Wikimedia Commons / Openverse, and keep the credit line Claude wrote.</p>
    <div class="copy"><pre>${esc(d.assetsNeeded || "None.")}</pre></div>
    <p class="small">In this video now: ${d.assets.map((a) => `<code>${esc(a)}</code>`).join(", ") || "nothing"}</p>
    <div id="assetdrop"></div>
    <p class="muted small">Name the file exactly as listed (for example road.jpg), or rename it before dropping.</p>`;
  $("#assetdrop", el).appendChild(dropZone("Drop photos here (or click to choose)", async (files) => {
    for (const f of files) await upload(dir, "assets", f);
    toast("Photos added");
    render();
  }));
}

function voiceStep(el, d, dir) {
  const t = d.tts;
  if (!t || !t.chunks?.length) { el.innerHTML = `<p class="muted">Save the script first.</p>`; return; }
  const have = new Set(d.audio);
  el.innerHTML = `
    <ol class="howto">
      <li>Open <a href="https://aistudio.google.com/" target="_blank" rel="noopener">Google AI Studio</a> → speech generation. Model <b>${esc(t.model)}</b>, voice <b>${esc(t.voice ?? "not chosen — see Settings")}</b>.</li>
      <li>Paste the style instructions into the style field.</li>
      <li>For each chunk: copy it, generate, download the audio, and drop it on that chunk's box.</li>
    </ol>
    <h3>Style instructions</h3>${copyBox(t.style)}
    ${Object.keys(t.pronounce).length ? `<h3>Pronunciation</h3><table class="kv">${Object.entries(t.pronounce).map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}</table>` : ""}
    <h3>Chunks (${t.chunks.length}) · ${t.totalWords} words · about ${t.length}</h3>
    <div id="chunks"></div>
    <div class="row" style="margin-top:12px">
      <button class="primary" id="time" ${d.audio.length ? "" : "disabled"}>Time the narration</button>
      <button id="draft">Make a free robot draft voice</button>
      <span class="muted small">${d.draftOnly ? "Using the robot draft — drop the real recordings to replace it." : d.timed ? "Narration timed ✓" : ""}</span>
    </div>`;
  const box = $("#chunks", el);
  for (const c of t.chunks) {
    const base = c.file.replace(/\.wav$/, "");
    const got = [...have].find((a) => a.startsWith(base + "."));
    const div = document.createElement("div");
    div.className = "chunk";
    div.innerHTML = `<div class="chunk-head"><b>Chunk ${c.n}</b><span class="muted small">Scenes ${esc(c.scenes)} · ${c.words} words · ~${c.length}</span></div>${copyBox(c.text)}`;
    div.appendChild(dropZone(got ? `✓ ${esc(got)} — drop again to replace` : `Drop chunk ${c.n}'s audio here (saved as ${base})`, async (files) => {
      const f = files[0];
      const ext = (f.name.match(/\.[^.]+$/)?.[0] ?? ".wav").toLowerCase();
      await upload(dir, "audio", f, base + ext);
      toast(`Chunk ${c.n} saved`);
      const fresh = await api("GET", `/api/video/${dir}`);
      const all = t.chunks.every((k) => fresh.audio.some((a) => a.startsWith(k.file.replace(/\.wav$/, "") + ".")));
      if (all) { toast("All chunks in — timing the narration…", 3000); await step(dir, "transcribe", {}, "Time the narration"); }
      else render();
    }, !!got));
    box.appendChild(div);
  }
  $("#time", el).onclick = () => step(dir, "transcribe", {}, "Time the narration");
  $("#draft", el).onclick = async () => {
    if (d.audio.some((a) => !a.includes("draft")) && !confirm("Real recordings exist. A draft is only used when there are no recordings. Continue?")) return;
    await step(dir, "draft-voice", {}, "Robot draft voice");
    await step(dir, "transcribe", {}, "Time the narration");
  };
}

function videoStep(el, d, dir) {
  const final = d.renders.includes(`${dir}.mp4`);
  el.innerHTML = `
    <div class="callout"><b>Fastest:</b> “Make everything” builds the video, renders it, makes the Shorts and thumbnails, and prepares the YouTube upload sheet in one go (several minutes).</div>
    <div class="row"><button class="primary big" id="all" ${d.timed ? "" : "disabled"}>Make everything</button>${d.timed ? "" : `<span class="muted small">Add and time the voice first (or use the robot draft to preview).</span>`}</div>
    <h3>Or step by step</h3>
    <div class="row">
      <button id="build">1. Build</button>
      <button id="preview" ${d.built ? "" : "disabled"}>2. Watch &amp; edit in Studio</button>
      <button id="render" ${d.built ? "" : "disabled"}>3. Render final video</button>
      <button id="folder">Show files</button>
    </div>
    <p class="muted small">Change words or visuals: ask Claude for the changed scene, paste it in step 1, then Build again. Small visual tweaks can be done right in Studio.</p>
    ${final ? `<h3>Final video</h3><video controls preload="metadata" src="/api/video/${dir}/file?path=${enc(`renders/${dir}.mp4`)}"></video>` : ""}`;
  $("#all", el).onclick = () => step(dir, "make-all", {}, "Make everything");
  $("#build", el).onclick = async () => {
    try {
      const { job } = await api("POST", `/api/video/${dir}/run`, { step: "build", label: "Build the video" });
      const j = await runJob(job);
      if (j.code !== 0 && /edited since the last build/.test(j.log) && confirm("You edited this video in Studio. Rebuilding from the script will replace those edits. Rebuild anyway?")) {
        await step(dir, "build-force", {}, "Rebuild the video");
      }
      render();
    } catch (e) { alert(e.message); }
  };
  $("#preview", el).onclick = async (e) => {
    e.target.disabled = true;
    e.target.textContent = "Starting Studio…";
    try {
      const { url } = await api("POST", `/api/video/${dir}/preview`, {});
      window.open(url, "_blank");
    } catch (er) { alert(er.message); }
    e.target.disabled = false;
    e.target.textContent = "2. Watch & edit in Studio";
  };
  $("#render", el).onclick = () => step(dir, "render", {}, "Render final video");
  $("#folder", el).onclick = () => api("POST", `/api/video/${dir}/open`, { sub: "" });
}

function extrasStep(el, d, dir) {
  el.innerHTML = `
    <div class="row">
      <button id="shorts" ${d.timed ? "" : "disabled"}>Build Shorts</button>
      <button id="rshorts" ${d.shortsSpec.some((s) => s.built) ? "" : "disabled"}>Render Shorts</button>
      <button id="thumbs">Make thumbnails</button>
      <button id="tfolder">Show thumbnails folder</button>
    </div>
    ${d.thumbnails.length ? `<h3>Thumbnails (upload both for YouTube's A/B test)</h3><div class="grid2 thumbs">${d.thumbnails.map((t) => `<img src="/api/video/${dir}/file?path=${enc("thumbnails/" + t)}&t=${Date.now()}" alt="">`).join("")}</div>` : ""}
    ${d.shortsSpec.map((s) => { const f = `${dir}-short-${s.n}.mp4`; return d.renders.includes(f) ? `<h3>Short ${s.n}: ${esc(s.title ?? "")}</h3><video class="vertical" controls preload="metadata" src="/api/video/${dir}/file?path=${enc("renders/" + f)}"></video>` : ""; }).join("")}`;
  $("#shorts", el).onclick = () => step(dir, "shorts", {}, "Build Shorts");
  $("#rshorts", el).onclick = () => step(dir, "render-shorts", {}, "Render Shorts");
  $("#thumbs", el).onclick = () => step(dir, "thumbnail", {}, "Make thumbnails");
  $("#tfolder", el).onclick = () => api("POST", `/api/video/${dir}/open`, { sub: "thumbnails" });
}

async function youtubeStep(el, d, dir) {
  if (!d.renders.includes(`${dir}.mp4`)) { el.innerHTML = `<p class="muted">Render the video first.</p>`; return; }
  el.innerHTML = `<p class="muted">Preparing…</p>`;
  const u = await api("GET", `/api/video/${dir}/upload`);
  el.innerHTML = `
    ${u.warnings.length ? `<div class="callout">${u.warnings.map((w) => `⚠ ${esc(w)}`).join("<br>")}</div>` : ""}
    <ol class="howto">
      <li>Open <a href="https://studio.youtube.com/" target="_blank" rel="noopener">YouTube Studio</a> → <b>Create → Upload videos</b>. <button class="link" id="rfolder">Show the video file</button></li>
      <li>Copy each box below into the matching field.</li>
      ${u.playlist ? `<li>Playlist <b>${esc(u.playlist.title)}</b>: if it doesn't exist yet, create it from the Playlists dropdown in the upload form (description below).</li>` : ""}
    </ol>
    <h3>Title</h3>${copyBox(u.title)}
    ${u.alternates ? `<p class="muted small">Alternates: ${esc(u.alternates)}</p>` : ""}
    <h3>Description</h3>${copyBox(u.description)}
    <h3>Thumbnail</h3><p class="small">Upload <code>thumb-1.png</code>; for an A/B test choose <b>Test &amp; compare</b> and add <code>thumb-2.png</code>. <button class="link" id="tf">Show thumbnails</button></p>
    ${u.playlist ? `<h3>Playlist description (only when creating it)</h3>${copyBox(u.playlist.description ?? "")}` : ""}
    <h3>Tags (under “Show more”)</h3>${copyBox(u.tags)}
    <h3>Settings</h3>
    <table class="kv">${u.settings.map(([k, v]) => `<tr><td>${esc(k)}</td><td>${esc(v)}</td></tr>`).join("")}
      <tr><td>Subtitles</td><td>Video elements → Add subtitles → Upload file → With timing → <code>captions.srt</code> <button class="link" id="cf">Show file</button></td></tr>
      <tr><td>End screen</td><td>${esc(u.endScreen)}</td></tr>
      <tr><td>Length</td><td>${esc(u.length)}</td></tr></table>
    <h3>Pinned comment (post after it's live, then ⋮ → Pin)</h3>${copyBox(u.pinned)}
    ${u.shorts.map((s) => `<h3>Short ${s.n} ${s.rendered ? "" : "(not rendered yet)"}</h3>
      <p class="small">Upload <code>${esc(s.file.split("/").pop())}</code>, set <b>Related video</b> to the main video, and paste:</p>
      ${copyBox(s.title)}${copyBox(s.description)}`).join("")}
    <h3>After uploading</h3>
    <div class="row"><input id="url" class="grow" placeholder="Paste the YouTube link, e.g. https://youtu.be/abc123" /><button class="primary" id="pub">Mark as published</button></div>
    <p class="muted small">This moves the topic to “covered” and saves to GitHub, so Claude stops suggesting it (press Sync in your Claude.ai project).</p>`;
  $("#rfolder", el).onclick = () => api("POST", `/api/video/${dir}/open`, { sub: "renders" });
  $("#tf", el).onclick = () => api("POST", `/api/video/${dir}/open`, { sub: "thumbnails" });
  $("#cf", el).onclick = () => api("POST", `/api/video/${dir}/open`, { sub: "" });
  $("#pub", el).onclick = () => step(dir, "publish", { url: $("#url", el).value }, "Mark as published");
}

render();
