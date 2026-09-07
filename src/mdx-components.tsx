import type { MDXComponents } from "mdx/types";

import { LocalDateTime } from "@/components/local-date-time";
import CodeBlock from "@/components/mdx/CodeBlock";
import MDXLink from "@/components/mdx/MDXLink";
import Mermaid from "@/components/mdx/Mermaid";

const components: MDXComponents = {
  Mermaid,
  a: MDXLink,
  pre: CodeBlock,
  time: ({ dateTime, children, ...props }) =>
    dateTime === undefined ? (
      <time {...props}>{children}</time>
    ) : (
      <LocalDateTime {...props} dateTime={dateTime} />
    ),
};

export function useMDXComponents(overrides: MDXComponents = {}): MDXComponents {
  return {
    ...components,
    ...overrides,
  };
}
