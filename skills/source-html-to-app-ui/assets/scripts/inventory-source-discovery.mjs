#!/usr/bin/env node
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import { chromium } from 'playwright';

const root = process.cwd();
const sourceUrl = process.env.SOURCE_URL;
const mode = process.env.DISCOVERY_MODE;
const allowedModes = new Set(['pages-desktop', 'pages-mobile', 'states-desktop', 'states-mobile', 'shell']);
if (!sourceUrl || !allowedModes.has(mode)) {
	throw new Error(`SOURCE_URL and DISCOVERY_MODE (${[...allowedModes].join(', ')}) are required`);
}

const inventoryPath = resolve(root, 'task-workflow/source/discovery/source-inventory.json');
const manifestPath = resolve(root, 'task-workflow/source/discovery/manifest.json');
const discoveryRoot = resolve(root, 'task-workflow/source/discovery/');
const inventory = JSON.parse(readFileSync(inventoryPath, 'utf8'));
const candidateCount = mode.startsWith('pages-') ? inventory.pages.length : mode.startsWith('states-') ? inventory.states.length : 1;
const batchStart = Number(process.env.DISCOVERY_BATCH_START ?? 0);
const batchEnd = Number(process.env.DISCOVERY_BATCH_END ?? candidateCount);
const finalBatch = process.env.DISCOVERY_FINAL_BATCH !== 'false';
if (
	!Number.isInteger(batchStart) ||
	!Number.isInteger(batchEnd) ||
	batchStart < 0 ||
	batchEnd < batchStart ||
	batchEnd > candidateCount
) {
	throw new Error(`Invalid discovery batch [${batchStart}, ${batchEnd}) for ${candidateCount} candidates`);
}
mkdirSync(discoveryRoot, { recursive: true });

function safeId(value) {
	return value.replace(/[^a-zA-Z0-9_-]+/g, '-').replace(/^-|-$/g, '').slice(0, 160);
}

function imagePath(...parts) {
	const path = resolve(discoveryRoot, ...parts);
	mkdirSync(dirname(path), { recursive: true });
	return path;
}

function relativeImage(path) {
	return relative(root, path);
}

function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

async function createContactSheet(page, cards, output, title) {
	const content = cards
		.map(({ path, label }) => {
			const data = readFileSync(path).toString('base64');
			return `<article><h2>${escapeHtml(label)}</h2><img src="data:image/png;base64,${data}"></article>`;
		})
		.join('');
	await page.setContent(`<!doctype html><html><head><style>
			*{box-sizing:border-box}body{margin:0;padding:20px;background:#ddd;color:#111;font:15px/1.4 monospace}
			h1{margin:0 0 20px}article{margin:0 0 20px;padding:12px;background:#fff;border:3px solid #111}
			h2{margin:0 0 10px;font-size:16px}img{display:block;max-width:100%;height:auto;border:1px solid #777}
		</style></head><body><h1>${escapeHtml(title)}</h1>${content}</body></html>`);
	await page.waitForFunction(() => [...document.images].every((image) => image.complete));
	await page.screenshot({ path: output, fullPage: true });
}

function newManifest() {
	return {
		initialInventoryFingerprint: inventory.initialInventoryFingerprint,
		generatedAt: new Date().toISOString(),
		completedModes: [],
		surfaceCoverage: [],
		stateCoverage: [],
		shellEvidence: [],
		inputActions: [],
		images: [],
		inspectionImages: [],
		inspectionCoverage: []
	};
}

const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : newManifest();
if (manifest.initialInventoryFingerprint !== inventory.initialInventoryFingerprint) {
	throw new Error('Existing manifest belongs to another source inventory');
}
manifest.inspectionImages ||= [];
manifest.inspectionCoverage ||= [];

function addImage(path) {
	const value = relativeImage(path);
	if (!manifest.images.includes(value)) {
		manifest.images.push(value);
	}
	return value;
}

function upsert(entries, candidateId, create) {
	let entry = entries.find((item) => item.candidateId === candidateId);
	if (!entry) {
		entry = create();
		entries.push(entry);
	}
	return entry;
}

