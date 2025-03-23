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
  const calculated = calculate(query);
  return toJSON({
    items:
      calculated === null
        ? INVALID_ITEMS
        : [
            {
              title: calculated.result,
              subtitle: calculated.info ?? "Press Enter to copy",
              arg: calculated.result,
            },
          ],
  });
}

Object.defineProperty(globalThis, "run", { value: run });
