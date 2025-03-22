import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calculate } from "./";

const fixedNow = new Date("2025-03-21T17:00:00Z");

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(fixedNow);
});

afterEach(() => {
  vi.useRealTimers();
});

describe("Expressions", () => {
  const expressionCases = [
    ["1h + 30m", "1 hour, 30 minutes"],
    ["20d * 2", "40 days"],
    ["5m / 2", "2 minutes, 30 seconds"],
    ["1h - 5s", "59 minutes, 55 seconds"],
    ["300ms * 4", "1.2 seconds"],
    ["1h - 145.111m", "-1 hour, 25 minutes, 6.66 seconds"],
    ["1,5h - 30m", "1 hour"],
    ["1,5 h - 30 m", "1 hour"],
    ["(1 h - 5 s) / 10", "5 minutes, 59.5 seconds"],
  ] as const;

  it("should correctly calculate time expressions", () => {
    for (const [input, expectedOutput] of expressionCases) {
      const result = calculate(input);
      expect(result).toEqual(expectedOutput);
    }
  });
});

describe("Duration calculations (at)", () => {
  it("should return relative duration for `at <date>`", () => {
    expect(calculate("at jan 2000")).toMatch(/25 years.*ago/i);
    expect(calculate("at next monday")).toMatch(/in \d+ days/i);
    expect(calculate("at last sunday")).toMatch(/\d+ days.*ago/i);
  });

  it("should return correct relative duration from fixed date", () => {
    expect(calculate("at next wednesday")).toMatch(/in 4 days 19 hours/i);
    expect(calculate("at next wednesday at 11:00")).toMatch(
      /in 4 days 18 hours/i,
    );
    expect(calculate("at last friday at 00:00")).toMatch(
      /7 days 17 hours ago/i,
    );
  });
});

describe("Absolute date calculations (in/ago)", () => {
  it("should return absolute date for `in <duration>`", () => {
    expect(calculate("in 3 days")).toMatch(/March 24, 2025/i);
    expect(calculate("in 1 hour")).toMatch(/March 21, 2025/i);
    expect(calculate("in 5 weekdays")).toMatch(/Friday, March 28/i);
  });

  it("should return absolute date for `<duration> ago`", () => {
    expect(calculate("5 minutes ago")).toMatch(/March 21, 2025/i);
    expect(calculate("10 days ago")).toMatch(/March 11, 2025/i);
  });

  it("should handle ancient dates gracefully", () => {
    expect(calculate("30000 years ago")).toMatch(/~\d+ BC/i);
  });
});

describe("Other", () => {
  it("should return null for invalid input", () => {
    expect(calculate("potato salad")).toBeNull();
  });
});
