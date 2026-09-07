import { expect, test } from "bun:test";

import { renderBlogShareImage } from "../src/lib/blog-share-image";

test("renders distinct, full-size PNG cards from article metadata", async () => {
  const metadata = {
    author: "Sid Jain",
    date: "2026-09-07",
    summary: "A personal project story.",
    title: "Teaching Image Search What I Meant",
  };
  const response = renderBlogShareImage(metadata);
  const png = Buffer.from(await response.arrayBuffer());
  expect(response.headers.get("content-type")).toBe("image/png");
  expect(png.subarray(1, 4).toString()).toBe("PNG");
  expect(png.readUInt32BE(16)).toBe(1200);
  expect(png.readUInt32BE(20)).toBe(630);

  const other = renderBlogShareImage({
    ...metadata,
    title: "2018 Music in Review",
  });
  expect(Buffer.from(await other.arrayBuffer()).equals(png)).toBe(false);
});
