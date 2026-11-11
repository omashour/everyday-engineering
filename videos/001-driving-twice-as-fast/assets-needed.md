# Assets needed — 001

| File (put in `assets/`) | What | Where to get it | License to record |
|---|---|---|---|
| `road.jpg` | Side or low-angle photo of a straight road with a car on it, horizon in the upper third | Your own photo, or Wikimedia Commons / Openverse search "straight road car side view" | CC0 / CC BY (write author + license in `credit:`) |

Then in scenes.yaml, scene S01: change `src: road-placeholder.svg` to `src: road.jpg`, update `credit:`, and adjust the overlay coordinates (they are % of the frame) so the measurement lines sit on the road. Same for thumbnail.yaml variant 2.
