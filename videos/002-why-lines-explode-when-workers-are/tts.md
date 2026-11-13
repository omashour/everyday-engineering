# Voice recording package — Why Lines Explode When Workers Are Almost Busy

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
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 002`).

If a chunk is too long for the tool, split it at a paragraph break and save the parts as e.g. narration-02a.wav and narration-02b.wav (files are joined in name order).

## Style instructions
```
A clear, warm, confident engineering teacher talking to one curious student. Energetic and intriguing in the opening hook, then calm and steady for explanations. Natural pace (about 150 words per minute), short pauses between sentences and a longer pause between paragraphs. Emphasize the surprising number or result in each section. Never rush through math. Land the jump from nine to nineteen minutes clearly each time it comes up.
```

## Pronunciation
| Term | Say it like |
|---|---|
| Torricelli | tor-ih-CHEL-ee |
| clothoid | KLOTH-oyd |
| Euler | OY-ler |
| Bernoulli | ber-NOO-lee |
| Laplace | la-PLAHSS |
| rho | row |
| mu | myoo |
| Kingman | KING-man |

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S04 · 212 words · about 1:25

```text
This cashier is busy ninety percent of the time. The average wait in her line is nine minutes. Make her busy ninety five percent of the time, and the wait jumps to nineteen. Here's why.

It's one of the most useful equations in engineering, and it starts with a simple question.

Start with two numbers. The first is how fast customers arrive. Say fifty four people join the line every hour. Engineers call this the arrival rate, lambda. The second is how fast the cashier can serve them. On average she takes one minute per customer, so she can serve sixty an hour. That's the service rate, mu. Divide the first by the second and you get the utilization, rho. Fifty four over sixty is zero point nine. She's busy ninety percent of the time, and free the other ten.

Here's a puzzle. If she's free ten percent of the time, why is there a line at all? Because customers don't arrive on a schedule. If one person showed up exactly every sixty seven seconds, nobody would ever wait. But real customers arrive at random. Sometimes three walk up at once. Sometimes nobody comes for minutes. The bursts build a line. The quiet gaps are idle time she can never get back.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S05–S08 · 260 words · about 1:44

```text
Queueing theory turns this into one formula. For one cashier, with random arrivals and random service times, the average wait in line is rho over one minus rho, times the average service time. Look at the bottom of that fraction. One minus rho is the spare capacity. It's the share of time she's free. At ninety percent busy, the spare capacity is zero point one. Nine tenths divided by one tenth is nine. Times one minute, that's a nine minute wait.

Now run the same formula for other levels of busy. At fifty percent busy, the wait is one minute. Seventy five percent gives three minutes. Eighty percent gives four. Ninety percent, nine minutes. Ninety five percent, nineteen minutes. And at ninety nine percent busy, the average wait is ninety nine minutes.

Plot it and you get this curve. For a long time it barely rises. Going from zero to seventy percent busy adds only a little over two minutes of waiting. Then the curve bends upward, and past ninety percent it shoots almost straight up. It looks like a hockey stick. Every extra percent of busy costs more waiting than the one before.

So why does going from ninety to ninety five percent double the wait? Look at the spare capacity again. At ninety percent, she's free ten percent of the time. At ninety five, only five percent. You've cut her spare time in half, and the spare time sits on the bottom of the fraction. Halve the bottom, and you roughly double the answer. Nine minutes becomes nineteen.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S09–S12 · 268 words · about 1:47

```text
And what if she's busy one hundred percent of the time, with customers arriving exactly as fast as she can serve them? The spare capacity is zero, and you'd be dividing by zero. In practice, the line never settles down. Every random burst adds people, and there's no quiet time to clear them. On average, the line just keeps growing.

Notice what causes all this. Randomness. A more general version, called Kingman's formula, adds a variability factor. It measures how unpredictable the arrivals and service times are. Fully random, like our cashier, the factor is one. Make everything perfectly regular, and it drops to zero, and so does the wait. That's why engineers fight variability. Appointment slots, scheduled deliveries and standard work all shorten a line without hiring anyone.

This one curve shapes a lot of design decisions. Call centers use queueing math like this to decide how many agents to staff. Hospitals keep spare beds, because a full ward means long waits for the next patient. Computer servers slow to a crawl as they near full load. And in factories, a machine that's almost always busy piles up unfinished parts in front of it.

Three more customers an hour can double your wait in line. This cashier can serve sixty customers an hour. With thirty arriving each hour, the average wait is one minute. With fifty four, it's nine. Add just three more, to fifty seven, and the wait jumps to nineteen minutes. On the manager's spreadsheet, that's a better day. Less idle time, lower cost per customer. For the people in line, it's twice the wait.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S13–S14 · 82 words · about 0:33

```text
So here's what to remember. Waiting time depends on spare capacity, not on how busy things look. The last few percent of busy are the most expensive. And there are two ways to shorten a line. Add capacity, or remove randomness. Next time you're stuck in a slow line, look at the cashier. If she never gets a break, now you know why.

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!
```
