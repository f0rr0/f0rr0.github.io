import { mkdir } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import { FACE_MOTION_CANONICAL_EDGES } from "../../../src/lib/face-motion";

const assetDirectory = "public/resume/face-motion/v13";
const outputDirectory = "build/face-motion-reference-parity/motion-sheets";
const cell = 200;
const imageSize = 180;
const labels = ["start", "25%", "50%", "75%", "end"];

await mkdir(outputDirectory, { recursive: true });

for (let page = 0; page < 4; page += 1) {
  const edges = FACE_MOTION_CANONICAL_EDGES.slice(page * 4, page * 4 + 4);
  const composites = [];

  for (const [row, [from, to]] of edges.entries()) {
    const files = [
      `${from}.webp`,
      ...Array.from(
        { length: 3 },
        (_, index) => `transition-${from}-${to}-${index + 1}.webp`
      ),
      `${to}.webp`,
    ];

    for (const [column, file] of files.entries()) {
      const image = await sharp(path.join(assetDirectory, file))
        .resize(imageSize, imageSize, { fit: "fill" })
        .flatten({ background: "#ece9e3" })
        .png()
        .toBuffer();
      const label = `${from} → ${to} · ${labels[column]}`;
      const overlay = Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="${cell}"><rect x="0" y="180" width="200" height="20" fill="#111"/><text x="6" y="194" fill="#fff" font-size="11" font-family="sans-serif">${label}</text></svg>`
      );
      composites.push(
        {
          input: image,
          left: column * cell + 10,
          top: row * cell,
        },
        {
          input: overlay,
          left: column * cell,
          top: row * cell,
        }
      );
    }
  }

  const output = path.join(outputDirectory, `motion-sheet-${page + 1}.png`);
  await sharp({
    create: {
      background: "#ece9e3",
      channels: 4,
      height: cell * edges.length,
      width: cell * 5,
    },
  })
    .composite(composites)
    .png({ compressionLevel: 9 })
    .toFile(output);
  console.log(output);
}
