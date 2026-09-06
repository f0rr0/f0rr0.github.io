import { getBlogPosts } from "@/lib/blog-utils";
import { buildLlmsFullTxt } from "@/lib/resume";
import { publicUrl } from "@/lib/site";

export const dynamic = "force-static";
export const revalidate = 86_400;

export async function GET() {
  const posts = await getBlogPosts();

  return new Response(buildLlmsFullTxt(posts), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control":
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      "Content-Type": "text/plain; charset=utf-8",
      Link: `<${publicUrl("/llms.txt")}>; rel="describedby"`,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
