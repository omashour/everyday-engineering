# Voice recording package — The Numbers on Your Tire Are a Math Problem

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
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 013`).

If a chunk is too long for the tool, split it at a paragraph break and save the parts as e.g. narration-02a.wav and narration-02b.wav (files are joined in name order).

## Style instructions
```
A clear, warm, confident engineering teacher talking to one curious student. Energetic and intriguing in the opening hook, then calm and steady for explanations. Natural pace (about 150 words per minute), short pauses between sentences and a longer pause between paragraphs. Emphasize the surprising number or result in each section. Never rush through math. Say tire codes as 'two twenty five, forty five, R seventeen', with a short pause at each comma.
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
Scenes S01–S05 · 213 words · about 1:25

```text
Your speedometer says sixty. In this example, you're actually doing about sixty four. The difference starts with one digit on the tire. Many passenger car tires carry a code like this, and it lets you estimate the tire's size.

Let's work it out with percentages and a circle.

Here's what each part means. Two twenty five is the nominal section width, the tire's width in millimeters. Forty five is the aspect ratio. We'll come back to that one. R means radial, the way the layers inside the tire are built. And seventeen is the rim diameter, in inches. Yes, one code mixes millimeters and inches. Numbers like ninety one V that often follow are the load index and the speed rating. For size, we only need the first three.

Forty five does not mean forty five millimeters. It's a percentage. The sidewall height, from the rim to the tread, is forty five percent of the tire's width. So at the same width, a lower number means a shorter sidewall. That's what people call a low profile tire.

So the sidewall height is two twenty five times zero point four five. That's one hundred one point two five millimeters, about four inches of sidewall height above the rim, and the same again below it.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S09 · 223 words · about 1:29

```text
Now the rim. Seventeen inches times twenty five point four is four hundred thirty one point eight millimeters. Look at the wheel from the side. Straight across, you cross the rim once and the sidewall twice. So the estimated outside diameter is the rim plus two sidewall heights. Four thirty one point eight, plus two times one oh one point two five, gives six hundred thirty four point three millimeters.

That's twenty four point nine seven inches, just under twenty five. Measure an unmounted, unloaded tire with this code and you'll get roughly that. It's an estimate, not an exact size.

Here's why the diameter matters. In the simple model, each turn of the wheel moves the car one circumference, pi times the diameter. That's about one point nine nine meters per turn, or about five hundred two turns per kilometer, and eight hundred eight per mile. A real tire flexes under the car's weight, so its actual distance per turn can differ a little from this circle estimate.

Your speedometer doesn't measure the road. It measures how fast something is turning, the wheels or a shaft that turns with them, and multiplies by a distance per turn set at the factory. If the calibration stays the same, the car keeps using the original distance per turn, even after you change the tires.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S13 · 227 words · about 1:31

```text
Now change one digit. Fit a two twenty five, fifty five, R seventeen instead. Same width, same rim. The sidewall height grows to one hundred twenty three point seven five millimeters, and the diameter to six hundred seventy nine point three. Roll each tire through one full turn. The original covers about one point nine nine meters. The new one covers about two point one three. That's about fourteen centimeters farther, every turn.

The new tire is bigger by six seventy nine point three over six thirty four point three. That's about one point zero seven one. Assume the speedometer was accurate on the original tires and its calibration hasn't changed. Then, in this model, actual speed is about seven percent higher than indicated. One hundred kilometers an hour on the dial is about one hundred seven. Sixty miles an hour is about sixty four.

Here's the whole picture. The navy line is the original tire. The red line is the larger tire, seven percent above it at every speed. A smaller tire would shift things the other way. So with the larger tire, you could be going faster than the dial suggests.

The odometer counts turns the same way. Under the same assumptions, when it reads ten thousand kilometers, you've traveled about ten thousand seven hundred. So mileage-based service reminders would come a little late.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S14–S18 · 243 words · about 1:37

```text
So how do people fit larger wheels and keep the outside diameter close to the original? They choose a larger rim and a lower aspect ratio. Go from a seventeen inch rim to an eighteen, and from forty five to forty. The rim adds about two and a half centimeters, and the shorter sidewalls take almost all of it back.

Here's the geometry. The eighteen inch version is about half a percent larger than the original. The nineteen is under one percent. Compare that with seven percent from changing one digit. But keeping the diameter close is only one part of fitment. Wheel fit, clearance and load capacity matter too. Use a size approved by the vehicle manufacturer.

Anywhere a wheel measures distance, the same math applies. A bike computer asks for your wheel circumference before it shows your speed. A surveyor's measuring wheel counts turns to measure a path. If the wheel rolls without slipping, a one percent error in circumference becomes a one percent error in every distance.

So read a tire like an engineer. Two twenty five is the width. Forty five percent of that is the sidewall height. Add two of those to the rim and you get about six hundred thirty four millimeters. Change forty five to fifty five, and under the same assumptions, sixty on your speedometer is about sixty four on the road.

If you liked this, give it a like and subscribe. Thanks for watching!
```

## Short 1 (One tire digit can throw off your speedometer #shorts) → save as `audio/short-1.wav`
Its own recording · 99 words · about 0:40. Same voice and style, with a little more energy.

```text
Your speedometer says sixty. Could you actually be doing sixty four? Look at the tire code. Change two twenty five, forty five, R seventeen to two twenty five, fifty five, R seventeen. Only one digit changes.

That bigger sidewall makes the tire about six hundred seventy nine millimeters across, instead of six hundred thirty four. So it covers about seven percent more ground every turn.

If the speedometer was accurate before and keeps using its old calibration, sixty on the dash works out to about sixty four on the road in this example. The full video shows the math.
```

## Short 2 (What the 45 on your tire actually means #shorts) → save as `audio/short-2.wav`
Its own recording · 93 words · about 0:37. Same voice and style, with a little more energy.

```text
The forty five on your tire isn't millimeters. It's a percentage. The sidewall height is forty five percent of the tire's nominal width.

This tire is two hundred twenty five millimeters wide. Forty five percent of that is about one hundred one millimeters, or about four inches of sidewall height. That's more than twice what forty five millimeters would be.

At the same width, a lower percentage gives a shorter sidewall. That's how a larger rim can fit inside a tire with nearly the same outside diameter. The full video does the math.
```
