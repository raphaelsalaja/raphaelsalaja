// biome-ignore-all lint/style/noNonNullAssertion: Cloudinary config is required
import { v2 as cloudinary } from "cloudinary";
import { getCldImageUrl } from "next-cloudinary";

export interface CloudinaryResource {
  asset_id: string;
  public_id: string;
  format: string;
  version: number;
  resource_type: "image" | "video" | "raw";
  type: "upload" | "private" | "authenticated";
  created_at: string;
  bytes: number;
  width: number;
  height: number;
  url: string;
  secure_url: string;
  access_mode: string;
  tags?: string[];
  metadata?: Record<string, any>;
  blurDataURL?: string;
}

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function getArchiveMedia(): Promise<CloudinaryResource[]> {
  const resources: CloudinaryResource[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.search
      .expression("folder:posts/archive/")
      .max_results(100)
      .next_cursor(nextCursor)
      .execute();

    const batch = await Promise.all(
      result.resources.map(async (resource: any) => {
        if (resource.resource_type === "image") {
          const blurDataURL = await generateBlurDataURL(resource.public_id);
          return { ...resource, blurDataURL };
        }

        if (resource.resource_type === "video") {
          const blurDataURL = await generateVideoBlurDataURL(
            resource.public_id
          );
          return { ...resource, blurDataURL };
        }

        return resource;
      })
    );

    resources.push(...batch);
    nextCursor = result.next_cursor;
  } while (nextCursor);

  return resources;
}

async function generateBlurDataURL(
  public_id: string
): Promise<string | undefined> {
  try {
    const url = getCldImageUrl({
      src: public_id,
      width: 10,
      quality: 1,
      format: "webp",
    });

    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    return `data:${response.headers.get("content-type")};base64,${base64}`;
  } catch {
    return undefined;
  }
}

export async function generateVideoBlurDataURL(
  public_id: string
): Promise<string | undefined> {
  try {
    const frameUrl = getCldImageUrl({
      src: public_id,
      assetType: "video",
      width: 10,
      quality: 1,
      format: "webp",
      effects: [{ blur: "2000" }],
    });

    const response = await fetch(frameUrl);
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return `data:${response.headers.get("content-type")};base64,${base64}`;
  } catch (err) {
    console.error("Failed to generate blurDataURL for video:", public_id, err);
    return undefined;
  }
}
