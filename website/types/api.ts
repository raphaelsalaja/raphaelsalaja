// API Error types
export interface ApiError extends Error {
  message: string;
  statusCode?: number;
}

// Mouse event types
export interface MouseEventWithPosition {
  clientX: number;
  clientY: number;
}

// Workout data types
export interface WorkoutData {
  workouts: Array<unknown>;
}

// Chart event type
export interface ChartEvent {
  target?: EventTarget;
  type?: string;
}

// Date helper types (for workout templates)
export interface DateHelper {
  intervals: (unit: string, start: number, end: number) => Date[];
  date: (input: number) => Date;
}

export interface TemplateOptions {
  [key: string]: unknown;
}

// Health data types
export interface HealthSource {
  [key: string]: unknown;
}

export interface HealthStatistic {
  sources: HealthSource[];
  harmonized: {
    summary?: number;
    [key: string]: unknown;
  };
}
