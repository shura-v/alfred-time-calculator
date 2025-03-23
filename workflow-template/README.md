### 🕒 **Time Calculator – Alfred Workflow**

This Alfred Workflow allows you to **quickly calculate time expressions** like `1h + 30m` and get **human-readable results**.

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

> ⚠️ **Notes**:  
> – Avoid using only a year (like `tc at 2020`) — use a full date or add a month (e.g. `tc at jan 2020`)  
> – Dates like `"tc at last sunday"` assume noon (12:00) by default if no time is specified  
> – `weekday(s)` means **working days from Monday to Friday**, **public holidays are not taken into account**, as they vary by country

---

## 🔁 Interval mode (`from ... to` / `until`)

You can calculate the **duration between two dates or times** using natural language:

- `tc from monday to friday` → `"4 days"`
- `tc from 10:00 to 12:30` → `"2 hours, 30 minutes"`
- `tc from yesterday to next monday` → `"5 days"`
- `tc from last sunday to next sunday` → `"14 days"`

> ℹ️ This returns the **absolute duration** between the two points in time — no `"in"` or `"ago"`.

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
