import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

export interface MediaResource {
  src: string;
  alt: string;
  type: "image" | "video";
  width?: number;
  height?: number;
  blurDataURL?: string;
}

export async function getArchiveMedia(): Promise<MediaResource[]> {
  const directory = path.join(process.cwd(), "public", "media", "archive");
  const files = await fs.readdir(directory, { withFileTypes: true });
  const resources: MediaResource[] = [];

  for (const dirent of files) {
    if (!dirent.isFile()) continue;

    const fileName = dirent.name;
    const ext = path.extname(fileName).toLowerCase();
    const filePath = path.join(directory, fileName);
    const base: Pick<MediaResource, "src" | "alt"> = {
      src: `/media/archive/${fileName}`,
      alt: path.basename(fileName, ext),
    };

    if ([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"].includes(ext)) {
      const img = sharp(filePath);
      const meta = await img.metadata();
      if (typeof meta.width !== "number" || typeof meta.height !== "number") {
        continue;
      }
      const width = meta.width;
      const height = meta.height;
      const smallBuffer = await img.resize(10).blur().toBuffer();
      const format = meta.format || "jpeg";
      const blurDataURL = `data:image/${format};base64,${smallBuffer.toString("base64")}`;

      resources.push({
        ...base,
        type: "image",
        width,
        height,
        blurDataURL,
      });
    } else if ([".mp4", ".mov", ".avi", ".webm"].includes(ext)) {
      resources.push({
        ...base,
        type: "video",
      });
    }
  }

  return resources;
}
