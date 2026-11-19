# Voice recording package — Why Your Coffee Cools Fast, Then Slow

Generated from scenes.yaml.

## Settings
- **Model:** gemini-3.8-flash-tts
- **Voice:** Cruz
- **Language:** English
- **Chunks:** 4 (about 280 words max each, split at scene boundaries)
- **Shorts:** 2 separate recordings (short-1.wav …)

## How to record
1. Open the Gemini speech generation page in Google AI Studio and pick the model and voice above.
2. Paste the **Style instructions** below into the style / instructions field (not into the text).
3. For each chunk: paste the chunk text, generate, listen once, download the WAV and save it with the file name shown, in the video's `audio` folder (or drop it on the app).
4. Check the pronunciation list while listening; regenerate any chunk that mispronounces a term.
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 011`).

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

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S05 · 235 words · about 1:34

```text
Your coffee doesn't cool at a steady speed. It cools fastest while it's hottest, then slower and slower. A simple model can estimate when it reaches the temperature you like, and whether to add the milk now or later.

Let's work it out with one law of cooling and a little exponential math.

Here's our setup. Fresh coffee at eighty five degrees Celsius, in a room that stays at twenty degrees. What matters isn't the temperature itself. It's the gap between the coffee and the room. Right now, that gap is sixty five degrees.

Newton's law of cooling, in its simplest form, says the coffee's temperature changes at a rate proportional to that gap. Twice the gap, twice the cooling speed. The rate of temperature change is minus k times the difference between the coffee temperature and room temperature. Here, k is an effective cooling constant. It depends on the cup, the lid, the amount of liquid, and the surrounding air.

The solution is an exponential: the gap shrinks by the same fraction in every equal stretch of time. T equals room temperature, plus the starting gap times e to the minus k t. For this example, let's assume the temperature gap halves every ten minutes. That corresponds to a k of about point zero seven per minute. So e to the minus k t is exactly one half, to the power t over ten.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S09 · 258 words · about 1:43

```text
Watch the gap. It starts at sixty five degrees. After ten minutes, it's thirty two and a half. After twenty, about sixteen. After thirty, about eight. So the coffee goes from eighty five, to fifty two and a half, to about thirty six, to about twenty eight. It drops thirty two and a half degrees in the first ten minutes, and only about eight in the third ten. Fast, then slow.

Here's the same story as a curve. The dashed line is the room. Look at the vertical gap between the curve and that line. At every ten-minute mark, it's half what it was ten minutes earlier. The curve keeps getting closer to the room line, but in the model, it never quite reaches it.

That's why the curve flattens. The cooling speed at any moment is k times the gap. At the very start, the gap is sixty five, so the coffee is cooling at about four and a half degrees per minute. At the ten-minute mark, the gap is half as big, and so is the speed: about two point three degrees per minute. Smaller gap, gentler slope.

So when does it reach a temperature you like? Say you want your coffee to cool to sixty degrees Celsius. That's a gap of forty. So we need sixty five times one half, to the power t over ten, to equal forty. Take logs, and t equals ten times log base two of sixty five over forty. About seven minutes, for this mug and these conditions.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S12 · 209 words · about 1:24

```text
Now the milk puzzle. You'll drink in ten minutes. Do you pour in cold milk now, or just before you drink? To compare fairly, we'll use the same coffee and the same milk both times. The milk stays at five degrees until it's poured, and it makes up one fifth of the final drink. We'll assume instant mixing, with the mixed temperature as a simple weighted average. And we'll assume both cups follow the same ten-minute cooling half-life.

First, milk now. Point eight times eighty five, plus point two times five, gives sixty nine degrees. That's a gap of forty nine. After ten minutes, the gap halves to twenty four and a half. So at the ten-minute mark, this cup is at forty four and a half degrees.

Now milk later. The black coffee cools first. Its gap halves from sixty five to thirty two and a half, so at ten minutes it's at fifty two and a half. Then the cold milk goes in. Point eight times fifty two and a half, plus point two times five, gives forty three degrees. Compared at the same moment, right after the second cup gets its milk, the early-milk cup is one and a half degrees warmer.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S13–S16 · 247 words · about 1:39

```text
Here's the picture. The blue cup drops at minute zero, when the milk goes in. The red cup drops at minute ten. Early milk reduces the temperature gap right away, so in this model, that cup's temperature falls more slowly during the wait. In this example, the model predicts a difference of one and a half degrees. In practice, adding milk changes the amount and makeup of the liquid, so the two cups can cool at different rates. And with the shared half-life, if the milk started at room temperature, both cups would end at forty six degrees. Timing wouldn't matter.

The same simple model shows up in engineering. A computer chip cooling after it shuts down behaves roughly this way, over a useful stretch of time. And a capacitor discharging through a fixed resistor follows it almost exactly. Wherever the rate of change is proportional to the remaining gap, with a constant of proportionality, you get the same exponential.

Real coffee follows this model only approximately. Evaporation can add to the cooling of an open mug, and a lid generally slows cooling, partly by limiting evaporation. But in this model, each ten-minute stretch cuts the remaining temperature gap in half: fast at first, then slow. And in our example, adding the cold milk first kept the coffee a little warmer at the ten-minute mark.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Why your coffee cools fast, then slow #shorts) → save as `audio/short-1.wav`
Its own recording · 102 words · about 0:41. Same voice and style, with a little more energy.

```text
Your coffee doesn't cool at a steady speed. In a simple model, its cooling speed depends on the gap to room temperature.

Start at eighty five degrees Celsius in a twenty degree room: a gap of sixty five. Assume, for this example, that the gap halves every ten minutes. Then the coffee is at fifty two and a half after ten minutes, about thirty six after twenty, and about twenty eight after thirty.

The gap halves every ten minutes: thirty two and a half degrees lost in the first ten, only about eight in the third. The full video shows the math.
```

## Short 2 (Milk now or later? Newton's law has an answer #shorts) → save as `audio/short-2.wav`
Its own recording · 85 words · about 0:34. Same voice and style, with a little more energy.

```text
Want warmer coffee in ten minutes? Add the cold milk now, not later.

If both cups have the same cooling half-life, adding cold milk now shrinks the gap to the room right away, so the coffee's temperature falls more slowly during the wait. Add it later, and the black coffee cools faster, then the cold milk drops it further.

In our example, it's forty four and a half degrees Celsius versus forty three. That's what the model predicts. The full video does the math.
```
