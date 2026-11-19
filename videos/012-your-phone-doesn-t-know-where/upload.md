# Upload sheet — 012: Your Phone Doesn't Know Where You Are

Copy each box into YouTube Studio.

## Files
- [x] Video: `renders/012-your-phone-doesn-t-know-where.mp4`
- [x] Thumbnails (upload all for YouTube's A/B test: Thumbnail → Test & compare): `thumbnails/thumb-1.png`, `thumbnails/thumb-2.png`
- [x] Captions: `captions.srt` (Subtitles → Add language: English → Upload file → With timing)

## Title (37 characters)
```text
Your Phone Doesn't Know Where You Are
```
Alternates: How GPS Finds You With Circles and Spheres · Why GPS Needs Four Satellites, Not Three

## Description (1594 characters)
```text
Your phone doesn't start out knowing where you are. It starts with signal timings, plus satellite positions worked out from orbit data the satellites broadcast. From those, it finds you to within about five meters under open sky.

You'll see how a travel time becomes an apparent distance (a pseudorange), why one distance puts you on a circle, why subtracting two circle equations gives exactly two candidate points, and how a third distance picks one (trilateration). Then we move to three dimensions and meet the real twist: a phone clock just one microsecond ahead makes every apparent distance about 300 m too long. That shared error becomes one more unknown, which is why a standalone fix normally needs at least four satellite signals.

Assumptions: the map example is an idealized flat model with exact distances and a deliberately exaggerated 1 km clock error. Real receivers estimate position and clock error together from noisy measurements and also deal with atmospheric delays, reflections and satellite geometry. "About 5 m" is a typical figure for smartphones under open sky.

Chapters
0:00 Timings and orbits
0:16 Time becomes distance
0:47 One distance: a circle
1:00 Two distances: two points
1:14 Why two points?
1:42 Three distances: one point
2:01 In three dimensions
2:24 The clock problem
2:42 One shared correction
3:25 Four satellites, four unknowns
3:52 How close does it get?
4:16 Remember this

Math, physics and engineering, explained through everyday things.
Subscribe: https://www.youtube.com/@EverydayEngineeringExplained

#engineering #math #EverydayEngineering
```

## Tags
```text
how gps works, gps, trilateration, pseudorange, why gps needs four satellites, gps clock error, speed of light, circles and spheres, distance formula, geometry in real life, algebra in real life, smartphone location, navigation, math for engineers, everyday engineering
```

## Settings
- Playlist: **Math for Engineers**
- Audience: **No, it's not made for kids**
- Category: **Education**
- Video language: **English**
- Caption certification: **None**
- License: **Standard YouTube License**
- Altered or synthetic content: **decide per video using YouTube's current guidance on realistic AI-generated content (the narration voice is AI-generated).**
- End screen: from 4:38 to the end (7 s): one video ("Best for viewer") on the rectangle, Subscribe on the circle
- Video length: **4:45**

## Pinned comment
```text
Try it: stations at A(0, 0) and B(6, 0) both say you're 5 km away. Where could you be? Answer: subtracting the circles gives 12x − 36 = 0, so x = 3; then y² = 16, so y = ±4. Two points: (3, 4) and (3, −4).
```

## Shorts
### Short 1
- File: `renders/012-your-phone-doesn-t-know-where-short-1.mp4`
- Title: `How GPS Finds You, Explained With Three Circles #shorts`
- Related video: link it to the main video

```text
One distance gives a circle, two give two points, three give one. Then a fourth satellite handles your phone's clock.

Full video: [paste the main video's link]

#shorts #engineering #math
```

### Short 2
- File: `renders/012-your-phone-doesn-t-know-where-short-2.mp4`
- Title: `Why 1 Microsecond Means 300 Meters in GPS #shorts`
- Related video: link it to the main video

```text
A tiny clock error adds the same extra distance to every satellite. Here's how GPS handles it.

Full video: [paste the main video's link]

#shorts #engineering #math
```

## After uploading
Mark it published (app: "Mark as published", or `npm run publish -- 012 --url <link>`). It updates the topic list and pushes to GitHub.
