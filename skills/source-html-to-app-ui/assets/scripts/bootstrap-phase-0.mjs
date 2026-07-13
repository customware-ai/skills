#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
		resolve(skillRoot, 'assets/scripts/promote-phase-0.mjs'),
		resolve(workflowRoot, 'scripts/promote-phase-0.mjs')
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

const receipt = {
	phase: 'phase-0-source-contract',
	createdAt: new Date().toISOString(),
	targetRoot,
	skillRoot,
	priorWorkflowExisted,
	inputs: {
		sourceHtml,
		designJson
	},
	copied: copied.map((item) => ({
		...item,
		source: relative(targetRoot, item.source),
		target: relative(targetRoot, item.target)
	})),
	nextAction:
		'Run the initial source capture through task-workflow/scripts/playwright-lifecycle.mjs before reading any other reference or implementation file.'
};
writeFileSync(resolve(workflowRoot, 'phase-0-entry-receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`);

console.log(JSON.stringify(receipt, null, 2));
console.log('\nMANDATORY NEXT ACTION — do not read another reference or implementation file first:');
console.log(
	'node task-workflow/scripts/playwright-lifecycle.mjs --server "python3 -m http.server 43991 --directory task-workflow/source-input" --ready-url "http://127.0.0.1:43991/approved.html" --runtime-dir "task-workflow/runtime/source" --env "SOURCE_URL=http://127.0.0.1:43991/approved.html" --run "node task-workflow/source-playwright/initial-source-capture.mjs" --ready-timeout-ms 15000 --command-timeout-ms 20000'
);
