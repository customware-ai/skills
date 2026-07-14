#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, readlinkSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:net';

function parseArgs(argv) {
	const args = {};
	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		if (arg !== '--source-html' && arg !== '--design-json') {
			throw new Error(`Unknown argument: ${arg}`);
		}
		index += 1;
		if (index >= argv.length) {
			throw new Error(`${arg} requires a value`);
		}
		args[arg.slice(2)] = argv[index];
	}
	if (!args['source-html'] || !args['design-json']) {
		throw new Error(
			'Usage: node <skill-root>/assets/scripts/bootstrap-phase-0.mjs --source-html <approved.html> --design-json <approved-design.json>'
		);
	}
	return args;
}

function sha256(path) {
	return createHash('sha256').update(readFileSync(path)).digest('hex');
}

function copyAndProve(source, target) {
	mkdirSync(dirname(target), { recursive: true });
	copyFileSync(source, target);
	const sourceBytes = readFileSync(source);
	const targetBytes = readFileSync(target);
	if (!sourceBytes.equals(targetBytes)) {
		throw new Error(`Byte comparison failed: ${source} -> ${target}`);
	}
	return {
		source,
		target,
		bytes: sourceBytes.length,
		sha256: sha256(target),
		byteIdentical: true
	};
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

const SNAPSHOT_EXCLUDED_ROOTS = new Set(['.agents', '.git', 'node_modules', 'task-workflow']);

function targetSnapshot(root) {
	const directories = [];
	const files = [];
	const links = [];

	function visit(directory, relativeDirectory = '') {
		for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
			const relativePath = relativeDirectory ? `${relativeDirectory}/${entry.name}` : entry.name;
			if (!relativeDirectory && SNAPSHOT_EXCLUDED_ROOTS.has(entry.name)) {
				continue;
			}
			const absolutePath = resolve(directory, entry.name);
			if (entry.isDirectory()) {
				directories.push(relativePath);
				visit(absolutePath, relativePath);
				continue;
			}
			if (entry.isSymbolicLink()) {
				links.push({ path: relativePath, target: readlinkSync(absolutePath) });
				continue;
			}
			if (entry.isFile()) {
				files.push({ path: relativePath, sha256: sha256(absolutePath) });
			}
		}
	}

	visit(root);
	return { directories, files, links };
}

const args = parseArgs(process.argv.slice(2));
const targetRoot = process.cwd();
const scriptPath = fileURLToPath(import.meta.url);
const skillRoot = resolve(dirname(scriptPath), '../..');
const sourceHtml = resolve(targetRoot, args['source-html']);
const designJson = resolve(targetRoot, args['design-json']);
const workflowRoot = resolve(targetRoot, 'task-workflow');

for (const input of [sourceHtml, designJson]) {
	if (!existsSync(input)) {
		throw new Error(`Required input does not exist: ${input}`);
	}
}

const priorWorkflowExisted = existsSync(workflowRoot);
rmSync(workflowRoot, { recursive: true, force: true });

for (const directory of [
	'scripts',
	'source-input',
	'source-playwright',
	'source/desktop',
	'source/mobile',
	'target-playwright',
	'verification',
	'runtime/source',
	'runtime/target'
]) {
	mkdirSync(resolve(workflowRoot, directory), { recursive: true });
}

const copied = [];
for (const name of [
	'phase-0-source-contract.md',
	'phase-1-ui-implementation.md',
	'phase-2-paired-responsive-proof.md',
	'phase-3-fidelity-repair-signoff.md',
	'phase-4-final-audit-completion.md',
	'progress.md',
	'open-gaps.md'
]) {
	copied.push(
		copyAndProve(resolve(skillRoot, 'assets/templates', name), resolve(workflowRoot, name))
	);
}

