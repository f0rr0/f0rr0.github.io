import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import { FACE_MOTION_CANONICAL_EDGES } from "../../../src/lib/face-motion";

const referenceDirectory =
  "downloads/dahbiahmed-face-motion/profile/nobg";
const subjectDirectory = "public/resume/face-motion/v13";
const outputDirectory =
  "tmp/imagegen/face-motion-reference-parity/graded-sequences";
const stripDirectory = path.join(outputDirectory, "reference-strips");
const promptDirectory = path.join(outputDirectory, "prompts");
const generatedDirectory =
  "output/imagegen/face-motion-reference-parity/graded-sequences";
const poseY = {
  bottom: 1,
  "bottom-left": Math.SQRT1_2,
  "bottom-right": Math.SQRT1_2,
  center: 0,
  left: 0,
  right: 0,
  top: -1,
  "top-left": -Math.SQRT1_2,
  "top-right": -Math.SQRT1_2,
} as const;
const posePlans: Record<string, string> = {
  "bottom-bottom-left":
    "Panel 1: yaw 8° toward screen-left and strong downward pitch. Panel 2: yaw 16° toward screen-left and medium-strong downward pitch. Panel 3: yaw 24° toward screen-left and moderate downward pitch.",
  "bottom-left-left":
    "Keep yaw fixed at exactly 32° toward screen-left in all panels. Panel 1: chin and gaze 15° below level. Panel 2: chin and gaze 10° below level. Panel 3: chin and gaze 5° below level. These three pitch angles must be visibly distinct even at 120×120: the lens height relative to the ears, visible forehead area, nose angle, and chin-to-collar gap must advance by equal increments. Reject any result where panels 1 and 2 look alike or panel 3 carries most of the pitch change.",
  "bottom-right-bottom":
    "Panel 1: yaw 24° toward screen-right with moderate downward pitch. Panel 2: yaw 16° toward screen-right with medium-strong downward pitch. Panel 3: yaw 8° toward screen-right with strong downward pitch.",
  "center-bottom":
    "PURE VERTICAL PATH. Keep yaw exactly 0° and roll exactly 0° in all three panels; face stays perfectly front-facing and centered. Panel 1: chin and gaze subtly downward, about one quarter of the final pitch. Panel 2: chin and gaze clearly downward, exactly halfway. Panel 3: chin and gaze strongly downward, three quarters. Nose, philtrum, chin, and sternum remain on one vertical centerline.",
  "center-bottom-left":
    "Panel 1: yaw 8° toward screen-left with mild downward pitch. Panel 2: yaw 16° toward screen-left with medium downward pitch. Panel 3: yaw 24° toward screen-left with stronger downward pitch.",
  "center-bottom-right":
    "Panel 1: yaw 8° toward screen-right with mild downward pitch. Panel 2: yaw 16° toward screen-right with medium downward pitch. Panel 3: yaw 24° toward screen-right with stronger downward pitch.",
  "center-top":
    "PURE VERTICAL PATH. Keep yaw exactly 0° and roll exactly 0° in all three panels; face stays perfectly front-facing and centered. Panel 1: chin and gaze subtly upward, about one quarter of the final pitch. Panel 2: chin and gaze clearly upward, exactly halfway. Panel 3: chin and gaze strongly upward, three quarters. Nose, philtrum, chin, and sternum remain on one vertical centerline.",
  "center-top-left":
    "Panel 1: yaw 8° toward screen-left with mild upward pitch. Panel 2: yaw 16° toward screen-left with medium upward pitch. Panel 3: yaw 24° toward screen-left with stronger upward pitch.",
  "center-top-right":
    "Panel 1: yaw 8° toward screen-right with mild upward pitch. Panel 2: yaw 16° toward screen-right with medium upward pitch. Panel 3: yaw 24° toward screen-right with stronger upward pitch.",
  "left-top-left":
    "Keep yaw steadily at about 32° toward screen-left. Panel 1: mildly upward pitch. Panel 2: medium upward pitch. Panel 3: strongly upward pitch.",
  "right-bottom-right":
    "Keep yaw steadily at about 32° toward screen-right. Panel 1: mildly downward pitch. Panel 2: medium downward pitch. Panel 3: strongly downward pitch.",
  "top-left-top":
    "Keep strong upward pitch throughout. Panel 1: yaw exactly 24° toward screen-left. Panel 2: yaw exactly 16° toward screen-left. Panel 3: yaw exactly 8° toward screen-left. The nose-to-center offset, far-lens width, visible cheek width, and ear visibility must change by equal increments. These yaw differences must remain obvious at 120×120. Reject any result where panels 1 and 2 look alike or panel 3 carries most of the yaw change.",
  "top-right-right":
    "Keep yaw steadily at about 32° toward screen-right. Panel 1: strongly upward pitch. Panel 2: medium upward pitch. Panel 3: mildly upward pitch.",
  "top-top-right":
    "Panel 1: yaw 8° toward screen-right with very strong upward pitch. Panel 2: yaw 16° toward screen-right with medium-strong upward pitch. Panel 3: yaw 24° toward screen-right with strong upward pitch.",
};

const compactPose = (pose: string) => pose.replaceAll("-", "");
const transitionFile = (from: string, to: string, step: number) =>
  path.join(
    referenceDirectory,
    "transitions",
    `${compactPose(from)}_to_${compactPose(to)}_${step}.webp`
  );
const endpointFile = (pose: string) =>
  path.join(referenceDirectory, `${pose}.webp`);

