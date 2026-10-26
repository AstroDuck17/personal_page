import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, join, relative, sep } from 'node:path';
import { createHash } from 'node:crypto';
import { runInNewContext } from 'node:vm';
import { parseFrontmatter } from '@astrojs/markdown-remark';
import { topics } from '../src/data/topics.ts';

const root = resolve('dist');
const base = '/';
const origin = 'https://astroduck17.github.io';
const isReview = process.argv.includes('--review');
const errors = [];
const files = dir => readdirSync(dir).flatMap(file=>statSync(join(dir,file)).isDirectory() ? files(join(dir,file)) : [join(dir,file)]);
if (!existsSync(root)) throw new Error('Run npm run build first.');
const allFiles = files(root);
const htmlFiles = allFiles.filter(file=>file.endsWith('.html'));
const aliases = { 'projects.html': '/projects/', 'resume.html': '/resume/', 'contact.html': '/contact/', 'about.html': '/' };
const publishedRoutes = ['/', '/projects/', '/resume/', '/writing/', '/contact/', ...Object.keys(topics).map(id=>`/topics/${id}/`)];
const draftRoutes = [];
// Independently derive expected content routes from the existing frontmatter parser.
for (const collection of ['projects', 'writing']) {
  const directory = resolve(`src/content/${collection}`);
  for (const file of files(directory).filter(file=>/\.mdx?$/.test(file))) {
    const { frontmatter: data } = parseFrontmatter(readFileSync(file, 'utf8'));
    const id = relative(directory, file).split(sep).join('/').replace(/\.mdx?$/, '');
    (data.draft || data.status === 'draft' ? draftRoutes : publishedRoutes).push(`/${collection}/${id}/`);
  }
}
const expectedOldPaths = new Map(publishedRoutes.map(route=>[`personal_page${route}index.html`, route]));
for (const [alias, destination] of Object.entries(aliases)) expectedOldPaths.set(`personal_page/${alias}`, destination);
const fileForUrl = pathname => {
  const path = join(root, decodeURIComponent(pathname));
  return existsSync(path) && statSync(path).isDirectory() ? join(path, 'index.html') : path;
};
const idCache = new Map();
const ids = file => {
  if (!idCache.has(file)) idCache.set(file, new Set([...readFileSync(file,'utf8').matchAll(/\bid=["']([^"']+)["']/g)].map(match=>match[1])));
  return idCache.get(file);
};
for (const file of htmlFiles) {
  const html = readFileSync(file,'utf8');
  const rel = relative(root,file).split(sep).join('/');
  const destination = html.match(/<meta name="redirect-destination" content="([^"]+)"/i)?.[1];
  if (/D:\\college|C:\\Users\\Dell/i.test(html)) errors.push(`${rel}: local source path leaked`);
  if (!isReview && /leakage-aware-evaluation|UNPUBLISHED REVIEW DRAFT|includes unpublished drafts/.test(html)) errors.push(`${rel}: draft leaked into release`);
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']*)["']/g)) {
    const raw = match[1].replaceAll('&amp;','&');
    if (!raw || /^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
    const pageUrl = `https://local.test${base}${rel.endsWith('index.html') ? rel.slice(0,-10) : rel}`;
    const target = new URL(raw,pageUrl);
    if (!['https://local.test', origin].includes(target.origin)) continue;
    if (!destination && target.pathname.startsWith('/personal_page/')) errors.push(`${rel}: obsolete link prefix: ${raw}`);
    let linkedFile = join(root,decodeURIComponent(target.pathname.slice(base.length)));
    if (existsSync(linkedFile) && statSync(linkedFile).isDirectory()) linkedFile = join(linkedFile,'index.html');
    if (!existsSync(linkedFile)) { errors.push(`${rel}: missing ${raw}`); continue; }
    if (target.hash && linkedFile.endsWith('.html') && !ids(linkedFile).has(decodeURIComponent(target.hash.slice(1)))) errors.push(`${rel}: missing fragment ${raw}`);
  }
  {
    if ((html.match(/<h1\b/g) ?? []).length !== 1) errors.push(`${rel}: expected one h1`);
    if (!/Skip to content/.test(html)) errors.push(`${rel}: missing skip link`);
    const allIds = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map(match=>match[1]);
    if (new Set(allIds).size !== allIds.length) errors.push(`${rel}: duplicate id`);
  }
  if (!/<!doctype html>/i.test(html) || !/<html lang="en"/.test(html) || !/<meta name="viewport"/.test(html)) errors.push(`${rel}: missing HTML document structure`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
  const ownPath = `/${rel.endsWith('index.html') ? rel.slice(0,-10) : rel}`;
  if (canonical !== new URL(destination ?? ownPath, origin).href) errors.push(`${rel}: incorrect canonical ${canonical}`);
  const sharingUrl = html.match(/<meta property="og:url" content="([^"]+)"/i)?.[1];
  if (!destination && sharingUrl !== canonical) errors.push(`${rel}: sharing URL differs from canonical`);
  if (destination) {
    const expected = expectedOldPaths.get(rel) ?? aliases[rel];
    if (destination !== expected) errors.push(`${rel}: unexpected redirect target ${destination}`);
    if (destination.startsWith('/personal_page/') || destination === ownPath) errors.push(`${rel}: redirect loop`);
    const finalFile = fileForUrl(destination);
    if (!existsSync(finalFile) || /name="redirect-destination"/.test(readFileSync(finalFile, 'utf8'))) errors.push(`${rel}: target missing or not final`);
    if (!/<a id="redirect-link"[^>]*href="/.test(html) || !/<noscript><meta http-equiv="refresh"/.test(html)) errors.push(`${rel}: missing redirect fallback`);
    const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
    for (const state of [{ search:'?from=old&tag=a&tag=b%2Bc', hash:'#main' }, { search:'', hash:'#my-contribution' }]) {
      let actual, fallback;
      try {
        runInNewContext(script ?? '', { URL, location: { origin:'https://local.test', ...state, replace: value=>{ actual=value; } }, document: { getElementById:()=>({ set href(value) { fallback=value; } }) } }, { timeout:100 });
        const expectedUrl = new URL(destination, 'https://local.test');
        expectedUrl.search = state.search; expectedUrl.hash = state.hash;
        if (actual !== expectedUrl.href || fallback !== actual) errors.push(`${rel}: query/fragment preservation failed`);
      } catch (error) { errors.push(`${rel}: redirect script failed: ${error.message}`); }
    }
  } else if (rel.startsWith('personal_page/')) errors.push(`${rel}: unexpected non-redirect old page`);
}
for (const route of ['index.html','projects/index.html','resume/index.html','writing/index.html','projects.html','resume.html','contact.html','contact/index.html','404.html','topics/quantum-computing/index.html','cv.pdf']) {
  if (!existsSync(join(root,route))) errors.push(`Missing required route ${route}`);
}
const draftRoute = join(root,'writing/leakage-aware-evaluation/index.html');
if (isReview !== existsSync(draftRoute)) errors.push('Draft route does not match build mode');
for (const route of publishedRoutes) if (!existsSync(fileForUrl(route))) errors.push(`Missing published route ${route}`);
for (const [oldPath] of expectedOldPaths) if (!existsSync(join(root, oldPath))) errors.push(`Missing compatibility page ${oldPath}`);
for (const route of draftRoutes) {
  if (!isReview && existsSync(fileForUrl(route))) errors.push(`Draft content route exposed: ${route}`);
  if (existsSync(join(root, `personal_page${route}index.html`))) errors.push(`Draft compatibility route exposed: ${route}`);
}
for (const file of allFiles.filter(file=>relative(root,file).split(sep).join('/').startsWith('personal_page/'))) {
  const rel = relative(root,file).split(sep).join('/');
  if (!expectedOldPaths.has(rel) && rel !== 'personal_page/cv.pdf') errors.push(`Unexpected old-path output: ${rel}`);
}
for (const route of ['/missing-page/', '/personal_page/missing-page/']) if (existsSync(fileForUrl(route))) errors.push(`Unexpected wildcard output ${route}`);
const hash = file => createHash('sha256').update(readFileSync(file)).digest('hex');
if (hash(join(root,'cv.pdf')) !== hash(resolve('public/cv.pdf'))) errors.push('CV differs from the current public source');
const expectedCvHash = 'eee4e4bdfb1ed4e2634c3c231f88b27569bda182808afa9e9a33f3942900d3d8';
if (hash(join(root,'cv.pdf')) !== expectedCvHash) errors.push('CV changed: reconcile résumé and update approved source hash in verifier');
const oldCv = join(root, 'personal_page/cv.pdf');
if (!existsSync(oldCv) || hash(oldCv) !== expectedCvHash) errors.push('Old CV compatibility copy missing or modified');
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
console.log(`Verified ${htmlFiles.length} HTML pages: root links, fragments, canonicals/sharing URLs, font/assets, HTML structure, ${expectedOldPaths.size} compatibility redirects and final targets, query/fragment preservation, both CV checksums, and ${isReview ? 'review-only inclusion' : 'release exclusion'} of drafts.`);
