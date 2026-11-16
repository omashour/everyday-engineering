# Voice recording package — Fold Paper 42 Times and It Reaches the Moon

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
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 003`).

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
| Gallivan | GAL-ih-vun |
| Kármán | KAR-mahn |

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S05 · 266 words · about 1:46

```text
Fold a sheet of paper in half forty two times, and mathematically, it would be thicker than the distance to the Moon. Sounds impossible? The math checks out. Every fold doubles the thickness. Here's the math, and why engineers take doubling seriously.

Let's follow the folds, one doubling at a time.

Start with an ordinary sheet of printer paper. It's about a tenth of a millimeter thick. Fold it in half once, and now you have two layers. Fold again, and you have four layers. Again, eight. Every fold doubles the number of layers, so every fold doubles the thickness. In this ideal version, we assume the paper never gets squashed, so every layer stays a tenth of a millimeter thick.

Let's write it down. Zero folds, zero point one millimeters. One fold, zero point two. Then zero point four, zero point eight, one point six, three point two, and six point four. At fold seven, the stack is twelve point eight millimeters, thicker than most phones. At fold ten, it's one hundred and two millimeters. That's about ten centimeters, the height of a coffee mug. Ten folds made it about a thousand times thicker.

Here's the pattern as a formula. Call the starting thickness t. After n folds, the thickness T is t times two to the n. Now notice something handy. Two to the ten is one thousand and twenty four. That's almost exactly a thousand. So every ten folds multiplies the thickness by about a thousand. Ten folds, about ten centimeters. Twenty folds, about a hundred meters. Thirty folds, about a hundred kilometers.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S08 · 261 words · about 1:44

```text
Now compare two ways to grow. Both start with one sheet. The blue line adds one new sheet at every step. That's linear growth. The red curve doubles the sheets at every step. That's exponential growth. For the first few steps, they look almost the same. But after ten steps, the blue stack has eleven sheets, just one point one millimeters thick. The red stack has one thousand and twenty four sheets, over a hundred millimeters. Adding is slow and steady. Doubling runs away.

Keep folding, and switch the scale to kilometers. For about twenty folds, the curve hugs the floor. By then the stack is about a hundred meters, as tall as a thirty storey building. Three folds later, it's taller than the Burj Khalifa, the tallest building in the world. At fold twenty seven, it's thirteen kilometers. That's higher than Mount Everest, and higher than airliners fly. At fold thirty, it's about a hundred and seven kilometers. That's past the Kármán line, the commonly used boundary of space.

Now picture the stack in thousands of kilometers. The Moon is about three hundred and eighty four thousand kilometers away. At fold forty, the stack is about a hundred and ten thousand kilometers. At fold forty one, two hundred and twenty thousand. Still only partway there. Then fold forty two doubles it again, to about four hundred and forty thousand kilometers. You've passed the Moon. And here's the astonishing part. The final fold alone added more than two hundred thousand kilometers, as much thickness as all forty one previous folds combined.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S09–S11 · 228 words · about 1:31

```text
We can also run it backwards. How many folds does it take to reach the Moon? Set t times two to the n equal to the distance. Put both in meters, and divide. That gives two to the n equals about three point eight four times ten to the twelve. To solve for an exponent, you use a logarithm. Log base two of that number is forty one point eight. You can't make eight tenths of a fold, so round up. Forty two folds.

Why can't you actually fold paper forty two times? Because each fold makes the stack thicker while reducing the area available for the next fold. After seven folds, an ordinary sheet could already be more than a centimeter thick, with only a tiny footprint remaining. At that point, bending the growing stack becomes extremely difficult. That's why most people can only manage around six or seven folds with ordinary printer paper.

For years, people commonly believed you couldn't fold paper in half more than seven times. Then in two thousand and one, a California high school student named Britney Gallivan was challenged by her math teacher to fold something in half twelve times for extra credit. In January two thousand and two, she folded a strip of toilet paper about one point two kilometers long in half twelve times, all in the same direction.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S12–S15 · 233 words · about 1:33

```text
Gallivan also derived a formula for the minimum length of paper needed when every fold goes in the same direction. The equation shows that the required length grows roughly fourfold with every additional fold. For forty two folds of paper one tenth of a millimeter thick, the theoretical length would be more than ten to the twenty one meters. That's approximately one hundred thousand light years, comparable to the diameter of the Milky Way. Of course, this is a mathematical extrapolation, not something we could physically build.

This isn't just a party trick. Engineers run into doubling all the time. For decades, the number of transistors on a computer chip doubled roughly every two years. That's Moore's law, an industry trend rather than a law of physics. In a nuclear reactor, neutrons released when an atom splits can go on to split more atoms, so the chain reaction has to be carefully controlled. And money growing at seven percent a year, with compound interest, doubles in a little over ten years.

So here's the one thing to remember. Ten doublings is about a thousand times. Forty two doublings turn a tenth of a millimeter into four hundred and forty thousand kilometers. That's how a sheet of paper, at least on paper, reaches the Moon.

If you enjoyed this one, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Fold Paper 42 Times and It Reaches the Moon #shorts) → save as `audio/short-1.wav`
Its own recording · 85 words · about 0:34. Same voice and style, with a little more energy.

```text
Fold a sheet of paper in half forty two times, and it would reach past the Moon. Sounds impossible? Watch.

A sheet is about zero point one millimeters thick. Every fold doubles it. After ten folds, it's about ten centimeters. After twenty, about a hundred meters.

Then the curve explodes. The Moon is about three hundred and eighty four thousand kilometers away. At fold forty two, the stack is about four hundred and forty thousand. The full math is in the video on our channel.
```

## Short 2 (Why you can't fold paper more than 7 times #shorts) → save as `audio/short-2.wav`
Its own recording · 81 words · about 0:32. Same voice and style, with a little more energy.

```text
Why can't you fold paper more than about seven times? Every fold doubles the thickness and halves the area. After seven folds, a sheet is over a centimeter thick, with a footprint about the size of a postage stamp.

Then in two thousand and two, a high school student named Britney Gallivan worked out the math, and folded a strip of toilet paper over a kilometer long in half twelve times. The full story is in the video on our channel.
```