async function settle(page) {
	await page.evaluate(async () => {
		await document.fonts.ready;
		await new Promise((resolveFrame) => requestAnimationFrame(resolveFrame));
		for (const animation of document.getAnimations()) {
			const endTime = animation.effect?.getComputedTiming().endTime;
			if (Number.isFinite(endTime) && animation.playState === 'running') {
				try {
					animation.finish();
				} catch {
					// A browser-owned animation may become non-finishable between inspection and finish.
				}
			}
		}
		await new Promise((resolveFrame) => requestAnimationFrame(() => requestAnimationFrame(resolveFrame)));
	});
	await page.waitForFunction(() =>
		document.getAnimations().every((animation) => {
			const endTime = animation.effect?.getComputedTiming().endTime;
			return !Number.isFinite(endTime) || animation.playState !== 'running';
		})
	);
}

function pageSelector(sourcePage) {
	return sourcePage.sourceSelectors.find((selector) => selector.startsWith('#view-')) || sourcePage.sourceSelectors[0];
}

async function locatorIsInViewport(locator) {
	return (
		(await locator.isVisible()) &&
		(await locator.evaluate((element) => {
			const rect = element.getBoundingClientRect();
			return rect.right > 0 && rect.bottom > 0 && rect.left < innerWidth && rect.top < innerHeight;
		}))
	);
}

async function revealNavigationControl(page, selector) {
	const locator = page.locator(selector).first();
	const actions = [];
	if (!(await locatorIsInViewport(locator))) {
		console.log(`Opening mobile navigation for ${selector}`);
		const menu = page.locator('.menu-toggle').first();
		if (await menu.isVisible()) {
			await menu.click();
			actions.push('click .menu-toggle');
			console.log(`Mobile navigation toggle clicked for ${selector}`);
			await page.locator('.sidebar.open').waitFor({ state: 'visible' });
			await page.waitForFunction((controlSelector) => {
				const element = document.querySelector(controlSelector);
				if (!element) return false;
				const rect = element.getBoundingClientRect();
				return rect.right > 0 && rect.bottom > 0 && rect.left < innerWidth && rect.top < innerHeight;
			}, selector);
			console.log(`Mobile navigation opened for ${selector}`);
		}
	}
	if (!(await locatorIsInViewport(locator))) {
		throw new Error(`Source control is not reachable in the viewport: ${selector}`);
	}
	return { locator, actions };
}

async function clickVisible(page, selector) {
	const { locator } = await revealNavigationControl(page, selector);
	console.log(`Clicking source control ${selector}`);
	await locator.click();
	console.log(`Clicked source control ${selector}`);
	return selector;
}

async function reachPage(page, sourcePage) {
	const selector = pageSelector(sourcePage);
	const surface = page.locator(selector).first();
	if (await surface.isVisible()) {
		return { selector, action: 'Default source load shows this page' };
	}
	const triggers = sourcePage.sourceSelectors.filter((candidate) => candidate !== selector);
	for (const trigger of triggers) {
		if ((await page.locator(trigger).count()) === 0) {
			continue;
		}
		await clickVisible(page, trigger);
		await surface.waitFor({ state: 'visible' });
		await settle(page);
		return { selector, action: `click ${trigger}` };
	}
	throw new Error(`No real-input reach control found for ${sourcePage.candidateId}`);
}

async function openSourcePage(browser, viewport) {
	const context = await browser.newContext({ viewport });
	const page = await context.newPage();
	const browserErrors = [];
	page.on('pageerror', (error) => browserErrors.push(error.message));
	page.on('console', (message) => {
		if (message.type() === 'error') {
			browserErrors.push(message.text());
		}
	});
	await page.goto(sourceUrl, { waitUntil: 'domcontentloaded' });
	await page.waitForFunction(async () => {
		await document.fonts.ready;
		return [...document.images].every((image) => image.complete);
	});
	await settle(page);
	return { context, page, browserErrors };
}

async function openContactSheetPage(browser) {
	const context = await browser.newContext({ viewport: { width: 1200, height: 900 } });
	return { context, page: await context.newPage() };
}

