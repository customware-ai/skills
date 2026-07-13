#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

function fail(message) {
	console.error(`PHASE 0 GATE: FAIL\n${message}`);
	process.exit(1);
}

function files(path, predicate) {
	if (!existsSync(path)) {
		return [];
	}
	return readdirSync(path, { withFileTypes: true })
		.filter((entry) => entry.isFile() && predicate(entry.name))
		.map((entry) => resolve(path, entry.name));
}

const root = process.cwd();
const workflow = resolve(root, 'task-workflow');
const markerPath = resolve(workflow, 'CURRENT_PHASE.txt');
const artifactPath = resolve(workflow, 'phase-0-source-contract.md');
const gapsPath = resolve(workflow, 'open-gaps.md');
const manifestPath = resolve(workflow, 'source/discovery/manifest.json');
const validationPath = resolve(workflow, 'source/discovery/script-validation.json');
const runReceiptPath = resolve(workflow, 'source/discovery/lifecycle-run-receipts.json');

if (!existsSync(markerPath) || readFileSync(markerPath, 'utf8').trim() !== 'phase-0-source-contract') {
	fail('CURRENT_PHASE.txt must remain phase-0-source-contract until this gate passes.');
}

for (const required of [artifactPath, gapsPath, manifestPath, validationPath, runReceiptPath]) {
	if (!existsSync(required)) {
		fail(`Missing required artifact: ${required}`);
	}
}

const runReceipts = JSON.parse(readFileSync(runReceiptPath, 'utf8'));
if (!Array.isArray(runReceipts)) {
	fail('Custom source discovery did not use the supplied validated runner at 15000/20000 ms.');
}

const git = spawnSync('git', ['status', '--porcelain=v1', '--untracked-files=all'], {
	cwd: root,
	encoding: 'utf8'
});
if (git.status !== 0) {
	fail(`Unable to inspect target diff:\n${git.stderr}`);
}
const forbiddenChanges = git.stdout
	.split('\n')
	.filter(Boolean)
	.map((line) => line.slice(3))
	.filter((path) => !path.startsWith('task-workflow/') && !path.startsWith('.agents/'));
if (forbiddenChanges.length > 0) {
	fail(`Phase 0 is target-read-only. Remove these target changes and restart Phase 0:\n${forbiddenChanges.join('\n')}`);
}

const scripts = files(resolve(workflow, 'source-playwright'), (name) => name.endsWith('.mjs')).filter(
	(path) => !path.endsWith('/initial-source-capture.mjs')
);
if (scripts.length === 0) {
	fail('Missing custom interactive source-discovery Playwright script. The supplied initial capture cannot pass Phase 0 alone.');
}
const scriptText = scripts.map((path) => readFileSync(path, 'utf8')).join('\n');
if (/\.waitForTimeout\s*\(|\bsetTimeout\s*\(|\bsetInterval\s*\(|\b(?:sleep|usleep)\b/.test(scriptText)) {
	fail('Custom source-discovery scripts use forbidden fixed-time waiting.');
}
if (/imagesOpened/.test(scriptText)) {
	fail('Custom source-discovery scripts must not prefill imagesOpened before visual inspection.');
}
if (!/\.(click|fill|selectOption|press|wheel|dragTo|tap)\s*\(/.test(scriptText)) {
	fail('Custom source-discovery script contains no real Playwright input action.');
}
if (!/\.screenshot\s*\(/.test(scriptText)) {
	fail('Custom source-discovery script contains no screenshot capture.');
}

let validation;
try {
	validation = JSON.parse(readFileSync(validationPath, 'utf8'));
} catch (error) {
	fail(`Invalid source discovery validation receipt: ${error.message}`);
}
for (const script of scripts) {
	const path = script.slice(root.length + 1);
	const hash = createHash('sha256').update(readFileSync(script, 'utf8')).digest('hex');
	const matching = validation.scripts?.find((item) => item.path === path && item.sha256 === hash);
	if (!matching) {
		fail(`Custom source script was not validated at its current hash: ${path}`);
	}
	const runReceipt = runReceipts.find(
		(item) =>
			item.script === path &&
			item.sha256 === hash &&
			item.readyTimeoutMs === 15000 &&
			item.commandTimeoutMs === 20000 &&
			item.status === 'Pass'
	);
	if (!runReceipt) {
		fail(`Validated source runner receipt does not match the current script hash: ${path}`);
	}
}

const secondRun = resolve(workflow, 'runtime/source/run-02.log');
if (!existsSync(secondRun) || statSync(secondRun).size === 0) {
	fail('Missing non-empty runtime/source/run-02.log from the second helper-owned source discovery run.');
}

let manifest;
try {
	manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
} catch (error) {
	fail(`Invalid source discovery manifest: ${error.message}`);
}
if (!Array.isArray(manifest.inputActions) || manifest.inputActions.length === 0) {
	fail('Discovery manifest must record at least one real input action and visible result.');
}
if (!Array.isArray(manifest.images)) {
	fail('Discovery manifest must contain an images array.');
}
const imagePaths = manifest.images.map((path) => resolve(root, path));
if (imagePaths.some((path) => !existsSync(path))) {
	fail('Every discovery manifest image must exist.');
}
const desktopImages = manifest.images.filter((path) => path.includes('/discovery/desktop/') && path.endsWith('.png'));
const mobileImages = manifest.images.filter((path) => path.includes('/discovery/mobile/') && path.endsWith('.png'));
if (desktopImages.length < 2 || mobileImages.length < 2) {
	fail('Discovery requires at least two desktop and two mobile images under source/discovery/.');
}
if (
	!Array.isArray(manifest.imagesOpened) ||
	manifest.imagesOpened.length !== manifest.images.length ||
	manifest.imagesOpened.some((path, index) => path !== manifest.images[index])
) {
	fail('Manifest imagesOpened must account for every discovery image after visual inspection.');
}

const artifact = readFileSync(artifactPath, 'utf8');
if (/\bPending\b/.test(artifact) || /\|\s*Fail\s*\|/.test(artifact)) {
	fail('Phase 0 artifact still contains Pending or Fail evidence rows.');
}
if (!/- Score:\s*(48|49|50)\/50/.test(artifact)) {
	fail('Phase 0 artifact must record a score of at least 48/50.');
}
for (const required of ['- Critical items: Pass', '- Promotion lock: Pass', '- Decision: Pass']) {
	if (!artifact.includes(required)) {
		fail(`Phase 0 artifact is missing: ${required}`);
	}
}

const gaps = readFileSync(gapsPath, 'utf8');
if (/\bPending\b/.test(gaps)) {
	fail('open-gaps.md still contains Pending placeholders.');
}

const receipt = {
	phase: 'phase-0-source-contract',
	decision: 'Pass',
	promotedAt: new Date().toISOString(),
	customScripts: scripts.map((path) => path.slice(root.length + 1)),
	discoveryImages: manifest.images,
	inputActions: manifest.inputActions.length,
	targetChangesOutsideWorkflow: []
};
writeFileSync(resolve(workflow, 'phase-0-promotion-receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`);
writeFileSync(markerPath, 'phase-1-ui-implementation\n');
console.log(JSON.stringify(receipt, null, 2));
console.log('\nPHASE 0 GATE: PASS');
console.log('MANDATORY NEXT ACTION: read references/phase-1-ui-implementation.md before any target implementation write.');
