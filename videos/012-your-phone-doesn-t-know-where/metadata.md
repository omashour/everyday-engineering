**Title:** Your Phone Doesn't Know Where You Are
**Alternates:** How GPS Finds You With Circles and Spheres · Why GPS Needs Four Satellites, Not Three
**Playlist:** math-for-engineers
**Description:** Your phone doesn't start out knowing where you are. It starts with signal timings, plus satellite positions worked out from orbit data the satellites broadcast. From those, it finds you to within about five meters under open sky.

You'll see how a travel time becomes an apparent distance (a pseudorange), why one distance puts you on a circle, why subtracting two circle equations gives exactly two candidate points, and how a third distance picks one (trilateration). Then we move to three dimensions and meet the real twist: a phone clock just one microsecond ahead makes every apparent distance about 300 m too long. That shared error becomes one more unknown, which is why a standalone fix normally needs at least four satellite signals.

Assumptions: the map example is an idealized flat model with exact distances and a deliberately exaggerated 1 km clock error. Real receivers estimate position and clock error together from noisy measurements and also deal with atmospheric delays, reflections and satellite geometry. "About 5 m" is a typical figure for smartphones under open sky.

Chapters
[paste chapters.txt here]
**Tags:** how gps works, gps, trilateration, pseudorange, why gps needs four satellites, gps clock error, speed of light, circles and spheres, distance formula, geometry in real life, algebra in real life, smartphone location, navigation, math for engineers, everyday engineering
**Pinned comment:** Try it: stations at A(0, 0) and B(6, 0) both say you're 5 km away. Where could you be? Answer: subtracting the circles gives 12x − 36 = 0, so x = 3; then y² = 16, so y = ±4. Two points: (3, 4) and (3, −4).
