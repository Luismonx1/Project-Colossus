const fs = require('node:fs'), path = require('node:path');
const root = path.resolve(__dirname, '..');
const used = new Set(), external = new Set(), issues = [];
function walk(dir) { return fs.readdirSync(path.join(root, dir), {withFileTypes:true}).flatMap(e => e.isDirectory() ? walk(`${dir}/${e.name}`) : [`${dir}/${e.name}`]); }
function check(file, ref) {
  ref = ref.replaceAll('&amp;', '&');
  if (/^https?:/.test(ref)) { external.add(ref); return; }
  if (/^(data:|mailto:|tel:)/.test(ref)) return;
  const url = ref.split('#')[0].split('?')[0];
  const target = url ? path.resolve(root, path.dirname(file), decodeURIComponent(url)) : path.join(root, file);
  if (!fs.existsSync(target)) { issues.push({file, ref}); return; }
  used.add(path.relative(root, target).replaceAll('\\', '/'));
  const fragment = ref.split('#')[1];
  if (fragment && target.endsWith('.html')) {
    const ids = [...fs.readFileSync(target, 'utf8').matchAll(/\bid=["']([^"']+)["']/g)].map(m => m[1]);
    if (!ids.includes(decodeURIComponent(fragment))) issues.push({file, ref, issue:'missing anchor'});
  }
  if (!fs.readdirSync(path.dirname(target)).includes(path.basename(target))) issues.push({file, ref, issue:'filename case'});
}
for (const file of ['index.html', ...walk('Pages')]) {
  for (const m of fs.readFileSync(path.join(root,file),'utf8').matchAll(/(?:href|src|data-image|data-link)=["']([^"']+)["']/g)) check(file,m[1]);
}
for (const file of [...used].filter(f => f.endsWith('.css'))) {
  for (const m of fs.readFileSync(path.join(root,file),'utf8').matchAll(/url\(['"]?([^)'"\s]+)['"]?\)/g)) check(file,m[1]);
}
// Dynamic galleries assemble paths in JavaScript; count media whose filename is explicitly referenced there.
const scriptSources = walk('Scripts').filter(file => file.endsWith('.js')).map(file => fs.readFileSync(path.join(root, file), 'utf8')).join('\n');
for (const media of walk('Images')) if (scriptSources.includes(path.basename(media))) used.add(media);
// The Home gallery builds the optimized thumbnail path from each colossus name.
if (scriptSources.includes('Images/Colossos/Thumbnails/${')) {
  for (const media of walk('Images/Colossos/Thumbnails')) used.add(media);
}
const unusedMedia = [...walk('Images'), ...walk('Sounds')].filter(f => /\.(png|webp|jpg|wav)$/i.test(f) && !used.has(f));
console.log(JSON.stringify({issues, unusedMedia},null,2));
if (issues.length) process.exitCode = 1;
if (process.argv.includes('--external')) (async () => {
  const urls = [...external], results = [];
  for (let i=0;i<urls.length;i+=6) results.push(...await Promise.all(urls.slice(i,i+6).map(async url => {
    try { const r=await fetch(url,{signal:AbortSignal.timeout(15000),headers:{'User-Agent':'Mozilla/5.0'}}); await r.body?.cancel(); return {url,status:r.status,finalUrl:r.url}; }
    catch(e) { return {url,error:e.message}; }
  })));
  console.log(JSON.stringify({external:results},null,2));
})();
