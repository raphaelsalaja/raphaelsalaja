#!/usr/bin/env node

/**
 * Script to generate image placeholders for the Image component
 *
 * This script:
 * 1. Scans for image files in the public directory
 * 2. Creates placeholder entries with aspect ratios
 * 3. Outputs a placeholders.json file for the Image component
 *
 * Usage: node scripts/generate-image-placeholders.js
 */

const fs = require("node:fs").promises;
const path = require("node:path");

const PUBLIC_DIR = path.join(process.cwd(), "public");
const PLACEHOLDERS_FILE = path.join(
  process.cwd(),
  "components/media/image/placeholders.json",
);

// Default placeholder image (1x1 transparent pixel)
const DEFAULT_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

// Common aspect ratios for different content types
const ASPECT_RATIO_DEFAULTS = {
  "16:9": 16 / 9, // Wide images
  "4:3": 4 / 3, // Traditional photos
  "3:2": 3 / 2, // DSLR photos
  "1:1": 1, // Square
  "9:16": 9 / 16, // Vertical/mobile
  "2:1": 2, // Banner/hero images
};

async function findImageFiles(dir, basePath = "") {
  const files = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relativePath = path.join(basePath, entry.name);

      if (entry.isDirectory()) {
        files.push(...(await findImageFiles(fullPath, relativePath)));
      } else if (
        entry.isFile() &&
        /\.(jpg|jpeg|png|webp|avif|gif)$/i.test(entry.name)
      ) {
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
    lower.includes("hero") ||
    lower.includes("banner") ||
    lower.includes("header")
  ) {
    return ASPECT_RATIO_DEFAULTS["2:1"];
  }
  if (
    lower.includes("vertical") ||
    lower.includes("9x16") ||
    lower.includes("mobile")
  ) {
    return ASPECT_RATIO_DEFAULTS["9:16"];
  }
  if (
    lower.includes("square") ||
    lower.includes("1x1") ||
    lower.includes("avatar") ||
    lower.includes("profile")
  ) {
    return ASPECT_RATIO_DEFAULTS["1:1"];
  }
  if (
    lower.includes("photo") ||
    lower.includes("dslr") ||
    lower.includes("3x2")
  ) {
    return ASPECT_RATIO_DEFAULTS["3:2"];
  }
  if (lower.includes("4x3") || lower.includes("classic")) {
    return ASPECT_RATIO_DEFAULTS["4:3"];
  }
  if (lower.includes("wide") || lower.includes("16x9")) {
    return ASPECT_RATIO_DEFAULTS["16:9"];
  }

  // Default to 3:2 (common for photos)
  return ASPECT_RATIO_DEFAULTS["3:2"];
}

async function main() {
  console.log("🖼️  Generating image placeholders...");

  try {
    // Ensure the directory exists
    const placeholdersDir = path.dirname(PLACEHOLDERS_FILE);
    await fs.mkdir(placeholdersDir, { recursive: true });

    // Find all image files
    const imageFiles = await findImageFiles(PUBLIC_DIR);
    console.log(`Found ${imageFiles.length} image files`);

    const placeholders = {};

    if (imageFiles.length === 0) {
      console.log("No image files found, creating empty placeholders.json");
    } else {
      // Process each image file
      for (const { publicPath } of imageFiles) {
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
      `✅ Generated placeholders for ${Object.keys(placeholders).length} images`,
    );
    console.log(`📄 Placeholders saved to: ${PLACEHOLDERS_FILE}`);

    if (Object.keys(placeholders).length > 0) {
      console.log(
        "\n📝 To customize aspect ratios or add real placeholder images:",
      );
      console.log(`   Edit: ${PLACEHOLDERS_FILE}`);
      console.log(
        "   You can replace the default placeholder with actual blurred image data",
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
