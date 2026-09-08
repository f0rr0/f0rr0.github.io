import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir, readFile } from "node:fs/promises";
import path from "node:path";

const jobsFile = "tmp/imagegen/face-motion-reference-parity/jobs.json";
const cli = "/home/sid/.codex/skills/.system/imagegen/scripts/image_gen.py";
const python = "tmp/imagegen/.venv/bin/python";
const manifest = JSON.parse(await readFile(jobsFile, "utf-8"));
const allJobs = manifest.jobs;
const argument = process.argv[2] ?? "";
const concurrency = Number(process.argv[3] ?? 3);
const requested = new Set(argument.split(",").filter(Boolean));
const selected =
  argument === "--all"
    ? allJobs
    : argument === "--remaining"
      ? allJobs.filter((job) => !existsSync(job.output))
      : allJobs.filter((job) => requested.has(job.key));

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY is not available in this shell");
}
if (selected.length === 0) {
  throw new Error("No matching image-generation jobs were selected");
}
if (!Number.isInteger(concurrency) || concurrency < 1 || concurrency > 6) {
  throw new Error("Concurrency must be an integer from 1 through 6");
}

await mkdir("output/imagegen/face-motion-reference-parity", {
  recursive: true,
});

function run(job) {
  return new Promise((resolve, reject) => {
    const args = [
      cli,
      "edit",
      "--model",
      manifest.model,
      "--quality",
      manifest.quality,
      "--size",
      manifest.size,
      "--image",
      job.input1,
      "--image",
      job.input2,
      "--image",
      job.input3,
      "--prompt-file",
      job.prompt,
      "--out",
      job.output,
      "--no-augment",
    ];
    const child = spawn(python, args, {
      env: process.env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let stderr = "";
    let stdout = "";
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code !== 0) {
        reject(
          new Error(
            `${job.key} failed (${code ?? "signal"})\n${stderr}\n${stdout}`
          )
        );
        return;
      }
      console.log(`GENERATED ${job.key} -> ${path.basename(job.output)}`);
      resolve();
    });
  });
}

let next = 0;
async function worker() {
  while (next < selected.length) {
    const index = next;
    next += 1;
    const job = selected[index];
    await run(job);
  }
}

await Promise.all(
  Array.from({ length: Math.min(concurrency, selected.length) }, worker)
);
console.log(`COMPLETE ${selected.length} jobs`);
