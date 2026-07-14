#!/usr/bin/env node
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { extname, resolve } from 'node:path';

function fail(message) {
	console.error(`PHASE 1 OWNER INVENTORY: FAIL\n${message}`);
	process.exit(1);
}

function sha256(value) {
	return createHash('sha256').update(value).digest('hex');
}

const root = process.cwd();
const workflow = resolve(root, 'task-workflow');
const markerPath = resolve(workflow, 'CURRENT_PHASE.txt');
const baselinePath = resolve(workflow, 'phase-0-target-baseline.json');
const outputPath = resolve(workflow, 'phase-1-owner-candidates.json');

if (!existsSync(markerPath) || readFileSync(markerPath, 'utf8').trim() !== 'phase-0-source-contract') {
	fail('Run this inventory only while CURRENT_PHASE.txt is phase-0-source-contract.');
}
if (!existsSync(baselinePath)) {
	fail('Missing task-workflow/phase-0-target-baseline.json.');
}
if (existsSync(outputPath)) {
	fail('phase-1-owner-candidates.json already exists. Read and use it; do not regenerate it.');
}

const excludedRoots = new Set(['.agents', '.git', 'dist', 'node_modules', 'task-workflow']);
const allowedExtensions = new Set(['.css', '.js', '.jsx', '.json', '.less', '.sass', '.scss', '.ts', '.tsx']);
const candidates = [];

function category(path) {
	if (/(?:^|\/)(?:app|index|global|main|root|style|theme|token)[^/]*\.(?:css|less|sass|scss)$/i.test(path)) return 'styles-and-tokens';
	if (/(?:^|\/)(?:layout|shell|sidebar|navigation|nav|drawer)[^/]*\.(?:jsx?|tsx?)$/i.test(path)) return 'shell-and-navigation';
	if (/(?:^|\/)routes?(?:\/|\.|$)|(?:^|\/)pages?\//i.test(path)) return 'routes-and-pages';
	if (/(?:^|\/)components?\/ui\//i.test(path)) return 'shared-primitives';
	if (/^(?:tailwind|vite|postcss)\.config\./i.test(path)) return 'ui-config';
	return 'other-ui-owner';
}

function visit(directory, relativeDirectory = '') {
	for (const entry of readdirSync(directory, { withFileTypes: true }).sort((left, right) => left.name.localeCompare(right.name))) {
		const path = relativeDirectory ? `${relativeDirectory}/${entry.name}` : entry.name;
		if (!relativeDirectory && excludedRoots.has(entry.name)) continue;
		const absolutePath = resolve(directory, entry.name);
		if (entry.isDirectory()) {
			visit(absolutePath, path);
			continue;
		}
		if (!entry.isFile() || !allowedExtensions.has(extname(entry.name))) continue;
		if (!/^(?:app|src|public)\//.test(path) && !/^(?:tailwind|vite|postcss)\.config\./.test(path)) continue;
		if (/(?:^|\/)(?:tests?|__tests__|fixtures?|generated|dist)\//i.test(path)) continue;
		const contents = readFileSync(absolutePath);
		candidates.push({ path, category: category(path), bytes: contents.length, sha256: sha256(contents) });
	}
}

visit(root);
if (candidates.length === 0) {
	fail('No existing UI owner candidates were found under app/, src/, public/, or root UI config files.');
}

const baseline = readFileSync(baselinePath);
const inventory = {
	phase: 'phase-0-source-contract',
	createdAt: new Date().toISOString(),
	targetBaselineSha256: sha256(baseline),
	candidateCount: candidates.length,
	candidates
};
writeFileSync(outputPath, `${JSON.stringify(inventory, null, 2)}\n`);

console.log(`PHASE 1 OWNER INVENTORY: PASS (${candidates.length} exact existing files)`);
console.log('MANDATORY NEXT ACTION: read task-workflow/phase-1-owner-candidates.json in full.');
console.log('TARGET INSPECTION IS NOW CLOSED: do not list, find, read, or probe target/public/brand/logo/directory paths except the exact selected owner reads below.');
console.log('Then select the smallest first-packet owner set from candidates[].path and read every selected file once, separately, and consecutively.');
console.log('ATOMIC LOCK: the literal next tool action after the last selected owner read must be node task-workflow/scripts/prepare-phase-1-packet.mjs with those exact paths.');
console.log('Do not check brand assets or read Phase 0 artifacts, gaps, progress, another implementation file, or another reference before packet preparation passes and its generated plan is read to EOF.');
