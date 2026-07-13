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
if (scriptArgs.length === 0) {
	fail('Usage: node task-workflow/scripts/validate-source-discovery.mjs <custom-source-script.mjs> [...]');
}

const scripts = [];
for (const arg of scriptArgs) {
	const path = resolve(root, arg);
	const allowedRoot = resolve(root, 'task-workflow/source-playwright');
	if (!path.startsWith(`${allowedRoot}/`) || path.endsWith('/initial-source-capture.mjs') || !existsSync(path)) {
		fail(`Custom script must exist under task-workflow/source-playwright/: ${arg}`);
	}
	const text = readFileSync(path, 'utf8');
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
	if (!text.includes('task-workflow/source/discovery/')) {
		fail(`${arg} must write screenshots under task-workflow/source/discovery/.`);
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

const receiptPath = resolve(root, 'task-workflow/source/discovery/script-validation.json');
mkdirSync(dirname(receiptPath), { recursive: true });
const receipt = { validatedAt: new Date().toISOString(), scripts };
writeFileSync(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));
console.log('\nSOURCE DISCOVERY PRE-RUN: PASS');
console.log('MANDATORY NEXT ACTION: node task-workflow/scripts/run-validated-source-discovery.mjs <validated-script-path>');
console.log('Do not invoke playwright-lifecycle.mjs directly for this custom source discovery run.');
console.log('Do not use 60000 ms unless a prior 20000 ms run failed only by a silent timer and the required triage is recorded.');
