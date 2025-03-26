export type TimeCalculatorResult =
  | TimeCalculatorResultSuccess
  | TimeCalculatorResultFailure;

export type TimeCalculatorResultSuccess = {
  ok: true;
  text: string;
  info?: string;
};

export type TimeCalculatorResultFailure = {
  ok: false;
  text: string;
  info: string;
};
