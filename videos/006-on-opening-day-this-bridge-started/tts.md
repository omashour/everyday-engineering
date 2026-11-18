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
Scenes S01–S05 · 247 words · about 1:39

```text
On opening day, London's new footbridge began swaying sideways. People grabbed the railings. Two days later, the bridge closed. Engineers had two questions. How does a bridge like this move? And why did a crowd make that motion grow?

The first question takes a little linear algebra.

This is the Millennium Bridge, London's showpiece for the new millennium. It's a sleek steel suspension bridge, with a main span of one hundred forty four meters. It opened on the tenth of June, two thousand. An estimated eighty to one hundred thousand people crossed that first day, with about two thousand on the bridge at the busiest moments. Soon the deck was moving sideways. Crowd numbers were limited, and on Sunday the sway came less often. But it kept coming back. On the twelfth of June, just two days after opening, the bridge was closed.

How bad was it? Engineers later estimated the motion from what people saw and from video. The centre span was swinging sideways by about seven centimeters, with peak sideways accelerations of up to about a quarter of g. People were struggling to keep their balance. Many stopped walking, and some grabbed the railings just to stay upright.

To engineers, that motion raises two questions. First, how does this bridge tend to move? That's about its natural frequencies and mode shapes. Second, why did the motion grow instead of dying out? That's about energy. Let's start with the first, using the simplest structure there is.
```

## Chunk 2 → save as `audio/narration-02.wav`
Scenes S06–S08 · 269 words · about 1:48

```text
Picture a single mass on a spring. Pull it sideways and let go. It swings back and forth at one particular rate, all by itself. That rate is its natural frequency. It depends on two things: how stiff the spring is, k, and how much mass is moving, m. The natural frequency f equals one over two pi, times the square root of k over m. Stiffer means faster. More mass means slower. A real bridge works on the same idea, except its stiffness and mass are spread throughout the whole structure.

Now take two identical masses, joined by three identical springs, wall to wall. We'll ignore damping for now. Write Newton's law for each mass and you get two equations tangled together. Linear algebra packs them into one line. K is the stiffness matrix, M is the mass matrix, and v lists how far each mass moves. We look for motions where everything swings at one shared angular frequency, omega. That gives K v equals omega squared M v. It's an eigenvalue problem. To turn omega into hertz, divide by two pi.

Let's solve it. Divide both sides by k, and call m omega squared over k, lambda. That leaves a matrix with twos on the diagonal and minus ones off it. An eigenvalue is a lambda that makes this determinant zero. That gives two minus lambda, squared, minus one, equals zero. So lambda is one or three. For this example, let's choose the springs and masses so the first frequency is one hertz. Then the second is root three times higher, about one point seven three hertz.
```

## Chunk 3 → save as `audio/narration-03.wav`
Scenes S09–S11 · 217 words · about 1:27

```text
Each eigenvalue comes with an eigenvector, called a mode shape. In the first mode, both masses move together. The middle spring stays the same length. That's the one hertz mode. In the second, they move in opposite directions. Now the middle spring stretches and compresses too, so that mode has a higher frequency, about one point seven three hertz. In this model, any free vibration can be described as a combination of these two modes.

A real bridge works the same way, only bigger. Engineers build a finite element model, a computer model of how mass and stiffness are spread through the structure. That gives matrices with thousands of rows. Their eigenvalues are squared angular frequencies. Their eigenvectors describe the mode shapes: bending up and down, twisting, or swaying sideways. For a footbridge, the low modes are the ones to watch, because they're close to the rhythm of walking.

So what's the rhythm of walking? Most people take about two steps every second. Each step pushes down, so the main up and down force comes at about two hertz. Now watch from above. You shift your weight onto your left foot, then your right foot. One full left-right cycle takes two steps. So the sideways force comes at about one hertz. That's half your step rate.
```

## Chunk 4 → save as `audio/narration-04.wav`
Scenes S12–S14 · 273 words · about 1:49

