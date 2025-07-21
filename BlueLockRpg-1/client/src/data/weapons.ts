export interface WeaponLevel {
  name: string;
  description: string;
}

export interface Weapon {
  id: string;
  name: string;
  category: 'Ofensivo' | 'Defensivo' | 'Técnico' | 'Físico' | 'Mental';
  description: string;
  specialization: string[];
  levels: WeaponLevel[];
}

export const weaponsData: Weapon[] = [
  {
    id: 'dribles-magicos',
    name: 'Dribles Mágicos',
    category: 'Técnico',
    description: 'Os Dribles Mágicos são o tipo de Drible mais voltado para a enganação, usando de toda sua criatividade e "magia" para ultrapassar todo e qualquer oponente.',
    specialization: ['Drible', 'Finta', 'Criatividade'],
    levels: [
      {
        name: 'Truque de Mágica',
        description: 'Os "Dribles Mágicos" visam fazer jogadas criativas e "estranhas". Gastando 5 FOL, você pode usar "Você não contava que..." para fazer algo surpreendente. DT varia entre 12-30 baseada na criatividade.'
      },
      {
        name: 'O Cartoleiro Louco',
        description: 'Você recebe movimento "Cartola" (gasto 1 FOL, DT 28, precisa teste Reação DT 25). Usar Cartola 3 vezes seguidas anula gasto do próximo drible e vira Ação Livre.'
      },
      {
        name: 'Abracadabra',
        description: 'Gastando 15 FOL e Ação Mental, use "Abracadabra" com d6 mágico. Cada face tem efeito escolhido por você com aprovação do Mestre (ex: movimento extra, acerto garantido).'
      },
      {
        name: 'Truque de Encerramento',
        description: 'Durante Acréscimos: gasto da "Cartola" anulado, "Truque de Mágica" custa 1 FOL, todas as DTs viram 15.'
      },
      {
        name: 'Ilusionismo',
        description: 'Gastando 20 FOL, crie ilusões em todos que interagiram com você no turno. Movimentos impossíveis e absurdos. Máximo 3x por partida, ganha 20-100 fama por uso.'
      }
    ]
  },
  {
    id: 'dribles-passivos',
    name: 'Dribles Passivos',
    category: 'Técnico',
    description: 'O drible mais técnico que tem, os Dribles Passivos utilizam da própria movimentação do adversário contra ele, se aproveitando de deslizes para ultrapassá-los facilmente.',
    specialization: ['Drible', 'Análise', 'Contra-ataque'],
    levels: [
      {
        name: 'Contra Drible',
        description: 'Observe testes de Roubo ruins do adversário, teste Análise (DT 26) para registrar resultado. Quando driblar ele, use o valor registrado em vez de dados.'
      },
      {
        name: 'Quebra de Movimentação',
        description: 'Se adversário tirar resultado "Medíocre" ou menor em teste de Drible, você passa automaticamente sem precisar testar.'
      },
      {
        name: 'Drible Fluido',
        description: 'Passando por 1 defensor, gaste 15 FOL para passar por todos em 15m dele (exceto goleiro). Basta um para passar por todos.'
      },
      {
        name: 'Sucesso Sucessivo',
        description: 'Com Sucesso Automático por 20 puro, anule para "guardar" e receber +6. Use o Sucesso guardado em outro teste de Drible.'
      },
      {
        name: 'Drible Genial',
        description: 'Contra Drible usado 2x, Quebra funciona até "Bom", Drible Fluido alcança 15m, Sucesso Sucessivo dá +10.'
      }
    ]
  },
  {
    id: 'forca-fisica',
    name: 'Força Física',
    category: 'Físico',
    description: 'A Força Física é uma arma natural que consiste em um poder muscular imenso e descontrolado, usado principalmente por brutamontes para neutralizar qualquer tentativa de movimentação oposta.',
    specialization: ['Físico', 'Corpo a Corpo', 'Intimidação'],
    levels: [
      {
        name: 'Brutamonte',
        description: 'Seu corpo é incrivelmente forte, um verdadeiro saco de músculos. Você recebe +1 Classe em 3 Perícias Físicas à sua escolha.'
      },
      {
        name: 'Jogo de Ombros',
        description: 'Recebe movimento "Jogo de Ombros" e "Forçar Corpo a Corpo". DT para tomar bola: 10 + FÍS + Mod. FÍS. Gasto: 2 FOL/turno, perde 1 Ação Física.'
      },
      {
        name: 'Ego Protein',
        description: 'Soma Modificador de Egoísmo no seu Físico, e pode usar pontos de EGO para repor pontos de FÍS.'
      },
      {
        name: 'Músculo Ambulante',
        description: 'Gastando 2 Pontos FÍS, troque dados de perícia para valor = Mod. FÍS. +2 Pontos para fazer mesmo com bônus.'
      },
      {
        name: 'Monstro Imparável',
        description: 'Em vez de gastar Pontos Físico no bônus, gaste para somar no resultado puro. Força inacreditável no corpo a corpo.'
      }
    ]
  },
  {
    id: 'mestre-da-finta',
    name: 'Mestre da Finta',
    category: 'Técnico',
    description: 'Essa Arma te dá habilidades invejáveis nas fintas, que te permitem enganar adversários sem parar, ultrapassando-os e os vencendo em disputas de um contra um.',
    specialization: ['Finta', 'Drible', 'Enganação'],
    levels: [
      {
        name: 'Arsenal de Fintas',
        description: 'Você tem capacidades extremamente versáteis e adaptáveis de Finta. Recebe +2 Classes em Finta, e ganha habilidades especiais para Drible, Chute e Roubo usando 3 FOL.'
      },
      {
        name: 'Aplicação de Fintas',
        description: 'Recebe +1 Classe em Finta, e pode aplicá-la em Escanteio, Lateral e Tiro Livre por 3 FOL cada, criando vantagens táticas para sua equipe.'
      },
      {
        name: 'Finta Visionária',
        description: 'Desenvolve habilidade especial baseada nas visões que possua: Meta Visão (modifica teste após resultado) ou Olho do Predador (ativa habilidades após 11 Fintas).'
      },
      {
        name: 'Fintas Exímias',
        description: 'Para cada finta realizada em um turno, recebe +1 em todos os testes no próximo teste de outra perícia sem ser Finta, gastando 7 FOL (ou 14 se ultrapassar +10).'
      },
      {
        name: 'Fintas de Mestre',
        description: 'Após qualquer ação física, gaste 3 FOL para realizar Finta (DT 25 + 1 por uso). Se passar, recebe +1 Ação Física e pode escolher dois alvos para não reagirem.'
      }
    ]
  },
  {
    id: 'movimentacao-zumbi',
    name: 'Movimentação Zumbi',
    category: 'Físico',
    description: 'A Movimentação Zumbi é uma Arma que utiliza como habilidade a movimentação errática e estranha de seu corpo, te tornando imprevisível e difícil de ler.',
    specialization: ['Drible', 'Imprevisibilidade', 'Resistência'],
    levels: [
      {
        name: 'Drible Zumbi',
        description: 'Impedindo que o adversário leia seu centro de gravidade, para cada 2 Classes que possuir em Drible, o alvo recebe -1 Classe no teste contra seu drible.'
      },
      {
        name: 'Morto-Vivo',
        description: 'Sua condição corporal te faz parecer morto. Recebe modificações passivas: lógica contrária nos testes (5 FOL), jogar com 0 FOL, deslocamento total fora do turno (10 FOL), turnos não contam para rodadas.'
      },
      {
        name: 'Centro de Gravidade Zumbificada',
        description: 'Movimentação completamente imprevisível. Teste Drible (DT 32 - 2 por Especialização) para anular efeitos de habilidades de Leitura, Controle, Contato Físico, Cópia, etc.'
      },
      {
        name: 'Descoordenação Cadavérica',
        description: 'Durante um turno: DT vira valor que NÃO pode atingir, pode trocar tipo de Movimento, trocar Finta/Corrida/Domínio/Roubo por Drible. Usos = Especializações (mínimo 1).'
      },
      {
        name: 'Cemitério de Egoístas',
        description: 'Ao vencer adversário com Morto Vivo, gaste 11 FOL para criar "lápide" (-2 penalidade). Com -12, remove Arma/Habilidades do adversário. Pode devorar jogadores.'
      }
    ]
  },
  {
    id: 'torre-de-vigia',
    name: 'Torre de Vigia',
    category: 'Mental',
    description: 'A Torre de Vigia é uma Arma estratégica e mental, que cumpre o papel de "Sentinela", observando todo o campo e coletando informações.',
    specialization: ['Análise', 'Percepção', 'Estratégia'],
    levels: [
      {
        name: 'Farol',
        description: 'Começa com perícias: Análise, Percepção, Estratégia e Reação (ou Especialidade em todas). Gastando 2 FOL, recebe +2/+4/+6/+8/+10 em teste de uma delas.'
      },
      {
        name: 'Coleta de Informações',
        description: 'No seu campo, gaste 3 FOL para registrar resultados em "Pontos de Informação" (≥17 = PI Positivo, ≤3 = PI Negativo). Use para dar bônus/penalidades.'
      },
      {
        name: 'Dados & Análises',
        description: 'Quando alguém realiza Ação, gaste 6 Pontos INT para ter estudado ela. Realize turno extra antes para alterar o resultado, recebe +1 PI (aumenta a cada uso).'
      },
      {
        name: 'Olhar do Vigia',
        description: 'Detecta automaticamente qualquer um em 30m e pode pará-los. +1d para habilidades imparáveis, DT para PI vira 15/7, gaste 3 PI para anular Sucesso Automático.'
      },
      {
        name: 'Sentinela',
        description: 'Sustentando com Ação Mental, aliados ganham "Olhar do Vigia" e "Coleta de Informações", e +6 em testes de Defesa, Interceptação e Roubo.'
      }
    ]
  },
  {
    id: 'velocidade-aceleracao',
    name: 'Velocidade: Aceleração',
    category: 'Físico',
    description: 'Esse tipo de velocidade permite que você se mantenha sempre energizado e em constante aceleração, correndo sem parar pelo campo com sua força de velocidade e capacidade de corrida.',
    specialization: ['Corrida', 'Velocidade', 'Resistência'],
    levels: [
      {
        name: 'Corrida Constante',
        description: 'Recebe +10m metros de deslocamento, e recebe uma Ação Física extra somente para correr.'
      },
      {
        name: 'Corrida da Vitória',
        description: 'Alcance do Chute máximo é igual ao seu deslocamento (limitado em 60m). Se estiver fora do alcance, gaste 7 FOL para correr direto ao alcance (limite 20m de diferença).'
      },
      {
        name: 'Medalhista em Maratona',
        description: 'Velocidade surpreendente em todos movimentos. Com 0 FOL, desde que percorra 40m todo turno, ainda pode jogar normalmente, usando habilidades de até 3 FOL.'
      },
      {
        name: 'Corrida de Captura',
        description: 'Quando adversário estiver com bola, gaste 15 FOL para, se roubar ela, receber bônus baseado na distância: 15-29m = +1 PA, 30-59m = +1 CA, 60+m = 20 FOL.'
      },
      {
        name: 'A Velocidade',
        description: 'Gastando 25 FOL, atravessa o campo inteiro. Com teste de Roubar (DT 35), pega a bola se ela estiver no fim da travessia.'
      }
    ]
  },
  {
    id: 'velocidade-divina',
    name: 'Velocidade: Divina',
    category: 'Físico',
    description: 'A Velocidade: Divina é a mais poderosa "Velocidades", representando um tipo de movimento de corrida que é capaz de ultrapassar a compreensão visual. É um estilo subjetivo, mas com uma força imensa.',
    specialization: ['Velocidade', 'Transcendência', 'Movimento Divino'],
    levels: [
      {
        name: 'Ascensão Velocímetra',
        description: 'Sua aceleração se torna surreal. Baseado na Velocidade anterior: Aceleração (deslocamento dobrado sustentando 3 VEL), Explosão (parar 2 turnos para 150m no próximo), Ninjutsu (mover para qualquer ponto do campo).'
      },
      {
        name: 'Velocidade Transcendental',
        description: 'Seus movimentos transcendem a física normal. Pode ignorar obstáculos, atravessar múltiplos adversários sem ser interceptado, e realizar ações impossíveis de velocidade.'
      },
      {
        name: 'Ruptura Temporal',
        description: 'Sua velocidade afeta o tempo ao redor. Pode "pausar" o jogo por um momento para reposicionar-se, ou criar múltiplas imagens de movimento simultâneo.'
      },
      {
        name: 'Omnipresença Veloz',
        description: 'Pode estar em múltiplos lugares ao mesmo tempo durante uma jogada. Seus movimentos se tornam tão rápidos que parecem estar em todos os lugares simultaneamente.'
      },
      {
        name: 'Velocidade Absoluta',
        description: 'Atinge a velocidade máxima concebível. Pode atravessar o campo instantaneamente, interferir em qualquer jogada no campo, e seus movimentos se tornam imparáveis por meios convencionais.'
      }
    ]
  },
  {
    id: 'velocidade-explosao',
    name: 'Velocidade: Explosão',
    category: 'Físico',
    description: 'A Velocidade de Explosão permite que você realize explosões de velocidade extremamente poderosas, disparando de um ponto até o outro, mas sem muita cadência.',
    specialization: ['Velocidade', 'Explosão', 'Corrida'],
    levels: [
      {
        name: 'Combustão Instantânea',
        description: 'Uma vez por turno, gastando 5 FOL, pode aumentar seu deslocamento em +24m. Pode reagir a ações além do alcance de reação, até 5m + Mod. VEL além do limite.'
      },
      {
        name: 'Trem Bala Maglev',
        description: 'Ao disputar corrida, gastando 1 CA, pague FOL à escolha para aumentar resultado puro (+1 por FOL). Com 20 puro, ganha +5m DESL permanente (limite ⅓ do deslocamento padrão).'
      },
      {
        name: 'Jet Counter',
        description: 'Contra múltiplos defensores, gaste 7 FOL para teste Correr (DT 22 +1 por defensor, +2 se tiver Velocidade). Se passar, move 5m por defensor e ultrapassa todos.'
      },
      {
        name: 'Velocidade Explosiva',
        description: 'Pode usar "Combustão Instantânea" duas vezes por turno, DT base de "Jet Counter" vira 20, anula bônus extra de velocistas defensores.'
      },
      {
        name: 'Rei Velocista',
        description: 'Velocidade "mais rápida que o som". Meta exclusiva: mover 1500 metros por partida. Se cumprir, entra em Fluxo automaticamente.'
      }
    ]
  },
  {
    id: 'velocidade-ninjutsu',
    name: 'Velocidade: Ninjutsu',
    category: 'Físico',
    description: 'A Velocidade: Ninjutsu não foca na constância de corrida, e sim na forma que ela é realizada, através de passos ligeiros e silenciosos, como um verdadeiro ninja.',
    specialization: ['Furtividade', 'Ninjutsu', 'Velocidade'],
    levels: [
      {
        name: 'Jutsu da Folha: Som da Ventania',
        description: 'Enquanto furtivo, qualquer oponente atrás de você conta como "Ultrapassado". Sempre estará no Ponto Cego dos adversários enquanto furtivo.'
      },
      {
        name: 'Jutsu da Folha: Arte da Ocultação',
        description: 'Não perde furtividade ao falhar teste gastando 3 FOL. Sustentando 5 FOL, fica furtivo com a bola. No Ponto Cego, pode trocar perícia de referência para Furtividade.'
      },
      {
        name: 'Jutsu da Folha: Maestria Ninja',
        description: 'Turnos não contam para andamento das Rodadas. Gastando 2 CA, pode usar 3 Ações Físicas despercebido (2 com bola). Pode trocar perícias físicas/livres por Furtividade.'
      },
      {
        name: 'Ninjutsu Secreto: Espionagem Shinobi',
        description: 'Sustentando Furtividade (DT 25), fica furtivo a 15m de alvo que estava a 30m. Pode interromper ações dele, removendo bônus ou aplicando "Surpreso"/"Ponto Cego".'
      },
      {
        name: 'Ninjutsu Final: Técnica do Passo do Dragão',
        description: 'Gastando 15 FOL: "Sabotagem" (-16 em perícias no próximo turno, máximo 2x por alvo) ou "Infiltração" (ativa "Espionagem Shinobi" automaticamente).'
      }
    ]
  },
  {
    id: 'visao-fria-calculista',
    name: 'Visão Fria e Calculista',
    category: 'Mental',
    description: 'Uma Arma mental extremamente certeira e precisa, que amplifica sua visão de jogo, permitindo um julgamento equilibrado, ações exatas e leitura de jogo otimizada.',
    specialization: ['Análise', 'Frieza Mental', 'Cálculo'],
    levels: [
      {
        name: 'Friamente Certeiro',
        description: 'Com 15+ puro em teste de Análise, ganha "Carga Analítica". Ao usar cargas, gira teste de Análise como secundário, podendo escolher qual resultado usar.'
      },
      {
        name: 'Calculadora Mental',
        description: 'Ao usar Carga Analítica, recebe "Alerta" personalizado. Quando evento acontecer, move automaticamente para 30m do local e +5 para reagir. Pode transferir para aliado.'
      },
      {
        name: 'Frieza',
        description: 'Ao tentarem interromper ações, gaste Carga Analítica para reduzir categoria do teste inimigo em um nível. Para ações em outros jogadores, gaste 2 Cargas para reduzir duas vezes.'
      },
      {
        name: 'Cabeça Fria',
        description: 'Imune a condições mentais. Não pode usar Fúria, recebe +1 FOL no lugar de Pontos de Fúria. Quando fosse maximizar Fúria, entra em Fluxo.'
      },
      {
        name: 'Calculismo Álgido',
        description: 'Pode ser afetado por condições mentais positivas. Cargas Analíticas obtidas com 10 no dado. Alcances de "Calculadora Mental" reduzidos. "Frieza" mantém 1 Carga para outros jogadores.'
      }
    ]
  },
  {
    id: 'ambidestria',
    name: 'Ambidestria',
    category: 'Técnico',
    description: 'A Ambidestria é uma Arma Menor que oscila entre mental e corporal, usando capacidade cognitiva para controlar perfeitamente o setor esquerdo e direito de seu corpo.',
    specialization: ['Ambidestria', 'Controle Corporal', 'Imprevisibilidade'],
    levels: [
      {
        name: 'Maestria Ambidestra',
        description: 'Imune a penalidades por marcação na perna boa (se duas pessoas te marcarem). +2 no primeiro teste de Chute, Passe, Cruzamento e Precisão por partida. Todo turno gira 1d6: 1-3 = Esquerda, 4-6 = Direita. +2 em ações do lado da "Perna Superior".'
      },
      {
        name: 'Habilidoso (Destro)',
        description: 'Durante "Perna Superior" Direita, todas suas perícias são uma Classe superior (se Classe X, ganha Sucesso Automático).'
      },
      {
        name: 'Sinistro (Canhoto)',
        description: 'Durante "Perna Superior" Esquerda, pode usar habilidades de Nível 1 das Armas: Dribles Mágicos, Controle de Bola, Domínio de Bola, Kaiser Impact, Genialidade.'
      }
    ]
  },
  {
    id: 'atacante-fantasma',
    name: 'Atacante Fantasma',
    category: 'Técnico',
    description: 'O Atacante Fantasma cumpre o papel de segundo atacante pela surdina, se movendo pelas sombras como um auxiliar para o atacante principal, aprimorando o jogo coletivo.',
    specialization: ['Furtividade', 'Apoio', 'Jogo Coletivo'],
    levels: [
      {
        name: 'A Sombra',
        description: 'Funciona a 20m do Atacante Principal enquanto furtivo. Escolha "Receptor" (recebe bola quando Principal perderia, +1/+2/+3 Classes por 5 FOL) ou "Doador" (passe com +1/+3/+5/+7/+9/+11 por 3 FOL). Cada 5/3 FOL extra aumenta bônus em 1.'
      },
      {
        name: 'A Sombra (2)',
        description: 'Distância aumenta para 30m, gastos reduzem para 5/2 FOL, +2 em Furtividade, pode trocar Ação Mental por Física sob efeito.'
      },
      {
        name: 'Inversão Fantasmagórica',
        description: 'Se ambos gastarem FOL, pode trocar papéis, você vira Atacante Principal e ele segue sua escolha anterior. Troca pode ser feita como Reação no seu turno ou do antigo Principal.'
      }
    ]
  },
  {
    id: 'contato-visual',
    name: 'Contato Visual',
    category: 'Mental',
    description: 'O Contato Visual é uma Arma Menor de dupla que permite manter um ritmo de evolução e sincronia com um aliado constantemente, enquanto consigam se olhar.',
    specialization: ['Sinergia', 'Comunicação', 'Trabalho em Equipe'],
    levels: [
      {
        name: 'Linha de Contato',
        description: 'Mantendo contato visual com aliado: +3 em todos testes, +6 em testes conjuntos. NT 13+ inclui terceiro personagem. Condições: não furtivo, dentro alcance reação, sem inimigos entre. Se ambos têm arma: +4/+8.'
      },
      {
        name: 'Olhar Sinérgico',
        description: 'Enquanto se olharem, sempre em Sinergia com Módulo variável. Durante Sinergia, bônus vira +4/+8. Se ambos têm arma: +5/+10.'
      },
      {
        name: 'Olho por Olho',
        description: 'Habilidades visuais (Olho do Predador, Meta Visão) compartilhadas mesmo sem possuir. Quem não tem acessa quantidade -1. Bônus +5/+10, ou +6/+12 se ambos têm arma.'
      }
    ]
  },
  {
    id: 'chute-todo-poderoso',
    name: 'Chute Todo Poderoso',
    category: 'Ofensivo',
    description: 'O Chute Todo Poderoso é uma arma que aprimora os poderes das armas "Chute Direto", "Kaiser Impact" ou "Chute Explosivo", tornando-as ainda mais poderosas.',
    specialization: ['Chute', 'Aprimoramento', 'Poder'],
    levels: [
      {
        name: 'Impacto Divino',
        description: 'CHUTE DIRETO: Troca Precisão por Chute, +1 em Chute para cada 2 Classes Precisão. KAISER IMPACT: Voleio Imperial com até 5 pessoas, Lightning Strike só parado com Meta Visão. CHUTE EXPLOSIVO: +1 Vibração Celular por rodada (+1 no Fluxo, +1 com habilidades especiais).'
      },
      {
        name: 'Força Total',
        description: 'CHUTE DIRETO: Recebe "Faro de Gol" (+12 se já tinha), usa múltiplas vezes (-2 por uso). KAISER IMPACT: Usa em Tiro Meta/Pênaltis/Livre/Passes 15m (Magnus: +Escanteios/Passes/Cruzamentos). CHUTE EXPLOSIVO: "Ímpeto Explosivo" em Escanteios/Faltas, +3 Vibração por cartão amarelo.'
      },
      {
        name: 'Impacto Divino',
        description: 'CHUTE DIRETO: "Voleio Três Armas" (+3 Classes perna boa/-3 adversários, perna ruim dobra penalidades mas +1 Nível Ambidestria). KAISER IMPACT: +1 uso Kaiser Magnus por 30 FOL. CHUTE EXPLOSIVO: 15 Vibração = próximo nível (Nível 5 = Despertar, Despertado = +10 PD).'
      }
    ]
  },
  {
    id: 'diagnostico',
    name: 'Diagnóstico',
    category: 'Mental',
    description: 'O Diagnóstico tem como objetivo analisar e avaliar os jogadores em campo, explorando seus pontos fortes e fracos para superá-los.',
    specialization: ['Análise', 'Estratégia', 'Avaliação'],
    levels: [
      {
        name: 'Consultar',
        description: 'Classifica jogadores (Velocistas, Defensores, Suportes, Craques, Atacantes, Oportunistas) por 5 FOL. Recebe bônus específicos contra cada tipo. Máximo = Classe Análise.'
      },
      {
        name: 'Examinar',
        description: 'Após consultar, ranqueia em C/B/A/S por 5 FOL. Rank C: sucesso automático se 2+ Classes maior. Rank B-: gasta 4 FOL ou refaz teste. Rank A-: +1/-1 Classes. Rank S-: +2 acumulativo após falhar.'
      },
      {
        name: 'Inspecionar',
        description: 'Revela consultas em intervalos. Classifica aliados: Ofensivos (+1 Classe em disputas iniciadas), Balanceados (-7 FOL total/turno), Defensivos (reação extra se ultrapassado). 5 FOL por inspeção.'
      }
    ]
  },
  {
    id: 'drible-de-maquina',
    name: 'Drible de Máquina',
    category: 'Técnico',
    description: 'Esses dribles seguem um estilo mecânico e fechado, com movimentos padronizados e certeiros, sem margem para erros ou falhas, e mesmo sendo "previsíveis" até certo ponto, são difíceis de serem impedidos.',
    specialization: ['Drible', 'Precisão', 'Programação'],
    levels: [
      {
        name: 'Movimentos Programados',
        description: 'Dribles com total precisão que se adaptam à reação do adversário. Após falhar um drible, pode gastar 10 FOL para refazer o teste, descrevendo como o drible se adapta exatamente à forma que o defensor venceu.'
      },
      {
        name: 'Previsão Robótica',
        description: 'Gastando 4 FOL e 5 INT, programa 3 dribles. Se a descrição do defensor for inferior tecnicamente ao seu drible programado, passa automaticamente. Cada drible programado só pode ser usado uma vez.'
      },
      {
        name: 'Sistema Mecânico Tecnológico',
        description: 'Pode programar quantos dribles quiser, gastando apenas 2 FOL com eles. Para cada Drible Programado bem-sucedido, ganha direito a programar uma Ação também.'
      }
    ]
  },
  {
    id: 'fingir-falta',
    name: 'Fingir Falta',
    category: 'Mental',
    description: 'Uma técnica maliciosa que se aproveita da enganação e da "ocultação" de movimentos do árbitro para tirar vantagem. É uma arma perigosa, e se bem usada, pode causar muitos problemas aos adversários.',
    specialization: ['Enganação', 'Interação Social', 'Malícia'],
    levels: [
      {
        name: 'Definitivamente Foi Falta',
        description: 'Em interações físicas, o adversário tem -4 no valor puro para critérios de faltas, quedas e lesões. Gastando 10 FOL, aumenta para -8.'
      },
      {
        name: 'Olha o Cartãozinho!',
        description: 'Ao usar "Definitivamente Foi Falta", teste Interação Social (DT 24) para fingir algo mais sério. 10 FOL = Cartão Amarelo (uma vez). Se já tinha amarelo: -2 na perícia usada (20 FOL = -6).'
      },
      {
        name: 'Tua Mãe Aquela #@!$&*',
        description: 'No mano a mano, teste Interação Social vs Determinação do adversário. Se vencer, ele te ofende e recebe penalizações que variam de aviso até Cartão Vermelho. 3 FOL e Ação Mental.'
      }
    ]
  },
  {
    id: 'forca-de-vontade',
    name: 'Força de Vontade',
    category: 'Mental',
    description: 'Essa Arma mostra sua determinação e força de vontade inabalável, que te farão resistir até o fim. Sempre que derrubado, você voltará mais forte, e mais ardente, pronto para tornar-se o melhor.',
    specialization: ['Determinação', 'Resistência', 'Vontade'],
    levels: [
      {
        name: 'Vontade Ardente',
        description: 'Para cada 1 FOL gasto, anula 1 de penalidade (dados). Limite = NT +1 para cada 2 Classes em Determinação. Primeira Condição Negativa pode ser anulada. Pode anular lesões.'
      },
      {
        name: 'Determinação Inalcançável',
        description: 'Ao ser interrompido, gaste 5 FOL para teste extra de Determinação e penalidade no adversário = dobro das Classes Determinação. Com diferença de NT, pode gastar 2 CA para passar automaticamente.'
      },
      {
        name: 'Me Devore, Que Eu Voltarei Mais Forte!',
        description: 'Na primeira vez Devorado por partida, gaste todo FOL para converter penalidades em bônus. Sob Condição "Devorado", pode ativar Despertar, anulando a Condição enquanto durar.'
      }
    ]
  },
  {
    id: 'marcacao-stalker',
    name: 'Marcação Stalker',
    category: 'Defensivo',
    description: 'A Marcação Stalker é um tipo diferenciado de marcar o adversário, mantendo uma distância de 2 metros no formato de um semicírculo, similar a um transferidor. Essa marcação não dificulta os movimentos adversários, mas limita suas opções de jogo.',
    specialization: ['Marcação', 'Pressão', 'Controle'],
    levels: [
      {
        name: 'Pé no Saco',
        description: 'Sustentando 3 FOL, acompanha alvo a qualquer ponto do campo. +2 Interceptação para impedir passes, +4 contra dribles. Alvo pode sustentar até 6 FOL para anular bônus (1 FOL anula 1 bônus).'
      },
      {
        name: 'Transferidor Sexy',
        description: 'Semicírculo de 2m priva opções do adversário. +4 Interceptação, +6 contra dribles. Pode impedir até 2 alvos de receber/passar bola. Alvo pode sustentar até 10 FOL.'
      },
      {
        name: 'Diâmetro de Pressão',
        description: 'Domínio total em 2m. Intercepta automaticamente passes ao alvo, bloqueia até 3 opções de passe dele. 5 FOL para "frear" movimento (limita deslocamento ao seu se ele tiver mais).'
      }
    ]
  },
  {
    id: 'monstruosidade-egoica',
    name: 'Monstruosidade Egóica',
    category: 'Mental',
    description: 'A "Monstruosidade Egóica" é uma Arma Menor que complementa seu estilo de jogo, aprimorando cada característica sua, o que te permite um jogo "solo", somente avançando e devorando tudo pela frente.',
    specialization: ['Egoísmo', 'Individualismo', 'Devoração'],
    levels: [
      {
        name: 'Uma Fera Dentro de Campo',
        description: 'Ao ultrapassar adversário, bônus baseado no valor puro: 12-15 (+15m, +2 testes), 16-19 (move até próximo, +3 testes), 20 (move até próximo, +1 Ação Física, +4 testes). 1 CA aumenta patamar em 1.'
      },
      {
        name: 'Gingado Monstruoso',
        description: 'Bola grudada no pé confunde adversário. Só adversário testa, você gasta Deslocamento para reduzir resultado dele (limite = dobro Mod. VEL, mín. 2). Se vencer, move metros = Velocidade.'
      },
      {
        name: 'Consumação Egoísta',
        description: 'Sustentando 4 FOL, recebe turno extra junto do original. Ao final, escolhe qual usar. +1 acumulativo em perícias usadas no turno não utilizado.'
      }
    ]
  },
  {
    id: 'muralha-de-ferro',
    name: 'Muralha de Ferro',
    category: 'Defensivo',
    description: 'A Muralha de Ferro é um conjunto de técnicas defensivas baseada nos personagens do "Quarteto Muralha de Ferro" da Seleção Japonesa Sub-20. Os três níveis são totalmente distintos um dos outros, seguindo uma ordem de força e utilidade.',
    specialization: ['Defesa', 'Pressão', 'Percepção'],
    levels: [
      {
        name: 'Pressão Física',
        description: 'Aplica mais força na marcação. Barra de "Pressão" inicia em 5, gasta pontos para aumentar penalidade por marcação. Ao vencer disputa marcando alvo, ganha 1d3 de pressão.'
      },
      {
        name: 'Aceleração Explosiva',
        description: 'Quando time defende com sucesso, ganha +5m deslocamento (só no seu campo). Com Mod. VEL 5: 45m = Nível 1 Velocidade Aceleração, 90m = Nível 1 Velocidade Explosão.'
      },
      {
        name: 'Previsão Olfática',
        description: 'Detecta 5 cheiros (2 FOL cada): Suor (anula gastos FOL ≤15), Emoção (rouba 1d3 CA), Raiva (reduz Fúria), Perigo (+1d defesa, +2d se NT 40+), Fluxo (usa 1 Foco contra adversário, 11 FOL).'
      }
    ]
  },
  {
    id: 'passe-backspin',
    name: 'Passe Backspin',
    category: 'Técnico',
    description: 'O Passe backspin utiliza da rotação inferior da bola no solo, criando um passe terrestre moldável e variável, cuja rota ninguém saberá dizer ao certo até que chegue ao fim.',
    specialization: ['Passe', 'Rotação', 'Controle'],
    levels: [
      {
        name: 'Retorno Giratório',
        description: 'Passe terrestre 15m com rota inconstante, pode fazer trajetórias curvas e alterar destinatário. Use Ações Físicas para mover bola. 3 FOL = -1 interceptação adversários.'
      },
      {
        name: 'Rotação Perfeita',
        description: 'Por movimentação, teste Precisão (DT 25) para +5m movimento. Repete 1 + primeiro dígito NT vezes (+2 DT por uso). Penalidade inicia -4, reduz -1 por movimento até -1.'
      },
      {
        name: 'Chute Backspin',
        description: 'Chute/passe com controle total de rotação até o gol. Goleiro -2 DP por defensor que falhou. Se errar, 10 FOL altera rota para passe automático com Goleiro Surpreso.'
      }
    ]
  },
  {
    id: 'fisico-escultural',
    name: 'Físico Escultural',
    category: 'Físico',
    description: 'Similar à Força Física, mas prioriza a inteligência corporal e "construção corporal" ao invés de força descontrolada. Meta de vários jogadores.',
    specialization: ['Físico', 'Técnica Corporal', 'Versatilidade'],
    levels: [
      {
        name: 'Construtor Corporal',
        description: 'Com 5 FOL, use primeiro poder de: Velocidade, Aríete, Imperador X1, Dribles Agressivos, Marcação Stalker. 2 rodadas, depois não pode mais usar na partida.'
      },
      {
        name: 'Físico Versátil',
        description: 'Recebe Especialidade em +1 Perícia Física. Converte 1 CA em +1d Perícia Física, 2 CA transforma Perícia Livre em Física até fim da partida.'
      },
      {
        name: 'Treinamento Pesado',
        description: 'Todos treinamentos físicos (exceto Perícias Físicas) +1 Nível. Cada 5 CA com Perícias Físicas = 1 Treinamento (limite = Mod. Físico).'
      },
      {
        name: 'Corpo Sincronizado',
        description: 'Habilidades 10- FOL custam 1d4. 0 FOL: perde só 1 Ação Física, primeira vez ganha 1d20+5. Recebe todas Perícias Físicas (+1 Classe se já tinha).'
      },
      {
        name: 'Colosso do Futebol',
        description: 'Início da partida: gire 10d20, guarde resultados. Use como resultado definitivo 1x cada. Valores "20" podem ser usados 2x.'
      }
    ]
  },
  {
    id: 'imperador-x1',
    name: 'Imperador do X1',
    category: 'Mental',
    description: 'A Arma "Imperador do X1" te tornará um verdadeiro mestre das disputas corpo a corpo, com técnicas especializadas para essa área, alcançando o nível de Imperador.',
    specialization: ['1v1', 'Adrenalina', 'Domínio'],
    levels: [
      {
        name: 'Solo de Adrenalina',
        description: 'Em 1v1: +1 Classe todas Perícias, +1 Ação Livre, FOL-3. Vencer 1v1: +1 todas Perícias até fim (acumula até 5+NT). Empolgado: +1 Ação Livre no X1.'
      },
      {
        name: 'Explorador de Brechas',
        description: 'Reta 10+NT metros. Passar por aliado/adversário: teste Corrida vs Reação. +1 por 3 FOL. Aliado = proteção. Final: ação +2 por adversário, +1d por aliado.'
      },
      {
        name: 'Quebra de Postura',
        description: 'Recebe "Hold Up" (gasto anulado). Se alvo falhar, diferença resultado-DT vira bônus para ultrapassar + volta dobrado como deslocamento.'
      },
      {
        name: 'Reflexos de Imperador',
        description: 'Recebe "Reflexos" limitado a: Carrinho, adversário partir pra cima, posicionar para impedir, marcar. Se já tinha, bônus/penalidades dobrados no X1.'
      },
      {
        name: 'Hardcore Mode',
        description: 'Adicione +1 a +10 teste adversário, -1 a -10 seu. Vencendo: 5=+1d acumula +3d, 10=Fluxo, 15=1 NT temporário, 20=Sub Despertar 5 PD.'
      }
    ]
  },
  {
    id: 'passes-magicos',
    name: 'Passes Mágicos',
    category: 'Técnico',
    description: 'Os passes mágicos são uma técnica de passe de bola voltada para sua criatividade e talento sobrenatural. Use de toda sua "magia" para tocá-la, criando um show visual.',
    specialization: ['Passe', 'Criatividade', 'Magia'],
    levels: [
      {
        name: 'Num Passe de Mágica!',
        description: 'Passe mágico com show de luzes. Descreva trajetória/sensações. Alvo ganha: +2 Dominar OU +1d testes OU +10m alcance OU +1 Ação Física OU FOL-5. Gasta 3 FOL.'
      },
      {
        name: 'Cruzamento Ilusório',
        description: 'Cruzamento com múltiplas linhas possíveis. Alvo usa 2 Ações Físicas. Se ineficaz, refaça passe (8 FOL). Quem reagiu não pode reagir ao novo.'
      },
      {
        name: 'Pérola Perfuradora Celeste',
        description: 'Passe anula reação de 2 defensores. Receptor pode chutar direto com "Voleio". Se já tinha, FOL anulado. Com arma chute: anula reações (goleiro -6 DP).'
      },
      {
        name: 'Wätcher des Schnees',
        description: 'Passes geram "Elixir Mágico". 5 EM = "Observador das Neves" com 3 Feitiços. Cada feitiço tem 3 efeitos compráveis com EM para combinações mágicas.'
      },
      {
        name: 'Ápice de Feitiçaria',
        description: 'Crie 3 movimentos exclusivos "Magias" com palavras-chave: Ilusório, Mímico, Sobrenatural, Sensacional, Inspirador. Gastos: 1, 2 ou 3 EM.'
      }
    ]
  },
  {
    id: 'passes-travessos',
    name: 'Passes Travessos',
    category: 'Técnico',
    description: 'Uma arma de passes sem muitas limitações, onde a verdadeira magia é sua imprevisibilidade e mutabilidade, correspondendo às vontades do usuário.',
    specialization: ['Passe', 'Imprevisibilidade', 'Flexibilidade'],
    levels: [
      {
        name: 'Passes Pervertidos',
        description: 'Passes anormais sem lógica. Passe sem alvo definido, estipule DT. Próximos da bola fazem teste Domínio. Maior resultado pega bola + bônus = DT.'
      },
      {
        name: 'Passes Perseguidores',
        description: 'Reação ao turno aliado: gaste 8 FOL. Bola acompanha movimentos dele durante turno, cai nos pés ao terminar (Passe DT 27).'
      },
      {
        name: 'Passes Maestros',
        description: 'Passe 17+ puro: gaste 6 FOL para "Ações Maestras". Decida características: curvatura, trajetória, toques NPC. Não interrompível. 3 Ações Maestras.'
      },
      {
        name: 'Bola Perfeita',
        description: 'Teste puro 16: gaste 10 FOL, receptor +1 Ação Física. Cada +2 no valor puro = +1 Ação adicional.'
      },
      {
        name: 'Voilà Mon Football!',
        description: '3 passes seguidos bem-sucedidos = Fluxo até errar ou parar de passar. Se 3 passes para mesma pessoa = Sinergia (manter 2 passes a cada 5).'
      }
    ]
  },
  {
    id: 'perfeicao',
    name: 'Perfeição',
    category: 'Mental',
    description: 'Essa arma aprimora todas as suas características: chute, passe, corrida, corpo a corpo. Aquele que a usar terá direito ao título de "Jogador Perfeito".',
    specialization: ['Perfeição', 'Precisão', 'Excelência'],
    levels: [
      {
        name: 'Parábola Perfeita',
        description: 'Curvatura perfeita: alcance e potência equivalentes. Se resultado > alcance = novo alcance. Se alcance > resultado: +1 puro/10m. Alcance base chute = 35m.'
      },
      {
        name: 'Perfeição Sinuosa',
        description: 'Valor puro = 20 - Classes Precisão: receba 1 Ponto para somar no puro durante partida. Efeito 20 puro aplica, mas sem CA. Pontos resetam.'
      },
      {
        name: 'Execução Exímia',
        description: 'Pontos eternos entre partidas. Gaste 3 Pontos: +2 bônus, DT-2, gasto anulado, alcance+4m. Recebe CA por 20 puro. Troque 15 FOL por 1 Ponto.'
      },
      {
        name: 'Jogador Perfeito',
        description: '+1 Classe todas Perícias, +3 todos Atributos, +1 Habilidade Geral, 1°+2° Nível Estilo. Sucessos automáticos superiores. 1v1: bônus adversário ≤ seu.'
      },
      {
        name: 'Das Cinzas Nasce a Perfeição',
        description: 'Fluxo: sacrifique Foco para ativar. Cada falha: +1 Classe temporária (até X). Perícia X: +1 PA temporário. 5 Perícias X: nova Aura. 10: nova Arma.'
      }
    ]
  },
  {
    id: 'ariete',
    name: 'Aríete',
    category: 'Ofensivo',
    description: 'O Aríete é uma arma ofensiva extremamente agressiva, cujo objetivo é maximizar o ataque e abandonar qualquer defesa, perfurando linhas inimigas com imprevisibilidade e instinto destrutivo.',
    specialization: ['Chute', 'Drible', 'Penetração'],
    levels: [
      {
        name: 'Bélico',
        description: 'Você recebe a perícia especial Penetração I. Pode substituir Penetração pode substituir as perícias Chute e Drible. Quando estiver a 25 + Classe de Penetração metros do gol, você passa a receber +1d para chutar no gol.'
      },
      {
        name: 'Invasão',
        description: 'Você recebe o movimento Arrastar Tesoura e pode utilizar Penetração em vez de Finta ao cumprir os requisitos, obtendo também o acesso à Tesoura Hiperveloz.'
      },
      {
        name: 'Ataque',
        description: 'Escolha entre anular os malefícios de Olhos do Predador ou dobrar os seus benefícios. Se ainda não possuir Olhos do Predador, você o desperta.'
      },
      {
        name: 'Emboscada',
        description: 'Penetração pode substituir as perícias Roubo e Corrida. Sempre que vencer uma disputa usando Penetração no lugar dessas perícias, você recebe +1d em Penetração.'
      },
      {
        name: 'Guerra',
        description: 'Penetração passa a cobrir também as perícias Domínio e Fortitude. Ao falhar em um teste de Penetração, você pode optar por intensificá-lo ao custo de 8 de Fôlego (FOL).'
      }
    ]
  },
  {
    id: 'cabeceio',
    name: 'Cabeceio',
    category: 'Técnico',
    description: 'Se seu desejo é dominar a região aérea do campo, interceptando passes (ou realizando eles) com sua cabeça, essa é a arma para você. Com o cabeceio, bolas altas não serão mais problemas.',
    specialization: ['Cabeceio', 'Passe', 'Interceptação', 'Defesa'],
    levels: [
      {
        name: 'Nas Alturas',
        description: 'Você recebe +2 em Cabeceio, e pode trocar as seguintes perícias por um teste de Cabeceio: Passe, Interceptação (Bolas altas) e Defesa. Quando usar Cabeceio para fazer gols, você ganha +1 Classe no teste.'
      },
      {
        name: 'Movimentos de Cabeça',
        description: 'Você é capaz de replicar diversos movimentos que usam as pernas com seu cabeceio, como passes e até mesmo chutes.'
      },
      {
        name: 'Oclusão Cabeceada',
        description: 'Quando cabecear uma bola, e até 3 defensores estiverem perto de você, pode gastar 4 FOL para passar a bola no ponto cego deles, os deixando sem reação (Meta Visão anula).'
      },
      {
        name: 'O Cabeça (Figuradamente)',
        description: 'Sempre que estiver em uma disputa de bola aérea com alguém, para cada 1 FOL que você gastar, o adversário tem -1 no teste que usar para receber a bola.'
      },
      {
        name: 'O Cabeça (Literalmente)',
        description: 'Uma vez na partida, você pode gastar 12 FOL e dar um teste de Cabeceio. Nas rodadas seguintes, você pode gastar 3 FOL para tornar o resultado daquele teste a DT que os adversários precisam bater.'
      }
    ]
  },
  {
    id: 'chute-direto',
    name: 'Chute Direto',
    category: 'Ofensivo',
    description: 'Chute direto é um poderoso voleio feito de dentro da grande área, que graças a sua potência, torna-se imprevisível e muito maleável, podendo possuir diversas ramificações e usos criativos.',
    specialization: ['Chute', 'Precisão', 'Voleio'],
    levels: [
      {
        name: 'Tiro Direto',
        description: 'O Tiro Direto é um poderoso voleio ao gol. Para cada 2 NT de diferença entre você e um Defensor que tentar impedir um chute, ele recebe -1 ou você recebe +1.'
      },
      {
        name: 'Chute de Calcanhar',
        description: 'O Chute de Calcanhar é uma versão de costas do Chute Direto, onde você se aproveita das brechas na defesa para disparar um chute, surpreendendo a todos.'
      },
      {
        name: 'Chute Direto de Duas Etapas',
        description: 'Quando for chutar e falhar, você pode gastar 14 FOL para refazer os testes, podendo mudar as habilidades que usou, descrição, tudo.'
      },
      {
        name: 'Voleio de Duas Armas',
        description: 'Um poderoso voleio falso, onde você finge que vai chutar com uma perna, e passa ela por cima, enganando a todos e disparando um tiro com a outra perna.'
      },
      {
        name: 'Voleio do Rei Demônio',
        description: 'O ultimato do Chute Direto. Um imponente disparo direto para o gol, marcando mostrando a força de um "Rei Demônio", destruindo os sonhos dos 21 jogadores em campo.'
      }
    ]
  },
  {
    id: 'chute-explosivo',
    name: 'Chute Explosivo',
    category: 'Ofensivo',
    description: 'O Chute Explosivo é uma técnica de chute que foca totalmente na potência e na "empolgação" do disparo. Quanto mais animado e energizado o usuário estiver, mais poderoso seu chute será.',
    specialization: ['Chute', 'Instinto', 'Vibração Celular'],
    levels: [
      {
        name: 'Ímpeto Explosivo',
        description: 'Você possui um instinto de explosão que guia seu jeito de jogar. Dentro da grande área adversária, você não precisa olhar para a bola ou para o gol, pois você sente eles.'
      },
      {
        name: 'Chute Giratório Reverso',
        description: 'Seguindo o efeito do Ímpeto Explosivo, você é capaz de realizar um incrível chute de costas com a palma do pé, usando de toda sua explosão para criar um impacto tão grande que deixa todos de boca aberta.'
      },
      {
        name: 'Dragon Drive',
        description: 'Enquanto a bola paira sob o campo, surpreendendo a todos, um dragão aparece, devorando qualquer esperança que um dia seus adversários já tiveram.'
      },
      {
        name: 'Dragon Drive: Heading',
        description: 'Com esse Nível, você faz a mesma coisa que o anterior, porém com o cabeceio. No lugar do teste de Interceptação, você gira Cabeceio.'
      },
      {
        name: 'Big Bang Drive',
        description: 'O seu chute mais poderoso. Uma perfeição em níveis explosivos que ninguém jamais poderá alcançar. O Big Bang Drive é um chute que pode ser feito até, no máximo, o meio de campo.'
      }
    ]
  },
  {
    id: 'controle-de-bola',
    name: 'Controle de Bola',
    category: 'Técnico',
    description: 'Utilizando de sua noção espacial e dos eixos corporais, você controla a distância entre você e um adversário, facilitando seu domínio de bola ou tomada dela.',
    specialization: ['Domínio', 'Roubo', 'Controle Espacial'],
    levels: [
      {
        name: 'Controle Espacial',
        description: 'Você consegue medir a distância exata entre você e um adversário usando de seu corpo, neutralizando os movimentos e permitindo roubar ou dominar a bola mais facilmente.'
      },
      {
        name: 'Ave Caçadora',
        description: 'Você pode gastar 8 FOL para se mover instantaneamente até bolas que passem por 20m de você. Gastando +5 FOL, aumenta para 30m.'
      },
      {
        name: 'Rede de Controle',
        description: 'Você determina uma faixa horizontal no campo que tem 4 metros de largura, dentro dessa área você recebe +2 Classes em Roubo e Domínio.'
      },
      {
        name: 'Olhos da Caça',
        description: 'A largura da "Rede de Controle" aumenta para 8 metros e você pode gastar um turno inteiro para marcar uma pessoa que esteja dentro de sua faixa horizontal.'
      },
      {
        name: 'Controlador Supremo',
        description: 'A largura da "Rede de Controle" aumenta para 12 metros, o bônus se torna +3 Classes. Agora o Nível 2 não tem limite de alcance.'
      }
    ]
  },
  {
    id: 'corpo-mola',
    name: 'Corpo Mola',
    category: 'Defensivo',
    description: 'O "Corpo Mola" é uma Arma defensiva feita especialmente para goleiros. Ela se aproveita de diversos fatores que tornam seu corpo móvel como uma mola, dentre eles: Flexibilidade; Reação e poder de salto.',
    specialization: ['Defesa', 'Flexibilidade', 'Reação', 'Reflexos'],
    levels: [
      {
        name: 'Flexibilidade',
        description: 'Seus membros são flexíveis e capazes de realizar qualquer movimento, independente da dificuldade. Você pode anular até -1 de qualquer penalidade que afete sua DP ou teste de Defesa.'
      },
      {
        name: 'Reação Explosiva',
        description: 'Seu tempo de reação é quase incomparável, sendo capaz de reagir a movimentos de extrema velocidade. Seus testes de Defesa não podem ser anulados por nenhuma habilidade.'
      },
      {
        name: 'Super Reflexo',
        description: 'Recebe a Perícia Especial "Reflexos". Você consegue acompanhar o movimento da bola e pular exatamente no local onde ela deve cair.'
      },
      {
        name: 'Deflexão Garantida',
        description: 'Você consegue defender qualquer chute que conseguir ver vindo. Você pode gastar 12 FOL para obter um teste de Defesa garantido que sobrepõe os outros.'
      },
      {
        name: 'Mola Impecável',
        description: 'Sua flexibilidade chegou ao ápice, permitindo defesas impossíveis. Você pode usar qualquer parte do seu corpo para defender, incluindo partes que normalmente não conseguiria usar.'
      }
    ]
  },
  {
    id: 'curvas-afiadas',
    name: 'Curvas Afiadas',
    category: 'Técnico',
    description: 'Sua principal especialidade são seus cortes, capazes de driblar jogadores experientes e iniciar passes em cadeia que se mantém constantes e afiados. Você não pode ter o Tipo de Ego Individualista caso pegue essa arma.',
    specialization: ['Drible', 'Passe', 'Sinergia', 'Hotline'],
    levels: [
      {
        name: 'Dominação Suprema',
        description: 'Você tem uma movimentação rápida e afiada, capaz de confundir os adversários. Utilizando de suas curvas pelo campo, você pode dar testes da Perícia "Drible" mesmo que não esteja com a bola.'
      },
      {
        name: 'Hotline',
        description: 'Você é especialista em "tabelas" (movimento onde você passa para um aliado e ele passa para você de volta), sendo capaz de realizar com maestria esse movimento em conjunto com qualquer outro aliado.'
      },
      {
        name: 'Rotação Espacial',
        description: 'Você recebe +1 Classe em Drible quando for executá-lo sem a bola, e, durante uma tabela de "Hotline", você recebe um dos "Bônus Padrão" de Sinergia.'
      },
      {
        name: 'Sinergia Orbitária',
        description: 'Agora, o seu aliado que está na "Hotline" com você recebe todos os Bônus Padrão de Sinergia, e seus passes durante a Hotline não podem ser mais interceptados.'
      },
      {
        name: 'Órbita Planetária',
        description: 'Você é capaz de orbitar ao redor de um aliado, sincronizando a movimentação de vocês pelo campo todo, como um planeta e seu satélite pelo vasto espaço.'
      }
    ]
  },
  {
    id: 'defesa-total',
    name: 'Defesa Total',
    category: 'Defensivo',
    description: 'A Defesa Total é um conjunto de técnicas defensivas que otimizam a defesa geral de sua equipe, te tornando uma verdadeira muralha humana de um homem só.',
    specialization: ['Interceptação', 'Roubo', 'Defesa', 'Reação', 'Cabeceio'],
    levels: [
      {
        name: 'Bloqueio Máximo',
        description: 'Você recebe as seguintes perícias: Interceptação, Roubo, Defesa, Reação e Cabeceio. Para cada uma delas que você já possui, recebe Especialidade.'
      },
      {
        name: 'Proteção Absoluta',
        description: 'Para cada sucesso que você conseguir com as perícias citadas no Nível 1, você recebe +2 FOL (ou +1 PA ou +1 CA) em uma estatística a sua escolha.'
      },
      {
        name: 'Vanguarda Completa',
        description: 'Gastando 5 de FOL, você pode escolher uma área entre: Gol, Zaga e Meio de Campo (do seu campo). Após essa escolha, durante a partida você pode dar um teste de Reação.'
      },
      {
        name: 'Fechamento Sincrético',
        description: 'Caso esteja com outro defensor, podem fazer uma Defesa Coletiva, gastando 10 FOL mutuamente. A soma dos NT\'s dos dois é subtraída pelo NT do adversário.'
      },
      {
        name: 'Égide Supremo',
        description: 'Ao gastar 5 de FOL, você pode ativar essa habilidade por 3 Rodadas. Nessas 3 Rodadas, para cada 20 puro que você conseguir, recebe 1 uso dessa habilidade pelas próximas 3 rodadas.'
      }
    ]
  },
  {
    id: 'dominio-de-bola',
    name: 'Domínio de Bola',
    category: 'Técnico',
    description: 'O Domínio de Bola é uma arma que foca totalmente em amplificar suas capacidades de dominar a bola sob seus pés, segurando ela de forma sobrenatural.',
    specialization: ['Domínio', 'Controle', 'Armadilhas'],
    levels: [
      {
        name: 'Domínio Perfeito',
        description: 'Você recebe +2 em Domínio, e também o movimento de Chute "Voleio Giratório". Além disso, você pode gastar 3 FOL para, quando dominar a bola, emendar um passe, cruzamento ou chute.'
      },
      {
        name: 'Armadilha',
        description: 'Usando de seu domínio irreal, você consegue criar Armadilhas de corpo que permitem domínios sobrenaturais, tanto para controlar a bola quanto para passar de adversários.'
      },
      {
        name: 'Giro de Reinicialização Zero',
        description: 'Essa armadilha permite que você encerre uma jogada, reiniciando o ritmo do jogo criando uma nova jogada a partir do seu domínio.'
      },
      {
        name: 'Domínio Aprimorado',
        description: 'Você consegue enfrentar até 5 adversários com "Armadilha", os gastos de "Domínio Perfeito" são anulados e os gastos de "GRZ" são reduzidos em 3.'
      },
      {
        name: 'Expansão de Domínio',
        description: 'Após seu terceiro domínio de bola na partida, uma zona entre eles é formada. Nessa zona, seus Domínios tem sucesso automático (não inclui Domínio X Roubo).'
      }
    ]
  },
  {
    id: 'dribles-agressivos',
    name: 'Dribles Agressivos',
    category: 'Físico',
    description: 'Os Dribles Agressivos são um tipo de drible diferenciado, pois não usam de técnica, e sim de sua força corporal e movimentação errática para enganar e ultrapassar adversários.',
    specialization: ['Drible', 'Físico', 'Força Bruta', 'Movimentação Errática'],
    levels: [
      {
        name: 'Agressividade',
        description: 'Através de sua força bruta e movimentos erráticos, você desenvolveu uma poderosa técnica de drible. Para cada 2 Pontos de Físico que gastar para realizar o drible, você ganha +1d4 de bônus.'
      },
      {
        name: 'Movimentação Errática',
        description: 'Quando driblar alguém com "Agressividade", você pode gastar 10 FOL para ganhar +2 Ações Físicas, porém com algumas restrições.'
      },
      {
        name: 'Confusão',
        description: 'Seus movimentos são completamente imprevisíveis. Para cada drible feito, o próximo adversário a ser driblado tem -1 (acumula até -4).'
      },
      {
        name: 'Explosão de Marselha',
        description: 'Você recebe o Movimento "Virada de Marselha", porém com um extra. O deslocamento aumenta para 20m, e a cada 3 usos, você recebe uma Carga de Adrenalina.'
      },
      {
        name: 'Dribles Esmagadores',
        description: 'Sempre que devorar alguém, você terá três sucessos automáticos para driblar essa pessoa. Um jogador só pode ser afetado uma vez por isso.'
      }
    ]
  },
  {
    id: 'dribles-dancantes',
    name: 'Dribles Dançantes',
    category: 'Técnico',
    description: 'Os Dribles Dançantes são uma técnica de drible que foca totalmente em sua movimentação livre e criatividade. Seguir um "ritmo" ao driblar é o que torna seus movimentos eficazes e belos.',
    specialization: ['Drible', 'Ritmo', 'Criatividade', 'Movimentação'],
    levels: [
      {
        name: 'Dança dos Perdedores',
        description: 'A base do funcionamento dos Dribles Dançantes são os movimentos "envolventes", que dão a impressão que todos os afetados estão dançando.'
      },
      {
        name: 'Gingado',
        description: 'Sempre que realizar um Drible bem sucedido, você recebe 1 de "Ritmo". Ritmo funciona como uma sequência, aumentando em 1 a cada Drible bem sucedido consecutivo.'
      },
      {
        name: 'Baile em Sintonia',
        description: 'Até mesmo aqueles que não foram driblados por você são capazes de sentir a presença do baile que você conduz com seus movimentos.'
      },
      {
        name: 'Dança Ascendente',
        description: 'Sua mistura de ritmo com drible tornou-se um triunfo inigualável. Um molejo que ninguém jamais alcançará, tornando-o único.'
      },
      {
        name: 'Borboleta da Morte',
        description: 'Cada drible é um passo de dança lado a lado com a morte, ceifando as esperanças dos adversários com seus dribles cruéis, porém envolventes.'
      }
    ]
  },
  {
    id: 'dribles-elasticos',
    name: 'Dribles Elásticos',
    category: 'Técnico',
    description: 'Esse é estilo de Drible foca na sua elasticidade e controle da bola, como se ela sempre estivesse grudada no seu pé. Também utiliza da criatividade e da velocidade para vencer seus adversários.',
    specialization: ['Drible', 'Domínio', 'Elasticidade', 'Criatividade'],
    levels: [
      {
        name: 'Elasticidade',
        description: 'Seu controle da bola com os pés, velocidade e criatividade são 3 fatores que tornam sua técnica de drible extremamente eficaz e precisa.'
      },
      {
        name: 'Dribles Dominantes',
        description: 'Você recebe todas as versões alternativas do movimento "Elástico" (No Ar e Invertido), independentemente de cumprir os requisitos ou não.'
      },
      {
        name: 'Fusão de Dribles',
        description: 'Você tem controle sobre os movimentos que realiza, seja nos aspectos de coordenação, criatividade ou elasticidade.'
      },
      {
        name: 'Controle Elástico',
        description: 'Sua elasticidade se aprimorou a tal ponto que você consegue controlar a bola de formas impossíveis.'
      },
      {
        name: 'Maestria Elástica',
        description: 'Você dominou completamente a arte dos Dribles Elásticos, sendo capaz de realizar movimentos que desafiam a física.'
      }
    ]
  },
  {
    id: 'genialidade',
    name: 'Genialidade',
    category: 'Mental',
    description: 'A Genialidade é uma arma mental que une todo seu talento e intelecto, te tornando um prodígio absoluto com capacidades totalmente inigualáveis. Um verdadeiro gênio sem comparação.',
    specialization: ['Estratégia', 'Análise', 'Intelecto', 'Cálculo'],
    levels: [
      {
        name: 'Perfeitamente Calculado',
        description: 'Você é capaz de calcular perfeitamente os eixos e movimentos do adversário com precisão, lendo ele em todos os seus aspectos para derrotá-los.'
      },
      {
        name: 'Balanceamento Majestoso',
        description: 'Cada passo seu, por mais simples que pareça, tem um enorme cálculo por trás. Uma precisão digna de palmas por tamanha majestosidade.'
      },
      {
        name: 'Paradigma do Primoroso',
        description: 'Você possui controle sobre o ritmo do jogo, ditando a forma como ele anda através de sua visão genial e técnicas refinadas de futebol.'
      },
      {
        name: 'Eixo de Simetria',
        description: 'Sua visão do campo se torna absoluta. Você enxerga os jogadores, os eventos, suas decisões e até os seus próximos passos.'
      },
      {
        name: 'Genialidade Absoluta',
        description: 'Você transcendeu os limites da genialidade humana, sendo capaz de prever e controlar todos os aspectos do jogo com precisão matemática perfeita.'
      }
    ]
  },
  {
    id: 'kaiser-impact',
    name: 'Kaiser Impact',
    category: 'Ofensivo',
    description: 'O Kaiser Impact, "Impacto do Imperador" é um voleio com uma potência e precisão incrível, que pode, a depender do seu nível de talento, ser considerado o chute mais veloz do mundo, quase impossível de ser parado.',
    specialization: ['Precisão', 'Voleio', 'Velocidade', 'Imperial'],
    levels: [
      {
        name: 'Kaiser Impact: Voleio Imperial',
        description: 'A versão de voleio do Impacto Imperial, executada com a ajuda da inércia da bola durante sua permanência em movimento no ar, passando por cima de todos os defensores.'
      },
      {
        name: 'Kaiser Impact: Lightning Strike',
        description: 'Você conseguiu aprimorar o seu Impacto para executá-lo em terra firme, se aproveitando da bola em movimento para pegar a velocidade e pressão necessárias.'
      },
      {
        name: 'Kaiser Impact: Beinschuss',
        description: 'Nessa versão do Kaiser Impact, feita de bicicleta, é necessário equilibrar mira e velocidade de chute para conseguir causar o Impacto.'
      },
      {
        name: 'Kaiser Impact: Blitzkrieg',
        description: 'Você aprendeu uma técnica para combinar cortes com o seu Kaiser Impact afim de executá-lo com mais facilidade, sem defensores no seu caminho.'
      },
      {
        name: 'Kaiser Impact: Magnus',
        description: 'O estágio perfeito do Kaiser Impact. Através da aplicação do efeito Magnus, manipulando a pressão do ar com um chute preciso em um ponto da bola.'
      }
    ]
  },
  {
    id: 'impulso-cabeceio',
    name: 'Impulso Cabeceio',
    category: 'Físico',
    description: 'Utilizando da impulsão (e de sua cabeça), você avança para frente em um pulo cabeceio que bate na bola, mas que pode te causar alguns machucados.',
    specialization: ['Cabeceio', 'Impulsão', 'Investida', 'Físico'],
    levels: [
      {
        name: 'Ataque Investida',
        description: 'O principal movimento dessa Arma, onde você avança para frente em um cabeceio, pulando. Você consegue se jogar uma distância igual a sua Classe em Cabeceio +12.'
      },
      {
        name: 'Impulso Aprimorado',
        description: 'O Valor base do impulso se torna 15m, e ao receber a bola, você pode gastar 4 FOL para emendar um impulso cabeceio, enviando ela 20m para frente.'
      },
      {
        name: 'Linha Reta Destrutiva',
        description: 'Você pode utilizar do Impulso Cabeceio para roubar a bola, dando um teste de Cabeceio X Domínio.'
      },
      {
        name: 'Investida Impulsionada Cabeceada',
        description: 'Quando finalizar um Impulso Cabeceio, pode gastar 1 CA e realizar outro em sequência. Além disso, você só passa a sofrer lesões a partir do terceiro impulso seguido.'
      },
      {
        name: 'Maestria Impulsiva',
        description: 'Você dominou completamente o Impulso Cabeceio, tornando sua cabeçada impulsionada ainda mais potente que seu chute.'
      }
    ]
  }
];

export const getWeaponsByCategory = (category: string) => {
  return weaponsData.filter(weapon => weapon.category === category);
};

export const getWeaponById = (id: string) => {
  return weaponsData.find(weapon => weapon.id === id);
};

export const getAllWeaponCategories = () => {
  return ['Ofensivo', 'Defensivo', 'Técnico', 'Físico', 'Mental'];
};
