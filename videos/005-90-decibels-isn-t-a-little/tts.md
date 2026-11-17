# Voice recording package — 90 Decibels Isn't a Bit More Than 80. It's 10x the Intensity

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
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 005`).

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
| NIOSH | NYE-osh |
| OSHA | OH-shuh |

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S04 · 194 words · about 1:18

```text
This machine runs at about ninety decibels. A quieter one might run at eighty. That sounds like a small difference. But it's actually ten times the sound intensity. Here's the math, and why it matters for your hearing.

Let's see what a decibel really measures.

Sound carries energy. Engineers measure sound intensity in watts per square meter. Under ideal conditions, the faintest sound a healthy human ear can detect has an intensity of about one trillionth of a watt per square meter. A jet taking off nearby can produce about a hundred watts per square meter. That's a hundred trillion times more intense. A normal numerical scale would be difficult to use across such an enormous range.

So engineers use a logarithmic scale instead. The sound intensity level, L, in decibels, equals ten times the logarithm, base ten, of I divided by I zero. Here, I zero is the reference intensity: one trillionth of a watt per square meter. A logarithm tells us how many factors of ten are involved. Ten times the reference intensity gives ten decibels. A hundred times gives twenty decibels. And a trillion times gives one hundred and twenty decibels.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S05–S08 · 278 words · about 1:51

```text
Here's how everyday sounds compare. The reference threshold of human hearing is zero decibels. A soft whisper, around thirty decibels, has a thousand times the reference intensity. Normal conversation, around sixty, has a million times. A loud motorcycle engine, around ninety five, has roughly three billion times. And a jet taking off nearby, around a hundred and forty decibels, has a hundred trillion times. These levels are approximate and depend on the source and distance. But the mathematical relationship is always the same: every thirty decibels represents another factor of a thousand.

Now back to our machines. Going from eighty to ninety decibels adds ten. In the formula, ten more decibels means the logarithm increases by exactly one. And that means one additional factor of ten. So ninety decibels represents ten times the sound intensity of eighty. Go up to a hundred decibels, and the intensity is a hundred times that of the original eighty decibel sound.

Here's a smaller increase with a surprisingly big meaning. What happens when you double the intensity? The change in sound level is ten times the logarithm of two. That's approximately three decibels. So every three decibel increase nearly doubles the sound intensity. Going from eighty five to eighty eight decibels is approximately a doubling.

What happens when two independent machines each produce eighty decibels at your listening position? You don't add the decibel numbers. You add their sound intensities. Two machines produce twice the intensity, giving approximately three decibels more. So eighty plus eighty makes about eighty three decibels. Ten identical, independent machines, each producing eighty decibels at that position, produce ten times the combined intensity of one machine: ninety decibels.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S09–S11 · 264 words · about 1:46

```text
But does ninety decibels sound ten times louder than eighty? Not necessarily. Perceived loudness is different from physical sound intensity. For many everyday sounds, a ten decibel increase is perceived as roughly twice as loud. So the louder machine may sound about twice as loud, even though its intensity is ten times greater. That distinction becomes especially important when protecting your hearing.

This is why workplace noise guidelines consider both sound level and exposure time. NIOSH, the U.S. agency that researches occupational safety and health, recommends an eight hour exposure limit of eighty five A-weighted decibels. For every three decibel increase, the recommended exposure duration is cut in half. At eighty eight decibels, that's four hours. At ninety one, two hours. And at one hundred decibels, just fifteen minutes. OSHA's legal limit for general industry is less protective: ninety decibels over eight hours, with exposure duration halved for every five decibel increase. These limits are based on long term hearing risk considerations, not a guarantee of safety for every individual.

Let's return to the machines from the beginning. Using the NIOSH exchange rate formula, the recommended exposure duration in hours equals eight divided by two raised to the power of the sound level minus eighty five, divided by three. At eighty decibels, the sound is below NIOSH's eighty five decibel reference level for an eight hour workday. But at ninety decibels, the recommended exposure duration falls to approximately two and a half hours. A difference of just ten decibels means ten times the sound intensity and a dramatic reduction in recommended exposure time.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S12–S14 · 126 words · about 0:50

```text
Decibels aren't just for sound. Engineers use them for wireless signals, amplifier gain, and electronic noise. They're useful whenever we need to compare quantities that can vary across enormous numerical ranges. A logarithmic scale compresses those differences into numbers that are much easier to work with.

So here's what to remember. Three decibels more means approximately twice the sound intensity. Ten decibels more means ten times the intensity. And over the same amount of time, ten times the intensity means ten times the sound energy reaches a given area. That's why ninety decibels isn't just a little more than eighty. It's a tenfold increase in sound intensity.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Why 90 dB is 10x more intense than 80 dB #shorts) → save as `audio/short-1.wav`
Its own recording · 76 words · about 0:30. Same voice and style, with a little more energy.

```text
Ninety decibels sounds like just a bit more than eighty. It's actually ten times the sound intensity.

Decibels are ten times the logarithm of the intensity ratio. Ten more decibels means the logarithm goes up by one. That's one more factor of ten.

So a hundred decibels is a hundred times the intensity of eighty. And at ninety, the safe daily exposure drops to about two and a half hours. The full video shows the math.
```

## Short 2 (Two 80 dB machines don't make 160 dB #shorts) → save as `audio/short-2.wav`
Its own recording · 72 words · about 0:29. Same voice and style, with a little more energy.

```text
Two machines, each at eighty decibels. Together, are they a hundred and sixty? Not even close. You don't add decibels. You add the sound intensities.

Two machines give twice the intensity. Ten times the log of two is about three. So eighty plus eighty is about eighty three decibels. It takes ten machines to reach ninety. That's why a noisy factory floor is never hundreds of decibels. The full video shows why.
```
