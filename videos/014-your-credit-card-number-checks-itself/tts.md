# Voice recording package — Your Credit Card Number Checks Itself

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
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 014`).

If a chunk is too long for the tool, split it at a paragraph break and save the parts as e.g. narration-02a.wav and narration-02b.wav (files are joined in name order).

## Style instructions
```
A clear, warm, confident engineering teacher talking to one curious student. Energetic and intriguing in the opening hook, then calm and steady for explanations. Natural pace (about 150 words per minute), short pauses between sentences and a longer pause between paragraphs. Emphasize the surprising number or result in each section. Never rush through math. Read digit strings one digit at a time with a tiny pause between groups: 'four five three nine, one four eight nine'.
```

## Pronunciation
| Term | Say it like |
|---|---|
| Torricelli | tor-ih-CHEL-ee |
| clothoid | KLOTH-oyd |
| Euler | OY-ler |
| Bernoulli | ber-NOO-lee |
| Laplace | la-PLAHSS |
| Luhn | loon |

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S06 · 264 words · about 1:46

```text
Mistype one digit of your card number, and many websites know instantly. Before they ever contact your bank. There's no list of real cards in your browser. The number checks itself, with a bit of grade school arithmetic.

Here's the trick hiding in every card number.

A card number isn't random. The first few digits identify the card network and the bank that issued it. The middle digits identify your account. And the very last digit isn't part of your account at all. It's a check digit, calculated from all the others. Its only job is to catch mistakes.

The method is called the Luhn algorithm, after Hans Peter Luhn, an IBM scientist who patented it in nineteen sixty. It was designed long before online shopping, to catch errors when people copied or typed long numbers by hand.

Grab a pen if you want to follow along. Let's run it on a short made-up number: four five three nine, one four eight nine. Real cards have sixteen digits, but the steps are exactly the same. Start at the right, with the check digit. Leave it alone. Then double every second digit as you move left: the eight, the one, the three and the four. Leave the others as they are.

Now double them. Four becomes eight. Three becomes six. One becomes two. Eight becomes sixteen, and that's two digits. So add them: one plus six is seven. That's the only extra rule. If doubling gives a two digit number, add its digits together, or just subtract nine. Sixteen minus nine is also seven.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S07–S10 · 254 words · about 1:42

```text
Now add everything up. Eight, five, six, nine, two, four, seven, nine. That's fifty. And here's the rule. If the total ends in zero, the number passes. Fifty ends in zero, so this number is valid. The check digit, that last nine, was chosen to make that happen.

So how does the card company pick that last digit? Run the same steps on the other seven digits. Here they add up to forty one. The next number that ends in zero is fifty. Fifty minus forty one is nine. So the check digit is nine. Change any of the other digits and you'd get a different check digit, but the total would still end in zero. Every card number is built this way.

Now make a typo. Say you type a seven where the second four should be. Four five three nine, one seven eight nine. That digit wasn't doubled, so the total goes up by three, to fifty three. Fifty three doesn't end in zero. The form rejects it instantly, without asking anyone.

Here's why this never misses a single wrong digit. For the digits that aren't doubled, changing one changes the total by one to nine. That can never land on another number ending in zero. For doubled digits, look at what each one turns into. Zero through nine become zero, two, four, six, eight, one, three, five, seven, nine. All ten results are different. So changing any one digit always changes the total by something that isn't a multiple of ten.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S11–S14 · 273 words · about 1:49

```text
Another common typing mistake is swapping two neighbors. Type three nine as nine three, and a plain sum wouldn't notice, because the same digits are still there. But one of the pair is doubled and the other isn't. Three doubled plus nine, which is fifteen, becomes nine doubled plus three, which is twelve. The total drops to forty seven. Caught.

It isn't perfect. Swap a zero and a nine that sit side by side, and the total doesn't change, because zero doubled is zero and nine doubled folds back to nine. Change two digits at once, and roughly one time in ten the errors cancel. And it says nothing about whether a card is real, has money, or belongs to you. It's a typo filter, not security.

Once you know the trick, you'll find check digits everywhere. The last digit under a supermarket barcode is a check digit, using weights of three and one instead of doubling. Books have one in their ISBN. And your phone's fifteen digit IMEI number ends with a Luhn check digit too. The details differ, but the idea is the same: one digit computed from the rest.

This is a big idea in engineering. Add a little redundancy, one digit computed from the others, and you can detect errors without knowing the right answer. A random wrong number only passes one time in ten. The same idea, scaled up, protects files you download and messages your phone sends, using checksums that are far more powerful. Engineers call this error detection. It doesn't fix the mistake. It just tells you something is wrong, so you can type it again.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S15–S18 · 151 words · about 1:00

```text
Your turn. What check digit makes one two three four valid? Pause and try it.

Start from the right. The check digit goes at the end, so the four next to it gets doubled, to eight. Keep the three. Double the two, to four. Keep the one. Eight plus three plus four plus one is sixteen. The next number ending in zero is twenty, so the check digit is four. One two three four four.

So the next time a form rejects your card number before you've even finished, you'll know what happened. It doubled every second digit, added everything up, and checked for a zero at the end. One extra digit catches every single typo, and nearly every swap of neighbors. It's a tiny piece of math hiding in your wallet.

If you enjoyed this one, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Your card number checks itself #shorts) → save as `audio/short-1.wav`
Its own recording · 97 words · about 0:39. Same voice and style, with a little more energy.

```text
Mistype one digit of your card number and many websites know instantly, without asking your bank. That's because the last digit is a check digit, calculated from all the others.

Here's the check. Double every second digit, starting next to the check digit. If you get two digits, add them, so sixteen becomes seven. Then add everything up. A real card number always totals something ending in zero.

Change any single digit and the total can't end in zero anymore. So every one digit typo gets caught, instantly. The full video works through an example by hand.
```

## Short 2 (Why swapping two digits doesn't fool your card #shorts) → save as `audio/short-2.wav`
Its own recording · 85 words · about 0:34. Same voice and style, with a little more energy.

```text
Swap two neighboring digits in your card number, and the website still catches it. A plain sum wouldn't. Here's the trick.

Every second digit gets doubled. So if three and nine swap places, three doubled plus nine is fifteen. But nine doubled, folded to nine, plus three is only twelve. The total changes, and the check fails.

There's exactly one swap it misses: zero and nine, because zero doubled is zero and nine doubled folds back to nine. The full video shows the whole trick.
```
