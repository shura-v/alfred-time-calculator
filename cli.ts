#!/usr/bin/env node
import { calculate } from "./index.js";

const input = process.argv.slice(2).join(" ");

if (!input) {
  console.log("Usage: tc \"1h + 30m\"");
  process.exit(1);
}

console.log(calculate(input));
