import { resumeData } from "@/content/resume";
import { CANONICAL_SITE_URL } from "@/lib/site-url";

export const siteConfig = {
  author: {
    bio: resumeData.summary,
    handle: "f0rr0",
    image: "/resume/sid-jain-profile.png",
    name: resumeData.person.name,
    role: resumeData.person.role,
  },
  description: `${resumeData.person.name}. ${resumeData.summary}`,
  language: "en-US",
  locale: "en_US",
  name: "Sid Jain",
  shortName: "F0RR0",
  url: CANONICAL_SITE_URL,
};

export const publicUrl = (path: string) =>
  new URL(path, CANONICAL_SITE_URL).toString();
