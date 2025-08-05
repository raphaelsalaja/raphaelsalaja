#!/usr/bin/env node

/**
 * Script to generate media placeholders for both images and videos
 *
 * This script:
 * 1. Scans for media files in the public directory
 * 2. Creates placeholder entries with aspect ratios
 * 3. Outputs placeholders.json files for both Image and Video components
 *
 * Usage: tsx scripts/generate-media-placeholders.ts
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { logger } from "./logger.js";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_PLACEHOLDERS_FILE = path.join(
  process.cwd(),
  "components/media/image/placeholders.json",
);
const VIDEO_PLACEHOLDERS_FILE = path.join(
  process.cwd(),
  "components/media/video/placeholders.json",
);

// Common aspect ratios for different content types
const IMAGE_ASPECT_RATIO_DEFAULTS = {
  "16:9": 16 / 9, // Wide images
  "4:3": 4 / 3, // Traditional photos
  "3:2": 3 / 2, // DSLR photos
  "1:1": 1, // Square
  "9:16": 9 / 16, // Vertical/mobile
  "2:1": 2, // Banner/hero images
} as const;

const VIDEO_ASPECT_RATIO_DEFAULTS = {
  "16:9": 16 / 9, // Standard video
  "4:3": 4 / 3, // Old TV format
  "21:9": 21 / 9, // Ultrawide
  "9:16": 9 / 16, // Vertical/mobile
  "1:1": 1, // Square
} as const;

interface MediaFile {
  fullPath: string;
  publicPath: string;
}

interface MediaFiles {
  imageFiles: MediaFile[];
  videoFiles: MediaFile[];
}

interface PlaceholderData {
  placeholder: string;
  aspectRatio: number;
}

type PlaceholderMap = Record<string, PlaceholderData>;

async function findMediaFiles(dir: string, basePath = ""): Promise<MediaFiles> {
  const imageFiles: MediaFile[] = [];
  const videoFiles: MediaFile[] = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        const subFiles = await findMediaFiles(fullPath, relativePath);
        imageFiles.push(...subFiles.imageFiles);
        videoFiles.push(...subFiles.videoFiles);
      } else if (entry.isFile()) {
        const publicPath = `/${relativePath.replace(/\\/g, "/")}`;

        if (/\.(jpg|jpeg|png|webp|avif|gif)$/i.test(entry.name)) {
          imageFiles.push({ fullPath, publicPath });
        } else if (/\.(mp4|webm|mov|avi)$/i.test(entry.name)) {
          videoFiles.push({ fullPath, publicPath });
        }
      }
    }
  } catch (error) {
    logger.warn(`Could not read directory ${dir}: ${(error as Error).message}`);
  }

  return { imageFiles, videoFiles };
}

function getImageAspectRatio(filename: string): number {
  const lower = filename.toLowerCase();

  if (
    lower.includes("hero") ||
    lower.includes("banner") ||
    lower.includes("header")
  ) {
    return IMAGE_ASPECT_RATIO_DEFAULTS["2:1"];
  }
  if (
    lower.includes("vertical") ||
    lower.includes("9x16") ||
    lower.includes("mobile")
  ) {
    return IMAGE_ASPECT_RATIO_DEFAULTS["9:16"];
  }
  if (
    lower.includes("square") ||
    lower.includes("1x1") ||
    lower.includes("avatar") ||
    lower.includes("profile")
  ) {
    return IMAGE_ASPECT_RATIO_DEFAULTS["1:1"];
  }
  if (
    lower.includes("photo") ||
    lower.includes("dslr") ||
    lower.includes("3x2")
  ) {
    return IMAGE_ASPECT_RATIO_DEFAULTS["3:2"];
  }
  if (lower.includes("4x3") || lower.includes("classic")) {
    return IMAGE_ASPECT_RATIO_DEFAULTS["4:3"];
  }
  if (lower.includes("wide") || lower.includes("16x9")) {
    return IMAGE_ASPECT_RATIO_DEFAULTS["16:9"];
  }

  return IMAGE_ASPECT_RATIO_DEFAULTS["3:2"];
}

function getVideoAspectRatio(filename: string): number {
  const lower = filename.toLowerCase();

  if (
    lower.includes("vertical") ||
    lower.includes("9x16") ||
    lower.includes("mobile")
  ) {
    return VIDEO_ASPECT_RATIO_DEFAULTS["9:16"];
  }
  if (lower.includes("square") || lower.includes("1x1")) {
    return VIDEO_ASPECT_RATIO_DEFAULTS["1:1"];
  }
  if (lower.includes("ultrawide") || lower.includes("21x9")) {
    return VIDEO_ASPECT_RATIO_DEFAULTS["21:9"];
  }
  if (lower.includes("4x3") || lower.includes("classic")) {
    return VIDEO_ASPECT_RATIO_DEFAULTS["4:3"];
  }

  return VIDEO_ASPECT_RATIO_DEFAULTS["16:9"];
}

function generateColoredPlaceholder(filename: string): string {
  // Generate a simple colored placeholder based on filename
  const colors = [
    "#f3f4f6", // gray-100
    "#e5e7eb", // gray-200
    "#d1d5db", // gray-300
    "#9ca3af", // gray-400
    "#f9fafb", // gray-50
  ];

  // Use filename to consistently pick a color
  const colorIndex =
    filename.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  const color = colors[colorIndex];

  // Create a simple 10x10 colored rectangle
  const svg = `<svg width="10" height="10" xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" fill="${color}"/></svg>`;
  const base64 = Buffer.from(svg).toString("base64");

  return `data:image/svg+xml;base64,${base64}`;
}

async function generateImagePlaceholders(
  files: MediaFile[],
): Promise<PlaceholderMap> {
  const placeholders: PlaceholderMap = {};

  for (const { publicPath } of files) {
    const filename = path.basename(publicPath);
    const aspectRatio = getImageAspectRatio(filename);
    const placeholder = generateColoredPlaceholder(filename);

    placeholders[publicPath] = {
      placeholder,
      aspectRatio,
    };
  }

  return placeholders;
}

async function generateVideoPlaceholders(
  files: MediaFile[],
): Promise<PlaceholderMap> {
  const placeholders: PlaceholderMap = {};

  for (const { publicPath } of files) {
    const filename = path.basename(publicPath);
    const aspectRatio = getVideoAspectRatio(filename);
    const placeholder = generateColoredPlaceholder(filename);

    placeholders[publicPath] = {
      placeholder,
      aspectRatio,
    };
  }

  return placeholders;
}

async function main(): Promise<void> {
  try {
    // Find all media files
    const { imageFiles, videoFiles } = await findMediaFiles(PUBLIC_DIR);

    // Process images
    if (imageFiles.length > 0) {
      const imageDir = path.dirname(IMAGE_PLACEHOLDERS_FILE);
      await fs.mkdir(imageDir, { recursive: true });

      const imagePlaceholders = await generateImagePlaceholders(imageFiles);

      await fs.writeFile(
        IMAGE_PLACEHOLDERS_FILE,
        JSON.stringify(imagePlaceholders, null, 2),
      );
    }

    // Process videos
    if (videoFiles.length > 0) {
      const videoDir = path.dirname(VIDEO_PLACEHOLDERS_FILE);
      await fs.mkdir(videoDir, { recursive: true });

      const videoPlaceholders = await generateVideoPlaceholders(videoFiles);

      await fs.writeFile(
        VIDEO_PLACEHOLDERS_FILE,
        JSON.stringify(videoPlaceholders, null, 2),
      );
    }

    // Prepare counts
    const videoCount = videoFiles.length;
    const imageCount = imageFiles.length;
    const totalCount = videoCount + imageCount;

    // Simple output matching the desired format
    const width = 63;

    console.log(
      `${chalk.gray("●")} ${chalk.underline("Placeholders")}${" ".repeat(width - "placeholders".length - 8)}${chalk.underline("Generated")}`,
    );
    console.log(
      `${chalk.gray("├")} ${chalk.gray("○")} videos${" ".repeat(width - "videos".length - 8)}${videoCount} urls`,
    );
    console.log(
      `${chalk.gray("├")} ${chalk.gray("○")} images${" ".repeat(width - "images".length - 8)}${imageCount} urls`,
    );
    console.log(
      `${chalk.gray("└")} ${chalk.gray("●")} total${" ".repeat(width - "total".length - 8)}${totalCount} urls`,
    );
  } catch (error) {
    logger.error(
      "Failed to generate media placeholders:",
      (error as Error).message,
    );
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { main };
