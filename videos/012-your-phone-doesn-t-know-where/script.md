# Your Phone Doesn't Know Where You Are

Generated from scenes.yaml. Edit scenes.yaml, not this file.

### S01 · photo-overlay · ~0:00

Your phone doesn't start knowing where you are. It starts with signal timings, and satellite positions worked out from orbit data the satellites broadcast. From those, it finds you within about five meters under open sky.

### S02 · title-card · ~0:15

Let's see how, using nothing more than circles, spheres and a little algebra.

### S03 · equation-steps · ~0:21

Each GPS satellite broadcasts data describing its orbit, so your phone can calculate where the satellite was. It also broadcasts the time the signal left, kept by very precise atomic clocks. Your phone compares that transmission time with the arrival time on its own clock. Multiply the travel time by the speed of light, about three hundred thousand kilometers per second, and you get an apparent distance. Engineers call it a pseudorange. From twenty thousand two hundred kilometers straight up, the travel time is about seven hundredths of a second.

### S04 · diagram · ~0:57

Let's start flat, on a map, with exact distances. Say a station at point A tells you that you're exactly five kilometers away. That doesn't give you a point. It gives you a circle: every spot that's five kilometers from A.

### S05 · diagram · ~1:14

Add a second station, B, eight kilometers east of A. You're also five kilometers from B. Now there are two circles, and they cross at exactly two points. You're at one of them. Which one? Take a second and guess.

### S06 · equation-steps · ~1:31

Here's why there are two. Put A at the origin, and B at eight on the x axis. Write both circle equations, then subtract one from the other. The x squared and y squared terms cancel, leaving sixteen x minus sixty four equals zero. So x equals four: the crossing points sit exactly halfway between A and B. Put x equals four back in, and y squared equals nine. A square has two roots, so y is plus three or minus three.

### S07 · diagram · ~2:04

Now add a third station, C, ten kilometers south of the midpoint between A and B. You're seven kilometers from C. The southern point, four, minus three, is exactly seven kilometers from C. The northern point is thirteen. Three circles, one point. That's called trilateration.

### S08 · bullets · ~2:22

Real satellites aren't on a flat map. In three dimensions, circles become spheres. Take the same idealized case, with exact distances and a perfectly synchronized clock. One satellite puts you somewhere on a sphere. Two spheres meet in a circle. A third sphere can narrow that circle to two candidate points, and the receiver can often rule one out, because it isn't anywhere plausible for someone near Earth's surface.

### S09 · big-fact · ~2:50

So in that ideal case, three satellites would do. But real phones don't have a perfectly synchronized clock. The satellites carry atomic clocks. Your phone has an ordinary one. If your phone's clock is one microsecond ahead, every apparent distance comes out about three hundred meters too long, in this simplified model.

### S10 · diagram · ~3:12

Here's what a shared error does on our map. Let's exaggerate it, so every apparent distance comes out one kilometer too long: six, six and eight. Now the three circles don't meet at a single point. But the error is the same for all three. So try the same correction on every distance. Subtract one kilometer, and you're back to five, five and seven. Now all three circles pass through the same point: four, minus three. That correction is another unknown to solve for. The shrinking circles are just a way to picture it. Real receivers estimate position and clock error together, and with noisy measurements, the circles never meet exactly. They find the best fit.

### S11 · equation-steps · ~3:59

In three dimensions, a standalone fix has four unknowns: x, y, z, and the receiver's clock offset. So a receiver normally needs at least four usable satellite signals, and it uses more when it can. In a simplified model, each one gives an equation: apparent distance equals the true geometric distance, plus the speed of light times the clock offset. GPS satellites are arranged so that at least four are visible from nearly anywhere on Earth.

### S12 · table · ~4:30

So how close does it get? Under open sky, phones are typically accurate to about five meters. Near buildings, bridges and trees it gets worse, because they block and reflect the signals. With suitable equipment and corrections, surveyors can get to within a few centimeters. And phones get help: Europe's Galileo adds more satellite measurements, while Wi-Fi and cell signals help estimate your location when satellite reception is poor.

### S13 · bullets · ~4:58

So your phone never measures your position directly. It measures timings, turns them into apparent distances, and solves for where it is and how far off its clock is. On our flat map, one distance gave a circle, two gave two points, and three gave one. In space, the fourth satellite provides the extra measurement needed to solve for position and clock error together.

### S14 · end-card · ~5:24

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!

---
813 words · about 5:32 at 150 words per minute
