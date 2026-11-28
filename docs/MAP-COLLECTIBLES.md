# Pontos do atlas

As camadas agora usam posições individuais, sem deslocamentos artificiais por categoria. Coordenadas x/y em porcentagem do enquadramento dos mapas de 1600 × 900 publicados pelo Portal E7 / Hardcore Gamer:
https://www.portale7.com.br/2018/02/localizacao-dos-santuarios-lagartos.html

- 79 moedas: centros dos círculos amarelos do mapa de moedas.
- 33 pontos de frutas: centros dos círculos vermelhos do mapa de frutas. Não são 33 frutas: uma árvore pode ter várias.
- 64 pontos de lagartos: centros dos símbolos cianos do mapa de lagartos. Indicam locais de busca; os animais se movem.
- 24 mini templos: posições dos símbolos verdes; o Santuário da Adoração é o 25º santuário e permanece no filtro Locais.

As 79 moedas usam a numeração e os tempos do vídeo PS4Trophies informado pelo usuário: https://youtu.be/awFlJLIUCgw . Os tempos também constam na descrição do vídeo e na página do autor: https://www.ps4trophiesgaming.com/video/shadow-of-the-colossus-all-79-relic-coin-locations-secret-underground-area-and-sword-of-dormin/ .

`Scripts/mapa-coins-video.js` associa explicitamente cada entrada do vídeo ao `pointId` do atlas e inclui uma dica do local. Cada ping apresenta um único link, no início do percurso da respectiva moeda, e o número segue o vídeo (não a ordem norte–sul dos IDs internos). Três classificações automáticas nas bordas da grade continuam corrigidas para F0, G1 e C4.

### Método e limites da associação

Revisão em 27/11/2026: comparação do roteiro narrado, cenas de gameplay e mapas exibidos no vídeo com os pontos do mapa de referência. O mapa do próprio autor (https://www.ps4trophiesgaming.com/wp-content/uploads/2018/02/Shadow-of-the-Colossus-Relic-Map-1.jpg) também não numera os pontos. A correspondência dentro de um quadrante é uma interpretação dos percursos e marcos geográficos, não uma tabela oficial de coordenadas. Não houve coleta das 79 moedas dentro de uma partida para validar cada associação.

As dicas diferenciam, por exemplo, a margem, a ponte e o pilar do lago em D1; os pontos baixos e elevados da fortaleza em G1; e os túneis e beiradas em F8. Elas evitam revelar nomes e aparência dos colossos, mas o vídeo externo contém spoilers e mostra os percursos completos.

Os IDs `coins:1` a `coins:79`, as posições x/y e a chave de armazenamento permanecem os mesmos. Não trocar um ID pelo número do vídeo: isso alteraria quais moedas aparecem como encontradas para visitantes que já salvaram progresso. Para corrigir uma associação futura, alterar `pointId` no guia e revisar a dica, sem renumerar os colecionáveis.

Validação dos dados: `node tools/validate-coins.cjs` verifica cobertura de todos os pontos, unicidade de IDs e números, quadrantes, ordem dos tempos e presença das dicas. Essa checagem detecta inconsistências nos dados; não substitui a conferência dos percursos no jogo.

Moedas, árvores frutíferas e lagartos podem ser marcados como encontrados. O progresso (176 pontos no total) fica salvo somente no navegador por `localStorage`, separado do progresso dos colossos. O filtro “Ocultar itens encontrados” não afeta mini templos.

A precisão é a dos mapas de referência, não uma medição das coordenadas 3D do jogo. Pontos próximos permanecem separados. Zoom de 100% a 300% amplia a base e as posições, mantendo os ícones pequenos. Filtros de colecionáveis começam desligados. O filtro de pendentes e o progresso continuam exclusivos dos colossos.

## Conferência de funcionamento e localização — 27/11/2026

Testes realizados na prévia local, no navegador:

- 79 pings acionados pelo teclado: todos exibiram o número e o quadrante do marcador, um único link e o segundo previsto na lista fornecida pelo usuário.
- Moeda 79 marcada como encontrada: o contador passou de 0 para 1; após recarregar, continuou em 1. O filtro de encontrados ocultou o ping. A marcação de teste foi desfeita, retornando a 0.
- Inspeção visual em desktop e viewport de 390 × 844: painel e link legíveis, sem transbordamento horizontal da página. O mapa conserva a rolagem interna. A moeda 79 também foi selecionada por clique no layout estreito.

Isso valida a interface e a construção dos links, não a reprodução individual dos 79 destinos no YouTube nem a posição no jogo. Os tempos apontam para o começo do percurso, podendo anteceder a coleta.

Na conferência do roteiro do vídeo foram refinadas as dicas de altura das moedas 6, 19, 67 e 68: pilar baixo, topo do mini templo e plataformas abaixo do topo dos penhascos. Não foram alterados IDs, coordenadas ou vínculos entre pontos e vídeo.

**Limite da revisão geográfica:** o mapa de referência não possui numeração e não representa altura. As correspondências entre pontos próximos continuam interpretativas, particularmente C2 (10–11), D1 (13–15), G1 (35–39), H4 (41–43), G6 (70–73) e F8 (77–79). As dicas e os percursos diferenciam esses locais, mas não foi obtida evidência suficiente para certificar cada vínculo x/y ou justificar uma troca entre eles. A validação definitiva desses grupos permanece pendente de conferência em uma partida ou de uma referência numerada com correspondência comprovada ao mesmo vídeo.

## Base visual do mapa

Images/Outros/MapaTerrasProibidas.webp (1673 × 940) foi criada por edição com IA da referência de santuários enviada pelo usuário, removendo símbolos e preservando o enquadramento. Não é uma textura oficial sem alterações: há reconstrução de terreno nas áreas cobertas pelos ícones. A interface informa o uso de IA e a precisão limitada às referências. Atribuição original preservada na imagem.

A busca encontrou uma textura sem marcadores, mas com nuvens sobre áreas importantes; por isso foi usada a alternativa autorizada de limpar a referência. Os 16 colossos e os dois locais também foram reposicionados para a nova base.

## Imagens dos pontos de interesse
- Santuário (captura do jogo, 1600 × 813): https://colossipedia.blogspot.com/2017/09/forbidden-lands.html — arquivo shrine-of-worship.jpg hospedado no Blogger.
- Ponte de entrada (captura do jogo, 575 × 383): https://assetsio.gnwcdn.com/-1505817207970.jpg — CDN de imprensa Gamer Network.
Imagens preservadas na resolução da fonte, sem geração por IA.
