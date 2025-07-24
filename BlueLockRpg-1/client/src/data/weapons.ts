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
    description: 'Os Dribles Mágicos são o tipo de Drible mais voltado para a enganação, usando de toda sua criatividade e “magia” para ultrapassar todo e qualquer oponente.',
    specialization: ['Drible', 'Finta', 'Criatividade'],
    levels: [
      {
        name: 'Truque de Mágica',
        description: 'Os "Dribles Mágicos" ou "Dribles Flexíveis" são uma técnica de dribles que visa fazer jogadas criativas e "estranhas" aos olhos de quem testemunhou o movimento. Ela usa da elasticidade e criatividade do jogador para ter um bom desempenho. Gastando 5 FOL, você pode usar a cartada do "Você não contava que..." para fazer algo surpreendente e "driblar" a situação. Por exemplo, vamos supor que você está no 1v1 com um adversário que possui uma velocidade de reação extremamente superior a sua. Ao gastar os 5 de Fôlego, você pode usar a seguinte frase. "Você não contava que eu jogaria a bola para trás, pegando a bola e correndo em disparada no seu ponto cego." Assim, você dá um teste de Drible. DT varia entre 12, 20, 26 e 30 + 1 para cada 5 NT seu (A DT é definida com base na criatividade da descrição (partindo do 30 sendo o menos criativo, e 12 o mais criativo), com base no julgamento do Mestre).'
      },
      {
        name: 'O Cartoleiro Louco',
        description: 'Você recebe um movimento de Drible exclusivo, que varia do drible "Chapéu", sendo ele a "Cartola". O gasto de Fôlego se torna 1, a DT do cabeceio se torna 28 e antes dele é necessário um teste de Reação (DT 25). Caso use a Cartola 3 vezes seguidas, seu próximo drible tem gasto anulado e pode ser usado como Ação Livre.'
      },
      {
        name: 'Abracadabra',
        description: '"Abracadabra" é um encantamento mágico usado na modernidade e no ilusionismo. Como um verdadeiro mágico, você é especialista em encantamentos. Você pode gastar 15 FOL e uma Ação Mental para usar "Abracadabra". E o que isso faz? Nem eu sei! Você terá um "d6 mágico". Cada face do d6 terá um efeito, esses que serão escolhidos por você com aprovação do Mestre. Por exemplo, na face 1, você pode ganhar 1 movimento de drible extra, na face 2 um acerto garantido de drible etc.'
      },
      {
        name: 'Truque de Encerramento',
        description: 'Durante os Acréscimos, seu show começa a se encerrar. Então, é digno um último truque para a plateia. O gasto da "Cartola" é anulado, já o do "Truque de Mágica" se torna 1, além de as DT's serem sempre 15.'
      },
      {
        name: 'Ilusionismo',
        description: 'Você é capaz de enganar até mesmo os mais perspicazes. Com seu ilusionismo, o impossível pode ser feito com facilidade. Você pode gastar 20 FOL para usar essa habilidade. Você irá jogar seu turno com tranquilidade, porém enquanto ele rola, você usa toda sua criatividade. Você pode criar ilusões envolvendo todos que passaram perto de você ou interagiram com você durante seu turno, podendo elas serem as coisas mais absurdas e impossíveis possíveis (irônicas). Por exemplo, você passa por dois meio campo, dribla um zagueiro e chuta ao gol. Você pode fazer com que um meio campo pegou a bola, o outro que outro aliado seu está com ela, o zagueiro achar que está te marcando e o goleiro que você marcou o gol, mas na verdade tocou para seu aliado, que pegou ele de surpresa e chutou. Por serem movimentos incrivelmente graciosos, você só pode usar 3 vezes por partida. Além disso, cada uso de "Ilusionismo" pode aumentar sua fama de 20 a 100.'
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
        description: 'Durante a partida, você pode observar os testes de Roubo do adversário, e quando ver um resultado ruim, pode dar um teste de Análise (DT 26) para registrá-lo (só pode ter um valor registrado por alvo, que não pode ser trocado). Quando for usar seu drible contra ele, ao invés de girar o teste, o valor que ele irá usar será o que você registrou.'
      },
      {
        name: 'Quebra de Movimentação',
        description: 'Ao aprimorar ainda mais o Contra Drible, agora nem mais esforço precisa ser feito. Somente do adversário cometer um leve deslize, você já consegue se sobrepor. Em testes de Drible, se o adversário tirar um dado com resultado “Medíocre” para baixo, você já passa automaticamente, sem precisar do seu teste.'
      },
      {
        name: 'Drible Fluido',
        description: 'Basta passar por 1, que passa por todos. Afinal, sem egoísmo, é um por todos e todos por um. Se passar por um defensor, pode gastar 15 FOL e passar por todos que estejam em até 15m dele (sem contar o goleiro).'
      },
      {
        name: 'Sucesso Sucessivo',
        description: 'Quando conseguir um Sucesso Automático por 20 puro, você pode anular ele propositalmente, gastando a Carga de Adrenalina que ganharia para “guardá-lo”. No lugar do Sucesso, você recebe +6, e o Sucesso Automático que guardou pode ser usado em outro teste de Drible à sua escolha.'
      },
      {
        name: 'Drible Genial',
        description: 'O valor de “Contra Drible” pode ser utilizado até 2 vezes, o alvo pode tirar até no máximo “Bom” para o efeito de “Quebra de Movimentação” funcionar, o alcance de “Drible Fluido” se torna 15m, e o “Sucesso Sucessivo” te dá +10.'
      }
    ]
  },
  {
    id: 'forca-fisica',
    name: 'Força Física',
    category: 'Físico',
    description: 'A Força Física é uma arma natural que consiste em um poder muscular imenso e descontrolado, usado principalmente por brutamontes para neutralizar qualquer tentativa de movimentação oposta de seus adversários.',
    specialization: ['Físico', 'Corpo a Corpo', 'Intimidação'],
    levels: [
      {
        name: 'Brutamonte',
        description: 'Seu corpo é incrivelmente forte, um verdadeiro saco de músculos. Você recebe +1 Classe em 3 Perícias Físicas a sua escolha.'
      },
      {
        name: 'Jogo de Ombros',
        description: 'Você recebe o Movimento “Jogo de Ombros”, e também recebe um movimento exclusivo chamado “Forçar Corpo a Corpo”. Você posiciona seu corpo de forma que consegue usar todos os seus músculos como uma barreira. A DT de todos os testes para tomar a bola se tornam 10 + FÍS + Mod. FÍS, e você não pode gastar Pontos de Físico para aumentar. Enquanto manter esse movimento ativo (2 FOL por turno), perde 1 Ação Física.'
      },
      {
        name: 'Ego Protein',
        description: 'Você soma seu Modificador de Egoísmo no seu Físico, e pode usar pontos de EGO para repor pontos de FÍS.'
      },
      {
        name: 'Músculo Ambulante',
        description: 'Gastando 2 Pontos de FÍS, você pode trocar os dados de uma perícia para um valor igual seu Modificador de FÍS (Se tem Mod. 4, troca para 4 dados). Pode gastar +2 Pontos para fazer o mesmo com o bônus.'
      },
      {
        name: 'Monstro Imparável',
        description: 'Sua Força é inacreditável, e no corpo a corpo, ninguém te para. Ao invés de gastar Pontos de Físico para somar no bônus, você pode gastar para somar no resultado puro.'
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
        description: 'Você tem capacidades extremamente versáteis e adaptáveis de Finta. Você recebe +2 Classes em Finta, e também ganha um tipo especial que pode ser usado para as respectivas perícias, com 3 FOL: Drible: Ao realizar uma Finta (DT 23) junto de um Drible, você pode aplicar um movimento, mesmo que não tenha ele, desde que cumpra os requisitos. Chute: Você pode realizar diversas movimentações para enganar quem quiser reagir a seu chute. Você pode repetir testes de Finta X Reação do Goleiro. Para cada vitória, ele recebe -1 na DP. A partir de 5 vitórias (e a cada 3 consecutivos), defensores ultrapassados podem reagir. Com 10 vitórias, Defensores recebem +3 em qualquer teste que fizerem contra você. O goleiro recebe +1 no teste a cada Finta bem sucedida. Você gasta 1 Ação Livre para cada 3 testes. Roubo: Se passar no teste de Roubo, pode usar Finta (DT 24). Se passar no teste de Finta, você anula a reação do alvo, fazendo ele perder o "timing" de sua ação. Você não toma a bola, mas pode dar um teste de outra perícia que possa ser usada para tirar a bola de sua posse (Chute para jogá-la longe, Corrida para disparar com ela, etc.). O limite é sua criatividade.'
      },
      {
        name: 'Aplicação de Fintas',
        description: 'Você recebe +1 Classe em Finta, e pode aplicá-la nas três situações abaixo, por 3 FOL: Escanteio: Se fintar um escanteio (Finta X Reação) fingindo que irá chutar e passar, o receptor da bola pode realizar um chute usando Precisão com +1d (se ambos gastarem 1 CA, aumenta para +2d). Lateral: Com um teste de Finta (DT 29), quando for arremessar uma bola lateral, pode fintar o movimento da bola, fingindo jogar a bola para um alvo, e enviando ela para alguém que esteja a até 12m atrás dele. Tiro Livre: Se fingir que irá bater o Tiro Livre, o jogador que verdadeiramente irá batê-lo receberá +6 em qualquer teste que fizer.'
      },
      {
        name: 'Finta Visionária',
        description: 'Conforme desenvolve suas visões, a forma como você enxerga as fintas vai se alterando e se aprimorando. Você recebe uma habilidade especial de Finta baseando-se nas visões que possua. Meta Visão: Utilizando do Meta Gaming, você pode modificar as propriedades do seu teste mesmo após ambos girarem, adicionando mais habilidades, bônus etc. Olho do Predador: Ao realizar 11 Fintas para chutar, você pode ativar alguma habilidade do Olho do Predador, independentemente de possuí-la ou não. Se já tinha e utilizar, o gasto de FOL é anulado, e você não gasta nenhum uso.'
      },
      {
        name: 'Fintas Exímias',
        description: 'Sua capacidade de realizar fintas perfeitas tornou-se uma simples brincadeira. Cada movimento de blefe é feito de forma precisa e sem erros, desestabilizando até adversários poderosos. Para cada finta realizada em um turno, você recebe +1 em todos os testes no próximo teste de outra perícia sem ser Finta, desde que gaste 7 FOL (Se o valor ultrapassar +10, o gasto aumenta para 14 FOL).'
      },
      {
        name: 'Fintas de Mestre',
        description: 'Suas fintas maestras são capazes de enganar a todos. Nunca é possível saber quando uma finta será feita ou não. Após qualquer ação física, seja ela bem sucedida ou não, você pode gastar 3 FOL para realizar uma Finta (DT 25 + 1 por uso). Se passar, você recebe +1 Ação Física para realizar a nova ação, e pode escolher dois alvos para não conseguirem reagir (se estiver em uma disputa de 1 contra 1, você pode considerar o seu adversário como ultrapassado, e escolher +1 para perder a Reação).'
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
        description: 'Impedindo que o adversário leia o seu centro de gravidade, e movendo seus membros superiores e inferiores para direções opostas, você é capaz de confundir qualquer um que enfrente no 1 contra 1. Para cada 2 Classes que possuir em Drible, o alvo recebe -1 Classe no teste contra o seu drible. Se o alvo possuir Sucesso Automático, anula ele, porém perde 1 Classe da redução.'
      },
      {
        name: 'Morto-Vivo',
        description: 'Sua condição corporal te faz parecer com alguém que está morto, seja por aparência, trejeitos ou estilo de jogo. Você recebe uma sequência de modificações passivas, escolhendo uma inicial e recebendo as outras a cada 3 NT (você escolhe as iniciais e a ordem que irá receber o resto. Primeiro, seus testes seguirão uma lógica contrária. "Falha Total" se torna "Sucesso Automático", "Falha" se torna "Muito Bom", "Muito Ruim" se torna "Bom", "Ruim" se torna "Medíocre", e "Medíocre" se mantém igual. A ordem contrária também é aplicada. O efeito deve ser ativado antes do teste, gastando 5 FOL. O segundo, permite que você, mesmo com 0 de FOL, ainda possa jogar normalmente, porém com um limite de gasto por turno igual à metade do seu NT (Arredonda para baixo). O terceiro, permite que você use seu deslocamento total fora do seu turno, e fora dele, ser inteiro (10 FOL pra ativar, duas rodadas de duração). Por fim, seus turnos passam a não contar para o andamento das rodadas.'
      },
      {
        name: 'Centro de Gravidade Zumbificada',
        description: 'A sua movimentação corporal te torna completamente imprevisível, através da impossibilitação de leitura dos seus centros de gravidade. Você pode escolher um dos tipos de habilidade listados abaixo para, quando sofrer seus efeitos, dar um teste de Drible (DT 32 - 2 por Especialização) para anular seu efeito. Você escolhe um tipo (que será permanente) e ao liberar o Nível 4 e 5, escolhe mais um . Os tipos de habilidade são: Habilidades de "Leitura" (Diagnóstico, Egocentrismo, Previsão Olfática, etc.); Habilidades de "Controle" (Futebol de Marionetes, Mexa-se em Prol do meu Gol, Sub-Classe General, etc.); Habilidades de "Contato Físico" (Centro de Gravidade: Explosão Total, Centro de Gravidade: Rotação no Ar, Jogo de Ombros, Dribles Dançantes, etc.); Habilidades de "Cópia" (Aura do Camaleão, Perícia Análise, Triunfo, etc.); Penalidades por Marcação; Efeitos de Devorar (Negativos); Condições Negativas; Condição Especial "Devorado" e "Lesões". Durante o Fluxo, recebe +1 Imunidade (desde que sustente com 4 FOL toda Rodada), e no Despertar, pode trocar 6 PD por uma nova.'
      },
      {
        name: 'Descoordenação Cadavérica',
        description: 'Você recebe direito a, durante um turno, utilizar as seguintes inversões: A DT passa a se tornar um valor que você NÃO pode atingir. Ou seja, se a DT é 35, você não pode atingir 35 para passar; Você pode por fim, você pode trocar o tipo de um Movimento, mudando sua aplicação (por exemplo: Utilizar um Movimento de Passe como Chute, desde que seja louco o suficiente) Pode trocar Finta, Corrida, Domínio e Roubo por Drible. A quantidade de usos dessa habilidade é igual as Especializações que você possui (Mínimo 1).'
      },
      {
        name: 'Cemitério de Egoístas',
        description: 'Enquanto o Zumbi se movimenta pelo campo, todos os jogadores correm o risco de serem devorados e enterrados, transformando o campo em um grande cemitério de egoístas. Quando vencer um adversário com o primeiro efeito de “Morto Vivo”, pode gastar 11 FOL para criar a “lápide” dele naquele lugar. Sempre que vencê-lo, aplica uma penalidade de -2. Ao atingir -12, você pode retirar sua Arma, Habilidades Gerais e Exóticas até o fim da partida. Se vencê-lo novamente, ele é devorado (quantidade de Rodadas = quantidade de Especializações). Se gastar +11 Fol, ele fica uma quantidade de Rodadas sem jogar igual à sua quantidade de Especializações. Cada Especialização reduz o valor necessário de penalidade em 2.'
      }
    ]
  },
  {
    id: 'torre-de-vigia',
    name: 'Torre de Vigia',
    category: 'Mental',
    description: 'A Torre de Vigia é uma Arma estratégica e mental, que cumpre o papel de “Sentinela”, observando todo o campo e coletando informações.',
    specialization: ['Análise', 'Percepção', 'Estratégia'],
    levels: [
      {
        name: 'Farol',
        description: 'Começa com perícias: Análise, Percepção, Estratégia e Reação (ou Especialidade em todas). Gastando 2 FOL, recebe +2/+4/+6/+8/+10 em teste de uma delas.'
      },
      {
        name: 'Coleta de Informações',
        description: 'Dentro do seu campo, você pode gastar 3 FOL para registrar os resultados, que serão convertidos em “Pontos de Informação”. Resultados maiores ou iguais a 17 podem ser convertidos em PI Positivo, e resultados menores ou iguais a 3 podem ser convertidos em PI Negativo. Ainda dentro da sua área, os PI Positivos podem ser transformados em dados extras para seus aliados, e os Negativos podem se tornar reduções de dados para os adversários. A partir do NT 30, a habilidade tem seu alcance expandido para o campo inteiro, porém só pode conceder bônus e penalidades dentro da área do seu time.'
      },
      {
        name: 'Dados & Análises',
        description: 'Quando alguém realiza uma Ação, você pode gastar 6 Pontos de INT para já ter estudado ela. Assim, você pode realizar um turno extra antes dela, para alterar o que supostamente já teria acontecido. Nesse turno extra, você recebe +1 PI (Positivo ou Negativo, a sua escolha). Cada uso seguinte terá +1 PI (ou seja, na segunda vez que usar terá +2 PI, na terceira +3 PI).'
      },
      {
        name: 'Olhar do Vigia',
        description: 'Qualquer um que entrar em uma área de 30m de você, será automaticamente detectado e poderá ser parado, independente de qualquer habilidade que possua. Você recebe +1d para qualquer Habilidade que não pode ser parada, a DT para obter PI se torna 15 e 7, e você pode gastar 3 para anular um Sucesso Automático.'
      },
      {
        name: 'Sentinela',
        description: 'Você pode conceder uma Proteção Defensiva para seus aliados. Enquanto sustentar com uma Ação Mental, todos eles ganham a capacidade de usar “Olhar do Vigia” e “Coleta de Informações” e também ganham +6 em testes de Defesa, Interceptação e Roubo.'
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
        description: 'Você recebe +10m metros de deslocamento, e recebe uma Ação Física extra somente para correr.'
      },
      {
        name: 'Corrida da Vitória',
        description: 'O alcance do Chute máximo é igual ao seu deslocamento (limitado em até 60 metros). Supondo que seja 30m, você precisaria estar a 30m do gol para chutar na direção dele (desconsiderando habilidades e bônus que podem alterar esse valor). Caso esteja numa distância maior que o alcance necessário, você pode gastar 7 FOL para correr com Ação Livre direto ao alcance (limite de 20m de diferença).'
      },
      {
        name: 'Medalhista em Maratona',
        description: 'Seu nível de velocidade é surpreendente. Seu chute é veloz, assim como todos seus movimentos. Você consegue correr quilômetros sem parar, e mesmo se cansar, seu corpo se moverá por instinto. Quando estiver com 0 de FOL, desde que percorra 40m todo turno, ainda pode jogar normalmente, podendo usar habilidades de até 3 FOL.'
      },
      {
        name: 'Corrida de Captura',
        description: 'Quando um adversário estiver com a bola, você pode gastar 15 FOL para, caso roube ela, receber bônus baseado na distância da sua última corrida até ela. Em 15-29m, você ganha +1 PA. Em 30-59m, você ganha +1 CA. E de 60+m, você recebe 20 FOL.'
      },
      {
        name: 'A Velocidade',
        description: 'Gastando 25 FOL, você atravessa o campo inteiro. E com um teste de Roubar (DT 35), pega a bola caso ela esteja no fim de sua travessia.'
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
        description: 'Sua aceleração, explosão ou movimentação se tornam totalmente surreais. Baseado nas Velocidades que você tinha anteriormente você ganha determinados benefícios: Velocidade: Aceleração: Seu deslocamento é dobrado enquanto sustentar com 3 VEL. Velocidade: Explosão: Você pode ficar parado por 2 turnos para se mover 150m no seu próximo. Velocidade: Ninjutsu: Pode se mover para qualquer ponto do campo, porém só poderá se deslocar até 20 metros no próximo turno.'
      },
      {
        name: 'Godspeed',
        description: 'Quando se vê frente a frente com alguém que conseguiu te ler, você pode gastar até 20 FOL para refazer sua corrida sabendo da reação adversária, indo para outra direção ou simplesmente disparando. Você pode refazer sua rota com base no ponto original, porém com até +20m de deslocamento (+1m = 1 FOL).'
      },
      {
        name: 'Corrida Celestial',
        description: 'Você se move tão rapidamente e tão perfeitamente, que é como se vagase por outro plano enquanto passa pelo campo, sem que ninguém possa te acompanhar. Todo teste feito durante a sua movimentação pode ser substituído por Corrida, e para cada 100m percorridos em um turno, pode receber um +1 CA e +4 em alguma Perícia que some VEL utilizada nessa travessia.'
      },
      {
        name: 'Distorção de Velocidade Divina',
        description: 'Sua forma de movimentação já não é mais humana. Conforme corre, o campo se distorce de forma que ninguém mais consegue acompanhar seus movimentos. Uma corrida divina como essa é algo que ninguém jamais poderia replicar. Ao ativar (24 FOL), você dobra o alcance do seu deslocamento, e nesse espaço de corrida, você cria uma zona. Ao passar por uma das pontas dessa zona, você é “teleportado” até a outra instantaneamente, como se tivesse corrido tudo aquilo em um único instante. Você só pode ter uma zona ativa por vez.'
      },
      {
        name: 'Apoteose de Velocidade',
        description: 'Você quebrou qualquer barreira de velocidade que já existiu dentro de você, podendo atingir velocidades que nenhuma outra pessoa atingiu, se tornando um dos seres humanos mais rápidos existentes. Sua elevação divina permite que também atinja altos níveis de aceleração em sua evolução. A cada 100m percorridos, você recebe 1 NT temporário. A cada 10 NTs temporários, recebe 1 NT permanente. Quando atingir 4 NTs temporários, entra em Fluxo, e com 8 NTs temporários, ativa o Despertar. Se estiver NT 50, troca a evolução por +1 em todas as perícias, e a cada +3 obtido, ganha +1 permanente.'
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
        description: 'Uma vez por turno, gastando 5 FOL, pode aumentar seu deslocamento em +24m. Além disso, você ainda pode reagir a ações feitas além do seu alcance de reação, desde que estejam em uma distância de, no máximo, 5m + Mod. de VEL além do alcance.'
      },
      {
        name: 'Trem Bala Maglev',
        description: 'Quando disputar corrida com alguém, gastando 1 CA, você pode pagar uma quantidade de FOL à sua escolha para aumentar o valor puro do resultado (Para cada 1 FOL, +1). Se atingir 20, não ganha uma Carga de Adrenalina, e sim +5m de DESL, até o fim da partida (Limite igual à ⅓ do seu deslocamento total padrão, arredondando para baixo) .'
      },
      {
        name: 'Jet Counter',
        description: 'Quando mais de um defensor vier te barrar, você pode gastar 7 FOL para dar um teste de Correr (DT 22 +1 por defensor) para passar de todos, se movendo 5m por defensor. Para cada defensor com um tipo de Velocidade, a DT aumenta em +2, e se passar de 5, além do aumento na DT, os outros defensores (sem Velocidade) te dão -1 no teste (Se não passar no teste, não perde os FOL).'
      },
      {
        name: 'Velocidade Explosiva',
        description: 'Você pode usar “Combustão Instantânea” até duas vezes por turno, a DT base de “Jet Counter” se torna 20, além de anular o bônus extra por velocistas como defensores.'
      },
      {
        name: 'Rei Velocista',
        description: 'Você é capaz de explodir a uma velocidade que pode ser chamada de "mais rápida que o som". É anormal. Você tem uma meta exclusiva: se mover 1500 metros por partida. Se cumpri-la, entra em Fluxo automaticamente.'
      }
    ]
  },
  {
    id: 'velocidade-ninjutsu',
    name: 'Velocidade: Ninjutsu',
    category: 'Físico',
    description: 'Por último, a Velocidade: Ninjutsu (ou só “Ninjutsu”) não foca na constância de corrida, e sim na forma que ela é realizada, através de passos ligeiros e silenciosos, como um verdadeiro ninja.',
    specialization: ['Furtividade', 'Ninjutsu', 'Velocidade'],
    levels: [
      {
        name: 'Jutsu da Folha: Som da Ventania',
        description: 'Você consegue se posicionar perfeitamente para passar pelos adversários. Enquanto estiver furtivo, qualquer oponente que estiver atrás de você já constará como “Ultrapassado”. Além disso, você sempre estará no Ponto Cego de seus adversários enquanto furtivo.'
      },
      {
        name: 'Jutsu da Folha: Arte da Ocultação',
        description: 'Você não deixa de ficar furtivo caso falhe em um teste se gastar 3 de Fôlego, e enquanto sustentar 5 FOL, você também pode ficar furtivo com a posse da bola. Além disso, no Ponto Cego de alguém, você pode trocar a Perícia de referência (sua) para Furtividade.'
      },
      {
        name: 'Jutsu da Folha: Maestria Ninja',
        description: 'Seus turnos não contam mais para o andamento das Rodadas, e se gastar 2 CA, você pode passar 3 Ações Físicas totalmente despercebido, sem que ninguém possa te ver (com a bola, somente duas). Você pode trocar qualquer teste de Perícia Física ou Livre (que envolva o corpo) por um de Furtividade.'
      },
      {
        name: 'Ninjutsu Secreto: Espionagem Shinobi',
        description: 'Enquanto sustentar um teste de Furtividade (DT 25), você pode ficar furtivo a 15m de um alvo que estava a 30m de você no turno em que usou, somente esperando o momento certo de agir. Quando quiser, pode interromper uma Ação dele. Se era uma disputa, pode fazer com que ele perca todo bônus em teste/dado que não seja o bônus de classe de perícia. Se era uma ação individual, você pode fazer o que bem entender, aplicando os bônus de “Surpreso” e “Ponto Cego”.'
      },
      {
        name: 'Ninjutsu Final: Técnica do Passo do Dragão',
        description: 'Você incorpora o Ninjutsu em cada movimento seu no futebol. Você pode gastar 15 FOL para ativar uma habilidade com dois usos diferentes. O primeiro é a "Sabotagem", onde você escolhe um alvo e gasta seu turno para atrapalhá-lo. No turno seguinte dele, o alvo terá -16 em todas as perícias (e efeitos de Sucesso Automático precisarão de teste com -8). Um mesmo alvo só pode ser afetado pela sabotagem 2 vezes. E o outro é a "Infiltração", que permite que, caso queira, use essa habilidade para ativar automaticamente a "Espionagem Shinobi" no começo do turno de um adversário. Se ele fizer, nesse mesmo turno uma das ações, você interrompe a ação.'
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
        description: 'Sempre que tirar 15 ou mais puro em um teste de "Análise", você ganha uma "Carga Analítica". Quando usar as cargas, você gira um teste de Análise como teste secundário, podendo escolher qual resultado vai usar, o do teste principal ou o de Análise.'
      },
      {
        name: 'Calculadora Mental',
        description: 'Sempre que usar uma "Carga Analítica", você recebe um "Alerta". Esse alerta pode ser o que você quiser. "Me avise quando a bola for parar perto do gol", "Me avise se um adversário for devorar meu aliado em breve" e por aí vai. Você será alertado pelo Mestre quando esse evento estiver próximo, e quando acontecer, você pode se mover automaticamente para 30m do local da Ação (NT 30 = 20, NT 40 = 15), e recebe +5 para reagir a essa Ação. Pode gastar 1 Ação Mental (caso seja seu turno) para passar o efeito para um aliado.'
      },
      {
        name: 'Frieza',
        description: 'Quando forem tentar interromper ações suas, você pode gastar uma Carga Analítica para reduzir a categoria do teste dele em um (De Medíocre para Ruim por exemplo). O valor final se mantém o mesmo, porém se essa redução tiver impacto, ele será aplicado (Não funciona para testes de Defesa ou Chute/Precisão). Caso a ação seja direcionada a outro jogador (Como passes, por exemplo), pode gastar 2 Cargas e reduzir duas vezes.'
      },
      {
        name: 'Cabeça Fria',
        description: 'Você não pode ser afetado por condições mentais (sejam elas positivas ou negativas), e também não pode mais usar Fúria. No lugar dos Pontos de Fúria, você recebe +1 FOL, e quando fosse maximizar a Fúria, entra em Fluxo.'
      },
      {
        name: 'Calculismo Álgido',
        description: 'Você pode ser afetado por Condições mentais positivas, Cargas Analíticas podem ser obtidas com 10 no dado, o efeito de “Calculadora Mental” tem seus alcances reduzidos em um passo (NT 40 = 5m) e você continua gastando 1 Carga com “Frieza” para Ações com outros jogadores.'
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
    description: 'Assim como a Força Física, é uma arma que foca no poder muscular. Todavia, o Físico Escultural prioriza a inteligência corporal e a “construção corporal” do que uma simples força descontrolada.',
    specialization: ['Físico', 'Técnica Corporal', 'Versatilidade'],
    levels: [
      {
        name: 'Construtor Corporal',
        description: 'Similar a "Força Física", o foco dessa Arma é seu corpo, tornando seu corpo quase que uma máquina perfeita. Saber focar sua força, controlar bem seu corpo e saber como melhorar constantemente fazem o "Físico Escultural" ser a meta de vários jogadores. Com 5 FOL, você pode usar o primeiro poder das seguintes armas: Velocidade (Aceleração), Velocidade (Explosão), Aríete, Imperador do X1, Dribles Agressivos e Marcação Stalker (Cada uso tem 2 rodadas, e após isso a Arma que escolheu não pode mais ser usada na partida). Se estiver usando a Regra Opcional “Ferimento Especial”, pode sustentar 1 FOL para anular Lesões Musculares.'
      },
      {
        name: 'Físico Versátil',
        description: 'Você recebe Especialidade em mais uma Perícia Física a sua escolha. Além disso, você pode converter 1 CA em +1d em uma Perícia Física, e 2 CA para transformar uma Perícia Livre em Perícia Física para você até o fim da partida.'
      },
      {
        name: 'Treinamento Pesado',
        description: 'Quando liberar esse Nível, todos os seus treinamentos físicos (exceto por Perícias Físicas) aumentam em 1 Nível. Nas partidas seguintes, cada 5 CA que você conseguir com Perícias Físicas, é convertido em 1 Treinamento (Limite = seu Modificador de Físico).'
      },
      {
        name: 'Corpo Sincronizado',
        description: 'Todos os sistemas do seu corpo estão em sincronia, trabalhando da melhor forma possível. Todas suas habilidades de 10- FOL tem custo arredondado para 1d4. Quando chega a 0 FOL, você somente perde uma Ação Física, além de que, na primeira rodada que zerar o Fôlego, ganha 1d20+5. Recebe todas as Perícias Físicas (se já tinha todas, ganha uma Classe extra em todas).'
      },
      {
        name: 'Colosso do Futebol',
        description: 'No começo da partida, você gira 10d20. Esses resultados ficam guardados, e cada um deles pode ser usado uma vez no futuro, como resultado definitivo para alguma perícia. Os resultados de valor "20" podem ser usados duas vezes.'
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
    description: 'Essa arma aprimora todas as suas características, chute, passe, corrida, corpo a corpo, não é atoa que é chamada de “Perfeição”. Aquele que a usar terá direito ao título de “Jogador Perfeito”, com um nível de habilidade que não possui margem para erros.',
    specialization: ['Perfeição', 'Precisão', 'Excelência'],
    levels: [
      {
        name: 'Parábola Perfeita',
        description: 'A curvatura dos seus movimentos, o formato da parábola deixada por magnífica e perfeita. Até mesmo aqueles que você destruir ficarão hipnotizados com tamanha beleza. A curvatura dos seus chutes e passes são simétricos e precisos, tornando alcance e potência equivalentes. Se o resultado do seu teste de Chute, Passe ou Precisão for maior que o alcance, ele se torna o novo alcance do movimento. Agora, se o alcance for maior, para cada 10m de alcance, você ganha +1 no valor puro do teste. Você pode trocar testes de Chute/Passe por Precisão, e o alcance base do seu chute torna-se 35m. No NT 15, caso o resultado seja maior que o alcance, você também soma suas Classes de Precisão nesse alcance, e se o alcance for maior, você ganha +1 Ação Física nesse ou no seu próximo turno caso atinja o valor puro de 20. No NT 25, durante a execução da ação, uma quantidade de metros igual a 10 + Classes em Precisão tem sua execução totalmente garantida. Por exemplo, supondo que esse valor seja 17 (10 + 7 Classes) e você vai realizar um passe de 30m, os primeiros 17m desse passe são totalmente bem sucedidos, não podem ser interceptados ou acompanhados. Pode gastar 1 CA para aumentar em +10m.'
      },
      {
        name: 'Perfeição Sinuosa',
        description: 'Cada movimento feito por você deixa um rastro de habilidade capaz de surpreender a todo tipo de jogador, seja ele inferior ou superior a você. Se a beleza da parábola que seu chute traçava já era encantadora, o desenho no ar de seus movimentos é mais ainda. Sempre que tirar um valor puro igual a 20 - Classes em Precisão em um teste (para cada Especialização na Arma, valor puro necessário é reduzido em 1), você recebe 1 Ponto para somar no valor puro de seus testes ao decorrer da partida. O efeito de 20 puro é aplicado com essa soma, porém você não recebe CA por isso (não aplica em testes de Chute, Precisão e Defesa, mas pode ser somado na DP). Os Pontos resetam a cada partida.'
      },
      {
        name: 'Execução Exímia',
        description: 'Os Pontos obtidos em "Perfeição Sinuosa" se tornam "eternos", então caso termine uma partida com certo valor, ele se manterá para a próxima. Além disso, você pode gastar 3 Pontos para receber os seguintes efeitos quando for usar um Movimento: +2 no bônus, DT reduzida em 2, gasto anulado e alcance aumentado em 4m. Você também passa a receber CA por efeitos de 20 puro obtidos com a Perfeição Sinuosa, e pode trocar 15 FOL por 1 Ponto.'
      },
      {
        name: 'Jogador Perfeito',
        description: 'Você recebe +1 Classe em todas as Perícias, +3 em todos os Atributos, +1 Habilidade Geral e o 1° e 2° Nível de um Estilo a sua escolha. Além disso, seus sucessos automáticos são sempre superiores a todos os outros, não podendo ser anulados ou sobrepostos. Por fim, durante uma disputa de 1 contra 1 (Se tiver 3 Especializações, pode ser até de 1 contra 2), o bônus adversário nunca poderá ser maior que o seu, desde que o NT dele seja no máximo 3 maior que o seu.'
      },
      {
        name: 'Das Cinzas Nasce a Perfeição',
        description: 'Escolhido pelos céus, você é um jogador perfeito. Uma divindade sem defeitos dentro das quadras, e cada partícula que compõe sua existência superior, é alheia a falhas e defeitos. Entretanto, uma existência perfeita não seria capaz de ser atingida sem suor. Ao ativar o Fluxo, você pode sacrificar seu Foco para receber esse efeito. Sempre que falhar em um teste, você recebe +1 Classe temporária nele, acumulando até Classe X (Perícias que já eram Classe X recebem +1). A cada falha, você renascerá das cinzas, até se tornar perfeito. Sempre que uma Perícia atingir a Classe X, você recebe +1 PA temporário. Se conseguir 5 Perícias Classe X, ganha uma nova Aura. Se conseguir 10, recebe uma nova Arma. Ao ativar, se gastar todos os seus PA, você também desperta, e pode sacrificar sua Melhoria para aumentar o ganho de Classes Temporárias para 2. A cada 3 Classes obtidas em uma Perícia, ganha uma Classe permanente. Os ganhos de Aura, Arma, etc. só são aplicados na primeira vez que utilizar desse Nível.'
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
        description: 'Você recebe a perícia especial Penetração I. Pode substituir Penetração pode substituir as perícias Chute e Drible. Quando estiver a 25 + Classe de Penetração metros do gol, você passa a receber +1d para chutar no gol. Qualquer malefício em Penetração se aplica às perícias substituídas.'
      },
      {
        name: 'Invasão',
        description: 'Você recebe o movimento Arrastar Tesoura e pode utilizar Penetração em vez de Finta ao cumprir os requisitos, obtendo também o acesso à Tesoura Hiperveloz. Pode usar Penetração contra a reação de um defensor e, se tiver sucesso, o defensor perde uma classe ao reagir contra você, enquanto você ganha uma classe contra ele. Essa ação só pode ser usada quando estiver com a bola no campo inimigo; se vencer, você saqueia os bônus do defensor, o bônus de CLASSE que ele tem no teste de reação pode ser usado para acrescentar em uma jogada sua, no fim do turno os bônus são perdidos. Cada defensor envolvido exige o gasto de 4 de Fôlego. Além disso, você pode usar Penetração para sair da Defesa Sincrética; nesse caso, ambos os defensores são forçados a segui-lo até o fim da sua próxima ação, consumindo uma ação física.'
      },
      {
        name: 'Ataque',
        description: 'Escolha entre anular os malefícios de Olhos do Predador ou dobrar os seus benefícios. Se ainda não possuir Olhos do Predador, você o desperta. Quando estiver no alcance de chute da Penetração, pode chutar sem precisar enxergar o gol, confiando nos instintos. Por 10 de Fôlego, você realiza um teste de Intuição contra o teste de Análise de todos que tentarem reagir ao seu chute (o goleiro pode usar Defesa em vez de Análise). Quem falhar no teste não pode reagir ao seu chute.'
      },
      {
        name: 'Emboscada',
        description: 'Penetração pode substituir as perícias Roubo e Corrida. Sempre que vencer uma disputa usando Penetração no lugar dessas perícias, você recebe +1d em Penetração, acumulando esse bônus até o máximo igual à sua Classe de Penetração (por exemplo, se for Classe V, o limite é +5d). Esse acúmulo é perdido ao perder uma disputa utilizando uma perícia substituída por Penetração. Aliados podem aplicar esse bônus acumulado em testes feitos para beneficiar você. Além disso, ao vencer uma disputa com qualquer perícia substituída por Penetração em um ataque, você pode gastar 4 FOL para considerar o oponente “Emboscado”; essa condição termina no fim do ataque. Enquanto estiver emboscado, você e seus aliados recebem +4 e +1d contra o alvo, e qualquer aliado que o marcar aplica esse bônus como malefício, considerando o alvo sob o Movimento Defesa Sincrética.'
      },
      {
        name: 'Guerra',
        description: 'Penetração passa a cobrir também as perícias Domínio e Fortitude. Ao falhar em um teste de Penetração, você pode optar por intensificá-lo ao custo de 8 de Fôlego (FOL), permitindo que você faça um novo teste, sem recuperar nenhum recurso que já gastou no último teste. Você também adquire automaticamente o outro benefício de Olhos do Predador que não havia escolhido no Nível 3 da Arma - Ataque, acumulando ambos os efeitos. Quando emboscar um alvo, até três aliados podem se deslocar a mesma distância que você, seguindo exatamente a sua trilha. Além disso, sempre que realizarem ações para te beneficiar, como trocas de passe que terminem em você, você acumula +2 por teste bem-sucedido. Esse acúmulo pode ser usado em um teste de penetração à sua escolha, ou é perdido ao final do ataque. Por exemplo: se Lorenzo passa para Aiku, Aiku devolve para Lorenzo, e isso ocorre três vezes antes de você receber a bola e chutar, você acumula +12, podendo usá-lo no chute final.'
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
        description: 'Você recebe as seguintes perícias: Interceptação, Roubo, Defesa, Reação e Cabeceio. Para cada uma delas que você já possui, recebe Especialidade (pode trocar todas as Especialidades por +1 Classe em uma delas). Quando a defesa for invadida (ou seja, um adversário chegar na grande área), pode gastar 1 CA para receber +1d em alguma delas.'
      },
      {
        name: 'Proteção Absoluta',
        description: 'Para cada sucesso que você conseguir com as perícias citadas no Nível 1, você recebe +2 FOL (ou +1 PA ou +1 CA) em uma estatística a sua escolha. Quando reunir 4 de FOL ou 2 de PA/CA de uma mesma estatística, você pode converter em +1d temporário em uma das perícias que não estão em Bloqueio Máximo. Quando completar, reseta.'
      },
      {
        name: 'Vanguarda Completa',
        description: 'Gastando 5 de FOL, você pode escolher uma área entre: Gol, Zaga e Meio de Campo (do seu campo). Após essa escolha (que é irreversível), durante a partida você pode dar um teste de Reação X Teste da Ação adversária para se mover até a área que escolheu e ter a chance de impedir (Isso varia da Ação do personagem e das suas opções de Reação). Se você estiver no campo adversário, gasta 5 FOL, se estiver na área inimiga 10, e se for no gol adversário, 15. Caso tenha a Perícia Especial ou a Habilidade Exótica “Reflexos”, você reduz o gasto em 4. 5 turnos seus após o uso, escolhe uma segunda área'
      },
      {
        name: 'Fechamento Sincrético',
        description: 'Caso esteja com outro defensor, podem fazer uma Defesa Coletiva, gastando 10 FOL mutuamente. A soma dos NTs dos dois é subtraída pelo NT do adversário (Mínimo 1), e volta como bônus no teste dos dois. Porém, o extra dessa habilidade, é que a Defesa pode ocasionar uma reação especial causada por um dos dois. Por exemplo, vamos usar dois personagens do Quarteto Muralha de Ferro. Um atacante foi avançar, e Oliver Aiku junto de Teppei Neru foram defender. Oliver usa sua arma, e ambos gastam 10 FOL, impedindo o atacante. Oliver defende, e Teppei define a reação, que será tomar a bola e passar para um atacante.'
      },
      {
        name: 'Égide Supremo',
        description: 'Ao gastar 5 de FOL, você pode ativar essa habilidade por 3 Rodadas (de ativação). Nessas 3 Rodadas, para cada 20 puro que você conseguir, recebe 1 uso dessa habilidade pelas próximas 3 rodadas (após o fim das 3 iniciais). Quando gastar 1 uso, o efeito ficará ativo por 3 Rodadas (de uso), e durante elas, seus valores puros terão o dobro do Primeiro Número do seu NT somado neles (se é 5, soma +10 no valor puro). Se durante as 3 Rodadas de ativação, você conseguir um 20 em um teste Defensivo, na próxima vez que usar durante a partida, a DT necessária deixa de ser 20, e é reduzida em 1 para cada 20 que conseguiu em um teste defensivo. O limite de usos dessa habilidade é 1 para cada 3 Classes que possuir em Defesa.'
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
        description: 'Você recebe +2 em Domínio, e também o movimento de Chute “Voleio Giratório”. Além disso, você pode gastar 3 FOL para, quando dominar a bola, emendar um passe, cruzamento ou chute, sem gastar mais ações.'
      },
      {
        name: 'Armadilha',
        description: 'Usando de seu domínio irreal, você consegue criar Armadilhas de corpo que permitem domínios sobrenaturais, tanto para controlar a bola quanto para passar de adversários. Quando um adversário avançar (até três) para cima de você, pode dar um teste de Domínio para usar uma Armadilha contra ele. Se vencer, não gasta nenhuma Ação por isso (5 FOL). Essa habilidade pode ser usada com a Regra Opcional “Solução Criativa”, gastando +5 FOL.'
      },
      {
        name: 'Giro de Reinicialização Zero',
        description: 'Essa armadilha permite que você encerre uma jogada, reiniciando o ritmo do jogo criando uma nova jogada a partir do seu domínio. Ao falhar em uma disputa que ocasionaria na perda da bola (encerrando uma jogada), você pode gastar 14 FOL para dar um teste de Domínio (DT 26) e desviar a bola dos adversários. Você encerra a jogada (junto de qualquer efeito relacionado a uma), podendo realizar qualquer outra ação com +4, como passes, chutes, etc. Alvos que tentaram te impedir não conseguiram, tendo que reagir a sua nova ação (com uma penalidade igual a 1 para cada 1 que tirou acima da DT do teste de Domínio).'
      },
      {
        name: 'Domínio Aprimorado',
        description: 'Você consegue enfrentar até 5 adversários com “Armadilha”, os gastos de “Domínio Perfeito” são anulados e os gastos de “GRZ” são reduzidos em 3. Você também recebe +1 Classe em Domínio.'
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
