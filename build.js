import {build} from 'esbuild';

build({
	entryPoints: ["index.ts", "cli.ts"],
	target: "node16",
	platform: 'node',
	format: "esm",
	bundle: true,
	tsconfig: "./tsconfig.json",
	outdir: 'dist'
}).catch(console.error);
