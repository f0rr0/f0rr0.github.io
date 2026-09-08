import { readFile, writeFile } from "node:fs/promises";

const jobs = JSON.parse(
  await readFile(
    "tmp/imagegen/face-motion-reference-parity/jobs.json",
    "utf-8"
  )
).jobs;
const sections = await Promise.all(
  jobs.map(async (job) => {
    const prompt = (await readFile(job.prompt, "utf-8")).trim();
    return `## ${job.key}\n\n- Subject references: \`${job.input1}\`, \`${job.input2}\`\n- Pose-only reference: \`${job.input3}\`\n- Fraction: ${job.fraction}\n\n\`\`\`text\n${prompt}\n\`\`\``;
  })
);
const document = `# V13 transition-generation prompts

All 48 frames were generated as separate high-quality \`gpt-image-2\` Image API edit jobs at \`1280×1280\`. Images 1 and 2 in every job are fixed V13 portraits of Sid and are authoritative for the actual subject. Image 3 is the exact matching light-theme transition from dahbiahmed.com and is authoritative only for pose mechanics and motion progress. Reference-site identity, appearance, wardrobe, framing, and styling are explicitly excluded.

${sections.join("\n\n")}
`;

await writeFile(
  "public/resume/face-motion/v13/TRANSITION-PROMPTS.md",
  document
);
console.log("Wrote TRANSITION-PROMPTS.md");
