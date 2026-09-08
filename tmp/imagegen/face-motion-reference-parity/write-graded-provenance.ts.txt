import { createHash } from "node:crypto";
import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

const assetDirectory = "public/resume/face-motion/v13";
const provenanceFile = path.join(assetDirectory, "PROVENANCE.json");
const jobs = JSON.parse(
  await readFile(
    "tmp/imagegen/face-motion-reference-parity/graded-sequences/jobs.json",
    "utf-8"
  )
);
const hybridFirstTwoEdges = new Set([
  "bottom-bottom-left",
  "bottom-right-bottom",
  "center-bottom-left",
  "center-top-left",
]);
const overshootDirectory =
  "output/imagegen/face-motion-reference-parity/graded-sequences/rejected/overshoot-v2";

const sha256 = async (file: string) =>
  createHash("sha256").update(await readFile(file)).digest("hex");
const fileRecord = async (file: string) => ({
  file,
  sha256: await sha256(file),
});

const regeneratedEdges = [];
for (const job of jobs) {
  if (job.edge === "left-top-left") {
    continue;
  }
  const acceptedSources = [];
  const frames = [];

  for (let step = 1; step <= 3; step += 1) {
    const sourceStrip =
      job.edge === "right-bottom-right"
        ? "output/imagegen/face-motion-reference-parity/graded-sequences/in-envelope-v3/right-bottom-right-endpoints-only.png"
        : step <= 2 && hybridFirstTwoEdges.has(job.edge)
          ? path.join(overshootDirectory, `${job.edge}.png`)
          : job.out;
    const releaseFile = `transition-${job.edge}-${step}.webp`;
    acceptedSources.push({
      panel: step,
      sourceStrip,
      sourceStripSha256: await sha256(sourceStrip),
    });
    frames.push({
      fraction: step / 4,
      releaseFile,
      releaseFileSha256: await sha256(path.join(assetDirectory, releaseFile)),
      sourcePanel: step,
    });
  }

  regeneratedEdges.push({
    edge: job.edge,
    endpoints: [job.from, job.to],
    prompt: await fileRecord(
      job.edge === "right-bottom-right"
        ? "tmp/imagegen/face-motion-reference-parity/graded-sequences/prompts/right-bottom-right-endpoints-only.txt"
        : job.prompt
    ),
    poseReferenceStrip:
      job.edge === "right-bottom-right"
        ? {
            file: job.strip,
            role: "rejected for this edge after causing endpoint overshoot",
            sha256: await sha256(job.strip),
          }
        : await fileRecord(job.strip),
    acceptedSources,
    frames,
  });
}

const retainedEdges = [];
for (const edge of ["center-right", "center-left", "left-top-left"]) {
  const frames = [];
  for (let step = 1; step <= 3; step += 1) {
    const releaseFile = `transition-${edge}-${step}.webp`;
    frames.push({
      fraction: step / 4,
      releaseFile,
      releaseFileSha256: await sha256(path.join(assetDirectory, releaseFile)),
      selection: "retained pre-gradation-pass asset",
    });
  }
  retainedEdges.push({ edge, frames });
}

const transitionFiles = (
  await Promise.all(
    [...regeneratedEdges, ...retainedEdges].flatMap((edge) =>
      edge.frames.map((frame) => stat(path.join(assetDirectory, frame.releaseFile)))
    )
  )
).reduce((total, metadata) => total + metadata.size, 0);

const manifest = JSON.parse(
  await readFile(path.join(assetDirectory, "manifest.json"), "utf-8")
);

