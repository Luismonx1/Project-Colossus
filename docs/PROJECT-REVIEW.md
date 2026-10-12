# Revisão do projeto — 12/10/2026

## Estrutura e nomes

As 22 páginas têm referências locais e âncoras válidas. Pages contém HTML, Styles os estilos compartilhados e específicos, Scripts as interações, Assets os bundles compilados, e Images/Sounds as mídias. As quatro páginas de personagens estão concluídas. Os 16 colossos usam aberturas ScrollHero separadas dos retratos Cinematic.

Mantidos Colosso1.html a Colosso16.html e mapa.html para preservar URLs existentes. Personagens.css e PersonagensTemas.css distinguem estrutura e temas. Prompts e referências visuais foram preservados como documentação útil para ajustes, mesmo sem serem carregados pelo site.

## Limpeza e correções

- Removidos references/map-source.html e references/wander-source.html: cópias HTML de pesquisa antigas, sem referências no projeto.
- Removido tools/serve-repository.cjs: servidor redundante. O servidor documentado é tools/serve.cjs.
- Removida a pasta vazia Images/Emon, deixada por uma tentativa de download. A página reutiliza a captura existente de Dormin e Emon.
- Corrigidos os tipos MIME de PNG, JPG, JPEG e SVG no servidor local.
- A auditoria de links agora inclui data-link e os destinos das âncoras.
- Atualizados README e documentação React para refletir as páginas e artes atuais.

## Verificações

Auditorias locais sem erros e sem mídias órfãs em Images/Sounds. TypeScript e Vite compilam com sucesso. Vite emite avisos da dependência Framer Motion sobre diretivas use client ignoradas no bundle IIFE; a compilação termina normalmente.

56 URLs externas verificadas: 42 responderam HTTP 200; 14 responderam HTTP 403. Nenhum HTTP 404. Os 403 impedem confirmar automaticamente a disponibilidade para uma pessoa no navegador; não comprovam que a página foi removida. Os endereços foram preservados e registrados em external-links-audit.json.

Esta revisão valida estrutura, referências e compilação; não certifica todos os estados visuais e interações em todos os navegadores.
