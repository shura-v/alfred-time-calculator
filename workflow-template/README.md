### 🕒 **Time Calculator – Alfred Workflow**

This Alfred Workflow allows you to **quickly calculate time expressions** like `1h + 30m` and get **human-readable results**.

---

## 🚀 Installation

1. [Download the Workflow](https://github.com/shura-v/alfred-time-calculator/releases/latest/download/time-calculator.alfredworkflow)
2. Open **Alfred → Preferences → Workflows**
3. Drag & drop the downloaded file into the list of workflows
4. Use the keyword `tc` in Alfred:
    - Example: `tc 2h + 45m`
    - Output: `"2 hours, 45 minutes"`

---

## ⚙️ Features

- Understands expressions like:  
  `1h + 30m - 5s / 2`, `2d * 3`, `1h / 2`
- Supports:  
  days (`d`), hours (`h`), minutes (`m`), seconds (`s`), milliseconds (`ms`)
- Human-readable output:  
  `"1 hour, 30 minutes"`
- Natural language input:
    - `tc in 5 days`
    - `tc 3 hours ago`
    - `tc at next friday`
- Supports **weekdays**:  
  `in 5 weekdays`, `3 weekdays ago`
- Works even with ancient or futuristic dates:  
  `tc at Jan 1990`, `tc 30000 years ago`

---

## 💡 Examples

- `tc 1h + 30m` → `"1 hour, 30 minutes"`
- `tc 5m / 2` → `"2 minutes, 30 seconds"`
- `tc in 3 days` → `"Monday, March 25, 2025"`
- `tc at jan 2000` → `"25 years ago"`
- `tc 2 weekdays ago` → `"Thursday, March 20, 2025"`

---

## 🙌 Tip

Try typing:
- `tc at next monday`
- `tc 1h * 2`
- `tc 3 days ago`

The result will be displayed directly in Alfred.

---

> 💬 Want CLI or Node.js version?  
> Check out the full repo: [github.com/shura-v/alfred-time-calculator](https://github.com/shura-v/alfred-time-calculator)
