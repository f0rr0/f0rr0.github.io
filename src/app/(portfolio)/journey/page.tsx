import { Download } from "lucide-react";
import type { Metadata } from "next";

import { Journey } from "@/components/journey";
import { JsonLd } from "@/components/json-ld";
import { SiteMain } from "@/components/site-page";
import { SiteShell } from "@/components/site-shell";
import { resumeData } from "@/content/resume";
import { publicUrl, siteConfig } from "@/lib/site";
import { buildProfilePageJsonLd } from "@/lib/structured-data";

const resumeDescription = siteConfig.description;

export const metadata: Metadata = {
  alternates: {
    canonical: "/journey",
  },
  description: resumeDescription,
  openGraph: {
    description: resumeDescription,
    images: [resumeData.person.image],
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: "Sid Jain Journey",
    type: "profile",
    url: publicUrl("/journey"),
  },
  title: "Journey",
  twitter: {
    card: "summary",
    description: resumeDescription,
    images: [resumeData.person.image],
    title: "Sid Jain Journey",
  },
};

const { education, experience, skills } = resumeData;
const profileJsonLd = buildProfilePageJsonLd();

export default function JourneyPage() {
  return (
    <>
      <JsonLd data={profileJsonLd} />
      <SiteShell activeHref="/journey">
        <SiteMain>
          <h1 className="sr-only">Journey</h1>
          <Journey
            experience={experience}
            education={education}
            skills={skills}
            action={
              <a
                key="resume"
                className="site-text-link"
                href="/resume/sid-jain-resume.pdf"
                download
                aria-label="Résumé (PDF)"
              >
                <Download aria-hidden="true" className="size-3.5" />
                Résumé
              </a>
            }
          />
        </SiteMain>
      </SiteShell>
    </>
  );
}
