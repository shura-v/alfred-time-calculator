### 🕒 **Time Calculator – Alfred Workflow & CLI**

This package allows you to **quickly calculate time expressions** like `"1h + 30m"` and get **human-readable results**.

✅ **Works as:**

- **Alfred Workflow** (`tc 1h + 30m`)
- **CLI tool** (`tc "1h + 30m"`)
- **Node.js module** (`import { calculate } from "alfred-time-calculator"`)

---

## **🚀 Installation**

### **1️⃣ Use as an Alfred Workflow**

1. **[Download the Workflow](https://github.com/shura-v/alfred-time-calculator/releases/latest)** (
   `Time Calculator.alfredworkflow`)
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
- Supports **days, hours, minutes, seconds, and milliseconds**
- CLI support (`tc` command)
- Works with **multiplication and division** (`2d * 3`, `1h / 2`)
- **Formatted duration output** (`1 hour, 30 minutes`)
- **Uses Alfred's Script Filter** (`Keyword: tc`)

---

## **🛠 Supported Time Units**

- `d` – days (`2d = 172800 seconds`)
- `h` – hours (`3h = 10800 seconds`)
- `m` – minutes (`30m = 1800 seconds`)
- `s` – seconds (`45s = 45 seconds`)
- `ms` – milliseconds (`500ms = 0.5 seconds`)

You can **combine expressions** (`1h + 30m - 5s / 2`) and use **multiplication/division** (`2d * 3`, `1h / 2`).

---

## **📜 CLI Details**

When installed globally, this package registers the **`tc`** command as a CLI tool.

**It is defined in `package.json` under `bin`:**

```json
"bin": {
  "tc": "./dist/cli.js"
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

## **💻 How It Works (Technical)**

- **Parses time units using `ms` module**
- **Replaces time expressions with seconds**
- **Uses `eval()`** to calculate final value
- **Formats output** using `Intl.NumberFormat`
- **Returns JSON** to Alfred (`Script Filter`)

---

## **🛠 Development**

To build the project:

```sh
npm run build
```

To run tests:

```sh
npm test
```

To generate TypeScript declaration files:

```sh
npm run postbuild
```

---

## **👨‍💻 Author**

- **Created by:** [Shura Vlasov](https://github.com/shura-v)
- **GitHub:** [github.com/shura-v/alfred-time-calculator](https://github.com/shura-v/alfred-time-calculator)

🚀 **Now you can calculate time expressions in Alfred, terminal, and Node.js!**
