import { calculate, type TimeCalculatorResult } from "./calculate";

type AlfredResult = {
  items: AlfredResultItem[];
};

type AlfredResultItem = {
  title: string;
  subtitle: string;
  arg?: string;
};

function toAlfredResult(result: TimeCalculatorResult): AlfredResult {
  return {
    items: [
      {
        title: result.text,
        subtitle: result.info ?? "Press Enter to copy",
        arg: result.text,
      },
    ],
  };
}

function run(argv: Array<string>): string {
  const query = argv[0]?.trim();
  const result = calculate(query ?? "");
  return JSON.stringify(toAlfredResult(result));
}

Object.defineProperty(globalThis, "run", { value: run });
