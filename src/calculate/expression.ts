import { Parser } from "expr-eval";
import ms, { type StringValue } from "ms";
import { humanizeDuration } from "./utils";

export function calculateExpression(value: string) {
  const parser = new Parser();
  const expression = value.replaceAll(/(\d+\.?\d*[a-z]+)/g, (match) => {
    const milliseconds = ms(match as StringValue);
    return Number.isNaN(milliseconds) ? match : String(milliseconds / 1000);
  });
  const totalSeconds = parser.evaluate(expression);
  if (isNaN(totalSeconds)) {
    return null;
  }
  return humanizeDuration(totalSeconds);
}
