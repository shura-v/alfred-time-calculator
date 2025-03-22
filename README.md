### 🕒 **Time Calculator – Alfred Workflow & CLI**

![Tests](https://github.com/shura-v/alfred-time-calculator/actions/workflows/test.yml/badge.svg)
![Release](https://github.com/shura-v/alfred-time-calculator/actions/workflows/release.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/alfred-time-calculator.svg)](https://www.npmjs.com/package/alfred-time-calculator)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

This package allows you to **quickly calculate time expressions** like `"1h + 30m"` and get **human-readable results**.

✅ **Works as:**

- **Alfred Workflow** (`tc 1h + 30m`)
- **CLI tool** (`tc "1h + 30m"`)
- **Node.js module** (`import { calculate } from "alfred-time-calculator"`)

---

## **🚀 Installation**

### **1️⃣ Use as an Alfred Workflow**

1. **[Download the Workflow](https://github.com/shura-v/alfred-time-calculator/releases/latest/download/time-calculator.alfredworkflow)**
2. Open **Alfred → Preferences → Workflows**
3. Drag & drop the workflow
4. Use the **keyword `tc`** in Alfred:
    - **Example:** `tc 2h + 45m`
    - **Output:** `"2 hours, 45 minutes"`

---

### **2️⃣ Use as a CLI (`tc` command)**

You can install the package globally and use it in the terminal:

```sh
npm install -g alfred-time-calculator
```

Now you can run:

```sh
tc "1h + 30m"
```

**Output:**

```
1 hour, 30 minutes
```

---

### **3️⃣ Use as a Node.js module**

Install the package:

```sh
npm install alfred-time-calculator
```

Then import and use in your project:

```ts
import { calculate } from "alfred-time-calculator";

console.log(calculate("2h - 10s"));
// Output: "1 hour, 59 minutes, 50 seconds"
```

---

## **⚡ Features**

- Convert expressions like `1h + 30m - 5s / 2`
- Supports **days, hours, minutes, seconds, milliseconds**
- Supports `at <date>` → returns relative duration (`in 3 days`, `2 months ago`)
- Supports `in <duration>`, `<duration> ago` → returns absolute date
- Supports **weekdays**: `in 5 weekdays`, `3 weekdays ago`
- Handles ultra ancient / future dates: `~25475 BC`, `~12000 AD`
- CLI support (`tc` command)
- Multiplication and division: `2d * 3`, `1h / 2`
- Formatted output: `"1 hour, 30 minutes"`
- Alfred support via **Script Filter**

---

## **🛠 Supported Time Units**

- `d` – days
- `w` – weeks
- `h` – hours
- `m` – minutes
- `s` – seconds
- `ms` – milliseconds

You can **combine expressions** (`1h + 30m - 5s / 2`) and use **multiplication/division** (`2d * 3`, `1h / 2`).

---

## **📜 CLI Details**

When installed globally, this package registers the **`tc`** command as a CLI tool.

**It is defined in `package.json` under `bin`:**

```json
{
  "bin": {
    "tc": "./dist/cli.js"
  }
}
```

This allows you to use `tc` in any terminal after installing the package globally.

To test it locally before publishing, use:

```sh
npm link
```

This will make `tc` available without installing from NPM.

To remove the local link:

```sh
npm unlink -g alfred-time-calculator
```

---

## **⚡ Example Queries & Outputs**

| Input          | Output                     |
|----------------|----------------------------|
| `tc 1h + 30m`  | `"1 hour, 30 minutes"`     |
| `tc 20d * 2`   | `"40 days"`                |
| `tc 5m / 2`    | `"2 minutes, 30 seconds"`  |
| `tc 1h - 5s`   | `"59 minutes, 55 seconds"` |
| `tc 300ms * 4` | `"1.2 seconds"`            |

---

## 🧪 Date-Based Queries (`at`, `in`, `ago`)

This tool also understands natural language date expressions and returns **relative durations** or **absolute dates**.

### 🧭 `at <date>` → returns relative duration

| Input                     | Output example                                                  |
|---------------------------|-----------------------------------------------------------------|
| `tc at august 1998`       | `26 years 7 months 20 days 11 hours 10 minutes 9 seconds ago`   |
| `tc at jan 2000`          | `25 years 2 months 20 days 11 hours 10 minutes 47 seconds ago`  |
| `tc at monday`            | `in 2 days 12 hours 49 minutes 40 seconds`                      |
| `tc at next friday 21:00` | `in 6 days 12 hours 48 minutes 41 seconds`                      |
| `tc at last sunday`       | `5 days 11 hours 11 minutes 34 seconds ago` (defaults to 12:00) |

> ⚠️ Note:
> - Avoid using only a year (like `tc at 2020`) — use a full date or add a month (e.g. `tc at jan 2020`)
> - Dates like `"tc at last sunday"` assume noon (12:00) by default if no time is specified.

### 🕓 `in <duration>` / `<duration> ago` → returns absolute date

| Input                | Output example                  |
|----------------------|---------------------------------|
| `tc in 3 days`       | `Monday, March 24, 2025, 17:00` |
| `tc 5 hours ago`     | `Friday, March 21, 2025, 12:00` |
| `tc in 10 minutes`   | `Friday, March 21, 2025, 17:10` |
| `tc 5 weekdays ago`  | `Friday, March 14, 2025`        |
| `tc 30000 years ago` | `~27975 BC (too ancient)`       |

---

## **💻 How It Works (Technical)**

- **Parses time units** like `1h`, `30m`, `5s` using the [`ms`](https://github.com/vercel/ms) module
- **Evaluates expressions** like `1h + 30m - 5s / 2` by replacing time units with seconds and computing the result using
  a secure math expression parser ([`expr-eval`](https://github.com/silentmatt/expr-eval)).
- **Formats durations** like `"2 hours, 45 minutes"` using [`date-fns`](https://github.com/date-fns/date-fns)
- **Calculates time deltas** (`at`, `in`, `ago`) via [`date-fns`](https://github.com/date-fns/date-fns)
- **Parses natural language dates** using [`chrono-node`](https://github.com/wanasit/chrono)
    - Supports expressions like `"next Friday"`, `"2 weeks ago"`, `"tomorrow at 10pm"`, `"Jan 2000"`
- **Formats dates** using `Intl.DateTimeFormat` in the user's local timezone
- **Returns Alfred-compatible JSON** via the **Script Filter**

---

## **🛠 Development**

To build the project:

```sh
pnpm run build:workflow   # Build Alfred workflow bundle
pnpm run build:node       # Build Node.js CLI and library
```

To run tests:

```sh
pnpm test
```

---

## **👨‍💻 Author**

- **Created by** [Shura Vlasov](https://github.com/shura-v), **with help from** [Chat GPT](https://chatgpt.com/) 🍻
- **GitHub:** [github.com/shura-v](https://github.com/shura-v)

🚀 **Now you can calculate time expressions in Alfred, terminal, and Node.js!**
