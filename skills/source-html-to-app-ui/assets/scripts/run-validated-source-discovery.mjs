#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { closeSync, existsSync, mkdirSync, openSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';
import { createServer } from 'node:net';

function fail(message) {
	console.error(`VALIDATED SOURCE RUN: FAIL\n${message}`);
	process.exit(1);
}

async function getFreeLoopbackPort() {
	return await new Promise((resolvePort, reject) => {
		const server = createServer();
		server.once('error', reject);
		server.listen(0, '127.0.0.1', () => {
			const address = server.address();
			if (!address || typeof address === 'string') {
				server.close(() => reject(new Error('Unable to allocate a loopback port.')));
				return;
			}
			const port = address.port;
			server.close((error) => (error ? reject(error) : resolvePort(port)));
		});
	});
}

const root = process.cwd();
const arg = process.argv[2];
const mode = process.argv[3] === '--mode' ? process.argv[4] : null;
const allowedModes = new Set(['pages-desktop', 'pages-mobile', 'states-desktop', 'states-mobile', 'shell']);
if (!arg || process.argv.length !== 5 || !allowedModes.has(mode)) {
	fail(
		'Usage: node task-workflow/scripts/run-validated-source-discovery.mjs <source-script.mjs> --mode <pages-desktop|pages-mobile|states-desktop|states-mobile|shell>'
	);
}
const script = resolve(root, arg);
const relativeScript = relative(root, script);
const validationPath = resolve(root, 'task-workflow/source/discovery/script-validation.json');
const inventoryPath = resolve(root, 'task-workflow/source/discovery/source-inventory.json');
if (!existsSync(script) || !existsSync(validationPath)) {
	fail('The supplied source script and its validation receipt must exist.');
}
const validation = JSON.parse(readFileSync(validationPath, 'utf8'));
const hash = createHash('sha256').update(readFileSync(script)).digest('hex');
if (!validation.scripts?.some((item) => item.path === relativeScript && item.sha256 === hash)) {
	fail('The supplied source script changed after validation. Clean-reset Phase 0.');
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
	const inventory = JSON.parse(readFileSync(inventoryPath, 'utf8'));
	const candidates = mode.startsWith('pages-') ? inventory.pages : mode.startsWith('states-') ? inventory.states : [mode];
	const batchSize = mode.startsWith('pages-') ? 3 : mode.startsWith('states-') ? 8 : 1;
	const batches = [];
	for (let start = 0; start < Math.max(candidates.length, 1); start += batchSize) {
		batches.push({ start, end: Math.min(start + batchSize, candidates.length), final: start + batchSize >= candidates.length });
	}

	const receiptsPath = resolve(root, 'task-workflow/source/discovery/lifecycle-run-receipts.json');
	const priorReceipts = existsSync(receiptsPath) ? JSON.parse(readFileSync(receiptsPath, 'utf8')) : [];
	writeFileSync(
		receiptsPath,
		`${JSON.stringify(priorReceipts.filter((item) => item.script !== relativeScript || item.mode !== mode), null, 2)}\n`
	);
	const manifestPath = resolve(root, 'task-workflow/source/discovery/manifest.json');
	if (existsSync(manifestPath)) {
		const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
		manifest.completedModes = (manifest.completedModes || []).filter((completedMode) => completedMode !== mode);
		const inspectionPrefix = mode.startsWith('pages-')
			? `task-workflow/source/discovery/inspection/pages/${mode.slice('pages-'.length)}/`
			: mode.startsWith('states-')
				? `task-workflow/source/discovery/inspection/states/${mode.slice('states-'.length)}/`
				: 'task-workflow/source/discovery/inspection/shell.png';
		manifest.inspectionImages = (manifest.inspectionImages || []).filter((path) => !path.startsWith(inspectionPrefix));
		manifest.inspectionCoverage = (manifest.inspectionCoverage || []).filter(
			(entry) => !entry.sheet?.startsWith(inspectionPrefix)
		);
		delete manifest.imagesOpened;
		if (mode === 'shell') {
			manifest.shellEvidence = [];
		}
		writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
	}

	let failed = false;
	const ports = [];
	for (let index = 0; index < batches.length; index += 1) {
		const batch = batches[index];
		const port = await getFreeLoopbackPort();
		ports.push(port);
		console.log(`VALIDATED SOURCE RUN: ${mode} batch ${index + 1}/${batches.length} [${batch.start}, ${batch.end})`);
		const result = spawnSync(
			process.execPath,
			[
				lifecycle,
				'--server',
				`python3 -m http.server ${port} --bind 127.0.0.1 --directory task-workflow/source-input`,
				'--ready-url',
				`http://127.0.0.1:${port}/approved.html`,
				'--runtime-dir',
				'task-workflow/runtime/source',
				'--env',
				`SOURCE_URL=http://127.0.0.1:${port}/approved.html`,
				'--env',
				`DISCOVERY_MODE=${mode}`,
				'--env',
				`DISCOVERY_BATCH_START=${batch.start}`,
				'--env',
				`DISCOVERY_BATCH_END=${batch.end}`,
				'--env',
				`DISCOVERY_FINAL_BATCH=${batch.final}`,
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
			failed = true;
			break;
		}
	}
	if (!failed) {
		const receipt = {
			script: relativeScript,
			mode,
			sha256: hash,
			readyTimeoutMs: 15000,
			commandTimeoutMs: 20000,
			candidateCount: candidates.length,
			batches: batches.map(({ start, end }) => ({ start, end })),
			ports,
			completedAt: new Date().toISOString(),
			status: 'Pass'
		};
		const receipts = existsSync(receiptsPath) ? JSON.parse(readFileSync(receiptsPath, 'utf8')) : [];
		const retained = receipts.filter((item) => item.script !== relativeScript || item.mode !== mode);
		retained.push(receipt);
		writeFileSync(receiptsPath, `${JSON.stringify(retained, null, 2)}\n`);
		console.log(JSON.stringify(receipt, null, 2));
		console.log('VALIDATED SOURCE RUN: PASS');
	}
} finally {
	closeSync(lock);
	unlinkSync(lockPath);
}
