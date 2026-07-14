#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';

function fail(message) {
	console.error(`SOURCE DISCOVERY PRE-RUN: FAIL\n${message}`);
	process.exit(1);
}

const root = process.cwd();
const scriptArgs = process.argv.slice(2);
const suppliedScriptPath = 'task-workflow/source-playwright/inventory-source-discovery.mjs';
if (scriptArgs.length !== 1 || resolve(root, scriptArgs[0]) !== resolve(root, suppliedScriptPath)) {
	fail(`Usage: node task-workflow/scripts/validate-source-discovery.mjs ${suppliedScriptPath}`);
}

const sourceInventoryPath = resolve(root, 'task-workflow/source/discovery/source-inventory.json');
const sourceInventoryReceiptPath = resolve(root, 'task-workflow/source/discovery/source-inventory-audit-receipt.json');
const entryReceiptPath = resolve(root, 'task-workflow/phase-0-entry-receipt.json');
if (!existsSync(sourceInventoryPath)) {
	fail('Read the complete approved HTML and create source/discovery/source-inventory.json before writing or validating browser scripts.');
}
if (!existsSync(sourceInventoryReceiptPath)) {
	fail('Finalize the audited source inventory and read its receipt before writing or validating browser scripts.');
}
if (!existsSync(entryReceiptPath)) {
	fail('Missing Phase 0 bootstrap receipt. Reset and restart Phase 0.');
}
let sourceInventory;
try {
	sourceInventory = JSON.parse(readFileSync(sourceInventoryPath, 'utf8'));
} catch (error) {
	fail(`Invalid source HTML inventory: ${error.message}`);
}
const sourceInventoryBytes = readFileSync(sourceInventoryPath);
const sourceInventoryReceipt = JSON.parse(readFileSync(sourceInventoryReceiptPath, 'utf8'));
if (
	sourceInventoryReceipt.status !== 'Pass' ||
	sourceInventoryReceipt.inventorySha256 !== createHash('sha256').update(sourceInventoryBytes).digest('hex')
) {
	fail('Source inventory changed after finalization. Re-run the finalizer and read the new receipt before browser scripting.');
}

const entryReceipt = JSON.parse(readFileSync(entryReceiptPath, 'utf8'));
const suppliedCopy = entryReceipt.copied?.find((item) => item.target === suppliedScriptPath);
if (!existsSync(resolve(root, suppliedScriptPath))) {
	fail('The supplied inventory source discovery script is missing. Clean-reset Phase 0.');
}
const currentSuppliedBytes = readFileSync(resolve(root, suppliedScriptPath));
const currentSuppliedHash = createHash('sha256').update(currentSuppliedBytes).digest('hex');
if (!suppliedCopy?.byteIdentical || suppliedCopy.sha256 !== currentSuppliedHash) {
	fail('The supplied inventory source discovery script changed after bootstrap. Clean-reset Phase 0; do not author or modify capture code.');
}
if (
	sourceInventory.sourceAuditStatus !== 'Pass' ||
	sourceInventory.sourceOnlyDeclarationsReviewed !== true ||
	!Array.isArray(sourceInventory.sourceAuditNotes) ||
	sourceInventory.sourceAuditNotes.length === 0 ||
	!Array.isArray(sourceInventory.pages) ||
	sourceInventory.pageCount !== sourceInventory.pages.length ||
	!Array.isArray(sourceInventory.states) ||
	sourceInventory.stateCount !== sourceInventory.states.length
) {
	fail(
		'Source inventory must record a completed full-HTML audit, source-only declaration review, concrete notes, and exact pageCount/pages and stateCount/states before browser scripting.'
	);
}

