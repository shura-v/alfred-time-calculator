#!/usr/bin/env node
import chalk from "chalk";
import { calculate } from "./calculate";

const input = process.argv.slice(2).join(" ");
const calcResult = calculate(input);

if (!calcResult) {
  console.error(chalk.red("❌ Invalid input."));
  console.log(chalk.gray('Usage: tc "1h + 30m"'));
  process.exit(1);
}

const { info, result } = calcResult;

console.info(chalk.green(result));

if (info) {
  console.log(chalk.gray(info));
}
