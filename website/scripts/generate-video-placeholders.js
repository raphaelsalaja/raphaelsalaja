#!/usr/bin/env node

/**
 * Script to generate video placeholders for the Video component
 *
 * This script:
 * 1. Scans for video files in the public directory
 * 2. Creates placeholder entries with default aspect ratios
 * 3. Outputs a placeholders.json file for the Video component
 *
 * Usage: node scripts/generate-video-placeholders.js
 */

const fs = require("node:fs").promises;
const path = require("node:path");

const PUBLIC_DIR = path.join(process.cwd(), "public");
const PLACEHOLDERS_FILE = path.join(
  process.cwd(),
  "components/media/video/placeholders.json",
);

// Default placeholder image (1x1 transparent pixel)
const DEFAULT_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

// Common aspect ratios for different content types
const ASPECT_RATIO_DEFAULTS = {
  "16:9": 16 / 9, // Standard video
  "4:3": 4 / 3, // Old TV format
  "21:9": 21 / 9, // Ultrawide
  "9:16": 9 / 16, // Vertical/mobile
  "1:1": 1, // Square
};

async function findVideoFiles(dir, basePath = "") {
  const files = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        files.push(...(await findVideoFiles(fullPath, relativePath)));
      } else if (entry.isFile() && /\.(mp4|webm|mov|avi)$/i.test(entry.name)) {
        files.push({
          fullPath,
          publicPath: `/${relativePath.replace(/\\/g, "/")}`,
        });
      }
    }
  } catch (error) {
    console.warn(`Could not read directory ${dir}:`, error.message);
  }

  return files;
}

function getDefaultAspectRatio(filename) {
  // Try to infer aspect ratio from filename patterns
  const lower = filename.toLowerCase();

  if (
    lower.includes("vertical") ||
    lower.includes("9x16") ||
    lower.includes("mobile")
  ) {
    return ASPECT_RATIO_DEFAULTS["9:16"];
  }
  if (lower.includes("square") || lower.includes("1x1")) {
    return ASPECT_RATIO_DEFAULTS["1:1"];
  }
  if (lower.includes("ultrawide") || lower.includes("21x9")) {
    return ASPECT_RATIO_DEFAULTS["21:9"];
  }
  if (lower.includes("4x3") || lower.includes("classic")) {
    return ASPECT_RATIO_DEFAULTS["4:3"];
  }

  // Default to 16:9 (most common for web videos)
  return ASPECT_RATIO_DEFAULTS["16:9"];
}

async function main() {
  console.log("🎬 Generating video placeholders...");

  try {
    // Ensure the directory exists
    const placeholdersDir = path.dirname(PLACEHOLDERS_FILE);
    await fs.mkdir(placeholdersDir, { recursive: true });

    // Find all video files
    const videoFiles = await findVideoFiles(PUBLIC_DIR);
    console.log(`Found ${videoFiles.length} video files`);

    const placeholders = {};

    if (videoFiles.length === 0) {
      console.log("No video files found, creating empty placeholders.json");
    } else {
      // Process each video file
      for (const { publicPath } of videoFiles) {
        console.log(`Processing: ${publicPath}`);

        const filename = path.basename(publicPath);
        const aspectRatio = getDefaultAspectRatio(filename);

        placeholders[publicPath] = {
          placeholder: DEFAULT_PLACEHOLDER,
          aspectRatio,
        };
      }
    }

    // Write placeholders.json
    await fs.writeFile(
      PLACEHOLDERS_FILE,
      JSON.stringify(placeholders, null, 2),
    );

    console.log(
      `✅ Generated placeholders for ${Object.keys(placeholders).length} videos`,
    );
    console.log(`📄 Placeholders saved to: ${PLACEHOLDERS_FILE}`);

    if (Object.keys(placeholders).length > 0) {
      console.log(
        "\n📝 To customize aspect ratios or add real placeholder images:",
      );
      console.log(`   Edit: ${PLACEHOLDERS_FILE}`);
      console.log(
        "   You can replace the default placeholder with actual video frames",
      );
    }
  } catch (error) {
    console.error("❌ Error generating placeholders:", error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };
