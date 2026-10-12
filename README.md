# Project Colossus

Site sobre Shadow of the Colossus, com uma apresentação animada por rolagem nas fichas dos 16 colossos.

## Organização

- `Pages/`, `Styles/`, `Scripts/`: páginas, estilos e JavaScript do site.
- `Images/`, `Sounds/`: mídias utilizadas pelo site.
- `Assets/`: recursos compilados.
- `src/`, `components/`, `lib/`: código React e utilitários.
- `tools/`: servidores locais, verificações e scripts de manutenção.
- `references/`: capturas, fontes e modelos utilizados na produção das artes.
- `references/models/`: modelos dos 16 colossos, preservados como referências para ajustes nas artes.
- `docs/REACT-SETUP.md`: configuração e compilação da experiência React.

## Comandos

Execute a partir desta pasta:

```sh
node tools/serve.cjs
node tools/audit-project.cjs
node tools/audit-links.cjs
node tools/validate-colossi.cjs
npm run build
```

O servidor abre o site em http://127.0.0.1:8765/Pages/HomePage.html.

`node tools/integrate-hero.cjs` atualiza as aberturas das 16 fichas. Seu mapa de imagens alternativas deve ser atualizado quando uma nova arte for adicionada.

`node tools/audit-links.cjs --external` verifica também os endereços externos. Respostas 403 indicam bloqueio de acesso automático, não necessariamente links quebrados.

Cada colosso mantém sua arte em `Images/Colossos/Nome/`: `NomeCinematic` é o retrato da ficha e `NomeScrollHero` é a abertura animada. Os arquivos `.prompt.txt` documentam a geração e as revisões. As páginas `Colosso1.html` a `Colosso16.html` seguem a ordem dos encontros; esses nomes são mantidos para preservar os endereços existentes.

Os caminhos descritos em docs/ são relativos à raiz do projeto.

## Personagens e manutenção

As quatro fichas estão em Pages/Wander.html, Pages/Mono.html, Pages/Dormin.html e Pages/Emon.html. Personagens.css reúne a estrutura; PersonagensTemas.css contém as identidades visuais. O servidor local único é tools/serve.cjs.

Os prompts junto das imagens e os arquivos de references/ são documentação de produção, não mídias órfãs. O histórico das auditorias fica em docs/PROJECT-REVIEW.md; a última checagem HTTP está em docs/external-links-audit.json.