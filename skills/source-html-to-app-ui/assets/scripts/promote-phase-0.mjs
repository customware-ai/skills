#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, readlinkSync, statSync, writeFileSync } from 'node:fs';
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

function hasExactTableCell(markdown, values) {
	return markdown.split('\n').some((line) => {
		if (!line.trimStart().startsWith('|')) {
			return false;
		}
		return line
			.split('|')
			.slice(1, -1)
			.some((cell) => values.has(cell.trim()));
	});
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

function prependTableDataRow(markdown, headingText, row) {
	const lines = markdown.split('\n');
	const heading = lines.findIndex((line) => line === headingText);
	if (heading < 0 || !lines[heading + 3]?.startsWith('|')) {
		fail(`progress.md is missing the table under ${headingText}.`);
	}
	lines.splice(heading + 4, 0, row);
	return lines.join('\n');
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
				files.push({
					path: relativePath,
					sha256: createHash('sha256').update(readFileSync(absolutePath)).digest('hex')
				});
			}
		}
	}

	visit(root);
	return { directories, files, links };
}

const root = process.cwd();
const workflow = resolve(root, 'task-workflow');
const markerPath = resolve(workflow, 'CURRENT_PHASE.txt');
const entryReceiptPath = resolve(workflow, 'phase-0-entry-receipt.json');
const targetBaselinePath = resolve(workflow, 'phase-0-target-baseline.json');
const artifactPath = resolve(workflow, 'phase-0-source-contract.md');
const gapsPath = resolve(workflow, 'open-gaps.md');
const progressPath = resolve(workflow, 'progress.md');
const initialCapturePath = resolve(workflow, 'source/initial-capture.json');
const sourceInventoryPath = resolve(workflow, 'source/discovery/source-inventory.json');
const sourceInventoryReceiptPath = resolve(workflow, 'source/discovery/source-inventory-audit-receipt.json');
const manifestPath = resolve(workflow, 'source/discovery/manifest.json');
const validationPath = resolve(workflow, 'source/discovery/script-validation.json');
const runReceiptPath = resolve(workflow, 'source/discovery/lifecycle-run-receipts.json');

if (!existsSync(markerPath) || readFileSync(markerPath, 'utf8').trim() !== 'phase-0-source-contract') {
	fail('CURRENT_PHASE.txt must remain phase-0-source-contract until this gate passes.');
}

for (const required of [
	artifactPath,
	gapsPath,
	progressPath,
	entryReceiptPath,
	targetBaselinePath,
	initialCapturePath,
	sourceInventoryPath,
	sourceInventoryReceiptPath,
	manifestPath,
	validationPath,
	runReceiptPath
]) {
	if (!existsSync(required)) {
		fail(`Missing required artifact: ${required}`);
	}
}

const baselineSnapshot = JSON.parse(readFileSync(targetBaselinePath, 'utf8'));
const currentSnapshot = targetSnapshot(root);
if (JSON.stringify(currentSnapshot) !== JSON.stringify(baselineSnapshot)) {
	const baselineDirectories = new Set(baselineSnapshot.directories ?? []);
	const currentDirectories = new Set(currentSnapshot.directories);
	const addedDirectories = currentSnapshot.directories.filter((path) => !baselineDirectories.has(path));
	const removedDirectories = (baselineSnapshot.directories ?? []).filter((path) => !currentDirectories.has(path));
	const baselineFiles = new Map((baselineSnapshot.files ?? []).map((file) => [file.path, file.sha256]));
	const currentFiles = new Map(currentSnapshot.files.map((file) => [file.path, file.sha256]));
	const changedFiles = [...new Set([...baselineFiles.keys(), ...currentFiles.keys()])].filter(
		(path) => baselineFiles.get(path) !== currentFiles.get(path)
	);
	fail(
		`Phase 0 target baseline changed. Even empty/preparatory directories are forbidden. Clean-reset the run.\nAdded directories: ${addedDirectories.join(', ') || 'none'}\nRemoved directories: ${removedDirectories.join(', ') || 'none'}\nChanged files: ${changedFiles.join(', ') || 'none'}`
	);
}