async function captureSections(page, sourcePage, viewportName) {
	const owner = page.locator(pageSelector(sourcePage)).first();
	const candidates = owner.locator(
		':scope > .content, .wizard-steps, .stats-grid, .filter-bar, .alert, .panel, .table-wrap, .equipment-list, .split-layout'
	);
	const paths = [];
	for (let index = 0; index < (await candidates.count()); index += 1) {
		const section = candidates.nth(index);
		if (!(await section.isVisible())) {
			continue;
		}
		const box = await section.boundingBox();
		if (!box || box.width < 80 || box.height < 35) {
			continue;
		}
		const output = imagePath(
			'pages',
			viewportName,
			safeId(sourcePage.candidateId),
			`section-${String(index + 1).padStart(2, '0')}.png`
		);
		await section.screenshot({ path: output });
		paths.push(output);
	}
	if (paths.length === 0) {
		const output = imagePath('pages', viewportName, safeId(sourcePage.candidateId), 'section-01.png');
		await owner.screenshot({ path: output });
		paths.push(output);
	}
	return paths;
}

async function capturePages(browser, viewportName, viewport) {
	const source = await openSourcePage(browser, viewport);
	const sheets = await openContactSheetPage(browser);
	try {
		for (const sourcePage of inventory.pages.slice(batchStart, batchEnd)) {
			console.log(`Capturing ${viewportName} page: ${sourcePage.candidateId}`);
			source.browserErrors.length = 0;
			if (sourcePage.disabled === true) {
				const selector = sourcePage.sourceSelectors[0];
				const revealed = await revealNavigationControl(source.page, selector);
				await settle(source.page);
				const output = imagePath('pages', viewportName, safeId(sourcePage.candidateId), 'disabled-destination.png');
				await source.page.screenshot({ path: output });
				const coverage = upsert(manifest.surfaceCoverage, sourcePage.candidateId, () => ({
					candidateId: sourcePage.candidateId,
					label: sourcePage.label,
					status: 'disabled',
					reachSteps: [`Load ${sourceUrl}`, ...revealed.actions, `locate ${selector}`],
					inputActions: revealed.actions.length > 0 ? revealed.actions : [`inspect disabled ${selector}`],
					desktopImage: null,
					mobileImage: null
				}));
				const disabledImage = addImage(output);
				coverage[`${viewportName}Image`] = disabledImage;
				const inspectionPath = imagePath(
					'inspection',
					'pages',
					viewportName,
					`${safeId(sourcePage.candidateId)}.png`
				);
				await createContactSheet(
					sheets.page,
					[{ path: output, label: `${sourcePage.candidateId} disabled destination` }],
					inspectionPath,
					`${viewportName} disabled page evidence — ${sourcePage.label}`
				);
				inspectionEntry(inspectionPath, [disabledImage]);
				manifest.inputActions.push(`${viewportName} ${sourcePage.candidateId}: inspect source-disabled ${selector}`);
				console.log(`Captured ${viewportName} disabled page destination: ${sourcePage.candidateId}`);
				continue;
			}
			const reach = await reachPage(source.page, sourcePage);
			console.log(`Reached ${viewportName} page: ${sourcePage.candidateId}`);
			const fullPagePath = imagePath('pages', viewportName, safeId(sourcePage.candidateId), 'full-page.png');
			await source.page.screenshot({ path: fullPagePath, fullPage: true });
			console.log(`Captured ${viewportName} full page: ${sourcePage.candidateId}`);
			const sectionPaths = await captureSections(source.page, sourcePage, viewportName);
			console.log(`Captured ${viewportName} sections: ${sourcePage.candidateId} (${sectionPaths.length})`);
			const sectionSheetPath = imagePath(
				'pages',
				viewportName,
				safeId(sourcePage.candidateId),
				'section-contact-sheet.png'
			);
			await createContactSheet(
				sheets.page,
				sectionPaths.map((path, index) => ({ path, label: `Section ${index + 1}` })),
				sectionSheetPath,
				`${viewportName} ${sourcePage.label}`
			);
			console.log(`Captured ${viewportName} section sheet: ${sourcePage.candidateId}`);
			const evidence = {
				fullPage: addImage(fullPagePath),
				sections: [addImage(sectionSheetPath)],
				geometry: await source.page.evaluate(() => ({
					viewport: { width: innerWidth, height: innerHeight },
					document: {
						scrollWidth: document.documentElement.scrollWidth,
						scrollHeight: document.documentElement.scrollHeight,
						clientWidth: document.documentElement.clientWidth,
						clientHeight: document.documentElement.clientHeight
					}
				})),
				browserErrors: [...source.browserErrors]
			};
			if (source.browserErrors.length > 0) {
				throw new Error(`${sourcePage.candidateId} emitted browser errors: ${source.browserErrors.join('; ')}`);
			}
			const coverage = upsert(manifest.surfaceCoverage, sourcePage.candidateId, () => ({
				candidateId: sourcePage.candidateId,
				label: sourcePage.label,
				status: 'captured',
				reachSteps: [`Load ${sourceUrl}`, reach.action],
				inputActions: [reach.action],
				desktop: null,
				mobile: null
			}));
			coverage[viewportName] = evidence;
			const inspectionPath = imagePath(
				'inspection',
				'pages',
				viewportName,
				`${safeId(sourcePage.candidateId)}.png`
			);
			await createContactSheet(
				sheets.page,
				[
					{ path: fullPagePath, label: `${sourcePage.candidateId} full page` },
					{ path: sectionSheetPath, label: `${sourcePage.candidateId} visible sections` }
				],
				inspectionPath,
				`${viewportName} page evidence — ${sourcePage.label}`
			);
			inspectionEntry(inspectionPath, [evidence.fullPage, ...evidence.sections]);
			manifest.inputActions.push(`${viewportName} ${sourcePage.candidateId}: ${reach.action}`);
			console.log(`Captured ${viewportName} page: ${sourcePage.candidateId}`);
		}
	} finally {
		await sheets.context.close();
		await source.context.close();
	}
}

