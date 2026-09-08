import { access, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import { FACE_MOTION_CANONICAL_EDGES } from "../../../src/lib/face-motion";

const assetDirectory = "public/resume/face-motion/v13";
const candidateDirectory =
  "build/face-motion-reference-parity/graded-candidates/assets";
const outputDirectory =
  "build/face-motion-reference-parity/graded-candidates/contact-sheets";
const atlasManifest = JSON.parse(
  await readFile(`${assetDirectory}/face-motion-atlas.json`, "utf-8")
);

await mkdir(outputDirectory, { recursive: true });

const candidateOrCurrent = async (file: string) => {
  const candidate = path.join(candidateDirectory, file);

  try {
    await access(candidate);
    return candidate;
  } catch {
    return path.join(assetDirectory, file);
  }
};

const atlasCell = 240;
const atlasComposites = [];

for (const frame of atlasManifest.frames) {
  const input = await candidateOrCurrent(frame.file);
  const image = await sharp(input)
    .resize(atlasCell, atlasCell, { fit: "fill" })
    .png()
    .toBuffer();
  const label = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${atlasCell}" height="${atlasCell}"><rect x="0" y="220" width="240" height="20" fill="#111" fill-opacity=".9"/><text x="5" y="234" fill="#fff" font-size="10" font-family="sans-serif">${frame.index}: ${frame.frame}</text></svg>`
  );
  const left = frame.column * atlasCell;
  const top = frame.row * atlasCell;
  atlasComposites.push({ input: image, left, top }, { input: label, left, top });
}

await sharp({
  create: {
    background: "#ece9e3",
    channels: 4,
    height: atlasCell * 8,
    width: atlasCell * 8,
  },
})
  .composite(atlasComposites)
  .png({ compressionLevel: 9 })
  .toFile(path.join(outputDirectory, "candidate-atlas-contact-sheet.png"));

const cell = 200;
const imageSize = 180;
const labels = ["start", "25%", "50%", "75%", "end"];

for (let page = 0; page < 4; page += 1) {
  const edges = FACE_MOTION_CANONICAL_EDGES.slice(page * 4, page * 4 + 4);
  const composites = [];

  for (const [row, [from, to]] of edges.entries()) {
    const files = [
      await candidateOrCurrent(`${from}.webp`),
      await candidateOrCurrent(`transition-${from}-${to}-1.webp`),
      await candidateOrCurrent(`transition-${from}-${to}-2.webp`),
      await candidateOrCurrent(`transition-${from}-${to}-3.webp`),
      await candidateOrCurrent(`${to}.webp`),
    ];

    for (const [column, file] of files.entries()) {
      const image = await sharp(file)
        .resize(imageSize, imageSize, { fit: "fill" })
        .flatten({ background: "#ece9e3" })
        .png()
        .toBuffer();
      const label = `${from} → ${to} · ${labels[column]}`;
      const overlay = Buffer.from(
        `<svg xmlns="http://www.w3.org/2000/svg" width="${cell}" height="${cell}"><rect x="0" y="180" width="200" height="20" fill="#111"/><text x="6" y="194" fill="#fff" font-size="11" font-family="sans-serif">${label}</text></svg>`
      );
      composites.push(
        { input: image, left: column * cell + 10, top: row * cell },
        { input: overlay, left: column * cell, top: row * cell }
      );
    }
  }

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
    .toFile(path.join(outputDirectory, `motion-sheet-${page + 1}.png`));
}

console.log(outputDirectory);
