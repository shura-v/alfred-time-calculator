import { parseDate } from "chrono-node";
import { addBusinessDays, isValid, subBusinessDays } from "date-fns";
import type { TimeCalculatorResult } from "./types";
import { createSuccessResult, formatDate } from "./utils";

/**
 * - "in ..."
 * - "... ago"
 */
export function calculateRelative(input: string): TimeCalculatorResult | null {
  const inputIn = input.match(/^in\s+(.+)$/i)?.[1]?.trim();
  const inputAgo = input.match(/^(.+)\s+ago$/i)?.[1]?.trim();
  if (!inputIn && !inputAgo) {
    return null;
  }
  const isFuture = Boolean(inputIn);
  const inputMatch = (inputIn || inputAgo) as string;
  return (
    calculateRelativeWeekdays(inputMatch, isFuture) ??
    calculateRelativeOther(inputMatch, isFuture)
  );
}

function calculateRelativeWeekdays(
  input: string,
  isFuture: boolean,
): TimeCalculatorResult | null {
  const daysStr = /^(\d+)\s+(weekdays?|business days?)$/i.exec(input)?.[1];
  const days = daysStr ? parseInt(daysStr) : null;
  if (days === null) return null;

  const now = new Date();
  const result = isFuture
    ? addBusinessDays(now, days)
    : subBusinessDays(now, days);

  return createSuccessResult({
    text: formatRelativeDate(result),
    info: "Weekdays exclude weekends, not holidays",
  });
}

function calculateRelativeOther(
  input: string,
  isFuture: boolean,
): TimeCalculatorResult | null {
  const expression = isFuture ? `${input} from now` : `${input} ago`;
  const parsed = parseDate(expression);
  if (!parsed || !isValid(parsed)) {
    return null;
  }

  return createSuccessResult({ text: formatRelativeDate(parsed) });
}

function formatRelativeDate(date: Date): string {
  const year = date.getFullYear();
  if (year < 0) {
    return `~${Math.abs(year)} BC (too ancient)`;
  }
  if (year > 9999) {
    return `~${year} AD (too far in the future)`;
  }

  return formatDate(date);
}