function stateSelector(sourceState) {
	const direct = sourceState.sourceSelectors[0];
	if (direct) {
		return direct;
	}
	const match = sourceState.candidateId.match(/::(data-filter|data-cat|data-step):(.+):\d+$/);
	if (!match) {
		throw new Error(`No selector for ${sourceState.candidateId}`);
	}
	return `[${match[1]}="${match[2]}"]`;
}

async function revealStateControl(page, sourcePage, control, selector) {
	if (await control.isVisible()) {
		return [];
	}
	const step = await control.evaluate((element) => {
		const panel = element.closest('[id^="step-"]');
		return panel?.id.match(/^step-(\d+)$/)?.[1] || null;
	});
	if (step !== null) {
		const trigger = page.locator(pageSelector(sourcePage)).locator(`[data-step="${step}"]`).first();
		await trigger.click();
		await control.waitFor({ state: 'visible' });
		await settle(page);
		return [`click [data-step="${step}"]`];
	}
	throw new Error(`No real-input prerequisite found for source state control: ${selector}`);
}

async function captureStates(browser, viewportName, viewport) {
	const source = await openSourcePage(browser, viewport);
	const sheets = await openContactSheetPage(browser);
	const inspectionCards = [];
	try {
		for (const sourceState of inventory.states.slice(batchStart, batchEnd)) {
			console.log(`Capturing ${viewportName} state: ${sourceState.candidateId}`);
			const sourcePage = inventory.pages.find((candidate) => candidate.candidateId === sourceState.ownerPageCandidateId);
			if (!sourcePage) {
				throw new Error(`Missing owner page for ${sourceState.candidateId}`);
			}
			source.browserErrors.length = 0;
			const reach = await reachPage(source.page, sourcePage);
			if (sourceState.candidateId.includes('::data-cat:') && sourcePage.candidateId.includes('new-quote')) {
				await source.page.locator('[data-step="1"]').first().click();
				await source.page.locator('#step-1').waitFor({ state: 'visible' });
				await settle(source.page);
			}
			const selector = stateSelector(sourceState);
			const control = source.page.locator(pageSelector(sourcePage)).locator(selector).first();
			const prerequisiteActions = await revealStateControl(source.page, sourcePage, control, selector);
			await control.waitFor({ state: 'visible' });
			if (sourceState.disabled !== true) {
				await control.click();
			}
			await settle(source.page);
			const output = imagePath('states', viewportName, `${safeId(sourceState.candidateId)}.png`);
			await source.page.screenshot({ path: output, fullPage: true });
			if (source.browserErrors.length > 0) {
				throw new Error(`${sourceState.candidateId} emitted browser errors: ${source.browserErrors.join('; ')}`);
			}
			const coverage = upsert(manifest.stateCoverage, sourceState.candidateId, () => ({
				candidateId: sourceState.candidateId,
				label: sourceState.label,
				status: sourceState.disabled === true ? 'disabled' : 'captured',
				reachSteps: [
					`Load ${sourceUrl}`,
					reach.action,
					...prerequisiteActions,
					sourceState.disabled === true ? `inspect disabled ${selector}` : `click ${selector}`
				],
				inputActions: [
					reach.action,
					...prerequisiteActions,
					sourceState.disabled === true ? `inspect disabled ${selector}` : `click ${selector}`
				],
				desktopImage: null,
				mobileImage: null
			}));
			const evidenceImage = addImage(output);
			coverage[`${viewportName}Image`] = evidenceImage;
			inspectionCards.push({ path: output, evidenceImage, label: sourceState.candidateId });
			manifest.inputActions.push(
				`${viewportName} ${sourceState.candidateId}: ${sourceState.disabled === true ? 'inspect source-disabled' : 'click'} ${selector}`
			);
			console.log(`Captured ${viewportName} state: ${sourceState.candidateId}`);
		}
		if (inspectionCards.length > 0) {
			const inspectionPath = imagePath(
				'inspection',
				'states',
				viewportName,
				`batch-${String(batchStart).padStart(4, '0')}-${String(batchEnd).padStart(4, '0')}.png`
			);
			await createContactSheet(
				sheets.page,
				inspectionCards.map((card) => ({ path: card.path, label: card.label })),
				inspectionPath,
				`${viewportName} state evidence — inventory candidates ${batchStart}-${batchEnd}`
			);
			inspectionEntry(
				inspectionPath,
				inspectionCards.map((card) => card.evidenceImage)
			);
		}
	} finally {
		await sheets.context.close();
		await source.context.close();
	}
}

