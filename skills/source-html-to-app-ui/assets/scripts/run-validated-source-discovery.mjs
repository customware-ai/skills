#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

function fail(message) {
	console.error(`VALIDATED SOURCE RUN: FAIL\n${message}`);
	process.exit(1);
}

const root = process.cwd();
const arg = process.argv[2];
if (!arg || process.argv.length !== 3) {
	fail('Usage: node task-workflow/scripts/run-validated-source-discovery.mjs <custom-source-script.mjs>');
}
const script = resolve(root, arg);
const relativeScript = relative(root, script);
const validationPath = resolve(root, 'task-workflow/source/discovery/script-validation.json');
if (!existsSync(script) || !existsSync(validationPath)) {
	fail('The custom script and its validation receipt must exist.');
}
const validation = JSON.parse(readFileSync(validationPath, 'utf8'));
const hash = createHash('sha256').update(readFileSync(script)).digest('hex');
if (!validation.scripts?.some((item) => item.path === relativeScript && item.sha256 === hash)) {
	fail('The custom script changed after validation. Re-run validate-source-discovery.mjs.');
}

const lifecycle = resolve(root, 'task-workflow/scripts/playwright-lifecycle.mjs');
const lockPath = resolve(root, 'task-workflow/runtime/source/validated-discovery.lock');
mkdirSync(resolve(root, 'task-workflow/runtime/source'), { recursive: true });
let lock;
try {
	lock = openSync(lockPath, 'wx');
} catch {
	fail('Another validated source discovery run owns the lifecycle. Run scripts sequentially, never in parallel.');
}
try {
	const result = spawnSync(
		process.execPath,
		[
			lifecycle,
			'--server',
			'python3 -m http.server 43992 --directory task-workflow/source-input',
			'--ready-url',
			'http://127.0.0.1:43992/approved.html',
			'--runtime-dir',
			'task-workflow/runtime/source',
			'--env',
			'SOURCE_URL=http://127.0.0.1:43992/approved.html',
			'--run',
			`node ${relativeScript}`,
			'--ready-timeout-ms',
			'15000',
			'--command-timeout-ms',
			'20000'
		],
		{ cwd: root, stdio: 'inherit', env: process.env }
	);
	if (result.status !== 0) {
		process.exitCode = result.status ?? 1;
	} else {
		const receipt = {
			script: relativeScript,
			sha256: hash,
			readyTimeoutMs: 15000,
			commandTimeoutMs: 20000,
			completedAt: new Date().toISOString(),
			status: 'Pass'
		};
		const receiptsPath = resolve(root, 'task-workflow/source/discovery/lifecycle-run-receipts.json');
		const receipts = existsSync(receiptsPath) ? JSON.parse(readFileSync(receiptsPath, 'utf8')) : [];
		const retained = receipts.filter((item) => item.script !== relativeScript);
		retained.push(receipt);
		writeFileSync(receiptsPath, `${JSON.stringify(retained, null, 2)}\n`);
		console.log(JSON.stringify(receipt, null, 2));
		console.log('VALIDATED SOURCE RUN: PASS');
	}
} finally {
	closeSync(lock);
	unlinkSync(lockPath);
}
