import { expect, test } from "bun:test";
import { readFileSync } from "node:fs";

import { resumeData } from "../src/content/resume.ts";
import {
  buildJsonResume,
  buildLlmsFullTxt,
  buildLlmsTxt,
} from "../src/lib/resume.ts";
import { siteConfig } from "../src/lib/site.ts";
import { buildProfilePageJsonLd } from "../src/lib/structured-data.ts";

test("profile exports share the full-stack identity, summary, and skills", () => {
  const json = buildJsonResume();
  const person = buildProfilePageJsonLd().mainEntity;

  expect(resumeData.person.role).toBe("Senior Full-Stack Engineer");
  expect(resumeData.summary).toContain("based in Mumbai");
  expect(json.basics.summary).toBe(resumeData.summary);
  expect(person.description).toBe(resumeData.summary);
  expect(siteConfig.description).toContain(resumeData.summary);
  expect(json.skills[0].keywords).toEqual(resumeData.skills);
  expect(resumeData.skills).toEqual(
    expect.arrayContaining([
      "Vercel AI SDK",
      "Mastra",
      "LangGraph",
      "Temporal",
      "Trigger.dev",
      "AWS CDK",
      "Redis",
    ])
  );
  expect(resumeData.skills).not.toContain("pgvector");
  expect(resumeData.skills).not.toContain("Swift");
  expect(resumeData.skills).not.toContain("Kotlin");
  expect(person.knowsAbout).toEqual(resumeData.skills);
  expect(json.basics.label).toBe("Senior Full Stack Engineer");
  expect(person.jobTitle).toBe(json.basics.label);
});

test("revised titles, engineering decisions, and visible skills survive the résumé exports", () => {
  const json = buildJsonResume();
  const context = buildLlmsFullTxt();
  const typst = readFileSync(resumeData.pdf.generatedTypstPath, "utf-8");
  const skillsSection = typst.slice(
    typst.indexOf('"Skills"'),
    typst.indexOf('"Experience"')
  );

  for (const [company, title] of [
    ["Housing", "Software Development Engineer II"],
    ["8fit", "Senior Software Engineer"],
  ]) {
    expect(json.work.find((item) => item.name === company).position).toBe(
      title
    );
    expect(context).toContain(`Title: ${title}.`);
    expect(typst).toContain(title);
  }
  for (const skill of resumeData.skills) {
    expect(skillsSection).toContain(skill);
  }
  expect(typst).toContain('paper: "us-legal"');
  expect(typst).toContain('fill: rgb("#1a1918")');
  expect(typst.match(/based in Mumbai/gi)).toHaveLength(1);
  expect(JSON.stringify({ json, context, typst })).not.toMatch(
    /APAC|travel availability|Location and mobility|currently building|ongoing work|work in progress/i
  );
  expect(
    json.work.find((item) => item.name === "Namefi").highlights.join(" ")
  ).toContain("reused completed model results on retry");
  expect(
    json.work.find((item) => item.name === "Memorang").highlights.join(" ")
  ).toContain("without breaking client apps or services");
  expect(
    json.publications.some((item) =>
      item.url.includes("progressive-ai-buyer-discovery-method")
    )
  ).toBe(true);
});

test("engagement heading does not become a fictitious employer or founder claim", () => {
  const engagement = resumeData.experience.find(
    (item) => item.company === "Yuppies Tech"
  );
  const json = buildJsonResume();
  const work = json.work.find((item) => item.name === "Yuppies Tech");
  const context = buildLlmsFullTxt();

  expect(engagement.displayName).toBe("Product engineering engagements");
  expect(work.position).toBe("Self-employed");
  expect(work.summary).toContain("client product teams");
  expect(json.work.some((item) => item.name === engagement.displayName)).toBe(
    false
  );
  expect(context).toContain(
    "## Product engineering engagements (Yuppies Tech)"
  );
  expect(context).not.toMatch(/\bfounded\b|\bFounder\b/);
  expect(siteConfig.description).not.toMatch(/\bfounded\b|\bFounder\b/);
  expect(json.work.find((item) => item.name === "Yilu").position).toBe(
    "Founding Engineer"
  );
});

