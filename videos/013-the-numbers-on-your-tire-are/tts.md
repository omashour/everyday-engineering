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
Scenes S01–S05 · 236 words · about 1:34

```text
Every tire has a code like this: two twenty five, forty five, R seventeen. It's not a part number. It's a math problem. Solve it and you know the tire's exact size, and why one digit makes your speedometer lie.

Let's solve it with nothing more than percentages and a circle.

Here's what each part means. Two twenty five is the width of the tire, in millimeters, measured at its widest point. Forty five is the aspect ratio. We'll come back to that one, because it's the tricky part. R means radial, the way the layers inside the tire are built. And seventeen is the diameter of the wheel rim it fits, in inches. Yes, one code mixes millimeters and inches. The numbers that often follow, like ninety one V, are the load and speed ratings. For size, we only need the first three numbers.

Now the tricky number. Forty five does not mean forty five millimeters. It's a percentage. It says the sidewall, the rubber between the rim and the road, is forty five percent as tall as the tire is wide. So a tire with a lower number has a shorter, stiffer sidewall. That's what people call a low profile tire.

So the sidewall height is two twenty five times zero point four five. That's one hundred one point two five millimeters. About ten centimeters of rubber, above the rim and again below it.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S09 · 236 words · about 1:34

```text
Now the rim. Seventeen inches times twenty five point four millimeters per inch is four hundred thirty one point eight millimeters. Look at the wheel from the side. Going straight across, you cross the rim once, and the sidewall twice, once above the rim and once below. So the diameter is the rim plus two sidewalls. Four thirty one point eight, plus two times one oh one point two five, gives six hundred thirty four point three millimeters.

Six hundred thirty four millimeters is almost exactly twenty five inches. Hold a tape measure across a tire with this code, and that's about what you'll find. Worn tread makes it a little less.

Here's why the diameter matters. Every time the wheel turns once, the car moves forward one circumference. That's pi times the diameter. Pi times six hundred thirty four point three millimeters is about one point nine nine meters. So in one kilometer this tire turns about five hundred and two times. In one mile, about eight hundred and eight.

Your car's speedometer doesn't measure the road. It measures how fast something is turning, the wheels or a shaft that turns with them. Then it multiplies by the circumference it was set up for at the factory. Speed equals turns per second times circumference. The car trusts that the tires are the size the factory fitted. Change the tire, and the car has no idea.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S13 · 254 words · about 1:42

```text
So what happens if you change one digit? Say you fit a two twenty five, fifty five, R seventeen instead. Same width, same rim. Only the forty five became fifty five. The sidewall grows to one hundred twenty three point seven five millimeters. The diameter grows to six hundred seventy nine point three millimeters. And every turn now covers about two point one three meters instead of one point nine nine.

The new tire is bigger by six seventy nine point three over six thirty four point three. That's one point zero seven one, about seven percent. The speedometer still counts turns as if each one were one point nine nine meters. So when it shows one hundred kilometers an hour, you're really doing about one hundred seven. At an indicated sixty miles an hour, you're doing about sixty four.

Here's the whole picture. The navy line is the original tire, where the speedometer is right. The red line is the bigger tire. At every speed, the real speed is seven percent above what the dial shows. And a smaller tire does the opposite. It makes the speedometer read high, so you're slower than you think. The bigger tire is the risky one: the dial says you're fine while you're speeding.

Your odometer makes the same mistake, because it counts turns too. Drive what it calls ten thousand kilometers on the bigger tires, and you've really driven ten thousand seven hundred and nine. Oil changes, warranties and resale value all lean on that number.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S14–S18 · 275 words · about 1:50

```text
So how do people fit bigger, flashier wheels without fooling the speedometer? They lower the aspect ratio to keep the overall diameter almost the same. Go from a seventeen inch rim to an eighteen, and from forty five to forty. The rim adds about two and a half centimeters, and the thinner sidewalls take almost all of it back. Tire shops call this plus sizing.

Here are the numbers. Each step up in rim size comes with a lower aspect ratio. The eighteen inch version is just half a percent bigger than the original. The nineteen is under one percent. Compare that with the seven percent from changing one digit. A common rule of thumb is to stay within about three percent of the original diameter.

This is the same math engineers use anywhere a wheel measures distance. A bike computer asks you for the wheel circumference before it shows your speed. A robot vacuum tracks where it has been partly by counting wheel turns. Measuring wheels, conveyors and train speed sensors work this way too. Get the diameter wrong, and every distance after it is wrong by the same percent.

So next time you look at a tire, read it like an engineer. Two twenty five is the width. Forty five percent of that is the sidewall. Add two sidewalls to the rim, and you get about six hundred thirty four millimeters. Multiply by pi, and that's one point nine nine meters every turn. Change one digit, and your speedometer is off by seven percent.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Change one digit on your tire and your speedometer lies #shorts) → save as `audio/short-1.wav`
Its own recording · 101 words · about 0:40. Same voice and style, with a little more energy.

```text
Change one digit on your tire and your speedometer starts lying. This tire says two twenty five, forty five, R seventeen. Two hundred twenty five millimeters wide, a sidewall forty five percent as tall, on a seventeen inch rim.

Rim plus two sidewalls gives a diameter of six hundred thirty four millimeters. Now swap the forty five for fifty five. The diameter jumps to six hundred seventy nine. That's seven percent bigger.

Your speedometer only counts wheel turns, so it can't tell. When it shows one hundred, you're really doing one hundred seven. The full video works through the whole code.
```

## Short 2 (The 45 on your tire isn't millimeters #shorts) → save as `audio/short-2.wav`
Its own recording · 89 words · about 0:36. Same voice and style, with a little more energy.

```text
The forty five on your tire isn't millimeters. It's a percentage. It means the sidewall is forty five percent as tall as the tire is wide.

This tire is two hundred twenty five millimeters wide. Forty five percent of that is one hundred one millimeters, about ten centimeters of rubber. That's more than twice what forty five millimeters would be.

So a lower number means a thinner, low profile sidewall. Bigger wheels get lower numbers, so the whole tire stays the same size. The full video does the math.
```
