import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

const assetDirectory = "public/resume/face-motion/v13";
const previousDirectory =
  "build/face-motion-reference-parity/previous-assets";
const outputDirectory =
  "build/face-motion-reference-parity/envelope-comparison";
const edges = [
  ["right", "bottom-right"],
  ["left", "top-left"],
] as const;
const labels = [
  "start",
  "old 25",
  "old 50",
  "old 75",
  "new 25",
  "new 50",
  "new 75",
  "v3 25",
  "v3 50",
  "v3 75",
  "end",
];
const cell = 180;

await mkdir(outputDirectory, { recursive: true });

for (const [from, to] of edges) {
  const edge = `${from}-${to}`;
  const files = [
    path.join(assetDirectory, `${from}.webp`),
    ...[1, 2, 3].map((step) =>
      path.join(previousDirectory, `transition-${edge}-${step}.webp`)
    ),
    ...[1, 2, 3].map((step) =>
      path.join(assetDirectory, `transition-${edge}-${step}.webp`)
    ),
    ...[1, 2, 3].map((step) =>
      path.join(
        "build/face-motion-reference-parity/in-envelope-v3-assets",
        `transition-${edge}-${step}.webp`
      )
    ),
    path.join(assetDirectory, `${to}.webp`),
  ];
  const composites = [];

  for (const [column, file] of files.entries()) {
    const image = await sharp(file)
      .resize(cell, cell, { fit: "fill" })
      .flatten({ background: "#ece9e3" })
      .png()
      .toBuffer();
    const label = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="${cell}"><rect y="160" width="${cell}" height="20" fill="#111"/><text x="5" y="174" fill="#fff" font-size="11" font-family="sans-serif">${labels[column]}</text></svg>`
    );
    composites.push(
      { input: image, left: column * cell, top: 0 },
      { input: label, left: column * cell, top: 0 }
    );
  }

  await sharp({
    create: {
      background: "#ece9e3",
      channels: 4,
      height: cell,
      width: cell * files.length,
    },
  })
    .composite(composites)
    .png()
    .toFile(path.join(outputDirectory, `${edge}.png`));
}

console.log(outputDirectory);
