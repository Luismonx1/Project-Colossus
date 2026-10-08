# Experiência imersiva de Argus

O projeto original é um site estático em Pages/, Styles/ e Scripts/. A página de Argus agora incorpora uma aplicação React pequena, compilada com Vite. As outras páginas continuam independentes.

## Estrutura

- components/ui/scroll-expansion-hero.tsx: componente reutilizável adaptado do exemplo fornecido.
- components/demo.tsx: variantes de imagem com os arquivos locais.
- src/argus-hero.tsx: montagem na página do Argus.
- Styles/immersive.css: Tailwind v4 e estilos exclusivos da experiência.
- components.json: configuração shadcn, com alias @/components/ui e TypeScript.
- lib/utils.ts: utilitário cn para componentes shadcn.
- Assets/argus-hero/: JS e CSS compilados, utilizados por Pages/Colosso15.html.

O projeto não tinha uma pasta de componentes. components/ui foi criada na raiz para manter os componentes reutilizáveis no caminho esperado pelos imports e pelo CLI shadcn. Styles/ permanece o diretório de estilos do projeto.

## Instalação e compilação

Requer Node.js 22.12 ou superior. Na raiz do repositório:

```sh
corepack pnpm install --frozen-lockfile
corepack pnpm run build
```

Também é possível instalar com npm e executar npm run build. O lockfile mantido neste projeto é pnpm-lock.yaml.

A compilação verifica TypeScript e gera um bundle IIFE com React e Framer Motion incluídos. Não é necessário um servidor Next.js para abrir as páginas. Os arquivos compilados devem acompanhar o HTML no deploy; após editar os componentes, execute o build novamente.

Para servir o site localmente após compilar:

```sh
corepack pnpm exec vite --host 127.0.0.1
```

Abra /Pages/Colosso15.html. Para recompilar durante a edição, execute em outro terminal:

```sh
corepack pnpm exec vite build --watch
```

## shadcn, Tailwind e Next.js

React, TypeScript, Tailwind v4 e Framer Motion já estão configurados. Tailwind usa o prefixo tw: e não aplica preflight, preservando os estilos das páginas existentes. Para adicionar componentes compatíveis:

```sh
npx shadcn@latest add button
```

Para iniciar um projeto separado pelo CLI oficial (não execute esse scaffolding sobre o site existente):

```sh
npx shadcn@latest init -t vite
```

O exemplo original importa next/image. Aqui ele foi adaptado para img com mídia local, portanto next não é uma dependência necessária nem foi instalado. Em uma aplicação Next.js, pode-se usar next/image novamente e instalar as dependências indicadas no exemplo com npm install next framer-motion. Instruções oficiais: https://ui.shadcn.com/docs/installation/vite e https://ui.shadcn.com/docs/installation/next.

## Comportamento

A seção fica fixa durante um trecho de rolagem nativa; a imagem de Argus se expande e o título sai de cena. O link para a ficha permanece disponível durante a animação.

Com prefers-reduced-motion, a expansão automática é desativada. Sem JavaScript, a ficha continua acessível.
