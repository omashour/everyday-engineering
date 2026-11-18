# Voice recording package — The One Formula Behind Every Comfortable Staircase

Generated from scenes.yaml.

## Settings
- **Model:** gemini-3.8-flash-tts
- **Voice:** Cruz
- **Language:** English
- **Chunks:** 5 (about 280 words max each, split at scene boundaries)
- **Shorts:** 2 separate recordings (short-1.wav …)

## How to record
1. Open the Gemini speech generation page in Google AI Studio and pick the model and voice above.
2. Paste the **Style instructions** below into the style / instructions field (not into the text).
3. For each chunk: paste the chunk text, generate, listen once, download the WAV and save it with the file name shown, in the video's `audio` folder (or drop it on the app).
4. Check the pronunciation list while listening; regenerate any chunk that mispronounces a term.
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 008`).

If a chunk is too long for the tool, split it at a paragraph break and save the parts as e.g. narration-02a.wav and narration-02b.wav (files are joined in name order).

## Style instructions
```
A clear, warm, confident engineering teacher talking to one curious student. Energetic and intriguing in the opening hook, then calm and steady for explanations. Natural pace (about 150 words per minute), short pauses between sentences and a longer pause between paragraphs. Emphasize the surprising number or result in each section. Never rush through math.
```

## Pronunciation
| Term | Say it like |
|---|---|
| Torricelli | tor-ih-CHEL-ee |
| clothoid | KLOTH-oyd |
| Euler | OY-ler |
| Bernoulli | ber-NOO-lee |
| Laplace | la-PLAHSS |
| Blondel | blon-DELL |

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S05 · 251 words · about 1:40

```text
Some stairs you climb without thinking. Others make you stumble, stretch or shuffle. The difference isn't luck. It's one simple formula, written down over three hundred years ago, and it's hidden in the stairs you use every day.

Let's find that formula, with nothing but a tape measure and a little algebra.

Every step has two measurements. The rise is how high you lift your foot, from one step to the next. The tread is how deep the step is, the flat part you stand on. We'll call them R and T. On a typical comfortable home stair, the rise is about seventeen and a half centimeters, and the tread is about twenty eight. That's about seven inches up and eleven inches deep.

Start on flat ground. When you walk at an easy pace, each step covers a fairly steady distance, from one footprint to the next. Stair designers use about sixty three centimeters, or twenty five inches, for that easy step. Your legs like that rhythm, and they like to repeat it.

On a stair, every step does two things at once. Your foot moves forward by the tread, and your body lifts by the rise. Lifting is much harder than moving forward. The rule of thumb is that each centimeter you climb counts like two centimeters on flat ground. So the effort of one step on a stair is two R plus T. For the stair to feel natural, that should match your easy step: about sixty three centimeters.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S09 · 234 words · about 1:34

```text
This rule is old. In the late sixteen hundreds, the French architect François Blondel wrote it down in his course on architecture. He set twice the rise plus the tread equal to two French feet, about sixty five centimeters. Today it's called Blondel's formula, and stair designers still use it, usually aiming for about sixty three to sixty five centimeters.

Let's test it on our comfortable stair. The rise is seventeen and a half centimeters, so two rises make thirty five. Add the tread of twenty eight. Thirty five plus twenty eight is sixty three. Exactly one easy step. That's why you can climb this stair without thinking about it.

Now look at these garden steps. Each rise is only twelve centimeters, but each tread is forty five. Two R plus T comes to sixty nine. That's longer than one easy step, but much shorter than two. So you either stretch on every step, or you squeeze in a little half step. That awkward shuffle is the formula telling you something is off.

Now the opposite. On this steep, narrow stair, the rise is twenty one centimeters, and the tread is just fifteen. Two R plus T is fifty seven. Each step is too short for your stride, and the tread is shorter than your foot. Your heel hangs off the edge, so you climb on your toes, and many people come down sideways.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S11 · 167 words · about 1:07

```text
Let's put every possible stair on one graph. Across is the rise, and up is the tread. Every stair that fits Blondel's formula sits on this straight line: the tread equals sixty three minus two times the rise. Designers accept a narrow band around it, about sixty to sixty five centimeters. Our comfortable stair sits right on the line. The garden steps sit above the band. The steep stair sits below it.