const scripts = [];
let combinedExecutableText = '';
for (const arg of scriptArgs) {
	const path = resolve(root, arg);
	const allowedRoot = resolve(root, 'task-workflow/source-playwright');
	if (!path.startsWith(`${allowedRoot}/`) || path.endsWith('/initial-source-capture.mjs') || !existsSync(path)) {
		fail(`Supplied script must exist unchanged under task-workflow/source-playwright/: ${arg}`);
	}
	const text = readFileSync(path, 'utf8');
	const executableText = text
		.replace(/\/\*[\s\S]*?\*\//g, '')
		.replace(/^\s*\/\/.*$/gm, '');
	combinedExecutableText += `\n${executableText}`;
	const forbidden = [
		[/\.waitForTimeout\s*\(/, 'waitForTimeout'],
		[/\bsetTimeout\s*\(/, 'setTimeout'],
		[/\bsetInterval\s*\(/, 'setInterval'],
		[/\b(?:sleep|usleep)\b/, 'sleep']
	].filter(([pattern]) => pattern.test(text));
	if (forbidden.length > 0) {
		fail(`${arg} uses forbidden fixed-time waiting: ${forbidden.map(([, name]) => name).join(', ')}`);
	}
	if (!/\.(click|fill|selectOption|press|wheel|dragTo|tap)\s*\(/.test(text)) {
		fail(`${arg} contains no real Playwright input action.`);
	}
	if (!/\.screenshot\s*\(/.test(text)) {
		fail(`${arg} contains no screenshot capture.`);
	}
	if (!executableText.includes('task-workflow/source/discovery/')) {
		fail(`${arg} must use task-workflow/source/discovery/ in executable path code; a comment is not evidence.`);
	}
	if (/imagesOpened/.test(text)) {
		fail(`${arg} must not create or populate imagesOpened. Add that manifest field only after every image is opened.`);
	}
	scripts.push({
		path: relative(root, path),
		sha256: createHash('sha256').update(text).digest('hex'),
		fixedWaitAudit: 'Pass',
		realInputAudit: 'Pass',
		screenshotAudit: 'Pass'
	});
}
for (const required of [
	'source-inventory.json',
	'initialInventoryFingerprint',
	'surfaceCoverage',
	'stateCoverage'
]) {
	if (!combinedExecutableText.includes(required)) {
		fail(`The validated script set must consume the source inventory and emit complete coverage; missing: ${required}`);
	}
}
if (/\bconst\s+(?:PAGES|PAGE_TARGETS|STATE_TARGETS|STATES)\s*=\s*\[/i.test(combinedExecutableText)) {
	fail('Do not hardcode sampled page/state target arrays. Derive every capture target from the finalized source inventory.');
}
if (!/\bof\s+(?:sourceInventory|inventory)\.pages\b/.test(combinedExecutableText)) {
	fail('The script set must iterate every finalized inventory.pages entry; a hardcoded page list cannot pass.');
}
if (!/\bof\s+(?:sourceInventory|inventory)\.states\b/.test(combinedExecutableText)) {
	fail('The script set must iterate every finalized inventory.states entry; sampled interaction states cannot pass.');
}
if (
	!/surfaceCoverage\s*:\s*\[\s*\]/.test(combinedExecutableText) ||
	!/(?:surfaceCoverage\.push\s*\(|upsert\s*\(\s*manifest\.surfaceCoverage)/.test(combinedExecutableText)
) {
	fail('Canonical manifest surfaceCoverage must be an array populated once for every inventory page.');
}
if (
	!/stateCoverage\s*:\s*\[\s*\]/.test(combinedExecutableText) ||
	!/(?:stateCoverage\.push\s*\(|upsert\s*\(\s*manifest\.stateCoverage)/.test(combinedExecutableText)
) {
	fail('Canonical manifest stateCoverage must be an array populated once for every inventory state.');
}
if (!/["'][^"']*manifest\.json["']/.test(combinedExecutableText)) {
	fail('The script set must emit the canonical task-workflow/source/discovery/manifest.json.');
}

const receiptPath = resolve(root, 'task-workflow/source/discovery/script-validation.json');
mkdirSync(dirname(receiptPath), { recursive: true });
const receipt = { validatedAt: new Date().toISOString(), scripts };
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
console.log('\nSOURCE DISCOVERY PRE-RUN: PASS');
console.log('MANDATORY NEXT ACTIONS — run these separately and sequentially:');
for (const mode of ['pages-desktop', 'pages-mobile', 'states-desktop', 'states-mobile', 'shell']) {
	console.log(
		`node task-workflow/scripts/run-validated-source-discovery.mjs task-workflow/source-playwright/inventory-source-discovery.mjs --mode ${mode}`
	);
}
console.log('Do not invoke playwright-lifecycle.mjs directly for this supplied source discovery run.');
console.log(
	'Do not inspect the design JSON or target files between these modes. After all five pass, read manifest.json and open every inspectionImages contact sheet separately and sequentially in listed order; together they cover every evidence image exactly once.'
);
