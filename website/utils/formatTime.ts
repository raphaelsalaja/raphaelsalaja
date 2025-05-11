/**
 * Format seconds into MM:SS format
 * @param seconds Total seconds to format
 * @returns String in MM:SS format
 */
export function formatTimeMMSS(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

/**
 * Format seconds into HH:MM:SS format
 * @param seconds Total seconds to format
 * @returns String in HH:MM:SS format
 */
export function formatTimeHHMMSS(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedHours = String(hours).padStart(2, "0");
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

/**
 * Format seconds into a human-readable string
 * @param seconds Total seconds to format
 * @returns Human-readable time string (e.g., "2 min 30 sec")
 */
export function formatTimeHuman(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  if (minutes === 0) {
    return `${remainingSeconds} sec`;
  }
  if (remainingSeconds === 0) {
    return `${minutes} min`;
  }
  return `${minutes} min ${remainingSeconds} sec`;
}

export function getMinutesAndSeconds(value: number): {
  minutes: number;
  seconds: number;
} {
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return { minutes, seconds };
}
