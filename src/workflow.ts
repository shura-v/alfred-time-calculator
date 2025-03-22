import { calculate } from "./calculate";

type TimeCalculatorResult = {
  items: TimeCalculatorResultItem[];
};

type TimeCalculatorResultItem = {
  title: string;
  subtitle: string;
  arg?: string;
};

const INVALID_ITEMS: TimeCalculatorResultItem[] = [
  {
    title: "Invalid input",
    subtitle: 'Try something like "1h + 30m" or "at next monday"',
  },
];

function toJSON(result: TimeCalculatorResult) {
  return JSON.stringify(result);
}

function run(argv: Array<string>): string {
  const query = argv[0]?.trim();
  if (!query) {
    return toJSON({ items: INVALID_ITEMS });
  }
  const result = calculate(query);
  return toJSON({
    items:
      result === null
        ? INVALID_ITEMS
        : [
            {
              title: result.result,
              subtitle: result.info ?? "Press Enter to copy",
              arg: result.result,
            },
          ],
  });
}

Object.defineProperty(globalThis, "run", { value: run });
