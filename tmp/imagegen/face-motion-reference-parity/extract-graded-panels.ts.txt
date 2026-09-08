import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const jobs = JSON.parse(
  await readFile(
    "tmp/imagegen/face-motion-reference-parity/graded-sequences/jobs.json",
    "utf-8"
  )
);
const cropDirectory =
  "build/face-motion-reference-parity/graded-candidates/raw-crops";
const candidateDirectory =
  "build/face-motion-reference-parity/graded-candidates/assets";
const hybridFirstTwoEdges = new Set([
  "bottom-bottom-left",
  "bottom-right-bottom",
  "center-bottom-left",
  "center-top-left",
  "left-top-left",
]);
const overshootDirectory =
  "output/imagegen/face-motion-reference-parity/graded-sequences/rejected/overshoot-v2";

await Promise.all([
  mkdir(cropDirectory, { recursive: true }),
  mkdir(candidateDirectory, { recursive: true }),
]);

for (const job of jobs) {
  const metadata = await sharp(job.out).metadata();

  if (metadata.width !== 3072 || metadata.height !== 1024) {
    throw new Error(
      `${job.edge} must be 3072x1024, got ${metadata.width}x${metadata.height}`
    );
  }

  for (let step = 1; step <= 3; step += 1) {
    const crop = path.join(cropDirectory, `${job.edge}-${step}.png`);
    const source =
      step <= 2 && hybridFirstTwoEdges.has(job.edge)
        ? path.join(overshootDirectory, `${job.edge}.png`)
        : job.out;
    await sharp(source)
      .extract({ height: 1024, left: (step - 1) * 1024, top: 0, width: 1024 })
      .png({ compressionLevel: 9 })
      .toFile(crop);
  }
}

console.log(`${jobs.length * 3} cropped graded panels`);
