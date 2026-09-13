import { expect, test } from "bun:test";

import { renderToStaticMarkup } from "react-dom/server";

import { SiteSection } from "../src/components/site-page";

test("section archive links use the internal work and writing pages", () => {
  for (const title of ["Work", "Writing"]) {
    const path = `/${title.toLowerCase()}`;
    const html = renderToStaticMarkup(
      <SiteSection href={path} id={title.toLowerCase()} title={title}>
        <p>Preview</p>
      </SiteSection>
    );
    expect(html).toContain(`href="${path}"`);
    expect(html).toContain(`All ${title.toLowerCase()}`);
    expect(html).not.toContain('target="_blank"');
  }
  const html = renderToStaticMarkup(
    <SiteSection id="open-source" title="Open source">
      <p>Projects</p>
    </SiteSection>
  );
  expect(html).not.toContain("<a ");
});
