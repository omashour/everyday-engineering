# Why Your Wi-Fi Dies in One Room

Generated from scenes.yaml. Edit scenes.yaml, not this file.

### S01 · photo-overlay · ~0:00

Wi-Fi is perfect next to the router and almost dead in one room. In open space, move twice as far away and you get a quarter of the signal. But that's only half the story. The rest is in your walls.

### S02 · title-card · ~0:17

Let's follow your signal from the router to that room, with one law of physics and a little algebra.

### S03 · diagram · ~0:25

Think of your router as a tiny light bulb for radio waves. In open space, it spreads its power outward. One meter away, that power is spread over a sphere with a radius of one meter. Two meters away, the same power covers a sphere twice as wide. The surface area of a sphere is four pi r squared. Double r, and the area grows by two squared, four times. Same power, four times the area. So every square meter gets a quarter as much.

### S04 · equation-steps · ~0:60

As an equation, the power landing on each square meter, at distance r, is the power P divided by four pi r squared. That's the inverse square law. Now compare two distances. At twice the distance, the four pi and the P cancel, and you're left with one over two squared. One quarter. Three times as far, one ninth. Ten times as far, one hundredth.

### S05 · graph · ~1:26

Here's what that looks like. Start at one meter, and call that signal one hundred percent. At two meters, you're down to twenty five percent. At four meters, about six percent. The curve drops steeply at first, then flattens out. Most of the loss happens in the first few meters from the router.

### S06 · equation-steps · ~1:48

Engineers rarely use percentages for this. They use decibels, because signals cover such a huge range. A change in decibels is ten times the log of the power ratio. A quarter of the power is ten log of one quarter, about minus six decibels. One hundredth of the power is minus twenty. So in decibels, every doubling of distance costs about six decibels, and every ten times the distance costs twenty.

### S07 · big-fact · ~2:17

Your phone measures Wi-Fi in dBm, decibels compared to one milliwatt. Zero dBm is one milliwatt. Minus thirty is a thousandth of a milliwatt. Minus seventy, a signal you can still browse on, is one ten-billionth of a watt. Your phone pulls web pages out of that.

### S08 · table · ~2:37

Here's a rough guide that Wi-Fi engineers use. Around minus thirty, you're right next to the router. Down to minus fifty is excellent. Minus sixty seven is about the minimum for video calls and streaming. Minus seventy is fine for light browsing and email. By minus eighty, the connection becomes unreliable. And at minus ninety, you'll struggle to connect at all.

### S09 · graph · ~3:02

Now let's test distance alone. Say your phone reads minus thirty at one meter. Each doubling costs six decibels. Two meters, minus thirty six. Eight meters, minus forty eight. Thirty two meters, minus sixty. On a decibel scale, the steep curve becomes a straight line. And look where it ends. Even thirty two meters away, in open space, you'd still have a good signal. With these numbers, distance alone doesn't explain a dead room.

### S10 · diagram · ~3:33

So what's really happening in that one room? Usually, it's what the signal has to pass through. Every wall takes away a chunk of decibels, no matter how far you are. Typical values at two point four gigahertz: about four decibels for a drywall wall, about eight for brick, and ten to fifteen for concrete. Metal, like a steel door, can take even more.

### S11 · equation-steps · ~3:59

Now the dead room. It's ten meters from the router, and the signal crosses two drywall walls and one concrete wall, say twelve decibels. Distance first. Ten meters is ten times one meter, so we lose twenty decibels. Minus thirty becomes minus fifty. Now the walls. Four, four and twelve. That's twenty more. Minus fifty becomes minus seventy. The walls cost as much as the distance did.

### S12 · graph · ~4:26

Here's the same path on a graph. The dashed curve is open space. It only drops to minus fifty at ten meters. The solid line follows your real signal. Every time it hits a wall, it steps straight down. Drywall at three meters, drywall at six, and concrete at eight. By the bedroom, you're at minus seventy, below what video calls need.

### S13 · equation-steps · ~4:51

So what can you do? Move the router toward the middle of the home, and away from that concrete wall. Now the bedroom is five meters away, through one drywall wall. Five meters costs about fourteen decibels. Minus thirty becomes minus forty four. One wall takes four more. Minus forty eight. That's excellent, without buying anything.

### S14 · bullets · ~5:14

If moving the router isn't possible, the goal is the same: fewer walls between the router and you. Keep it up off the floor and out in the open. Keep it away from big metal objects. And in a large home, or one with concrete walls, a second access point or a mesh system puts a transmitter on the other side of the wall.

### S15 · table · ~5:40

The inverse square law isn't just about Wi-Fi. A lamp, a loudspeaker in an open field, a cell tower: anything that spreads out from a small source follows it. Twice the distance, a quarter of the power, minus six decibels. Ten times the distance, one hundredth, minus twenty. That's why engineers who design lighting, sound systems and antennas all start with the same equation.

### S16 · bullets · ~6:07

So why does your Wi-Fi die in one room? In open space, signal follows the inverse square law. Double the distance, a quarter of the power, minus six decibels. But inside a home, walls often cost as much as distance, or more. Count the walls, not just the meters. And the cheapest fix is often just moving the router.

### S17 · end-card · ~6:31

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!

---
977 words · about 6:39 at 150 words per minute
