# @rs/vacuum

A configurable cleanup utility for monorepo projects that removes build artifacts, dependencies, and other temporary files based on glob patterns.

## Features

- 🧹 **Configurable cleanup patterns** - Define what to clean via JSON configuration
- 🔍 **Glob pattern support** - Use powerful glob patterns for flexible file matching
- 🚀 **Turbo integration** - Automatically runs `turbo clean` if available
- 📦 **Post-clean commands** - Run commands after cleanup (e.g., `pnpm install`)
- 🔬 **Dry run mode** - Preview what would be deleted without actually deleting
- 🎨 **Colorized output** - Clear, colorful console output with progress indicators
- 📊 **Detailed reporting** - Summary of deleted files, directories, and errors

## Installation

```bash
# As a dev dependency in your monorepo
pnpm add -D @rs/vacuum

# Or globally
pnpm add -g @rs/vacuum
```

## Usage

### CLI

```bash
# Clean using vacuum.json configuration
vacuum clean

# Dry run to see what would be deleted
vacuum clean --dry-run

# Verbose output
vacuum clean --verbose

# Use custom config file
vacuum clean --config ./custom-clean.json

# Initialize a default configuration
vacuum init
```

### Programmatic API

```typescript
import { Vacuum } from '@rs/vacuum';

// From config file
const vacuum = await Vacuum.fromConfigFile('./vacuum.json', {
  dryRun: false,
  verbose: true
});

const result = await vacuum.clean();

// Direct configuration
const vacuum2 = new Vacuum({
  patterns: ['node_modules', '**/.DS_Store'],
  postClean: ['pnpm install']
});

await vacuum2.clean();
```

## Configuration

Create a `vacuum.json` file in your project root:

```json
{
  "patterns": [
    "node_modules",
    ".turbo",
    "packages/*/node_modules",
    "packages/*/dist",
    "packages/*/.turbo",
    "**/.DS_Store",
    "**/coverage",
    "**/*.log"
  ],
  "postClean": [
    "pnpm install"
  ],
  "exclude": [
    "node_modules/**",
    ".git/**"
  ]
}
```

### Configuration Options

- **`patterns`** (required): Array of glob patterns to match files/directories for deletion
- **`postClean`** (optional): Array of shell commands to run after cleanup
- **`exclude`** (optional): Array of glob patterns to exclude from cleanup (in addition to default excludes)

### Default Excludes

The following patterns are always excluded:
- `node_modules/**`
- `.git/**`

## Examples

### Basic Monorepo Cleanup

```json
{
  "patterns": [
    "node_modules",
    "packages/*/node_modules",
    "packages/*/dist",
    "apps/*/node_modules",
    "apps/*/.next"
  ],
  "postClean": ["pnpm install"]
}
```

### Development Files Cleanup

```json
{
  "patterns": [
    "**/.DS_Store",
    "**/coverage",
    "**/*.log",
    "**/*.tsbuildinfo",
    "**/dist"
  ]
}
```

### Package Scripts Integration

Add to your `package.json`:

```json
{
  "scripts": {
    "clean": "vacuum clean",
    "clean:dry": "vacuum clean --dry-run",
    "clean:verbose": "vacuum clean --verbose"
  }
}
```

## API Reference

### `Vacuum` Class

#### `Vacuum.fromConfigFile(configPath, options)`

Create a Vacuum instance from a configuration file.

- `configPath`: Path to configuration file (default: `'vacuum.json'`)
- `options`: VacuumOptions object

#### `new Vacuum(config, options)`

Create a Vacuum instance with direct configuration.

- `config`: VacuumConfig object
- `options`: VacuumOptions object

#### `vacuum.clean()`

Execute the cleanup process. Returns a `CleanupResult` object.

### Types

```typescript
interface VacuumConfig {
  patterns: string[];
  postClean?: string[];
  exclude?: string[];
}

interface VacuumOptions {
  configPath?: string;
  dryRun?: boolean;
  verbose?: boolean;
}

interface CleanupResult {
  deletedFiles: string[];
  deletedDirectories: string[];
  errors: string[];
  postCleanResults: Array<{
    command: string;
    success: boolean;
    error?: string;
  }>;
}
```

## License

MIT
