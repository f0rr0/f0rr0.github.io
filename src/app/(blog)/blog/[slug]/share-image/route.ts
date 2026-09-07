import { resolveMetadataImageResponse } from "@/lib/blog-metadata-images";

export const dynamic = "force-static";
export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  return await resolveMetadataImageResponse(slug, "opengraph");
}
