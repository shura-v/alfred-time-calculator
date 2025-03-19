import { describe, expect, it } from "vitest";
import { run } from "./index.js";

const testCases = [
    ["1h + 30m", "1 hour, 30 minutes"],
    ["20d * 2", "40 days"],
    ["5m / 2", "2 minutes, 30 seconds"],
    ["1h - 5s", "59 minutes, 55 seconds"],
    ["300ms * 4", "1.2 seconds"],
];

function getResultItems(str: string) {
    return JSON.parse(run([str])).items;
}

describe("Time Calculator", () => {
    it("should correctly calculate time expressions", () => {
        for (const [input, expectedOutput] of testCases) {
            const result = getResultItems(input);
            expect(result).toEqual([
                { title: expectedOutput, subtitle: "Press Enter to copy", arg: expectedOutput },
            ]);
        }
    });

    it("should return 'Invalid input' for unknown expressions", () => {
        const [item] = getResultItems("1test");
        expect(item.title).toBe("Invalid input");
    });
});