const provenance = {
  schemaVersion: 2,
  release: 13,
  generatedAt: "2026-08-15",
  generationModel: "gpt-image-2",
  method:
    "Thirty-nine cells on 13 vertical-component edges were regenerated as ordered three-panel strips so 25%, 50%, and 75% pitch/yaw steps could be judged together. Nine stable cells were retained. The former near-level top and bottom endpoints were replaced with true frontal up/down endpoints.",
  referencePolicy: {
    site: "https://dahbiahmed.com",
    downloadedTheme: "light",
    localDirectory: "downloads/dahbiahmed-face-motion/profile/nobg",
    role: "pose direction and evenly graded motion pacing only",
    excluded:
      "identity, face, hair, glasses, expression, clothing, monochrome treatment, body proportions, and framing",
    contactSheets: {
      original:
        "build/face-motion-reference-parity/original-reference/reference-atlas-contact-sheet.png",
      release:
        "build/face-motion-reference-parity/graded-candidates/contact-sheets/candidate-atlas-contact-sheet.png",
    },
  },
  endpoints: {
    unchanged: manifest.endpoints
      .filter(
        (endpoint: { pose: string }) =>
          endpoint.pose !== "top" && endpoint.pose !== "bottom"
      )
      .map((endpoint: { file: string; fileSha256: string; pose: string }) => ({
        file: endpoint.file,
        fileSha256: endpoint.fileSha256,
        pose: endpoint.pose,
      })),
    correctedAxis: await Promise.all(
      ["top", "bottom"].map(async (pose) => ({
        pose,
        model: "gpt-image-2",
        quality: "high",
        size: "1280x1280",
        inputs: [
          `prior V13 ${pose} endpoint: appearance, framing, scale, and edit target`,
          "center.webp: frontal yaw, identity, body framing, and scale",
          `${pose}-right.webp and ${pose}-left.webp: symmetric diagonal pitch context`,
          `downloaded original-reference ${pose}.webp: pure-${pose} pose mechanics only`,
        ],
        rawGeneration: await fileRecord(
          `output/imagegen/face-motion-reference-parity/graded-sequences/${pose}-endpoint.png`
        ),
        prompt: await fileRecord(
          `tmp/imagegen/face-motion-reference-parity/graded-sequences/prompts/${pose}-endpoint.txt`
        ),
        releaseFile: `${pose}.webp`,
        releaseFileSha256: await sha256(
          path.join(assetDirectory, `${pose}.webp`)
        ),
        releaseEncoding: "1254x1254 lossless WebP with alpha",
        alphaExtraction:
          "Adaptive saturated-magenta alpha classification with partial-edge color recovery; subject RGB is unchanged for opaque pixels.",
      }))
    ),
  },
  transitionSet: {
    graph: {
      poses: 9,
      canonicalEdges: 16,
      authoredFramesPerEdge: 3,
      authoredFrames: 48,
      reversePlayback: "same authored frames in reverse order",
    },
    regeneration: {
      model: "gpt-image-2",
      quality: "high",
      outputGeometry: "3072x1024; three exact 1024x1024 panels",
      jobs: 13,
      generatedFrames: 39,
      jointSequenceConstraint:
        "Each strip contains 25%, 50%, and 75% together with strict endpoint envelopes and visible equal-step pose progression.",
      deployedEncoding: "240x240 lossy WebP with alpha",
    },
    selectionPolicy: {
      fullLatestStripEdges: 8,
      hybridEdges: [...hybridFirstTwoEdges],
      endpointOnlyStripEdges: ["right-bottom-right"],
      hybridRule:
        "Use the more readable 25% and 50% panels from the prior joint-strip attempt and the endpoint-safe 75% panel from the tighter redo. Panels are cropped directly; no blend, warp, or interpolation.",
    },
    retainedEdges,
    regeneratedEdges,
    deployedCells: {
      count: 48,
      totalBytes: transitionFiles,
    },
  },
  processing: {
    panelExtraction: true,
    uniformResize: true,
    chromaAlphaExtraction: true,
    rotate: false,
    geometricWarp: false,
    opticalFlow: false,
    interpolation: false,
    frameBlend: false,
  },
};

await writeFile(provenanceFile, `${JSON.stringify(provenance, null, 2)}\n`);
console.log(provenanceFile);
