export interface VacuumConfig {
  patterns: string[];
  postClean?: string[];
  exclude?: string[];
  dryRun?: boolean;
}

export interface VacuumOptions {
  configPath?: string;
  dryRun?: boolean;
  verbose?: boolean;
}

export interface CleanupResult {
  deletedFiles: string[];
  deletedDirectories: string[];
  errors: string[];
  postCleanResults: Array<{
    command: string;
    success: boolean;
    error?: string;
  }>;
}
