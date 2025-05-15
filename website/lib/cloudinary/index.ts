import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function getArchiveMedia(): Promise<string[]> {
  const urls: string[] = [];
  let nextCursor: string | undefined;

  do {
    const result = await cloudinary.search
      .expression("folder:posts/archive/")
      .max_results(100)
      .next_cursor(nextCursor)
      .execute();

    const batch = result.resources.map((resource: any) => resource.secure_url);
    urls.push(...batch);

    nextCursor = result.next_cursor;
  } while (nextCursor);

  return urls;
}
