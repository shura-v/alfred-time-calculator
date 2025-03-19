import ms, { StringValue } from 'ms';

type TimeCalculatorResult = {
    items: TimeCalculatorResultItem[];
}

type TimeCalculatorResultItem = {
    title: string;
    subtitle: string;
    arg?: string;
}

const formatSeconds = (x: number) => new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 3,
}).format(x);

function humanizeDuration(seconds: number) {
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

export function calculate(value: string): string | null {
    const expression = value.toLowerCase().replaceAll(/(\d+\.?\d*[a-z]+)/g, (match) => {
        const milliseconds = ms(match as StringValue);
        return Number.isNaN(milliseconds) ? match : String(milliseconds / 1000);
    });

    try {
        const totalSeconds = eval(expression);
        return humanizeDuration(totalSeconds);
    } catch {
        return null;
    }
}

const INVALID_ITEMS: TimeCalculatorResultItem[] = [{
    title: 'Invalid input',
    subtitle: 'Try something like "1h + 30m"'
}];

function toJSON(result: TimeCalculatorResult) {
    return JSON.stringify(result);
}

export function run(argv: Array<string>): string {
    const query = argv[0]?.trim();
    if (!query) {
        return toJSON({ items: INVALID_ITEMS });
    }
    const result = calculate(query);
    return toJSON({
        items: result === null
            ? INVALID_ITEMS
            : [{title: result, subtitle: 'Press Enter to copy', arg: result}]
    });
}
