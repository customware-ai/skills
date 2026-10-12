#!/usr/bin/env node
import { execFileSync, spawn, spawnSync } from 'node:child_process';
import {
	closeSync,
	existsSync,
	mkdirSync,
	mkdtempSync,
	openSync,
	readFileSync,
	readdirSync,
	readlinkSync,
	writeFileSync,
	writeSync
} from 'node:fs';
import { createConnection } from 'node:net';
import { resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { fileURLToPath } from 'node:url';
import { evidenceDirectory } from './evidence.mjs';

const MAX_TIMEOUT_MS = 3600000;
const MAX_LOG_BYTES = 64 * 1024 * 1024;

/** @typedef {{ step: string, message: string, exitCode: number }} Failure */
/** @typedef {{ step: string, log: string, pid: number | undefined, startedAt: string, endedAt: string | null, exitCode: number | null, signal: string | null }} Step */
/** @typedef {{ child: ReturnType<typeof spawn>, step: Step, fd: number, bytes: number, closed: Promise<void> }} Owner */
/** @typedef {{ owners: Owner[], failure: Failure | null, stop: ReturnType<typeof Promise.withResolvers<Failure>>, abort: AbortController, cleaning: boolean }} Control */

function printUsage() {
	console.log(`Usage: node verify.mjs [options] --run "command" [--run "command"]

  --cwd PATH                    Working directory (default: current directory).
  --setup "command"             Optional setup; repeatable, sequential.
  --server "command"            Optional helper-owned local server.
  --ready-url URL               Required with --server; loopback HTTP(S).
  --ready-text TEXT             Optional readiness response text.
  --run "command"               Required verification command; repeatable.
  --env NAME=value              Extra environment; repeatable.
  --setup-timeout-ms NUMBER      Per-setup limit (default: 120000).
  --ready-timeout-ms NUMBER      Startup limit (default: 30000).
  --command-timeout-ms NUMBER    Per-run limit (default: 120000).
  --help                        Show this help.

Timeouts must be integers from 1 to ${MAX_TIMEOUT_MS} milliseconds.
Each process log is limited to 64 MiB; excess output fails the run.
Every invocation creates a unique directory containing logs and result.json.
Requires Node.js 22 or newer. Commands execute through /bin/sh on macOS or Linux.
Commands must keep
descendants in their process group (no daemonization/detached children).
Native repo E2E commands own their server: omit --server and --ready-url.
Helper-server readiness and run preflight require listener ownership proof:
macOS needs lsof and ps; Linux needs readable /proc network/fd data and ps.
All listeners on the selected port must belong to the helper server's group.
If ownership cannot be established, verification fails without foreign cleanup.
This helper does not build, reset data, establish database isolation, reuse
existing servers, or update checkpoints. Verify the repo's isolated recipe first.
Command output is captured verbatim; keep secrets out of that output.`);
}

/** Parse the actual untrusted CLI boundary once. */
function parseArgs() {
	const args = {
		cwd: process.cwd(),
		setups: /** @type {string[]} */ ([]),
		runs: /** @type {string[]} */ ([]),
		env: /** @type {string[]} */ ([]),
		server: '',
		readyUrl: '',
		readyText: '',
		setupTimeoutMs: 120000,
		readyTimeoutMs: 30000,
		commandTimeoutMs: 120000
	};
	const argv = process.argv.slice(2);
	for (let index = 0; index < argv.length; index += 1) {
		const option = argv[index];
		const value = argv[index + 1];
		if (option === '--help' || option === '-h') return null;
		if (value === undefined) throw new Error('Option requires a value; use --help.');
		index += 1;
		switch (option) {
			case '--cwd':
				args.cwd = value;
				break;
			case '--setup':
				args.setups.push(value);
				break;
			case '--run':
				args.runs.push(value);
				break;
			case '--env':
				if (!/^[A-Za-z_][A-Za-z0-9_]*=/.test(value)) throw new Error('--env requires NAME=value.');
				args.env.push(value);
				break;
			case '--server':
				args.server = value;
				break;
			case '--ready-url':
				args.readyUrl = value;
				break;
			case '--ready-text':
				args.readyText = value;
				break;
			case '--setup-timeout-ms':
			case '--ready-timeout-ms':
			case '--command-timeout-ms': {
				const timeout = Number(value);
				if (!Number.isInteger(timeout) || timeout < 1 || timeout > MAX_TIMEOUT_MS) {
					throw new Error('Timeout must be an integer from 1 to 3600000 milliseconds.');
				}
				if (option === '--setup-timeout-ms') args.setupTimeoutMs = timeout;
				else if (option === '--ready-timeout-ms') args.readyTimeoutMs = timeout;
				else args.commandTimeoutMs = timeout;
				break;
			}
			default:
				throw new Error('Unknown option; use --help.');
		}
	}
	if (!args.runs.length || args.runs.some((command) => !command.trim())) throw new Error('--run is required.');
	if (Boolean(args.server) !== Boolean(args.readyUrl)) throw new Error('--server and --ready-url must be paired.');
	if (args.readyText && !args.server) throw new Error('--ready-text requires --server.');
	if (args.readyUrl) {
		let url;
		try {
			url = new URL(args.readyUrl);
		} catch {
			throw new Error('--ready-url must be a valid URL.');
		}
		if (
			!['http:', 'https:'].includes(url.protocol) ||
			!['localhost', '127.0.0.1', '[::1]'].includes(url.hostname) ||
			url.username ||
			url.password
		)
			throw new Error('--ready-url must be loopback HTTP(S) without credentials.');
	}
	if (!['darwin', 'linux'].includes(process.platform)) throw new Error('Only macOS and Linux are supported.');
	return args;
}

/** @param {Control} control @param {Failure} failure */
function fail(control, failure) {
	if (control.failure) return;
	control.failure = failure;
	control.stop.resolve(failure);
	control.abort.abort();
}

/** @param {Control} control @param {string} command @param {string} name @param {string} cwd @param {NodeJS.ProcessEnv} env @param {string} runDir */
function start(control, command, name, cwd, env, runDir) {
	const log = `${name}.log`;
	const fd = openSync(resolve(runDir, log), 'wx');
	let child;
	try {
		child = spawn('/bin/sh', ['-c', command], { cwd, env, detached: true, stdio: ['ignore', 'pipe', 'pipe'] });
	} catch (error) {
		closeSync(fd);
		throw error;
	}
	/** @type {ReturnType<typeof Promise.withResolvers<void>>} */
	const closed = Promise.withResolvers();
	/** @type {Owner} */
	const owner = {
		child,
		fd,
		bytes: 0,
		closed: closed.promise,
		step: {
			step: name,
			log,
			pid: child.pid,
			startedAt: new Date().toISOString(),
			endedAt: null,
			exitCode: null,
			signal: null
		}
	};
	control.owners.push(owner);
	/** @param {Buffer} chunk */
	function capture(chunk) {
		const remaining = MAX_LOG_BYTES - owner.bytes;
		try {
			if (remaining > 0) {
				const output = chunk.subarray(0, remaining);
				let written = 0;
				while (written < output.length) written += writeSync(fd, output, written);
				owner.bytes += written;
			}
		} catch {
			fail(control, { step: name, message: 'Cannot write command output.', exitCode: 1 });
		}
		if (chunk.length > remaining)
			fail(control, { step: name, message: 'Process output exceeded 64 MiB.', exitCode: 1 });
	}
	child.stdout?.on('data', capture);
	child.stderr?.on('data', capture);
	child.stdout?.on('error', () => fail(control, { step: name, message: 'Cannot read process output.', exitCode: 1 }));
	child.stderr?.on('error', () => fail(control, { step: name, message: 'Cannot read process output.', exitCode: 1 }));
	child.on('error', () => fail(control, { step: name, message: 'Cannot start process.', exitCode: 1 }));
	child.on('exit', (code, signal) => {
		owner.step.exitCode = code;
		owner.step.signal = signal;
		if (name === 'server' && !control.cleaning) {
			fail(control, {
				step: name,
				message: 'Server exited unexpectedly.',
				exitCode: code && code > 0 ? code : 1
			});
		}
	});
	child.on('close', () => {
		owner.step.endedAt = new Date().toISOString();
		closed.resolve();
	});
	return owner;
}

/** @param {Control} control @param {Owner} owner @param {number} timeoutMs */
async function waitCommand(control, owner, timeoutMs) {
	const timer = setTimeout(
		() =>
			fail(control, {
				step: owner.step.step,
				message: `Command timed out after ${timeoutMs}ms.`,
				exitCode: 124
			}),
		timeoutMs
	);
	try {
		await Promise.race([owner.closed, control.stop.promise]);
		if (!control.failure && owner.step.exitCode !== 0)
			fail(control, {
				step: owner.step.step,
				message: 'Command failed.',
				exitCode: owner.step.exitCode ?? 1
			});
	} finally {
		clearTimeout(timer);
	}
}

/** Detect any listener, not just a healthy HTTP response, before setup can mutate fixtures. @param {URL} url */
async function alreadyListening(url) {
	return new Promise((accept, reject) => {
		const socket = createConnection({
			host: url.hostname.replace(/^\[|\]$/g, ''),
			port: Number(url.port || (url.protocol === 'https:' ? 443 : 80))
		});
		socket.setTimeout(1500);
		socket.once('connect', () => {
			socket.destroy();
			accept(true);
		});
		socket.once('timeout', () => {
			socket.destroy();
			reject(new Error('Cannot establish endpoint availability.'));
		});
		socket.once('error', (error) => {
			socket.destroy();
			if ('code' in error && error.code === 'ECONNREFUSED') accept(false);
			else reject(new Error('Cannot establish endpoint availability.'));
		});
	});
}

/** @param {Control} control @param {Owner} server @param {string} url @param {string} text @param {number} timeoutMs */
async function waitReady(control, server, url, text, timeoutMs) {
	const timer = setTimeout(
		() =>
			fail(control, {
				step: 'readiness',
				message: `Server was not ready within ${timeoutMs}ms.`,
				exitCode: 124
			}),
		timeoutMs
	);
	try {
		while (!control.failure) {
			try {
				const signal = AbortSignal.any([control.abort.signal, AbortSignal.timeout(1500)]);
				const response = await fetch(url, { signal, redirect: 'error' });
				let ready = response.ok;
				if (text) {
					let body = '';
					const decoder = new TextDecoder();
					if (response.body)
						for await (const chunk of response.body) {
							body += decoder.decode(chunk, { stream: true });
							if (body.length > 1024 * 1024) {
								ready = false;
								break;
							}
						}
					ready = ready && body.includes(text);
				} else await response.body?.cancel();
				if (ready && !control.failure) {
					confirmListener(control, server, new URL(url), 'readiness');
					return;
				}
			} catch {
				/* A bounded unsuccessful probe is retried until the readiness deadline. */
			}
			if (!control.failure) await delay(100, undefined, { signal: control.abort.signal }).catch(() => {});
		}
	} finally {
		clearTimeout(timer);
	}
}

function readProcesses() {
	const output = execFileSync('ps', ['-axo', 'pid=,pgid=,stat='], {
		encoding: 'utf8',
		timeout: 1000,
		maxBuffer: 16 * 1024 * 1024
	});
	const processes = [];
	for (const line of output.split('\n')) {
		const [pid, group, state] = line.trim().split(/\s+/);
		if (state && !state.startsWith('Z')) processes.push({ pid: Number(pid), group: Number(group) });
	}
	return processes;
}

/** @param {Owner} server @param {URL} url */
function ownsListener(server, url) {
	const port = Number(url.port || (url.protocol === 'https:' ? 443 : 80));
	const processes = readProcesses();
	if (process.platform === 'darwin') {
		const listeners = spawnSync('/usr/sbin/lsof', ['-nP', `-iTCP:${port}`, '-sTCP:LISTEN', '-Fp'], {
			encoding: 'utf8',
			timeout: 1000,
			maxBuffer: 1024 * 1024,
			stdio: ['ignore', 'pipe', 'ignore']
		});
		if (listeners.error || (listeners.status !== 0 && listeners.status !== 1))
			throw new Error('Listener discovery failed.');
		let found = false;
		for (const line of listeners.stdout.split('\n')) {
			if (!line.startsWith('p')) continue;
			found = true;
			if (processes.find((entry) => entry.pid === Number(line.slice(1)))?.group !== server.step.pid) return false;
		}
		return found;
	}
	const inodes = [];
	for (const table of ['/proc/net/tcp', '/proc/net/tcp6']) {
		for (const line of readFileSync(table, 'utf8').split('\n')) {
			const fields = line.trim().split(/\s+/);
			if (fields[3] === '0A' && Number.parseInt(fields[1].split(':')[1], 16) === port) inodes.push(fields[9]);
		}
	}
	if (!inodes.length) return false;
	/** @type {string[]} */
	const ownedSockets = [];
	for (const entry of processes) {
		if (entry.group !== server.step.pid) continue;
		const fdDir = `/proc/${entry.pid}/fd`;
		let descriptors;
		try {
			descriptors = readdirSync(fdDir);
		} catch (error) {
			if (error instanceof Error && 'code' in error && error.code === 'ENOENT') continue;
			throw error;
		}
		for (const descriptor of descriptors) {
			try {
				ownedSockets.push(readlinkSync(`${fdDir}/${descriptor}`));
			} catch (error) {
				if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error;
			}
		}
	}
	return inodes.every((inode) => ownedSockets.includes(`socket:[${inode}]`));
}

/** @param {Control} control @param {Owner} server @param {URL} url @param {string} step */
function confirmListener(control, server, url, step) {
	try {
		if (ownsListener(server, url)) return;
		fail(control, {
			step,
			message: 'Readiness endpoint is not exclusively owned by the helper server process group.',
			exitCode: 1
		});
	} catch {
		fail(control, { step, message: 'Cannot establish readiness listener ownership.', exitCode: 1 });
	}
}

/** Zombies are already stopped; kill(0) alone misidentifies unreaped Linux descendants as live. @param {number} pid */
function groupAlive(pid) {
	return readProcesses().some((entry) => entry.group === pid);
}

/** @param {number} pid @param {NodeJS.Signals} signal */
function signalGroup(pid, signal) {
	try {
		process.kill(-pid, signal);
	} catch (error) {
		if (!(error instanceof Error && 'code' in error && error.code === 'ESRCH')) throw error;
	}
}

/** @param {number} pid @param {number} timeoutMs */
async function waitGroup(pid, timeoutMs) {
	const deadline = Date.now() + timeoutMs;
	while (groupAlive(pid)) {
		if (Date.now() >= deadline) return false;
		await delay(50);
	}
	return true;
}

/** @param {Promise<void>} closed */
async function waitClosed(closed) {
	let timer;
	try {
		return await Promise.race([
			closed.then(() => true),
			new Promise((accept) => {
				timer = setTimeout(() => accept(false), 1000);
			})
		]);
	} finally {
		clearTimeout(timer);
	}
}

/** @param {Control} control */
async function cleanup(control) {
	control.cleaning = true;
	const errors = [];
	for (const owner of control.owners) {
		let stopped = owner.step.pid === undefined;
		let shutdownError = false;
		try {
			if (owner.step.pid !== undefined) {
				signalGroup(owner.step.pid, 'SIGTERM');
				stopped = await waitGroup(owner.step.pid, 1000);
			}
		} catch {
			shutdownError = true;
			/* A failed shutdown probe must not prevent the KILL attempt. */
		}
		if (!stopped && owner.step.pid !== undefined) {
			try {
				signalGroup(owner.step.pid, 'SIGKILL');
				stopped = await waitGroup(owner.step.pid, 1000);
			} catch {
				shutdownError = true;
				/* Preserve the failure below while still closing output and evidence. */
			}
		}
		if (!stopped || shutdownError)
			errors.push({
				step: owner.step.step,
				message: stopped
					? 'Process-group shutdown check failed.'
					: 'Could not confirm complete process-group shutdown.'
			});
		try {
			const closed = await waitClosed(owner.closed);
			if (!closed) {
				owner.child.stdout?.destroy();
				owner.child.stderr?.destroy();
				throw new Error('Process output did not close.');
			}
		} catch {
			errors.push({ step: owner.step.step, message: 'Process output did not close after shutdown.' });
		} finally {
			try {
				closeSync(owner.fd);
			} catch {
				errors.push({ step: owner.step.step, message: 'Could not close evidence log.' });
			}
		}
	}
	return errors;
}

async function main() {
	let args;
	try {
		args = parseArgs();
	} catch (error) {
		console.error(error instanceof Error ? error.message : 'Invalid options; use --help.');
		return 2;
	}
	if (!args) {
		printUsage();
		return 0;
	}
	const cwd = resolve(args.cwd);
	let runDir;
	try {
		const parent = evidenceDirectory(cwd);
		runDir = mkdtempSync(resolve(parent, 'run-'));
	} catch (error) {
		console.error(`Cannot create evidence directory: ${error instanceof Error ? error.message : error}`);
		return 1;
	}
	/** @type {Control} */
	const control = {
		owners: [],
		failure: null,
		stop: Promise.withResolvers(),
		abort: new AbortController(),
		cleaning: false
	};
	/** @param {NodeJS.Signals} signal */
	function interrupted(signal) {
		fail(control, {
			step: 'signal',
			message: `Interrupted by ${signal}.`,
			exitCode: signal === 'SIGINT' ? 130 : 143
		});
	}
	const sigint = () => interrupted('SIGINT');
	const sigterm = () => interrupted('SIGTERM');
	process.on('SIGINT', sigint);
	process.on('SIGTERM', sigterm);
	console.log(`[verify] Evidence: ${runDir}`);
	const startedAt = new Date().toISOString();
	let stage = 'preflight';
	/** @type {Owner | undefined} */
	let server;
	try {
		const env = Object.assign({}, process.env);
		for (const entry of args.env) {
			const separator = entry.indexOf('=');
			env[entry.slice(0, separator)] = entry.slice(separator + 1);
		}
		env.TW_RUN_DIR = runDir;
		env.TW_BROWSER_KIT = fileURLToPath(new URL('./browser.mjs', import.meta.url));
		if (!env.PLAYWRIGHT_BROWSERS_PATH && existsSync('/ms-playwright'))
			env.PLAYWRIGHT_BROWSERS_PATH = '/ms-playwright';
		if (args.readyUrl) {
			const url = new URL(args.readyUrl);
			env.TARGET_URL = url.origin;
			if (await alreadyListening(url))
				fail(control, {
					step: stage,
					message: 'Readiness endpoint is already listening; no setup or server was started.',
					exitCode: 1
				});
		}
		for (let index = 0; index < args.setups.length && !control.failure; index += 1) {
			stage = `setup-${index + 1}`;
			await waitCommand(
				control,
				start(control, args.setups[index], stage, cwd, env, runDir),
				args.setupTimeoutMs
			);
		}
		if (args.server && !control.failure) {
			stage = 'server-preflight';
			if (await alreadyListening(new URL(args.readyUrl)))
				fail(control, {
					step: stage,
					message:
						'Readiness endpoint became occupied during setup; no helper server or verification command was started.',
					exitCode: 1
				});
			if (!control.failure) {
				stage = 'server';
				server = start(control, args.server, stage, cwd, env, runDir);
				await waitReady(control, server, args.readyUrl, args.readyText, args.readyTimeoutMs);
			}
		}
		for (let index = 0; index < args.runs.length && !control.failure; index += 1) {
			stage = `run-${index + 1}`;
			if (server) confirmListener(control, server, new URL(args.readyUrl), `${stage}-preflight`);
			if (control.failure) break;
			await waitCommand(
				control,
				start(control, args.runs[index], stage, cwd, env, runDir),
				args.commandTimeoutMs
			);
		}
	} catch (error) {
		fail(control, { step: stage, message: `Verification helper operation failed: ${error instanceof Error ? error.message : error}`, exitCode: 1 });
	}
	const cleanupErrors = await cleanup(control);
	let exitCode = control.failure?.exitCode ?? (cleanupErrors.length ? 1 : 0);
	const result = {
		startedAt,
		endedAt: new Date().toISOString(),
		status: exitCode === 0 ? 'passed' : 'failed',
		exitCode,
		failure: control.failure,
		cleanupErrors,
		steps: control.owners.map((owner) => owner.step)
	};
	try {
		writeFileSync(resolve(runDir, 'result.json'), `${JSON.stringify(result, null, 2)}\n`, { flag: 'wx' });
	} catch {
		console.error('[verify] Cannot write result.json.');
		exitCode = exitCode || 1;
	}
	process.off('SIGINT', sigint);
	process.off('SIGTERM', sigterm);
	console.log(`[verify] ${exitCode === 0 ? 'Passed' : 'Failed'}; exit ${exitCode}.`);
	return exitCode;
}

process.exitCode = await main();
