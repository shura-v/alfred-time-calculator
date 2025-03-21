#!/usr/bin/env node
import { calculate } from "./calculate";

const input = process.argv.slice(2).join(" ");
const result = calculate(input);

if (!result) {
  console.log('Usage: tc "1h + 30m"');
  process.exit(1);
}

console.log(result);
