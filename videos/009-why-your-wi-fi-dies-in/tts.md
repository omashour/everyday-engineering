# Voice recording package — Why Your Wi-Fi Dies in One Room

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
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 009`).

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
| dBm | dee-bee-EM |

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S05 · 269 words · about 1:48

```text
Wi-Fi is perfect next to the router and almost dead in one room. In ideal open space, move twice as far and you receive a quarter of the power. But that's only half the story. The rest is in your walls.

Let's follow your signal from the router to that room, with one law of physics and a little algebra.

Think of your router as a tiny light bulb for radio waves. In ideal open space, its power spreads outward. One meter away, it covers a sphere one meter in radius. Two meters away, the same power covers a sphere twice as wide. A sphere's area is four pi r squared. Double r, and the area grows by two squared, four times. So every square meter gets a quarter as much.

As an equation, the power passing through each square meter, at distance r, is the power P divided by four pi r squared. That's the inverse square law. Your phone's antenna catches a share of that, so if the antennas and frequency stay the same, the power your phone receives follows the same rule. At twice the distance, you're left with one over two squared. One quarter. Three times as far, one ninth. Ten times as far, one hundredth.

Here's what that looks like. Start at one meter, and call the power there one hundred percent. At two meters, you're down to twenty five percent. At four meters, about six percent. The curve looks like it flattens out, but it never really slows down. Every doubling of distance takes away another three quarters of whatever was left.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S09 · 253 words · about 1:41

```text
Engineers usually use decibels for this, because signals cover such a huge range. A change in decibels is ten times the log of the power ratio. A quarter of the power is about minus six decibels. One hundredth is minus twenty. So every doubling of distance costs about six decibels, and every ten times the distance costs twenty.

Your phone measures Wi-Fi in dBm, decibels compared to one milliwatt. Minus thirty dBm is a thousandth of a milliwatt. Minus seventy is one ten-billionth of a watt, and a phone can often still browse on that.

Here's a rough guide. Around minus thirty dBm is an extremely strong signal, right next to the router. Minus fifty is excellent. Around minus sixty seven is a common design target for demanding uses like voice calls. Minus seventy can still support everyday internet use. Around minus eighty, connections may become unreliable. And near minus ninety, staying connected can be difficult. These aren't hard cutoffs. Interference and crowded networks matter too.

Now let's test distance alone, in ideal open space. Say your phone reads minus thirty at one meter. Every time we double the distance, we lose another six decibels. Two meters, minus thirty six. Eight meters, minus forty eight. Thirty two meters, minus sixty. Because we're counting distance in doublings, which is a logarithmic scale, the points fall on a straight line. Even thirty two meters away, the model still gives a reasonably strong signal. With these numbers, distance alone doesn't explain a weak room.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S12 · 245 words · about 1:38

```text
So what's happening in that one room? Usually, it's what the signal has to pass through. Every wall adds its own loss, measured in decibels. At two point four gigahertz, a drywall partition might cost a few decibels. Brick can cost several more. Thick or reinforced concrete can cost much more than that. And metal, like a steel door, can block the signal especially strongly. The exact amount depends on the material, the thickness and how the wall is built.

Now let's build a simplified example. The bedroom is ten meters from the router. The signal crosses two drywall walls, which we'll call four decibels each, and one thick concrete wall, which we'll call twenty two. That's a tough wall, chosen for this example. Distance first. Ten times the distance costs twenty decibels, so minus thirty becomes minus fifty. Then the drywall: minus fifty four, minus fifty eight. Then the concrete: minus eighty. That's weak enough to make the connection unreliable. In a real house, reflections make the signal jump around, but adding the losses gives a useful first estimate.

Here's the same path on a graph. The dashed curve is ideal open space. It only drops to minus fifty at ten meters. The solid line is our example. Every time it hits a wall, it steps straight down. Drywall at three meters, drywall at six, and thick concrete at eight. By the bedroom, our estimate is minus eighty, around where connections can get unreliable.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S13–S15 · 203 words · about 1:21

```text
Now move the router toward the middle of the home, so the signal skips the concrete. In our example, the bedroom is now five meters away, through one drywall wall. Five meters costs about fourteen decibels, so minus forty four. One wall takes four more: minus forty eight. That's thirty two decibels better than before, in our simplified model. Real results vary, but fewer obstacles can make a big difference.

If you can't move the router, bring the Wi-Fi closer to the room. A second access point wired back to the router works especially well. A mesh system can help too, but its units need a good link to each other, so don't put one where the signal is already almost gone. Keep the router high, in the open, away from big metal objects. And two point four gigahertz usually gets through walls better, while five and six gigahertz can be faster up close.

The same idea shows up elsewhere. Light from a small lamp and sound from a speaker in an open field behave this way under ideal conditions. Double the distance, a quarter of the power per square meter, minus six decibels. Ten times the distance, one hundredth, minus twenty.
```

## Chunk 5 → save as `audio/narration-05.wav`
Scenes S16–S17 · 108 words · about 0:43

```text
So why does your Wi-Fi die in one room? In ideal open space, power follows the inverse square law: double the distance, a quarter of the power, minus six decibels. But inside a home, walls can cost as much as distance, or much more. Count the walls, not just the meters. Want to test it? A Wi-Fi analyzer app shows your signal in dBm. Check it near the router, then in the problem room. It measures strength, not speed, but it shows you where the decibels go.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Twice as far from your router = a quarter of the power #shorts) → save as `audio/short-1.wav`
Its own recording · 86 words · about 0:34. Same voice and style, with a little more energy.

```text
Move twice as far from your Wi-Fi router, and in ideal open space, the power you receive drops to a quarter. Here's why.

Radio waves spread outward. A sphere's area is four pi r squared. Double the distance, and the same power covers four times the area. That's a six decibel drop for every doubling.

At two meters, you receive twenty five percent of what you got at one meter. And inside a home, walls can make it much worse. The full video shows why.
```

## Short 2 (Your walls are eating your Wi-Fi #shorts) → save as `audio/short-2.wav`
Its own recording · 81 words · about 0:32. Same voice and style, with a little more energy.

```text
Your Wi-Fi works near the router, but barely reaches the bedroom. Why? Let's estimate it.

Start at minus thirty dBm, one meter from the router. Ten meters of open space costs twenty decibels. Minus fifty. Two drywall walls, four decibels each. Minus fifty eight. And a thick concrete wall, twenty two in this example. Minus eighty.

That's weak enough to make the connection unreliable. Try moving the router so the signal crosses fewer walls. The full video explains the math.
```
