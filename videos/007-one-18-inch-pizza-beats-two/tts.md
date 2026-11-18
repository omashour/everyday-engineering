# Voice recording package — One 18-Inch Pizza Beats Two 12-Inch Pizzas

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
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 007`).

If a chunk is too long for the tool, split it at a paragraph break and save the parts as e.g. narration-02a.wav and narration-02b.wav (files are joined in name order).

## Style instructions
```
A clear, warm, confident engineering teacher talking to one curious student. Energetic and intriguing in the opening hook, then calm and steady for explanations. Natural pace (about 150 words per minute), short pauses between sentences and a longer pause between paragraphs. Emphasize the surprising number or result in each section. Never rush through math. Playful and confident in the hook; the pizza is fun, the math is serious.
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
Scenes S01–S06 · 248 words · about 1:39

```text
Two twelve-inch pizzas or one eighteen-inch pizza? Which gives you more pizza? The eighteen-inch wins. It has exactly twelve and a half percent more surface area. Engineers use the same geometry for the cross-sections of pipes, wires and bolts.

Let's settle it with one formula you already know.

Pizza sizes are diameters. A twelve-inch pizza is twelve inches straight across, through the center. But how much pizza you get depends on the area: the whole pizza as seen from above, including the crust. And area does not grow the way the diameter does.

The area of a circle is pi r squared, where r is the radius, half the diameter. A twelve-inch pizza has a radius of six inches. Six squared is thirty six, and thirty six times pi is about one hundred thirteen square inches. Two of those pizzas give you seventy two pi, about two hundred twenty six square inches.

Now the big one. An eighteen-inch pizza has a radius of nine inches. Nine squared is eighty one, and eighty one times pi is about two hundred fifty four square inches. The two small pizzas together had two hundred twenty six. The single pizza wins by nine pi, about twenty eight square inches.

Divide one by the other and pi cancels out. Eighty one over seventy two is exactly one point one two five. That's twelve and a half percent more surface area, in one box instead of two.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S07–S09 · 229 words · about 1:32

```text
Here's the real reason. Write the area with the diameter d instead. It's pi d squared over four. The diameter is squared. An eighteen-inch pizza is one and a half times as wide as a twelve-inch. But one and a half squared is two point two five. So one eighteen-inch pizza has two and a quarter times the area of one twelve-inch pizza, not one and a half times. To see how much pizza you're getting, compare the areas.

Here's the whole picture. This curve is pizza area against diameter. It bends upward because of that square. A twelve-inch pizza sits here, at one hundred thirteen. The dashed line is two twelve-inch pizzas, at two hundred twenty six. The curve crosses it just under seventeen inches. Every pizza bigger than that beats the pair, and the eighteen-inch sits clearly above it, at two hundred fifty four and a half.

Where exactly is that crossing? Set one pizza's area equal to two twelve-inch pizzas. The pi cancels, and you get d squared equals two hundred eighty eight. So d is twelve times the square root of two. The break-even point is about sixteen point nine seven inches. A seventeen-inch pizza is just barely larger than the pair. A sixteen-inch pizza, at about two hundred one square inches, still loses.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S12 · 237 words · about 1:35

```text
Here are common sizes. A ten-inch pizza is about seventy nine square inches. A twelve-inch is one hundred thirteen. A fourteen-inch has almost twice the area of the ten-inch. Just four more inches across, and nearly double the surface area. A sixteen-inch has more than two and a half times the area of the ten-inch. And an eighteen-inch has over three times the area of the ten-inch. For pizzas of similar thickness and toppings, area is a fair estimate of how much food you get.

This is also how to compare prices. Divide the price by the area. Say a twelve-inch costs twelve dollars and an eighteen-inch costs twenty. Two small ones cost twenty four dollars for two hundred twenty six square inches. That's about eleven cents per square inch. The big one costs about eight cents. At these prices, the eighteen-inch is the better deal per square inch.

The two small pizzas do win one thing: outer edge. The edge of a pizza is its circumference, pi times d. That grows in a straight line, not with the square. The two twelve-inch pizzas have about seventy five inches of outer edge. The eighteen-inch has about fifty six and a half. So the pair gives you a third more outer edge. How much actual crust that means depends on the rim's width and thickness.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S13–S15 · 255 words · about 1:42

```text
Now swap the pizza for a pipe. Water flows through the circle inside it, so what matters is the inside diameter. One pipe with a two-inch inside diameter has twice the opening area of two pipes with one-inch inside diameters. At the same average water speed, the two-inch opening passes twice as much water per second as the two one-inch openings combined. Double a pipe's inside diameter, and the opening's area grows four times. That's why you can't size pipes by adding up diameters.

Electrical wires follow the same rule. A wire's resistance is rho L over A. Rho depends on the metal, L is the length, and A is the cross-section area of the conductor itself, the metal, not the insulation. For round conductors of the same material, length, and temperature, doubling the conductor diameter makes that area four times bigger, and cuts its resistance to one-quarter. Electric stoves draw more current than lamps, so they typically use larger conductors.

Bolts work the same way. When a bolt is pulled, the load spreads over its cross-section. Take the smooth, unthreaded shank, since the threaded part has its own, smaller stress area. A three-quarter-inch bolt is one and a half times wider than a half-inch bolt. So it has two and a quarter times the unthreaded shank area. At the same average tensile stress in the shank, that corresponds to two and a quarter times the pulling force. Sound familiar? It's the pizza ratio again.
```

## Chunk 5 → save as `audio/narration-05.wav`
Scenes S16–S17 · 75 words · about 0:30

```text
So here's what to remember. Area grows with the square of the diameter. Double the width, and you get four times the area. One and a half times the width gives two and a quarter times the area. And when you compare circles, compare areas, not diameters. If you're choosing by surface area, take the eighteen-inch.

If you enjoyed this, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (One 18-inch pizza beats two 12-inch pizzas #shorts) → save as `audio/short-1.wav`
Its own recording · 75 words · about 0:30. Same voice and style, with a little more energy.

```text
One eighteen-inch pizza has more surface area than two twelve-inch pizzas. Let's check it.

Area is pi r squared. Each twelve-inch pizza has radius six. Six squared is thirty six, so the pair is seventy two pi. The eighteen-inch has radius nine. Nine squared is eighty one pi.

Eighty one beats seventy two. That's twelve and a half percent more surface area in one box. The full video shows the math.
```

## Short 2 (A 14-inch pizza is almost twice a 10-inch #shorts) → save as `audio/short-2.wav`
Its own recording · 77 words · about 0:31. Same voice and style, with a little more energy.

```text
A fourteen-inch pizza has almost twice the surface area of a ten-inch. Only four more inches across.

Area depends on the diameter squared. Ten squared is one hundred. Fourteen squared is one hundred ninety six. So the bigger pizza has one point nine six times the area.

Engineers use the same rule for the cross-sections of pipes and wires. A little more width means a lot more area. The full video shows the math.
```
