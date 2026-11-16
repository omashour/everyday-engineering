# Voice recording package — Why a Manhole Cover Can't Fall Into Its Hole

Generated from scenes.yaml.

## Settings
- **Model:** gemini-3.8-flash-tts
- **Voice:** Cruz
- **Language:** English
- **Chunks:** 4 (about 280 words max each, split at scene boundaries)

## How to record
1. Open the Gemini speech generation page in Google AI Studio and pick the model and voice above.
2. Paste the **Style instructions** below into the style / instructions field (not into the text).
3. For each chunk: paste the chunk text, generate, listen once, download the WAV and save it with the file name shown, in the video's `audio` folder (or drop it on the app).
4. Check the pronunciation list while listening; regenerate any chunk that mispronounces a term.
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 004`).

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
| Reuleaux | ruh-LOH |

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S05 · 266 words · about 1:46

```text
This manhole cover is round for a reason. A thin square cover can slip through its own hole if you tilt and turn it. A round one never can. Here's the geometry, and a strange shape that works as well.

Let's prove it with a little geometry.

First, how does a cover stay up at all? Around the top of the hole there's a small ledge, called a lip. The cover is slightly bigger than the opening, so it rests on that lip. To fall in, the cover would have to tip up on its edge and find a gap in the opening that's wider than the cover itself.

Now try a square cover with side s. The longest line across a square is its diagonal. By Pythagoras, the diagonal is the square root of s squared plus s squared. That's s times the square root of two, about one point four one times the side. So tip the square cover up on its edge and turn it to line up with the opening's diagonal. If it's thin enough, it slips right through.

Let's put in real numbers. Say a square cover is sixty centimeters across, and the lip is two centimeters wide all around. The opening is then fifty six centimeters across. Its diagonal is fifty six times one point four one, about seventy nine centimeters. That's plenty of room for a sixty centimeter cover tipped on its edge. Now make it round. The widest line across the opening is just fifty six centimeters, while the cover is sixty in every direction. It can't fit.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S08 · 207 words · about 1:23

```text
It's not just squares. A rectangular cover can also slip through a suitable opening when it's tilted and turned. An equilateral triangle has a similar weakness. Its height is only about eighty seven percent of its side, so it has a narrow direction that can let it through. The key idea is that most shapes have different widths in different directions. Whether a real cover actually passes also depends on its thickness and the shape of the opening.

A circle is different. Measure it in any direction, and you get the same number, its diameter. This is called constant width. Picture two parallel plates squeezing the cover. However you turn a circle, the plates stay the same distance apart. So a rigid round cover's narrowest width is its full diameter, bigger than any line across the smaller round opening. There's no way in.

The circle isn't the only shape of constant width. Draw an equilateral triangle with side w. Put a compass point on one corner and draw an arc joining the other two. Repeat from each corner. You get a curved triangle called a Reuleaux triangle, named after the German engineer Franz Reuleaux. Squeeze it between parallel plates, and the gap is w in every direction.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S09–S11 · 248 words · about 1:39

```text
And it has less area. A circle of width w has an area of pi over four, times w squared. A Reuleaux triangle of the same width has an area of pi minus root three, over two, times w squared. That's about ten point three percent less. For flat plates of equal thickness, that would mean less metal, although real covers also need strength and a supporting frame. Of all shapes with the same constant width, the Reuleaux triangle has the smallest area, and the circle the largest. Yet every one of them has the same perimeter, pi times w.

So do we use these shapes in real life? In San Francisco, some small water-valve covers in the street are shaped like Reuleaux triangles, which helps set certain water lines apart. Those are small valve covers, not full-size manhole covers. And in Britain, the twenty pence and fifty pence coins are seven-sided curves of constant width. That lets them roll and be measured consistently in vending machines, however they're turned.

Constant width has one more trick. Lay a flat board on rollers shaped like Reuleaux triangles, and push. The board glides along perfectly level, because the floor and the board always stay w apart. The rollers' centers bob up and down, but the board doesn't. A fixed axle is different. Put a Reuleaux wheel on an ordinary axle through its center, and the distance from axle to ground keeps changing, so the ride is bumpy.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S12–S14 · 171 words · about 1:08

```text
So why aren't all manhole covers Reuleaux triangles? Because not falling in is only one design consideration. A round cover can go back on in any orientation, with no corners to line up. A heavy round cover can be rolled instead of carried. And many access shafts are round, so a round cover is a practical match. Other shapes can work too, with well-designed frames, hinges or locks. But the circle combines constant width with several practical advantages.

So here's the principle. A rigid round cover can't pass through a smaller round opening, because its diameter is bigger than the opening's, however you turn it. A square doesn't get that protection. Its diagonal is about one point four one times its side, which can open a route through. And the Reuleaux triangle shows that constant width isn't just for circles. That's the clever idea behind the round cover on your street.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```
