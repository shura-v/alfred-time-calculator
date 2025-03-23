import { calculate } from "./calculate";

type AlfredResult = {
  items: AlfredResultItem[];
};

type AlfredResultItem = {
  title: string;
  subtitle: string;
  arg?: string;
};

const INVALID_ITEMS: AlfredResultItem[] = [
  {
    title: "Invalid input",
    subtitle: 'Try something like "1h + 30m" or "at next monday"',
  },
];

function toJSON(result: AlfredResult) {
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
              title: result.text,
              subtitle: result.info ?? "Press Enter to copy",
              arg: result.text,
            },
          ],
  });
}

Object.defineProperty(globalThis, "run", { value: run });
