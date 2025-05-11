import moment from "moment";

export function formatDuration(start: number, end: number) {
  const startMoment = moment.unix(start);
  const endMoment = moment.unix(end);

  const duration = moment.duration(endMoment.diff(startMoment));

  const hours = duration.hours();
  const minutes = duration.minutes();
  const seconds = duration.seconds();

  const parts: string[] = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (!parts.length && seconds) parts.push(`${seconds}s`);

  const full = [hours, minutes, seconds]
    .map((n) => String(n).padStart(2, "0"))
    .join(":");

  return { parts, full };
}
