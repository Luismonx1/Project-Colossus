const projectRoot = require('path').resolve(__dirname, '..');
const fs = require('fs');
const path = require('path');
const sharp = require('C:/Users/luisg/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const names = ['Quadratus','Gaius','Phaedra','Avion','Barba','Hydrus','Kuromori','Basaran','Dirge','Celosia','Pelagia','Phalanx','Cenobia','Argus','Malus'];
const folder = path.join(projectRoot, 'Images/Colossos');
(async () => {
    const missing = names.filter(name => !fs.existsSync(path.join(folder, `${name}Cinematic.png`)));
    if (missing.length) throw new Error(`Awaiting images: ${missing.join(', ')}`);
    let html = fs.readFileSync(path.join(projectRoot, 'Pages/HomePage.html'), 'utf8');
    let originalBytes = 0;
    let webBytes = 0;
    for (const name of names) {
        const input = path.join(folder, `${name}Cinematic.png`);
        const output = path.join(folder, `${name}Cinematic.webp`);
        const metadata = await sharp(input).metadata();
        // Preserve full generated resolution; encode for the website without altering the art.
        await sharp(input).webp({quality: 92, effort: 6}).toFile(output);
        originalBytes += fs.statSync(input).size;
        webBytes += fs.statSync(output).size;
        html = html.replaceAll(`${name}Template.webp`, `${name}Cinematic.webp`);
        console.log(`${name}: ${metadata.width} x ${metadata.height}, ${Math.round(fs.statSync(output).size / 1024)} KB`);
    }
    fs.writeFileSync(path.join(projectRoot, 'Pages/HomePage.html'), html);
    const manifest = ['# Artes dos colossos', '', 'Ilustrações geradas com a ferramenta integrada de geração de imagens, usando as imagens originais como referências de identidade e ValusCinematic.png como referência de estilo.', '', 'Arquivos WebP exportados em qualidade 92, mantendo a resolução das artes geradas. A imagem existente do Valus não foi alterada.', '', '| Colosso | Arte para o site | Prompt utilizado |', '| --- | --- | --- |', ...names.map(name => `| ${name} | [${name}Cinematic.webp](${name}Cinematic.webp) | [Prompt](${name}Cinematic.prompt.txt) |`), ''].join('\n');
    fs.writeFileSync(path.join(folder, 'cinematic-images.md'), manifest);
    console.log(JSON.stringify({count:names.length,originalMB:(originalBytes/1048576).toFixed(1),webMB:(webBytes/1048576).toFixed(1)}));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
