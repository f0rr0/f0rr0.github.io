import Image from "next/image";

import { CopyEmailButton } from "@/components/copy-email-button";
import { resumeData } from "@/content/resume";
import { buildAskAgentLinks } from "@/lib/resume";
import { publicUrl } from "@/lib/site";

const { actions } = buildAskAgentLinks();

export function SiteFooter() {
  return (
    <footer className="site-container pb-8 print:hidden">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-t border-border pt-4">
        <nav aria-label="Contact and feed" className="flex items-center gap-6">
          <CopyEmailButton email={resumeData.person.email} />
          <a
            className="site-text-link"
            href="https://linkedin.com/in/f0rr0"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="site-text-link"
            href={publicUrl("/rss.xml")}
            type="application/rss+xml"
            rel="alternate"
          >
            RSS
          </a>
        </nav>
        <p className="flex flex-wrap items-center gap-x-2 text-muted-foreground">
          <span>Ask</span>
          {actions.map((action, index) => (
            <span key={action.label} className="inline-flex items-center gap-2">
              {index === 0 ? null : <span>or</span>}
              <a
                className="site-text-link"
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={action.description}
              >
                <Image
                  alt=""
                  className="size-3.5 object-contain"
                  height={14}
                  width={14}
                  src={action.iconSrc}
                />
                {action.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </footer>
  );
}
