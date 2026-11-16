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
Scenes S01–S05 · 259 words · about 1:44

```text
This manhole cover is round, and that's not just style. A square cover could fall straight through its own hole. A round one never can. Here's the geometry, and a strange shape that works just as well.

Let's prove it with a little geometry.

First, how does a cover stay up at all? Around the top of the hole there's a small ledge, called a lip. The cover is slightly bigger than the opening, so it rests on that lip. To fall in, the cover would have to tip up on its edge and find a gap in the opening that's wider than the cover itself.

Now try a square cover with side s. The longest line across a square is its diagonal. By Pythagoras, the diagonal is the square root of s squared plus s squared. That's s times the square root of two, about one point four one times the side. So tip the square cover up on its edge, and line it up with the diagonal of the opening. It slips right through.

Let's put in real numbers. Say a cover is sixty centimeters across, and the lip is two centimeters wide all around. The opening is then fifty six centimeters across. For a square, the opening's diagonal is fifty six times one point four one, about seventy nine centimeters. That's far more than sixty, so the square cover falls in. For a circle, the widest gap in the opening is just fifty six centimeters, while the cover is sixty in every direction. It can't fit.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S08 · 206 words · about 1:22

```text
It's not just squares. A rectangle falls in the same way, along its diagonal. A triangle is even easier. Its height is only about eighty seven percent of its side, so tipped on edge, it can slip through along one side of the opening. The general rule is simple. Most shapes get narrower or wider as you turn them. If the cover's narrowest width is smaller than the opening's widest gap, it can fall in.

A circle is different. Measure it in any direction, and you get the same number, its diameter. This is called constant width. Picture two parallel plates squeezing the cover. However you turn a circle, the plates stay exactly the same distance apart. So the cover's narrowest width is its full diameter, and that's always bigger than any gap in the smaller opening. There's simply no way in.

The circle isn't the only shape of constant width. Draw an equilateral triangle with side w. Put a compass point on one corner and draw an arc joining the other two. Repeat from each corner. You get a curved triangle called a Reuleaux triangle, named after the German engineer Franz Reuleaux. Squeeze it between parallel plates, and the gap is w in every direction.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S09–S11 · 228 words · about 1:31

```text
And it uses less metal. A round cover of width w has an area of pi over four, times w squared. A Reuleaux triangle of the same width has an area of pi minus root three, over two, times w squared. Work it out, and that's about ten percent less. In fact, of all shapes with the same constant width, the Reuleaux triangle has the smallest possible area, and the circle has the largest. One more surprise. Every shape of constant width w has the same perimeter, pi times w.

So do Reuleaux covers exist? They do. San Francisco's water department uses round covers for drinking water and Reuleaux triangle covers for reclaimed water, so the two are easy to tell apart. And in Britain, the twenty pence and fifty pence coins are seven-sided curves of constant width. Coin machines can measure them just like round coins.

Constant width has one more trick. Lay a flat board on rollers shaped like Reuleaux triangles, and push. The board glides along perfectly level, just like on round rollers, because the top of each roller is always w above the floor. Your eyes say it should bump up and down. The geometry says it can't. There's a catch, though. Put a Reuleaux wheel on a fixed axle and it wobbles, because its center moves up and down as it rolls.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S12–S14 · 139 words · about 0:56

```text
So why aren't all covers Reuleaux triangles? Round covers have extra advantages. A round cover goes back on in any orientation, with no lining up. A heavy round cover can be rolled instead of carried. And the shaft underneath is usually a round tube, which handles the push of the surrounding soil well. Constant width keeps the cover out of the hole. The circle adds everything else.

So here's the rule. A cover can't fall in if its narrowest width is bigger than the widest gap in the opening. A square fails, because its diagonal is one point four one times its side. A circle passes, because its width never changes. That's why the cover on your street is round.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```
