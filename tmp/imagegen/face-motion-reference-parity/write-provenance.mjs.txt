import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const releaseDirectory = "public/resume/face-motion/v13";
const jobs = JSON.parse(
  await readFile(
    "tmp/imagegen/face-motion-reference-parity/jobs.json",
    "utf-8"
  )
);
const reference = JSON.parse(
  await readFile("downloads/dahbiahmed-face-motion/MANIFEST.json", "utf-8")
);
const provenancePath = `${releaseDirectory}/PROVENANCE.json`;
const provenance = JSON.parse(await readFile(provenancePath, "utf-8"));
const hash = (data) => createHash("sha256").update(data).digest("hex");
const hashFile = async (file) => hash(await readFile(file));
const referenceByRelative = new Map(
  reference.files.map((file) => [file.relative, file])
);

const frames = await Promise.all(
  jobs.jobs.map(async (job) => {
    const step = Number(job.key.at(-1));
    const releaseFile = `transition-${job.start}-${job.end}-${step}.webp`;
    const poseReferenceRelative = job.input3.replace(
      "downloads/dahbiahmed-face-motion/",
      ""
    );
    const poseReference = referenceByRelative.get(poseReferenceRelative);
    if (!poseReference) {
      throw new Error(`Missing downloaded reference manifest row: ${job.input3}`);
    }
    return {
      key: job.key,
      fraction: job.fraction,
      releaseFile,
      releaseFileSha256: await hashFile(`${releaseDirectory}/${releaseFile}`),
      sourceGeneration: job.output,
      sourceGenerationSha256: await hashFile(job.output),
      prompt: job.prompt,
      promptSha256: await hashFile(job.prompt),
      subjectReferences: await Promise.all(
        [job.start, job.end].map(async (pose) => ({
          pose,
          file: `${pose}.webp`,
          fileSha256: await hashFile(`${releaseDirectory}/${pose}.webp`),
          role: "actual subject, identity, hair, glasses, wardrobe, lighting, framing, scale, and crop",
        }))
      ),
      poseReference: {
        sourceSite: reference.sourceSite,
        relative: poseReference.relative,
        url: poseReference.url,
        sha256: poseReference.sha256,
        role: "pose mechanics and motion progression only",
      },
      selection: job.selection ?? "Primary reference-compatible generation accepted",
    };
  })
);

provenance.method =
  "All nine accepted V13 endpoints remain byte-for-byte unchanged. Forty-eight authored transition frames were generated as separate high-quality gpt-image-2 edits: the two adjacent V13 endpoints are authoritative for Sid and the matching dahbiahmed.com transition is authoritative only for pose and motion progress. The accepted right-to-bottom-right edge uses a stricter exact-pose redo selected after side-by-side QA.";
provenance.constraints.uniformResize =
  "Generated 1280x1280 chroma-key transition sources were uniformly normalized to 240x240 runtime-source cells; accepted endpoints remain 1254x1254 lossless masters and are uniformly downsampled only while building the 240px atlas cells.";
provenance.alphaExtraction.fullyTransparentRgb =
  "zeroed before 240px lossy WebP with alpha encoding";
delete provenance.rebuiltTransition;
provenance.transitionSet = {
  generation: {
    model: jobs.model,
    quality: jobs.quality,
    size: jobs.size,
    jobs: 48,
    oneOutputPerJob: true,
  },
  graph: {
    poses: 9,
    canonicalEdges: 16,
    authoredFramesPerEdge: 3,
    authoredFrames: 48,
    reversePlayback: "same authored frames in reverse order",
  },
  referencePolicy: jobs.referencePoseSource,
  promptArchive: "TRANSITION-PROMPTS.md",
  offlineMasters:
    "1280x1280 PNG generation outputs are retained outside the deployed runtime asset directory for future edits.",
  deployedCells: {
    width: 240,
    height: 240,
    format: "lossy WebP with alpha",
    totalBytes: frames.reduce(
      async (totalPromise, frame) => {
        const total = await totalPromise;
        const file = await readFile(`${releaseDirectory}/${frame.releaseFile}`);
        return total + file.byteLength;
      },
      Promise.resolve(0)
    ),
  },
  frames,
};
provenance.transitionSet.deployedCells.totalBytes =
  await provenance.transitionSet.deployedCells.totalBytes;

await writeFile(provenancePath, `${JSON.stringify(provenance, null, 2)}\n`);
console.log(
  `Wrote provenance for ${frames.length} transition frames (${provenance.transitionSet.deployedCells.totalBytes} bytes)`
);
