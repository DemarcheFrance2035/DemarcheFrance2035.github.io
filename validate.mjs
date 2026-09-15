import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const canonicalRoot = 'https://demarchefrance2035.github.io';
const htmlFiles = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, {withFileTypes:true})) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html') && entry.name !== 'google26c5ac0079b8b67f.html') htmlFiles.push(full);
  }
}

walk(root);
const errors = [];

function localTarget(url) {
  const clean = url.split('#')[0].split('?')[0];
  if (!clean || /^(https?:|mailto:|tel:|data:)/.test(clean)) return null;
  const relative = clean.startsWith('/') ? clean.slice(1) : clean;
  let target = path.join(root, relative);
  if (clean.endsWith('/')) target = path.join(target, 'index.html');
  return target;
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const relativeFile = path.relative(root,file);
  for (const required of ['<html lang="fr">','name="description"','name="robots"','property="og:image"','rel="canonical"','type="application/ld+json"','<main id="contenu">','data-open-share']) {
    if (!html.includes(required)) errors.push(`${path.relative(root,file)}: missing ${required}`);
  }
  if (html.includes('name="keywords"')) errors.push(`${relativeFile}: meta keywords must not be used`);
  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) errors.push(`${relativeFile}: expected exactly one h1`);
  if ((html.match(/rel="canonical"/g) || []).length !== 1) errors.push(`${relativeFile}: expected exactly one canonical link`);
  if (relativeFile === '404.html' && !html.includes('name="robots" content="noindex,follow"')) errors.push('404.html: missing noindex,follow');
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  if (jsonLdMatch) {
    try { JSON.parse(jsonLdMatch[1]); }
    catch { errors.push(`${relativeFile}: invalid JSON-LD`); }
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  const repeated = ids.filter((id,index) => ids.indexOf(id) !== index);
  if (repeated.length) errors.push(`${path.relative(root,file)}: duplicate ids ${[...new Set(repeated)].join(', ')}`);
  for (const match of html.matchAll(/(?:href|src|data)="([^"]+)"/g)) {
    const url = match[1];
    if (url.startsWith('#') && !ids.includes(url.slice(1))) errors.push(`${path.relative(root,file)}: missing anchor ${url}`);
    const target = localTarget(url);
    if (target && !fs.existsSync(target)) errors.push(`${path.relative(root,file)}: missing local target ${url}`);
  }
}

const journal = fs.readFileSync(path.join(root,'journal/index.html'),'utf8');
const journalDates = [...journal.matchAll(/<time datetime="([^"]+)">/g)].map(match => match[1]);
if (journalDates.length !== 2 || journalDates[0] !== '2026-09-15' || journalDates[1] !== '2026-08-30') errors.push('journal: expected exactly the launch and programme completion dates');
for (const heading of ['Lancement du site','Fin de l’élaboration du programme']) {
  if (!journal.includes(`<h2>${heading}</h2>`)) errors.push(`journal: missing ${heading}`);
}

const sitemap = fs.readFileSync(path.join(root,'sitemap.xml'),'utf8');
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!match[1].startsWith(`${canonicalRoot}/`)) errors.push(`sitemap: unexpected URL ${match[1]}`);
}
if (sitemap.includes('/404.html')) errors.push('sitemap: 404 must not be indexed');

for (const file of ['assets/site.css','assets/site.js','assets/logo-france2035.png','assets/logo-france2035-256.webp','assets/hero-france2035.webp','assets/og-france2035.png','favicon.svg','site.webmanifest','sitemap.xml','indexnow-key.txt','google26c5ac0079b8b67f.html']) {
  if (!fs.existsSync(path.join(root,file))) errors.push(`missing required asset ${file}`);
}

const indexNowKey = fs.readFileSync(path.join(root,'indexnow-key.txt'),'utf8').trim();
if (!/^[a-f0-9]{32}$/.test(indexNowKey)) errors.push('indexnow-key.txt: invalid key');

const googleVerification = fs.readFileSync(path.join(root,'google26c5ac0079b8b67f.html'),'utf8').trim();
if (googleVerification !== 'google-site-verification: google26c5ac0079b8b67f.html') errors.push('google verification file: invalid content');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} HTML pages and all local references.`);
