/**
 * Shared logger utility for build scripts
 *
 * Provides minimal Turbo-style logging across all scripts
 */

const { createConsola } = require("consola");

// Create a minimal logger instance with Turbo-style formatting
const logger = createConsola({
  formatOptions: {
    colors: true,
    compact: true,
    date: false,
  },
  level: 3, // Info level - no debug messages
});

module.exports = { logger };