But the line hides a second choice: the angle. Every stair on it gives a comfortable stride, but not the same steepness. The tangent of the angle is the rise over the tread. A rise of fifteen with a tread of thirty three gives sixty three, and climbs at about twenty four degrees. A rise of twenty with a tread of twenty three also gives sixty three, but climbs at about forty one degrees. Same stride, very different stair. Tight spaces push designers toward the steep end. Grand public stairs sit at the gentle end.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S12–S14 · 266 words · about 1:46

```text
Building codes put limits on both numbers. In an American home, the rise can be at most seven and three quarter inches, and the tread at least ten. Put those extremes into the formula. Two times seven and three quarters, plus ten, is twenty five and a half inches, about sixty five centimeters: the top of Blondel's band. In American public buildings, the limits are seven inches up and eleven deep. That's twenty five inches, about sixty three and a half centimeters. In the UK, homes allow a rise of at most two hundred twenty millimeters and a going, their word for tread, of at least two hundred twenty. And the rules write the formula in directly: twice the rise plus the going must be between five hundred fifty and seven hundred millimeters.

There's one more rule, and it may matter most. In an American home, the tallest and shortest riser in one flight can differ by no more than three eighths of an inch. That's about one centimeter. Why so strict? After the first few steps, you stop looking. Your legs just repeat the same motion. One step that's a centimeter off breaks that rhythm, and that's when your foot catches the edge.

Now let's design a staircase. The height from floor to floor is two hundred seventy centimeters. We'd like a rise near seventeen and a half. Two seventy divided by seventeen and a half is about fifteen point four. We can't build part of a step, so we round to fifteen risers. Now every rise is two seventy over fifteen: exactly eighteen centimeters.
```

## Chunk 5 → save as `audio/narration-05.wav`
Scenes S15–S17 · 169 words · about 1:08

```text
Blondel's formula gives the tread. Two times eighteen is thirty six. Sixty three minus thirty six leaves twenty seven centimeters. Fifteen risers need only fourteen treads, because the last step is the upper floor itself. Fourteen times twenty seven is three hundred seventy eight centimeters, so the stair needs about three point eight meters of floor. Code check: eighteen centimeters is seven point one inches, and twenty seven is ten point six. Both pass. And the angle is about thirty four degrees.

So that's why some stairs feel perfect, and others make you stumble. A good stair matches your stride. Twice the rise plus the tread should be about sixty three centimeters. Too long, and you shuffle. Too short, and you climb on your toes. And every step must match the one before. Next time a staircase feels wrong, take out a tape measure. The formula will tell you why.

If you enjoyed this one, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Why some stairs make you shuffle #shorts) → save as `audio/short-1.wav`
Its own recording · 97 words · about 0:39. Same voice and style, with a little more energy.

```text
Ever climbed steps that made you shuffle? Blame one formula. Every step moves you forward by the tread and lifts you by the rise. Lifting counts about double. So the stride of one step is two times the rise, plus the tread.

On a comfortable stair, that's two times seventeen and a half, plus twenty eight. Sixty three centimeters: one easy step. These garden steps, twelve up and forty five deep, give sixty nine. Too long for one step, too short for two.

So your legs shuffle. The full video shows how to design a perfect staircase.
```

## Short 2 (1 cm is enough to trip you on the stairs #shorts) → save as `audio/short-2.wav`
Its own recording · 89 words · about 0:36. Same voice and style, with a little more energy.

```text
One centimeter is enough to trip you on the stairs. After the first few steps, you stop looking. Your legs just repeat the same motion, again and again.

That's why American building codes are so strict. In a home, the tallest and shortest riser in a flight can differ by just three eighths of an inch. About one centimeter.

One odd step breaks the rhythm, and your foot catches the edge. If a staircase feels wrong, measure every step. The full video shows the math behind a perfect stair.
```
