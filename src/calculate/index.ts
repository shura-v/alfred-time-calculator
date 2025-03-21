import { calculateAt } from "./at";
import { calculateExpression } from "./expression";
import { calculateRelative } from "./relative";

export function calculate(value: string): string | null {
  const lower = value.toLowerCase().trim();
  try {
    return (
      calculateAt(lower) ??
      calculateRelative(lower) ??
      calculateExpression(lower)
    );
  } catch {
    return null;
  }
}
