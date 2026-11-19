# Your Phone Doesn't Know Where You Are

Generated from scenes.yaml. Edit scenes.yaml, not this file.

### S01 · photo-overlay · ~0:00

Your phone doesn't start knowing where you are. It starts with nothing but timings: how long signals took to arrive from satellites about twenty thousand kilometers up. From those, it finds you within about five meters under open sky.

### S02 · title-card · ~0:16

Let's see how, using nothing more than circles, spheres and a little algebra.

### S03 · equation-steps · ~0:22

Each GPS satellite broadcasts its position and the exact time, kept by very precise atomic clocks. Your phone notes when each signal arrives. The signal travels at the speed of light, about three hundred thousand kilometers per second. So the distance is the speed of light times the travel time. From twenty thousand two hundred kilometers straight up, that's about seven hundredths of a second.

### S04 · diagram · ~0:48

Let's start flat, on a map. Say a station at point A tells you that you're exactly five kilometers away. That doesn't give you a point. It gives you a circle: every spot that's five kilometers from A.

### S05 · diagram · ~1:04

Add a second station, B, eight kilometers east of A. You're also five kilometers from B. Now there are two circles, and they cross at exactly two points. You're at one of them. But which one?

### S06 · equation-steps · ~1:19

Here's the algebra behind those two points. Put A at the origin, and B at eight on the x axis. The circles are x squared plus y squared equals twenty five, and x minus eight, squared, plus y squared equals twenty five. Subtract one from the other, and the squares cancel. You're left with a straight line: sixteen x minus sixty four equals zero, so x equals four. Then y squared equals nine, so y is plus or minus three.

### S07 · diagram · ~1:51

So add a third station, C, ten kilometers south of the midpoint between A and B. You're seven kilometers from C. The southern point, at y equals minus three, is exactly seven kilometers from C. The northern point is thirteen. Three circles, one point. That's called trilateration.

### S08 · bullets · ~2:11

Satellites aren't on a flat map. In three dimensions, circles become spheres. One satellite puts you somewhere on a sphere. Two spheres meet in a circle. Three spheres meet in just two points, and one of them is usually nowhere near Earth's surface, so it's easy to rule out.

### S09 · big-fact · ~2:31

So three satellites should be enough. But there's a catch: the clock in your phone. The satellites carry atomic clocks. Your phone has an ordinary one. If its clock is off by just one millionth of a second, every distance is off by about three hundred meters.

### S10 · diagram · ~2:50

Here's what that does on our map. Say your phone's clock is a little off, so every distance comes out one kilometer too long: six, six and eight. Now the three circles don't meet at a single point. But the error is the same for every station. So the phone shrinks all the circles by the same amount until they meet. When they meet at one point, it has found both your position and its own clock error.

### S11 · equation-steps · ~3:22

In three dimensions, the unknowns are your x, y and z, plus the clock error. That's four unknowns, so the phone needs at least four satellites. Each one gives an equation: the true distance to that satellite, plus the speed of light times the clock error, equals the measured distance. GPS satellites are arranged so that at least four are visible from nearly anywhere on Earth.

### S12 · table · ~3:49

So how close does it get? Under open sky, phones are typically accurate to about five meters. Near buildings, bridges and trees it gets worse, because they block and reflect the signals. Survey equipment, with extra signals and corrections, can get to within a few centimeters. And modern phones also use other satellite systems, like Europe's Galileo, plus Wi-Fi and cell towers, to get a fix faster.

### S13 · bullets · ~4:16

So your phone never measures your position directly. It measures timings, turns them into distances, and solves for the one point where they all agree, plus its own clock error. One distance gives a circle. Two give two points. Three give one. And in space, a fourth fixes the clock.

### S14 · end-card · ~4:37

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!

---
695 words · about 4:45 at 150 words per minute
