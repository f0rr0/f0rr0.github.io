import { readFile, writeFile } from "node:fs/promises";

const root = "tmp/imagegen/face-motion-reference-parity";
const downloads = "downloads/dahbiahmed-face-motion";
const jobsPath = `${root}/jobs.json`;
const manifest = JSON.parse(
  await readFile(`${downloads}/MANIFEST.json`, "utf-8")
);
const jobs = JSON.parse(await readFile(jobsPath, "utf-8"));

const lightTransitions = new Map(
  manifest.files
    .filter((file) => file.kind === "transition" && file.theme === "light")
    .map((file) => [
      `${file.start}_to_${file.end}_${file.frame}`,
      `${downloads}/${file.relative}`,
    ])
);

for (const job of jobs.jobs) {
  const input3 = lightTransitions.get(job.key);
  if (!input3) {
    throw new Error(`Missing reference-site pose for ${job.key}`);
  }

  job.input3 = input3;
  const prompt = await readFile(job.prompt, "utf-8");
  const updated = prompt.replace(
    /Input images: Image 1 is ([\s\S]*?) They have equal authority and are the only image references\. Never mirror either input\./,
    (_match, endpoints) =>
      `Input images: Image 1 is ${endpoints} Images 1 and 2 are the fixed accepted portraits of Sid and are the only authority for subject identity, facial structure, skin, beard, hair design and volume, glasses, wardrobe construction, lighting, camera distance, body scale, placement, and crop. Image 3 is the downloaded reference website's exact matching transition frame at this same progress step; use Image 3 only as the pose template for head yaw, vertical pitch, gaze direction, facial foreshortening, glasses perspective caused by pose, and the monotonic movement rhythm. Apply Image 3's pose mechanics to Sid while preserving the visual subject and composition from Images 1 and 2. Do not transfer any identity, gender, facial features, hair design, glasses design, clothes, colors, lighting, body proportions, or framing from Image 3. Never mirror any input.`
  );

  if (updated === prompt) {
    throw new Error(`Prompt input block did not update for ${job.key}`);
  }
  await writeFile(job.prompt, updated);
}

jobs.referencePoseSource = {
  site: manifest.sourceSite,
  theme: "light",
  role: "pose and motion progression only",
};
await writeFile(jobsPath, `${JSON.stringify(jobs, null, 2)}\n`);

console.log(`Added ${jobs.jobs.length} exact reference-site pose inputs.`);
