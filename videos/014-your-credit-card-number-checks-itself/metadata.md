**Title:** Your Credit Card Number Checks Itself
**Alternates:** The Hidden Math in Every Credit Card Number · Why One Typo in Your Card Number Gets Caught
**Playlist:** math-for-engineers
**Description:** Mistype one digit of your card number and a checkout form can flag it before contacting your bank. The reason is the last digit: a check digit calculated from all the others with the Luhn algorithm.

We run the check by hand on a short made-up number, see how the check digit is chosen, and show why the method catches every one-digit substitution and all but one swap of different neighboring digits. Then we look at what it can't catch, where else check digits hide (UPC/EAN barcodes, ISBN-13, your phone's IMEI) and why one extra digit is a big idea in engineering.

All numbers in this video are made up for illustration. Passing the Luhn check only means the arithmetic works. It says nothing about whether a card was issued, who owns it or whether a payment will be approved.

Chapters
[paste chapters.txt here]
**Tags:** Luhn algorithm, credit card number, check digit, how credit card numbers work, card number validation, modular arithmetic, mod 10, checksum, error detection, barcode check digit, ISBN, IMEI, everyday math, math for engineers, Everyday Engineering
**Pinned comment:** Try another: what check digit completes 7927_? Answer: 7. From the right, double the 7 (14 → 5) and the 9 (18 → 9): 5 + 2 + 9 + 7 = 23, and 30 − 23 = 7, so the number is 79277.
