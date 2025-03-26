import type {
  TimeCalculatorResultFailure,
  TimeCalculatorResultSuccess,
} from "../types";

type TCreateResultSuccess = {
  text: string;
  info?: string;
};

type TCreateResultFailure = {
  text: string;
  info: string;
};

export function createSuccessResult({
  text,
  info,
}: TCreateResultSuccess): TimeCalculatorResultSuccess {
  return { text, info, ok: true };
}

export function createErrorResult({
  text,
  info,
}: TCreateResultFailure): TimeCalculatorResultFailure {
  return { text, info, ok: false };
}
