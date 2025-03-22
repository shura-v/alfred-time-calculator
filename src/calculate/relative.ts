import { parseDate } from "chrono-node";
import { addBusinessDays, isValid, subBusinessDays } from "date-fns";
import type { TimeCalculatorResult } from "./types";
import { createResult, formatDate } from "./utils";

function isWeekdaysExpression(text: string): number | null {
  const daysStr = /^(\d+)\s+weekdays?$/i.exec(text)?.[1];
  return daysStr ? parseInt(daysStr) : null;
}

function calculateWeekdays(input: string, isFuture: boolean): string | null {
  const days = isWeekdaysExpression(input);
  if (days === null) return null;

  const now = new Date();
  const result = isFuture
    ? addBusinessDays(now, days)
    : subBusinessDays(now, days);

  return formatDate(result);
}

export function calculateRelative(value: string): TimeCalculatorResult | null {
  const inputIn = value.match(/^in\s+(.+)$/i)?.[1]?.trim();
  const inputAgo = value.match(/^(.+)\s+ago$/i)?.[1]?.trim();
  if (!inputIn && !inputAgo) {
    return null;
  }

  const input = inputIn || inputAgo || "";
  const isFuture = Boolean(inputIn);

  const weekdayResult = calculateWeekdays(input, isFuture);
  if (weekdayResult) {
    return createResult({
      result: weekdayResult,
      info: "Weekdays exclude weekends, not holidays",
    });
  }

  const expression = isFuture ? `${input} from now` : `${input} ago`;
  const parsed = parseDate(expression);
  if (!parsed || !isValid(parsed)) {
    return null;
  }

  const year = parsed.getFullYear();
  if (year < 0) {
    return createResult({ result: `~${Math.abs(year)} BC (too ancient)` });
  }
  if (year > 9999) {
    return createResult({ result: `~${year} AD (too far in the future)` });
  }

  return createResult({ result: formatDate(parsed) });
}