const runReceipts = JSON.parse(readFileSync(runReceiptPath, 'utf8'));
if (!Array.isArray(runReceipts)) {
	fail('Custom source discovery did not use the supplied validated runner at 15000/20000 ms.');
}
const requiredDiscoveryModes = ['pages-desktop', 'pages-mobile', 'states-desktop', 'states-mobile', 'shell'];
const suppliedDiscoveryPath = 'task-workflow/source-playwright/inventory-source-discovery.mjs';
const suppliedDiscoveryHash = createHash('sha256')
	.update(readFileSync(resolve(root, suppliedDiscoveryPath)))
	.digest('hex');
const entryReceipt = JSON.parse(readFileSync(entryReceiptPath, 'utf8'));
const suppliedCopy = entryReceipt.copied?.find((item) => item.target === suppliedDiscoveryPath);
if (!suppliedCopy?.byteIdentical || suppliedCopy.sha256 !== suppliedDiscoveryHash) {
	fail('The supplied inventory source discovery script changed after bootstrap. Clean-reset Phase 0.');
}
for (const mode of requiredDiscoveryModes) {
	if (
		!runReceipts.some(
			(receipt) =>
				receipt.script === suppliedDiscoveryPath &&
				receipt.sha256 === suppliedDiscoveryHash &&
				receipt.mode === mode &&
				Array.isArray(receipt.batches) &&
				Array.isArray(receipt.ports) &&
				receipt.ports.length === receipt.batches.length &&
				receipt.ports.every((port) => Number.isInteger(port) && port > 0 && port <= 65535) &&
				receipt.status === 'Pass'
		)
	) {
		fail(`Missing passing fresh-port supplied discovery lifecycle receipt for mode: ${mode}`);
	}
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
if (scripts.length !== 1 || scripts[0] !== resolve(root, suppliedDiscoveryPath)) {
	fail('Phase 0 must use only the supplied inventory-source-discovery.mjs capture script. Remove authored capture scripts and clean-reset.');
}
const scriptText = scripts.map((path) => readFileSync(path, 'utf8')).join('\n');
if (/\.waitForTimeout\s*\(|\bsetTimeout\s*\(|\bsetInterval\s*\(|\b(?:sleep|usleep)\b/.test(scriptText)) {
	fail('Supplied source-discovery script uses forbidden fixed-time waiting.');
}
if (/imagesOpened/.test(scriptText)) {
	fail('Supplied source-discovery script must not prefill imagesOpened before visual inspection.');
}
if (!/\.(click|fill|selectOption|press|wheel|dragTo|tap)\s*\(/.test(scriptText)) {
	fail('Supplied source-discovery script contains no real Playwright input action.');
}
if (!/\.screenshot\s*\(/.test(scriptText)) {
	fail('Supplied source-discovery script contains no screenshot capture.');
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
		fail(`Supplied source script was not validated at its bootstrap hash: ${path}`);
	}
	const runReceipt = runReceipts.find(
		(item) =>
			item.script === path &&
			item.sha256 === hash &&
			item.readyTimeoutMs === 15000 &&
			item.commandTimeoutMs === 20000 &&
			Array.isArray(item.batches) &&
			Array.isArray(item.ports) &&
			item.ports.length === item.batches.length &&
			item.ports.every((port) => Number.isInteger(port) && port > 0 && port <= 65535) &&
			item.status === 'Pass'
	);
	if (!runReceipt) {
		fail(`Validated source runner receipt does not match the current script hash or fresh-port lifecycle contract: ${path}`);
	}
}

const currentManagedRun = resolve(workflow, 'runtime/source/run-01.log');
if (
	!existsSync(currentManagedRun) ||
	statSync(currentManagedRun).size === 0 ||
	statSync(currentManagedRun).mtimeMs <= statSync(initialCapturePath).mtimeMs
) {
	fail('Missing a current non-empty managed run-01.log from validated discovery after the initial capture.');
}

let manifest;
try {
	manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
} catch (error) {
	fail(`Invalid source discovery manifest: ${error.message}`);
}
let initialCapture;
try {
	initialCapture = JSON.parse(readFileSync(initialCapturePath, 'utf8'));
} catch (error) {
	fail(`Invalid initial source capture inventory: ${error.message}`);
}
if (
	!initialCapture.inventoryFingerprint ||
	!Array.isArray(initialCapture.surfaceCandidates) ||
	initialCapture.surfaceCandidates.length === 0 ||
	!Array.isArray(initialCapture.stateCandidates)
) {
	fail('Initial source capture is missing its runtime surface/state inventory.');
}
let sourceInventory;
try {
	sourceInventory = JSON.parse(readFileSync(sourceInventoryPath, 'utf8'));
} catch (error) {
	fail(`Invalid source HTML inventory: ${error.message}`);
}
const sourceInventoryReceipt = JSON.parse(readFileSync(sourceInventoryReceiptPath, 'utf8'));
if (
	sourceInventoryReceipt.status !== 'Pass' ||
	sourceInventoryReceipt.inventorySha256 !==
		createHash('sha256').update(readFileSync(sourceInventoryPath)).digest('hex')
) {
	fail('Source inventory finalization receipt is stale or invalid.');
}
const approvedSourcePath = resolve(workflow, 'source-input/approved.html');
const approvedSourceHash = createHash('sha256').update(readFileSync(approvedSourcePath)).digest('hex');
if (
	sourceInventory.initialInventoryFingerprint !== initialCapture.inventoryFingerprint ||
	sourceInventory.sourceHtmlSha256 !== approvedSourceHash
) {
	fail('Source HTML inventory is not bound to the current approved HTML and runtime inventory.');
}
if (
	sourceInventory.sourceAuditStatus !== 'Pass' ||
	sourceInventory.sourceOnlyDeclarationsReviewed !== true ||
	!Array.isArray(sourceInventory.sourceAuditNotes) ||
	sourceInventory.sourceAuditNotes.length === 0 ||
	!Array.isArray(sourceInventory.pages) ||
	sourceInventory.pages.length === 0 ||
	sourceInventory.pageCount !== sourceInventory.pages.length ||
	!Array.isArray(sourceInventory.states) ||
	sourceInventory.stateCount !== sourceInventory.states.length
) {
	fail(
		'Source HTML inventory must prove the complete HTML audit and source-only declaration review, then declare exact pageCount/pages and stateCount/states arrays.'
	);
}
if (manifest.initialInventoryFingerprint !== initialCapture.inventoryFingerprint) {
	fail('Discovery manifest is not bound to the current initial runtime inventory fingerprint.');
}
if (
	!Array.isArray(manifest.completedModes) ||
	requiredDiscoveryModes.some((mode) => !manifest.completedModes.includes(mode))
) {
	fail('Canonical discovery manifest is missing one or more supplied inventory-driven capture modes.');
}
if (!Array.isArray(manifest.inputActions) || manifest.inputActions.length === 0) {
	fail('Discovery manifest must record at least one real input action and visible result.');
}
if (!Array.isArray(manifest.images)) {
	fail('Discovery manifest must contain an images array.');
}
if (new Set(manifest.images).size !== manifest.images.length) {
	fail('Discovery manifest images must be unique.');
}
const imagePaths = manifest.images.map((path) => resolve(root, path));
if (imagePaths.some((path) => !existsSync(path))) {
	fail('Every discovery manifest image must exist.');
}
if (
	manifest.images.some(
		(path) =>
			typeof path !== 'string' ||
			!path.startsWith('task-workflow/source/discovery/') ||
			!path.endsWith('.png')
	)
) {
	fail('Every discovery image must be a PNG under task-workflow/source/discovery/.');
}
if (
	!Array.isArray(manifest.inspectionImages) ||
	manifest.inspectionImages.length === 0 ||
	new Set(manifest.inspectionImages).size !== manifest.inspectionImages.length ||
	manifest.inspectionImages.some(
		(path) =>
			typeof path !== 'string' ||
			!path.startsWith('task-workflow/source/discovery/inspection/') ||
			!path.endsWith('.png') ||
			!existsSync(resolve(root, path))
	)
) {
	fail('Manifest inspectionImages must contain unique, existing PNG contact sheets under the discovery inspection root.');
}
if (!Array.isArray(manifest.inspectionCoverage) || manifest.inspectionCoverage.length !== manifest.inspectionImages.length) {
	fail('Manifest inspectionCoverage must describe every required inspection sheet.');
}
const coveredEvidence = [];
for (let index = 0; index < manifest.inspectionCoverage.length; index += 1) {
	const coverage = manifest.inspectionCoverage[index];
	if (
		coverage?.sheet !== manifest.inspectionImages[index] ||
		!Array.isArray(coverage.evidenceImages) ||
		coverage.evidenceImages.length === 0 ||
		coverage.evidenceImages.some((path) => !manifest.images.includes(path))
	) {
		fail('Each inspection sheet must list the discovery evidence images it visibly contains.');
	}
	coveredEvidence.push(...coverage.evidenceImages);
}
if (
	coveredEvidence.length !== manifest.images.length ||
	new Set(coveredEvidence).size !== coveredEvidence.length ||
	manifest.images.some((path) => !coveredEvidence.includes(path))
) {
	fail('Inspection contact sheets must visibly cover every discovery evidence image exactly once.');
}
if (
	!Array.isArray(manifest.imagesOpened) ||
	manifest.imagesOpened.length !== manifest.inspectionImages.length ||
	manifest.imagesOpened.some((path, index) => path !== manifest.inspectionImages[index])
) {
	fail('Manifest imagesOpened must account for every complete inspection sheet after visual inspection.');
}

function requireStringArray(value, label) {
	if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== 'string' || !item.trim())) {
		fail(`${label} must be a non-empty string array.`);
	}
}

function requireImage(path, label) {
	if (typeof path !== 'string' || !manifest.images.includes(path)) {
		fail(`${label} must reference an image in the discovery manifest.`);
	}
}

function coverageByCandidate(entries, label) {
	if (!Array.isArray(entries)) {
		fail(`${label} must be an array.`);
	}
	const map = new Map();
	for (const entry of entries) {
		if (!entry?.candidateId || map.has(entry.candidateId)) {
			fail(`${label} contains a missing or duplicate candidateId.`);
		}
		if (typeof entry.label !== 'string' || !entry.label.trim()) {
			fail(`${label}[${entry.candidateId}].label must identify the source page or state.`);
		}
		map.set(entry.candidateId, entry);
	}
	return map;
}

function requireDisabledEvidence(entry, label) {
	requireStringArray(entry.reachSteps, `${label}.reachSteps`);
	requireStringArray(entry.inputActions, `${label}.inputActions`);
	requireImage(entry.desktopImage, `${label}.desktopImage`);
	requireImage(entry.mobileImage, `${label}.mobileImage`);
}

function inventoryByCandidate(entries, runtimeCandidates, label) {
	const map = new Map();
	const runtimeMap = new Map(runtimeCandidates.map((candidate) => [candidate.candidateId, candidate]));
	const mappedRuntimeIds = new Set();
	for (const entry of entries) {
		if (!entry?.candidateId || map.has(entry.candidateId)) {
			fail(`${label} contains a missing or duplicate candidateId.`);
		}
		requireStringArray(entry.sourceSelectors, `${label}[${entry.candidateId}].sourceSelectors`);
		if (!Array.isArray(entry.runtimeCandidateIds)) {
			fail(`${label}[${entry.candidateId}].runtimeCandidateIds must be an array.`);
		}
		for (const runtimeId of entry.runtimeCandidateIds) {
			if (!runtimeMap.has(runtimeId) || mappedRuntimeIds.has(runtimeId)) {
				fail(`${label} contains an unknown or multiply mapped runtime candidate: ${runtimeId}`);
			}
			mappedRuntimeIds.add(runtimeId);
		}
		if (entry.disabled === true) {
			if (
				entry.runtimeCandidateIds.some((runtimeId) => runtimeMap.get(runtimeId)?.disabled !== true) ||
				(entry.runtimeCandidateIds.length === 0 && !entry.disabledSourceEvidence?.trim())
			) {
				fail(`${label}[${entry.candidateId}] is not source-proven disabled.`);
			}
		}
		map.set(entry.candidateId, entry);
	}
	for (const runtimeId of runtimeMap.keys()) {
		if (!mappedRuntimeIds.has(runtimeId)) {
			fail(`${label} omitted runtime candidate discovered by Playwright: ${runtimeId}`);
		}
	}
	return map;
}

const sourcePages = inventoryByCandidate(sourceInventory.pages, initialCapture.surfaceCandidates, 'sourceInventory.pages');
const surfaceCoverage = coverageByCandidate(manifest.surfaceCoverage, 'surfaceCoverage');
for (const candidate of sourcePages.values()) {
	const entry = surfaceCoverage.get(candidate.candidateId);
	if (!entry) {
		fail(`Missing desktop/mobile/section coverage for source HTML page: ${candidate.candidateId}`);
	}
	if (entry.status === 'disabled') {
		if (candidate.disabled !== true) {
			fail(`A reachable source HTML page cannot be marked disabled: ${candidate.candidateId}`);
		}
		requireDisabledEvidence(entry, `surfaceCoverage[${candidate.candidateId}]`);
		continue;
	}
	if (entry.status !== 'captured') {
		fail(`Surface coverage status must be captured or source-proven disabled: ${candidate.candidateId}`);
	}
	requireStringArray(entry.reachSteps, `surfaceCoverage[${candidate.candidateId}].reachSteps`);
	requireStringArray(entry.inputActions, `surfaceCoverage[${candidate.candidateId}].inputActions`);
	for (const viewport of ['desktop', 'mobile']) {
		const evidence = entry[viewport];
		if (!evidence || !Array.isArray(evidence.sections) || evidence.sections.length === 0) {
			fail(`Surface ${candidate.candidateId} requires a ${viewport} full view and every visible section.`);
		}
		requireImage(evidence.fullPage, `surfaceCoverage[${candidate.candidateId}].${viewport}.fullPage`);
		for (const image of evidence.sections) {
			requireImage(image, `surfaceCoverage[${candidate.candidateId}].${viewport}.sections`);
		}
	}
}

const sourceStates = inventoryByCandidate(sourceInventory.states, initialCapture.stateCandidates, 'sourceInventory.states');
for (const state of sourceStates.values()) {
	if (!state.ownerPageCandidateId || !sourcePages.has(state.ownerPageCandidateId)) {
		fail(`Source state must identify a valid ownerPageCandidateId: ${state.candidateId}`);
	}
}
const stateCoverage = coverageByCandidate(manifest.stateCoverage, 'stateCoverage');
for (const candidate of sourceStates.values()) {
	const entry = stateCoverage.get(candidate.candidateId);
	if (!entry) {
		fail(`Missing real-input desktop/mobile coverage for source HTML state: ${candidate.candidateId}`);
	}
	if (entry.status === 'disabled') {
		if (candidate.disabled !== true) {
			fail(`A reachable source HTML state cannot be marked disabled: ${candidate.candidateId}`);
		}
		requireDisabledEvidence(entry, `stateCoverage[${candidate.candidateId}]`);
		continue;
	}
	if (entry.status !== 'captured') {
		fail(`State coverage status must be captured or source-proven disabled: ${candidate.candidateId}`);
	}
	requireStringArray(entry.reachSteps, `stateCoverage[${candidate.candidateId}].reachSteps`);
	requireStringArray(entry.inputActions, `stateCoverage[${candidate.candidateId}].inputActions`);
	requireImage(entry.desktopImage, `stateCoverage[${candidate.candidateId}].desktopImage`);
	requireImage(entry.mobileImage, `stateCoverage[${candidate.candidateId}].mobileImage`);
}

if (statSync(artifactPath).mtimeMs < statSync(manifestPath).mtimeMs) {
	fail('Phase 0 artifact was scored before the final inspected-image manifest. Reopen the evidence and score it afterward.');
}
const artifact = readFileSync(artifactPath, 'utf8');
const normalizedArtifact = artifact.replaceAll('`', '').replaceAll('*', '').replaceAll('_', '');
if (hasExactTableCell(artifact, new Set(['Pending', 'Fail']))) {
	fail('Phase 0 artifact still contains Pending or Fail evidence rows.');
}
if (!/\|\s*Marker set before phase work\s*\|\s*`phase-0-source-contract`\s*\/\s*Pass\s*\|/.test(artifact)) {
	fail('Phase 0 metadata must mark the phase-0-source-contract entry boundary Pass.');
}
if (!/- Score:\s*(48|49|50)\/50/.test(normalizedArtifact)) {
	fail('Phase 0 artifact must record a score of at least 48/50.');
}
for (const required of ['- Critical items: Pass', '- Promotion lock: Pass', '- Decision: Pass']) {
	if (!normalizedArtifact.includes(required)) {
		fail(`Phase 0 artifact is missing: ${required}`);
	}
}

const gaps = readFileSync(gapsPath, 'utf8');
if (hasExactTableCell(gaps, new Set(['Pending']))) {
	fail('open-gaps.md still contains Pending placeholders.');
}

const receipt = {
	phase: 'phase-0-source-contract',
	decision: 'Pass',
	promotedAt: new Date().toISOString(),
	customScripts: scripts.map((path) => path.slice(root.length + 1)),
	discoveryImages: manifest.images,
	sourcePages: sourceInventory.pages.length,
	sourceStates: sourceInventory.states.length,
	runtimeSurfaceCandidates: initialCapture.surfaceCandidates.length,
	runtimeStateCandidates: initialCapture.stateCandidates.length,
	inputActions: manifest.inputActions.length,
	targetChangesOutsideWorkflow: []
};
writeFileSync(resolve(workflow, 'phase-0-promotion-receipt.json'), `${JSON.stringify(receipt, null, 2)}\n`);
writeFileSync(resolve(workflow, 'phase-1-target-baseline.json'), `${JSON.stringify(currentSnapshot, null, 2)}\n`);
writeFileSync(markerPath, 'phase-1-ui-implementation\n');

let progress = readFileSync(progressPath, 'utf8');
progress = replaceLabeledTableRow(
	progress,
	'Current phase marker',
	'| Current phase marker | phase-1-ui-implementation |'
);
progress = replaceLabeledTableRow(
	progress,
	'Current phase artifact',
	'| Current phase artifact | `task-workflow/phase-1-ui-implementation.md` |'
);
progress = replaceLabeledTableRow(
	progress,
	'Current phase references',
	'| Current phase references | `references/phase-1-ui-implementation.md` |'
);
progress = replaceLabeledTableRow(progress, 'Earliest failing phase', '| Earliest failing phase | Phase 1 entry not yet permitted |');
progress = replaceLabeledTableRow(
	progress,
	'Last completed gate',
	'| Last completed gate | Phase 0 source contract: Pass |'
);
progress = replaceLabeledTableRow(
	progress,
	'Sole next local action',
	'| Sole next local action | Run `begin-phase-1-packet.mjs` before the first target implementation write |'
);
progress = replaceLabeledTableRow(
	progress,
	'Active files',
	'| Active files | `task-workflow/phase-1-ui-implementation.md`; `task-workflow/progress.md` |'
);
progress = replaceLabeledTableRow(progress, 'Last updated', `| Last updated | ${receipt.promotedAt} |`);
progress = replaceCurrentPacketRow(
	progress,
	'| Phase 1 entry | Ordered tokens/themes/primitives packet | Target inspection is read-only | None | Run `begin-phase-1-packet.mjs` before the first target implementation write |'
);
progress = replaceLabeledTableRow(
	progress,
	'0',
	'| 0 | `phase-0-source-contract` - Pass | `phase-0-source-contract.md` | `phase-0-source-contract.md`; `playwright-lifecycle.md` | 50/50 plus critical pass |'
);
progress = replaceLabeledTableRow(
	progress,
	'1',
	'| 1 | `phase-1-ui-implementation` - Entry pending | `phase-1-ui-implementation.md` | `phase-1-ui-implementation.md` | first-packet permit, then at least `48/50` plus critical pass |'
);
progress = prependTableDataRow(
	progress,
	'## Gate And Invalidation Ledger',
	'| Phase 0 promoted | Phase 0 | None | No | Read Phase 1 reference, inspect target read-only, then run the first-packet permit |'
);
writeFileSync(progressPath, progress);
console.log(JSON.stringify(receipt, null, 2));
console.log('\nPHASE 0 GATE: PASS');
console.log('MANDATORY NEXT ACTION: read references/phase-1-ui-implementation.md before any target implementation write.');
console.log(
	'After read-only target inspection, run task-workflow/scripts/begin-phase-1-packet.mjs with the required contract, evidence, file, and outcome arguments. Any target write before that gate passes contaminates the run.'
);
