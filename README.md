### 🕒 **Time Calculator Workflow for Alfred**

This Alfred workflow allows you to **convert time expressions** like `"1h + 30m"` into **human-readable durations**.

---

## **⚡ Features**
- Convert expressions like `1h + 30m - 5s / 2`
- Supports **days, hours, minutes, seconds, and milliseconds**
- Uses `eval()` to allow advanced calculations
- Returns **formatted duration** in natural language (`1 hour, 30 minutes`)
- Works with **Alfred's Script Filter** (`Keyword: tc`)

---

## **🚀 How to Use**
1. **Trigger Alfred** (`⌘ Space`)
2. **Type:** `tc 2h + 45m - 10s`
3. **Result:** `"2 hours, 44 minutes, 50 seconds"`
4. **Press Enter** → **Copies result to clipboard**

---

## **🛠 Supported Time Units**
| Unit | Example | Converted Value |
|------|--------|----------------|
| Days | `2d` | `172800 seconds` |
| Hours | `3h` | `10800 seconds` |
| Minutes | `30m` | `1800 seconds` |
| Seconds | `45s` | `45 seconds` |
| Milliseconds | `500ms` | `0.5 seconds` |

- Expressions can be **combined** (`1h + 30m - 5s / 2`)
- Works with **multiplication and division** (`2d * 3`, `1h / 2`)

---

## **🛠 Installation & Setup**
1. **Download the Workflow** (`Time Calculator.alfredworkflow`)
2. Open it in **Alfred Preferences → Workflows**
3. Set the **keyword** to `"tc"` (already pre-configured)
4. You're ready to go! 🚀

---

## **💻 How It Works (Technical)**
- **Parses time units using `ms` module**
- **Replaces time expressions with seconds**
- **Uses `eval()`** to calculate final value
- **Formats output** using `Intl.NumberFormat`
- **Returns JSON** to Alfred (`Script Filter`)

---

## **⚡ Example Queries & Outputs**
| Input | Output                     |
|-------|----------------------------|
| `tc 1h + 30m` | `"1 hour, 30 minutes"`     |
| `tc 20d * 2` | `"40 days"`                |
| `tc 5m / 2` | `"2 minutes, 30 seconds"`  |
| `tc 1h - 5s` | `"59 minutes, 55 seconds"` |
| `tc 300ms * 4` | `"1.2 seconds"`            |

---

## **👨‍💻 Author & Support**
- **Created by:** Shura Vlasov
- **GitHub:** *https://github.com/shura-v*

🚀 **Enjoy faster time calculations in Alfred!**
