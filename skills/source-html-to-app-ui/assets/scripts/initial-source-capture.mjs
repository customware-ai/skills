#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { chromium } from 'playwright';

const sourceUrl = process.env.SOURCE_URL;
if (!sourceUrl) {
	throw new Error('SOURCE_URL is required');
}

const outputRoot = resolve(process.cwd(), 'task-workflow/source');
mkdirSync(resolve(outputRoot, 'desktop'), { recursive: true });
mkdirSync(resolve(outputRoot, 'mobile'), { recursive: true });

async function waitForRenderablePage(page) {
	await page.goto(sourceUrl, { waitUntil: 'domcontentloaded' });
	await page.waitForFunction(async () => {
		await document.fonts.ready;
		return [...document.images].every((image) => image.complete);
	});
}

async function markSections(page) {
	return page.evaluate(() => {
		const preferred = [
			...document.querySelectorAll(
				'header, nav, aside, main, main > section, main > article, section, article, footer, [role="banner"], [role="navigation"], [role="main"], [role="complementary"], [role="contentinfo"]'
			)
		];
		const fallback = [...document.body.children, ...document.querySelectorAll('main > div')];
		const candidates = preferred.length >= 3 ? preferred : [...preferred, ...fallback];
		const seen = new Set();
		const sections = [];
		for (const element of candidates) {
			if (!(element instanceof HTMLElement) || seen.has(element)) {
				continue;
			}
			seen.add(element);
			const rect = element.getBoundingClientRect();
			const style = getComputedStyle(element);
			if (style.display === 'none' || style.visibility === 'hidden' || rect.width < 80 || rect.height < 40) {
				continue;
			}
			const id = `source-capture-${sections.length + 1}`;
			element.dataset.sourceCaptureId = id;
			sections.push({
				id,
				tag: element.tagName.toLowerCase(),
				role: element.getAttribute('role'),
				label:
					element.getAttribute('aria-label') ||
					element.querySelector('h1, h2, h3')?.textContent?.trim().slice(0, 100) ||
					null,
				x: Math.round(rect.x + window.scrollX),
				y: Math.round(rect.y + window.scrollY),
				width: Math.round(rect.width),
				height: Math.round(rect.height)
			});
			if (sections.length === 20) {
				break;
			}
		}
		return sections;
	});
}

async function captureViewport(browser, name, viewport) {
	const context = await browser.newContext({ viewport });
	const page = await context.newPage();
	const consoleErrors = [];
	const pageErrors = [];
	page.on('console', (message) => {
		if (message.type() === 'error') {
			consoleErrors.push(message.text());
		}
	});
	page.on('pageerror', (error) => pageErrors.push(error.message));

	try {
		await waitForRenderablePage(page);
		const directory = resolve(outputRoot, name);
		await page.screenshot({ path: resolve(directory, 'full-page.png'), fullPage: true });
		await page.screenshot({ path: resolve(directory, 'viewport.png') });
		const geometry = await page.evaluate(() => ({
			url: location.href,
			title: document.title,
			viewport: { width: window.innerWidth, height: window.innerHeight },
			document: {
				scrollWidth: document.documentElement.scrollWidth,
				scrollHeight: document.documentElement.scrollHeight,
				clientWidth: document.documentElement.clientWidth,
				clientHeight: document.documentElement.clientHeight,
				scrollTop: document.documentElement.scrollTop
			}
		}));
		const sections = await markSections(page);
		for (let index = 0; index < sections.length; index += 1) {
			const section = sections[index];
			await page
				.locator(`[data-source-capture-id="${section.id}"]`)
				.screenshot({ path: resolve(directory, `section-${String(index + 1).padStart(2, '0')}.png`) });
		}
		return {
			name,
			viewport,
			geometry,
			sections,
			consoleErrors,
			pageErrors,
			images: {
				fullPage: `task-workflow/source/${name}/full-page.png`,
				viewport: `task-workflow/source/${name}/viewport.png`,
				sections: sections.map(
					(_, index) => `task-workflow/source/${name}/section-${String(index + 1).padStart(2, '0')}.png`
				)
			}
		};
	} finally {
		await context.close();
	}
}

function escapeHtml(value) {
	return String(value)
		.replaceAll('&', '&amp;')
		.replaceAll('<', '&lt;')
		.replaceAll('>', '&gt;')
		.replaceAll('"', '&quot;')
		.replaceAll("'", '&#039;');
}

async function captureSectionContactSheet(browser, capture) {
	const cards = capture.images.sections.map((path, index) => {
		const section = capture.sections[index];
		const data = readFileSync(resolve(process.cwd(), path)).toString('base64');
		const label = [
			`Section ${index + 1}`,
			section.tag,
			section.role ? `role=${section.role}` : null,
			section.label,
			`${section.width}×${section.height} at (${section.x}, ${section.y})`
		]
			.filter(Boolean)
			.join(' — ');
		return `<article><h2>${escapeHtml(label)}</h2><img src="data:image/png;base64,${data}" alt="${escapeHtml(label)}"></article>`;
	});
	const context = await browser.newContext({ viewport: { width: 1200, height: 900 } });
	const page = await context.newPage();
	try {
		await page.setContent(`<!doctype html>
			<html><head><meta charset="utf-8"><style>
				* { box-sizing: border-box; }
				body { margin: 0; padding: 24px; background: #d7d7d7; color: #111; font: 16px/1.4 ui-monospace, monospace; }
				h1 { margin: 0 0 24px; font-size: 28px; }
				article { margin: 0 0 28px; padding: 16px; background: white; border: 3px solid #111; }
				h2 { margin: 0 0 12px; font-size: 17px; }
				img { display: block; max-width: 100%; height: auto; border: 1px solid #777; }
			</style></head><body><h1>${escapeHtml(capture.name)} source sections</h1>${cards.join('')}</body></html>`);
		await page.waitForFunction(() => [...document.images].every((image) => image.complete));
		const output = resolve(outputRoot, capture.name, 'section-contact-sheet.png');
		await page.screenshot({ path: output, fullPage: true });
		return `task-workflow/source/${capture.name}/section-contact-sheet.png`;
	} finally {
		await context.close();
	}
}

const browser = await chromium.launch({ headless: true });
try {
	const captures = [];
	captures.push(await captureViewport(browser, 'desktop', { width: 1440, height: 900 }));
	captures.push(await captureViewport(browser, 'mobile', { width: 390, height: 844 }));
	for (const capture of captures) {
		capture.images.sectionContactSheet = await captureSectionContactSheet(browser, capture);
	}
	const requiredInspectionImages = [
		captures[0].images.fullPage,
		captures[0].images.sectionContactSheet,
		captures[1].images.fullPage,
		captures[1].images.sectionContactSheet
	];
	const result = { sourceUrl, capturedAt: new Date().toISOString(), requiredInspectionImages, captures };
	writeFileSync(resolve(outputRoot, 'initial-capture.json'), `${JSON.stringify(result, null, 2)}\n`);
	console.log(JSON.stringify(result, null, 2));
	console.log('\nMANDATORY NEXT ACTION: read task-workflow/source/initial-capture.json.');
	console.log('Then open these four paths with four separate sequential image-read tool calls in this exact order before any other read.');
	console.log('Do not batch or parallelize them. Wait for and inspect each image result before requesting the next:');
	for (const path of requiredInspectionImages) {
		console.log(path);
	}
	const errors = captures.flatMap((capture) => [...capture.consoleErrors, ...capture.pageErrors]);
	if (errors.length > 0) {
		throw new Error(`Source emitted browser errors:\n${errors.join('\n')}`);
	}
} finally {
	await browser.close();
}