async function captureShell(browser) {
	manifest.shellEvidence = [];
	const desktop = await openSourcePage(browser, { width: 1440, height: 600 });
	try {
		const beforePath = imagePath('shell', 'desktop-before-scroll.png');
		await desktop.page.screenshot({ path: beforePath });
		const before = await desktop.page.locator('.sidebar').evaluate((element) => {
			const rect = element.getBoundingClientRect();
			return { top: rect.top, bottom: rect.bottom, height: rect.height, position: getComputedStyle(element).position };
		});
		await desktop.page.mouse.wheel(0, 1200);
		await desktop.page.waitForFunction(() => window.scrollY > 0);
		const afterPath = imagePath('shell', 'desktop-after-scroll.png');
		await desktop.page.screenshot({ path: afterPath });
		const after = await desktop.page.locator('.sidebar').evaluate((element) => {
			const rect = element.getBoundingClientRect();
			return { top: rect.top, bottom: rect.bottom, height: rect.height, position: getComputedStyle(element).position };
		});
		manifest.shellEvidence.push({ kind: 'desktop-sidebar-scroll', before, after, images: [addImage(beforePath), addImage(afterPath)] });
		manifest.inputActions.push('desktop shell: mouse wheel 1200');
	} finally {
		await desktop.context.close();
	}

	const mobile = await openSourcePage(browser, { width: 390, height: 844 });
	try {
		const closedPath = imagePath('shell', 'mobile-drawer-closed.png');
		await mobile.page.screenshot({ path: closedPath });
		await mobile.page.locator('.menu-toggle').click();
		await mobile.page.locator('.sidebar.open').waitFor({ state: 'visible' });
		await settle(mobile.page);
		const openPath = imagePath('shell', 'mobile-drawer-open.png');
		await mobile.page.screenshot({ path: openPath });
		const geometry = await mobile.page.evaluate(() => {
			const sidebar = document.querySelector('.sidebar').getBoundingClientRect();
			const overlay = document.querySelector('.sidebar-overlay').getBoundingClientRect();
			return {
				sidebar: { top: sidebar.top, bottom: sidebar.bottom, width: sidebar.width, height: sidebar.height },
				overlay: { top: overlay.top, bottom: overlay.bottom, width: overlay.width, height: overlay.height },
				bodyOverflow: getComputedStyle(document.body).overflow
			};
		});
		await mobile.page.locator('.sidebar-overlay').click({ position: { x: 380, y: 400 } });
		await mobile.page.waitForFunction(() => {
			const sidebar = document.querySelector('.sidebar');
			return !sidebar.classList.contains('open') && sidebar.getBoundingClientRect().right <= 0;
		});
		manifest.shellEvidence.push({
			kind: 'mobile-drawer',
			geometry,
			images: [addImage(closedPath), addImage(openPath)]
		});
		manifest.inputActions.push('mobile shell: open drawer and close through overlay');
	} finally {
		await mobile.context.close();
	}

	const shellImages = manifest.shellEvidence.flatMap((entry) => entry.images || []);
	const sheets = await openContactSheetPage(browser);
	try {
		const inspectionPath = imagePath('inspection', 'shell.png');
		await createContactSheet(
			sheets.page,
			shellImages.map((path, index) => ({ path: resolve(root, path), label: `Shell evidence ${index + 1}` })),
			inspectionPath,
			'Desktop scroll and mobile drawer evidence'
		);
		inspectionEntry(inspectionPath, shellImages);
	} finally {
		await sheets.context.close();
	}
}

