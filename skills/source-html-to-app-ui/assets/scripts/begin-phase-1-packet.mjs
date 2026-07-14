#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, readlinkSync, writeFileSync } from 'node:fs';
import { relative, resolve } from 'node:path';

function fail(message) {
	console.error(`PHASE 1 FIRST-PACKET GATE: FAIL\n${message}`);
	process.exit(1);
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

function replaceRequired(text, before, after, label) {
	if (!text.includes(before)) {
		fail(`Cannot update ${label}; expected template row is missing.`);
	}
	return text.replace(before, after);
}

function markdownCell(value) {
	return value.replaceAll('|', '\\|').replaceAll('\n', ' ').trim();
}

function replaceLabeledTableRow(markdown, label, replacement) {
	const lines = markdown.split('\n');
	const index = lines.findIndex((line) => line.startsWith(`| ${label} |`));
	if (index < 0) {
		fail(`progress.md is missing required row: ${label}`);
	}
	lines[index] = replacement;
	return lines.join('\n');
}

function replaceCurrentPacketRow(markdown, replacement) {
	const lines = markdown.split('\n');
	const heading = lines.findIndex((line) => line === '## Current Work Packet');
	if (heading < 0 || !lines[heading + 4]?.startsWith('|')) {
		fail('progress.md is missing the Current Work Packet data row.');
	}
	lines[heading + 4] = replacement;
	return lines.join('\n');
}

if (process.argv.length !== 2) {
	fail('Usage: node task-workflow/scripts/begin-phase-1-packet.mjs');
}
const root = process.cwd();
const workflow = resolve(root, 'task-workflow');
const markerPath = resolve(workflow, 'CURRENT_PHASE.txt');
const phase0ReceiptPath = resolve(workflow, 'phase-0-promotion-receipt.json');
const baselinePath = resolve(workflow, 'phase-1-target-baseline.json');
const phase1ArtifactPath = resolve(workflow, 'phase-1-ui-implementation.md');
const progressPath = resolve(workflow, 'progress.md');
const planPath = resolve(workflow, 'phase-1-entry-plan.json');
const receiptPath = resolve(workflow, 'phase-1-first-packet-receipt.json');

for (const path of [markerPath, phase0ReceiptPath, baselinePath, phase1ArtifactPath, progressPath, planPath]) {
	if (!existsSync(path)) {
		fail(`Missing required Phase 1 entry artifact: ${relative(root, path)}`);
	}
}
if (readFileSync(markerPath, 'utf8').trim() !== 'phase-1-ui-implementation') {
	fail('CURRENT_PHASE.txt must equal phase-1-ui-implementation.');
}
const phase0Receipt = JSON.parse(readFileSync(phase0ReceiptPath, 'utf8'));
if (phase0Receipt.phase !== 'phase-0-source-contract' || phase0Receipt.decision !== 'Pass') {
	fail('Phase 0 promotion receipt is not a passing source contract.');
}
if (existsSync(receiptPath)) {
	fail('The first packet is already permitted. Use the existing receipt; do not overwrite entry evidence.');
}

const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const current = targetSnapshot(root);
if (JSON.stringify(current) !== JSON.stringify(baseline)) {
	fail('Target files or directories changed before the Phase 1 first-packet permit. Clean-reset the run.');
}
const plan = JSON.parse(readFileSync(planPath, 'utf8'));
const contracts = plan.contracts;
const files = plan.files;
if (plan.phase !== 'phase-0-source-contract' || plan.packet !== 1 || plan.status !== 'Prepared') {
	fail('phase-1-entry-plan.json is not a prepared Phase 0 packet-1 handoff.');
}
if (plan.targetBaselineSha256 !== createHash('sha256').update(JSON.stringify(baseline)).digest('hex')) {
	fail('phase-1-entry-plan.json is not bound to the current unchanged target baseline.');
}
if (!Array.isArray(contracts) || !Array.isArray(plan.evidence) || !Array.isArray(files) || !plan.outcome?.trim()) {
	fail('phase-1-entry-plan.json is incomplete.');
}
if (contracts.length === 0 || !contracts.some((value) => /(?:theme|token|typography|primitive)/i.test(value))) {
	fail('The first packet must own the ordered token, typography, theme, or shared-primitive layer.');
}
if (files.length === 0) {
	fail('The first packet must name at least one intended target file.');
}
for (const file of files) {
	if (
		file.startsWith('/') ||
		file.startsWith('task-workflow/') ||
		file.startsWith('.agents/') ||
		file.includes('..')
	) {
		fail(`Invalid target file in --files: ${file}`);
	}
}

const receipt = {
	phase: 'phase-1-ui-implementation',
	packet: 1,
	status: 'Permitted',
	permittedAt: new Date().toISOString(),
	contracts,
	evidence: plan.evidence,
	files,
	outcome: plan.outcome,
	entryPlanSha256: sha256(planPath),
	targetBaselineSha256: createHash('sha256').update(JSON.stringify(baseline)).digest('hex'),
	nextAction: 'Implement only the permitted target files, then read back every changed file and inspect the packet diff before recording packet completion.'
};
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);

