#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, resolve } from 'node:path';

function fail(message) {
	console.error(`PHASE 0 READBACK: FAIL\n${message}`);
	process.exit(1);
}

function sha256(path) {
	return createHash('sha256').update(readFileSync(path)).digest('hex');
}

const requestedArgument = process.argv[2];
if (process.argv.length !== 3 || !requestedArgument) {
	fail('Usage: node task-workflow/scripts/record-phase-0-readback.mjs <exact-basename>');
}

const root = process.cwd();
const workflow = resolve(root, 'task-workflow');
const markerPath = resolve(workflow, 'CURRENT_PHASE.txt');
const planPath = resolve(workflow, 'phase-1-entry-plan.json');
const receiptPath = resolve(workflow, 'phase-0-readback-receipt.json');
const order = ['phase-0-source-contract.md', 'open-gaps.md', 'progress.md'];
const chunkSize = 40;

if (!existsSync(markerPath) || readFileSync(markerPath, 'utf8').trim() !== 'phase-0-source-contract') {
	fail('CURRENT_PHASE.txt must still be phase-0-source-contract.');
}
if (!existsSync(planPath)) {
	fail('phase-1-entry-plan.json must exist before final readbacks begin.');
}

const requested = basename(requestedArgument);
if (requested !== requestedArgument) {
	fail('Pass only the exact basename printed by the closeout plan.');
}

let receipt = {
	phase: 'phase-0-source-contract',
	planSha256: sha256(planPath),
	reads: [],
	inProgress: null
};
if (existsSync(receiptPath)) {
	try {
		receipt = JSON.parse(readFileSync(receiptPath, 'utf8'));
	} catch (error) {
		fail(`Invalid existing readback receipt: ${error.message}`);
	}
}

if (receipt.phase !== 'phase-0-source-contract' || receipt.planSha256 !== sha256(planPath) || !Array.isArray(receipt.reads)) {
	fail('The existing readback receipt is stale or not bound to the current entry plan.');
}

const expected = receipt.inProgress?.file ?? order[receipt.reads.length];
if (!expected) {
	fail('All three Phase 0 readbacks are already recorded. Run the promotion gate next.');
}
if (requested !== expected) {
	fail(`The next managed readback command must target ${expected}.`);
}

const path = resolve(workflow, requested);
if (!existsSync(path)) {
	fail(`Missing readback file: task-workflow/${requested}`);
}
const contents = readFileSync(path, 'utf8');
const hash = createHash('sha256').update(contents).digest('hex');
const lines = contents.endsWith('\n') ? contents.slice(0, -1).split('\n') : contents.split('\n');
const start = receipt.inProgress?.nextLine ?? 1;
if (receipt.inProgress && receipt.inProgress.sha256 !== hash) {
	fail(`${requested} changed during its managed readback. Restart from a clean run.`);
}
if (start < 1 || start > lines.length) {
	fail(`Invalid managed read cursor for ${requested}.`);
}

const end = Math.min(start + chunkSize - 1, lines.length);
console.log(`PHASE 0 MANAGED READBACK: task-workflow/${requested} lines ${start}-${end} of ${lines.length}`);
for (let line = start; line <= end; line += 1) {
	console.log(`${line}: ${lines[line - 1]}`);
}

if (end < lines.length) {
	receipt.inProgress = { file: requested, sha256: hash, nextLine: end + 1, totalLines: lines.length };
	writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
	console.log(`READBACK CONTINUES: ${requested} is not at EOF.`);
	console.log(`MANDATORY NEXT ACTION: rerun node task-workflow/scripts/record-phase-0-readback.mjs ${requested}`);
	process.exit(0);
}

receipt.reads.push({
	file: requested,
	sha256: hash,
	lineCount: lines.length,
	chunks: Math.ceil(lines.length / chunkSize),
	recordedAt: new Date().toISOString()
});
receipt.inProgress = null;
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);

console.log(`PHASE 0 READBACK: PASS (${requested}, ${lines.length} lines, EOF)`);
const next = order[receipt.reads.length];
if (next) {
	console.log(`MANDATORY NEXT ACTION: run node task-workflow/scripts/record-phase-0-readback.mjs ${next}`);
} else {
	console.log('MANDATORY NEXT ACTION: run node task-workflow/scripts/promote-phase-0.mjs exactly once. The promotion gate will verify all three recorded hashes.');
}
