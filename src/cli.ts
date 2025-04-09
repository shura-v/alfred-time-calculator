import chalk from "chalk";
import { calculate } from "./calculate";

const input: string = process.argv.slice(2).join(" ");
const result = calculate(input);

if (!result.ok) {
  console.error(chalk.red(`❌  ${result.text}`));
  console.log(chalk.gray(result.info));
  process.exit(1);
}

const { info, text } = result;

console.info(chalk.green(text));

if (info) {
  console.log(chalk.gray(info));
}