test("corrected team counts and technical scope survive the public exports", () => {
  const json = buildJsonResume();
  const context = buildLlmsFullTxt();
  const memorang = json.work.find((item) => item.name === "Memorang");
  const kult = json.work.find((item) => item.name === "Kult");
  const publicCopy = JSON.stringify({ json, context });

  expect(memorang.leadershipScope).toBe("Led 2 engineers");
  expect(memorang.highlights.join(" ")).toContain("metadata filters");
  expect(memorang.highlights.join(" ")).toContain("pgvector");
  expect(kult.leadershipScope).toBe("Led 10 engineers");
  expect(kult.highlights.join(" ")).toContain("Kotlin and Swift");
  expect(publicCopy).not.toMatch(
    /Kotlin Multiplatform|GraphRAG|Neo4j|GraphJS|Applied AI Lead|Managed 3|three-person|semantic media search/i
  );
  expect(context).toContain("Developed AI usage metering");
});

test("LLM guidance adds useful context without leaking review history into the profile", () => {
  const guide = buildLlmsTxt();
  const context = buildLlmsFullTxt();
  const json = buildJsonResume();
  const structuredData = buildProfilePageJsonLd();
  const publicCopy = JSON.stringify({
    source: resumeData,
    json,
    guide,
    context,
    site: siteConfig,
    structuredData,
  });

  expect(publicCopy).not.toMatch(
    /first-person-confirmed|confirmed by Sid|controlled timing study|Treat the unpublished Memorang article|not independent verification/i
  );
  for (const note of resumeData.machineReadable.agentNotes) {
    expect(guide).toContain(note);
    expect(context).toContain(note);
    expect(
      JSON.stringify({ json, site: siteConfig, structuredData })
    ).not.toContain(note);
  }
  expect(guide).toContain("f0rr0 and yuppiestechdev");
  expect(guide).toContain("clients within that period, not separate employers");
  expect(guide).toContain("/llms-full.txt");
  expect(guide).toContain("/resume.json");
  expect(guide).not.toContain("## Current Work: Namefi");
  expect(guide.length).toBeLessThan(context.length / 2);
  for (const section of guide.split(/^## .+\n/gm).slice(1)) {
    expect(
      section
        .trim()
        .split("\n")
        .every((line) => line.startsWith("- ["))
    ).toBe(true);
  }
  expect(context).toContain(resumeData.summary);
  expect(context).toContain("about five minutes per domain");
  expect(context).toContain("Shipped a media recommender inside the CMS");
  expect(context).toContain("Developed AI usage metering.");
  expect(context).toContain("Contracting company: Yuppies Tech.");
  expect(context).toContain("single-domain cost benchmark");
  expect(context).not.toContain("## Writing");
  expect(context).not.toContain("current build");
  const withWriting = buildLlmsTxt([
    {
      date: new Date("2026-09-06T00:00:00Z"),
      metadata: {
        title: "Protocol engineering",
        summary: "Typed codecs and message synchronization.",
      },
      slug: "protocol-engineering",
    },
  ]);
  expect(withWriting).toContain("## Writing");
  expect(withWriting).toContain("/blog/protocol-engineering.md");
  expect(withWriting).toContain("Typed codecs and message synchronization.");
});

test("the guide curates writing while the full context retains all published links", () => {
  const posts = Array.from({ length: 8 }, (_, index) => ({
    date: new Date("2026-09-06T00:00:00Z"),
    metadata: {
      title: `Article ${index}`,
      summary: "Engineering decisions.",
      draft: index === 0,
    },
    slug: `article-${index}`,
  }));
  const guide = buildLlmsTxt(posts);
  const full = buildLlmsFullTxt(posts);

  expect(guide).not.toContain("/blog/article-0.md");
  expect(full).not.toContain("/blog/article-0.md");
  expect(guide).toContain("/blog/article-5.md");
  expect(guide).not.toContain("/blog/article-6.md");
  expect(full).toContain("/blog/article-7.md");
  expect(buildLlmsTxt([posts[0]])).not.toContain("## Writing");
});
