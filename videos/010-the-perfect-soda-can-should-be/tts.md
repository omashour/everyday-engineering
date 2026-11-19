# Voice recording package — Why Isn't a Soda Can as Wide as It Is Tall?

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
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 010`).

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
Scenes S01–S05 · 240 words · about 1:36

```text
Calculus says the soda can that uses the least metal should be as wide as it is tall. Yours is almost twice as tall as it is wide. So is the can wrong, or is the math missing something?

Let's find the best can with one derivative, then see what the textbook answer leaves out.

Here's a standard twelve ounce can. It holds three hundred fifty five milliliters. It's about six point six centimeters wide and twelve point three tall. The body wall is incredibly thin, about a tenth of a millimeter. The lid is more than twice as thick, about point two three millimeters.

To start simple, treat the can as a plain cylinder with the same metal everywhere. Unroll it. You get two circles, the top and bottom, each pi r squared. And a rectangle. Its width is the distance around the can, two pi r, and its height is h. So the metal needed is two pi r squared, plus two pi r h.

But you can't pick r and h freely. The can must hold three hundred fifty five milliliters, which is three hundred fifty five cubic centimeters. The volume of a cylinder is pi r squared h. So once you pick the radius, the height is fixed: h equals V over pi r squared. Put that into the area, and the area depends on r alone. Two pi r squared, plus two V over r.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S09 · 244 words · about 1:38

```text
Now graph it, using the can's width. Make the can very narrow, and it has to be very tall, with lots of side wall. Make it very wide, and the top and bottom get huge. In between, there's a lowest point. About two hundred seventy eight square centimeters of metal, for a can about seven point seven centimeters wide.

Calculus finds that lowest point exactly. The derivative of a function is its slope. At the bottom of a valley, the slope is zero. The derivative of the area, with respect to r, is four pi r minus two V over r squared. Set that to zero, and you get V equals two pi r cubed.

Now remember, V is also pi r squared h. So pi r squared h equals two pi r cubed. Cancel pi r squared from both sides, and h equals two r. The height equals the diameter. For three hundred fifty five milliliters, that's a can about seven point seven centimeters wide and seven point seven centimeters tall.

So how much metal does the real can's width cost? A plain cylinder six point six centimeters wide, holding the same volume, needs about two hundred eighty four square centimeters. Compare that with the minimum of two hundred seventy eight. That's only about two percent more. Near the bottom of a valley, the curve is almost flat. Move a little away from the perfect shape, and you pay very little for it.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S12 · 234 words · about 1:34

```text
Now the part the textbook usually skips. On a real can, the lid is about two point four times as thick as the wall. Let's assume both ends are that thick, so each square centimeter of end costs k times as much as the side. The cost becomes k times two pi r squared, plus two pi r h. Run the same derivative, and the answer changes. h equals two k r. In words, the height divided by the diameter equals k.

With k equal to two point four, the cheapest can flips the other way. It's about five point eight centimeters wide and thirteen point six tall. Taller and thinner than the real can. So now we have two answers. Equal metal everywhere says seven point seven wide. Thick ends say five point eight. The real can, at six point six, sits right between them. On this cost curve, it's only about two percent above the minimum.

So why isn't the real can at either answer? Because metal isn't the only cost. The top of the can narrows into a neck, so the thick lid is only about five point four centimeters across, smaller than the body. That makes the ends cheaper, which pushes the best shape back toward wider. And a can also has to fit a hand, a cup holder, a vending machine, and filling lines built around this exact size.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S13–S14 · 91 words · about 0:36

```text
So here's what the soda can teaches. To optimize, write the cost as a function of one variable, and find where its slope is zero. With equal metal everywhere, the best can is as tall as it is wide. When the ends cost more, the best can gets taller. And near the optimum, the curve is flat, so engineers have room to balance metal against everything else a can has to do.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Calculus says the perfect can is as wide as it is tall #shorts) → save as `audio/short-1.wav`
Its own recording · 93 words · about 0:37. Same voice and style, with a little more energy.

```text
Calculus says the soda can that uses the least metal is exactly as wide as it is tall. Here's the one step that proves it.

Fix the volume, and the metal becomes two pi r squared plus two V over r. Set its derivative to zero, and V equals two pi r cubed. Since V is also pi r squared h, h equals two r. Height equals diameter.

For a soda can, that's seven point seven centimeters each way. Real cans are much taller. The full video shows why that's not a mistake.
```

## Short 2 (Why a soda can is taller than the 'perfect' can #shorts) → save as `audio/short-2.wav`
Its own recording · 82 words · about 0:33. Same voice and style, with a little more energy.

```text
The lid of a soda can is about two point four times as thick as its wall. That changes the perfect shape.

If the ends cost k times as much metal as the side, the same calculus gives height over diameter equals k. With k around two point four, the cheapest can is about five point eight centimeters wide and thirteen point six tall.

The real can, six point six wide, sits between the two answers. The full video does the math.
```
