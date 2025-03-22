import type { TimeCalculatorResult } from "../types";

type TCreateResultArgs = {
  result: string;
  info?: string;
};

export function createResult({
  result,
  info,
}: TCreateResultArgs): TimeCalculatorResult {
  return { result, info };
}
