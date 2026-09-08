import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

import sharp from "sharp";

import { FACE_MOTION_CANONICAL_EDGES } from "../../../src/lib/face-motion";

const referenceDirectory =
  "downloads/dahbiahmed-face-motion/profile/nobg";
const outputDirectory =
  "build/face-motion-reference-parity/original-reference";
const assetDirectory = "public/resume/face-motion/v13";
const atlasManifest = JSON.parse(
  await readFile(`${assetDirectory}/face-motion-atlas.json`, "utf-8")
);

const compactPose = (pose: string) => pose.replaceAll("-", "");
const transitionFile = (from: string, to: string, step: number) =>
  path.join(
    referenceDirectory,
    "transitions",
    `${compactPose(from)}_to_${compactPose(to)}_${step}.webp`
  );
const endpointFile = (pose: string) =>
  path.join(referenceDirectory, `${pose}.webp`);

await mkdir(outputDirectory, { recursive: true });
await mkdir(path.join(outputDirectory, "motion-sheets"), { recursive: true });

const atlasCell = 240;
const atlasWidth = atlasCell * 8;
const atlasHeight = atlasCell * 8;
const atlasComposites = [];

for (const frame of atlasManifest.frames) {
  let input: string;
  const transitionMatch = /^transition-(.+)-([123])\.webp$/.exec(frame.file);

  if (transitionMatch === null) {
    input = endpointFile(frame.frame);
  } else {
    const [, edge, rawStep] = transitionMatch;
    const matchedEdge = FACE_MOTION_CANONICAL_EDGES.find(
      ([from, to]) => `${from}-${to}` === edge
    );

    if (matchedEdge === undefined) {
      throw new Error(`Unknown transition file: ${frame.file}`);
    }

    input = transitionFile(matchedEdge[0], matchedEdge[1], Number(rawStep));
  }

  const image = await sharp(input).png().toBuffer();
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
    height: atlasHeight,
    width: atlasWidth,
  },
})
  .composite(atlasComposites)
  .png({ compressionLevel: 9 })
  .toFile(path.join(outputDirectory, "reference-atlas-contact-sheet.png"));

const cell = 200;
const imageSize = 180;
const labels = ["start", "25%", "50%", "75%", "end"];

for (let page = 0; page < 4; page += 1) {
  const edges = FACE_MOTION_CANONICAL_EDGES.slice(page * 4, page * 4 + 4);
  const composites = [];

  for (const [row, [from, to]] of edges.entries()) {
    const files = [
      endpointFile(from),
      transitionFile(from, to, 1),
      transitionFile(from, to, 2),
      transitionFile(from, to, 3),
      endpointFile(to),
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
    .toFile(
      path.join(outputDirectory, "motion-sheets", `motion-sheet-${page + 1}.png`)
    );
}

console.log(outputDirectory);
