import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';

const origin = process.argv[2] ?? 'http://127.0.0.1:4330';
if (!/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(origin)) throw new Error('Use a local production-preview origin.');
const errors = [];
let checks = 0;
const request = async path => {
  const response = await fetch(new URL(path, origin), { redirect:'manual' });
  checks++;
  return response;
};
for (const path of ['/', '/projects/', '/projects/metafam/', '/resume/', '/writing/', '/topics/quantum-computing/', '/404.html']) {
  const response = await request(path);
  const html = await response.text();
  if (response.status !== 200 || !html.includes('<h1')) errors.push(`${path}: expected rendered HTML`);
}
const files = directory => readdirSync(directory).flatMap(name => {
  const path = join(directory,name);
  return statSync(path).isDirectory() ? files(path) : [path];
});
for (const file of files('dist/personal_page').filter(file=>file.endsWith('.html'))) {
  const path = `/${relative('dist',file).split(sep).join('/').replace(/index\.html$/, '')}`;
  const response = await request(path);
  const html = await response.text();
  const target = readFileSync(file,'utf8').match(/name="redirect-destination" content="([^"]+)"/)?.[1];
  if (response.status !== 200 || !target || !html.includes(`content="${target}"`)) errors.push(`${path}: compatibility HTML unavailable`);
}
for (const path of ['/not-a-real-page/', '/personal_page/not-a-real-page/', '/writing/leakage-aware-evaluation/', '/personal_page/writing/leakage-aware-evaluation/']) {
  const response = await request(path);
  if (response.status !== 404 || !(await response.text()).includes('Page not found')) errors.push(`${path}: expected genuine 404`);
}
const expectedHash = createHash('sha256').update(readFileSync('public/cv.pdf')).digest('hex');
for (const path of ['/cv.pdf', '/personal_page/cv.pdf']) {
  const response = await request(path);
  const hash = createHash('sha256').update(new Uint8Array(await response.arrayBuffer())).digest('hex');
  if (response.status !== 200 || hash !== expectedHash) errors.push(`${path}: CV download mismatch`);
}
if (errors.length) throw new Error(errors.join('\n'));
console.log(`Production preview passed ${checks} HTTP checks: root pages, all compatibility HTML pages, genuine unknown/draft 404s and both unchanged CV downloads.`);
