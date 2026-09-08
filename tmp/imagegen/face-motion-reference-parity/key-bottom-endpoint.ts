import { mkdir } from "node:fs/promises";

import sharp from "sharp";

const pose = process.argv[2] ?? "bottom";
const input = `output/imagegen/face-motion-reference-parity/graded-sequences/${pose}-endpoint.png`;
const outputDirectory = `build/face-motion-reference-parity/graded-candidates/${pose}-key-tests`;

await mkdir(outputDirectory, { recursive: true });

const { data, info } = await sharp(input)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const alphaOnly = Buffer.alloc(info.width * info.height * 4);
const decontaminated = Buffer.alloc(info.width * info.height * 4);
const backdrop = [245, 12, 213];

const clamp = (value: number, minimum = 0, maximum = 1) =>
  Math.max(minimum, Math.min(maximum, value));

for (let pixel = 0; pixel < info.width * info.height; pixel += 1) {
  const sourceOffset = pixel * 3;
  const outputOffset = pixel * 4;
  const red = data[sourceOffset];
  const green = data[sourceOffset + 1];
  const blue = data[sourceOffset + 2];

  // The generated backdrop varies slightly across the square. Classify only
  // saturated magenta pixels and derive a soft edge from their affinity.
  const minimumMagentaChannel = Math.min(red, blue);
  const magentaDominance = minimumMagentaChannel - green;
  const magentaAffinity = clamp(
    Math.min(
      (magentaDominance - 25) / 135,
      (minimumMagentaChannel - 50) / 130
    )
  );
  const alpha = 1 - magentaAffinity;
  const alphaByte = Math.round(alpha * 255);

  alphaOnly[outputOffset] = red;
  alphaOnly[outputOffset + 1] = green;
  alphaOnly[outputOffset + 2] = blue;
  alphaOnly[outputOffset + 3] = alphaByte;

  for (let channel = 0; channel < 3; channel += 1) {
    const original = data[sourceOffset + channel];
    const recovered =
      alpha > 0.02
        ? (original - (1 - alpha) * backdrop[channel]) / alpha
        : original;
    decontaminated[outputOffset + channel] = Math.round(
      clamp(recovered, 0, 255)
    );
  }
  decontaminated[outputOffset + 3] = alphaByte;
}

for (const [name, pixels] of [
  ["alpha-only", alphaOnly],
  ["decontaminated", decontaminated],
] as const) {
  const rgba = sharp(pixels, {
    raw: { channels: 4, height: info.height, width: info.width },
  });

  await rgba
    .clone()
    .png({ compressionLevel: 9 })
    .toFile(`${outputDirectory}/${name}.png`);
  await rgba
    .clone()
    .resize(1254, 1254, { fit: "fill" })
    .webp({ lossless: true })
    .toFile(`${outputDirectory}/${name}.webp`);
}

console.log(outputDirectory);