await Promise.all([
  mkdir(stripDirectory, { recursive: true }),
  mkdir(promptDirectory, { recursive: true }),
  mkdir(generatedDirectory, { recursive: true }),
]);

const verticalEdges = FACE_MOTION_CANONICAL_EDGES.filter(
  ([from, to]) => poseY[from] !== poseY[to]
);
const jobs = [];

for (const [from, to] of verticalEdges) {
  const edge = `${from}-${to}`;
  const posePlan = posePlans[edge];

  if (posePlan === undefined) {
    throw new Error(`Missing pose plan for ${edge}`);
  }
  const sources = [
    endpointFile(from),
    transitionFile(from, to, 1),
    transitionFile(from, to, 2),
    transitionFile(from, to, 3),
    endpointFile(to),
  ];
  const labels = ["START 0%", "STEP 1 25%", "STEP 2 50%", "STEP 3 75%", "END 100%"];
  const composites = [];

  for (const [index, source] of sources.entries()) {
    const image = await sharp(source)
      .resize(240, 240, { fit: "fill" })
      .flatten({ background: "#ece9e3" })
      .png()
      .toBuffer();
    const label = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240"><rect x="0" y="216" width="240" height="24" fill="#111"/><text x="7" y="233" fill="#fff" font-size="13" font-family="sans-serif" font-weight="700">${labels[index]}</text></svg>`
    );
    composites.push(
      { input: image, left: index * 240, top: 0 },
      { input: label, left: index * 240, top: 0 }
    );
  }

  const strip = path.join(stripDirectory, `${edge}.png`);
  await sharp({
    create: {
      background: "#ece9e3",
      channels: 4,
      height: 240,
      width: 1200,
    },
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(strip);

  const prompt = `Use case: identity-preserve
Asset type: three-frame portrait animation sprite strip
Input images:
- Image 1: authoritative START portrait of Sid at 0%. Preserve this exact person, hair volume and silhouette, sunglasses, facial hair, clothing construction, body scale, crop, lighting, and rendering style.
- Image 2: authoritative END portrait of Sid at 100%. Preserve this exact person and endpoint pose target, with the same invariants as Image 1.
- Image 3: authoritative five-frame POSE AND PACING reference strip from another person, ordered START 0%, STEP 1 25%, STEP 2 50%, STEP 3 75%, END 100%. Copy only its head rotation, vertical head pitch, eye direction, and evenly graded progression. Do not copy its identity, face, hair, glasses, expression, clothing, monochrome treatment, or framing.

Primary request: Render Sid from Images 1 and 2 at the three missing intermediate poses for ${from} to ${to}. The three panels must be visibly and monotonically graded at exactly 25%, 50%, and 75% of the motion demonstrated by Image 3. Each panel must advance by one equal quarter-step from the previous pose. No two panels may have the same head pitch, gaze elevation, lens perspective, or chin angle. Where the path changes yaw, no two panels may have the same yaw or nose/ear relationship; on a pure vertical path, yaw must instead remain exactly zero. Avoid front-loading the motion in panel 1 or postponing it until panel 3.

Mandatory per-panel pose plan: ${posePlan}

Hard endpoint envelope (higher priority than any approximate angle language above): Image 1 is the exact 0% pose and Image 2 is the exact 100% pose for Sid. Rescale all yaw and pitch magnitudes to those actual endpoints. Panel 1 must be exactly one quarter of the way from Image 1 to Image 2, panel 2 exactly halfway, and panel 3 exactly three quarters. Every intermediate yaw, pitch, gaze, lens perspective, nose offset, ear visibility, and chin angle must remain strictly between the corresponding values in Images 1 and 2. Never overshoot either endpoint. Panel 1 must not repeat Image 1, panel 3 must not equal or exceed Image 2, and the transition from panel 3 to Image 2 must continue in the same direction without snapping back.

Output geometry: one 3072×1024 horizontal sprite strip split into exactly three equal 1024×1024 panels. Panel 1 is 25%, panel 2 is 50%, panel 3 is 75%. Place panel boundaries exactly at x=1024 and x=2048. No gutters, borders, dividers, labels, text, repeated panels, or extra subjects.

Scene/backdrop: perfectly flat solid #ff00ff chroma-key background in every panel, with no shadows, gradients, texture, floor plane, or lighting variation. Do not use #ff00ff in the subject.

Composition/framing: exactly one waist-up Sid portrait centered in each square panel; keep shoulder position, subject scale, torso framing, canvas position, and crop consistent across all three panels and matched to Images 1 and 2. Only the head pose and eye direction should progress.

Constraints: preserve Sid's identity and facial proportions; preserve the full dense side hair volume without flattening or abrupt creases; preserve the same sunglasses, beard, dark overshirt, white T-shirt, pocket and button placement in every panel; preserve realistic anatomy; no morphing; no clothing-side swaps; no zoom; no body lean; no expression change; no watermark. The progression in Image 3 is absolute pose authority and must remain visibly readable when the panels are viewed in sequence.`;
  const promptFile = path.join(promptDirectory, `${edge}.txt`);
  await writeFile(promptFile, `${prompt}\n`);
  jobs.push({
    edge,
    end: path.join(subjectDirectory, `${to}.webp`),
    from,
    out: path.join(generatedDirectory, `${edge}.png`),
    prompt: promptFile,
    start: path.join(subjectDirectory, `${from}.webp`),
    strip,
    to,
  });
}

await writeFile(
  path.join(outputDirectory, "jobs.json"),
  `${JSON.stringify(jobs, null, 2)}\n`
);
console.log(`${verticalEdges.length} vertical-motion edge jobs`);
