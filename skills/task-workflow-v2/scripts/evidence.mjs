import { existsSync, mkdirSync, realpathSync } from 'node:fs';
import { dirname, resolve, sep } from 'node:path';

/** Prepare evidence only inside the target repository's task-workflow folder. */
export function evidenceDirectory(cwd, directory = 'task-workflow/runs') {
	const workspace = realpathSync(cwd);
	const root = resolve(workspace, 'task-workflow');
	const target = resolve(workspace, directory);
	if (target !== root && !target.startsWith(root + sep))
		throw new Error('Verification evidence must stay inside <repository-root>/task-workflow.');
	let ancestor = target;
	while (!existsSync(ancestor)) ancestor = dirname(ancestor);
	const physical = realpathSync(ancestor);
	if (physical !== workspace && physical !== root && !physical.startsWith(root + sep))
		throw new Error('Verification evidence path escapes task-workflow through a symbolic link.');
	mkdirSync(target, { recursive: true });
	return target;
}
