# scenes.yaml: format, writing rules, example

One file describes the whole video. The local build turns it into an editable HyperFrames project, lines every visual up with the spoken words, and renders it. Narration and visuals live together, scene by scene.

## Format

```yaml
video:
  id: "NNN"
  topic: T05                 # backlog id, or null
  title: "…"
  style: "B hook + A body"   # what the user chose
  playlist: math-for-engineers   # see channel.md
  phase: math                # math | physics | chemistry | eng-fundamentals | industrial
  series: null               # e.g. "Statics Problems" for numbered problem series
  voice_note: ""             # optional extra delivery note for this video
  pronounce: {}              # e.g. {Torricelli: tor-ih-CHEL-ee}

scenes:
  - id: S01                  # S01, S02… unique, letters+digits
    component: photo-overlay # from components.md
    chapter: "The hook"      # optional; becomes a YouTube chapter (need ≥3, first is 0:00)
    say: >-                  # narration for this scene, exactly as it will be spoken
      …
    params: { … }            # component params; cues are phrases copied from `say`
```

## Writing rules

**Length and pacing**
- Long video: 6–12 minutes = about 900–1,800 words of `say` in total (150 words/minute).
- 12–30 scenes. One idea per scene; 15–60 s per scene (40–150 words). Split longer ideas.
- First scene = the hook: under 40 words (~15 s), on a real-world visual (style B `photo-overlay`, or `big-fact`). No "hi guys", no channel intro, no "in this video".
- Second scene is usually a short `title-card` (one sentence of narration).
- Last scene is always `end-card`: a short sign-off, e.g. "Thanks for watching. If you like seeing the math hiding in everyday things, subscribe." **Never mention the next video or any upcoming topic** in `say`, `line`, metadata or the pinned comment: no "next time…", no "in the next video…", no teaser. The user chooses topics one at a time.
- Revisit the hook's promise in the last third (pay it off).

**Narration (`say`) is speech, not text**
- Math in words: "v squared over two a", "e to the minus lambda t", "one over r squared".
- Numbers as you'd say them where it matters: "fifty five meters", "four point seven six degrees".
- Short sentences. One fact per sentence. Plain words; define each term the first time.
- No stage directions, emojis, brackets or markdown in `say`.
- Every on-screen number must match what is said.

**Visual sync (`cue`)**
- A cue is a 1–4 word phrase copied **exactly** (same words, same order) from that scene's `say`. The element appears the moment it's spoken.
- Cue the key items (each equation line, each force, each overlay). Uncued items are spread evenly.
- Don't reuse a phrase that occurs twice in the scene; pick a distinctive one.

**Visual rules**
- On-screen text is short: headings ≤ 7 words, bullets ≤ 8 words. Narration carries the detail.
- Equations: one step per line, 2–5 lines per scene. Use `mark` for the key line, `circle` for the surprising bit, `box` for the result, `note` for a 2–3 word red aside.
- Diagrams: coordinates in the `view` box (default 1000×600, origin top-left). Keep a 40-unit margin. Labels ≥ 3 words go in `text` items, not on arrows.
- Photos (`photo-overlay`, `image`): one per scene, listed in assets-needed.md with a credit line. Overlay coordinates are % of the frame; place them where the object will be in the photo you describe.
- Style F videos follow: problem-card → (pause-try) → equation-steps with `label: "Step 1"`… → (beam/diagram) → answer-box with `check` → practice problem-card ("Practice problem", answer goes in the pinned comment).
- Vary components: avoid more than 3 scenes in a row with the same component.

**Accuracy**
- Work every calculation; round sensibly; say the assumptions on screen (small heading text or table header).
- Only real, checkable facts for stories (dates, names). If unsure, leave it out.

## Example (abridged from video 001)

