import Image from "next/image";
import Link from "next/link";

import ThemeToggle from "@/components/ThemeToggle";
import { resumeData } from "@/content/resume";

import { SiteMobileMenu } from "./site-mobile-menu";

export interface SiteHeaderProps {
  activeHref?: "/blog" | "/journey" | "/work-log";
  currentPath?: "/" | "/blog" | "/journey" | "/work-log";
}

export function SiteHeader({
  activeHref,
  currentPath = activeHref ?? "/",
}: Readonly<SiteHeaderProps>): React.ReactNode {
  const navigation = resumeData.navItems.map((item) => {
    const props = {
      "aria-current": item.href === currentPath ? ("page" as const) : undefined,
      className: `site-nav-link ${item.href === activeHref ? "site-nav-link-active" : ""}`,
      href: item.href,
    };
    return (
      <li key={item.href}>
        {item.external === true ? (
          <a {...props} target="_blank" rel="noopener noreferrer">
            {item.label}
          </a>
        ) : (
          <Link {...props} prefetch={false}>
            {item.label}
          </Link>
        )}
      </li>
    );
  });
  return (
    <header className="bg-background font-sans text-foreground print:hidden">
      <div className="site-container py-6">
        <nav
          aria-label="Primary navigation"
          className="flex items-center justify-between"
        >
          <Link
            href="/"
            prefetch={false}
            aria-label={`${resumeData.person.name} home`}
            aria-current={currentPath === "/" ? "page" : undefined}
            className="group flex min-h-11 items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <Image
              src={resumeData.person.image}
              alt=""
              className="h-10 w-10 rounded-full object-cover ring-2 ring-border transition-shadow group-hover:ring-primary"
              height={40}
              width={40}
            />
            <span className="font-sans text-sm font-medium">
              {resumeData.person.name}
            </span>
          </Link>
          <div className="flex items-center gap-1">
            <ul className="hidden items-center gap-1 md:flex">{navigation}</ul>
            <ThemeToggle />
            <SiteMobileMenu>{navigation}</SiteMobileMenu>
          </div>
        </nav>
      </div>
    </header>
  );
}
