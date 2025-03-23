import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calculate } from "./";

function calcResult(query: string) {
  return calculate(query)?.result ?? null;
}

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
      const title = calcResult(input);
      expect(title).toEqual(expectedOutput);
    }
  });

  it("should return null for invalid input", () => {
    expect(calculate("potato salad")).toBeNull();
  });
});

describe("Duration calculations (at)", () => {
  it("should return relative duration for `at <date>`", () => {
    expect(calcResult("at jan 2000")).toMatch(/25 years.*ago/i);
    expect(calcResult("at next monday")).toMatch(/in \d+ days/i);
    expect(calcResult("at last sunday")).toMatch(/\d+ days.*ago/i);
  });

  it("should return correct relative duration from fixed date", () => {
    expect(calcResult("at next wednesday")).toMatch(/in 4 days 19 hours/i);
    expect(calcResult("at next wednesday at 11:00")).toMatch(
      /in 4 days 18 hours/i,
    );
    expect(calcResult("at last friday at 00:00")).toMatch(
      /7 days 17 hours ago/i,
    );
  });
});

describe("Absolute date calculations (in/ago)", () => {
  it("should return absolute date for `in <duration>`", () => {
    expect(calcResult("in 3 days")).toMatch(/March 24, 2025/i);
    expect(calcResult("in 1 hour")).toMatch(/March 21, 2025/i);
    expect(calcResult("in 5 weekdays")).toMatch(/Friday, March 28/i);
  });

  it("should return absolute date for `<duration> ago`", () => {
    expect(calcResult("5 minutes ago")).toMatch(/March 21, 2025/i);
    expect(calcResult("10 days ago")).toMatch(/March 11, 2025/i);
  });

  it("should handle ancient dates gracefully", () => {
    expect(calcResult("30000 years ago")).toMatch(/~\d+ BC/i);
  });
});

describe("Interval", () => {
  it("should calculate duration between two dates", () => {
    expect(calcResult("from yesterday to today")).toEqual("1 day");
    expect(calcResult("from monday to friday")).toEqual("-3 days");
    expect(calcResult("from tuesday till thursday")).toEqual("2 days");
    expect(calcResult("from monday to next friday")).toEqual("4 days");
    expect(calcResult("from 10:00 to 12:30")).toEqual("2 hours 30 minutes");
    expect(calcResult("from last sunday to next sunday")).toMatch(/14 days/i);
  });

  it("should work with `until` keyword", () => {
    expect(calcResult("from 14:00 until 17:00")).toEqual("3 hours");
    expect(calcResult("from yesterday until next monday")).toMatch(
      /3 days 19 hours/i,
    );
  });

  it("should work with `till` keyword", () => {
    expect(calcResult("from 100000 years ago until 9999.01.01")).toEqual(
      "107973 years 9 months 10 days 19 hours",
    );
  });

  it("should support `between ... and ...` format", () => {
    expect(calcResult("between 1pm and 3pm")).toBe("2 hours");
    expect(calcResult("between yesterday and today")).toMatch(/1 day/i);
  });

  it("should return null for invalid interval format", () => {
    expect(calcResult("from nowhere but towards destiny")).toBeNull();
  });
});
