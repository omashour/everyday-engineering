# Why Your Wi-Fi Dies in One Room

Generated from scenes.yaml. Edit scenes.yaml, not this file.

### S01 · photo-overlay · ~0:00

Wi-Fi is perfect next to the router and almost dead in one room. In ideal open space, move twice as far and you receive a quarter of the power. But that's only half the story. The rest is in your walls.

### S02 · title-card · ~0:17

Let's follow your signal from the router to that room, with one law of physics and a little algebra.

### S03 · diagram · ~0:25

Think of your router as a tiny light bulb for radio waves. In ideal open space, its power spreads outward. One meter away, it covers a sphere one meter in radius. Two meters away, the same power covers a sphere twice as wide. A sphere's area is four pi r squared. Double r, and the area grows by two squared, four times. So every square meter gets a quarter as much.

### S04 · equation-steps · ~0:54

As an equation, the power passing through each square meter, at distance r, is the power P divided by four pi r squared. That's the inverse square law. Your phone's antenna catches a share of that, so if the antennas and frequency stay the same, the power your phone receives follows the same rule. At twice the distance, you're left with one over two squared. One quarter. Three times as far, one ninth. Ten times as far, one hundredth.

### S05 · graph · ~1:26

Here's what that looks like. Start at one meter, and call the power there one hundred percent. At two meters, you're down to twenty five percent. At four meters, about six percent. The curve looks like it flattens out, but it never really slows down. Every doubling of distance takes away another three quarters of whatever was left.

### S06 · equation-steps · ~1:50

Engineers usually use decibels for this, because signals cover such a huge range. A change in decibels is ten times the log of the power ratio. A quarter of the power is about minus six decibels. One hundredth is minus twenty. So every doubling of distance costs about six decibels, and every ten times the distance costs twenty.

### S07 · big-fact · ~2:14

Your phone measures Wi-Fi in dBm, decibels compared to one milliwatt. Minus thirty dBm is a thousandth of a milliwatt. Minus seventy is one ten-billionth of a watt, and a phone can often still browse on that.

### S08 · table · ~2:30

Here's a rough guide. Around minus thirty dBm is an extremely strong signal, right next to the router. Minus fifty is excellent. Around minus sixty seven is a common design target for demanding uses like voice calls. Minus seventy can still support everyday internet use. Around minus eighty, connections may become unreliable. And near minus ninety, staying connected can be difficult. These aren't hard cutoffs. Interference and crowded networks matter too.

### S09 · graph · ~2:59

Now let's test distance alone, in ideal open space. Say your phone reads minus thirty at one meter. Every time we double the distance, we lose another six decibels. Two meters, minus thirty six. Eight meters, minus forty eight. Thirty two meters, minus sixty. Because we're counting distance in doublings, which is a logarithmic scale, the points fall on a straight line. Even thirty two meters away, the model still gives a reasonably strong signal. With these numbers, distance alone doesn't explain a weak room.

### S10 · diagram · ~3:33

So what's happening in that one room? Usually, it's what the signal has to pass through. Every wall adds its own loss, measured in decibels. At two point four gigahertz, a drywall partition might cost a few decibels. Brick can cost several more. Thick or reinforced concrete can cost much more than that. And metal, like a steel door, can block the signal especially strongly. The exact amount depends on the material, the thickness and how the wall is built.

### S11 · equation-steps · ~4:06

Now let's build a simplified example. The bedroom is ten meters from the router. The signal crosses two drywall walls, which we'll call four decibels each, and one thick concrete wall, which we'll call twenty two. That's a tough wall, chosen for this example. Distance first. Ten times the distance costs twenty decibels, so minus thirty becomes minus fifty. Then the drywall: minus fifty four, minus fifty eight. Then the concrete: minus eighty. That's weak enough to make the connection unreliable. In a real house, reflections make the signal jump around, but adding the losses gives a useful first estimate.

### S12 · graph · ~4:46

Here's the same path on a graph. The dashed curve is ideal open space. It only drops to minus fifty at ten meters. The solid line is our example. Every time it hits a wall, it steps straight down. Drywall at three meters, drywall at six, and thick concrete at eight. By the bedroom, our estimate is minus eighty, around where connections can get unreliable.

### S13 · equation-steps · ~5:13

Now move the router toward the middle of the home, so the signal skips the concrete. In our example, the bedroom is now five meters away, through one drywall wall. Five meters costs about fourteen decibels, so minus forty four. One wall takes four more: minus forty eight. That's thirty two decibels better than before, in our simplified model. Real results vary, but fewer obstacles can make a big difference.

### S14 · bullets · ~5:41

If you can't move the router, bring the Wi-Fi closer to the room. A second access point wired back to the router works especially well. A mesh system can help too, but its units need a good link to each other, so don't put one where the signal is already almost gone. Keep the router high, in the open, away from big metal objects. And two point four gigahertz usually gets through walls better, while five and six gigahertz can be faster up close.

### S15 · table · ~6:16

The same idea shows up elsewhere. Light from a small lamp and sound from a speaker in an open field behave this way under ideal conditions. Double the distance, a quarter of the power per square meter, minus six decibels. Ten times the distance, one hundredth, minus twenty.

### S16 · bullets · ~6:35

So why does your Wi-Fi die in one room? In ideal open space, power follows the inverse square law: double the distance, a quarter of the power, minus six decibels. But inside a home, walls can cost as much as distance, or much more. Count the walls, not just the meters. Want to test it? A Wi-Fi analyzer app shows your signal in dBm. Check it near the router, then in the problem room. It measures strength, not speed, but it shows you where the decibels go.

### S17 · end-card · ~7:12

If you liked this video, please give it a like and subscribe for more everyday engineering. Thanks for watching!

---
1078 words · about 7:20 at 150 words per minute
