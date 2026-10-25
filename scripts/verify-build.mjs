import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve('dist');
const base = '/personal_page/';
const isReview = process.argv.includes('--review');
const errors = [];
const files = dir => readdirSync(dir).flatMap(file=>statSync(join(dir,file)).isDirectory() ? files(join(dir,file)) : [join(dir,file)]);
if (!existsSync(root)) throw new Error('Run npm run build first.');
const allFiles = files(root);
const htmlFiles = allFiles.filter(file=>file.endsWith('.html'));
const idCache = new Map();
const ids = file => {
  if (!idCache.has(file)) idCache.set(file, new Set([...readFileSync(file,'utf8').matchAll(/\bid=["']([^"']+)["']/g)].map(match=>match[1])));
  return idCache.get(file);
};
for (const file of htmlFiles) {
  const html = readFileSync(file,'utf8');
  const rel = relative(root,file).split(sep).join('/');
  if (/D:\\college|C:\\Users\\Dell/i.test(html)) errors.push(`${rel}: local source path leaked`);
  if (!isReview && /leakage-aware-evaluation|UNPUBLISHED REVIEW DRAFT|includes unpublished drafts/.test(html)) errors.push(`${rel}: draft leaked into release`);
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']*)["']/g)) {
    const raw = match[1].replaceAll('&amp;','&');
    if (!raw || /^(mailto:|tel:|https?:|data:|javascript:)/.test(raw)) continue;
    const pageUrl = `https://local.test${base}${rel.endsWith('index.html') ? rel.slice(0,-10) : rel}`;
    const target = new URL(raw,pageUrl);
    if (!target.pathname.startsWith(base)) { errors.push(`${rel}: link misses Pages base: ${raw}`); continue; }
    let destination = join(root,decodeURIComponent(target.pathname.slice(base.length)));
    if (existsSync(destination) && statSync(destination).isDirectory()) destination = join(destination,'index.html');
    if (!existsSync(destination)) { errors.push(`${rel}: missing ${raw}`); continue; }
    if (target.hash && destination.endsWith('.html') && !ids(destination).has(decodeURIComponent(target.hash.slice(1)))) errors.push(`${rel}: missing fragment ${raw}`);
  }
  if (!/Page moved/.test(html)) {
    if ((html.match(/<h1\b/g) ?? []).length !== 1) errors.push(`${rel}: expected one h1`);
    if (!/Skip to content/.test(html)) errors.push(`${rel}: missing skip link`);
    const allIds = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match=>match[1]);
    if (new Set(allIds).size !== allIds.length) errors.push(`${rel}: duplicate id`);
  }
}
for (const route of ['index.html','projects/index.html','resume/index.html','writing/index.html','projects.html','resume.html','contact.html','contact/index.html','404.html','topics/quantum-computing/index.html','cv.pdf']) {
  if (!existsSync(join(root,route))) errors.push(`Missing required route ${route}`);
}
const draftRoute = join(root,'writing/leakage-aware-evaluation/index.html');
if (isReview !== existsSync(draftRoute)) errors.push('Draft route does not match build mode');
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex');
if (hash(join(root,'cv.pdf')) !== hash(resolve('public/cv.pdf'))) errors.push('CV differs from the current public source');
const expectedCvHash = 'eee4e4bdfb1ed4e2634c3c231f88b27569bda182808afa9e9a33f3942900d3d8';
if (hash(join(root,'cv.pdf')) !== expectedCvHash) errors.push('CV changed: reconcile résumé and update approved source hash in verifier');
// Check self-hosted assets referenced by the compiled CSS, including fonts.
for(const file of allFiles.filter(f=>f.endsWith('.css'))) {
  const css = readFileSync(file,'utf8');
  for(const match of css.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) {
    if (/^(data:|https?:)/.test(match[1])) continue;
    const path = match[1].startsWith(base) ? join(root,match[1].slice(base.length)) : resolve(file,'..',match[1]);
    if(!existsSync(path)) errors.push(`Missing CSS asset ${match[1]}`);
  }
}
if(errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`Verified ${htmlFiles.length} HTML pages: local links, fragments, Pages base, font/assets, one h1, unique IDs, legacy routes, CV checksum, and ${isReview ? 'review-only inclusion' : 'release exclusion'} of drafts.`);
