# Revisão do projeto — 09/10/2026

Removidos arquivos duplicados na raiz de Images/Colossos, exportações PNG sem uso, 16 estilos antigos, estilos vazios de Mono e Dormin, página Colosso1.new.html, componente de demonstração, imagens de personagens sem uso e uma versão descartada de Valus. Scripts históricos de geração/migração e seus templates foram retirados: alguns apontavam para outra cópia do repositório ou sobrescreviam páginas com versões antigas.

Mantidos os retratos usados, aberturas aprovadas, prompts e referências de produção. Os modelos foram organizados em references/models, pois são insumos para gerar as próximas artes. A configuração shadcn e lib/utils.ts permanecem como suporte ao desenvolvimento de componentes.

Nomes das páginas preservados para não quebrar endereços existentes. Os nomes Cinematic, ScrollHero e Template identificam respectivamente retrato, abertura e referência. Mono e Dormin são páginas intencionalmente em preparação.

Links externos das páginas: 48 endereços verificados; 41 retornaram HTTP 200 e 7 retornaram HTTP 403. Nenhum retornou 404. Os bloqueados foram mantidos, pois o bloqueio não comprova remoção do conteúdo. Respostas detalhadas em external-links-audit.json.

Verificações locais: audit-project, audit-links, validate-colossi e compilação TypeScript/Vite. A revisão não substitui inspeção visual em diferentes navegadores.
