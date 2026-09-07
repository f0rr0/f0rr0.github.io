import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SiteMainProps {
  children: ReactNode;
  className?: string;
}

export function SiteMain({ children, className }: Readonly<SiteMainProps>) {
  return (
    <main
      className={cn("site-container flex-1 pb-12 pt-8", className)}
      id="main-content"
    >
      {children}
    </main>
  );
}

export function SiteSection({
  children,
  className = "home-section",
  heading: Heading = "h2",
  headingClassName,
  href,
  id,
  title,
}: Readonly<{
  children: ReactNode;
  className?: string;
  heading?: "h1" | "h2";
  headingClassName?: string;
  href?: string;
  id: string;
  title: string;
}>) {
  return (
    <section aria-labelledby={`${id}-title`} className={className} id={id}>
      <Heading
        className={cn("section-title", headingClassName)}
        id={`${id}-title`}
      >
        {href === undefined ? (
          title
        ) : (
          <Link className="section-title-link" href={href} prefetch={false}>
            {title}
          </Link>
        )}
      </Heading>
      {children}
    </section>
  );
}