```yaml
video:
  id: "001"
  topic: T01
  title: "Driving Twice as Fast Is 4 Times More Dangerous"
  style: "B hook + A body"
  playlist: math-for-engineers

scenes:
  - id: S01
    component: photo-overlay
    chapter: "14 m becomes 55 m"
    say: >-
      Double your speed and your braking distance doesn't double. It quadruples.
      Fourteen meters becomes fifty five. Here's the one equation behind it,
      and why every road engineer knows it by heart.
    params:
      src: road.jpg
      credit: "Photo: Jane Doe, CC BY 4.0"
      title: "2× speed → 4× braking distance"
      overlays:
        - {type: measure, from: [12, 74], to: [24, 74], label: "≈ 14 m at 50 km/h", cue: "fourteen meters"}
        - {type: measure, from: [12, 88], to: [61, 88], label: "≈ 55 m at 100 km/h", cue: "fifty five"}

  - id: S02
    component: title-card
    say: Let's work it out with nothing more than algebra.
    params: {kicker: "Everyday Engineering · Algebra", title: "Why Driving Twice as Fast Is 4× More Dangerous"}

  - id: S03
    component: equation-steps
    chapter: "The braking equation"
    say: >-
      When you hit the brakes, the car slows down at a roughly constant rate. Call that
      deceleration a. … solving it for the distance gives d equals v squared over two a.
    params:
      heading: "The braking equation"
      figure:
        view: [1000, 520]
        items:
          - {type: ground, from: [20, 330], to: [980, 330]}
          - {type: rect, pos: [40, 200], size: [300, 120], fill: blue, label: "car", cue: "car slows down"}
          - {type: arrow, from: [330, 120], to: [80, 120], label: "slowing $a$", color: red, cue: "deceleration"}
      lines:
        - {tex: "0 = v^2 - 2ad", cue: "ends at zero"}
        - {tex: "d = \\dfrac{v^2}{2a}", mark: true, box: true, note: "speed is squared!", cue: "d equals"}

  - id: S05
    component: graph
    chapter: "The parabola"
    say: >-
      Here's the whole picture. Braking distance grows along a parabola. …
    params:
      x_range: [0, 130]
      y_range: [0, 100]
      x_label: "speed (km/h)"
      y_label: "braking distance (m)"
      functions: [{expr: "(x/3.6)^2/14", label: "$d = v^2/2a$", cue: "parabola"}]
      points: [{x: 100, y: 55.1, label: "55 m", cue: "whole picture"}]

  - id: S09
    component: end-card
    say: Thanks for watching. If you like seeing the math hiding in everyday things, subscribe.
    params: {line: "Thanks for watching"}
```

## thumbnail.yaml

```yaml
variants:                     # 2 variants for YouTube's A/B test
  - template: equation        # white whiteboard look: big text + circled equation (+ optional red handwritten note)
    text: "2× SPEED = 4× DISTANCE"   # ≤ 5 words, ALL CAPS ok
    highlight: ["4×"]          # words that get the yellow marker
    tex: "d = \\frac{v^2}{2a}"
    note: "it's squared!"
  - template: photo           # full photo, dark gradient left, big white text
    image: road.jpg            # file in assets/
    text: "Twice as Fast, 4× the Distance"
    highlight: ["4×"]
  # template: split = photo left, text + circled equation right (image + tex)
```

## shorts.yaml

```yaml
shorts:                        # 30–60 s each; scenes play back to back with their narration
  - title: "Why 2× speed means 4× braking distance #shorts"
    hook: "2× speed = 4× braking distance?!"   # banner pinned at the top, ≤ 6 words
    scenes: [S01, S04, S08]     # FIRST scene must be the hook; scenes must make sense alone; total ≤ ~55 s of narration
    end: "Full video on the channel"
    description: "Why does doubling your speed quadruple your braking distance? One line of algebra.\n\nFull video: [paste the main video's link]"   # optional; hashtags are added automatically
```

Shorts rules: open on the hook scene (a Short has about 1–2 seconds to stop the scroll), end on the payoff (the key result), and leave a reason to watch the full video. Usually: hook scene + the scene with the key result + the "remember this" scene.

## Quality checklist (run through before delivering)
- [ ] Hook ≤ 40 words, real-world visual, surprising number or question
- [ ] Total words in range; no scene over ~150 words
- [ ] Every cue is copied exactly from its scene's `say`
- [ ] Every number on screen matches the narration and is correct
- [ ] Components and params exist in components.md; required params present
- [ ] ≥ 3 chapters, first on S01
- [ ] Last scene is end-card; Shorts scenes stand alone
- [ ] assets-needed.md lists every photo used (or "None")
