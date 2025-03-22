import { parseDate } from "chrono-node";
import { addBusinessDays, isValid, subBusinessDays } from "date-fns";
import { formatDate } from "./utils";

function isWeekdaysExpression(text: string): number | null {
  const match = /^(\d+)\s+weekdays?$/i.exec(text);
  return match ? parseInt(match[1]) : null;
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

export function calculateRelative(value: string): string | null {
  const inputIn = value.match(/^in\s+(.+)$/i)?.[1]?.trim();
  const inputAgo = value.match(/^(.+)\s+ago$/i)?.[1]?.trim();
  if (!inputIn && !inputAgo) {
    return null;
  }

  const input = inputIn || inputAgo || "";
  const isFuture = Boolean(inputIn);

  const weekdayResult = calculateWeekdays(input, isFuture);
  if (weekdayResult) {
    return weekdayResult;
  }

  const expression = isFuture ? `${input} from now` : `${input} ago`;
  const parsed = parseDate(expression);
  if (!parsed || !isValid(parsed)) {
    return null;
  }

  const year = parsed.getFullYear();
  if (year < 0) {
    return `~${Math.abs(year)} BC (too ancient)`;
  }
  if (year > 9999) {
    return `~${year} AD (too far in the future)`;
  }

  return formatDate(parsed);
}
