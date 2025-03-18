import {build} from 'esbuild';

build({
	entryPoints: ['index.js'],
	platform: 'node',
	bundle: true,
	outfile: 'main.js',
	banner: {
		js: 'var module = {};',
	},
}).catch(console.error);
