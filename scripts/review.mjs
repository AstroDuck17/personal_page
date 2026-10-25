import { spawn } from 'node:child_process';
const command = process.argv[2] ?? 'dev';
if (!['dev', 'build'].includes(command)) throw new Error('Expected dev or build');
const child = spawn(process.execPath, ['scripts/astro.mjs', command, ...(command === 'dev' ? ['--host', '127.0.0.1', '--port', '4322'] : [])], {
  env: { ...process.env, REVIEW_DRAFTS: 'true' }, stdio: 'inherit'
});
child.on('exit', code => process.exit(code ?? 1));
