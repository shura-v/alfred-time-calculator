import { parseDate } from "chrono-node";
import { formatDate } from "./utils";

export function calculateRelative(value: string): string | null {
  const inputIn = value.match(/^in\s+(.+)$/i)?.[1]?.trim();
  const inputAgo = value.match(/^(.+)\s+ago$/i)?.[1]?.trim();
  if (!inputIn && !inputAgo) return null;
  const expression = inputIn ? `${inputIn} from now` : `${inputAgo} ago`;
  const parsed = parseDate(expression);
  if (!parsed || isNaN(parsed.getTime())) return null;

  const year = parsed.getUTCFullYear();

  if (year < 0) {
    const approxYear = Math.abs(year);
    return `~${approxYear} BC (too ancient)`;
  }
  if (year > 9999) {
    return `~${year} AD (too far in the future)`;
  }
  return formatDate(parsed);
}
