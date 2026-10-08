const projectRoot = require('path').resolve(__dirname, '..');
process.chdir(projectRoot);
const fs=require('fs');const p='Pages/Wander.html';let h=fs.readFileSync(p,'utf8');
h=h.replace(/<section class="text-section equipment"[\s\S]*?<\/section>\s*/,'').replace(/<section class="text-section closer"[\s\S]*?<\/section>\s*/,'').replace('<a href="#equipamentos">Equipamentos</a>','').replace('07 / Curiosidades','05 / Curiosidades');
h=h.replace('<div class="companion-number" aria-hidden="true">W / A</div>','<figure class="companion-image"><img src="../Images/Outros/terras-proibidas-wander-agro.png" alt="Wander montado em Agro observa um vale de ruínas e montanhas." width="1536" height="1024" loading="lazy"><figcaption>Interpretação artística · imagem gerada por IA</figcaption></figure>');
h=h.replace('<div><p class="eyebrow">04 /','<div class="companion-copy"><p class="eyebrow">04 /');
for(const [id,num,label] of [['historia','01','O desejo'],['passado','02','As origens'],['aparencia','03','Os traços']]){
const re=new RegExp('(<section[^>]*id="'+id+'">)<div>');h=h.replace(re,'$1<div class="story-heading"><span class="story-index" aria-hidden="true">'+num+'</span>');
h=h.replace(new RegExp('(<section[^>]*id="'+id+'">[\\s\\S]*?<\\/h2>)'), '$1<span class="story-tag">'+label+'</span>');
}
fs.writeFileSync(p,h);
