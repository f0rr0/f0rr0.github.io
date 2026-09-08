import { mkdir } from "node:fs/promises";

import sharp from "sharp";

const output =
  "build/face-motion-reference-parity/right-bottom-right-redo-comparison.png";
const rows = [
  {
    label: "original",
    files: [
      "public/resume/face-motion/v13/right.webp",
      ...[1, 2, 3].map(
        (step) =>
          `public/resume/face-motion/v13/transition-right-bottom-right-${step}.webp`
      ),
      "public/resume/face-motion/v13/bottom-right.webp",
    ],
  },
  {
    label: "exact-pose redo",
    files: [
      "public/resume/face-motion/v13/right.webp",
      ...[1, 2, 3].map(
        (step) =>
          `tmp/imagegen/face-motion-reference-parity/redo-keyed/transition-right-bottom-right-${step}.webp`
      ),
      "public/resume/face-motion/v13/bottom-right.webp",
    ],
  },
  {
    label: "reference pose",
    files: [
      "downloads/dahbiahmed-face-motion/profile/nobg/right.webp",
      ...[1, 2, 3].map(
        (step) =>
          `downloads/dahbiahmed-face-motion/profile/nobg/transitions/right_to_bottomright_${step}.webp`
      ),
      "downloads/dahbiahmed-face-motion/profile/nobg/bottom-right.webp",
    ],
  },
];
const cell = 220;
const imageSize = 200;
const steps = ["start", "25%", "50%", "75%", "end"];
const composites = [];

await mkdir("build/face-motion-reference-parity", { recursive: true });
for (const [rowIndex, row] of rows.entries()) {
  for (const [column, file] of row.files.entries()) {
    const input = await sharp(file)
      .resize(imageSize, imageSize, { fit: "fill" })
      .flatten({ background: "#ece9e3" })
      .png()
      .toBuffer();
    const overlay = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="${cell}"><rect x="0" y="200" width="220" height="20" fill="#111"/><text x="6" y="214" fill="#fff" font-size="11" font-family="sans-serif">${row.label} · ${steps[column]}</text></svg>`
    );
    composites.push(
      { input, left: column * cell + 10, top: rowIndex * cell },
      { input: overlay, left: column * cell, top: rowIndex * cell }
    );
  }
}

await sharp({
  create: {
    background: "#ece9e3",
    channels: 4,
    height: cell * rows.length,
    width: cell * 5,
  },
})
  .composite(composites)
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(output);
