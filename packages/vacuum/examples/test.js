#!/usr/bin/env node

/**
 * Simple test script to demonstrate the vacuum package functionality
 * This shows how to use the vacuum package programmatically
 */

import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Vacuum } from "../src/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function testVacuum() {
  console.log("🧪 Testing @rs/vacuum package...\n");

  // Test 1: Load from config file
  console.log("📋 Test 1: Loading from vacuum.json config...");
  try {
    const configPath = join(__dirname, "../../../vacuum.json");
    const vacuum = await Vacuum.fromConfigFile(configPath, {
      dryRun: true,
      verbose: true,
    });

    console.log("✅ Successfully loaded configuration\n");

    // Run a dry run
    console.log("🔍 Running dry run...");
    const result = await vacuum.clean();

    console.log("\n📊 Dry run results:");
    console.log(
      `- Patterns processed: ${result.deletedFiles.length + result.deletedDirectories.length} items would be deleted`,
    );
    console.log(`- Errors encountered: ${result.errors.length}`);
    console.log(`- Post-clean commands: ${result.postCleanResults.length}`);
  } catch (error) {
    console.error("❌ Test 1 failed:", error.message);
  }

  console.log("\n" + "=".repeat(50) + "\n");

  // Test 2: Direct configuration
  console.log("📋 Test 2: Direct configuration...");
  try {
    const vacuum = new Vacuum(
      {
        patterns: ["**/.DS_Store", "**/coverage", "**/*.log"],
        postClean: ['echo "Cleanup complete!"'],
      },
      {
        dryRun: true,
        verbose: true,
      },
    );

    console.log("✅ Successfully created vacuum instance\n");

    const result = await vacuum.clean();

    console.log("\n📊 Direct config results:");
    console.log(`- Items processed: ${result.deletedFiles.length + result.deletedDirectories.length}`);
    console.log(`- Errors: ${result.errors.length}`);
  } catch (error) {
    console.error("❌ Test 2 failed:", error.message);
  }

  console.log("\n🎉 Vacuum package tests completed!");
}

testVacuum().catch(console.error);
