# Why Your Coffee Cools Fast, Then Slow

Generated from scenes.yaml. Edit scenes.yaml, not this file.

### S01 · photo-overlay · ~0:00

Your coffee doesn't cool at a steady speed. It loses heat fastest while it's hottest, then slower and slower. That one fact tells you when it's drinkable, and whether to add the milk now or later.

### S02 · title-card · ~0:15

Let's work it out with one law of cooling and a little exponential math.

### S03 · photo-overlay · ~0:21

Here's our setup. Fresh coffee at eighty five degrees Celsius, in a room at twenty degrees. What matters isn't the temperature itself. It's the gap between the coffee and the room. Right now, that gap is sixty five degrees.

### S04 · equation-steps · ~0:37

Newton's law of cooling says the coffee loses heat at a rate proportional to that gap. Twice the gap, twice the cooling speed. In symbols, the rate of change of temperature is minus k times T minus the room temperature. The constant k depends on the mug, the lid, how much coffee there is, and the air around it.

### S05 · equation-steps · ~1:01

The solution is an exponential. The gap shrinks by the same fraction in every equal stretch of time. T equals room temperature, plus the starting gap times e to the minus k t. For our mug, let's assume k is about point zero seven per minute. That means the gap halves about every ten minutes. So e to the minus k t is the same as one half, to the power t over ten.

### S06 · table · ~1:31

Watch the gap. It starts at sixty five degrees. After ten minutes, it's thirty two and a half. After twenty, about sixteen. After thirty, about eight. So the coffee goes from eighty five, to fifty two and a half, to about thirty six, to about twenty eight. It drops thirty two and a half degrees in the first ten minutes, and only about eight in the third ten. Fast, then slow.

### S07 · graph · ~2:00

Here's the whole curve. It falls steeply at first, fifty two and a half at ten minutes, then levels off, twenty eight at thirty minutes, creeping toward the room temperature line. In this model it never quite reaches it. Every ten minutes, the remaining gap is cut in half.

### S08 · equation-steps · ~2:20

Here's why it slows down. The cooling speed is k times the gap. At the start, the gap is sixty five, so the coffee drops about four and a half degrees per minute. Ten minutes later, the gap is half as big, and so is the speed: about two point three degrees per minute. The hotter the coffee, the faster it cools.

### S09 · equation-steps · ~2:46

So when can you drink it? Say you like coffee at sixty degrees. That's a gap of forty. So we need sixty five times one half, to the power t over ten, to equal forty. Take logs, and t equals ten times log base two of sixty five over forty. About seven minutes.

### S10 · photo-overlay · ~3:07

Now the milk puzzle. You'll drink your coffee in ten minutes, and your milk is cold from the fridge. Do you pour it in now, or just before you drink? Does it even matter? Newton's law says it does.

### S11 · equation-steps · ~3:23

First, add the milk now. Assume the milk is a fifth of the drink, at five degrees, and the mix is a simple weighted average. Point eight times eighty five, plus point two times five, gives sixty nine degrees. That's a gap of forty nine. After ten minutes, the gap halves to twenty four and a half. So you drink it at forty four and a half degrees.

### S12 · equation-steps · ~3:51

Now add it later. The black coffee cools first. Its gap halves from sixty five to thirty two and a half, so it's at fifty two and a half. Then the cold milk goes in. Point eight times fifty two and a half, plus point two times five, gives forty three degrees. Adding the milk now leaves your coffee about one and a half degrees warmer.

### S13 · graph · ~4:18

Here's why. Adding the cold milk now shrinks the gap right away, so the coffee loses heat more slowly for the whole ten minutes. Black coffee stays hotter, so it loses heat faster, and then the cold milk knocks it down. The difference is small, about one and a half degrees, but it's real. And in this model, if the milk were at room temperature, the timing wouldn't matter at all.

### S14 · table · ~4:47

The same curve shows up all over engineering. A hot engine or a computer chip cooling after it shuts down. A house losing heat overnight with the heating off, roughly. And a capacitor discharging in an electric circuit. Wherever the rate depends on the remaining gap, you get the same exponential.

### S15 · bullets · ~5:08

Real coffee follows Newton's law only approximately. Evaporation adds extra cooling while it's hottest, and a lid slows everything down. But the main idea holds. The cooling speed is proportional to the gap. So the gap shrinks by the same fraction in every equal stretch of time: fast at first, then slow. And for hotter coffee later, add the cold milk now.

### S16 · end-card · ~5:33

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!

---
833 words · about 5:41 at 150 words per minute
