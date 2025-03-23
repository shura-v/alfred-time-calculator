import { calculateAt } from "./at";
import { calculateExpression } from "./expression";
import { calculateInterval } from "./interval";
import { calculateRelative } from "./relative";
import type { TimeCalculatorResult } from "./types";

export function calculate(value: string): TimeCalculatorResult | null {
  const lower = value.toLowerCase().trim();
  try {
    return (
      calculateAt(lower) ??
      calculateRelative(lower) ??
      calculateInterval(lower) ??
      calculateExpression(lower)
    );
  } catch {
    return null;
  }
}

export { type TimeCalculatorResult };
