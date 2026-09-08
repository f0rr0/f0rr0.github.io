import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import path from "node:path";

const jobs = JSON.parse(
  await readFile(
    "tmp/imagegen/face-motion-reference-parity/jobs.json",
    "utf-8"
  )
).jobs;
const concurrency = Number(process.argv[2] ?? 4);

if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 6) {
  throw new Error("Concurrency must be an integer from 1 through 6");
}
const missing = jobs.filter((job) => !existsSync(job.output));
if (missing.length > 0) {
  throw new Error(
    `Cannot process before generation finishes: ${missing.map((job) => job.key).join(", ")}`
  );
}

function releaseFile(job) {
  return path.join(
    "public/resume/face-motion/v13",
    path.basename(job.output).replace(/\.png$/, ".webp")
  );
}

function run(job) {
  return new Promise((resolve, reject) => {
    const output = releaseFile(job);
    const child = spawn(
      "bun",
      ["scripts/build-face-motion-transition.ts", job.output, output],
      { stdio: ["ignore", "pipe", "pipe"] }
    );
    let stderr = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(`${job.key} processing failed\n${stderr}`));
        return;
      }
      console.log(`PROCESSED ${job.key} -> ${path.basename(output)}`);
      resolve();
    });
  });
}

let next = 0;
async function worker() {
  while (next < jobs.length) {
    const index = next;
    next += 1;
    await run(jobs[index]);
  }
}

await Promise.all(
  Array.from({ length: Math.min(concurrency, jobs.length) }, worker)
);
console.log(`COMPLETE ${jobs.length} processed jobs`);
