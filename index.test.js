import t from "assert";
import { run } from './index.js'


const cases = [
    ['1h + 30m', '1 hour, 30 minutes'],
    ['20d * 2', '40 days'],
    ['5m / 2', '2 minutes, 30 seconds'],
    ['1h - 5s', '59 minutes, 55 seconds'],
    ['300ms * 4', '1.2 seconds'],
];

function fromJSON(str) {
    return JSON.parse(str);
}

for (const [input, output] of cases) {
    const result = fromJSON(run([input])).items;
    t.deepStrictEqual(result, [{title: output, subtitle: 'Press Enter to copy', arg: output}]);
}

const [item] = fromJSON(run(["1test"])).items;
t.equal(item.title, 'Invalid input');
