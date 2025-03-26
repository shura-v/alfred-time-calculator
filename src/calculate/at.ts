import { parse } from "chrono-node";
import { formatDuration, intervalToDuration } from "date-fns";
import type { TimeCalculatorResult } from "./types";
import { createSuccessResult, roundToSecond } from "./utils";

export function calculateAt(input: string): TimeCalculatorResult | null {
  const inputAt = input.match(/^at\s+(.*)/i)?.[1]?.trim();
  if (!inputAt) return null;

  const results = parse(inputAt);
  if (results.length === 0) return null;

  const parsed = results[0]?.start.date();
  if (!parsed || isNaN(parsed.getTime())) return null;

  const roundedParsed = roundToSecond(parsed);
  const roundedNow = roundToSecond(new Date());

  if (roundedParsed.getTime() === roundedNow.getTime()) {
    return createSuccessResult({ text: "now" });
  }

  const diffMs = roundedParsed.getTime() - roundedNow.getTime();
  const isFuture = diffMs > 0;

  const duration = intervalToDuration({
    start: isFuture ? roundedNow : roundedParsed,
    end: isFuture ? roundedParsed : roundedNow,
  });

  const formatted = formatDuration(duration);
  return createSuccessResult({
    text: isFuture ? `in ${formatted}` : `${formatted} ago`,
  });
}
