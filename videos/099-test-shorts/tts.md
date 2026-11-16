# Voice recording package — Fold Paper 42 Times and It Reaches the Moon

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
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 099`).

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

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S05 · 243 words · about 1:37

```text
Fold a sheet of paper in half forty two times, and it would be thicker than the distance to the Moon. No tricks. Just one number doubling. Here's the math, and why engineers take doubling seriously.

Let's follow the folds, one doubling at a time.

Start with an ordinary sheet of printer paper. It's about a tenth of a millimeter thick. Fold it in half once, and now you have two layers. Fold again, and you have four layers. Again, eight. Every fold doubles the number of layers, so every fold doubles the thickness. That's the whole rule.

Let's write it down. Zero folds, zero point one millimeters. One fold, zero point two. Then zero point four, zero point eight, one point six, three point two, and six point four. At fold seven, the stack is twelve point eight millimeters, thicker than most phones. At fold ten, it's one hundred and two millimeters. That's about ten centimeters, the height of a coffee mug. Ten folds made it about a thousand times thicker.

Here's the pattern as a formula. Call the starting thickness t. After n folds, the thickness T is t times two to the n. Now notice something handy. Two to the ten is one thousand and twenty four. That's almost exactly a thousand. So every ten folds multiplies the thickness by about a thousand. Ten folds, about ten centimeters. Twenty folds, about a hundred meters. Thirty folds, about a hundred kilometers.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S08 · 230 words · about 1:32

```text
Now compare two ways to grow. The blue line adds one new sheet at every step. That's linear growth. The red curve doubles at every step. That's exponential growth. For the first few steps, they look almost the same. But after ten steps, the added sheets make a stack just one point one millimeters thick. The doubled stack is over a hundred millimeters. Adding is slow and steady. Doubling runs away.

Keep folding, and switch the scale to kilometers. For about twenty folds, the curve hugs the floor. By then the stack is about a hundred meters, as tall as a thirty storey building. Three folds later, it's taller than the Burj Khalifa, the tallest building in the world. At fold twenty seven, it's thirteen kilometers. That's higher than Mount Everest, and higher than airliners fly. At fold thirty, it's about a hundred and seven kilometers. You've folded your way past the edge of space.

Now picture the stack in thousands of kilometers. The Moon is about three hundred and eighty four thousand kilometers away. At fold forty, the stack is about a hundred and ten thousand kilometers. At fold forty one, two hundred and twenty thousand. Still only partway there. Then fold forty two doubles it again, to about four hundred and forty thousand kilometers. You've passed the Moon. Half the whole journey happened on the very last fold.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S09–S11 · 222 words · about 1:29

```text
We can also run it backwards. How many folds does it take to reach the Moon? Set t times two to the n equal to the distance. Put both in meters, and divide. That gives two to the n equals about three point eight four times ten to the twelve. To solve for an exponent, you use a logarithm. Log base two of that number is forty one point eight. You can't make eight tenths of a fold, so round up. Forty two folds.

Why can't you actually fold paper forty two times? Because every fold that doubles the thickness also halves the paper. Take a standard sheet of printer paper. After seven folds, it's a little block about two centimeters across and more than a centimeter thick. It's nearly a cube, and folding a cube in half is close to impossible. That's why most people get stuck at around seven folds.

For years, people said seven folds was the limit. Then in two thousand and one, a high school student in California named Britney Gallivan got an extra credit challenge. Fold something in half twelve times. She worked out the math first. Then, in January two thousand and two, she folded a strip of toilet paper about one point two kilometers long in half twelve times, all in the same direction.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S12–S15 · 232 words · about 1:33

```text
Her formula gives the length of paper you need for n folds in one direction. L equals pi t over six, times two to the n plus four, times two to the n minus one. Two to the n shows up twice, so the length grows like four to the n. Every extra fold needs about four times more paper. Now plug in forty two folds of printer paper. You'd need a strip about ten to the twenty one meters long. That's roughly a hundred thousand light years, about the width of our galaxy.

This isn't just a party trick. Engineers run into doubling all the time. For decades, the number of transistors on a computer chip doubled about every two years. In a nuclear reactor, each splitting atom releases neutrons that can split more atoms, so the reaction has to be carefully controlled. And money growing at seven percent a year doubles about every ten years. Whenever something doubles at a steady rate, the folded paper curve is waiting.

So here's the one thing to remember. Ten doublings is about a thousand times. Forty two doublings turn a tenth of a millimeter into four hundred and forty thousand kilometers. That's how a sheet of paper, at least on paper, reaches the Moon.

If you enjoyed this one, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```
