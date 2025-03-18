import ms from 'ms';

const formatSeconds = x => new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
}).format(x);

function humanizeDuration(seconds) {
    if (Number.isNaN(seconds)) {
        throw new TypeError('second argument must be a number');
    }

    const d = Math.floor(seconds / 86_400);
    const h = Math.floor((seconds % 86_400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return [
        d > 0 ? `${d} day${d > 1 ? 's' : ''}` : '',
        h > 0 ? `${h} hour${h > 1 ? 's' : ''}` : '',
        m > 0 ? `${m} minute${m > 1 ? 's' : ''}` : '',
        s === 0 ? '' : `${formatSeconds(s)} second${s > 1 ? 's' : ''}`,
    ].filter(Boolean).join(', ');
}

function calculate(value) {
    const expression = value.replaceAll(/(\d+\.?\d*[a-zA-Z]+)/g, match => {
        const milliseconds = ms(match.trim());
        return Number.isNaN(milliseconds) ? match : milliseconds / 1000;
    });

    try {
        const totalSeconds = eval(expression);
        return humanizeDuration(totalSeconds);
    } catch {
        return null;
    }
}

export function getOutput(query) {
    const result = calculate(query);
    return {
        items: result === null
            ? [{title: 'Invalid input', subtitle: 'Try something like "1h + 30m"'}]
            : [{title: result, subtitle: 'Press Enter to copy', arg: result}]
    };
}

function run() {
    const query = '{query}';
    return JSON.stringify(getOutput(query));
}
