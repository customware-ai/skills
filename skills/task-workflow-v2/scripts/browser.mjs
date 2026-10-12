import { randomUUID } from 'node:crypto';
import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { resolve, join } from 'node:path';
import { evidenceDirectory } from './evidence.mjs';

/**
 * Resolve only through the target project's dependency graph; never install a browser.
 * @param {string} cwd
 * @returns {typeof import('playwright-core')}
 */
function loadPlaywright(cwd) {
	const require = createRequire(resolve(cwd, 'package.json'));
	for (const name of ['playwright', '@playwright/test', 'playwright-core']) {
		let entry;
		try {
			entry = require.resolve(name);
		} catch (error) {
			if (!(error instanceof Error) || !('code' in error) || error.code !== 'MODULE_NOT_FOUND') throw error;
			continue;
		}
		return require(entry);
	}
	throw new Error(`Playwright is not installed in the target project: ${cwd}. Use its existing dependencies/cache.`);
}

/** @typedef {{committed:boolean,start:number}} StreamCloseOwner */
/** @typedef {{type:string,url:string,pageId?:string,method?:string,message?:string,status?:number,browserResource?:boolean,request?:import('playwright-core').Request,closeOwner?:StreamCloseOwner,phase?:'verification'|'teardown'}} Issue */
/** @typedef {{label:string,request?:import('playwright-core').Request,match?:((issue:Issue)=>boolean),count:number,start:number,seen:number,twin:boolean}} Expectation */
/** @typedef {'release'|'fail'|'cancel'} Action */
/** @typedef {{cwd?:string,url?:string|null,outputDir?:string,viewport?:import('playwright-core').ViewportSize}} BrowserOptions */

/**
 * Open a fresh browser with task-scoped evidence and bounded request interception.
 * @param {BrowserOptions} [options]
 */
