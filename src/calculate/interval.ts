import { parseDate } from "chrono-node";
import { formatDuration, intervalToDuration } from "date-fns";
import type { TimeCalculatorResult } from "./types";

export function calculateInterval(input: string): TimeCalculatorResult | null {
  const normalized = input
    .replace(/^between\s+/i, "from ")
    .replace(/\band\s+/i, " to ");

  const match = /^from (.+?) (?:to|until|till) (.+)/i.exec(normalized);
  if (!match) return null;

  const [, fromText, toText] = match;

  if (!fromText || !toText) return null;

  const fromDate = parseDate(fromText);
  const toDate = parseDate(toText);

  if (!fromDate || !toDate) return null;

  const duration = intervalToDuration({ start: fromDate, end: toDate });

  return {
    result: formatDuration(duration),
  };
}
