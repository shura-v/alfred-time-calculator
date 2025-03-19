import { describe, expect, it } from "vitest";
import { calculate, run } from "./index.js";

const testCases = [
    ["1h + 30m", "1 hour, 30 minutes"],
    ["20d * 2", "40 days"],
    ["5m / 2", "2 minutes, 30 seconds"],
    ["1h - 5s", "59 minutes, 55 seconds"],
    ["300ms * 4", "1.2 seconds"],
];

function fromJSON(str: string) {
    return JSON.parse(str);
}

describe("Time Calculator", () => {
    it("should correctly calculate time expressions", () => {
        for (const [input, expectedOutput] of testCases) {
            const result = fromJSON(run([input])).items;
            expect(result).toEqual([
                { title: expectedOutput, subtitle: "Press Enter to copy", arg: expectedOutput },
            ]);
        }
    });

    it("should return 'Invalid input' for unknown expressions", () => {
        const [item] = fromJSON(run(["1test"])).items;
        expect(item.title).toBe("Invalid input");
    });

    it("should return null for invalid calculate() input", () => {
        expect(calculate("1test")).toBeNull();
    });
});
