# Voice recording package — The 63-Centimeter Rule Behind Comfortable Stairs

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
Scenes S01–S05 · 256 words · about 1:42

```text
Some stairs you climb without thinking. Others feel awkward, too steep or too stretched out. Much of the difference comes down to two measurements, and one rule of thumb designers have used for over three hundred years.

Let's work through that rule, with a tape measure and a little algebra.

Every step has two measurements. The rise is the vertical distance from one step surface to the next. The tread depth, on a straight stair, is the horizontal distance from the front edge of one step to the front edge of the next. We'll call them R and T. On a typical comfortable home stair, the rise is about seventeen and a half centimeters, and the tread depth is about twenty eight. That's about seven inches up and eleven inches deep.

Start on flat ground. When you walk at an easy pace, each step covers some distance, from one footprint to the next. That distance varies from person to person, and with how fast you walk. But a stair designer needs one number to aim for. In this video, we'll use sixty three centimeters, about twenty five inches.

Here's the rule of thumb. Twice the rise, plus the tread depth, should land near that target. Two R plus T equals about sixty three centimeters. The two is what makes it a trade-off. Keep the target fixed, and add one centimeter to the rise. Then the tread depth has to shrink by two centimeters. Taller steps come with shallower treads. Lower steps come with deeper ones.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S09 · 197 words · about 1:19

```text
This rule is old. In the late sixteen hundreds, the French architect François Blondel wrote it down in his course on architecture. His target was two French feet, about sixty five centimeters. Today, designers treat it as a starting point, not a law of nature. For our examples, we'll use sixty three, because real walking steps vary from person to person.

Let's test it on our comfortable stair. The rise is seventeen and a half centimeters, so two rises make thirty five. Add the tread depth of twenty eight. Thirty five plus twenty eight is sixty three. Right on our target.

Now look at these garden steps. Each rise is only twelve centimeters, but each tread is forty five deep. Two R plus T comes to sixty nine, well above our target. Each step reaches farther forward than an easy stride, so you may find yourself changing your pace to match the steps.

Now the opposite. On this steep, narrow stair, the rise is twenty one centimeters, and the tread depth is just fifteen. Two R plus T is fifty seven, below our target. And a fifteen centimeter tread leaves much less room to place your foot.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S11 · 180 words · about 1:12

```text
Let's put every possible stair on one graph. Across is the rise, and up is the tread depth. For our target of sixty three, every stair sits on this straight line: the tread depth equals sixty three minus two times the rise. The slope of minus two is the trade-off we just saw. One more centimeter of rise costs two centimeters of tread. Our comfortable stair sits right on the line. The garden steps sit above it. The steep stair sits below it.

But the line hides a second choice: the pitch, the angle of the stair. Two stairs can have the same Blondel value and very different steepness. The tangent of the pitch is the rise over the tread depth. A rise of fifteen with a tread of thirty three gives sixty three, and climbs at about twenty four degrees. A rise of twenty with a tread of twenty three also gives sixty three, but climbs at about forty one degrees. Same score, very different stair. So the rule alone can't tell you how steep a stair is.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S12–S14 · 276 words · about 1:50

```text
Building codes set limits too. In the United States, the usual limits come from model codes. Each state or city adopts them, sometimes with changes. The residential model code typically allows a rise of at most seven and three quarter inches, and a tread depth of at least ten inches. The general building code, used for most other buildings, allows at most seven inches up, and needs at least eleven inches deep. In England, the official guidance, Approved Document K, does use the formula directly. Twice the rise plus the going, their word for tread depth, should be between five hundred fifty and seven hundred millimeters. And a private stair in a home can be no steeper than forty two degrees.

There's one more rule, and the reason behind it has been measured in a lab. In a twenty twenty study, researchers built a test staircase and made one riser just ten millimeters higher than the rest. Going up, people's feet cleared that step by about nine millimeters less. Less clearance can increase the risk of catching a toe and tripping. That's why the American residential model code limits the difference between the tallest and shortest riser in one flight to three eighths of an inch. That's about nine and a half millimeters.

Now let's design a straight staircase. The height from floor to floor is two hundred seventy centimeters. We'd like a rise near seventeen and a half. Two seventy divided by seventeen and a half is about fifteen point four. We can't build part of a step, so we round to fifteen risers. Now every rise is two seventy over fifteen: exactly eighteen centimeters.
```

## Chunk 5 → save as `audio/narration-05.wav`
Scenes S15–S17 · 220 words · about 1:28

```text
The rule of thumb gives the tread depth. Two times eighteen is thirty six. Sixty three minus thirty six leaves twenty seven centimeters. Fifteen risers need only fourteen treads, because the last step is the upper floor itself. Fourteen times twenty seven is three hundred seventy eight centimeters. So the flight itself covers a horizontal run of about three point eight meters, at a pitch of about thirty four degrees. Now check two residential model code dimensions. Eighteen centimeters is seven point one inches, under seven and three quarters. Twenty seven centimeters is ten point six inches, more than ten. Both pass. A complete design still has to account for landings, headroom and handrails.

So why do some stairs feel easy, while others feel awkward? Two measurements tell much of the story. Twice the rise plus the tread depth gives a quick check, and our target was sixty three centimeters. Every extra centimeter of rise costs two centimeters of tread. The same score can still mean a gentle stair or a steep one, so check the pitch too. And keep every step the same. Next time a staircase feels strange, take out a tape measure and see what the numbers say.

If you enjoyed this one, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (The 63-centimeter rule behind comfortable stairs #shorts) → save as `audio/short-1.wav`
Its own recording · 111 words · about 0:44. Same voice and style, with a little more energy.

```text
Why do some steps feel odd? Measure two things. The rise is how far up each step goes. The tread depth is how far forward. Designers check a rule of thumb: twice the rise plus the tread depth, aiming for about sixty three centimeters.

That two is a trade-off. Add one centimeter of rise, and the tread loses two. A comfortable home stair, seventeen and a half up and twenty eight deep, scores sixty three. These garden steps, twelve up and forty five deep, score sixty nine. Each step reaches farther than an easy stride.

So you may change your pace. The full video works through a whole staircase design.
```

## Short 2 (One stair 10 mm too tall changes how you step #shorts) → save as `audio/short-2.wav`
Its own recording · 102 words · about 0:41. Same voice and style, with a little more energy.

```text
Make one stair just ten millimeters taller, and people's feet clear it by about nine millimeters less. That's what researchers measured on a test staircase in a twenty twenty lab study.

People didn't adjust their steps for the taller riser. With less clearance, a toe is more likely to catch the edge, and that can increase the risk of a trip.

That's why the American residential model code limits the difference between the tallest and shortest riser in a flight to three eighths of an inch. That's about nine and a half millimeters. The full video shows the math of stair design.
```
