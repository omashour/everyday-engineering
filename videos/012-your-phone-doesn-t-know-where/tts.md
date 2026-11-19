# Voice recording package — Your Phone Doesn't Know Where You Are

Generated from scenes.yaml.

## Settings
- **Model:** gemini-3.8-flash-tts
- **Voice:** Cruz
- **Language:** English
- **Chunks:** 3 (about 280 words max each, split at scene boundaries)
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

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S06 · 271 words · about 1:48

```text
Your phone doesn't start knowing where you are. It starts with nothing but timings: how long signals took to arrive from satellites about twenty thousand kilometers up. From those, it finds you within about five meters under open sky.

Let's see how, using nothing more than circles, spheres and a little algebra.

Each GPS satellite broadcasts its position and the exact time, kept by very precise atomic clocks. Your phone notes when each signal arrives. The signal travels at the speed of light, about three hundred thousand kilometers per second. So the distance is the speed of light times the travel time. From twenty thousand two hundred kilometers straight up, that's about seven hundredths of a second.

Let's start flat, on a map. Say a station at point A tells you that you're exactly five kilometers away. That doesn't give you a point. It gives you a circle: every spot that's five kilometers from A.

Add a second station, B, eight kilometers east of A. You're also five kilometers from B. Now there are two circles, and they cross at exactly two points. You're at one of them. But which one?

Here's the algebra behind those two points. Put A at the origin, and B at eight on the x axis. The circles are x squared plus y squared equals twenty five, and x minus eight, squared, plus y squared equals twenty five. Subtract one from the other, and the squares cancel. You're left with a straight line: sixteen x minus sixty four equals zero, so x equals four. Then y squared equals nine, so y is plus or minus three.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S07–S10 · 221 words · about 1:28

```text
So add a third station, C, ten kilometers south of the midpoint between A and B. You're seven kilometers from C. The southern point, at y equals minus three, is exactly seven kilometers from C. The northern point is thirteen. Three circles, one point. That's called trilateration.

Satellites aren't on a flat map. In three dimensions, circles become spheres. One satellite puts you somewhere on a sphere. Two spheres meet in a circle. Three spheres meet in just two points, and one of them is usually nowhere near Earth's surface, so it's easy to rule out.

So three satellites should be enough. But there's a catch: the clock in your phone. The satellites carry atomic clocks. Your phone has an ordinary one. If its clock is off by just one millionth of a second, every distance is off by about three hundred meters.

Here's what that does on our map. Say your phone's clock is a little off, so every distance comes out one kilometer too long: six, six and eight. Now the three circles don't meet at a single point. But the error is the same for every station. So the phone shrinks all the circles by the same amount until they meet. When they meet at one point, it has found both your position and its own clock error.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S11–S14 · 203 words · about 1:21

```text
In three dimensions, the unknowns are your x, y and z, plus the clock error. That's four unknowns, so the phone needs at least four satellites. Each one gives an equation: the true distance to that satellite, plus the speed of light times the clock error, equals the measured distance. GPS satellites are arranged so that at least four are visible from nearly anywhere on Earth.

So how close does it get? Under open sky, phones are typically accurate to about five meters. Near buildings, bridges and trees it gets worse, because they block and reflect the signals. Survey equipment, with extra signals and corrections, can get to within a few centimeters. And modern phones also use other satellite systems, like Europe's Galileo, plus Wi-Fi and cell towers, to get a fix faster.

So your phone never measures your position directly. It measures timings, turns them into distances, and solves for the one point where they all agree, plus its own clock error. One distance gives a circle. Two give two points. Three give one. And in space, a fourth fixes the clock.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (How your phone finds you with three circles #shorts) → save as `audio/short-1.wav`
Its own recording · 72 words · about 0:29. Same voice and style, with a little more energy.

```text
Your phone doesn't measure where you are. It measures how far away the satellites are, using the time their signals take to arrive.

One distance puts you somewhere on a circle. Add a second distance, and the two circles cross at just two points.

A third distance picks one of them. That's called trilateration. In space, circles become spheres, and your phone needs a fourth satellite too. The full video shows why.
```

## Short 2 (One microsecond can put your GPS 300 meters off #shorts) → save as `audio/short-2.wav`
Its own recording · 85 words · about 0:34. Same voice and style, with a little more energy.

```text
If your phone's clock is off by one millionth of a second, your GPS position could be off by about three hundred meters.

The signal travels at the speed of light, about three hundred thousand kilometers per second. In one millionth of a second, that's three hundred meters. Every distance your phone works out would be wrong by that much.

So your phone treats its own clock error as an unknown, and uses a fourth satellite to solve for it. The full video shows how.
```
