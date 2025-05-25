import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { parseMedia } from "@remotion/media-parser";
import { nodeReader } from "@remotion/media-parser/node";
import type { MediaResource } from "./types";

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"];
const VIDEO_EXTS = [".mp4", ".mov", ".avi", ".webm"];

function resolvePublicDir(folder: string) {
  const rel = folder.replace(/^\/+/, ""); // strip leading slash
  return path.join(process.cwd(), "public", rel);
}

async function readFilesInDir(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter((d) => d.isFile()).map((d) => d.name);
}

export async function getImageResourcesFromFolder(
  folder: string
): Promise<MediaResource[]> {
  const dir = resolvePublicDir(folder);
  const files = await readFilesInDir(dir);
  const resources: MediaResource[] = [];

  for (const name of files) {
    const ext = path.extname(name).toLowerCase();
    if (!IMAGE_EXTS.includes(ext)) continue;

    const fullPath = path.join(dir, name);
    const img = sharp(fullPath);
    const meta = await img.metadata();

    if (typeof meta.width !== "number" || typeof meta.height !== "number") {
      continue;
    }

    const buffer = await img.resize(10).blur().toBuffer();
    const format = meta.format ?? "jpeg";

    resources.push({
      src: path.posix.join(folder, name),
      alt: path.basename(name, ext),
      type: "image",
      width: meta.width,
      height: meta.height,
      blurDataURL: `data:image/${format};base64,${buffer.toString("base64")}`,
    });
  }

  return resources;
}

export async function getVideoResourcesFromFolder(
  folder: string
): Promise<MediaResource[]> {
  const dir = resolvePublicDir(folder);
  const files = await readFilesInDir(dir);
  const resources: MediaResource[] = [];

  for (const name of files) {
    const ext = path.extname(name).toLowerCase();
    if (!VIDEO_EXTS.includes(ext)) continue;

    const fullPath = path.join(dir, name);
    const metadata = await parseMedia({
      src: fullPath,
      reader: nodeReader,
      fields: { dimensions: true },
    });

    resources.push({
      src: path.posix.join(folder, name),
      alt: path.basename(name, ext),
      type: "video",
      width: metadata.dimensions?.width,
      height: metadata.dimensions?.height,
    });
  }

  return resources;
}

export async function getMediaFromFolder(
  folder: string
): Promise<MediaResource[]> {
  const [images, videos] = await Promise.all([
    getImageResourcesFromFolder(folder),
    getVideoResourcesFromFolder(folder),
  ]);
  return [...images, ...videos];
}
