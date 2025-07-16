import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { glob } from "glob";
import type { CleanupResult, VacuumConfig, VacuumOptions } from "./types.js";

export class Vacuum {
  private config: VacuumConfig;
  private options: VacuumOptions;

  constructor(config: VacuumConfig, options: VacuumOptions = {}) {
    this.config = config;
    this.options = options;
  }

  static async fromConfigFile(configPath: string = "vacuum.json", options: VacuumOptions = {}): Promise<Vacuum> {
    const fullPath = path.resolve(configPath);

    if (!fs.existsSync(fullPath)) {
      throw new Error(`Config file not found: ${fullPath}`);
    }

    try {
      const configContent = fs.readFileSync(fullPath, "utf8");
      const config = JSON.parse(configContent) as VacuumConfig;
      return new Vacuum(config, { ...options, configPath });
    } catch (error) {
      throw new Error(`Error parsing config file: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }

  async clean(): Promise<CleanupResult> {
    const result: CleanupResult = {
      deletedFiles: [],
      deletedDirectories: [],
      errors: [],
      postCleanResults: [],
    };

    if (this.options.verbose) {
      console.log(chalk.blue("🧹 Starting cleanup..."));
      console.log(chalk.gray(`Config: ${this.options.configPath || "programmatic"}`));
      console.log(chalk.gray(`Dry run: ${this.options.dryRun ? "Yes" : "No"}\n`));
    }

    // Run turbo clean first if available
    await this.runTurboClean();

    // Process patterns
    if (this.config.patterns && Array.isArray(this.config.patterns)) {
      for (const pattern of this.config.patterns) {
        await this.processPattern(pattern, result);
      }
    }

    // Run post-clean commands
    if (this.config.postClean && Array.isArray(this.config.postClean) && !this.options.dryRun) {
      await this.runPostCleanCommands(result);
    }

    if (this.options.verbose) {
      this.printSummary(result);
    }

    return result;
  }

  private async runTurboClean(): Promise<void> {
    try {
      if (this.options.verbose) {
        console.log(chalk.blue("🚀 Running turbo clean..."));
      }

      if (!this.options.dryRun) {
        execSync("turbo clean", { stdio: "inherit" });
      }

      if (this.options.verbose) {
        console.log(chalk.green("✅ Turbo clean completed\n"));
      }
    } catch {
      if (this.options.verbose) {
        console.log(chalk.yellow("⚠️  Turbo clean not available, continuing...\n"));
      }
    }
  }

  private async processPattern(pattern: string, result: CleanupResult): Promise<void> {
    try {
      const matches = await glob(pattern, {
        cwd: process.cwd(),
        ignore: ["node_modules/**", ".git/**", ...(this.config.exclude || [])],
        absolute: true,
      });

      if (matches.length === 0) {
        if (this.options.verbose) {
          console.log(chalk.gray(`⚪ No matches for: ${pattern}`));
        }
        return;
      }

      if (this.options.verbose) {
        console.log(chalk.cyan(`🗂️  Found ${matches.length} matches for: ${pattern}`));
      }

      for (const match of matches) {
        await this.deleteItem(match, result);
      }
    } catch (error) {
      const errorMessage = `Error processing pattern "${pattern}": ${error instanceof Error ? error.message : "Unknown error"}`;
      result.errors.push(errorMessage);
      if (this.options.verbose) {
        console.error(chalk.red(`❌ ${errorMessage}`));
      }
    }
  }

  private async deleteItem(itemPath: string, result: CleanupResult): Promise<void> {
    try {
      const stats = fs.lstatSync(itemPath);
      const relativePath = path.relative(process.cwd(), itemPath);

      if (this.options.dryRun) {
        if (stats.isDirectory()) {
          console.log(chalk.yellow(`[DRY RUN] Would delete directory: ${relativePath}`));
        } else {
          console.log(chalk.yellow(`[DRY RUN] Would delete file: ${relativePath}`));
        }
        return;
      }

      if (stats.isDirectory()) {
        fs.rmSync(itemPath, { recursive: true, force: true });
        result.deletedDirectories.push(relativePath);
        if (this.options.verbose) {
          console.log(chalk.green(`  📁 Deleted directory: ${relativePath}`));
        }
      } else {
        fs.unlinkSync(itemPath);
        result.deletedFiles.push(relativePath);
        if (this.options.verbose) {
          console.log(chalk.green(`  📄 Deleted file: ${relativePath}`));
        }
      }
    } catch (error) {
      const errorMessage = `Could not delete ${itemPath}: ${error instanceof Error ? error.message : "Unknown error"}`;
      result.errors.push(errorMessage);
      if (this.options.verbose) {
        console.log(chalk.red(`  ⚠️  ${errorMessage}`));
      }
    }
  }

  private async runPostCleanCommands(result: CleanupResult): Promise<void> {
    if (!this.config.postClean) return;

    if (this.options.verbose) {
      console.log(chalk.blue("\n🔄 Running post-clean commands..."));
    }

    for (const command of this.config.postClean) {
      try {
        if (this.options.verbose) {
          console.log(chalk.cyan(`📦 Running: ${command}`));
        }

        execSync(command, { stdio: "inherit" });
        result.postCleanResults.push({ command, success: true });

        if (this.options.verbose) {
          console.log(chalk.green(`✅ Completed: ${command}`));
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        result.postCleanResults.push({
          command,
          success: false,
          error: errorMessage,
        });

        if (this.options.verbose) {
          console.error(chalk.red(`❌ Failed to run "${command}": ${errorMessage}`));
        }
      }
    }
  }

  private printSummary(result: CleanupResult): void {
    console.log(chalk.blue("\n📊 Cleanup Summary:"));
    console.log(chalk.green(`  Files deleted: ${result.deletedFiles.length}`));
    console.log(chalk.green(`  Directories deleted: ${result.deletedDirectories.length}`));
    console.log(chalk.red(`  Errors: ${result.errors.length}`));
    console.log(chalk.cyan(`  Post-clean commands: ${result.postCleanResults.length}`));

    if (result.errors.length > 0) {
      console.log(chalk.red("\n❌ Errors encountered:"));
      for (const error of result.errors) {
        console.log(chalk.red(`  • ${error}`));
      }
    }

    console.log(chalk.green("\n🎉 Cleanup completed!"));
  }
}

export type { CleanupResult, VacuumConfig, VacuumOptions } from "./types.js";
