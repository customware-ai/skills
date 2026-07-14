#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function fail(message) {
	console.error(`SOURCE INVENTORY FINALIZER: FAIL\n${message}`);
	process.exit(1);
}

function sha256(value) {
	return createHash('sha256').update(value).digest('hex');
}

function requireStringArray(value, label) {
	if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || !item.trim())) {
		fail(`${label} must be a non-empty string array.`);
	}
}

function validateInventoryEntries(entries, runtimeCandidates, label) {
	const runtimeIds = new Set(runtimeCandidates.map((candidate) => candidate.candidateId));
	const mappedRuntimeIds = new Set();
	const candidateIds = new Set();
	for (const entry of entries) {
		if (!entry?.candidateId || candidateIds.has(entry.candidateId)) {
			fail(`${label} contains a missing or duplicate candidateId.`);
		}
		candidateIds.add(entry.candidateId);
		if (typeof entry.label !== 'string' || !entry.label.trim()) {
			fail(`${label}[${entry.candidateId}].label is required.`);
		}
		requireStringArray(entry.sourceSelectors, `${label}[${entry.candidateId}].sourceSelectors`);
		if (!Array.isArray(entry.runtimeCandidateIds)) {
			fail(`${label}[${entry.candidateId}].runtimeCandidateIds must be an array.`);
		}
		for (const runtimeId of entry.runtimeCandidateIds) {
			if (!runtimeIds.has(runtimeId) || mappedRuntimeIds.has(runtimeId)) {
				fail(`${label} contains an unknown or multiply mapped runtime candidate: ${runtimeId}`);
			}
			mappedRuntimeIds.add(runtimeId);
		}
		if (entry.disabled === true && !entry.disabledSourceEvidence?.trim()) {
			fail(`${label}[${entry.candidateId}] requires exact disabled source evidence.`);
		}
	}
	for (const runtimeId of runtimeIds) {
		if (!mappedRuntimeIds.has(runtimeId)) {
			fail(`${label} omitted runtime candidate: ${runtimeId}`);
		}
	}
	return candidateIds;
}

const root = process.cwd();
const initialCapturePath = resolve(root, 'task-workflow/source/initial-capture.json');
const approvedHtmlPath = resolve(root, 'task-workflow/source-input/approved.html');
const inventoryPath = resolve(root, 'task-workflow/source/discovery/source-inventory.json');
const receiptPath = resolve(root, 'task-workflow/source/discovery/source-inventory-audit-receipt.json');

for (const required of [initialCapturePath, approvedHtmlPath, inventoryPath]) {
	if (!existsSync(required)) {
		fail(`Missing required input: ${required}`);
	}
}

const initialCapture = JSON.parse(readFileSync(initialCapturePath, 'utf8'));
const inventoryBytes = readFileSync(inventoryPath);
const inventory = JSON.parse(inventoryBytes);
const sourceHtmlBytes = readFileSync(approvedHtmlPath);
if (
	inventory.sourceAuditStatus !== 'Pass' ||
	inventory.sourceOnlyDeclarationsReviewed !== true ||
	!Array.isArray(inventory.sourceAuditNotes) ||
	inventory.sourceAuditNotes.length === 0 ||
	inventory.sourceAuditNotes.some((note) => typeof note !== 'string' || !note.trim())
) {
	fail('Complete the full source audit, source-only declaration review, and concrete audit notes first.');
}
if (
	inventory.initialInventoryFingerprint !== initialCapture.inventoryFingerprint ||
	inventory.sourceHtmlSha256 !== sha256(sourceHtmlBytes)
) {
	fail('Inventory is not bound to the current approved HTML and runtime inventory.');
}
if (
	!Array.isArray(inventory.pages) ||
	inventory.pages.length === 0 ||
	inventory.pageCount !== inventory.pages.length ||
	!Array.isArray(inventory.states) ||
	inventory.stateCount !== inventory.states.length
) {
	fail('Inventory must declare exact pageCount/pages and stateCount/states arrays.');
}

const pageIds = validateInventoryEntries(inventory.pages, initialCapture.surfaceCandidates, 'pages');
validateInventoryEntries(inventory.states, initialCapture.stateCandidates, 'states');
for (const state of inventory.states) {
	if (!pageIds.has(state.ownerPageCandidateId)) {
		fail(`State ${state.candidateId} has an invalid ownerPageCandidateId.`);
	}
}

const receipt = {
	status: 'Pass',
	finalizedAt: new Date().toISOString(),
	inventorySha256: sha256(inventoryBytes),
	sourceHtmlSha256: inventory.sourceHtmlSha256,
	initialInventoryFingerprint: inventory.initialInventoryFingerprint,
	pageCount: inventory.pageCount,
	pages: inventory.pages.map((page) => ({ candidateId: page.candidateId, label: page.label })),
	stateCount: inventory.stateCount,
	states: inventory.states.map((state) => ({
		candidateId: state.candidateId,
		ownerPageCandidateId: state.ownerPageCandidateId,
		label: state.label
	})),
	sourceAuditNotes: inventory.sourceAuditNotes
};
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
console.log('SOURCE INVENTORY FINALIZER: PASS');
console.log(`Finalized ${receipt.pageCount} pages and ${receipt.stateCount} states at inventory hash ${receipt.inventorySha256}.`);
console.log('MANDATORY NEXT ACTION: separately read task-workflow/source/discovery/source-inventory-audit-receipt.json in full.');
console.log('After that receipt read, validate the supplied inventory-source-discovery.mjs before inspecting the design JSON or target repository.');
