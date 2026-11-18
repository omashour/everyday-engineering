# Voice recording package — On Opening Day, This Bridge Started Swaying

Generated from scenes.yaml.

## Settings
- **Model:** gemini-3.8-flash-tts
- **Voice:** Cruz
- **Language:** English
- **Chunks:** 6 (about 280 words max each, split at scene boundaries)
- **Shorts:** 2 separate recordings (short-1.wav …)

## How to record
1. Open the Gemini speech generation page in Google AI Studio and pick the model and voice above.
2. Paste the **Style instructions** below into the style / instructions field (not into the text).
3. For each chunk: paste the chunk text, generate, listen once, download the WAV and save it with the file name shown, in the video's `audio` folder (or drop it on the app).
4. Check the pronunciation list while listening; regenerate any chunk that mispronounces a term.
5. Then time the narration (app: "Time the narration", or `npm run transcribe -- 006`).

If a chunk is too long for the tool, split it at a paragraph break and save the parts as e.g. narration-02a.wav and narration-02b.wav (files are joined in name order).

## Style instructions
```
A clear, warm, confident engineering teacher talking to one curious student. Energetic and intriguing in the opening hook, then calm and steady for explanations. Natural pace (about 150 words per minute), short pauses between sentences and a longer pause between paragraphs. Emphasize the surprising number or result in each section. Never rush through math. Story tone in the opening and the timeline; calm and steady through the matrix scenes.
```

## Pronunciation
| Term | Say it like |
|---|---|
| Torricelli | tor-ih-CHEL-ee |
| clothoid | KLOTH-oyd |
| Euler | OY-ler |
| Bernoulli | ber-NOO-lee |
| Laplace | la-PLAHSS |
| Thames | TEMZ |
| Arup | AH-rup |

## Chunk 1 → save as `audio/narration-01.wav`
Scenes S01–S05 · 223 words · about 1:29

```text
In June two thousand, London opened a brand new footbridge across the Thames. Within two days it was swaying so badly they had to close it. The culprit was a hidden number every structure has: its natural frequency.

Let's find that number, with a little linear algebra.

This is the Millennium Bridge, London's showpiece for the new millennium. It's a sleek steel suspension bridge, with a main span of one hundred forty four meters. It opened on the tenth of June, two thousand. An estimated eighty to one hundred thousand people walked across that first day. Then the deck began to move sideways. On the eleventh, officials limited the crowds, but the shaking kept coming back. On the twelfth of June, just two days after opening, the bridge was closed.

How bad was it? Measurements showed the deck swinging sideways by around seven centimeters, with sideways accelerations up to a quarter of g. That's enough to throw you off balance. Many people grabbed the handrails just to stay upright. Others walked with their feet spread wide, like sailors on a rolling deck.

So what went wrong? It wasn't the wind. And the bridge was strong enough to carry the crowds. The problem was how it moved. To understand that, we need one idea that every structural engineer has to check: the natural frequency.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S08 · 273 words · about 1:49

```text
Start with the simplest structure there is: a mass on a spring. Pull it sideways and let go. It swings back and forth at one particular rate, all by itself. That rate is its natural frequency. It depends on just two things: how stiff the spring is, k, and how heavy the mass is, m. The natural frequency f equals one over two pi, times the square root of k over m. Stiffer means faster. Heavier means slower. A bridge deck works the same way. The steel is the spring, and the deck's own weight is the mass.

Now add a second mass. Two masses, joined by three springs, wall to wall. Write Newton's law for each mass and you get two equations tangled together. Linear algebra packs them into one line. K is the stiffness matrix, M is the mass matrix, and v lists how far each mass moves. We look for special motions where everything swings at one shared frequency, omega. That gives K v equals omega squared M v. This is an eigenvalue problem. The eigenvalues give the squared frequencies. The eigenvectors give the shapes of the motion.

Let's solve it. Divide through by m, and write lambda for omega squared divided by k over m. An eigenvalue is a value of lambda that makes this determinant zero. Two minus lambda, squared, must equal one. So lambda is exactly one or three. The squared frequencies are k over m, and three times k over m. If the first frequency is one hertz, the second is root three times higher, about one point seven three hertz. Two masses, two natural frequencies.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S09–S12 · 276 words · about 1:50

