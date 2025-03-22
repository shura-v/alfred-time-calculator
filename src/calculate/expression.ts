import { Parser } from "expr-eval";
import ms, { type StringValue } from "ms";
import type { TimeCalculatorResult } from "./types";
import { createResult, humanizeDuration } from "./utils";

export function calculateExpression(
  value: string,
): TimeCalculatorResult | null {
  const parser = new Parser();
  const expression = value
    .replaceAll(/,/g, ".") // replace commas with dots
    .replaceAll(/(\d+\.?\d*)\s*([a-z]+)/gi, "$1$2") // remove spaces between number and unit
    .replaceAll(/(\d+\.?\d*[a-z]+)/g, (match) => {
      const milliseconds = ms(match as StringValue);
      return Number.isNaN(milliseconds) ? match : String(milliseconds / 1000);
    });
  const totalSeconds = parser.evaluate(expression);
  if (isNaN(totalSeconds)) {
    return null;
  }
  return createResult({ result: humanizeDuration(totalSeconds) });
}