async function openBrowser({
	cwd = process.cwd(),
	url = process.env.TARGET_URL,
	outputDir = process.env.TW_RUN_DIR,
	viewport = { width: 1440, height: 900 }
} = {}) {
	if (!outputDir) throw new Error('outputDir or TW_RUN_DIR is required for browser evidence.');
	const directory = evidenceDirectory(cwd, outputDir);
	const { chromium } = loadPlaywright(cwd);
	const browser = await chromium.launch({ headless: true });
	/** @type {import('playwright-core').BrowserContext|undefined} */
	let openedContext;
	try {
		const context = await browser.newContext({ viewport });
		openedContext = context;
		const page = await context.newPage();
		page.setDefaultTimeout(10000);
		/** @type {Issue[]} */
		const issues = [];
		/** @type {Expectation[]} */
		const expectations = [];
		/** @type {Array<()=>Promise<void>>} */
		const gates = [];
		/** @type {unknown[]} */
		const routingErrors = [];
		/** @type {Map<import('playwright-core').Page,string>} */
		const observedPages = new Map();
		/** @type {Array<{operation:Promise<unknown>,cancel:(error:unknown)=>void}>} */
		const exchanges = [];
		/** @type {Set<import('playwright-core').Request>} */
		const inFlight = new Set();
		/** @type {Map<import('playwright-core').Request,{page:import('playwright-core').Page,closeOwner:StreamCloseOwner|null}>} */
		const streams = new Map();
		/** @type {PromiseWithResolvers<void>} */
		let idle = Promise.withResolvers();
		let closing = false;
		/** @type {StreamCloseOwner|null} */
		let teardownOwner = null;
		let pageCount = 0;
		/** @param {Issue} issue */
		function recordIssue(issue) {
			issue.phase = closing ? 'teardown' : 'verification';
			issues.push(issue);
		}
		/** @param {Issue} issue @param {import('playwright-core').Request} request */
		function recordNetworkIssue(issue, request) {
			const stream = streams.get(request);
			Object.defineProperty(issue, 'closeOwner', { value: stream && (closing ? teardownOwner : stream.closeOwner) });
			Object.defineProperty(issue, 'request', { value: request });
			recordIssue(issue);
		}
		/** @param {import('playwright-core').Request} request */
		function requestSettled(request) {
			inFlight.delete(request);
			if (!inFlight.size) idle.resolve();
		}
		/** @param {import('playwright-core').Page} target */
		function observePage(target) {
			if (observedPages.has(target)) return target;
			const pageId = `page-${++pageCount}`;
			observedPages.set(target, pageId);
			target.on('request', request => {
				if (!inFlight.size) idle = Promise.withResolvers();
				inFlight.add(request);
			});
			target.on('requestfinished', request => {
				streams.delete(request);
				requestSettled(request);
			});
			target.on('pageerror', error => recordIssue({ type: 'pageerror', pageId, url: target.url(), message: error.message }));
			target.on('console', message => {
				if (message.type() === 'error')
					recordIssue({ type: 'consoleerror', pageId, url: message.location().url || target.url(), message: message.text(), browserResource: message.args().length === 0 && message.text().startsWith('Failed to load resource:') });
			});
			target.on('requestfailed', request => {
				recordNetworkIssue({ type: 'requestfailed', pageId, url: request.url(), method: request.method(), message: request.failure()?.errorText }, request);
				streams.delete(request);
				requestSettled(request);
			});
			target.on('response', response => {
				if (response.status() >= 200 && response.status() < 300 &&
					/^text\/event-stream(?:\s*;|\s*$)/i.test(response.headers()['content-type'] ?? '')) {
					streams.set(response.request(), { page: target, closeOwner: null });
					requestSettled(response.request());
				}
				if (response.status() >= 400)
					recordNetworkIssue({ type: 'http', pageId, url: response.url(), method: response.request().method(), status: response.status() }, response.request());
			});
			return target;
		}
		observePage(page);
		context.on('page', observePage);

		/** @param {Promise<never>} deadline */
		async function waitForRequests(deadline) {
			do {
				while (inFlight.size) {
					await Promise.race([idle.promise, deadline]);
				}
				for (const target of observedPages.keys()) {
					if (!target.isClosed()) await Promise.race([target.evaluate(() => undefined), deadline]);
				}
			} while (inFlight.size);
		}
		/** @param {(deadline:Promise<never>)=>Promise<void>} work @param {number} timeoutMs */
		async function withRequestDeadline(work, timeoutMs) {
			let timer;
			const deadline = new Promise((_, reject) => {
				timer = setTimeout(() => {
					const pending = [];
					for (const request of inFlight) pending.push(`${request.method()} ${request.url()}`);
					reject(new Error(`Browser verification did not settle within ${timeoutMs}ms. In-flight requests: ${pending.join(', ')}`));
				}, timeoutMs);
			});
			try { await work(deadline); }
			finally { clearTimeout(timer); }
		}

		const kit = {
			browser,
			context,
			page,
			issues,
			observePage,
			/** Settle finite work without waiting for an acknowledged realtime stream to end. */
			async settle({ timeoutMs = 10000 } = {}) {
				await withRequestDeadline(waitForRequests, timeoutMs);
			},
			/**
			 * Await a native document-replacing navigation after settling finite work.
			 * Old live streams belong to this cutover only after a different main-frame document commits.
			 * @template T
			 * @param {()=>Promise<T>} action
			 * @param {{page?:import('playwright-core').Page,timeoutMs?:number}} [options]
			 */
			async navigate(action, { page: target = page, timeoutMs = 10000 } = {}) {
				observePage(target);
				await kit.settle({ timeoutMs });
				const owner = { committed: false, start: issues.length };
				for (const stream of streams.values()) {
					if (stream.page === target) stream.closeOwner = owner;
				}
				const session = await context.newCDPSession(target);
				try {
					await session.send('Page.enable');
					const { frameTree } = await session.send('Page.getFrameTree');
					/** @param {{frame: typeof frameTree.frame}} event */
					function navigated({ frame }) {
						if (frame.id === frameTree.frame.id && frame.loaderId !== frameTree.frame.loaderId)
							owner.committed = true;
					}
					session.on('Page.frameNavigated', navigated);
					const result = await action();
					await kit.settle({ timeoutMs });
					return result;
				} finally {
					for (const stream of streams.values()) {
						if (stream.closeOwner === owner) stream.closeOwner = null;
					}
					await session.detach();
				}
			},
			/** @param {string} name @param {{page?:import('playwright-core').Page}} [options] */
			async screenshot(name, { page: target = page } = {}) {
				observePage(target);
				if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(name))
					throw new Error('Screenshot name must be a path-safe label.');
				const path = join(directory, `${name}-${randomUUID()}.png`);
				await writeFile(path, await target.screenshot({ type: 'png', fullPage: false }), { flag: 'wx' });
				return path;
			},
			/**
			 * Capture the first matching request begun during the action, not an older response.
			 * The caller's exact predicate/inputs establish ownership; timing alone does not.
			 * Await this before subsequent navigation. Read the body immediately at response time.
			 * @param {(request:import('playwright-core').Request)=>boolean} matches
			 * @param {()=>Promise<unknown>} action
			 * @param {{page?:import('playwright-core').Page,timeoutMs?:number,label?:string,readBody?:(response:import('playwright-core').Response)=>Promise<unknown>}} [options]
			 */
			exchange(matches, action, { page: target = page, timeoutMs = 10000, label = 'exchange', readBody = response => response.json() } = {}) {
				observePage(target);
				const interrupted = Promise.withResolvers();
				const operation = (async () => {
					/** @type {import('playwright-core').Request|undefined} */
					let request;
					/** @type {import('playwright-core').Response|undefined} */
					let response;
					let captureDone = false;
					let actionState = 'pending';
					const unmatched = [];
					/** @param {import('playwright-core').Request} candidate */
					function describe(candidate) {
						return `${candidate.method()} ${new URL(candidate.url()).pathname}`;
					}
					const captured = Promise.withResolvers();
					/** @param {import('playwright-core').Request} candidate */
					function onRequest(candidate) {
						if (request) return;
						try {
							if (matches(candidate)) request = candidate;
							else if (unmatched.length < 20) unmatched.push(describe(candidate));
						}
						catch (error) { captured.reject(error); }
					}
					/** @param {import('playwright-core').Response} candidate */
					function onResponse(candidate) {
						if (!request || candidate.request() !== request) return;
						response = candidate;
						captured.resolve(Promise.resolve().then(() => readBody(candidate))
							.then(body => { captureDone = true; return { request, response: candidate, body }; })
							.catch(error => { throw new Error(`Action-owned response body capture failed: ${describe(request)}`, { cause: error }); }));
					}
					/** @param {import('playwright-core').Request} candidate */
					function onFailed(candidate) {
						if (candidate === request)
							captured.reject(new Error(`Action-owned request failed: ${candidate.method()} ${candidate.url()}: ${candidate.failure()?.errorText}`));
					}
					let timer;
					const deadline = new Promise((_, reject) => {
						timer = setTimeout(() => {
							let state;
							if (!request) state = `no matching request (action ${actionState}); unmatched requests: ${unmatched.join(', ') || 'none'}`;
							else if (!response) state = `matched ${describe(request)}; no response yet (action ${actionState})`;
							else if (!captureDone) state = `${response.status()} for ${describe(request)}; body read pending (action ${actionState})`;
							else state = `response captured; action still ${actionState}`;
							reject(new Error(`Exchange "${label}" did not settle within ${timeoutMs}ms: ${state}.`));
						}, timeoutMs);
					});
					target.on('request', onRequest);
					target.on('response', onResponse);
					target.on('requestfailed', onFailed);
					try {
						const run = Promise.resolve().then(action).then(value => { actionState = 'done'; return value; }, error => { actionState = 'failed'; throw error; });
						const result = await Promise.race([Promise.all([run, captured.promise]), deadline, interrupted.promise]);
						return result[1];
					} finally {
						clearTimeout(timer);
						target.off('request', onRequest);
						target.off('response', onResponse);
						target.off('requestfailed', onFailed);
					}
				})();
				operation.catch(error => routingErrors.push(error));
				exchanges.push({ operation, cancel: error => interrupted.reject(error) });
				return operation;
			},
			/**
			 * Register before a deliberate failure. A captured Request owns its network outcome;
			 * app-authored issues require a labeled predicate and exact count.
			 * @param {{label:string,request?:import('playwright-core').Request,match?:(issue:Issue)=>boolean,count?:number}} expected
			 */
			expectIssue({ label, request, match, count = 1 }) {
				if (!label) throw new Error('Expected issue needs a label.');
				if (Boolean(request) === Boolean(match)) throw new Error('Pass exactly one of request or match.');
				if (!Number.isInteger(count) || count < 1)
					throw new Error('Expected issue count must be a positive integer.');
				if (request && count !== 1) throw new Error('A request expectation owns one network outcome; omit count.');
				if (request && expectations.some(item => item.request === request))
					throw new Error('This request already has an expected failure.');
				expectations.push({ label, request, match, count, start: issues.length, seen: 0, twin: false });
			},
			/**
			 * Await registration before triggering the request. Cancellation before a hit resolves null.
			 * Function predicates receive the same actual Request as exchange, not a URL.
			 * @param {string|RegExp|((request:import('playwright-core').Request)=>boolean)} pattern
			 * @param {{timeoutMs?:number,page?:import('playwright-core').Page}} [options]
			 */
			async hold(pattern, { timeoutMs = 10000, page: target = page } = {}) {
				observePage(target);
				const routePattern = typeof pattern === 'function' ? '**/*' : pattern;
				/** @type {PromiseWithResolvers<import('playwright-core').Request|null>} */
				const hitState = Promise.withResolvers();
				const { promise: hit, resolve: resolveHit, reject: rejectHit } = hitState;
				// Retain failures for finish even when a caller forgets to await hit.
				hit.catch((error) => routingErrors.push(error));
				/** @type {PromiseWithResolvers<Action>} */
				const decisionState = Promise.withResolvers();
				const { promise: decision, resolve: decide } = decisionState;
				/** @type {PromiseWithResolvers<void>} */
				const handledState = Promise.withResolvers();
				const { promise: handled, resolve: resolveHandled } = handledState;
				let matched = false;
				/** @type {Promise<void>|undefined} */
				let completion;
				/** @type {ReturnType<typeof setTimeout>|undefined} */
				let timer;
				/** @param {import('playwright-core').Route} route */
				async function handler(route) {
					if (matched) return route.fallback();
					try {
						if (typeof pattern === 'function' && !pattern(route.request())) return route.fallback();
					} catch (error) {
						matched = true;
						clearTimeout(timer);
						rejectHit(error);
						try { await route.abort('failed'); }
						catch (abortError) { routingErrors.push(abortError); }
						finally { resolveHandled(); }
						return;
					}
					matched = true;
					clearTimeout(timer);
					resolveHit(route.request());
					const action = await decision;
					try {
						if (action === 'release') await route.continue();
						else {
							if (action === 'cancel')
								routingErrors.push(
									new Error(
										`Held request left unfinished: ${route.request().method()} ${route.request().url()}`
									)
								);
							await route.abort('failed');
						}
					} catch (error) {
						routingErrors.push(error);
					} finally {
						resolveHandled();
					}
				}
				/** @param {Action} action */
				async function cleanup(action) {
					clearTimeout(timer);
					decide(action);
					if (!matched) resolveHit(null);
					// Removing interception before abort completes can resume the real request.
					if (matched) await handled;
					await target.unroute(routePattern, handler);
					if (matched) await handled;
				}
				/** @param {Action} action */
				function complete(action) {
					if (!completion) completion = cleanup(action);
					return completion;
				}
				await target.route(routePattern, handler);
				if (!matched)
					timer = setTimeout(() => {
						rejectHit(new Error(`Held request did not arrive within ${timeoutMs}ms.`));
						complete('cancel').catch((error) => routingErrors.push(error));
					}, timeoutMs);
				const gate = {
					hit,
					async release() {
						await complete('release');
					},
					async fail() {
						await complete('fail');
					}
				};
				gates.push(() => complete('cancel'));
				return gate;
			},
			/** Settle and judge verification before owned teardown; pending work at the deadline fails. */
			async finish({ timeoutMs = 10000 } = {}) {
				/** @type {unknown[]} */
				const errors = [];
				const canceled = Promise.allSettled(gates.map(cancel => cancel()));
				try {
					await withRequestDeadline(async deadline => {
						await Promise.race([canceled, deadline]);
						await Promise.race([Promise.allSettled(exchanges.map(exchange => exchange.operation)), deadline]);
						await waitForRequests(deadline);
					}, timeoutMs);
				} catch (error) {
					errors.push(error);
					for (const exchange of exchanges) exchange.cancel(error);
					await Promise.allSettled(exchanges.map(exchange => exchange.operation));
				}
				closing = true;
				teardownOwner = { committed: true, start: issues.length };
				try { await context.close(); }
				catch (error) { errors.push(error); }
				try { await browser.close(); }
				catch (error) { errors.push(error); }
				for (const result of await canceled) {
					if (result.status === 'rejected') errors.push(result.reason);
				}
				for (const error of routingErrors) errors.push(error);
				for (let index = 0; index < issues.length; index += 1) {
					const issue = issues[index];
					if (issue.type === 'requestfailed' && issue.message === 'net::ERR_ABORTED' &&
						issue.closeOwner?.committed && !expectations.some(item => item.request === issue.request)) {
						expectations.push({ label: 'owned realtime cancellation', request: issue.request, count: 1, start: issue.closeOwner.start, seen: 0, twin: false });
					}
				}
				try {
					for (let index = 0; index < issues.length; index += 1) {
						const issue = issues[index];
						const expected = expectations.find(item => index >= item.start && item.seen < item.count &&
							(item.request ? issue.request === item.request : item.match(issue)));
						if (expected) { expected.seen += 1; continue; }
						const twin = issue.browserResource && expectations.find(item => {
							if (!item.request || item.twin || index < item.start) return false;
							const network = issues.find((candidate, at) => at >= item.start && candidate.request === item.request);
							if (!network || issue.pageId !== network.pageId || issue.url !== network.url) return false;
							return network.type === 'http'
								? issue.message.startsWith(`Failed to load resource: the server responded with a status of ${network.status} `)
								: issue.message === `Failed to load resource: ${network.message}`;
						});
						if (twin) twin.twin = true;
						else errors.push(new Error(`${issue.phase === 'teardown' ? 'Unattributed browser issue during teardown' : 'Unexpected browser issue'}: ${JSON.stringify(issue)}`));
					}
					for (const expected of expectations) {
						if (expected.seen !== expected.count)
							errors.push(
								new Error(`Expected browser issue "${expected.label}" missing: saw ${expected.seen} of ${expected.count}.`)
							);
					}
				} catch (error) {
					errors.push(error);
				}
				if (errors.length)
					throw new AggregateError(errors, 'Browser verification failed.', { cause: errors[0] });
			}
		};
		if (url) await page.goto(url, { waitUntil: 'domcontentloaded' });
		return kit;
	} catch (error) {
		const errors = [error];
		if (openedContext) {
			try {
				await openedContext.close();
			} catch (closeError) {
				errors.push(closeError);
			}
		}
		try {
			await browser.close();
		} catch (closeError) {
			errors.push(closeError);
		}
		if (errors.length > 1) throw new AggregateError(errors, 'Browser setup and cleanup failed.');
		throw error;
	}
}

/**
 * Own the full journey lifecycle; do not copy try/finally cleanup into callers.
 * @template T
 * @param {(kit:Awaited<ReturnType<typeof openBrowser>>)=>Promise<T>} verify
 * @param {BrowserOptions} [options]
 */
export async function withBrowser(verify, options) {
	const kit = await openBrowser(options);
	const errors = [];
	function retain(error) {
		if (error instanceof AggregateError && error.errors.length) {
			for (const nested of error.errors) retain(nested);
		} else if (!errors.includes(error)) errors.push(error);
	}
	let result;
	try { result = await verify(kit); }
	catch (error) { retain(error); }
	try { await kit.finish(); }
	catch (error) { retain(error); }
	if (errors.length === 1) throw errors[0];
	if (errors.length) throw new AggregateError(errors, 'Browser verification failed.', { cause: errors[0] });
	return result;
}
