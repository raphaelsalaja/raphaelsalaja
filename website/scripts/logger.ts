/**
 * Shared logger utility for build scripts
 *
 * Provides minimal Turbo-style logging across all scripts
 */

import { createConsola } from "consola";

// Create a minimal logger instance with Turbo-style formatting
export const logger = createConsola({
  formatOptions: {
    colors: true,
    compact: true,
    date: false,
  },
  level: 3, // Info level - no debug messages
});
