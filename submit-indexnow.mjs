import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const key = fs.readFileSync(path.join(root, 'indexnow-key.txt'), 'utf8').trim();
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

if (!urlList.length) throw new Error('Le sitemap ne contient aucune URL.');

const site = new URL(urlList[0]);
const keyLocation = `${site.origin}/indexnow-key.txt`;
const payload = {
  host: site.host,
  key,
  keyLocation,
  urlList,
};

if (process.argv.includes('--dry-run')) {
  console.log(`IndexNow prêt pour ${urlList.length} URL sur ${site.host}.`);
  process.exit(0);
}

const hostedKey = await fetch(keyLocation, {redirect:'follow'});
if (!hostedKey.ok || (await hostedKey.text()).trim() !== key) {
  throw new Error(`La clé IndexNow n’est pas accessible à ${keyLocation}.`);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method:'POST',
  headers:{'content-type':'application/json; charset=utf-8'},
  body:JSON.stringify(payload),
});

if (![200, 202].includes(response.status)) {
  throw new Error(`IndexNow a répondu avec le statut HTTP ${response.status}.`);
}

console.log(`IndexNow a reçu ${urlList.length} URL pour ${site.host}.`);
