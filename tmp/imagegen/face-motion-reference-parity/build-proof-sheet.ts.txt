import { mkdir } from "node:fs/promises";

import sharp from "sharp";

const [from = "top-right", to = "right"] = process.argv.slice(2);
const output = `build/face-motion-reference-parity/proof-${from}-${to}.png`;
const generatedStem = `transition-${from}-${to}`;
const referenceStem = `${from.replaceAll("-", "")}_to_${to.replaceAll("-", "")}`;
const cells = [
  [`public/resume/face-motion/v13/${from}.webp`, "ours start"],
  [
    `public/resume/face-motion/v13/${generatedStem}-1.webp`,
    "ours 25%",
  ],
  [
    `public/resume/face-motion/v13/${generatedStem}-2.webp`,
    "ours 50%",
  ],
  [
    `public/resume/face-motion/v13/${generatedStem}-3.webp`,
    "ours 75%",
  ],
  [`public/resume/face-motion/v13/${to}.webp`, "ours end"],
  [
    `downloads/dahbiahmed-face-motion/profile/nobg/${from}.webp`,
    "reference start",
  ],
  [
    `downloads/dahbiahmed-face-motion/profile/nobg/transitions/${referenceStem}_1.webp`,
    "reference 25%",
  ],
  [
    `downloads/dahbiahmed-face-motion/profile/nobg/transitions/${referenceStem}_2.webp`,
    "reference 50%",
  ],
  [
    `downloads/dahbiahmed-face-motion/profile/nobg/transitions/${referenceStem}_3.webp`,
    "reference 75%",
  ],
  [`downloads/dahbiahmed-face-motion/profile/nobg/${to}.webp`, "reference end"],
] as const;
const cell = 260;
const imageSize = 240;

await mkdir("build/face-motion-reference-parity", { recursive: true });
const composites = await Promise.all(
  cells.map(async ([file, label], index) => {
    const column = index % 5;
    const row = Math.floor(index / 5);
    const image = await sharp(file)
      .resize(imageSize, imageSize, { fit: "fill" })
      .flatten({ background: "#ece9e3" })
      .png()
      .toBuffer();
    const text = Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="${cell}"><rect x="0" y="240" width="260" height="20" fill="#111"/><text x="8" y="254" fill="#fff" font-size="12" font-family="sans-serif">${label}</text></svg>`
    );
    return [
      { input: image, left: column * cell + 10, top: row * cell },
      { input: text, left: column * cell, top: row * cell },
    ];
  })
);

await sharp({
  create: {
    background: "#ece9e3",
    channels: 4,
    height: cell * 2,
    width: cell * 5,
  },
})
  .composite(composites.flat())
  .png({ compressionLevel: 9 })
  .toFile(output);

console.log(output);
