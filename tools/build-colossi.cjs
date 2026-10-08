const projectRoot = require('path').resolve(__dirname, '..');
const fs = require('fs');
const path = require('path');
const base = projectRoot;
const records = [
{
n:2,name:'Quadratus',dev:'Mammoth',gloss:'Mamute',form:'Quadrúpede',size:'29,8',measure:'Altura',coord:'F3',place:'Praia ao norte',
subtitle:'Passos que fazem a margem estremecer.',intro:'Entre a areia e os paredões, uma silhueta de quatro patas ocupa a praia. Quadratus transforma a paisagem aberta em um encontro de peso e paciência.',
heading:'Uma muralha em movimento',description:['O corpo largo, os chifres curvados e as patas maciças lembram um enorme bovino. Placas de pedra acompanham o dorso, contrastando com a pelagem que cobre parte do corpo.','Visto da margem, seu volume parece se confundir com as rochas. O passo lento reforça essa impressão, até que o gigante ergue as patas e revela a força por trás de cada movimento.'],
route:['Siga para o norte do Santuário da Adoração e atravesse a ponte natural de pedra. Do outro lado, procure a descida que leva até a margem de areia.','Continue junto aos paredões até a grande abertura selada na rocha. A praia fica abaixo do caminho principal; Agro pode acompanhar Wander nessa área.'],
curiosities:[['Uma entrada marcante','Quadratus rompe a barreira de pedra que fecha sua caverna. A chegada do gigante também transforma o cenário.'],['Outro tipo de escala','É o primeiro quadrúpede da jornada. O dorso comprido muda a percepção de distância em relação à escalada vertical de Valus.']],
hints:[['Observe as patas.','Espere que ele levante uma delas e procure o brilho sob o casco.'],['Prepare o arco.','Uma flecha bem colocada pode abrir a oportunidade de alcançar a pelagem.'],['Avance com calma.','No dorso, recupere a resistência antes de seguir em direção aos sinais vitais.']],nomad:'2011/07/quadratus-2nd-colosus.html'
},
{
n:3,name:'Gaius',dev:'Knight',gloss:'Cavaleiro',form:'Bípede',size:'30,5',measure:'Altura',coord:'E2',place:'Arena sobre o lago',
subtitle:'Um cavaleiro entre a água e o céu.',intro:'No alto de uma plataforma isolada, Gaius desperta com uma espada de pedra. A arena circular oferece pouco espaço para esquecer o alcance do gigante.',
heading:'A silhueta de um cavaleiro',description:['Pernas longas, cintura estreita e uma cabeça protegida por pedra dão a Gaius uma aparência de guerreiro antigo. Uma enorme lâmina se estende de seu braço direito.','As proporções alongadas fazem o olhar subir da arena até o rosto do colosso. Seus golpes amplos impõem um ritmo: observar a preparação, reagir ao impacto e reconhecer a pausa seguinte.'],
route:['Cruze a ponte de pedra ao norte do santuário e siga pelo desvio a oeste, em direção ao lago cercado por montanhas.','Deixe Agro na margem. Nade até a rampa e percorra a subida curva, usando os apoios para alcançar a plataforma elevada onde Gaius repousa.'],
curiosities:[['Engrenagens sob a arena','Durante a subida, é possível observar estruturas que lembram engrenagens na parte inferior da plataforma circular.'],['Pedra que desperta','Antes do encontro, Gaius permanece deitado. À distância, sua forma pode se confundir com um amontoado de rochas.']],
hints:[['Leia o chão.','Observe a diferença entre a superfície central da arena e a terra ao redor.'],['Use o alcance a seu favor.','A espada que ameaça Wander também pode se tornar um caminho de subida.'],['Encontre pausas.','A escalada é longa; procure apoios para recuperar a resistência entre as sacudidas.']],nomad:'2011/07/gaius-3rd-colossus.html',slug:'3-gaias'
},
{
n:4,name:'Phaedra',dev:'Kirin',gloss:'Qilin',form:'Quadrúpede',size:'27,1',measure:'Altura',coord:'G5',place:'Campo entre montanhas',
subtitle:'Um guardião no silêncio dos campos.',intro:'Phaedra caminha por um vale verde, entre montículos e passagens antigas. Sua forma delicada à distância esconde uma escala que só a aproximação revela.',
heading:'Um perfil quase esquelético',description:['O pescoço comprido e o corpo semelhante ao de um cavalo contrastam com pernas finas e angulares. A pedra desenha costelas e articulações, enquanto estruturas pendem dos lados da cabeça.','A aparência incomum combina com o campo silencioso. A luta favorece a observação do comportamento do colosso e das entradas que atravessam o terreno.'],
route:['Partindo do santuário, procure a passagem entre as montanhas a sudeste. O corredor rochoso desemboca em um vale amplo e gramado.','Desça até o campo e observe os montículos com entradas de pedra. Phaedra repousa mais adiante, próximo à extremidade do vale.'],
curiosities:[['Quatro entradas','Os montículos escondem passagens conectadas. A organização do campo faz parte da identidade deste encontro.'],['Inscrições na pedra','Há símbolos nas estruturas do vale. O jogo deixa em aberto a história daqueles que construíram esse lugar.']],
hints:[['Conheça as passagens.','Observe por onde os túneis entram e saem antes de provocar o colosso.'],['Desapareça de sua vista.','Atraia sua atenção e use o subsolo; espere que ele se abaixe para investigar.'],['Aproveite a distração.','Saia por outro acesso e procure uma oportunidade de alcançar suas costas.']],nomad:'2012/01/phaedra-4th-colossus.html',extra:['https://www.neoseeker.com/shadow-of-the-colossus-2018/walkthrough/The_Fourth_Colossus','Neoseeker — localização no quadrante G5']
},
{
n:5,name:'Avion',dev:'Bird',gloss:'Pássaro',form:'Alado',size:'35,3',measure:'Envergadura',coord:'H4',place:'Lago das ruínas',
subtitle:'Uma sombra atravessa a névoa.',intro:'Avion repousa acima de um lago tomado por ruínas. Quando abre as asas, a distância entre Wander e o gigante deixa de ser apenas uma questão de altura.',
heading:'Asas sobre a água',description:['Uma cabeça pequena, asas extensas e uma cauda longa desenham a silhueta de Avion. A pelagem escura acompanha superfícies que se movem a cada batida de asas.','As torres e colunas que emergem do lago dão escala ao voo. Nesse encontro, o próprio corpo do colosso se torna uma plataforma em movimento sobre a água.'],
route:['Siga a leste do santuário, pelas passagens entre os paredões. A chegada é marcada por ruínas junto a um grande lago.','Agro fica na entrada. Continue a nado e pelas estruturas de pedra até o ponto de onde é possível avistar o colosso pousado.'],
curiosities:[['O primeiro voo','Avion é o primeiro colosso alado enfrentado na jornada, levando a escalada para uma superfície que muda de orientação no ar.'],['Ruínas submersas','Apenas partes das construções aparecem acima do lago. As colunas isoladas sugerem a extensão do conjunto escondido pela água.']],
hints:[['Escolha um apoio.','Posicione-se em uma das plataformas baixas sobre a água e chame sua atenção com o arco.'],['Espere a aproximação.','O mergulho do colosso oferece uma chance de saltar e agarrar a pelagem.'],['Respeite o voo.','Mova-se nos trechos mais estáveis e segure firme quando as asas começarem a bater.']],nomad:'2011/07/5th-colossus.html',sizeSource:['https://vsbattles.fandom.com/wiki/Avion','VS Battles Wiki — estimativa de envergadura']
},
{
n:6,name:'Barba',dev:'Minotaur_B',gloss:'Minotauro B',form:'Bípede',size:'19',measure:'Altura',coord:'D6',place:'Templo sob as areias',
subtitle:'O peso de um gigante sob o templo.',intro:'No interior de uma construção enterrada entre rochas e areia, Barba avança por um salão de muros e colunas. Sua barba longa dá ao rosto uma presença singular.',
heading:'Força entre paredes antigas',description:['Barba tem um tronco robusto, braços pesados e uma longa faixa de pelos que desce do queixo. A combinação de pedra e pelagem aproxima sua forma da de outros gigantes humanoides.','Sem uma grande arma nas mãos, ele impõe sua força por meio dos próprios golpes. O espaço fechado faz cada passo parecer ainda mais próximo de Wander.'],
route:['Viaje para sudoeste, atravessando a floresta até alcançar a região de areia. Procure a construção encravada na montanha.','Entre a pé e avance pelas plataformas do templo até o grande salão inferior. As barreiras alinhadas e a galeria de colunas ajudam a reconhecer a arena.'],
curiosities:[['Uma família de gigantes','Minotaur_B compartilha o padrão de nome de desenvolvimento com Minotaur_A, Valus, e Minotaur_C, Argus.'],['Uma arena que se transforma','As barreiras internas não resistem à passagem do gigante. A destruição acompanha sua perseguição pelo salão.']],
hints:[['Continue em movimento.','Atravesse as barreiras e procure o abrigo formado pelas colunas ao fundo.'],['Espere que ele procure você.','A postura do colosso muda quando tenta enxergar Wander sob a estrutura.'],['Veja além da pedra.','A barba oferece uma oportunidade de agarrar; planeje a subida e conserve a resistência.']],extra:['https://www.keengamer.com/es/articulos/segmentos/otros/guia-de-todos-los-colosos-de-shadow-of-the-colossus/','KeenGamer — nome de desenvolvimento e localização'],nameSource:'https://fanlore.org/wiki/Colossi'
},
{
n:7,name:'Hydrus',dev:'Eel',gloss:'Enguia',form:'Aquático',size:'85',measure:'Comprimento',coord:'D1',place:'Lago ao noroeste',
subtitle:'Luzes se movem nas profundezas.',intro:'Sob a superfície escura, Hydrus desenha curvas lentas com o corpo. As luzes de seus espinhos revelam a presença do gigante antes que ele se aproxime.',
heading:'Uma serpente sob o lago',description:['Hydrus tem corpo alongado, cauda flexível e espinhos luminosos ao longo do dorso. Sua forma lembra uma enguia que atravessa a água entre restos de estruturas antigas.','Boa parte de sua escala permanece escondida. O encontro alterna momentos de espera na superfície e breves aproximações, quando é possível perceber o tamanho do animal.'],
route:['Siga para o norte e depois para oeste, contornando as montanhas em direção ao extremo noroeste do mapa.','O destino é um lago profundo com ruínas e uma estrutura em espiral. Deixe Agro na margem e avance até a água para observar o movimento sob a superfície.'],
curiosities:[['Luz como silhueta','Os espinhos ajudam a acompanhar o colosso mesmo quando seu corpo está submerso.'],['Uma ponte interrompida','Os restos de uma ponte atravessam parte do cenário, reforçando a sensação de um lugar que perdeu sua antiga função.']],
hints:[['Acompanhe as luzes.','Nade pela superfície para atrair Hydrus e espere a cauda passar ao alcance.'],['Avance quando houver ar.','Segure-se nos mergulhos curtos e aproveite as subidas para recuperar fôlego e resistência.'],['Cuidado com os espinhos.','Observe a origem das descargas antes de se aproximar dos sinais no corpo.']],nomad:'2011/08/hydrus-7th-colossus.html',sizeSource:['https://shadowofthecolossus.neoseeker.com/wiki/Seventh_Colossus','Neoseeker — comprimento estimado (280 pés, cerca de 85 m)']
},
{
n:8,name:'Kuromori',dev:'Yamori_B',gloss:'Lagartixa B',form:'Quadrúpede',size:'4,9',measure:'Altura',coord:'G6',place:'Coliseu em ruínas',
subtitle:'Uma sombra percorre as paredes.',intro:'Kuromori ocupa o fundo de uma arena cercada por galerias. Seu corpo baixo e sua agilidade fazem o perigo circular tanto pelo chão quanto pelas paredes.',
heading:'Pedra, escamas e movimento',description:['O perfil lembra uma grande lagartixa, com cauda comprida e patas abertas para os lados. Placas rígidas cobrem o dorso e dão ao corpo uma aparência de armadura.','Kuromori sobe pelas superfícies verticais da arena e lança ataques que tornam perigoso permanecer parado. Aqui, distância e altura são tão importantes quanto o tamanho do adversário.'],
route:['Siga para o sul do santuário e tome a passagem que se abre a leste entre as rochas. Atravesse a gruta até a região do pequeno lago.','Entre no templo e percorra seus corredores. As escadas levam às galerias de uma construção circular, com o colosso no pátio inferior.'],
curiosities:[['A arena tem vários andares','A luta conecta o pátio às galerias superiores. Observar as aberturas entre os níveis ajuda a entender o espaço.'],['Um gigante escalador','Enquanto Wander costuma subir nos colossos, Kuromori também escala o cenário, mudando continuamente o ângulo do encontro.']],
hints:[['Saia das nuvens.','Afaste-se rapidamente das áreas atingidas pelos projéteis e use as paredes como proteção.'],['Faça-o subir.','Chame sua atenção de uma galeria e procure um ângulo para mirar nas patas.'],['Aproveite a queda.','Quando ele perder a aderência, desça com cuidado e observe a parte do corpo que ficou exposta.']],nomad:'2012/03/',
},
{
n:9,name:'Basaran',dev:'Tortoise',gloss:'Tartaruga',form:'Quadrúpede',size:'22,9',measure:'Altura',coord:'D3',place:'Planície dos gêiseres',
subtitle:'Uma carapaça sob o céu escuro.',intro:'Basaran surge em uma planície coberta de névoa e fontes de vapor. Sua carapaça parece um pedaço do terreno que ganhou movimento.',
heading:'Uma fortaleza de quatro patas',description:['O dorso amplo e elevado lembra uma tartaruga monumental. Patas grossas sustentam uma carapaça irregular, marcada por formas rochosas e saliências.','Sua presença combina com a paisagem árida ao redor. Entre ataques à distância e passos pesados, o colosso obriga Wander a acompanhar o espaço inteiro da arena.'],
route:['Atravesse a ponte a oeste do santuário e siga para noroeste. A vegetação cede lugar a uma área escura, com névoa mais densa.','Os gêiseres identificam a planície. Aproxime-se da grande caverna na borda do terreno, mantendo Agro por perto para percorrer a área.'],
curiosities:[['O céu indica o caminho','A concentração de nuvens sobre a região pode ser vista à distância, antes da chegada aos gêiseres.'],['O terreno também se move','Os jatos de água interrompem o chão aparentemente inerte e dão à arena um ritmo próprio.']],
hints:[['Use Agro para reposicionar.','Mantenha distância dos projéteis enquanto conduz o gigante pelo campo.'],['Observe os gêiseres.','O jato sob seu corpo pode alterar o equilíbrio de Basaran.'],['Prepare uma abertura.','Quando as patas ficarem vulneráveis, use o arco e procure uma chance de alcançar o corpo.']],nomad:'2013/03/'
},
{
n:10,name:'Dirge',dev:'Narga_A',gloss:'Narga A',form:'Serpentino',size:'79',measure:'Comprimento',coord:'B4',place:'Caverna de areia',
subtitle:'Algo se aproxima sob a areia.',intro:'Dirge percorre o chão de uma grande caverna como se a areia fosse água. A perseguição transforma Wander e Agro em uma dupla inseparável.',
heading:'Um corpo escondido pelo terreno',description:['Alongado e de olhos muito grandes, Dirge aparece em fragmentos acima da areia. A cabeça e partes do dorso revelam o movimento de um corpo que continua sob o chão.','A velocidade muda a sensação do encontro: o desafio deixa de ser apenas alcançar um gigante e passa a incluir manter distância enquanto se observa o que vem atrás.'],
route:['Viaje para oeste, passando pela região próxima à planície dos gêiseres. Continue entre as montanhas até encontrar a entrada da caverna.','Entre com Agro. O salão é amplo e tem o chão tomado por areia, com paredes e obstáculos que exigem atenção durante a cavalgada.'],
curiosities:[['Areia como água','O deslocamento de Dirge lembra o de uma criatura aquática, mas acontece sob o piso seco da caverna.'],['Uma perseguição montada','O encontro dá destaque à coordenação entre cavalgada e arco, em vez de começar com uma longa escalada.']],
hints:[['Mantenha a cavalgada.','Use Agro e escolha um trajeto livre de paredes e pedras.'],['Olhe para trás.','Quando o rosto emergir durante a perseguição, procure uma oportunidade de usar o arco nos olhos.'],['Aproveite a interrupção.','Se o colosso ficar atordoado, aproxime-se e busque a pelagem exposta.']],nomad:'2015/03/10th-colossus.html',sizeSource:['https://gaming.stackexchange.com/a/10800','Arqade — comprimento estimado (260 pés, cerca de 79 m)']
},
{
n:11,name:'Celosia',dev:'Leo_A',gloss:'Leão A',form:'Quadrúpede',size:'3,7',measure:'Altura',coord:'F1',place:'Templo das chamas',
subtitle:'Um pequeno guardião, uma fúria imensa.',intro:'Celosia troca a altura dos grandes gigantes pela rapidez das investidas. Entre altares acesos, cada metro de distância faz diferença.',
heading:'A força concentrada de uma fera',description:['O corpo compacto e a cabeça larga lembram uma fera coberta de pedra. A armadura acompanha o dorso, enquanto as patas curtas sustentam arrancadas rápidas.','Perto de Wander, Celosia ainda é imponente. A escala menor torna o confronto mais próximo, com pouco tempo para reagir quando o guardião cruza o salão.'],
route:['Cavalgue para o norte, acompanhando os pilares da grande ponte de entrada das Terras Proibidas. Procure a abertura do desfiladeiro.','Deixe Agro no alto e desça pelo caminho sinuoso. O templo se encontra junto à parede rochosa, acima da área de água no fundo do vale.'],
curiosities:[['Chamas persistentes','Os braseiros fazem parte do ambiente do templo e permanecem acesos mesmo depois do confronto.'],['Escala e velocidade','Celosia está entre os menores colossos. As investidas rápidas compensam a ausência de uma silhueta gigantesca no horizonte.']],
hints:[['Procure os braseiros.','Subir em um deles dá espaço para observar a reação do colosso.'],['Experimente o fogo.','Um objeto derrubado perto do altar pode se transformar em uma ferramenta útil.'],['Abra caminho pela armadura.','Use o ambiente para expor a pelagem antes de tentar permanecer sobre suas costas.']],nomad:'2014/01/11th-colossus.html'
},
{
n:12,name:'Pelagia',dev:'Poseidon',gloss:'Poseidon',form:'Aquático',size:'27,1',measure:'Altura',coord:'G2',place:'Lago da cachoeira',
subtitle:'Um gigante entre ilhas de pedra.',intro:'Pelagia emerge de um lago cercado por rochas e quedas-d’água. O corpo parcialmente submerso mistura a aparência de criatura e ruína.',
heading:'Uma forma difícil de reconhecer',description:['Pelagia tem uma anatomia incomum: cabeça sem olhos visíveis, grandes apêndices voltados para a frente e protuberâncias sobre o topo. A vegetação cobre parte de suas costas.','A superfície da água esconde suas proporções completas. As plataformas espalhadas pelo lago aproximam a arquitetura da arena das estruturas que parecem crescer no próprio colosso.'],
route:['Saia para o norte e siga pelo desvio a nordeste, atravessando a ponte rochosa e a pequena floresta.','A grande cachoeira marca a chegada. Continue pelas margens e a nado até as plataformas de pedra no lago, onde acontece o encontro.'],
curiosities:[['Sem olhos visíveis','O rosto de Pelagia não apresenta olhos aparentes, apesar de o colosso acompanhar os movimentos de Wander.'],['Uma silhueta incompleta','A água encobre boa parte do corpo. O que se vê acima da superfície é apenas uma fração de sua estrutura.']],
hints:[['Evite a linha de tiro.','Use os obstáculos do lago para se proteger dos ataques à distância.'],['Contorne o corpo.','Procure a vegetação nas costas para iniciar a subida.'],['Observe o topo da cabeça.','As protuberâncias reagem aos golpes e podem ajudar a alcançar terreno mais alto.']],nomad:'2011/12/pelagia-12th-colossus.html'
},
{
n:13,name:'Phalanx',dev:'Snake_C',gloss:'Serpente C',form:'Alado',size:'146',measure:'Comprimento',coord:'E6',place:'Deserto ao sudoeste',
subtitle:'Uma linha viva atravessa o céu.',intro:'Phalanx desliza sobre as dunas com uma serenidade incomum. Seu corpo comprido faz o céu do deserto parecer pequeno.',
heading:'A extensão de um voo',description:['O corpo serpentino se prolonga entre grandes nadadeiras, pelagem e placas no dorso. Bolsas claras sob o ventre se destacam contra o céu e a areia.','Phalanx segue seu percurso pelo deserto sem investir diretamente contra Wander. A escala do encontro nasce do movimento contínuo e da distância que precisa ser vencida para acompanhá-lo.'],
route:['Siga para sudoeste e retorne ao deserto atravessado no caminho até Barba. Desta vez, permaneça na grande região aberta de areia.','Oriente-se pela espada até as ruínas baixas no centro do deserto. Agro é a companhia para acompanhar o colosso pelo terreno.'],
curiosities:[['Um comportamento singular','Phalanx não parte para ataques diretos contra Wander. O contraste entre tranquilidade e tamanho marca o encontro.'],['Duas escalas nas fontes','As dimensões publicadas variam: há estimativas de 146 m e referências a 200 m. A ficha mantém explícita a medida adotada.']],
hints:[['Observe o ventre.','Use o arco nas bolsas claras para tentar reduzir a altura do voo.'],['Acompanhe com Agro.','Quando as nadadeiras descerem, cavalgue ao lado para buscar um ponto de apoio.'],['Planeje o percurso.','No dorso, acompanhe a abertura das placas e conserve resistência durante as mudanças de direção.']],nomad:'2014/05/'
},
{
n:14,name:'Cenobia',dev:'Cerberus',gloss:'Cérbero',form:'Quadrúpede',size:'3,4',measure:'Altura',coord:'C2',place:'Cidade oculta',
subtitle:'O silêncio das ruínas se desfaz.',intro:'Cenobia guarda uma cidade escondida entre montanhas. Suas investidas transformam colunas e passarelas em partes de um percurso em constante mudança.',
heading:'Uma armadura em disparada',description:['Baixo, compacto e coberto de placas, Cenobia tem a silhueta de uma fera preparada para avançar. O corpo se projeta para a frente em ataques rápidos e insistentes.','O tamanho contrasta com a amplitude das ruínas. O encontro se espalha por pilares, plataformas e paredes, obrigando Wander a olhar além do chão.'],
route:['Viaje para noroeste, seguindo o vale entre montanhas e os vestígios de colunas pelo caminho.','Na caverna com água, deixe Agro e continue a nado. Do outro lado, a passagem leva a uma cidade em ruínas, tomada por vegetação e estruturas elevadas.'],
curiosities:[['Canais entre as ruínas','Pequenos canais atravessam a cidade. São detalhes da arquitetura que podem passar despercebidos durante a perseguição.'],['Um parentesco visual','Cenobia e Celosia compartilham o porte compacto e as investidas. As arenas, porém, dão ritmos bastante diferentes aos encontros.']],
hints:[['Ganhe altura.','Procure a coluna caída para começar a atravessar as estruturas acima do chão.'],['Observe as investidas.','A força do colosso pode mudar a posição dos pilares e abrir o próximo trecho.'],['Use as ruínas.','Crie uma abertura na proteção do dorso antes de tentar atacar de perto.']],nomad:'2011/08/cenobia-14th-colossus.html'
},
{
n:15,name:'Argus',dev:'Minotaur_C',gloss:'Minotauro C',form:'Bípede',size:'21',measure:'Altura',coord:'G1',place:'Fortaleza ao nordeste',
subtitle:'Um sentinela entre pontes partidas.',intro:'Argus ocupa uma fortaleza estreita à beira de um precipício. A arma de pedra e o passo pesado obrigam Wander a buscar caminhos pelas próprias ruínas.',
heading:'O gigante e a fortaleza',description:['Braços fortes, ombros largos e uma grande arma definem o perfil de Argus. A pedra forma proteções ao redor do corpo, alternando superfícies rígidas e áreas de pelo.','As galerias laterais aproximam o colosso da arquitetura. Visto entre os pilares, ele parece alto o bastante para ocupar vários andares de uma só vez.'],
route:['Siga para o extremo nordeste, passando a leste da região de Celosia. Procure o grande templo em ruínas junto às montanhas.','Continue a pé pelas escadas e pelos trechos quebrados até a área aberta e comprida. O precipício no final marca o local da chegada de Argus.'],
curiosities:[['O terceiro minotauro','Minotaur_C completa a sequência de nomes de desenvolvimento que inclui Valus e Barba.'],['Uma fortaleza antiga','Torres, arcos e muralhas compõem a entrada da arena. A areia ao redor reforça a aparência de um lugar abandonado.']],
hints:[['Evite o centro do chão.','Procure as laterais e observe como os golpes afetam as placas e os apoios.'],['Suba pelas ruínas.','As galerias oferecem uma posição melhor para alcançar o gigante.'],['Observe as reações.','Nem toda abertura está visível de início; use a espada e acompanhe os movimentos dos braços.']],nomad:'2011/07/argus-15th-colossus.html'
},
{
n:16,name:'Malus',dev:'Evis',gloss:'Evis',form:'Humanoide',size:'60',measure:'Altura',coord:'F8',place:'Santuário no extremo sul',
subtitle:'Uma última silhueta sob a tempestade.',intro:'No extremo sul, Malus se ergue como uma torre diante de Wander. O último encontro reúne distância, abrigo e escalada em uma paisagem tomada pela chuva.',
heading:'Uma construção que observa',description:['A base larga se organiza em camadas de pedra, como uma torre. Acima dela, o tronco humanoide, os braços longos e as mãos enormes dão movimento à estrutura.','Malus permanece fixo no lugar, mas alcança grandes distâncias com seus projéteis. A aproximação e a subida formam etapas distintas de um mesmo encontro.'],
route:['Siga para o extremo sul do mapa, contornando as montanhas até o grande portão. Essa passagem só fica disponível após os quinze encontros anteriores.','A partir do portão, continue pelo percurso que sobe até a região elevada. A ficha preserva os acontecimentos desse caminho para quem ainda não chegou até aqui.'],
curiosities:[['Uma base imóvel','Malus não caminha pela arena. A parte inferior funciona como uma grande construção que precisa ser escalada.'],['A música do último encontro','A faixa “Demise of the Ritual” acompanha a batalha, dando ao cenário uma atmosfera diferente dos confrontos anteriores.']],
hints:[['Avance de abrigo em abrigo.','Use as barreiras e passagens subterrâneas para reduzir a exposição aos projéteis.'],['Leia a estrutura.','Ao alcançar a base, procure saliências e superfícies que permitam continuar a subida.'],['Observe mãos e braços.','As reações aos seus ataques podem criar novos caminhos; espere estabilidade antes de saltar.']],extra:['https://colossipedia.blogspot.com/2017/08/malus.html','Colossipédia — nome de desenvolvimento, localização e detalhes'],nameSource:'https://colossipedia.blogspot.com/2017/08/malus.html'
}
];
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const template = fs.readFileSync(path.join(base,'Pages/Colosso1.html'),'utf8');
const header = template.slice(template.indexOf('<body>'),template.indexOf('    <main'));
const footer = template.slice(template.indexOf('    <footer>'));
for (const c of records) {
 const num=String(c.n).padStart(2,'0');
 const guide='https://vandal.elespanol.com/guias/guia-shadow-of-the-colossus-ps4-remake-trucos-y-consejos/'+(c.slug||c.n+'-'+c.name.toLowerCase());
 const sources=[];
 if(c.nomad) sources.push(['https://nomads-sotc-blog.blogspot.com/'+c.nomad,'Nomad’s blog — nomes, localização e observações sobre '+c.name]);
 if(c.nameSource&&!c.extra?.some(x=>x===c.nameSource)) sources.push([c.nameSource,'Fanlore — nomes dos colossos']);
 sources.push([guide,'Vandal — ficha e orientações de combate (guia completo com spoilers)']);
 if(c.extra) sources.push(c.extra);
 if(c.sizeSource) sources.push(c.sizeSource);
 const sizeNote=c.sizeSource?'A medida indicada segue a estimativa da comunidade citada nas fontes.':'A medida indicada segue o guia Vandal, citado nas fontes.';
 const curiosities=[['Dois nomes, duas origens',`“${c.dev}” é um nome de desenvolvimento. “${c.name}” é o nome popular entre os fãs, não um nome próprio apresentado durante o jogo.`],...c.curiosities];
 const html=`<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Conheça ${c.name}, colosso ${num}: nome de desenvolvimento, descrição, localização, tamanho, curiosidades e dicas leves de combate.">
    <title>${c.name} · Colosso ${num} | Project Colossus</title>
    <link rel="stylesheet" href="../Styles/Colossos.css">
</head>
${header}    <main id="conteudo">
        <nav class="breadcrumb" aria-label="Localização na página"><a href="HomePage.html#colossos">← Todos os colossos</a><span>${num} / 16</span></nav>
        <section class="colossus-intro" aria-labelledby="nome">
            <figure class="portrait"><img src="../Images/Colossos/${c.name}/${c.name}Cinematic.webp" alt="Interpretação artística de ${c.name}, colosso ${num} de Shadow of the Colossus." width="1254" height="1254" fetchpriority="high"><figcaption>Interpretação artística · imagem gerada por IA</figcaption></figure>
            <div class="intro-copy">
                <p class="eyebrow">Colosso ${num} · Terras Proibidas</p>
                <h1 id="nome">${c.name}</h1>
                <p class="subtitle">${esc(c.subtitle)}</p>
                <dl class="identity"><div><dt>Nome popular entre os fãs</dt><dd>${c.name}</dd></div><div><dt>Nome de desenvolvimento</dt><dd>${c.dev}${c.gloss!==c.dev?` <span>· ${c.gloss}</span>`:''}</dd></div></dl>
                <p class="intro-text">${esc(c.intro)}</p>
                <a class="outline-link" href="#descricao">Conheça o gigante <span aria-hidden="true">↓</span></a>
            </div>
        </section>
        <dl class="facts" aria-label="Ficha rápida"><div><dt>Ordem do encontro</dt><dd>${num} <span>de 16</span></dd></div><div><dt>Forma</dt><dd>${c.form}</dd></div><div><dt>${c.measure} ${c.measure==='Comprimento'?'aproximado':'aproximada'}</dt><dd>${c.size} <span>metros*</span></dd></div><div><dt>Localização no mapa</dt><dd>${c.coord} <span>· ${c.place.toLowerCase()}</span></dd></div></dl>
        <nav class="section-nav" aria-label="Seções desta ficha"><a href="#descricao">Descrição</a><a href="#localizacao">Localização</a><a href="#curiosidades">Curiosidades</a><a href="#combate">Como enfrentar</a></nav>
        <div class="reading-grid">
            <section id="descricao" class="text-section"><p class="eyebrow">01 / O gigante</p><h2>${esc(c.heading)}</h2>${c.description.map(p=>`<p>${esc(p)}</p>`).join('')}<p class="note">*${sizeNote} Os tamanhos variam entre fontes e escalas; esta é uma referência aproximada de ${c.measure.toLowerCase()}, não uma medida oficial confirmada.</p></section>
            <section id="localizacao" class="text-section location"><p class="eyebrow">02 / O caminho</p><h2>${c.place}</h2><div class="map-coordinate"><strong>${c.coord}</strong><span>${c.place}<br>Terras Proibidas</span></div>${c.route.map(p=>`<p>${esc(p)}</p>`).join('')}<a class="text-link" href="mapa.html">Abrir mapa das Terras Proibidas <span aria-hidden="true">↗</span></a></section>
        </div>
        <section id="curiosidades" class="text-section curiosities"><p class="eyebrow">03 / Um olhar mais atento</p><h2>Detalhes que passam despercebidos</h2><div class="curiosity-grid">${curiosities.map(([h,p],i)=>`<article><span class="item-number">${['I','II','III'][i]}</span><h3>${esc(h)}</h3><p>${esc(p)}</p></article>`).join('')}</div></section>
        <section id="combate" class="text-section combat"><div><p class="eyebrow">04 / O encontro</p><h2>Observe antes de atacar</h2><p>Algumas pistas para começar, deixando a descoberta da luta com você.</p></div><details class="combat-hints"><summary>Revelar dicas de combate <span>Spoilers leves</span></summary><ol>${c.hints.map(([h,p])=>`<li><strong>${esc(h)}</strong> ${esc(p)}</li>`).join('')}</ol><p class="note">Dicas gerais para o modo Normal. A ficha não detalha todos os pontos vitais nem o desfecho do confronto.</p></details></section>
        <section class="sources" aria-labelledby="fontes"><h2 id="fontes">Fontes e notas</h2><p>Ficha baseada em registros da comunidade e guias de jogo. A arte é uma interpretação visual, não uma captura do jogo.</p><ul>${sources.map(([url,label])=>`<li><a href="${esc(url)}">${esc(label)}</a></li>`).join('')}</ul></section>
        <div class="page-end"><a class="outline-link" href="HomePage.html#colossos">← Voltar à galeria</a><a class="text-link" href="#conteudo">Voltar ao topo ↑</a></div>
    </main>
${footer}`;
 fs.writeFileSync(path.join(base,`Pages/Colosso${c.n}.html`),html);
}
console.log('15 fichas geradas seguindo o modelo do Valus.');
