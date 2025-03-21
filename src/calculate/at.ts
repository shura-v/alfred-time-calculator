import { parseDate } from "chrono-node";
import { formatDuration, intervalToDuration } from "date-fns";
import { snapToLocalStartOfDay } from "./utils";

export function calculateAt(value: string): string | null {
  const inputAt = value.match(/^at\s+(.*)/)?.[1]?.trim();
  if (!inputAt) {
    return null;
  }

  const parsed = parseDate(inputAt);
  if (!parsed) {
    return null;
  }
  const parsedStartOfDay = snapToLocalStartOfDay(parsed).getTime();
  const now = Date.now();
  const isFutureTarget = now < parsedStartOfDay;

  const duration = intervalToDuration({
    start: isFutureTarget ? now : parsedStartOfDay,
    end: isFutureTarget ? parsedStartOfDay : now,
  });

  const formattedDuration = formatDuration(duration);
  return isFutureTarget
    ? `in ${formattedDuration}`
    : `${formattedDuration} ago`;
}
