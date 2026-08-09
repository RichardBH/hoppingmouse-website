// Post-build smoke checks (see test plan): route manifest, noindex vs mode,
// JSON-LD validity, internal link/asset resolution, banned identifiers.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const MODE = process.env.SITE_MODE === 'production' ? 'production' : 'preview';
const BASE = MODE === 'production' ? '' : '/hoppingmouse-website';
const DIST = 'dist';
let failures = 0;
const fail = (msg) => { console.error(`FAIL  ${msg}`); failures++; };
const ok = (msg) => console.log(`  ok  ${msg}`);

// 1. Route manifest — the 10 routes that must exist
const routes = [
  'index.html',
  'services/index.html',
  'case-studies/index.html',
  'case-studies/nut-processing-plant/index.html',
  'sectors/index.html',
  'prototyping/index.html',
  'about/index.html',
  'contact/index.html',
  'contact/sent/index.html',
  '404.html',
];
for (const r of routes) {
  existsSync(join(DIST, r)) ? ok(`route ${r}`) : fail(`missing route ${r}`);
}

// collect all html files
const htmlFiles = [];
const walk = (dir) => {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    statSync(p).isDirectory() ? walk(p) : f.endsWith('.html') && htmlFiles.push(p);
  }
};
walk(DIST);

// 2. noindex matches mode + JSON-LD parses + banned identifiers
// Pattern comes from the environment (CI secret) so the words themselves
// never appear in the public repo.
const banned = process.env.BANNED_IDENTIFIERS
  ? new RegExp(process.env.BANNED_IDENTIFIERS, 'i')
  : null;
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf8');
  const isNoindexPage = /404|contact[\\/]sent/.test(f);
  const hasNoindex = /name="robots" content="noindex/.test(html);
  if (MODE === 'preview' && !hasNoindex) fail(`${f}: preview build must be noindex`);
  if (MODE === 'production' && hasNoindex && !isNoindexPage) fail(`${f}: production page unexpectedly noindex`);
  const ld = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  if (ld) {
    try { JSON.parse(ld[1]); } catch { fail(`${f}: JSON-LD does not parse`); }
  }
  if (banned?.test(html)) fail(`${f}: banned identifier in output`);
  // 3. internal links resolve + carry the base
  for (const m of html.matchAll(/(?:href|src)="(\/[^"]*)"/g)) {
    const url = m[1].split('#')[0].split('?')[0];
    if (url.startsWith('//')) continue;
    if (BASE && !url.startsWith(BASE + '/') && url !== BASE) {
      fail(`${f}: link misses base: ${url}`);
      continue;
    }
    const rel = url.slice(BASE.length).replace(/^\//, '');
    if (rel === '') continue;
    const candidates = [rel, `${rel}/index.html`, `${rel.replace(/\/$/, '')}/index.html`, rel.replace(/\/$/, '')];
    if (!candidates.some((c) => existsSync(join(DIST, c)))) fail(`${f}: broken internal link ${url}`);
  }
}
ok(`${htmlFiles.length} html files checked (mode=${MODE})`);

if (failures) {
  console.error(`\n${failures} smoke failure(s)`);
  process.exit(1);
}
console.log('\nSMOKE PASS');
