import ms from "ms";

const formatSeconds = (num) => {
    return new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 3,
    }).format(num);
};

function humanizeDuration(seconds) {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return [
        d > 0 ? `${d} day${d > 1 ? "s" : ""}` : "",
        h > 0 ? `${h} hour${h > 1 ? "s" : ""}` : "",
        m > 0 ? `${m} minute${m > 1 ? "s" : ""}` : "",
        s !== 0 ? `${formatSeconds(s)} second${s > 1 ? "s" : ""}` : "",
    ].filter(Boolean).join(", ");
}

function calculate(value) {
    const expression = value.replace(/(\d+\.?\d*[a-zA-Z]+)/g, (match) => {
        const milliseconds = ms(match.trim());
        return isNaN(milliseconds) ? match : milliseconds / 1000;
    });

    try {
        const totalSeconds = eval(expression);
        return humanizeDuration(totalSeconds);
    } catch (e) {
        return null;
    }
}

function run(query) {
    query = query.trim();
    const result = calculate(query);

    return JSON.stringify({
        items: result === null
            ? [{ title: "Invalid input", subtitle: `Try something like "1h + 30m"` }]
            : [{ title: result, subtitle: "Press Enter to copy", arg: result }]
    });
}
