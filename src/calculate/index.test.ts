import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { calculate } from "./";

const expressionCases = [
  ["1h + 30m", "1 hour, 30 minutes"],
  ["20d * 2", "40 days"],
  ["5m / 2", "2 minutes, 30 seconds"],
  ["1h - 5s", "59 minutes, 55 seconds"],
  ["300ms * 4", "1.2 seconds"],
];

describe("Expressions", () => {
  it("should correctly calculate time expressions", () => {
    for (const [input, expectedOutput] of expressionCases) {
      const result = calculate(input);
      expect(result).toEqual(expectedOutput);
    }
  });

  it("should return 'Invalid input' for unknown expressions", () => {
    const result = calculate("1test");
    expect(result).toBe(null);
  });
});

describe("Date-based calculations", () => {
  const fixedNow = new Date("2025-03-21T17:00:00Z");

  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(fixedNow);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should return relative duration for `at <date>`", () => {
    expect(calculate("at jan 2000")).toMatch(/25 years.*ago/i);
    expect(calculate("at next monday")).toMatch(/in \d+ days/i);
    expect(calculate("at last sunday")).toMatch(/\d+ days.*ago/i);
  });

  it("should return absolute date for `in <duration>`", () => {
    expect(calculate("in 3 days")).toMatch(/March 24, 2025/i);
    expect(calculate("in 1 hour")).toMatch(/March 21, 2025/i);
  });

  it("should return absolute date for `<duration> ago`", () => {
    expect(calculate("5 minutes ago")).toMatch(/March 21, 2025/i);
    expect(calculate("10 days ago")).toMatch(/March 11, 2025/i);
  });

  it("should handle ancient dates gracefully", () => {
    expect(calculate("30000 years ago")).toMatch(/~\d+ BC/i);
  });

  it("should return correct relative duration for `at next wednesday` from fixed date", () => {
    const result = calculate("at next wednesday");
    expect(result).toMatch(/in 4 days 19 hours/i);
  });

  it("should return correct relative duration for `at next wednesday` from fixed date and time", () => {
    const result = calculate("at next wednesday at 11:00");
    expect(result).toMatch(/in 4 days 18 hours/i);
  });

  it("should return null for invalid input", () => {
    expect(calculate("potato salad")).toBeNull();
  });
});
