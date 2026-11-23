# Upload sheet — 014: Your Credit Card Number Checks Itself

Copy each box into YouTube Studio.

## Files
- [x] Video: `renders/014-your-credit-card-number-checks-itself.mp4`
- [x] Thumbnails (upload all for YouTube's A/B test: Thumbnail → Test & compare): `thumbnails/thumb-1.png`, `thumbnails/thumb-2.png`
- [x] Captions: `captions.srt` (Subtitles → Add language: English → Upload file → With timing)

## Title (37 characters)
```text
Your Credit Card Number Checks Itself
```
Alternates: The Hidden Math in Every Credit Card Number · Why One Typo in Your Card Number Gets Caught

## Description (1320 characters)
```text
Mistype one digit of your card number and a checkout form can flag it before contacting your bank. The reason is the last digit: a check digit calculated from all the others with the Luhn algorithm.

We run the check by hand on a short made-up number, see how the check digit is chosen, and show why the method catches every one-digit substitution and all but one swap of different neighboring digits. Then we look at what it can't catch, where else check digits hide (UPC/EAN barcodes, ISBN-13, your phone's IMEI) and why one extra digit is a big idea in engineering.

All numbers in this video are made up for illustration. Passing the Luhn check only means the arithmetic works. It says nothing about whether a card was issued, who owns it or whether a payment will be approved.

Chapters
0:00 A number that checks itself
0:13 What's in a card number
0:27 The Luhn algorithm
0:38 Running the check
1:24 Doubling
1:43 Add it up
2:06 Making the check digit
2:35 Catching a typo
2:53 Why every one-digit typo is caught
3:22 Swapped digits
3:43 What it can't catch
4:07 Check digits everywhere
4:31 One extra digit
5:00 Your turn
5:25 Remember this

Math, physics and engineering, explained through everyday things.
Subscribe: https://www.youtube.com/@EverydayEngineeringExplained

#engineering #math #EverydayEngineering
```

## Tags
```text
Luhn algorithm, credit card number, check digit, how credit card numbers work, card number validation, modular arithmetic, mod 10, checksum, error detection, barcode check digit, ISBN, IMEI, everyday math, math for engineers, Everyday Engineering
```

## Settings
- Playlist: **Math for Engineers**
- Audience: **No, it's not made for kids**
- Category: **Education**
- Video language: **English**
- Caption certification: **None**
- License: **Standard YouTube License**
- Altered or synthetic content: **decide per video using YouTube's current guidance on realistic AI-generated content (the narration voice is AI-generated).**
- End screen: from 5:48 to the end (7 s): one video ("Best for viewer") on the rectangle, Subscribe on the circle
- Video length: **5:54**

## Pinned comment
```text
Try another: what check digit completes 7927_? Answer: 7. From the right, double the 7 (14 → 5) and the 9 (18 → 9): 5 + 2 + 9 + 7 = 23, and 30 − 23 = 7, so the number is 79277.
```

## Shorts
### Short 1
- File: `renders/014-your-credit-card-number-checks-itself-short-1.mp4`
- Title: `Your card number checks itself #shorts`
- Related video: link it to the main video

```text
Mistype one digit of your card number and a checkout form can spot it without asking your bank. The last digit is a check digit.

Full video: [paste the main video's link]

#shorts #engineering #math
```

### Short 2
- File: `renders/014-your-credit-card-number-checks-itself-short-2.mp4`
- Title: `The one digit swap your card number check misses #shorts`
- Related video: link it to the main video

```text
Swap two different neighboring digits in a card number and the Luhn check usually catches it. There's exactly one exception.

Full video: [paste the main video's link]

#shorts #engineering #math
```

## After uploading
Mark it published (app: "Mark as published", or `npm run publish -- 014 --url <link>`). It updates the topic list and pushes to GitHub.
