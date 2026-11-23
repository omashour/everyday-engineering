# Your Credit Card Number Checks Itself

Generated from scenes.yaml. Edit scenes.yaml, not this file.

### S01 · photo-overlay · ~0:00

Mistype one digit of your card number, and many websites know instantly. Before they ever contact your bank. There's no list of real cards in your browser. The number checks itself, with a bit of grade school arithmetic.

### S02 · title-card · ~0:16

Here's the trick hiding in every card number.

### S03 · bullets · ~0:19

A card number isn't random. The first few digits identify the card network and the bank that issued it. The middle digits identify your account. And the very last digit isn't part of your account at all. It's a check digit, calculated from all the others. Its only job is to catch mistakes.

### S04 · big-fact · ~0:41

The method is called the Luhn algorithm, after Hans Peter Luhn, an IBM scientist who patented it in nineteen sixty. It was designed long before online shopping, to catch errors when people copied or typed long numbers by hand.

### S05 · table · ~0:57

Grab a pen if you want to follow along. Let's run it on a short made-up number: four five three nine, one four eight nine. Real cards have sixteen digits, but the steps are exactly the same. Start at the right, with the check digit. Leave it alone. Then double every second digit as you move left: the eight, the one, the three and the four. Leave the others as they are.

### S06 · equation-steps · ~1:27

Now double them. Four becomes eight. Three becomes six. One becomes two. Eight becomes sixteen, and that's two digits. So add them: one plus six is seven. That's the only extra rule. If doubling gives a two digit number, add its digits together, or just subtract nine. Sixteen minus nine is also seven.

### S07 · equation-steps · ~1:49

Now add everything up. Eight, five, six, nine, two, four, seven, nine. That's fifty. And here's the rule. If the total ends in zero, the number passes. Fifty ends in zero, so this number is valid. The check digit, that last nine, was chosen to make that happen.

### S08 · equation-steps · ~2:08

So how does the card company pick that last digit? Run the same steps on the other seven digits. Here they add up to forty one. The next number that ends in zero is fifty. Fifty minus forty one is nine. So the check digit is nine. Change any of the other digits and you'd get a different check digit, but the total would still end in zero. Every card number is built this way.

### S09 · table · ~2:39

Now make a typo. Say you type a seven where the second four should be. Four five three nine, one seven eight nine. That digit wasn't doubled, so the total goes up by three, to fifty three. Fifty three doesn't end in zero. The form rejects it instantly, without asking anyone.

### S10 · table · ~2:60

Here's why this never misses a single wrong digit. For the digits that aren't doubled, changing one changes the total by one to nine. That can never land on another number ending in zero. For doubled digits, look at what each one turns into. Zero through nine become zero, two, four, six, eight, one, three, five, seven, nine. All ten results are different. So changing any one digit always changes the total by something that isn't a multiple of ten.

### S11 · equation-steps · ~3:32

Another common typing mistake is swapping two neighbors. Type three nine as nine three, and a plain sum wouldn't notice, because the same digits are still there. But one of the pair is doubled and the other isn't. Three doubled plus nine, which is fifteen, becomes nine doubled plus three, which is twelve. The total drops to forty seven. Caught.

### S12 · bullets · ~3:57

It isn't perfect. Swap a zero and a nine that sit side by side, and the total doesn't change, because zero doubled is zero and nine doubled folds back to nine. Change two digits at once, and roughly one time in ten the errors cancel. And it says nothing about whether a card is real, has money, or belongs to you. It's a typo filter, not security.

### S13 · photo-overlay · ~4:24

Once you know the trick, you'll find check digits everywhere. The last digit under a supermarket barcode is a check digit, using weights of three and one instead of doubling. Books have one in their ISBN. And your phone's fifteen digit IMEI number ends with a Luhn check digit too. The details differ, but the idea is the same: one digit computed from the rest.

### S14 · diagram · ~4:51

This is a big idea in engineering. Add a little redundancy, one digit computed from the others, and you can detect errors without knowing the right answer. A random wrong number only passes one time in ten. The same idea, scaled up, protects files you download and messages your phone sends, using checksums that are far more powerful. Engineers call this error detection. It doesn't fix the mistake. It just tells you something is wrong, so you can type it again.

### S15 · pause-try · ~5:23

Your turn. What check digit makes one two three four valid? Pause and try it.

### S16 · equation-steps · ~5:30

Start from the right. The check digit goes at the end, so the four next to it gets doubled, to eight. Keep the three. Double the two, to four. Keep the one. Eight plus three plus four plus one is sixteen. The next number ending in zero is twenty, so the check digit is four. One two three four four.

### S17 · photo-overlay · ~5:54

So the next time a form rejects your card number before you've even finished, you'll know what happened. It doubled every second digit, added everything up, and checked for a zero at the end. One extra digit catches every single typo, and nearly every swap of neighbors. It's a tiny piece of math hiding in your wallet.

### S18 · end-card · ~6:18

If you enjoyed this one, please give it a like and subscribe for more everyday engineering. Thanks for watching!

---
942 words · about 6:26 at 150 words per minute
