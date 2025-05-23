import { calculateAt } from "./at";
import { calculateExpression } from "./expression";
import { calculateInterval } from "./interval";
import { calculateRelative } from "./relative";
import type {
  TimeCalculatorResult,
  TimeCalculatorResultFailure,
  TimeCalculatorResultSuccess,
} from "./types";
import { createErrorResult } from "./utils";

function getResult(input: string): TimeCalculatorResult {
  if (!input) {
    throw new TypeError("empty query");
  }

  const result =
    calculateInterval(input) ??
    calculateAt(input) ??
    calculateRelative(input) ??
    calculateExpression(input);
  if (!result) {
    throw new TypeError("empty result");
  }
  return result;
}

export function calculate(query: string): TimeCalculatorResult {
  const lower = query.toLowerCase().trim();
  try {
    return getResult(lower);
  } catch {
    return createErrorResult({
      text: "Invalid input",
      info: `Try something like "1h + 30m" or "at next monday"`,
    });
  }
}

export {
  TimeCalculatorResult,
  TimeCalculatorResultSuccess,
  TimeCalculatorResultFailure,
};
