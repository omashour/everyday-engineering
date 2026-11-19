# Voice recording package — Your Phone Doesn't Know Where You Are

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
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 012`).

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
| trilateration | try-lat-er-AY-shun |
| Galileo | gal-ih-LAY-oh |
| pseudorange | SOO-doh-raynj |

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S05 · 220 words · about 1:28

```text
Your phone doesn't start knowing where you are. It starts with signal timings, and satellite positions worked out from orbit data the satellites broadcast. From those, it finds you within about five meters under open sky.

Let's see how, using nothing more than circles, spheres and a little algebra.

Each GPS satellite broadcasts data describing its orbit, so your phone can calculate where the satellite was. It also broadcasts the time the signal left, kept by very precise atomic clocks. Your phone compares that transmission time with the arrival time on its own clock. Multiply the travel time by the speed of light, about three hundred thousand kilometers per second, and you get an apparent distance. Engineers call it a pseudorange. From twenty thousand two hundred kilometers straight up, the travel time is about seven hundredths of a second.

Let's start flat, on a map, with exact distances. Say a station at point A tells you that you're exactly five kilometers away. That doesn't give you a point. It gives you a circle: every spot that's five kilometers from A.

Add a second station, B, eight kilometers east of A. You're also five kilometers from B. Now there are two circles, and they cross at exactly two points. You're at one of them. Which one? Take a second and guess.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S09 · 248 words · about 1:39

```text
Here's why there are two. Put A at the origin, and B at eight on the x axis. Write both circle equations, then subtract one from the other. The x squared and y squared terms cancel, leaving sixteen x minus sixty four equals zero. So x equals four: the crossing points sit exactly halfway between A and B. Put x equals four back in, and y squared equals nine. A square has two roots, so y is plus three or minus three.

Now add a third station, C, ten kilometers south of the midpoint between A and B. You're seven kilometers from C. The southern point, four, minus three, is exactly seven kilometers from C. The northern point is thirteen. Three circles, one point. That's called trilateration.

Real satellites aren't on a flat map. In three dimensions, circles become spheres. Take the same idealized case, with exact distances and a perfectly synchronized clock. One satellite puts you somewhere on a sphere. Two spheres meet in a circle. A third sphere can narrow that circle to two candidate points, and the receiver can often rule one out, because it isn't anywhere plausible for someone near Earth's surface.

So in that ideal case, three satellites would do. But real phones don't have a perfectly synchronized clock. The satellites carry atomic clocks. Your phone has an ordinary one. If your phone's clock is one microsecond ahead, every apparent distance comes out about three hundred meters too long, in this simplified model.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S12 · 262 words · about 1:45

```text
Here's what a shared error does on our map. Let's exaggerate it, so every apparent distance comes out one kilometer too long: six, six and eight. Now the three circles don't meet at a single point. But the error is the same for all three. So try the same correction on every distance. Subtract one kilometer, and you're back to five, five and seven. Now all three circles pass through the same point: four, minus three. That correction is another unknown to solve for. The shrinking circles are just a way to picture it. Real receivers estimate position and clock error together, and with noisy measurements, the circles never meet exactly. They find the best fit.

In three dimensions, a standalone fix has four unknowns: x, y, z, and the receiver's clock offset. So a receiver normally needs at least four usable satellite signals, and it uses more when it can. In a simplified model, each one gives an equation: apparent distance equals the true geometric distance, plus the speed of light times the clock offset. GPS satellites are arranged so that at least four are visible from nearly anywhere on Earth.

So how close does it get? Under open sky, phones are typically accurate to about five meters. Near buildings, bridges and trees it gets worse, because they block and reflect the signals. With suitable equipment and corrections, surveyors can get to within a few centimeters. And phones get help: Europe's Galileo adds more satellite measurements, while Wi-Fi and cell signals help estimate your location when satellite reception is poor.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S13–S14 · 83 words · about 0:33

```text
So your phone never measures your position directly. It measures timings, turns them into apparent distances, and solves for where it is and how far off its clock is. On our flat map, one distance gave a circle, two gave two points, and three gave one. In space, the fourth satellite provides the extra measurement needed to solve for position and clock error together.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (How GPS Finds You, Explained With Three Circles #shorts) → save as `audio/short-1.wav`
Its own recording · 76 words · about 0:30. Same voice and style, with a little more energy.

```text
How does your phone find you? It uses signal timing to estimate apparent distances to satellites.

Picture it on a flat map first. One distance puts you somewhere on a circle. A second distance gives a second circle, and they cross at two points.

A third distance picks one of them. In space, circles become spheres. And your phone's clock isn't perfect, so a fourth satellite gives the extra measurement to solve for that error too.
```

## Short 2 (Why 1 Microsecond Means 300 Meters in GPS #shorts) → save as `audio/short-2.wav`
Its own recording · 80 words · about 0:32. Same voice and style, with a little more energy.

```text
If your phone's clock is one microsecond ahead, every satellite can look about three hundred meters farther away.

Radio signals travel at the speed of light, about three hundred thousand kilometers per second. In one millionth of a second, that's three hundred meters. So a tiny clock error adds the same extra distance to every satellite.

That shared error is one more unknown. So the receiver uses a fourth satellite to solve for its location and its clock error together.
```
