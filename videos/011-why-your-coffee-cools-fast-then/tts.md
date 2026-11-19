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
Scenes S01–S05 · 222 words · about 1:29

```text
Your coffee doesn't cool at a steady speed. It loses heat fastest while it's hottest, then slower and slower. That one fact tells you when it's drinkable, and whether to add the milk now or later.

Let's work it out with one law of cooling and a little exponential math.

Here's our setup. Fresh coffee at eighty five degrees Celsius, in a room at twenty degrees. What matters isn't the temperature itself. It's the gap between the coffee and the room. Right now, that gap is sixty five degrees.

Newton's law of cooling says the coffee loses heat at a rate proportional to that gap. Twice the gap, twice the cooling speed. In symbols, the rate of change of temperature is minus k times T minus the room temperature. The constant k depends on the mug, the lid, how much coffee there is, and the air around it.

The solution is an exponential. The gap shrinks by the same fraction in every equal stretch of time. T equals room temperature, plus the starting gap times e to the minus k t. For our mug, let's assume k is about point zero seven per minute. That means the gap halves about every ten minutes. So e to the minus k t is the same as one half, to the power t over ten.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S10 · 274 words · about 1:50

```text
Watch the gap. It starts at sixty five degrees. After ten minutes, it's thirty two and a half. After twenty, about sixteen. After thirty, about eight. So the coffee goes from eighty five, to fifty two and a half, to about thirty six, to about twenty eight. It drops thirty two and a half degrees in the first ten minutes, and only about eight in the third ten. Fast, then slow.

Here's the whole curve. It falls steeply at first, fifty two and a half at ten minutes, then levels off, twenty eight at thirty minutes, creeping toward the room temperature line. In this model it never quite reaches it. Every ten minutes, the remaining gap is cut in half.

Here's why it slows down. The cooling speed is k times the gap. At the start, the gap is sixty five, so the coffee drops about four and a half degrees per minute. Ten minutes later, the gap is half as big, and so is the speed: about two point three degrees per minute. The hotter the coffee, the faster it cools.

So when can you drink it? Say you like coffee at sixty degrees. That's a gap of forty. So we need sixty five times one half, to the power t over ten, to equal forty. Take logs, and t equals ten times log base two of sixty five over forty. About seven minutes.

Now the milk puzzle. You'll drink your coffee in ten minutes, and your milk is cold from the fridge. Do you pour it in now, or just before you drink? Does it even matter? Newton's law says it does.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S11–S14 · 256 words · about 1:42

```text
First, add the milk now. Assume the milk is a fifth of the drink, at five degrees, and the mix is a simple weighted average. Point eight times eighty five, plus point two times five, gives sixty nine degrees. That's a gap of forty nine. After ten minutes, the gap halves to twenty four and a half. So you drink it at forty four and a half degrees.

Now add it later. The black coffee cools first. Its gap halves from sixty five to thirty two and a half, so it's at fifty two and a half. Then the cold milk goes in. Point eight times fifty two and a half, plus point two times five, gives forty three degrees. Adding the milk now leaves your coffee about one and a half degrees warmer.

Here's why. Adding the cold milk now shrinks the gap right away, so the coffee loses heat more slowly for the whole ten minutes. Black coffee stays hotter, so it loses heat faster, and then the cold milk knocks it down. The difference is small, about one and a half degrees, but it's real. And in this model, if the milk were at room temperature, the timing wouldn't matter at all.

The same curve shows up all over engineering. A hot engine or a computer chip cooling after it shuts down. A house losing heat overnight with the heating off, roughly. And a capacitor discharging in an electric circuit. Wherever the rate depends on the remaining gap, you get the same exponential.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S15–S16 · 81 words · about 0:32

```text
Real coffee follows Newton's law only approximately. Evaporation adds extra cooling while it's hottest, and a lid slows everything down. But the main idea holds. The cooling speed is proportional to the gap. So the gap shrinks by the same fraction in every equal stretch of time: fast at first, then slow. And for hotter coffee later, add the cold milk now.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Why your coffee cools fast, then slow #shorts) → save as `audio/short-1.wav`
Its own recording · 90 words · about 0:36. Same voice and style, with a little more energy.

```text
Your coffee doesn't cool at a steady speed. Its cooling speed depends on the gap to room temperature.

Start at eighty five degrees in a twenty degree room: a gap of sixty five. If the gap halves every ten minutes, the coffee is at fifty two and a half after ten minutes, about thirty six after twenty, and about twenty eight after thirty.

That's thirty two and a half degrees lost in the first ten minutes, and only about eight in the third ten. The full video shows the math.
```

## Short 2 (Milk now or later? Newton's law has an answer #shorts) → save as `audio/short-2.wav`
Its own recording · 80 words · about 0:32. Same voice and style, with a little more energy.

```text
Want hotter coffee in ten minutes? Add the cold milk now, not later. Newton's law of cooling explains why.

Coffee loses heat faster the bigger its gap to the room. Adding cold milk now shrinks the gap right away, so it cools more slowly. Wait, and the hot black coffee cools faster. Then the cold milk knocks it down anyway.

In our example, that's about one and a half degrees warmer. Small, but real. The full video does the math.
```
