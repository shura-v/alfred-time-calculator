import test from 'ava';
import { testRun } from './index.js'


const cases = [
    ['1h + 30m', '1 hour, 30 minutes'],
    ['20d * 2', '40 days'],
    ['5m / 2', '2 minutes, 30 seconds'],
    ['1h - 5s', '59 minutes, 55 seconds'],
    ['300ms * 4', '1.2 seconds'],
];

for (const [input, output] of cases) {
    test(`success: ${input} → ${output}`, async t => {
        const result = JSON.parse(testRun(input)).items;
        t.deepEqual(result, [{title: output, subtitle: 'Press Enter to copy', arg: output}]);
    });
}

test('error', async t => {
    const [item] = JSON.parse(testRun("1test")).items;
    t.is(item.title, 'Invalid input');
});
