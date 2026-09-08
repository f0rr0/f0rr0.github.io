import { SiteShell } from "@/components/site-shell";

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SiteShell activeHref="/writing">{children}</SiteShell>;
}
