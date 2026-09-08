import { readFile, writeFile } from "node:fs/promises";

const output = "public/resume/face-motion/v13/TRANSITION-PROMPTS.md";
const oldArchive = await readFile(output, "utf-8");
const jobs = JSON.parse(
  await readFile(
    "tmp/imagegen/face-motion-reference-parity/graded-sequences/jobs.json",
    "utf-8"
  )
);

const retainedSections = [];
for (const edge of ["center_to_right", "center_to_left"]) {
  for (let step = 1; step <= 3; step += 1) {
    const heading = `## ${edge}_${step}`;
    const start = oldArchive.indexOf(heading);
    if (start === -1) {
      throw new Error(`Missing retained prompt section: ${heading}`);
    }
    const next = oldArchive.indexOf("\n## ", start + heading.length);
    retainedSections.push(
      oldArchive.slice(start, next === -1 ? oldArchive.length : next).trim()
    );
  }
}

const sections = [
  `# V13 transition-generation prompts

The 39 regenerated cells on 13 edges with a vertical component were produced by high-quality \`gpt-image-2\` edit jobs that rendered all three intermediate poses together as one \`3072×1024\` strip. Images 1 and 2 were the V13 subject endpoints. For 12 accepted edges, Image 3 was a five-frame strip assembled from the original reference site's start, 25%, 50%, 75%, and end poses and was authoritative only for pose and pacing. The accepted right-to-bottom-right strip used only its two Sid endpoints after the external pose strip repeatedly caused overshoot.

The prompt below each regenerated edge is the final accepted joint-strip prompt. Four edges use their earlier strip's more readable 25% and 50% panels plus the final prompt's endpoint-safe 75% panel; \`PROVENANCE.json\` records the exact source-strip hash chosen for every panel. Nine cells were retained from the previous accepted generation: six pure-horizontal center-to-left/right cells plus the stable left-to-top-left triplet.

The corrected top and bottom endpoints were generated separately. No API key or secret is stored in this archive.`,
];

for (const pose of ["top", "bottom"]) {
  const endpointPrompt = await readFile(
    `tmp/imagegen/face-motion-reference-parity/graded-sequences/prompts/${pose}-endpoint.txt`,
    "utf-8"
  );
  sections.push(`## Corrected ${pose} endpoint

- Model: \`gpt-image-2\`
- Quality: \`high\`
- Output: \`1280×1280\`
- References: prior ${pose}, center, ${pose}-right, ${pose}-left, and original-reference ${pose} pose

\`\`\`text
${endpointPrompt.trim()}
\`\`\``);
}

for (const job of jobs) {
  if (job.edge === "left-top-left") {
    continue;
  }
  const acceptedPrompt =
    job.edge === "right-bottom-right"
      ? "tmp/imagegen/face-motion-reference-parity/graded-sequences/prompts/right-bottom-right-endpoints-only.txt"
      : job.prompt;
  const prompt = await readFile(acceptedPrompt, "utf-8");
  sections.push(`## ${job.from} → ${job.to}

- Model: \`gpt-image-2\`
- Quality: \`high\`
- Output: one \`3072×1024\` strip with three \`1024×1024\` panels
- Subject references: \`${job.start}\`, \`${job.end}\`
- Pose/pacing reference: ${job.edge === "right-bottom-right" ? "none; endpoint-only regeneration" : `\`${job.strip}\``}

\`\`\`text
${prompt.trim()}
\`\`\``);
}

sections.push(`## Retained stable cells

The six pure-horizontal cells below and the three stable \`left\` → \`top-left\` cells were not regenerated in the accepted graded-axis set. The latter remain byte-for-byte identical to the pre-pass release; newer attempts were rejected for pitch overshoot or yaw drift.`);
sections.push(...retainedSections);

await writeFile(output, `${sections.join("\n\n")}\n`);
console.log(output);
