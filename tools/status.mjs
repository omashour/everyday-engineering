// npm run status — where every video stands, and what to do next.
import { allVideos } from "./lib/stage.mjs";

const vids = allVideos();
if (!vids.length) console.log("No videos yet. Start one with: npm run new-video -- T05");
for (const v of vids) console.log(`${v.dir.padEnd(42)} ${v.stage.padEnd(16)} next: ${v.next}${v.cmd ? `  (${v.cmd})` : ""}`);
