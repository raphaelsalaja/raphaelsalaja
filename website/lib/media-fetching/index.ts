import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { parseMedia } from "@remotion/media-parser";
import { nodeReader } from "@remotion/media-parser/node";
import type { ImageResource, VideoResource, MediaResource } from "./types";

const IMAGE_EXTS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".svg"];
const VIDEO_EXTS = [".mp4", ".mov", ".avi", ".webm"];

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".mov": "video/quicktime",
  ".avi": "video/x-msvideo",
  ".webm": "video/webm",
};

function resolvePublicDir(folder: string) {
  const rel = folder.replace(/^\/+/, "");
  return path.join(process.cwd(), "public", rel);
}

async function readFilesInDir(dir: string): Promise<string[]> {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter((e) => e.isFile()).map((e) => e.name);
}

export async function getImageResourcesFromFolder(
  folder: string
): Promise<ImageResource[]> {
  const dir = resolvePublicDir(folder);
  const files = await readFilesInDir(dir);
  const resources: ImageResource[] = [];

  for (const name of files) {
    const ext = path.extname(name).toLowerCase();
    if (!IMAGE_EXTS.includes(ext)) continue;

    const fullPath = path.join(dir, name);
    const stat = await fs.stat(fullPath);
    const img = sharp(fullPath);
    const meta = await img.metadata();

    if (typeof meta.width !== "number" || typeof meta.height !== "number") {
      continue;
    }

    const buffer = await img.resize(10).blur().toBuffer();
    const format = (meta.format ?? "jpeg") as ImageResource["format"];

    resources.push({
      src: path.posix.join(folder, name),
      alt: path.basename(name, ext),
      type: "image",
      width: meta.width,
      height: meta.height,
      blurDataURL: `data:image/${format};base64,${buffer.toString("base64")}`,
      format,
      mimeType: MIME_TYPES[ext],
      sizeBytes: stat.size,
    });
  }

  return resources;
}

export async function getVideoResourcesFromFolder(
  folder: string
): Promise<VideoResource[]> {
  const dir = resolvePublicDir(folder);
  const files = await readFilesInDir(dir);
  const resources: VideoResource[] = [];

  for (const name of files) {
    const ext = path.extname(name).toLowerCase();
    if (!VIDEO_EXTS.includes(ext)) continue;

    const fullPath = path.join(dir, name);
    const stat = await fs.stat(fullPath);
    const metadata = await parseMedia({
      src: fullPath,
      reader: nodeReader,
      fields: { dimensions: true },
    });

    const w = metadata.dimensions?.width;
    const h = metadata.dimensions?.height;
    if (typeof w !== "number" || typeof h !== "number") {
      continue;
    }

    const format = ext.slice(1) as VideoResource["format"];

    resources.push({
      src: path.posix.join(folder, name),
      alt: path.basename(name, ext),
      type: "video",
      width: w,
      height: h,
      format,
      mimeType: MIME_TYPES[ext],
      sizeBytes: stat.size,
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