let phase1 = readFileSync(phase1ArtifactPath, 'utf8');
phase1 = replaceRequired(
	phase1,
	'| Marker set to `phase-1-ui-implementation` before implementation | Fail | Pending |',
	'| Marker set to `phase-1-ui-implementation` before implementation | Pass | `phase-0-promotion-receipt.json` set the marker before this permit |',
	'Phase 1 marker row'
);
phase1 = replaceRequired(
	phase1,
	'| Main skill and Phase 1 reference reread after marker | Fail | Pending |',
	'| Main skill and Phase 1 reference reread after marker | Pass | First-packet permit invoked only after the mandatory Phase 1 reference-read boundary |',
	'Phase 1 reference row'
);
phase1 = replaceRequired(
	phase1,
	'| Phase 0 says `Pass` and scores at least `48/50` | Fail | Pending |',
	'| Phase 0 says `Pass` and scores at least `48/50` | Pass | `phase-0-promotion-receipt.json`: `decision: Pass` |',
	'Phase 0 gate row'
);
phase1 = replaceRequired(
	phase1,
	'| Reproduction contract and source evidence are current | Fail | Pending |',
	'| Reproduction contract and source evidence are current | Pass | Bound to the passing Phase 0 promotion receipt and unchanged target baseline |',
	'reproduction-contract row'
);
phase1 = replaceRequired(
	phase1,
	'| First work packet recorded before write | Fail | Pending |',
	'| First work packet recorded before write | Pass | `phase-1-first-packet-receipt.json` written while target matched the Phase 0 baseline |',
	'first-packet row'
);
phase1 = replaceRequired(
	phase1,
	'| Pending | Pending | Pending | Pending | Pending | Pending | Pending |',
	`| 1 | ${markdownCell(contracts.join(', '))}; ${markdownCell(plan.evidence.join(', '))} | ${markdownCell(files.join(', '))} | ${markdownCell(plan.outcome)} | Not written yet | Pending mandatory readback and diff | Implement only permitted files; then read back and inspect diff |`,
	'first work-packet ledger row'
);
writeFileSync(phase1ArtifactPath, phase1);

let progress = readFileSync(progressPath, 'utf8');
progress = replaceLabeledTableRow(progress, 'Current phase marker', '| Current phase marker | phase-1-ui-implementation |');
progress = replaceLabeledTableRow(
	progress,
	'Sole next local action',
	`| Sole next local action | Implement only packet 1 files: ${markdownCell(files.join(', '))}; then read back and inspect diff |`,
);
progress = replaceLabeledTableRow(progress, 'Earliest failing phase', '| Earliest failing phase | Phase 1 implementation active |');
progress = replaceLabeledTableRow(progress, 'Last updated', `| Last updated | ${receipt.permittedAt} |`);
progress = replaceLabeledTableRow(
	progress,
	'1',
	'| 1 | `phase-1-ui-implementation` - Active | `phase-1-ui-implementation.md` | `phase-1-ui-implementation.md` | first-packet permit passed; final gate requires at least `48/50` plus critical pass |'
);
progress = replaceCurrentPacketRow(
	progress,
	`| Phase 1 | ${markdownCell(contracts.join(', '))} | ${markdownCell(files.join(', '))} | Permit: \`phase-1-first-packet-receipt.json\` | Implement, read back, and inspect packet diff |`,
);
writeFileSync(progressPath, progress);

console.log(JSON.stringify(receipt, null, 2));
console.log('\nPHASE 1 FIRST-PACKET GATE: PASS');
console.log('MANDATORY NEXT ACTION: implement only the permitted target files, then read back each file and inspect the packet diff.');
