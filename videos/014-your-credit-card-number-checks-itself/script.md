# Your Credit Card Number Checks Itself

Generated from scenes.yaml. Edit scenes.yaml, not this file.

### S01 · photo-overlay · ~0:00

Mistype one digit of your card number, and a checkout form can spot it before it contacts your bank. There's no list of real cards in your browser. All it needs is a little arithmetic.

### S02 · title-card · ~0:15

Here's the trick behind that check.

### S03 · bullets · ~0:17

A card number isn't random. The first digits identify the card issuer. The digits after that identify the account. And the last digit is a check digit, calculated from all the others. Its only job is to catch mistakes.

### S04 · big-fact · ~0:34

The method is named after Hans Peter Luhn of IBM. His patent for a device that calculated and checked these digits was granted in nineteen sixty, decades before online shopping.

### S05 · table · ~0:46

Grab a pen if you want to follow along. Let's run it on a short made-up number: four five three nine, one four eight nine. Many cards have sixteen digits. American Express cards have fifteen. The steps are the same either way. Start at the right, with the check digit. Leave it alone. Then double every second digit as you move left: the eight, the one, the three and the four. Leave the others as they are.

### S06 · equation-steps · ~1:18

Now double them. Four becomes eight. Three becomes six. One becomes two. Eight becomes sixteen, and that's two digits. So add them: one plus six is seven. That's the only extra rule. If doubling gives a two digit number, add its digits together, or just subtract nine. Sixteen minus nine is also seven.

### S07 · equation-steps · ~1:39

Now add everything up. Eight, five, six, nine, two, four, seven, nine. That's fifty. And here's the rule. If the total ends in zero, the number passes. Fifty ends in zero, so this example passes the Luhn check. The check digit, that last nine, was chosen to make that happen.

### S08 · equation-steps · ~1:60

So how is that last digit chosen? Leave a space for the check digit, then work from right to left, starting by doubling the digit next to that space. Here the first seven digits add up to forty one. The next number that ends in zero is fifty. Fifty minus forty one is nine, so the check digit is nine. If the total already ended in zero, the check digit would be zero. Change any one of the other digits, and you'd get a different check digit. That's how a Luhn check digit is chosen.

### S09 · table · ~2:38

Now make a typo. Say you type a seven where the second four should be. Four five three nine, one seven eight nine. That digit wasn't doubled, so the total goes up by three, to fifty three. Fifty three doesn't end in zero. The number fails the check, and the form can flag it right there.

### S10 · table · ~3:01

Here's why this never misses a typo that replaces one digit with another. For the digits that aren't doubled, changing one changes the total by one to nine. That can never land on another number ending in zero. For doubled digits, look at what each one turns into. Zero through nine become zero, two, four, six, eight, one, three, five, seven, nine. All ten results are different. So changing any one digit always changes the total by something that isn't a multiple of ten.

### S11 · equation-steps · ~3:35

Another common typing mistake is swapping two neighbors. Type three nine as nine three, and a plain sum wouldn't notice, because the same digits are still there. But one of the pair is doubled and the other isn't. Three doubled plus nine, which is fifteen, becomes nine doubled plus three, which is twelve. The total drops to forty seven. Caught.

### S12 · bullets · ~3:60

It isn't perfect. Swap a zero and a nine that sit side by side, and the total doesn't change, because zero doubled is zero and nine doubled folds back to nine. That's the only swap of two different neighbors it misses. Two wrong digits can sometimes cancel each other out. And passing the check only tells you the arithmetic works. It can't tell you whether the card was issued, who owns it, or whether a payment will be approved.

### S13 · photo-overlay · ~4:32

Once you know the trick, you'll find check digits everywhere. The last digit in a standard UPC or EAN barcode is a check digit. It uses alternating weights of one and three. A book's thirteen digit ISBN uses those same weights. And the fifteen digit IMEI you see on your phone ends in a Luhn check digit. The details differ, but the idea is the same: one digit computed from the rest.

### S14 · diagram · ~5:01

This is a big idea in engineering. Add a little redundancy, one digit computed from the others, and you can detect errors without knowing the right answer. For any given set of starting digits, only one of the ten possible last digits passes the check. The same idea, scaled up, helps detect errors in files you download and messages your phone sends, using checksums that are far more powerful. Engineers call this error detection. It doesn't fix the mistake. It just tells you something is wrong, so you can type it again.

### S15 · pause-try · ~5:39

Your turn. What check digit makes one two three four pass the check? Pause and try it.

### S16 · equation-steps · ~5:46

Start from the right. The check digit goes at the end, so the four next to it gets doubled, to eight. Keep the three. Double the two, to four. Keep the one. Eight plus three plus four plus one is sixteen. The next number ending in zero is twenty, so the check digit is four. One two three four four.

### S17 · photo-overlay · ~6:10

So the next time a checkout form flags a completed card number before you submit it, this little calculation may be the reason. It doubles every second digit, adds everything up, and checks for a zero at the end. One extra digit catches every one-digit substitution, and all but one kind of swap between different neighboring digits. It's a tiny piece of math hiding in your wallet.

### S18 · end-card · ~6:38

If you enjoyed this one, please give it a like and subscribe for more everyday engineering. Thanks for watching!

---
993 words · about 6:46 at 150 words per minute
