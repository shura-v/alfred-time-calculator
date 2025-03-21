import { parse } from "chrono-node";
import { formatDuration, intervalToDuration } from "date-fns";

export function roundToMinute(date: Date): Date {
  const ms = date.getTime();
  const rounded = Math.round(ms / 60_000) * 60_000;
  return new Date(rounded);
}

export function calculateAt(value: string): string | null {
  const inputAt = value.match(/^at\s+(.*)/i)?.[1]?.trim();
  if (!inputAt) return null;

  const results = parse(inputAt);
  if (results.length === 0) return null;

  const parsed = results[0].start.date();
  if (!parsed || isNaN(parsed.getTime())) return null;

  const roundedParsed = roundToMinute(parsed);
  const roundedNow = roundToMinute(new Date());

  if (roundedParsed.getTime() === roundedNow.getTime()) {
    return "now";
  }

  const diffMs = roundedParsed.getTime() - roundedNow.getTime();
  const isFuture = diffMs > 0;

  const duration = intervalToDuration({
    start: isFuture ? roundedNow : roundedParsed,
    end: isFuture ? roundedParsed : roundedNow,
  });

  const formatted = formatDuration(duration);
  return isFuture ? `in ${formatted}` : `${formatted} ago`;
}
