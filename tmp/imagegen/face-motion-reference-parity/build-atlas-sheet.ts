import { mkdir, readFile } from "node:fs/promises";

import sharp from "sharp";

const directory = "public/resume/face-motion/v13";
const manifest = JSON.parse(
  await readFile(`${directory}/face-motion-atlas.json`, "utf-8")
);
const cell = manifest.atlas.cellWidth;
const overlay = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${manifest.atlas.width}" height="${manifest.atlas.height}">${manifest.frames
    .map(
      (frame: {
        column: number;
        frame: string;
        index: number;
        row: number;
      }) =>
        `<rect x="${frame.column * cell}" y="${frame.row * cell + cell - 20}" width="${cell}" height="20" fill="#111" fill-opacity=".9"/><text x="${frame.column * cell + 5}" y="${frame.row * cell + cell - 6}" fill="#fff" font-size="10" font-family="sans-serif">${frame.index}: ${frame.frame}</text>`
    )
    .join("")}</svg>`
);
const output = "build/face-motion-reference-parity/atlas-contact-sheet.png";

await mkdir("build/face-motion-reference-parity", { recursive: true });
await sharp(`${directory}/face-motion-atlas.webp`)
  .flatten({ background: "#ece9e3" })
  .composite([{ input: overlay, left: 0, top: 0 }])
  .png({ compressionLevel: 9 })
  .toFile(output);
console.log(output);
