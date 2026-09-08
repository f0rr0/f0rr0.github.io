import { readFile, writeFile } from "node:fs/promises";

for (const step of [1, 2, 3]) {
  const source = `tmp/imagegen/face-motion-reference-parity/prompts/right_to_bottom-right_${step}.txt`;
  const output = `tmp/imagegen/face-motion-reference-parity/prompts/right_to_bottom-right_${step}_exact-pose.txt`;
  const prompt = await readFile(source, "utf-8");
  const updated = prompt
    .replace(
      /^Primary request:.*$/m,
      `Primary request: Generate exactly one new portrait of Sid with the exact head pose shown by Image 3. Image 3 is the accepted reference website's authored step ${step} for this edge and is the absolute authority for head yaw, vertical pitch, chin elevation, gaze, facial foreshortening, and pose-induced glasses perspective. Copy those pose mechanics precisely onto Sid. The 25/50/75 percent label describes sequence order only; do not independently estimate, average, exaggerate, or advance the pose from Images 1 and 2.`
    )
    .replace(
      /Image 3 is the downloaded reference website's exact matching transition frame at this same progress step; use Image 3 only as the pose template for head yaw, vertical pitch, gaze direction, facial foreshortening, glasses perspective caused by pose, and the monotonic movement rhythm\./,
      "Image 3 is the downloaded reference website's exact matching transition frame at this same progress step and has absolute authority for head yaw, vertical pitch, chin elevation, gaze direction, facial foreshortening, pose-induced glasses perspective, and movement timing. Match that pose exactly."
    )
    .replace(
      /^Required pose:.*$/m,
      "Required pose: match Image 3 exactly. Do not look lower, higher, more frontal, or farther right than Image 3. In particular, steps 1 and 2 must stay close to the level right start if Image 3 does, while step 3 may approach the down-right endpoint only to the degree shown by Image 3."
    )
    .replace(
      /^Required continuity:.*$/m,
      "Required continuity: derive hair crown height, side volume, sweep, hairline, glasses design, identity, neck, shoulders, collar, torso scale, pocket, buttons, and shirt seams only from Images 1 and 2. Never copy Image 3's hair or appearance. Keep the V13 hair silhouette smoothly between the two V13 endpoints with no abrupt frontal flop, narrowed side, notch, scale jump, or body-framing change."
    );
  await writeFile(output, updated);
}

console.log("Wrote exact-pose redo prompts for right_to_bottom-right");
