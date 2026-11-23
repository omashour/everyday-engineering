# Voice recording package — Your Credit Card Number Checks Itself

Generated from scenes.yaml.

## Settings
- **Model:** gemini-3.8-flash-tts
- **Voice:** Cruz
- **Language:** English
- **Chunks:** 5 (about 280 words max each, split at scene boundaries)
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
Scenes S01–S06 · 241 words · about 1:36

```text
Mistype one digit of your card number, and a checkout form can spot it before it contacts your bank. There's no list of real cards in your browser. All it needs is a little arithmetic.

Here's the trick behind that check.

A card number isn't random. The first digits identify the card issuer. The digits after that identify the account. And the last digit is a check digit, calculated from all the others. Its only job is to catch mistakes.

The method is named after Hans Peter Luhn of IBM. His patent for a device that calculated and checked these digits was granted in nineteen sixty, decades before online shopping.

Grab a pen if you want to follow along. Let's run it on a short made-up number: four five three nine, one four eight nine. Many cards have sixteen digits. American Express cards have fifteen. The steps are the same either way. Start at the right, with the check digit. Leave it alone. Then double every second digit as you move left: the eight, the one, the three and the four. Leave the others as they are.

Now double them. Four becomes eight. Three becomes six. One becomes two. Eight becomes sixteen, and that's two digits. So add them: one plus six is seven. That's the only extra rule. If doubling gives a two digit number, add its digits together, or just subtract nine. Sixteen minus nine is also seven.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S07–S09 · 201 words · about 1:20

```text
Now add everything up. Eight, five, six, nine, two, four, seven, nine. That's fifty. And here's the rule. If the total ends in zero, the number passes. Fifty ends in zero, so this example passes the Luhn check. The check digit, that last nine, was chosen to make that happen.

So how is that last digit chosen? Leave a space for the check digit, then work from right to left, starting by doubling the digit next to that space. Here the first seven digits add up to forty one. The next number that ends in zero is fifty. Fifty minus forty one is nine, so the check digit is nine. If the total already ended in zero, the check digit would be zero. Change any one of the other digits, and you'd get a different check digit. That's how a Luhn check digit is chosen.

Now make a typo. Say you type a seven where the second four should be. Four five three nine, one seven eight nine. That digit wasn't doubled, so the total goes up by three, to fifty three. Fifty three doesn't end in zero. The number fails the check, and the form can flag it right there.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S12 · 223 words · about 1:29

```text
Here's why this never misses a typo that replaces one digit with another. For the digits that aren't doubled, changing one changes the total by one to nine. That can never land on another number ending in zero. For doubled digits, look at what each one turns into. Zero through nine become zero, two, four, six, eight, one, three, five, seven, nine. All ten results are different. So changing any one digit always changes the total by something that isn't a multiple of ten.

Another common typing mistake is swapping two neighbors. Type three nine as nine three, and a plain sum wouldn't notice, because the same digits are still there. But one of the pair is doubled and the other isn't. Three doubled plus nine, which is fifteen, becomes nine doubled plus three, which is twelve. The total drops to forty seven. Caught.

It isn't perfect. Swap a zero and a nine that sit side by side, and the total doesn't change, because zero doubled is zero and nine doubled folds back to nine. That's the only swap of two different neighbors it misses. Two wrong digits can sometimes cancel each other out. And passing the check only tells you the arithmetic works. It can't tell you whether the card was issued, who owns it, or whether a payment will be approved.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S13–S16 · 241 words · about 1:36

```text
Once you know the trick, you'll find check digits everywhere. The last digit in a standard UPC or EAN barcode is a check digit. It uses alternating weights of one and three. A book's thirteen digit ISBN uses those same weights. And the fifteen digit IMEI you see on your phone ends in a Luhn check digit. The details differ, but the idea is the same: one digit computed from the rest.

This is a big idea in engineering. Add a little redundancy, one digit computed from the others, and you can detect errors without knowing the right answer. For any given set of starting digits, only one of the ten possible last digits passes the check. The same idea, scaled up, helps detect errors in files you download and messages your phone sends, using checksums that are far more powerful. Engineers call this error detection. It doesn't fix the mistake. It just tells you something is wrong, so you can type it again.

Your turn. What check digit makes one two three four pass the check? Pause and try it.

Start from the right. The check digit goes at the end, so the four next to it gets doubled, to eight. Keep the three. Double the two, to four. Keep the one. Eight plus three plus four plus one is sixteen. The next number ending in zero is twenty, so the check digit is four. One two three four four.
```

## Chunk 5 → save as `audio/narration-05.wav`
Scenes S17–S18 · 87 words · about 0:35

```text
So the next time a checkout form flags a completed card number before you submit it, this little calculation may be the reason. It doubles every second digit, adds everything up, and checks for a zero at the end. One extra digit catches every one-digit substitution, and all but one kind of swap between different neighboring digits. It's a tiny piece of math hiding in your wallet.

If you enjoyed this one, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Your card number checks itself #shorts) → save as `audio/short-1.wav`
Its own recording · 100 words · about 0:40. Same voice and style, with a little more energy.

```text
A checkout form can spot a one digit typo without asking your bank. The last digit is a check digit, calculated from all the others.

Here's the check. Double every second digit, starting next to the check digit. If you get two digits, add them, so sixteen becomes seven. Then add everything up. If the total ends in zero, the number passes the Luhn check.

Replace any one digit in a number that passes, and the new total can't end in zero. So every one digit typo like that gets caught. The full video works through an example by hand.
```

## Short 2 (The one digit swap your card number check misses #shorts) → save as `audio/short-2.wav`
Its own recording · 95 words · about 0:38. Same voice and style, with a little more energy.

```text
Swap two different neighboring digits in a card number, and the Luhn check usually catches it. A plain sum wouldn't. Here's the trick.

Every second digit gets doubled. So if three and nine swap places, three doubled plus nine is fifteen. But nine doubled, folded to nine, plus three is only twelve. The total changes, and the check fails.

There's one exception for different neighboring digits. Swap zero and nine, and the total stays the same, because zero doubled is zero and nine doubled folds back to nine. The full video shows the whole trick.
```