function inspectionEntry(sheetPath, evidenceImages) {
	const sheet = relativeImage(sheetPath);
	manifest.inspectionImages = manifest.inspectionImages.filter((path) => path !== sheet);
	manifest.inspectionCoverage = manifest.inspectionCoverage.filter((entry) => entry.sheet !== sheet);
	manifest.inspectionImages.push(sheet);
	manifest.inspectionCoverage.push({ sheet, evidenceImages });
}

function verifyInspectionCoverage() {
	const covered = manifest.inspectionCoverage.flatMap((entry) => entry.evidenceImages);
	if (
		covered.length !== manifest.images.length ||
		new Set(covered).size !== covered.length ||
		manifest.images.some((path) => !covered.includes(path))
	) {
		throw new Error('Inspection corpus must cover every discovery evidence image exactly once');
	}
}

const browser = await chromium.launch({ headless: true });
try {
	if (mode === 'pages-desktop') {
		await capturePages(browser, 'desktop', { width: 1440, height: 900 });
	} else if (mode === 'pages-mobile') {
		await capturePages(browser, 'mobile', { width: 390, height: 844 });
	} else if (mode === 'states-desktop') {
		await captureStates(browser, 'desktop', { width: 1440, height: 900 });
	} else if (mode === 'states-mobile') {
		await captureStates(browser, 'mobile', { width: 390, height: 844 });
	} else {
		await captureShell(browser);
		verifyInspectionCoverage();
	}
	if (finalBatch && !manifest.completedModes.includes(mode)) {
		manifest.completedModes.push(mode);
	}
	manifest.generatedAt = new Date().toISOString();
	writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
	console.log(`INVENTORY SOURCE DISCOVERY: PASS (${mode} candidates ${batchStart}-${batchEnd} of ${candidateCount})`);
	console.log(
		`Manifest now contains ${manifest.surfaceCoverage.length} page entries, ${manifest.stateCoverage.length} state entries, ${manifest.images.length} evidence images, and ${manifest.inspectionImages.length} complete inspection sheets.`
	);
} finally {
	await browser.close();
}