```text
Now look at the bridge. The south span swayed at about point seven seven hertz. The centre span swayed near point nine five hertz, close to that one hertz walking rhythm. So far, that sounds like simple resonance. But the centre span also swayed at just under point five hertz. That's about half the walking rhythm, far from a match. So comparing walking with one bridge frequency can't be the whole story.

Here's what resonance looks like when a steady outside force pushes on a structure. Think of pushing a child on a swing. Small pushes, in time, build a big motion. This example structure has a natural frequency of one hertz. The graph compares its motion with how far the same force would move it if you pushed very slowly. At very low frequencies, the ratio is about one. At one hertz, with five percent damping, it's ten times. With twenty percent damping, it's two and a half times. Damping keeps the peak down. But a crowd isn't a steady outside force. A moving bridge changes how people push on it.

For years, the popular explanation was that walkers fell into step with each other. Newer research shows they don't have to. On this bridge, the deck itself changed how people walked. As it shifted under their feet, they adjusted their steps to stay balanced. On average, those adjustments fed energy back into the sideways motion, even when people were walking out of step. So think of each sway as a balance. Walkers add energy. Damping takes energy away. If damping wins, the sway fades. If the walkers win, the sway grows.
```

## Chunk 5 → save as `audio/narration-05.wav`
Scenes S15–S19 · 274 words · about 1:50

```text
Engineers saw this tipping point in a test. After the closure, they gradually added walkers to one span. With around one hundred sixty five people on the test span, the sway began to grow sharply. Past that point, the crowd was putting energy into the motion faster than the bridge could lose it.

Making the bridge much stiffer would have changed its look completely. So instead, engineers added damping, to take energy out. They fitted thirty seven fluid viscous dampers, a lot like the shock absorbers in a car, mainly for the sideways motion. They also installed fifty two tuned mass dampers for the up and down motion. The work cost about five million pounds. In tests of the modified bridge, with about two thousand people, the motion stayed at acceptable levels.

On the twenty second of February, two thousand two, the Millennium Bridge reopened. The dampers sit under and beside the deck, mostly out of sight. The bridge kept its light, slender shape, and its natural frequencies still describe how it can move. What changed is the balance. The dampers now take energy out faster than a normal crowd puts it in.

The same two questions come up wherever crowds meet structures. Take stadium stands. Engineers check their natural frequencies, so a crowd jumping to music doesn't line up with them. And they check there's enough damping for the energy a crowd can put in.

So remember this. The eigenvalues told engineers how fast the bridge could sway. Whether that sway faded or grew depended on how much energy the crowd added and how much the bridge dissipated. The dampers tipped that balance.
```

## Chunk 6 → save as `audio/narration-06.wav`
Scenes S20–S20 · 18 words · about 0:07

```text
If you liked this video, give it a like and subscribe for more everyday engineering. Thanks for watching!
```

## Short 1 (This bridge closed two days after opening #shorts) → save as `audio/short-1.wav`
Its own recording · 75 words · about 0:30. Same voice and style, with a little more energy.

```text
This bridge swayed so much, people grabbed the railings. That was opening day for London's Millennium Bridge. Two days later, it closed.

When the deck shifted sideways, people adjusted their steps to keep their balance. On average, those adjustments fed energy back into the sway, even with people walking out of step.

Engineers installed dampers to take that energy out. The full video shows how a little linear algebra explains the way the bridge moves.
```

## Short 2 (What happened when 165 people walked across this span? #shorts) → save as `audio/short-2.wav`
Its own recording · 96 words · about 0:38. Same voice and style, with a little more energy.

```text
At about one hundred sixty five walkers, this bridge's sway took off. After London's Millennium Bridge closed, engineers gradually added walkers to one span, and that's where the sideways motion started growing sharply.

A bridge loses some energy every time it sways. But walkers adjusting their balance feed energy in. Once there were enough walkers, the crowd fed energy into the motion faster than the bridge could lose it.

Engineers added dampers and tested the modified bridge with about two thousand people. This time, the sway stayed within acceptable limits. The full video shows the math.
```
