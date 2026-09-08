import { readFile, writeFile } from "node:fs/promises";

const jobsFile = "tmp/imagegen/face-motion-reference-parity/jobs.json";
const manifest = JSON.parse(await readFile(jobsFile, "utf-8"));

for (const job of manifest.jobs) {
  if (job.start !== "right" || job.end !== "bottom-right") {
    continue;
  }
  const step = job.key.at(-1);
  job.output = `output/imagegen/face-motion-reference-parity/redo-transition-right-bottom-right-${step}.png`;
  job.prompt = `tmp/imagegen/face-motion-reference-parity/prompts/right_to_bottom-right_${step}_exact-pose.txt`;
  job.selection =
    "Exact-pose redo accepted: reference-site frame is authoritative for pose; V13 endpoints remain authoritative for subject, hair, wardrobe, framing, and scale.";
}

await writeFile(jobsFile, `${JSON.stringify(manifest, null, 2)}\n`);
console.log("Selected exact-pose right_to_bottom-right redo");
