#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, readlinkSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

function fail(message) {
	console.error(`PHASE 1 ENTRY PLAN: FAIL\n${message}`);
	process.exit(1);
}

function parseArgs(argv) {
	const args = {};
	for (let index = 0; index < argv.length; index += 2) {
		const key = argv[index];
		const value = argv[index + 1];
		if (!['--contracts', '--evidence', '--files', '--outcome'].includes(key) || !value) {
			fail(
				'Usage: node task-workflow/scripts/prepare-phase-1-packet.mjs --contracts "<comma-separated contract IDs>" --evidence "<comma-separated existing task-workflow/source/... evidence paths only>" --files "<comma-separated existing target files>" --outcome "<exact UI-only acceptance outcome>"'
			);
		}
		args[key.slice(2)] = value;
	}
	for (const required of ['contracts', 'evidence', 'files', 'outcome']) {
		if (!args[required]?.trim()) {
			fail(`Missing --${required}.`);
		}
	}
	return args;
}

function sha256(path) {
	return createHash('sha256').update(readFileSync(path)).digest('hex');
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

function splitList(value) {
	return value.split(',').map((item) => item.trim()).filter(Boolean);
}

function validateTargetPath(path) {
	if (path.startsWith('/') || path.startsWith('task-workflow/') || path.startsWith('.agents/') || path.includes('..')) {
		fail(`Invalid target file: ${path}`);
	}
}

const args = parseArgs(process.argv.slice(2));
const root = process.cwd();
const workflow = resolve(root, 'task-workflow');
const markerPath = resolve(workflow, 'CURRENT_PHASE.txt');
const baselinePath = resolve(workflow, 'phase-0-target-baseline.json');
const artifactPath = resolve(workflow, 'phase-0-source-contract.md');
const ownerInventoryPath = resolve(workflow, 'phase-1-owner-candidates.json');
const planPath = resolve(workflow, 'phase-1-entry-plan.json');

for (const path of [markerPath, baselinePath, artifactPath, ownerInventoryPath]) {
	if (!existsSync(path)) {
		fail(`Missing required Phase 0 artifact: ${relative(root, path)}`);
	}
}
if (readFileSync(markerPath, 'utf8').trim() !== 'phase-0-source-contract') {
	fail('Prepare the first packet while CURRENT_PHASE.txt is still phase-0-source-contract.');
}
if (existsSync(planPath)) {
	fail('phase-1-entry-plan.json already exists. Inspect and use it; do not overwrite the handoff.');
}

const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const ownerInventory = JSON.parse(readFileSync(ownerInventoryPath, 'utf8'));
const current = targetSnapshot(root);
if (JSON.stringify(current) !== JSON.stringify(baseline)) {
	fail('Target files or directories changed before the Phase 1 entry plan. Clean-reset the run.');
}
if (ownerInventory.phase !== 'phase-0-source-contract' || ownerInventory.targetBaselineSha256 !== createHash('sha256').update(readFileSync(baselinePath)).digest('hex')) {
	fail('phase-1-owner-candidates.json is stale or is not bound to the current Phase 0 target baseline.');
}

const contracts = splitList(args.contracts);
const evidence = splitList(args.evidence);
const files = splitList(args.files);
const candidatesByPath = new Map(ownerInventory.candidates?.map((candidate) => [candidate.path, candidate]) ?? []);
const packetOneCategories = new Set(['styles-and-tokens', 'shared-primitives', 'ui-config']);
if (!contracts.some((value) => /(?:theme|token|typography|primitive)/i.test(value))) {
	fail('Packet 1 must own the ordered token, typography, theme, or shared-primitive layer.');
}
if (evidence.length === 0 || evidence.some((path) => !path.startsWith('task-workflow/source/') || !existsSync(resolve(root, path)))) {
	fail(
		'Every --evidence value must be an existing captured evidence path beginning literally with task-workflow/source/. Use the discovery manifest and relevant inspection images. Never pass task-workflow/spec.json, task-workflow/source-input/approved.html, a target file, or another non-evidence input.'
	);
}
if (files.length === 0) {
	fail('Packet 1 must name at least one exact target file.');
}
for (const file of files) {
	validateTargetPath(file);
	const candidate = candidatesByPath.get(file);
	if (!candidate) {
		fail(`Every --files value must come exactly from phase-1-owner-candidates.json candidates[].path: ${file}`);
	}
	if (!packetOneCategories.has(candidate.category)) {
		fail(`Packet 1 may own only styles-and-tokens, shared-primitives, or ui-config candidates. Defer ${candidate.category} owner ${file} to a later packet.`);
	}
	if (!existsSync(resolve(root, file))) {
		fail(`Packet 1 must begin with existing target owners inspected read-only in Phase 0: ${file}`);
	}
}
if (/\b(?:layout|navigation|page|route|shell)\b/i.test(args.outcome)) {
	fail('Packet 1 outcome must be limited to tokens, theme, typography, and shared primitives. Route, page, shell, layout, and navigation work belongs to later packets.');
}

const plan = {
	phase: 'phase-0-source-contract',
	packet: 1,
	status: 'Prepared',
	preparedAt: new Date().toISOString(),
	contracts,
	evidence,
	files,
	outcome: args.outcome.trim(),
	targetBaselineSha256: createHash('sha256').update(JSON.stringify(baseline)).digest('hex'),
	ownerInventoryPath: 'task-workflow/phase-1-owner-candidates.json',
	ownerInventorySha256: sha256(ownerInventoryPath),
	phase0CloseoutSequence: [
		'Read task-workflow/phase-0-source-contract.md.',
		'Read task-workflow/open-gaps.md.',
		'Read task-workflow/progress.md.',
		'Complete every Phase 0 artifact row, score, decision, and promotion-lock field with concrete evidence.',
		'Reconcile task-workflow/open-gaps.md so no placeholder or ordinary open discovery gap remains.',
		'Update task-workflow/progress.md with the completed Phase 0 gate and exact next action.',
		'Run node task-workflow/scripts/record-phase-0-readback.mjs phase-0-source-contract.md repeatedly. It emits bounded numbered chunks; rerun only the exact command it prints until it reports EOF and names the next file.',
		'Run node task-workflow/scripts/record-phase-0-readback.mjs open-gaps.md repeatedly. It emits bounded numbered chunks; rerun only the exact command it prints until it reports EOF and names the next file.',
		'Run node task-workflow/scripts/record-phase-0-readback.mjs progress.md repeatedly. It emits bounded numbered chunks; rerun only the exact command it prints until it reports EOF and names promotion.',
		'Only then run node task-workflow/scripts/promote-phase-0.mjs exactly once.'
	]
};
writeFileSync(planPath, `${JSON.stringify(plan, null, 2)}\n`);

console.log(JSON.stringify(plan, null, 2));
console.log('\nPHASE 1 ENTRY PLAN: PASS');
console.log('MANDATORY PHASE 0 CLOSEOUT — execute every action separately and in this exact order:');
console.log('1. Read task-workflow/phase-1-entry-plan.json.');
for (const [index, action] of plan.phase0CloseoutSequence.entries()) {
	console.log(`${index + 2}. ${action}`);
}
console.log('Promotion is a final audit. Calling it before all preceding reads and writes is a failed run, even when it rejects the attempt.');
