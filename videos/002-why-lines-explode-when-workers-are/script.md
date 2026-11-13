# Why Lines Explode When Workers Are Almost Busy

Generated from scenes.yaml. Edit scenes.yaml, not this file.

### S01 · photo-overlay · ~0:00

This cashier is busy ninety percent of the time. The average wait in her line is nine minutes. Make her busy ninety five percent of the time, and the wait jumps to nineteen. Here's why.

### S02 · title-card · ~0:15

It's one of the most useful equations in engineering, and it starts with a simple question.

### S03 · equation-steps · ~0:21

Start with two numbers. The first is how fast customers arrive. Say fifty four people join the line every hour. Engineers call this the arrival rate, lambda. The second is how fast the cashier can serve them. On average she takes one minute per customer, so she can serve sixty an hour. That's the service rate, mu. Divide the first by the second and you get the utilization, rho. Fifty four over sixty is zero point nine. She's busy ninety percent of the time, and free the other ten.

### S04 · diagram · ~0:58

Here's a puzzle. If she's free ten percent of the time, why is there a line at all? Because customers don't arrive on a schedule. If one person showed up exactly every sixty seven seconds, nobody would ever wait. But real customers arrive at random. Sometimes three walk up at once. Sometimes nobody comes for minutes. The bursts build a line. The quiet gaps are idle time she can never get back.

### S05 · equation-steps · ~1:27

Queueing theory turns this into one formula. For one cashier, with random arrivals and random service times, the average wait in line is rho over one minus rho, times the average service time. Look at the bottom of that fraction. One minus rho is the spare capacity. It's the share of time she's free. At ninety percent busy, the spare capacity is zero point one. Nine tenths divided by one tenth is nine. Times one minute, that's a nine minute wait.

### S06 · table · ~1:60

Now run the same formula for other levels of busy. At fifty percent busy, the wait is one minute. Seventy five percent gives three minutes. Eighty percent gives four. Ninety percent, nine minutes. Ninety five percent, nineteen minutes. And at ninety nine percent busy, the average wait is ninety nine minutes.

### S07 · graph · ~2:21

Plot it and you get this curve. For a long time it barely rises. Going from zero to seventy percent busy adds only a little over two minutes of waiting. Then the curve bends upward, and past ninety percent it shoots almost straight up. It looks like a hockey stick. Every extra percent of busy costs more waiting than the one before.

### S08 · equation-steps · ~2:46

So why does going from ninety to ninety five percent double the wait? Look at the spare capacity again. At ninety percent, she's free ten percent of the time. At ninety five, only five percent. You've cut her spare time in half, and the spare time sits on the bottom of the fraction. Halve the bottom, and you roughly double the answer. Nine minutes becomes nineteen.

### S09 · big-fact · ~3:13

And what if she's busy one hundred percent of the time, with customers arriving exactly as fast as she can serve them? The spare capacity is zero, and you'd be dividing by zero. In practice, the line never settles down. Every random burst adds people, and there's no quiet time to clear them. On average, the line just keeps growing.

### S10 · equation-steps · ~3:37

Notice what causes all this. Randomness. A more general version, called Kingman's formula, adds a variability factor. It measures how unpredictable the arrivals and service times are. Fully random, like our cashier, the factor is one. Make everything perfectly regular, and it drops to zero, and so does the wait. That's why engineers fight variability. Appointment slots, scheduled deliveries and standard work all shorten a line without hiring anyone.

### S11 · bullets · ~4:05

This one curve shapes a lot of design decisions. Call centers use queueing math like this to decide how many agents to staff. Hospitals keep spare beds, because a full ward means long waits for the next patient. Computer servers slow to a crawl as they near full load. And in factories, a machine that's almost always busy piles up unfinished parts in front of it.

### S12 · graph · ~4:32

Three more customers an hour can double your wait in line. This cashier can serve sixty customers an hour. With thirty arriving each hour, the average wait is one minute. With fifty four, it's nine. Add just three more, to fifty seven, and the wait jumps to nineteen minutes. On the manager's spreadsheet, that's a better day. Less idle time, lower cost per customer. For the people in line, it's twice the wait.

### S13 · bullets · ~5:02

So here's what to remember. Waiting time depends on spare capacity, not on how busy things look. The last few percent of busy are the most expensive. And there are two ways to shorten a line. Add capacity, or remove randomness. Next time you're stuck in a slow line, look at the cashier. If she never gets a break, now you know why.

### S14 · end-card · ~5:28

Next time, why ten parts that each work ninety nine percent of the time make a machine that fails almost one time in ten. See you there.

---
830 words · about 5:39 at 150 words per minute
