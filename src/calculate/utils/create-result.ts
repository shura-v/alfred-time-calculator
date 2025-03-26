import type { TimeCalculatorResult } from "../types";

type TCreateResultArgs = {
  text: string;
  info?: string;
  isError?: boolean;
};

export function createResult({
  text,
  info,
  isError = false,
}: TCreateResultArgs): TimeCalculatorResult {
  return { text, info, ok: !isError };
}