```text
Each eigenvalue comes with an eigenvector, called a mode shape. In the first mode, both masses swing together, in the same direction. That's the slow one, at one hertz. In the second mode, they swing against each other. That's the fast one, at one point seven three hertz. Any motion of this system, however messy, is just a mix of these two modes.

A real bridge works the same way, only bigger. Engineers model it as thousands of small masses and springs. A computer finds the eigenvalues of matrices with thousands of rows. Each one is a natural frequency, with its own mode shape: bending up and down, twisting, or swaying sideways. For footbridges, the lowest few modes matter most, because they sit closest to the rhythm of human walking.

So what's the rhythm of walking? Most people take about two steps every second. Each step pushes down, so the up and down force comes at about two hertz. Now watch from above. You shift your weight onto your left foot, then your right foot. One full side to side sway takes two steps. So walking also pushes sideways, at about one hertz. That's half your step rate.

Now compare. People walking push sideways at somewhere between about point seven and one point two hertz. The Millennium Bridge's south span had a sideways mode at point seven seven hertz. In the centre span, the strongly excited mode was close to one hertz. Right in the middle of the walking band. Engineers now know that any footbridge with a sideways mode below about one point three hertz is at risk, if it's light enough and crowded enough.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S13–S15 · 233 words · about 1:33

```text
When a push matches a natural frequency, you get resonance. Think of pushing a child on a swing. Small pushes, in time, build a big motion. This graph is for an example structure with a natural frequency of one hertz. It shows how much the structure magnifies a steady push. Far from one hertz, almost nothing happens. Right at one hertz, with five percent damping, the motion is about ten times bigger. The peak is roughly one over two zeta, where zeta is the damping. Raise the damping to twenty percent and the peak drops to about two and a half.

But there's a twist. Normally, a crowd's footsteps are random, so their sideways pushes mostly cancel out. When the deck starts to sway, walking gets awkward. So people widen their stance and, without thinking, time their steps to the bridge's motion. Now hundreds of people push sideways together, in time with the sway. That adds more energy. More sway makes even more people fall into step. It's a feedback loop. Engineers call it synchronous lateral excitation.

Arup's engineers tested this on the closed bridge with groups of walkers. They slowly added more and more people. Nothing much happened, until about one hundred sixty five people were on one span. Then the wobble switched on, suddenly. Below that number, the bridge's own damping soaked up the crowd's pushes. Above it, the crowd won.
```

## Chunk 5 → save as `audio/narration-05.wav`
Scenes S16–S19 · 265 words · about 1:46

```text
The fix wasn't to rebuild the bridge. It was to add damping, just like in the graph. Engineers fitted thirty seven fluid viscous dampers, a lot like the shock absorbers in a car, to soak up the sideways motion. They also added around fifty tuned mass dampers, weights on springs that calm the up and down motion. The work cost about five million pounds. Then they tested it with crowds of up to two thousand people. No wobble.

In February two thousand two, the Millennium Bridge reopened. The dampers are tucked under and beside the deck, mostly out of sight. The bridge has the same light, slender shape it always had. But the crowd's pushes now get soaked up before they can build, and the wobble hasn't come back since.

This isn't just about one bridge. Every structure has natural frequencies, and engineers check them. Tall buildings are checked against wind and earthquakes. Stadium stands are checked against crowds jumping to music. Washing machines are designed so the spin cycle doesn't shake the floor. And aircraft wings are checked so the air can't set them flapping. Each time, the question is the same: what are the eigenvalues, and is anything pushing near them?

So remember this. Every structure has natural frequencies, and they come from the eigenvalues of its stiffness and mass. If something pushes near one of them, the motion builds. Engineers have two ways out: move the frequency away from the push, or add damping so the peak stays small. On the Millennium Bridge, it took a crowd of walkers to prove it.
```

## Chunk 6 → save as `audio/narration-06.wav`
Scenes S20–S20 · 18 words · about 0:07

```text
If you liked this video, give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (This bridge closed 2 days after opening #shorts) → save as `audio/short-1.wav`
Its own recording · 96 words · about 0:38. Same voice and style, with a little more energy.

```text
In two thousand, London opened a brand new footbridge. Two days later, it had to close.

Here's why. When you walk, your body sways left and right about once every second. That's one hertz. The bridge's natural sideways sway was close to one hertz too. So thousands of footsteps were pushing it in time with its own rhythm.

That's resonance. Push something at its natural frequency and every push adds to the last, like pushing a swing. Engineers fixed it with dampers, and the wobble never came back. The full video shows the math behind it.
```

## Short 2 (165 people made this bridge wobble #shorts) → save as `audio/short-2.wav`
Its own recording · 90 words · about 0:36. Same voice and style, with a little more energy.

```text
With fewer than about one hundred sixty five people on it, this bridge stayed calm. A few more, and it suddenly wobbled.

Here's the trap. When the deck sways a little, people adjust their steps to keep their balance. Without noticing, they step in time with the bridge. Now all their sideways pushes add up, and the sway grows. More sway, more people in step.

Below the tipping point, the bridge's damping soaks up the pushes. Above it, the crowd wins. The full video shows the math behind the wobble.
```
