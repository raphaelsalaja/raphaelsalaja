#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import { Vacuum } from "./index.js";

const program = new Command();

program.name("vacuum").description("Configurable cleanup utility for monorepo projects").version("1.0.0");

program
  .command("clean")
  .description("Clean files and directories based on configuration")
  .option("-c, --config <path>", "Path to configuration file", "vacuum.json")
  .option("-d, --dry-run", "Show what would be deleted without actually deleting")
  .option("-v, --verbose", "Show detailed output")
  .action(async (options) => {
    try {
      const vacuum = await Vacuum.fromConfigFile(options.config, {
        dryRun: options.dryRun,
        verbose: options.verbose,
      });

      await vacuum.clean();
    } catch (error) {
      console.error(chalk.red("❌ Error:"), error instanceof Error ? error.message : "Unknown error");
      process.exit(1);
    }
  });

program
  .command("init")
  .description("Initialize a vacuum.json configuration file")
  .option("-f, --force", "Overwrite existing configuration file")
  .action(async (options) => {
    const fs = await import("node:fs");
    const path = await import("node:path");

    const configPath = path.resolve("vacuum.json");

    if (fs.existsSync(configPath) && !options.force) {
      console.error(chalk.red("❌ Configuration file already exists. Use --force to overwrite."));
      process.exit(1);
    }

    const defaultConfig = {
      patterns: [
        "node_modules",
        ".turbo",
        "packages/*/node_modules",
        "packages/*/dist",
        "packages/*/.turbo",
        "website/node_modules",
        "website/.next",
        "website/.turbo",
        "playground/node_modules",
        "playground/.next",
        "playground/.turbo",
        "**/.DS_Store",
        "**/coverage",
        "**/dist",
        "**/*.log",
        "**/*.tsbuildinfo",
      ],
      postClean: ["pnpm install"],
      exclude: ["node_modules/**", ".git/**"],
    };

    try {
      fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2));
      console.log(chalk.green("✅ Created vacuum.json configuration file"));
    } catch (error) {
      console.error(
        chalk.red("❌ Error creating configuration file:"),
        error instanceof Error ? error.message : "Unknown error",
      );
      process.exit(1);
    }
  });

program.parse();
