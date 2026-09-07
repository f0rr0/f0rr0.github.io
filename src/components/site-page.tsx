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
      className={cn(
        "site-container mx-auto w-full max-w-192 px-4 sm:px-8 lg:px-12 flex-1 pb-12 pt-8",
        className
      )}
      id="main-content"
    >
      {children}
    </main>
  );
}

export function SiteSection({
  children,
  className = "home-section mt-12 [scroll-margin-top:2rem]",
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
        className={cn(
          "section-title mb-4 font-serif text-2xl font-normal text-foreground",
          headingClassName
        )}
        id={`${id}-title`}
      >
        {href === undefined ? (
          title
        ) : (
          <Link
            className="section-title-link rounded-sm hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            href={href}
            prefetch={false}
          >
            {title}
          </Link>
        )}
      </Heading>
      {children}
    </section>
  );
}
