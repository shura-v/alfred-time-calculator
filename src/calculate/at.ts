import { parse } from "chrono-node";
import { formatDuration, intervalToDuration } from "date-fns";

export function calculateAt(value: string): string | null {
  const inputAt = value.match(/^at\s+(.*)/i)?.[1]?.trim();
  if (!inputAt) {
    return null;
  }

  const results = parse(inputAt);
  if (results.length === 0) {
    return null;
  }

  const parsed = results[0].start.date();
  if (!parsed || isNaN(parsed.getTime())) {
    return null;
  }

  const now = new Date();
  const isFuture = parsed.getTime() > now.getTime();

  const duration = intervalToDuration({
    start: isFuture ? now : parsed,
    end: isFuture ? parsed : now,
  });

  const formatted = formatDuration(duration);
  return isFuture ? `in ${formatted}` : `${formatted} ago`;
}
