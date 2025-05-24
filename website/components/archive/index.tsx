import fs from "node:fs/promises";
import path from "node:path";
import { getPlaiceholder } from "plaiceholder";
import sharp from "sharp";

import { MasonryWrapper } from "./server";

interface ResourceItem {
  url: string;
  blurDataURL?: string;
  alt?: string;
  width: number;
  height: number;
}

export const Archive = async () => {
  const archiveDir = path.join(process.cwd(), "public", "media", "archive");
  const fileNames = (await fs.readdir(archiveDir)).filter((fn) => /\.(jpe?g|png|webp)$/i.test(fn));

  const items: ResourceItem[] = await Promise.all(
    fileNames.map(async (fileName) => {
      const filePath = path.join(archiveDir, fileName);

      const meta = await sharp(filePath).metadata();
      if (typeof meta.width !== "number" || typeof meta.height !== "number") {
        throw new Error(`Image metadata missing width or height for file: ${fileName}`);
      }
      const width = meta.width;
      const height = meta.height;

      const fileBuffer = await fs.readFile(filePath);
      const { base64: blurDataURL } = await getPlaiceholder(fileBuffer);

      return {
        url: `/media/archive/${fileName}`,
        width,
        height,
        alt: fileName.replace(/\.(jpe?g|png|webp)$/i, ""),
        blurDataURL,
      };
    }),
  );

  return <MasonryWrapper items={items} />;
};
