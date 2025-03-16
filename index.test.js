import test from 'ava';
import alfyTest from 'alfy-test';

const subtitle = 'Press Enter to copy';

const cases = [
	['1h + 30m', '1 hour, 30 minutes'],
	['20d * 2', '40 days'],
	['5m / 2', '2 minutes, 30 seconds'],
	['1h - 5s', '59 minutes, 55 seconds'],
	['300ms * 4', '1.2 seconds'],
];

test('correct', async t => {
	const alfy = alfyTest();

	for await (const [input, output] of cases) {
		const result = await alfy(input);
		t.deepEqual(result, [{title: output, subtitle, arg: output}]);
	}
});

test('error', async t => {
	const alfy = alfyTest();

	const [item] = await alfy('1test');
	t.is(item.title, 'Invalid input');
});
