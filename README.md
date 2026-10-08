# Project Colossus

Site sobre Shadow of the Colossus.

## Organização

- `Pages/`, `Styles/`, `Scripts/`: páginas, estilos e JavaScript do site.
- `Images/`, `Sounds/`: mídias utilizadas pelo site.
- `Assets/`: recursos compilados.
- `src/`, `components/`, `lib/`: código React e utilitários.
- `tools/`: servidores locais, verificações e scripts de manutenção.
- `tools/templates/`: modelos usados pelos scripts de geração.
- `references/`: HTML de referência usado durante o desenvolvimento.
- `docs/REACT-SETUP.md`: configuração e compilação da experiência React.

## Comandos

Execute a partir desta pasta:

```sh
node tools/serve.cjs
node tools/audit-project.cjs
node tools/validate-colossi.cjs
npm run build
```

O servidor abre o site em http://127.0.0.1:8765/Pages/HomePage.html.

Os scripts `build-*`, `update-*`, `fix-project`, `redesign`, `revise-wander`,
`integrate-hero` registram operações de manutenção e podem
reescrever conteúdo. Não é necessário executá-los para visualizar o site.
Algumas ferramentas históricas ainda usam a cópia original da Área de Trabalho
ou dependências locais. Confira seus caminhos antes de executá-las.

Os caminhos descritos em docs/ são relativos à raiz do projeto.