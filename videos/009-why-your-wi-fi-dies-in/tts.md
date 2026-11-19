# Voice recording package — Why Your Wi-Fi Dies in One Room

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
Scenes S01–S05 · 264 words · about 1:46

```text
Wi-Fi is perfect next to the router and almost dead in one room. In open space, move twice as far away and you get a quarter of the signal. But that's only half the story. The rest is in your walls.

Let's follow your signal from the router to that room, with one law of physics and a little algebra.

Think of your router as a tiny light bulb for radio waves. In open space, it spreads its power outward. One meter away, that power is spread over a sphere with a radius of one meter. Two meters away, the same power covers a sphere twice as wide. The surface area of a sphere is four pi r squared. Double r, and the area grows by two squared, four times. Same power, four times the area. So every square meter gets a quarter as much.

As an equation, the power landing on each square meter, at distance r, is the power P divided by four pi r squared. That's the inverse square law. Now compare two distances. At twice the distance, the four pi and the P cancel, and you're left with one over two squared. One quarter. Three times as far, one ninth. Ten times as far, one hundredth.

Here's what that looks like. Start at one meter, and call that signal one hundred percent. At two meters, you're down to twenty five percent. At four meters, about six percent. The curve drops steeply at first, then flattens out. Most of the loss happens in the first few meters from the router.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S09 · 256 words · about 1:42

```text
Engineers rarely use percentages for this. They use decibels, because signals cover such a huge range. A change in decibels is ten times the log of the power ratio. A quarter of the power is ten log of one quarter, about minus six decibels. One hundredth of the power is minus twenty. So in decibels, every doubling of distance costs about six decibels, and every ten times the distance costs twenty.

Your phone measures Wi-Fi in dBm, decibels compared to one milliwatt. Zero dBm is one milliwatt. Minus thirty is a thousandth of a milliwatt. Minus seventy, a signal you can still browse on, is one ten-billionth of a watt. Your phone pulls web pages out of that.

Here's a rough guide that Wi-Fi engineers use. Around minus thirty, you're right next to the router. Down to minus fifty is excellent. Minus sixty seven is about the minimum for video calls and streaming. Minus seventy is fine for light browsing and email. By minus eighty, the connection becomes unreliable. And at minus ninety, you'll struggle to connect at all.

Now let's test distance alone. Say your phone reads minus thirty at one meter. Each doubling costs six decibels. Two meters, minus thirty six. Eight meters, minus forty eight. Thirty two meters, minus sixty. On a decibel scale, the steep curve becomes a straight line. And look where it ends. Even thirty two meters away, in open space, you'd still have a good signal. With these numbers, distance alone doesn't explain a dead room.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S10–S13 · 249 words · about 1:40

```text
So what's really happening in that one room? Usually, it's what the signal has to pass through. Every wall takes away a chunk of decibels, no matter how far you are. Typical values at two point four gigahertz: about four decibels for a drywall wall, about eight for brick, and ten to fifteen for concrete. Metal, like a steel door, can take even more.

Now the dead room. It's ten meters from the router, and the signal crosses two drywall walls and one concrete wall, say twelve decibels. Distance first. Ten meters is ten times one meter, so we lose twenty decibels. Minus thirty becomes minus fifty. Now the walls. Four, four and twelve. That's twenty more. Minus fifty becomes minus seventy. The walls cost as much as the distance did.

Here's the same path on a graph. The dashed curve is open space. It only drops to minus fifty at ten meters. The solid line follows your real signal. Every time it hits a wall, it steps straight down. Drywall at three meters, drywall at six, and concrete at eight. By the bedroom, you're at minus seventy, below what video calls need.

So what can you do? Move the router toward the middle of the home, and away from that concrete wall. Now the bedroom is five meters away, through one drywall wall. Five meters costs about fourteen decibels. Minus thirty becomes minus forty four. One wall takes four more. Minus forty eight. That's excellent, without buying anything.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S14–S17 · 208 words · about 1:23

```text
If moving the router isn't possible, the goal is the same: fewer walls between the router and you. Keep it up off the floor and out in the open. Keep it away from big metal objects. And in a large home, or one with concrete walls, a second access point or a mesh system puts a transmitter on the other side of the wall.

The inverse square law isn't just about Wi-Fi. A lamp, a loudspeaker in an open field, a cell tower: anything that spreads out from a small source follows it. Twice the distance, a quarter of the power, minus six decibels. Ten times the distance, one hundredth, minus twenty. That's why engineers who design lighting, sound systems and antennas all start with the same equation.

So why does your Wi-Fi die in one room? In open space, signal follows the inverse square law. Double the distance, a quarter of the power, minus six decibels. But inside a home, walls often cost as much as distance, or more. Count the walls, not just the meters. And the cheapest fix is often just moving the router.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (Twice as far from your router = a quarter of the signal #shorts) → save as `audio/short-1.wav`
Its own recording · 90 words · about 0:36. Same voice and style, with a little more energy.

```text
Move twice as far from your router, and in open space you get a quarter of the signal. Here's why.

Your router's power spreads over a sphere. Its area is four pi r squared. Double the distance, and the same power covers four times the area. So each spot gets a quarter. In decibels, that's minus six for every doubling.

Plot it, and the signal drops steeply. At two meters, twenty five percent. Then the curve flattens out. The full video shows what really kills Wi-Fi in one room.
```

## Short 2 (Your walls are eating your Wi-Fi #shorts) → save as `audio/short-2.wav`
Its own recording · 78 words · about 0:31. Same voice and style, with a little more energy.

```text
Ten meters from your router, your phone should be fine. So why is that bedroom dead? The walls.

With minus thirty dBm at one meter, ten meters of open space costs twenty decibels. Minus fifty. Excellent. But two drywall walls take about four each, and a concrete wall about twelve. That's another twenty. Minus seventy.

The walls cost as much as the distance. Move the router so the signal crosses fewer walls. The full video shows the math.
```
