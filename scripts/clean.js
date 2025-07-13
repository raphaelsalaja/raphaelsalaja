#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { glob } = require("glob");

/**
 * Clean script that reads from clean.json configuration
 * Supports glob patterns for flexible file/directory deletion
 */
async function clean() {
  const configPath = path.join(__dirname, "clean.json");

  if (!fs.existsSync(configPath)) {
    console.error("❌ clean.json not found in project root");
    process.exit(1);
  }

  let config;
  try {
    const configContent = fs.readFileSync(configPath, "utf8");
    config = JSON.parse(configContent);
  } catch (error) {
    console.error("❌ Error parsing clean.json:", error.message);
    process.exit(1);
  }

  console.log("🧹 Starting cleanup...\n");

  // Run turbo clean first if available
  try {
    console.log("🚀 Running turbo clean...");
    execSync("turbo clean", { stdio: "inherit" });
    console.log("✅ Turbo clean completed\n");
  } catch {
    console.log("⚠️  Turbo clean not available, continuing...\n");
  }

  // Process patterns
  if (config.patterns && Array.isArray(config.patterns)) {
    for (const pattern of config.patterns) {
      try {
        const matches = await glob(pattern, {
          cwd: process.cwd(),
          ignore: ["node_modules/**", ".git/**"],
          absolute: true,
        });

        if (matches.length === 0) {
          console.log(`⚪ No matches for: ${pattern}`);
          continue;
        }

        console.log(`🗂️  Found ${matches.length} matches for: ${pattern}`);

        for (const match of matches) {
          try {
            const stats = fs.lstatSync(match);
            if (stats.isDirectory()) {
              fs.rmSync(match, { recursive: true, force: true });
              console.log(`  📁 Deleted directory: ${path.relative(process.cwd(), match)}`);
            } else {
              fs.unlinkSync(match);
              console.log(`  📄 Deleted file: ${path.relative(process.cwd(), match)}`);
            }
          } catch (err) {
            console.log(`  ⚠️  Could not delete ${match}: ${err.message}`);
          }
        }
      } catch (error) {
        console.error(`❌ Error processing pattern "${pattern}":`, error.message);
      }
    }
  }

  // Run post-clean commands
  if (config.postClean && Array.isArray(config.postClean)) {
    console.log("\n🔄 Running post-clean commands...");
    for (const command of config.postClean) {
      try {
        console.log(`📦 Running: ${command}`);
        execSync(command, { stdio: "inherit" });
        console.log(`✅ Completed: ${command}`);
      } catch (error) {
        console.error(`❌ Failed to run "${command}":`, error.message);
      }
    }
  }

  console.log("\n🎉 Cleanup completed!");
}

// Run the cleanup
clean().catch((error) => {
  console.error("❌ Cleanup failed:", error);
  process.exit(1);
});
