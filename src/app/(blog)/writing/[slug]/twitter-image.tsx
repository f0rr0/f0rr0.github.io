import {
  getMetadataImageRouteMetadata,
  resolveMetadataImageResponse,
} from "@/lib/blog-metadata-images";

export const runtime = "nodejs";

export async function generateImageMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return await getMetadataImageRouteMetadata(slug, "twitter");
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  return await resolveMetadataImageResponse(resolvedParams.slug, "twitter");
}
