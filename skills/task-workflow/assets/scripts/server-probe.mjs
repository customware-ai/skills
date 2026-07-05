#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { createWriteStream, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

function parsePositiveInt(value, label) {
	const parsed = Number(value);
	if (!Number.isInteger(parsed) || parsed <= 0) {
		throw new Error(`${label} must be a positive integer`);
	}
	return parsed;
}

function parseArgs(argv) {
	const args = {
		runs: [],
		env: [],
		cwd: process.cwd(),
		runtimeDir: 'task-workflow/runtime',
		readyTimeoutMs: 20000,
		commandTimeoutMs: 60000
	};

	for (let index = 0; index < argv.length; index += 1) {
		const arg = argv[index];
		const next = () => {
			index += 1;
			if (index >= argv.length) {
				throw new Error(`${arg} requires a value`);
			}
			return argv[index];
		};

		if (arg === '--cwd') {
			args.cwd = next();
		} else if (arg === '--server') {
			args.server = next();
		} else if (arg === '--ready-url') {
			args.readyUrl = next();
		} else if (arg === '--ready-text') {
			args.readyText = next();
		} else if (arg === '--run') {
			args.runs.push(next());
		} else if (arg === '--env') {
			args.env.push(next());
		} else if (arg === '--runtime-dir') {
			args.runtimeDir = next();
		} else if (arg === '--ready-timeout-ms') {
			args.readyTimeoutMs = parsePositiveInt(next(), '--ready-timeout-ms');
		} else if (arg === '--command-timeout-ms') {
			args.commandTimeoutMs = parsePositiveInt(next(), '--command-timeout-ms');
		} else if (arg === '--slow-start-reason') {
			args.slowStartReason = next();
		} else {
			throw new Error(`Unknown argument: ${arg}`);
		}
	}

	if (!args.server) {
		throw new Error('--server is required');
	}
	if (!args.readyUrl) {
		throw new Error('--ready-url is required');
	}
	if (args.readyTimeoutMs > 30000 && !args.slowStartReason?.trim()) {
		throw new Error('--ready-timeout-ms may exceed 30000 only with --slow-start-reason');
	}

	return args;
}

function buildEnv(args) {
	const env = { ...process.env };

	if (args.readyUrl && !env.TARGET_URL) {
		const url = new URL(args.readyUrl);
		env.TARGET_URL = `${url.protocol}//${url.host}`;
	}

	for (const entry of args.env) {
		const separatorIndex = entry.indexOf('=');
		if (separatorIndex <= 0) {
			throw new Error(`Invalid --env value: ${entry}`);
		}

		env[entry.slice(0, separatorIndex)] = entry.slice(separatorIndex + 1);
	}

	return env;
}

async function probeReady(url, readyText) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), 1500);
	try {
		const response = await fetch(url, { signal: controller.signal });
		if (!response.ok) {
			return false;
		}
		if (!readyText) {
			return true;
		}
		const text = await response.text();
		return text.includes(readyText);
	} catch {
		return false;
	} finally {
		clearTimeout(timer);
	}
}

function killProcessGroup(pid, signal) {
	try {
		process.kill(-pid, signal);
		return true;
	} catch {
		try {
			process.kill(pid, signal);
			return true;
		} catch {
			return false;
		}
	}
}

function spawnLogged(command, options) {
	mkdirSync(dirname(options.logPath), { recursive: true });
	const log = createWriteStream(options.logPath, { flags: 'w' });
	const child = spawn('bash', ['-lc', command], {
		cwd: options.cwd,
		env: options.env,
		detached: true,
		stdio: ['ignore', 'pipe', 'pipe']
	});
	child.stdout.pipe(log, { end: false });
	child.stderr.pipe(log, { end: false });
	child.stdout.pipe(process.stdout, { end: false });
	child.stderr.pipe(process.stderr, { end: false });
	child.once('close', () => log.end());
	return child;
}

async function runCommand(command, options) {
	const child = spawnLogged(command, options);
	let timedOut = false;
	const timeout = setTimeout(() => {
		timedOut = true;
		killProcessGroup(child.pid, 'SIGTERM');
		setTimeout(() => killProcessGroup(child.pid, 'SIGKILL'), 2000).unref();
	}, options.timeoutMs);

	const exitCode = await new Promise((resolve) => {
		child.once('close', (code, signal) => resolve(code ?? (signal ? 128 : 1)));
	});
	clearTimeout(timeout);

	if (timedOut) {
		throw new Error(`Command timed out after ${options.timeoutMs}ms; output preserved at ${options.logPath}`);
	}
	if (exitCode !== 0) {
		throw new Error(`Command failed with exit ${exitCode}; output preserved at ${options.logPath}`);
	}
}

async function startServer(args, env, runtimeDir) {
	if (await probeReady(args.readyUrl, args.readyText)) {
		throw new Error(
			`Ready URL already responds before startup: ${args.readyUrl}. Use a task-owned port or stop the known PID outside this helper.`
		);
	}

	const logPath = resolve(runtimeDir, 'server-probe.log');
	const pidPath = resolve(runtimeDir, 'server-probe.pid');
	const child = spawnLogged(args.server, { cwd: args.cwd, env, logPath });
	writeFileSync(pidPath, `${child.pid}\n`);

	const deadline = Date.now() + args.readyTimeoutMs;
	while (Date.now() < deadline) {
		if (await probeReady(args.readyUrl, args.readyText)) {
			console.log(`[server-probe] Server ready at ${args.readyUrl}; pid=${child.pid}; log=${logPath}`);
			return { pid: child.pid, logPath };
		}

		if (child.exitCode !== null) {
			throw new Error(`Server exited before readiness; log preserved at ${logPath}`);
		}

		await delay(250);
	}

	killProcessGroup(child.pid, 'SIGTERM');
	await delay(500);
	killProcessGroup(child.pid, 'SIGKILL');
	throw new Error(`Server was not ready within ${args.readyTimeoutMs}ms; log preserved at ${logPath}`);
}

const args = parseArgs(process.argv.slice(2));
const cwd = resolve(args.cwd);
const runtimeDir = resolve(cwd, args.runtimeDir);
mkdirSync(runtimeDir, { recursive: true });
const env = buildEnv(args);

let startedPid = null;
try {
	const server = await startServer({ ...args, cwd }, env, runtimeDir);
	startedPid = server.pid;
	let index = 0;
	for (const command of args.runs) {
		index += 1;
		const logPath = resolve(runtimeDir, `server-probe-run-${String(index).padStart(2, '0')}.log`);
		console.log(`[server-probe] Running command ${index}: ${command}`);
		await runCommand(command, { cwd, env, logPath, timeoutMs: args.commandTimeoutMs });
	}
	console.log('[server-probe] Completed successfully');
} finally {
	if (startedPid) {
		killProcessGroup(startedPid, 'SIGTERM');
		await delay(500);
		killProcessGroup(startedPid, 'SIGKILL');
		console.log(`[server-probe] Stopped server pid=${startedPid}`);
	}
}
