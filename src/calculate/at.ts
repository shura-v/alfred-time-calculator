import { parseDate } from "chrono-node";
import { formatDuration, intervalToDuration } from "date-fns";

export function calculateAt(value: string): string | null {
  const inputAt = value.match(/^at\s+(.*)/)?.[1]?.trim();
  if (!inputAt) {
    return null;
  }

  const target = parseDate(inputAt)?.getTime();
  if (!target) {
    return null;
  }

  const now = Date.now();
  const isFutureTarget = now < target;

  const duration = intervalToDuration({
    start: isFutureTarget ? now : target,
    end: isFutureTarget ? target : now,
  });

  const formattedDuration = formatDuration(duration);
  return isFutureTarget
    ? `in ${formattedDuration}`
    : `${formattedDuration} ago`;
}
