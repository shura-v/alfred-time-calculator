import type { TimeCalculatorResult } from "../types";

type TCreateResultArgs = {
  text: string;
  info?: string;
};

export function createResult({
  text,
  info,
}: TCreateResultArgs): TimeCalculatorResult {
  return { text, info };
}