copied.push(
	copyAndProve(
		resolve(skillRoot, 'assets/scripts/playwright-lifecycle.mjs'),
		resolve(workflowRoot, 'scripts/playwright-lifecycle.mjs')
	)
);
copied.push(
	copyAndProve(
		resolve(skillRoot, 'assets/scripts/initial-source-capture.mjs'),
		resolve(workflowRoot, 'source-playwright/initial-source-capture.mjs')
	)
);
copied.push(
	copyAndProve(
		resolve(skillRoot, 'assets/scripts/inventory-source-discovery.mjs'),
		resolve(workflowRoot, 'source-playwright/inventory-source-discovery.mjs')
	)
);
copied.push(
	copyAndProve(
		resolve(skillRoot, 'assets/scripts/initialize-source-inventory.mjs'),
		resolve(workflowRoot, 'scripts/initialize-source-inventory.mjs')
	)
);
copied.push(
	copyAndProve(
		resolve(skillRoot, 'assets/scripts/finalize-source-inventory.mjs'),
		resolve(workflowRoot, 'scripts/finalize-source-inventory.mjs')
	)
);
copied.push(
	copyAndProve(
		resolve(skillRoot, 'assets/scripts/promote-phase-0.mjs'),
		resolve(workflowRoot, 'scripts/promote-phase-0.mjs')
	)
);
copied.push(
	copyAndProve(
		resolve(skillRoot, 'assets/scripts/begin-phase-1-packet.mjs'),
		resolve(workflowRoot, 'scripts/begin-phase-1-packet.mjs')
	)
);
copied.push(
	copyAndProve(
		resolve(skillRoot, 'assets/scripts/validate-source-discovery.mjs'),
		resolve(workflowRoot, 'scripts/validate-source-discovery.mjs')
	)
);
copied.push(
	copyAndProve(
		resolve(skillRoot, 'assets/scripts/run-validated-source-discovery.mjs'),
		resolve(workflowRoot, 'scripts/run-validated-source-discovery.mjs')
	)
);
copied.push(copyAndProve(designJson, resolve(workflowRoot, 'spec.json')));
copied.push(copyAndProve(sourceHtml, resolve(workflowRoot, 'source-input/approved.html')));

writeFileSync(resolve(workflowRoot, 'CURRENT_PHASE.txt'), 'phase-0-source-contract\n');
const baseline = targetSnapshot(targetRoot);
writeFileSync(resolve(workflowRoot, 'phase-0-target-baseline.json'), `${JSON.stringify(baseline, null, 2)}\n`);
const initialPort = await getFreeLoopbackPort();
const initialLifecycleCommand =
	`node task-workflow/scripts/playwright-lifecycle.mjs --server "python3 -m http.server ${initialPort} --bind 127.0.0.1 --directory task-workflow/source-input" ` +
	`--ready-url "http://127.0.0.1:${initialPort}/approved.html" --runtime-dir "task-workflow/runtime/source" ` +
	`--env "SOURCE_URL=http://127.0.0.1:${initialPort}/approved.html" --run "node task-workflow/source-playwright/initial-source-capture.mjs" ` +
	'--ready-timeout-ms 15000 --command-timeout-ms 20000';

const receipt = {
	phase: 'phase-0-source-contract',
	createdAt: new Date().toISOString(),
	targetRoot,
	skillRoot,
	priorWorkflowExisted,
	targetBaseline: {
		path: 'task-workflow/phase-0-target-baseline.json',
		directories: baseline.directories.length,
		files: baseline.files.length,
		links: baseline.links.length
	},
	inputs: {
		sourceHtml,
		designJson
	},
	copied: copied.map((item) => ({
		...item,
		source: relative(targetRoot, item.source),
		target: relative(targetRoot, item.target)
	})),
	initialLifecycleCommand,
	nextAction:
		'Read this receipt completely, confirm every copied row is byteIdentical, then run the printed initial source lifecycle command without an intervening tool call.'
};
writeFileSync(resolve(workflowRoot, 'phase-0-entry-receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`);

console.log(JSON.stringify(receipt, null, 2));
console.log('\nMANDATORY NEXT ACTION: separately read task-workflow/phase-0-entry-receipt.json in full.');
console.log('Do not insert ls, stat, find, glob, search, wc, or another tool call before that receipt read.');
console.log('After confirming every copied row is byteIdentical, run this exact command as the immediate next action:');
console.log(initialLifecycleCommand);
