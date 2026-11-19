# Why Your Coffee Cools Fast, Then Slow

Generated from scenes.yaml. Edit scenes.yaml, not this file.

### S01 · photo-overlay · ~0:00

Your coffee doesn't cool at a steady speed. It cools fastest while it's hottest, then slower and slower. A simple model can estimate when it reaches the temperature you like, and whether to add the milk now or later.

### S02 · title-card · ~0:16

Let's work it out with one law of cooling and a little exponential math.

### S03 · photo-overlay · ~0:22

Here's our setup. Fresh coffee at eighty five degrees Celsius, in a room that stays at twenty degrees. What matters isn't the temperature itself. It's the gap between the coffee and the room. Right now, that gap is sixty five degrees.

### S04 · equation-steps · ~0:39

Newton's law of cooling, in its simplest form, says the coffee's temperature changes at a rate proportional to that gap. Twice the gap, twice the cooling speed. The rate of temperature change is minus k times the difference between the coffee temperature and room temperature. Here, k is an effective cooling constant. It depends on the cup, the lid, the amount of liquid, and the surrounding air.

### S05 · equation-steps · ~1:06

The solution is an exponential: the gap shrinks by the same fraction in every equal stretch of time. T equals room temperature, plus the starting gap times e to the minus k t. For this example, let's assume the temperature gap halves every ten minutes. That corresponds to a k of about point zero seven per minute. So e to the minus k t is exactly one half, to the power t over ten.

### S06 · table · ~1:37

Watch the gap. It starts at sixty five degrees. After ten minutes, it's thirty two and a half. After twenty, about sixteen. After thirty, about eight. So the coffee goes from eighty five, to fifty two and a half, to about thirty six, to about twenty eight. It drops thirty two and a half degrees in the first ten minutes, and only about eight in the third ten. Fast, then slow.

### S07 · graph · ~2:05

Here's the same story as a curve. The dashed line is the room. Look at the vertical gap between the curve and that line. At every ten-minute mark, it's half what it was ten minutes earlier. The curve keeps getting closer to the room line, but in the model, it never quite reaches it.

### S08 · equation-steps · ~2:28

That's why the curve flattens. The cooling speed at any moment is k times the gap. At the very start, the gap is sixty five, so the coffee is cooling at about four and a half degrees per minute. At the ten-minute mark, the gap is half as big, and so is the speed: about two point three degrees per minute. Smaller gap, gentler slope.

### S09 · equation-steps · ~2:55

So when does it reach a temperature you like? Say you want your coffee to cool to sixty degrees Celsius. That's a gap of forty. So we need sixty five times one half, to the power t over ten, to equal forty. Take logs, and t equals ten times log base two of sixty five over forty. About seven minutes, for this mug and these conditions.

### S10 · photo-overlay · ~3:22

Now the milk puzzle. You'll drink in ten minutes. Do you pour in cold milk now, or just before you drink? To compare fairly, we'll use the same coffee and the same milk both times. The milk stays at five degrees until it's poured, and it makes up one fifth of the final drink. We'll assume instant mixing, with the mixed temperature as a simple weighted average. And we'll assume both cups follow the same ten-minute cooling half-life.

### S11 · equation-steps · ~3:54

First, milk now. Point eight times eighty five, plus point two times five, gives sixty nine degrees. That's a gap of forty nine. After ten minutes, the gap halves to twenty four and a half. So at the ten-minute mark, this cup is at forty four and a half degrees.

### S12 · equation-steps · ~4:15

Now milk later. The black coffee cools first. Its gap halves from sixty five to thirty two and a half, so at ten minutes it's at fifty two and a half. Then the cold milk goes in. Point eight times fifty two and a half, plus point two times five, gives forty three degrees. Compared at the same moment, right after the second cup gets its milk, the early-milk cup is one and a half degrees warmer.

### S13 · graph · ~4:47

Here's the picture. The blue cup drops at minute zero, when the milk goes in. The red cup drops at minute ten. Early milk reduces the temperature gap right away, so in this model, that cup's temperature falls more slowly during the wait. In this example, the model predicts a difference of one and a half degrees. In practice, adding milk changes the amount and makeup of the liquid, so the two cups can cool at different rates. And with the shared half-life, if the milk started at room temperature, both cups would end at forty six degrees. Timing wouldn't matter.

### S14 · table · ~5:28

The same simple model shows up in engineering. A computer chip cooling after it shuts down behaves roughly this way, over a useful stretch of time. And a capacitor discharging through a fixed resistor follows it almost exactly. Wherever the rate of change is proportional to the remaining gap, with a constant of proportionality, you get the same exponential.

### S15 · bullets · ~5:52

Real coffee follows this model only approximately. Evaporation can add to the cooling of an open mug, and a lid generally slows cooling, partly by limiting evaporation. But in this model, each ten-minute stretch cuts the remaining temperature gap in half: fast at first, then slow. And in our example, adding the cold milk first kept the coffee a little warmer at the ten-minute mark.

### S16 · end-card · ~6:20

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!

---
949 words · about 6:28 at 150 words per minute
