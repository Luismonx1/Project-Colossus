const projectRoot = require('path').resolve(__dirname, '..');
process.chdir(projectRoot);
const fs=require('fs'),path=require('path');
const root=projectRoot;
let refs=0;
for(let n=1;n<=16;n++){
 const file=path.join(root,'Pages',`Colosso${n}.html`),s=fs.readFileSync(file,'utf8');
 const ids=[...s.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 if(new Set(ids).size!==ids.length)throw Error('ID duplicado '+n);
 for(const m of s.matchAll(/(?:href|src)="([^"]+)"/g)){
  const u=m[1]; if(/^https?:/.test(u))continue;
  if(u.startsWith('#')){if(!ids.includes(u.slice(1)))throw Error('Âncora inválida '+n+' '+u);}
  else if(!fs.existsSync(path.resolve(path.dirname(file),u.split('#')[0])))throw Error('Arquivo inexistente '+u);
  refs++;
 }
 if(/<details[^>]*\bopen/.test(s))throw Error('Dicas abertas '+n);
}
console.log('16 fichas: IDs únicos, dicas fechadas e '+refs+' referências locais válidas.');
