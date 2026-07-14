#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

function fail(message) {
	console.error(`SOURCE INVENTORY INITIALIZER: FAIL\n${message}`);
	process.exit(1);
}

function uniqueStrings(values) {
	return [...new Set(values.filter((value) => typeof value === 'string' && value.trim()))];
}

const root = process.cwd();
const initialCapturePath = resolve(root, 'task-workflow/source/initial-capture.json');
const approvedHtmlPath = resolve(root, 'task-workflow/source-input/approved.html');
const inventoryPath = resolve(root, 'task-workflow/source/discovery/source-inventory.json');

for (const required of [initialCapturePath, approvedHtmlPath]) {
	if (!existsSync(required)) {
		fail(`Missing required input: ${required}`);
	}
}
if (existsSync(inventoryPath)) {
	fail('source-inventory.json already exists. Do not overwrite an audited inventory; read and repair it directly.');
}

let initialCapture;
try {
	initialCapture = JSON.parse(readFileSync(initialCapturePath, 'utf8'));
} catch (error) {
	fail(`Invalid initial capture: ${error.message}`);
}
if (
	!initialCapture.inventoryFingerprint ||
	!Array.isArray(initialCapture.surfaceCandidates) ||
	initialCapture.surfaceCandidates.length === 0 ||
	!Array.isArray(initialCapture.stateCandidates)
) {
	fail('Initial capture lacks the runtime page/state inventory.');
}

const pages = initialCapture.surfaceCandidates.map((candidate) => ({
	candidateId: candidate.candidateId,
	kind: candidate.kind,
	label: candidate.label || candidate.candidateId,
	sourceSelectors: uniqueStrings([
		candidate.selector,
		...(candidate.triggers || []).map((trigger) => trigger.selector)
	]),
	runtimeCandidateIds: [candidate.candidateId],
	disabled: candidate.disabled === true,
	disabledSourceEvidence: candidate.disabled === true ? 'Runtime candidate is disabled; confirm the exact HTML declaration.' : ''
}));
const pageIds = new Set(pages.map((page) => page.candidateId));
const defaultOwnerPage = pages[0].candidateId;
const states = initialCapture.stateCandidates.map((candidate) => ({
	candidateId: candidate.candidateId,
	kind: candidate.kind,
	ownerPageCandidateId:
		candidate.surfaceCandidateId && pageIds.has(candidate.surfaceCandidateId)
			? candidate.surfaceCandidateId
			: defaultOwnerPage,
	label: candidate.label || candidate.candidateId,
	sourceSelectors: uniqueStrings([candidate.selector]),
	runtimeCandidateIds: [candidate.candidateId],
	disabled: candidate.disabled === true,
	disabledSourceEvidence: candidate.disabled === true ? 'Runtime candidate is disabled; confirm the exact HTML declaration.' : ''
}));

const approvedHtml = readFileSync(approvedHtmlPath);
const inventory = {
	sourceAuditStatus: 'Pending',
	sourceAuditNotes: [],
	sourceOnlyDeclarationsReviewed: false,
	initialInventoryFingerprint: initialCapture.inventoryFingerprint,
	sourceHtmlSha256: createHash('sha256').update(approvedHtml).digest('hex'),
	pageCount: pages.length,
	pages,
	stateCount: states.length,
	states
};

mkdirSync(dirname(inventoryPath), { recursive: true });
writeFileSync(inventoryPath, `${JSON.stringify(inventory, null, 2)}\n`);

console.log('SOURCE INVENTORY INITIALIZER: SKELETON WRITTEN');
console.log(`Runtime candidates seeded: ${pages.length} pages, ${states.length} states.`);
console.log('MANDATORY NEXT ACTIONS — complete these before supplied inventory capture or any target/spec inspection:');
console.log('1. Read task-workflow/source/discovery/source-inventory.json.');
console.log('2. Compare it against every line of the complete approved HTML/CSS/JavaScript audit.');
console.log('3. Add source-only pages/states, correct ownership/selectors/labels/disabled proof, and preserve every runtime mapping exactly once.');
console.log('4. Set sourceOnlyDeclarationsReviewed to true, sourceAuditStatus to Pass, and record concrete sourceAuditNotes.');
console.log('5. Run node task-workflow/scripts/finalize-source-inventory.mjs.');
console.log('6. Separately read its source-inventory-audit-receipt.json in full. Then validate and run the unchanged supplied inventory capture before target/spec inspection.');
