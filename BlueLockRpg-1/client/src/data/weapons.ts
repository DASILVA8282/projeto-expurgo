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
        description: 'Durante os Acréscimos, seu show começa a se encerrar. Então, é digno um último truque para a plateia. O gasto da "Cartola" é anulado, já o do "Truque de Mágica" se torna 1, além de as DTs serem sempre 15.'
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
    description: 'A Ambidestria é uma Arma Menor que oscila entre mental e corporal, afinal, mesmo que foque em suas pernas, ela também usa de uma capacidade cognitiva que poucos tem, para controlar perfeitamente o setor esquerdo e direito de seu corpo. Além da Etapa de Obtenção, essa arma só pode ser utilizada por jogadores escolhidos a dedo pelo mestre.',
    specialization: ['Ambidestria', 'Controle Corporal', 'Imprevisibilidade'],
    levels: [
      {
        name: 'Maestria Ambidestra',
        description: 'Por ser Ambidestro, você recebe inúmeras vantagens. Se torna imune a penalidades por marcação na perna boa (somente aplicada se duas pessoas estiverem te marcando, uma em cada perna). Além disso, por ser levemente imprevisível, recebe +2 no primeiro teste de Chute, Passe, Cruzamento e Precisão que der numa partida. Por fim, todo turno seu gira 1d6. De 1 a 3, sua "Perna Superior" naquele turno será a Esquerda. De 4 a 6, será a Direita. Para qualquer ação sua realizada em seu lado Esquerdo/Direito, terá +2 no teste.'
      },
      {
        name: 'Habilidoso (Destro)',
        description: 'Durante os efeitos de "Perna Superior", você recebe uma capacidade especial quando o efeito estiver sob a Perna Direita. Todas suas perícias quando usar serão uma Classe superior (caso ela seja Classe X, ganha Sucesso Automático).'
      },
      {
        name: 'Sinistro (Canhoto)',
        description: 'Durante os efeitos de "Perna Superior", você recebe uma capacidade especial quando o efeito estiver sob a Perna Esquerda. Você consegue usar as habilidades de Nível 1 das Armas: Dribles Mágicos, Controle de Bola, Domínio de Bola, Kaiser Impact, Genialidade.'
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
        description: 'A sua função é estar sempre junto de outro atacante, para criar jogadas e ajudar a sair de enrascadas. Sempre que se manter a pelo menos 20m do Atacante Principal e estiver escondido (Furtividade), o efeito será aplicado. No começo da partida, você tem que escolher entre "Receptor" ou "Doador". Se for receptor, quando o Atacante Principal for perder a bola, ele poderá gastar 5 FOL para tocar a bola para você, com +1/+2/+3 Classes. Caso você seja um "Doador", sempre que o Atacante Principal estiver numa brecha para avançar, você pode gastar 3 FOL para fazer um passe com +1/+3/+5/+7/+9/+11 para ele (Nesse efeito, o Atacante Principal é quem deve estar furtivo para funcionar, não você). Em ambos efeitos, cada 5 ou 3 de Fôlego que gastar aumenta em 1 o nível do bônus.'
      },
      {
        name: 'A Sombra (2)',
        description: 'A distância aumenta para 30m, os gastos são reduzidos para 5 FOL e 2 FOL, você recebe +2 em Furtividade e pode trocar sua Ação Mental por Física enquanto estiver sobre o efeito.'
      },
      {
        name: 'Inversão Fantasmagórica',
        description: 'Se ambos gastarem o Fôlego necessário, os papéis podem ser trocados, com você se tornando o Atacante Principal, enquanto o antigo Principal não poderá escolher entre Receptor e Doador, tendo que seguir o que você escolheu anteriormente. Essa troca pode ser feita como Reação, no seu turno ou no turno do antigo Atacante Principal.'
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
        description: 'Enquanto manter contato visual com um aliado, os dois recebem +3 em todos os testes, e +6 em testes conjuntos (como troca de passes). A partir do NT 13, o Contato Visual pode incluir um terceiro personagem. Para que o contato visual seja feito, existem algumas condições. Primeiro, nenhum dos envolvidos pode estar furtivo. Segundo, os dois devem estar dentro do alcance de reação um do outro. Por fim, não pode haver inimigos entre os dois. Se ambos possuírem a Arma, os bônus se tornam +4 e +8.'
      },
      {
        name: 'Olhar Sinérgico',
        description: 'Enquanto se olharem, vocês sempre estarão em Sinergia, com Módulo variável. Durante essa Sinergia, os bônus de "Linha de Contato" se tornam +4 e +8. Se ambos possuírem a arma, o bônus se torna +5 e +10.'
      },
      {
        name: 'Olho por Olho',
        description: 'A conexão entre vocês já se tornou muito poderosa, e são capazes de enxergar pelos mesmos olhos. Enquanto conseguirem se olhar, as habilidades visuais (Olho do Predador e Meta Visão) podem ser compartilhadas entre si, mesmo que um dos envolvidos não tenha. Aquele que não possuir terá acesso a uma quantidade de habilidades do alvo -1 (se for Meta Visão, a redução será aplicada em todas as 3 ramificações, enquanto o Olho do Predador, o alvo não poderá ter nenhuma das últimas habilidades das Variantes de Caçada). O bônus se torna +5 e +10, e se ambos tiverem a Arma, torna-se +6 e +12.'
      }
    ]
  },
  {
    id: 'chute-todo-poderoso',
    name: 'Chute Todo Poderoso',
    category: 'Ofensivo',
    description: 'O Chute Todo Poderoso é uma arma que aprimora os poderes das armas “Chute Direto”, “Kaiser Impact” ou “Chute Explosivo”, tornando-as ainda mais poderosas.',
    specialization: ['Chute', 'Aprimoramento', 'Poder'],
    levels: [
      {
        name: 'Impacto Divino',
        description: 'CHUTE DIRETO: Sua precisão, força e velocidade de chute são igualados perfeitamente. Você pode trocar testes de Precisão por Chute (quando utilizada para chutes fora do alcance), e para cada 2 Classes em Precisão, recebe +1 em Chute (Especialidade = +1). KAISER IMPACT: Pode usar o Voleio Imperial mesmo com alguém na reta (máximo de 5 pessoas, de 6 para cima não pode usar), e agora o Lightning Strike só pode ser parado por defensores se eles tiverem Meta Visão ativa (se não, somente o goleiro pode parar). CHUTE EXPLOSIVO: Ao fim de toda rodada, você recebe 1 de Vibração Celular. Durante o Fluxo, esse valor aumenta em 1, e se possuir uma das Habilidades Gerais "Ka-ka-kabooom" ou "Explosão de Dopamina", aumenta em +1.'
      },
      {
        name: 'Força Total',
        description: 'CHUTE DIRETO: Você recebe a habilidade "Faro de Gol" da Inteligência Espacial (se já tinha, ou se receber no futuro, o bônus se torna +12). Porém, você pode usar a habilidade mais de uma vez, com o bônus sendo reduzido em 2 a cada uso. KAISER IMPACT: Você consegue utilizar o Kaiser Impact em: Tiro de Meta, Pênaltis, Tiro Livre e Passes (de até 15m). Caso possua o Kaiser Impact: Magnus, também consegue usar em Escanteios, Passes acima de 15m e Cruzamentos. CHUTE EXPLOSIVO: O efeito de "Ímpeto Explosivo" é aplicado em Escanteios e Faltas, e a cada cartão amarelo que sofrer, ganha 3 de Vibração Celular.'
      },
      {
        name: 'Impacto Divino',
        description: 'CHUTE DIRETO: Você transforma o "Voleio de Duas Armas" em "Voleio de Três Armas", adicionando mais uma finta ao chute, dificultando ainda mais a defesa. Se o seu chute final for com a perna boa, você recebe +3 Classes enquanto os adversários recebem -3. Agora, se for com a perna ruim, as penalidades são dobradas, mas você recebe 1 Nível da Ambidestria até o fim da partida, além de anular 2 penalidades de Perna Ruim permanentemente (com 20 puro, recebem 2 Níveis da Ambidestria). KAISER IMPACT: Gastando 30 FOL, você tem direito a 1 uso do Kaiser Impact: Magnus. Se você já possui essa habilidade, recebe mais um uso. CHUTE EXPLOSIVO: Você pode trocar 15 de Vibração Celular pelo nível seguinte do Chute Explosivo. Se já tem o Nível 5, troca o Fluxo por um Despertar. E se já estava despertado, recebe +10 PD.'
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
        description: 'Você pode classificar jogadores entre Velocistas, Defensores, Suportes, Craques, Atacantes e Oportunistas. Através de uma ação mental, pode classificá-los em uma posição condizente com seu estilo, ao custo de 5 de FOL. Você só pode classificar um jogador uma vez, mas pode reclassificá-lo pagando novamente 5 FOL, sem gastar ação. Ao enfrentar um jogador classificado, você recebe bônus conforme a posição: contra Velocistas, pode substituir Análise, Reação e Corrida entre si em disputas; contra Defensores, ele tem -1 Classe em Reação, Defesa, Interceptação, Cabeceio e Roubo contra você, enquanto você tem +1 Classe nessas disputas; contra Suportes, ao marcá-los, você pode escolher até dois jogadores para bloquear passes, o Suporte não pode passar para eles, e se tentar se livrar da marcação, você pode usar Análise no teste; contra Craques, após ser ultrapassado, pode tentar uma segunda reação com +1 Classe; contra Atacantes, pode substituir Análise por Reação ou Interceptação e recebe +1 Classe em Defesa e Roubo; contra Oportunistas, se receberem a posse e estiverem em um raio de 30 + Dobro da sua Classe de Análise, você pode se deslocar imediatamente até ele e receber uma reação extra. Você poe consultar no maximo jogadores igual a sua classe de análise.'
      },
      {
        name: 'Examinar',
        description: 'Após consultar um alvo, você pode examiná-lo a qualquer momento usando uma ação mental, avaliando seu nível físico e técnico. Isso permite que você o ranqueie entre quatro categorias: C, B, A e S. Jogadores Rank C são claramente mais fracos que você, Rank B são coadjuvantes no seu nível, Rank A são equivalentes ou ligeiramente superiores, e Rank S são claramente mais fortes. Ranquear um jogador custa 5 de FOL e deve ser condizente com sua posição em campo, embora essa classificação possa mudar com o tempo: se um Rank C vence uma disputa contra você, ele se torna Rank B; se um Rank B se destacar, passa a Rank A; se um Rank A evitar ser vencido por você em três disputas seguidas ou vencer duas disputas seguidas um Rank S, torna-se Rank S. Ranks podem ser pulados — um Rank C pode ir direto para A ou S, dependendo da situação. Caso um jogador ranqueado como C tenha duas classes a menos que você na perícia usada na disputa (ex: você com Drible III e ele com Roubo I), você tem sucesso automático. Se tiver apenas uma classe a menos ou for equivalente/maior, ele deverá gastar 4 FOL para disputar com você. Contra jogadores Rank B ou menor, se você falhar em um teste, pode gastar 4 FOL para refazê-lo ou forçar o oponente a refazer. Contra jogadores Rank A ou menor, você recebe +1 Classe e o adversário -1 Classe em disputas diretas. Contra jogadores Rank S ou menor, sempre que falhar em uma disputa, você ganha +2 acumulativo em testes contra ele, até vencer esse mesmo jogador. Você pode examinar no máximo jogadores igual a sua classe de análise.'
      },
      {
        name: 'Inspecionar',
        description: 'Você pode revelar seu Consultar para outros jogadores em campo apenas durante intervalos, como pausas por falta, entre o primeiro e segundo tempo, ou gastando uma ação livre para repassar diretamente a um jogador. Além disso, pode inspecionar aliados, classificando-os como Ofensivos, Balanceados ou Defensivos. Aliados Ofensivos recebem +1 Classe em disputas que tenham iniciado (como chutes ao gol ou dribles forçados); Balanceados reduzem o custo total de FOL em 7 no turno; e Defensivos podem reagir novamente se forem ultrapassados, uma única vez, até que um contra-ataque seja iniciado. Você pode reavaliar seus aliados apenas durante intervalos, ou forçar a reclassificação com uma ação livre. Cada inspeção custa 5 de FOL. Você pode inspecionar no máximo jogadores igual a sua classe de análise.'
      }
    ]
  },
  {
    id: 'drible-de-maquina',
    name: 'Drible de Máquina',
    category: 'Técnico',
    description: 'Esses dribles seguem um estilo mecânico e fechado, com movimentos padronizados e certeiros, sem margem para erros ou falhas, e mesmo sendo “previsíveis” até certo ponto, são difíceis de serem impedidos.',
    specialization: ['Drible', 'Precisão', 'Programação'],
    levels: [
      {
        name: 'Movimentos Programados',
        description: 'Os Dribles de Máquina consistem em realizar movimentos "programados", com total precisão e sabendo como reagir, sem margem nenhuma para erros. Com isso, seu Drible pode se adaptar essencialmente à reação do adversário. Primeiro, a Ação e Reação será feita normalmente. Após isso, caso falhe, pode ativar esse Nível (gastando 10 FOL) para refazer o teste. Porém, o essencial é que você descreva seu drible se adaptando exatamente a forma que o defensor te venceu, pois esse será o principal fator da decisão.'
      },
      {
        name: 'Previsão Robótica',
        description: 'Gastando 4 FOL e 5 de INT, você programa 3 dribles. Quando for driblar alguém, caso a descrição dele seja inferior (em termos técnicos, ou seja, se ele avança pra você porém na sua descrição você fazia um elástico pela esquerda, a descrição dele foi inferior), você passará automaticamente. Você pode escolher qual dos 3 programados vai usar, porém eles só podem ser usados uma vez.'
      },
      {
        name: 'Sistema Mecânico Tecnológico',
        description: 'Você pode programar quantos dribles quiser, e gasta somente 2 de Fôlego com eles. Além disso, para cada Drible Programado bem sucedido, você ganha direito a programar uma Ação também.'
      }
    ]
  },
  {
    id: 'fingir-falta',
    name: 'Fingir Falta',
    category: 'Mental',
    description: 'Uma técnica maliciosa que se aproveita da enganação e da “ocultação” de movimentos do árbitro para tirar vantagem. É uma arma perigosa, e se bem usada, pode causar muitos problemas aos adversários.',
    specialization: ['Enganação', 'Interação Social', 'Malícia'],
    levels: [
      {
        name: 'Definitivamente Foi Falta',
        description: 'Quando alguém realizar um jogo de corpo, corrida com corrida ou qualquer outra interação física com você, o valor puro relativo será -4. Ou seja, os resultados irão se manter iguais, mas para critérios de aplicação de faltas, quedas e lesões, ele terá -4 no puro. Se gastar 10 FOL, aumenta para -8.'
      },
      {
        name: 'Olha o Cartãozinho!',
        description: 'Quando usar o "Definitivamente Foi Falta", pode dar um teste de Interação Social (DT 24) para fingir que ocorreu algo mais sério. Gastando 10 FOL, o jogador adversário recebe um Cartão Amarelo. Só pode ser usado uma vez. Se ele já tinha um Cartão Amarelo, recebe uma penalização mecânica, de -2 na Perícia que usou para te penalizar. Se gastar 20 FOL, aumenta a penalidade para -6.'
      },
      {
        name: 'Tua Mãe Aquela #@!$&*',
        description: 'Quando estiver no mano a mano com outro personagem, pode dar um teste de Interação Social X Determinação dele. Se vencer, você consegue fazer com que ele te ofenda, o que ocasionará em penalizações ao jogador, que variam de acordo com: Temperamento do provocado, Valor no teste de Interação Social, Capacidade provocativa do provocador e também a situação em que ocorreu. Com tudo isso, além de conseguir marcar uma falta, você ainda pode fazer com que ele receba desde um aviso, até um Cartão Vermelho. 3 FOL e Ação Mental.'
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
        description: 'Para cada 1 FOL que gastar, você pode anular 1 de penalidade (aplicável para dados). O limite que pode fazer isso é igual ao seu NT +1 para cada 2 Classes em Determinação que possuir. Além disso, a primeira Condição Negativa que te afetar, você pode anular. Também pode anular lesões.'
      },
      {
        name: 'Determinação Inalcançável',
        description: 'Quando forem interromper ou atrapalhar uma jogada sua, você pode gastar 5 FOL para girar um teste extra de Determinação e aplicar uma penalidade no adversário igual o dobro das suas Classes em Determinação. Se o alvo tiver 5/4/3/2/1 NT a menos que você, pode gastar 2 CA para passar por ele automaticamente (a diferença é reduzida para cada 5 FOL que você gastar. O limite de usos que você tem dessa habilidade é igual a metade da quantidade de dados que você gira em Determinação, considerando somente Classe e bônus passivos ativos desde o começo da partida.'
      },
      {
        name: 'Me Devore, Que Eu Voltarei Mais Forte!',
        description: 'Na primeira vez que for Devorado em uma partida, você pode gastar todo seu Fôlego para converter as penalidades em bônus. Se ficar sob a Condição “Devorado”, pode ativar um Despertar, anulando a Condição enquanto seu Despertar durar.'
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
        description: 'Você consegue manter a pressão a distância no jogador, perseguindo ele onde quer que vá. Enquanto sustentar 3 de FOL, você o acompanhará a qualquer ponto do campo, independente de deslocamento e habilidades. Você recebe +2 em Interceptação para impedir passes vindos de outros jogadores ou dele ao invés de aplicar uma penalidade. Além disso, recebe +4 no teste oposto caso o alvo tente te driblar. O alvo também pode sustentar até 6 de Fôlego para anular seus bônus, cada 1 de FOL anula 1 de bônus, começando a contagem a partir de Interceptação (por exemplo, se ele sustentar 3, anulará os 2 de Interceptação e 1 para evitar o drible).'
      },
      {
        name: 'Transferidor Sexy',
        description: 'O verdadeiro brilho dessa Arma, onde você utiliza do semicírculo de 2 metros para privar as opções do adversário. Os bônus se tornam +4 em Interceptação e +6 no teste oposto ao drible, e você pode escolher até dois alvos para impedir que recebam a bola ou passem para o alvo que está marcando (agora o alvo pode sustentar até 10 FOL).'
      },
      {
        name: 'Diâmetro de Pressão',
        description: 'Você agora tem domínio total dentro dos 2 metros. Você intercepta automaticamente qualquer passe direcionado ao alvo, pode bloquear até 3 opções de passe dele (caso o alvo esteja com a bola), e durante a movimentação dele, pode gastar 5 FOL para "frear", impedindo que ele se mova mais naquele turno. Se o alvo tiver menos DESL que você, ele não poderá se mover após você frear. Se ele tiver mais, o limite de deslocamento será igual ao seu Deslocamento.'
      }
    ]
  },
  {
    id: 'monstruosidade-egoica',
    name: 'Monstruosidade Egóica',
    category: 'Mental',
    description: 'A “Monstruosidade Egóica” é uma Arma Menor que complementa seu estilo de jogo, aprimorando cada característica sua, o que te permite um jogo "solo", somente avançando e devorando tudo pela frente.',
    specialization: ['Egoísmo', 'Individualismo', 'Devoração'],
    levels: [
      {
        name: 'Uma Fera Dentro de Campo',
        description: 'Seu estilo egoísta de jogar faz com que você consiga ultrapassar diversos adversários ao mesmo tempo, em um ritmo natural e constante, sem dificuldade. Sempre que ultrapassar um adversário, você recebe um bônus com base em quanto tirou no valor puro. Se tirou 12-15, você se move +15m e ganha +2 nos testes até o fim da sequência. Se tirou 16-19, você se move até o adversário mais próximo sem gastar nenhuma ação e +3 nos testes até o fim da sequência. Por fim, com 20 puro, você se move até o adversário mais próximo sem gastar nenhuma ação, recebe +1 Ação Física e +4 em todos os testes até o fim da sequência. Pode gastar 1 CA para aumentar o "patamar" de bônus em 1.'
      },
      {
        name: 'Gingado Monstruoso',
        description: 'Seus movimentos pequenos dão a impressão de que a bola está grudada em seu pé, e com vários pequenos toques, você confunde o adversário enquanto espera ele dar o primeiro passo, atraindo-o até seu território. Após isso, você avança, deixando-o para trás. Somente o adversário irá dar o teste, e você pode gastar seu Deslocamento para reduzir o resultado dele (Limite = dobro do Mod. VEL (Mínimo 2)). Após isso, você dá o teste, e se vencer, se move uma quantidade de metros igual à sua Velocidade.'
      },
      {
        name: 'Consumação Egoísta',
        description: 'Sua movimentação pelo campo consome qualquer esperança de vitória com seu Ego, sempre trazendo novas técnicas e improvisação. Enquanto sustentar com 4 FOL, você receberá um "turno" extra, que será junto do seu original. Ao final dos seus turnos, você escolhe qual irá usar, julgando a melhor opção. Você recebe +1 acumulativo em todas as perícias que usou no turno que não foi utilizado.'
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
        description: 'Você é capaz de aplicar mais força e pressão em sua marcação, desestabilizando (quase) todos os adversários. Você recebe uma barra de "Pressão" que se inicia em 5. Você pode gastar esses pontos para aumentar a penalidade por marcação. Sempre que vencer uma disputa em que está marcando um alvo, ganha 1d3 de pressão.'
      },
      {
        name: 'Aceleração Explosiva',
        description: 'Você consegue mediar bem suas corridas de aceleração e explosão. Sempre que seu time tiver uma defesa bem sucedida (Não precisa ser você defendendo), ganha +5m de deslocamento. Entretanto, esse deslocamento extra só é aplicado dentro do campo do seu time. Se tiver Modificador 5 em Velocidade, pode trocar 45m de deslocamento pelo Nível 1 da Velocidade: Aceleração, assim como pode trocar 90m pelo Nível 1 da Velocidade: Explosão.'
      },
      {
        name: 'Previsão Olfática',
        description: 'Você é capaz de perceber os cheiros dos seus adversários. E através deles, consegue prever jogadas, perceber fraquezas e descobrir oportunidades. Existem 5 tipos de cheiros, cada um aplicado quando o adversário está sob o efeito de alguma situação específica. Quando detectá-los, pode gastar 2 FOL por cheiro para receber sua vantagem: Cheiro de Suor: Quando o adversário está com menos de 50% do seu Fôlego máximo, ele fica com esse cheiro. Contra ele, todos os seus gastos de fôlego de até 15 são anulados. Cheiro de Emoção: Quando o jogador parece eufórico, você reconhece o cheiro da dopamina e adrenalina. Caso ele tenha pelo menos 1 CA, você pode ativar esse cheiro para roubar 1d3 Cargas dele. Cheiro de Raiva: Quando o jogador se encontra furioso, ele transpira mais intensamente e você pode sentir a respiração pesada. A diferença dos testes volta como o valor que você diminui da Fúria dele (Por exemplo, se a diferença foi 4 e ele tinha 6 de Fúria, ela vai para 2). Essa habilidade é capaz de anular a Fúria, desde que gaste toda sua Fúria acumulada. Cheiro de Perigo: Ao enfrentar um oponente que pode ser considerado uma ameaça severa para sua equipe, pode aplicar esse cheiro e alertá-los, concedendo +1d para os defensores (Se a ameaça for NT 40+, aumenta para +2d). Cheiro de Fluxo: Quando um adversário chegar perto de você sob o Fluxo, você pode gastar 11 FOL e escolher uma das suas 8 opções de Focos ou Melhorias para usar contra ele. Se já estava em Fluxo, recebe 1 Foco extra.'
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
        description: 'O Passe "Backspin" é um passe terrestre com rotação inferior, que possui uma rota inconstante pelo chão, o tornando imprevisível. Ele percorre somente 15m, entretanto, pode fazer trajetórias curvas (Como um personagem se locomovendo) e também alterar o destinatário. Você pode usar suas Ações Físicas para mover a bola. Para cada 3 FOL que gastar, adversários tem -1 para interceptar o passe.'
      },
      {
        name: 'Rotação Perfeita',
        description: 'Sempre que o passe realizar uma movimentação, você pode dar um teste de Precisão (DT 25) para que ele se mova +5m. Você pode repetir esse teste por movimentação uma quantidade de vezes igual a 1 + primeiro dígito do seu NT, porém com +2 na DT a cada uso (se falhar em um teste e ele não for o último, não pode rolar os testes restantes naquele movimento). Além disso, a penalidade se inicia em -4, e é reduzida em 1 em cada movimentação, até voltar para -1.'
      },
      {
        name: 'Chute Backspin',
        description: 'Você tem total controle da rotação e movimentação da bola, podendo criar um chute/passe de incrível aerodinâmica e rotação terrestre. O chute irá seguir a mesma mecânica do passe, podendo ir até o gol. O Goleiro terá -2 na DP para cada Defensor que falhou em capturar a bola. Caso erre o chute, pode gastar 10 FOL para alterar a rota mais uma vez, se tornando um passe de fato, que vai até um aliado, que pode chutar automaticamente com o Goleiro Surpreso.'
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
    description: 'A Arma “Imperador do X1” te tornará um verdadeiro mestre das disputas corpo a corpo, com técnicas especializadas para essa área, para que você alcance o nível de um Imperador (do X1).',
    specialization: ['1v1', 'Adrenalina', 'Domínio'],
    levels: [
      {
        name: 'Solo de Adrenalina',
        description: 'Enquanto estiver em uma disputa de 1v1, você recebe +1 Classe em todas as Perícias, +1 Ação Livre e gasto de Fôlego reduzido em 3 (redutível a 0). Sempre que vencer um 1 contra 1, recebe +1 em todas as Perícias até o fim da partida (acumula até 5 + seu NT). Enquanto sustentar com 1 CA todo turno seu, o limite de acúmulo é removido, e recebe +1 Classe. Além disso, durante a Condição “Empolgado”, recebe +1 Ação Livre para usar durante um X1.'
      },
      {
        name: 'Explorador de Brechas',
        description: 'Você aproveita os espaços entre seus adversários e aliados. Primeiro, você irá traçar uma reta de 10 + NT metros, onde a habilidade funcionará. Ao passar por um aliado, você pode dar um teste de Corrida contra a Reação de quem for ultrapassar, e para cada 3 FOL que gastar, ganha +1 (ou o adversário perde 1). Se perder, pode repetir, porém com um teste de Drible. Caso ultrapasse (no primeiro ou no segundo teste) o adversário vai automaticamente para o segundo. Se for um aliado, você utiliza ele como proteção para pular o próximo adversário. Ao final da reta, você define uma ação, que pode ser um chute, passe ou +1 drible. Para cada adversário, recebe +2 nesse teste, e para cada aliado, +1d (o bônus de dados pode ser trocado por -1 no gasto de FOL caso use uma Arma ou Habilidade).'
      },
      {
        name: 'Quebra de Postura',
        description: 'Ao invés de partir para cima do alvo, você espera que ele venha para cima de você, errando o “timing” e te dando vantagem no X1. Você recebe o Movimento “Hold Up” (se já tinha, gasto anulado para essa habilidade). Se o alvo falhar no teste, a diferença do resultado para a DT se torna bônus no seu teste para ultrapassá-lo, e volta em dobro como deslocamento para você até o fim do turno.'
      },
      {
        name: 'Reflexos de Imperador',
        description: 'Durante o X1, seus reflexos se aprimoraram a um ponto que você é capaz de acompanhar todos os movimentos de adversários. Você recebe a Habilidade Exótica “Reflexos”, mas tem opções limitadas de gatilhos, que são: Carrinho; Adversário partir para cima de você; Adversário se posicionar para te impedir, e adversário indo te marcar. Quando acontecer, a Reação pode ser o que você quiser. Caso já possuísse essa Habilidade Exótica, os bônus e penalidades aplicados são dobrados desde que sua Reação seja aplicável a um X1.'
      },
      {
        name: 'Hardcore Mode',
        description: 'Através do seu domínio total nas disputas de 1 contra 1, você pode dificultar propositalmente as situações. Você pode adicionar um bônus de +1 a +10 no teste do adversário, e -1 a -10 de penalidade no seu teste. Se vencer, você soma o valor do bônus e da penalidade, e ganha um bônus baseado no resultado da soma. Se conseguir 5, você recebe +1d em todos os seus testes dali para frente (acumula até +3d). Com 10, você entra em Fluxo (se já estava, receberá 2 Recompensas ao final dele). Com 15, você recebe 1 NT temporário (para cada 4 NT, ganha 1 Treinamento). Por fim, com 20, você entra em um "Sub Despertar", com 5 PD, e limite de Rodadas igual a metade da quantidade de vezes que já utilizou esse efeito (Mínimo: 1). Se conseguir o 20, você pode aumentar ainda mais a dificuldade, tornando o máximo dos valores +/- 20, e necessitando de 40 no total (aumenta em +5 o valor necessário de cada recompensa).'
      }
    ]
  },
  {
    id: 'passes-magicos',
    name: 'Passes Mágicos',
    category: 'Técnico',
    description: 'Os passes mágicos são uma técnica de passe de bola voltada para sua criatividade e talento sobrenatural. Use de toda sua "magia" para tocá-la, criando um show visual e de sensações.',
    specialization: ['Passe', 'Criatividade', 'Magia'],
    levels: [
      {
        name: 'Num Passe de Mágica!',
        description: 'Um passe totalmente mágico, causando um show de magia e luzes. Um passe magnífico como esse, somente pessoas honradas poderiam receber. Você deve descrever perfeitamente a trajetória do passe, as sensações, os efeitos. Quando a bola cair nos pés do alvo, baseada na sua descrição, o alvo pode ganhar um dos 5 benefícios a seguir: +2 em Dominar; +1 dado nos testes; Aumenta em +10m o alcance de suas habilidades; +1 Ação Física e Gasto de FOL reduzido em 5. Gasta 3 FOL.'
      },
      {
        name: 'Cruzamento Ilusório',
        description: 'Um Cruzamento que aparenta não possuir muita lógica, já que existem várias linhas de passe possível, mas isso permite que o passador consiga visualizar a melhor opção possível. Quando um alvo receber esse passe, ele pode utilizar 2 Ações Físicas, e se o passador julgar como ineficaz, pode refazer o passe, cancelando esse turno, e tocando para outro jogador. Aqueles que reagiram a essa ação não podem reagir ao novo turno. Esse efeito pode ser repetido inúmeras vezes, cada uma gastando 8 FOL. Caso o cruzamento seja interceptado, o efeito é cancelado.'
      },
      {
        name: 'Pérola Perfuradora Celeste',
        description: 'Um passe limpo que pode anular a reação de até 2 defensores, com a velocidade e precisão perfeita, sem precisar afetar a velocidade do receptor. O ponto de queda deve ser combinado entre os dois, e se o receptor alcançá-lo, pode chutar diretamente, utilizando do Movimento "Voleio". Se já tinha, o gasto de FOL é anulado, e caso possua alguma arma de chute, qualquer reação é anulada (somente o goleiro mantém a DP, com -6).'
      },
      {
        name: 'Wätcher des Schnees',
        description: 'Sua capacidade de fazer mágica dentro de campo evoca o espírito mais ardente da magia para o campo, trazendo uma explosão de sensações únicas. Ao realizar um passe, você recebe um tipo de "Elixir Mágico". Essa pontuação, quando atingir 5, pode ser trocada pela invocação de uma “Aura" secundária, o "Observador das Neves". Ele possui um total de 3 Feitiços, iniciando no 1, e quando conseguir certas quantidades de EM, pode "comprar" um efeito. Cada Feitiço possui 3 efeitos, que devem ser escolhidos individualmente para serem usados, montando combinações mágicas. Essas habilidades servem para aprimorar e alterar seus passes, ou aplicar efeitos ao receptor do passe: FEITIÇO 1: Hexenbeschwörung Efeito 1 (3 EM): Gastando 1 PA, o Observador das Neves pode se posicionar em algum ponto de você dentro do seu deslocamento. Você pode enviar passes automáticos para ele, esse que poderá realizar outro passe, usando de seus valores. Efeito 2 (2 EM): Para cada PA que gastar, o Observador das Neves aplicará -1 em testes para quem quiser interferir em seus passes. Efeito 3 (1 EM): Você pode gastar 1 PA para que o receptor do passe, sempre que receber um, troque uma perícia com você, mudando classe e propriedades. FEITIÇO 2: Magischer Golem Efeito 1 (4 EM): Sempre que interceptarem um passe seu, você recebe +1d para acumular e usar em outro passe (acumula em até +3d). Efeito 2 (3 EM): Se receber um cruzamento, o receptor do passe recebe metade do alcance do cruzamento como DESL na sua próxima movimentação. Efeito 3 (2 EM): Aquele que receber seu passe, poderá utilizar os poderes do Observador nos próximos 3 turnos dele. FEITIÇO 3: Schnee Ige Essenz Efeito 1 (5 EM): Ao realizar um passe, você pode aplicar a "Aura da Conjuração" nele. Se já tinha, pode girar cada d4 novamente, escolhendo qual resultado manter. Efeito 2 (5 EM): Você recebe +1 Ação Física, somente para passar. Pode gastar 3 PA para receber +1 Ação Livre também. Efeito 3 (4 EM): Sempre que falhar em um teste de Passe, pode gastar 1 PA para girar novamente, com +3 no valor puro.'
      },
      {
        name: 'Ápice de Feitiçaria',
        description: 'Você dominou as técnicas de passe, criando algo que pode ser, com razão, chamado de Magia. Você cria 3 movimentos exclusivos seus, sendo suas "Magias". Eles não seguem a lógica normal, podendo utilizar até duas das palavras chave abaixo para montar seu efeito: Ilusório: O passe realiza algo inesperado. Mímico: Ele replica propriedades de outra ação. Sobrenatural: Ele faz algo nunca visto antes. Sensacional: Ele causa sentimentos especiais em quem vê. Inspirador: O passe, além de eficiente para si, também pode aprimorar aliados, seja os que vislumbram ou o receptor dele. Os gastos serão 1, 2 ou 3 de EM, respectivamente para cada Magia. O limite é a criatividade do usuário com o que lhe foi dado de material, com a aprovação do Mestre.'
      }
    ]
  },
  {
    id: 'passes-travessos',
    name: 'Passes Travessos',
    category: 'Técnico',
    description: 'Uma arma de passes sem muitas limitações, onde a verdadeira magia é sua imprevisibilidade e mutabilidade, correspondendo às vontades do usuário de fazer o que bem entender quando quiser.',
    specialization: ['Passe', 'Imprevisibilidade', 'Flexibilidade'],
    levels: [
      {
        name: 'Passes Pervertidos',
        description: 'Você tem passes anormais, não se importando com a lógica. Os passes são tão maliciosos, que você é capaz de dar falsas esperanças para alguém achando que irá receber a bola, e no último momento, alterar a curva. Você pode enviar um passe sem um alvo definido, e estipular uma DT. Aqueles próximos da queda da bola que forem dignos (Ou seja, que passarem na sua DT estipulada do teste de Domínio) podem pegar a bola (somente o que tirar o maior resultado). Ele receberá um bônus naquele turno equivalente a DT que você estipulou (O primeiro número será a quantidade de dados extras, e o segundo o bônus nos testes).'
      },
      {
        name: 'Passes Perseguidores',
        description: 'Em reação ao turno de um aliado seu, você pode gastar 8 FOL para ativar essa habilidade. A bola acompanhará os movimentos dele durante o turno, e quando ele terminar seu turno, a bola cairá em seus pés (Passe DT 27).'
      },
      {
        name: 'Passes Maestros',
        description: 'Quando executar um passe com pelo menos 17 no puro, você pode gastar 6 FOL para ativar suas “Ações Maestras”. Você pode decidir características do passe, como curvatura, trajetória, se ela passa no pé de alguém e ele toca de volta (Se for NPC e que faça sentido). As Ações Maestras não podem ser interrompidas, e você pode trocá-las por -1 nos gastos das outras habilidades. Você tem 3 Ações Maestras.'
      },
      {
        name: 'Bola Perfeita',
        description: 'A bola cai perfeitamente nos pés de seu aliado. Tão perfeitamente, que inúmeras possibilidades de movimentações, chutes e dribles se abrem. Ao passar e tirar 16 no teste puro, pode gastar 10 FOL para que o receptor tenha +1 Ação Física. Para cada 2 no valor puro a mais, +1 Ação.'
      },
      {
        name: 'Voilà Mon Football!',
        description: 'Quando atingir uma sequência de três passes seguidos bem sucedidos, entra em Fluxo, e se mantém até que erre um passe ou deixe de realizar um em algum turno. Se os três primeiros passes forem para a mesma pessoa, você entre em Sinergia com ela enquanto realizar pelo menos 2 passes a cada 5.'
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
        description: 'Você é capaz de replicar diversos movimentos que usam as pernas com seu cabeceio, como passes e até mesmo chutes. Para os seguintes Movimentos, você pode considerar o teste necessário para realizar ou obter como Cabeceio: Espada Parafuso (Chute), Tiro de Colisão (Chute), Passe de Primeira (Passe), Passe Genial (Passe), Passe “Arco do Céu” (Passe) e Passe Opressivo (Passe).'
      },
      {
        name: 'Oclusão Cabeceada',
        description: 'Quando cabecear uma bola, e até 3 defensores estiverem perto de você, pode gastar 4 FOL para passar a bola no ponto cego deles, os deixando sem reação (Meta Visão anula).'
      },
      {
        name: 'O Cabeça (Figuradamente)',
        description: 'Sempre que estiver em uma disputa de bola aérea com alguém, para cada 1 FOL que você gastar, o adversário tem -1 no teste que usar para receber a bola. Para cada -20 de penalidade aplicada que você acumular, recebe +2 Classes em testes de Cabeceio (se já tinha Classe X, ganha +2d). Não pode ser usado para gols.'
      },
      {
        name: 'O Cabeça (Literalmente)',
        description: 'Uma vez na partida, você pode gastar 12 FOL e dar um teste de Cabeceio. Nas rodadas seguintes, você pode gastar 3 FOL para tornar o resultado daquele teste a DT que os adversários precisam bater em testes que normalmente seriam contra seus testes de Cabeceio.'
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
        description: 'O Tiro Direto é um poderoso voleio ao gol. Para cada 2 NT de diferença entre você e um Defensor que tentar impedir um chute, ele recebe -1 (caso seja de NT inferior ao seu) ou você recebe +1 (caso tenha NT inferior ao dele). Além disso, você pode aumentar o alcance em troca de reduzir seu bônus (para cada 2m que aumentar, tem -1), e pode fazer o contrário também (para cada 2m que reduzir, ganha +1). Essa expansão de alcance é limitada a seu NT + 5 metros.'
      },
      {
        name: 'Chute de Calcanhar',
        description: 'O Chute de Calcanhar é uma versão de costas do Chute Direto, onde você se aproveita das brechas na defesa para disparar um chute, surpreendendo a todos. Para usá-lo, você deve estar a até 20m do gol, e receber o passe. Se o passador tirar 25+, você ganha +2 em Chute. Depois, gastando 5 FOL, você pode deixar até 1d4 jogadores “Surpresos”, e para cada jogador, ganha +1 em Chute. Por último, se estiver em 15m do gol, ganha +2.'
      },
      {
        name: 'Chute Direto de Duas Etapas',
        description: 'Quando for chutar com e falhar, você pode gastar 14 FOL para refazer os testes, podendo mudar as habilidades que usou, descrição, tudo. Você realiza um leve toque para seu outro pé, e faz um disparo rápido. Você pode anular uma habilidade que o goleiro usou na defesa. Se ele não usou nenhuma, anula o teste. Se ele não usou teste, anula a DP.'
      },
      {
        name: 'Voleio de Duas Armas',
        description: 'Um poderoso voleio falso, onde você finge que vai chutar com uma perna, e passa ela por cima, enganando a todos e disparando um tiro com a outra perna. Essa habilidade faz o goleiro errar a cronometragem do seu chute, anulando o teste dele ou habilidades, sendo dependente de sua DP. Se chutar com a sua perna boa, você recebe +2 Classes no teste, e os adversários -2 Classes para reagir. Se chutar com a sua perna ruim, você aplica as penalidades de Perna Ruim, mas se marcar o gol, anula elas até o fim da partida. Se no teste de Chute você tirar um 20 puro, recebe o Nível 1 da Ambidestria até o fim da partida, e também anula permanentemente uma das penalidades da Perna Ruim.'
      },
      {
        name: 'Voleio do Rei Demônio',
        description: 'O ultimato do Chute Direto. Um imponente disparo direto para o gol, marcando mostrando a força de um “Rei Demônio”, destruindo os sonhos dos 21 jogadores em campo. O Voleio do Rei Demônio é uma bola veloz que persegue o gol em uma velocidade quase impossível de ser detectada, além de ser imprevisível pela sua Ambidestria adaptada. Você pode gastar 10 FOL para receber o primeiro nível do “Chute Todo Poderoso” do Chute Direto. Se marcar um gol, seu próximo Voleio do Rei Demônio pode aplicar o segundo, e no terceiro gol, pode usar o Terceiro Nível. Se já tinha, você pode trocar pelos níveis 1, 2 e 3 de uma das seguintes armas: Kaiser Impact, Chute Explosivo ou Perfeição.'
      }
    ]
  },
  {
    id: 'chute-explosivo',
    name: 'Chute Explosivo',
    category: 'Ofensivo',
    description: 'O Chute Explosivo é uma técnica de chute que foca totalmente na potência e na "empolgação" do disparo. Quanto mais animado e energizado o usuário estiver, mais poderoso seu chute será. Além disso, ele se aproveita dos instintos mais exóticos que você pode ter, permitindo que sua conexão com o gol seja tão grande, que nem mesmo olhar será necessário.',
    specialization: ['Chute', 'Instinto', 'Vibração Celular'],
    levels: [
      {
        name: 'Ímpeto Explosivo',
        description: 'Você possui um instinto de explosão que guia seu jeito de jogar. Dentro da grande área adversária, você não precisa olhar para a bola ou para o gol, pois você sente eles. Seus chutes são realizados de forma automática. Você não precisa dominar, escapar de marcadores ou se posicionar, podendo chutar instantaneamente de qualquer ângulo, direção ou posição. Porém, o teste ainda deve ser feito, e o goleiro deve pular direto para o teste de Defesa. Para cada “complicação” que seu chute for submetido (1 marcador, passe complicado, posição desfavorável, condições negativas, etc.), suas células vibram mais intensamente, pedindo por uma descarga de dopamina. Essas complicações aumentam sua “Vibração Celular” em 1, e o valor final dessa estatística pode ser distribuído entre bônus para o seu teste, e penalidade para o teste do goleiro. No NT 20, você passa a aumentar em 2 a Vibração Celular por complicação, e durante o Fluxo, você aumenta em 1 todo turno para usar na hora do chute.'
      },
      {
        name: 'Chute Giratório Reverso',
        description: 'Seguindo o efeito do Ímpeto Explosivo, você é capaz de realizar um incrível chute de costas com a palma do pé, usando de toda sua explosão para criar um impacto tão grande que deixa todos de boca aberta. Primeiro, o alcance do teste de Chute é reduzido pela metade, mas você anula penalidades por marcação, o Goleiro tem -1d8 na DP e caso acerte, você fica sob a Condição "Empolgado" (Nas vezes seguintes, ganha +1 CA). 10 FOL.'
      },
      {
        name: 'Dragon Drive',
        description: 'Enquanto a bola paira sob o campo, surpreendendo a todos, um dragão aparece, devorando qualquer esperança que um dia seus adversários já tiveram. Você recebe o "Drive Shot", e, em até 60m do gol, se conseguir interceptar um passe, você pode realizar um chute logo de cara, com a perícia "Chute" independente da distância, sem penalidades. Você pode gastar 1 CA para que todos tenham -1d em testes para reagir, 2 CA para aumentar para -2d, 3 CA para anular habilidades de reação automática, 4 CA para ativar "Ka-ka-kabooommm" e 5 CA para ativar "Cacete Acho que eu vou..." caso marque o gol. Se estiver dentro da grande área, pode utilizar todos os efeitos sem gastar CA.'
      },
      {
        name: 'Dragon Drive: Heading',
        description: 'Com esse Nível, você faz a mesma coisa que o anterior, porém com o cabeceio. No lugar do teste de Interceptação, você gira Cabeceio, e o resultado pode ser mantido para o disparo. Além disso, a ativação dos efeitos extras é baseada no seu modificador de Físico (Se era 4 CA, agora é necessário 4 no Mod. FÍS), porém o gasto se torna 30 FOL e "Ímpeto Explosivo" não pode ser aplicado.'
      },
      {
        name: 'Big Bang Drive',
        description: 'O seu chute mais poderoso. Uma perfeição em níveis explosivos que ninguém jamais poderá alcançar. Com a trajetória da bola, sem reação, todos somente pensarão como um ser humano consegue realizar algo desse nível. O Big Bang Drive é um chute que pode ser feito até, no máximo, o meio de campo. Com 25 FOL, Você aplica o Ímpeto Explosivo, e para cada alvo que seu chute ultrapassar, o goleiro recebe -2 na DP e no bônus de Defesa. Gastando 10 de Vibração Celular, você pode aplicar os efeitos de “Dragon Drive”, e gastando +5 de Vibração Celular, anula qualquer Sucesso Automático direcionado a impedir seu chute ou sua Ação. Se marcar o gol, você entra em Fluxo. Se já estava em Fluxo, tem um Despertar. Caso marque, também passa a poder somar Vibração Celular em qualquer teste que realizar.'
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
        description: 'Você consegue medir a distância exata entre você e um adversário usando de seu corpo, neutralizando os movimentos e permitindo roubar ou dominar a bola mais facilmente. Com 5 de Fôlego, você aplica +4 no seu teste de Domínio/Roubo e -4 no teste de Domínio/Roubo adversário. Com 10 FOL, você restringe o alcance do teste de Roubo de um adversário em -15m e o do seu roubo para +15m naquele turno. Por fim, com 15 FOL, você anula qualquer Sucesso Automático do oponente na hora do roubo ou domínio, o forçando a girar testes, contanto que gaste duas Ações Físicas/Todas as suas de Reação para isso (Sem contar com a que gastaria normalmente para realizar o roubo/domínio).'
      },
      {
        name: 'Ave Caçadora',
        description: 'Você pode gastar 8 FOL para se mover instantaneamente até bolas que passem por 20m de você. Gastando +5 FOL, aumenta para 30m. Além disso, os gastos de "Controle Espacial" são reduzidos em 1 caso você se mova até elas utilizando esse Nível.'
      },
      {
        name: 'Rede de Controle',
        description: 'Você determina uma faixa horizontal no campo que tem 4 metros de largura, dentro dessa área você recebe +2 Classes em Roubo e Domínio e os gastos das últimas habilidades são reduzidas em 1. Caso a bola entre nessa faixa, você se torna capaz de ver tudo que passa por ela, mesmo que esteja furtivo.'
      },
      {
        name: 'Olhos da Caça',
        description: 'A largura da "Rede de Controle" aumenta para 8 metros e você pode gastar um turno inteiro para marcar uma pessoa que esteja dentro de sua faixa horizontal. Quando marcada, a área que era somente 6 metros se expande a partir da faixa até o seu gol somente para a pessoa que você marcou. Então da sua faixa para trás você ganha todos os bônus dela. Gastando 20 de FOL, você pode marcar até 2 pessoas.'
      },
      {
        name: 'Controlador Supremo',
        description: 'A largura da "Rede de Controle" aumenta para 12 metros, o bônus se torna +3 Classes, caso já tenha Classe VIII/IX/X você ganha 1/2/3 dados bônus no teste. Agora o Nível 2 não tem limite de alcance e você pode aparecer em qualquer lugar da do campo exceto pela grande área inimiga.'
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
        description: 'Seus membros são flexíveis e capazes de realizar qualquer movimento, independente da dificuldade. Você pode anular até -1 de qualquer penalidade que afete sua DP ou teste de Defesa. A cada 5 NT, essa redução aumenta em -2, e para cada 1 defesa bem sucedida, aumenta em -1 até o fim da partida.'
      },
      {
        name: 'Reação Explosiva',
        description: 'Seu tempo de reação é quase incomparável, sendo capaz de reagir a movimentos de extrema velocidade. Seus testes de Defesa não podem ser anulados por nenhuma habilidade. Recebe a Habilidade Exótica “Reflexos”.'
      },
      {
        name: 'Super Reflexo',
        description: 'Recebe a Perícia Especial "Reflexos". Você consegue acompanhar o movimento da bola e pular exatamente no local onde ela deve cair. Você é imune a efeitos de enganação (Passe "Arco do Céu", Fintas, etc.), e para uma dessas enganações realizadas, recebe +1 no teste de Defesa. Além disso, gastando 5 FOL, você pode dar um teste de Reflexos (DT 30) para impedir um pênalti, limite de duas vezes por partida.'
      },
      {
        name: 'Ultra Reflexo',
        description: 'Sua velocidade de Reação se torna ainda mais impressionante, com um reflexo impressionante. Quando falhar em uma Defesa, pode gastar 20 FOL para girar um teste de Reflexos, que irá substituir o teste de Defesa. Se passar, a metade da soma do resultado dos testes se tornará bônus na sua DP para o próximo ataque.'
      },
      {
        name: 'Garra Defletora',
        description: 'Você utiliza de todo seu Reflexo e poder de salto para impedir um chute, independentemente de sua força ou potência, defendendo com acerto garantido que sobrepõe os outros. A bola será defletida uma quantidade de metros igual ao resultado do teste de Chute ou Precisão adversário (Limite: 30m), caindo nos pés de alguém a sua escolha. Se o alvo tinha Sucesso Automático, você não pode escolher o alvo. Você tem 1 uso, e ganha +1 no NT 50.'
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
        description: 'Você tem uma movimentação rápida e afiada,capaz de confundir os adversários. Utilizando de suas curvas pelo campo, você pode dar testes da Perícia “Drible” mesmo que não esteja com a bola. Se realizar um Drible bem sucedido, o seu aliado que está com a bola tem +1d para passar para você.'
      },
      {
        name: 'Hotline',
        description: 'Você é especialista em "tabelas" (movimento onde você passa para um aliado e ele passa para você de volta), sendo capaz de realizar com maestria esse movimento em conjunto com qualquer outro aliado. Ao gastar 8 FOL, você ativa esse feito durante uma, e o primeiro a realizar um passe tem +2 no teste, que passa adiante para o outro. Em sequência, caso o outro jogador (agora com a bola) adicione bônus no seu teste de Passe, esse bônus permanecerá para o próximo (ou seja, ele tinha +2, se somar 4 de VEL, terá +6, bônus que se manterá), Esse aumento e bate volta de bônus se mantém até o fim da tabela. Além disso, o bônus em Interceptação para impedí-los (veja Capítulo 6: Partidas) é anulado. Caso estejam em Sinergia, o bônus base se torna +4, e os que quiserem interceptar tem uma penalidade igual a sua quantidade de Classes em Passe.'
      },
      {
        name: 'Rotação Espacial',
        description: 'Você recebe +1 Classe em Drible quando for executá-lo sem a bola (seguindo o efeito de “Dominação Suprema), e, durante uma tabela de “Hotline”, você recebe um dos “Bônus Padrão” de Sinergia (se já estavam, recebem um Módulo extra). Além disso, o gasto de “Hotline” é reduzido para 4 FOL, a penalidade de Interceptação é dobrada, e metade do bônus que acumularam ao fim da tabela fica permanentemente para testes utilizados em conjunto (Como Passe e Domínio) entre vocês.'
      },
      {
        name: 'Sinergia Orbitária',
        description: 'Agora, o seu aliado que está na “Hotline” com você recebe todos os Bônus Padrão de Sinergia, e se já estavam, recebem acesso a +1 Módulo, se tornando equilibrados entre Defesa, Controle e Ataque. Além disso, seus passes durante a Hotline não podem ser mais interceptados. Por fim, aliados em Sinergia com você também podem utilizar a “Dominação Suprema”.'
      },
      {
        name: 'Órbita Planetária',
        description: 'Você é capaz de orbitar ao redor de um aliado, sincronizando a movimentação de vocês pelo campo todo, como um planeta e seu satélite pelo vasto espaço. Gastando 10 FOL inicial e 1 FOL para sustentar, você pode se manter em qualquer ponto de até 30m de algum aliado que já utilizou a “Hotline” com você naquela partida. Com isso, você não precisa mais gastar Ações para se deslocar, se movendo a mesma quantidade de metros que ele, porém sempre em uma distância de até 30m em qualquer direção. Para cada 10m acima de 30m de Deslocamento que ele possuir, o gasto de sustentação aumenta em 1, Se ambos gastarem 1 CA, vocês podem inverter a Órbita, e agora, ele que irá orbitar você, gastando o FOL e seguindo as limitações. Caso não estejam em Sinergia, entram automaticamente, pulando a etapa inicial dos sucessos.'
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
        description: 'Através de sua força bruta e movimentos erráticos, você desenvolveu uma poderosa técnica de drible. Para cada 2 Pontos de Físico que gastar para realizar o drible (essa arma permite que Físico seja usado nessa perícia), você ganha +1d4 de bônus..'
      },
      {
        name: 'Movimentação Errática',
        description: 'Quando driblar alguém com "Agressividade", você pode gastar 10 FOL para ganhar +2 Ações Físicas, porém com algumas restrições. Uma delas tem que ser usada para se movimentar, e a outra para driblar. Se conseguir executar esse drible, o ciclo se repete, até que você erre um drible ou fique sem FOL.'
      },
      {
        name: 'Confusão',
        description: 'Seus movimentos são completamente imprevisíveis. Para cada drible feito, o próximo adversário a ser driblado tem -1 (acumula até -4, quando chegar nesse valor, o próximo reseta).'
      },
      {
        name: 'Explosão de Marselha',
        description: 'Você recebe o Movimento "Virada de Marselha" (se já tinha, o gasto é reduzido em 2), porém com um extra. O deslocamento aumenta para 20m, e a cada 3 usos, você recebe uma Carga de Adrenalina.'
      },
      {
        name: 'Dribles Esmagadores',
        description: 'Sempre que devorar alguém, você terá três sucessos automáticos para driblar essa pessoa. Um jogador só pode ser afetado uma vez por isso, e o seu sucesso irá sobrepor qualquer outro que ele possa ter.'
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
        description: 'A base do funcionamento dos Dribles Dançantes são os movimentos "envolventes", que dão a impressão que todos os afetados estão dançando. Essa forma de se movimentar desestabiliza os oponentes, fazendo com que eles caiam derrotados no chão. Ao vencer um adversário com um Drible, você pode gastar 4 FOL para derrubá-lo, ultrapassando ele e anulando sua reação contra o próximo turno de um aliado seu (além do seu). Os derrubados também devem gastar uma Ação Física para levantar. Adversários de NT superior não são afetados, e adversários de NT igual podem dar um teste de Fortitude (DT 19) para somente perderem o equilíbrio e terem -4 nas reações. A habilidade não pode ser usada com o goleiro.'
      },
      {
        name: 'Gingado',
        description: 'Sempre que realizar um Drible bem sucedido, você recebe 1 de "Ritmo". Ritmo funciona como uma sequência, aumentando em 1 a cada Drible bem sucedido consecutivo. Se deixar de fazer um Drible no seu turno ou falhar em um, perde o Ritmo (pode gastar 1 CA para mantê-lo). Ritmo serve como um Atributo especial que pode ser somado em testes de Drible, cujo Modificador é 1 + Primeiro número do seu NT (NT 20 = 1 + 2 = 3). Sempre que realizar um Drible, se move 4m automaticamente para cada 4 de Ritmo que possuir. A DT do teste de Fortitude se torna 24, e o goleiro pode ser alvo da "Dança dos Perdedores".'
      },
      {
        name: 'Baile em Sintonia',
        description: 'Até mesmo aqueles que não foram driblados por você são capazes de sentir a presença do baile que você conduz com seus movimentos. Quando realizar um Drible onde a "Dança dos Perdedores" é aplicada, adversários em até 10m são "envolvidos" na dança, ficando desnorteados. Habilidades são anuladas caso queiram reagir e perdem 1 Ação Física. Caso você os drible e tire um 20 puro, aumenta para 2. Esse efeito se mantém enquanto você estiver com a posse da bola, mas pode ser anulado com um teste de Determinação (DT 20 + 1 para cada 5 que tirou no seu teste de Drible principal. A DT do teste de Fortitude da "Dança dos Perdedores" torna-se 26, a penalidade -6 e o deslocamento base de "Gingado" 5m.'
      },
      {
        name: 'Dança Ascendente',
        description: 'Sua mistura de ritmo com drible tornou-se um triunfo inigualável. Um molejo que ninguém jamais alcançará, tornando-o único. A DT de Fortitude da "Dança dos Perdedores" torna-se 30 com penalidade de -8, o Deslocamento base do "Gingado" 6m. Além disso, o Ritmo pode ser usado para substituir o valor puro, somando-o ao seu bônus e alcançando o resultado (essa ação não reduz o seu Ritmo). Não aplica o efeito do 20 puro, e para cada 1 que conseguir acima de 20, recebe +1 Classe em Drible no seu próximo teste dessa perícia. Além disso, quando falhar em um Drible contra um alvo, pode gastar 1 CA para mudar a rota, cancelando o duelo e partindo para cima de outro alvo em até 8m.'
      },
      {
        name: 'Borboleta da Morte',
        description: 'Cada drible é um passo de dança lado a lado com a morte, ceifando as esperanças dos adversários com seus dribles cruéis, porém envolventes. A “Dança dos Perdedores” agora pode ser usada contra adversários de NT maior, porém com a penalidade reduzida pela metade. Gastando +6 FOL, outro efeito é aplicado, além da queda. Contra NPCs de NT inferior, enquanto não passarem em um teste de Determinação (DT 30), não poderão jogar (a cada 3 testes, a DT reduz em 1). Contra NPCs de NT igual, a DT torna-se 27 e de NT superior, 24. Contra jogadores de NT inferior, você pode escolher 2 perícias para derrotá-lo automaticamente sempre que se encontrarem. Caso o NT seja igual, somente uma perícia, e se for maior, não funciona. Esse efeito não pode ser usado contra o goleiro, e é anulado caso o adversário impeça um drible seu, escolhendo uma perícia que você escolheu para remover o efeito. Aumenta o alcance da "troca de duelo" da "Dança Ascendente" para 12m.'
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
        description: 'Seu controle da bola com os pés, velocidade e criatividade são 3 fatores que tornam sua técnica de drible extremamente eficaz e precisa. Você pode trocar qualquer teste de Domínio por Drible, e adversários que tentarem roubar a bola de você tem -1d no teste caso você use Drible contra eles. Além disso, quando fosse perder a bola, pode gastar 5 VEL para “forçar o teste”, podendo girar Drible novamente com +1d, ou Domínio com +2. Você recebe o Movimento “Elástico”.'
      },
      {
        name: 'Dribles Dominantes',
        description: 'Você recebe todas as versões alternativas do movimento “Elástico” (No Ar e Invertido), independentemente de cumprir os requisitos ou não. Além disso, quando realizar um drible, ganha +1 em Domínio, e quando realizar um domínio, ganha +1 em Drible (o limite do bônus em Domínio são as Classes em Drible, e o limite em Drible são as Classes de Domínio). Além disso, você pode utilizar o Domínio para auxiliar seus dribles de duas formas. A primeira, utilizando o teste de Domínio com Ação Livre, para cada 10 que tirar, recebe +1d no teste para driblar. Já o segundo efeito, você pode utilizar Domínio como uma Finta, aplicando as mesmas propriedades, só trocando o teste necessário. Por fim, a última capacidade que essa habilidade te concede, você pode, ao receber um passe, utilizar o resultado do teste de Domínio para driblar um adversário em até 6m.'
      },
      {
        name: 'Fusão de Dribles',
        description: 'Você tem controle sobre os movimentos que realiza, seja nos aspectos de coordenação, criatividade ou velocidade, você já dominou todos. Gastando 15 FOL, você pode “fundir” dois dribles, para executá-los com uma única ação (por exemplo, utilizar um Elástico com uma caneta). Essa combinação deve ser possível e criativa. Se a Fusão possuir algum Elástico junto, o valor necessário para Sucesso Automático se torna 18, e você pode gastar +5 FOL para usar 1 CA e reduzir para 17. Pode dividir o gasto entre Fôlego e Velocidade desde que tenha pelo menos 3 no Modificador.'
      },
      {
        name: 'Movimentos Flexíveis',
        description: 'Sua elasticidade te permite realizar combinações extremamente criativas de dribles, criando algo quase que do zero, sem nunca perder a posse de bola. Agora, você pode realizar “Fusões” com até 3 Dribles, e cada Elástico aplicado na Fusão reduz em 1 o valor puro necessário (anulando o efeito anterior, em troca do aumento), e quando for realizar um teste de Domínio, pode gastar 7 FOL para poder girar o teste uma vez para cada 2 Fusões que realizou até aquele momento. O gasto se torna 25 FOL com 3 Movimentos.'
      },
      {
        name: 'Gênio dos Dribles',
        description: 'Você controla perfeitamente todos os seus movimentos corporais, e sua flexibilidade te permite ter um domínio sobrenatural sobre a bola driblando constantemente. Você recebe +2 Movimentos de Drible, qualquer Sucesso Automático contra seu Drible ou Domínio é anulado, sendo um fator determinante o maior resultado entre os testes ou um Sucesso Automático seu, e todo bônus que ganhar em uma dessas perícias, você também recebe na outra. Para cada turno que terminar sem perder a posse de bola, você recebe +1 em Drible, e para cada rodada sem perder a bola, você recebe +2. Pode trocar +20 por 1d3 Níveis de uma outra Arma de Drible a sua escolha até o fim da partida. Se conseguir +20 novamente, gira +1d3 para pegar os Níveis restantes. Se Despertar, você recebe metade dos Níveis que conseguiu acumular permanentemente (arredonda para cima). Além de Armas de Drible, você também pode trocar pelo efeito inverso. Para cada turno que realizou pelo menos 2 Dribles, ganha +1, cada rodada que realizou pelo menos 4, +2. +20 você pode trocar por 1d3 Níveis de Domínio de Bola ou Jujutsu.'
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
        description: 'Você é capaz de calcular perfeitamente os eixos e movimentos do adversário com precisão, lendo ele em todos os seus aspectos para derrotá-los. Você é capaz de transformar o resultado dos adversários ou penalidades aplicadas a você e a DP do goleiro em uma raíz quadrada, seja ela exata ou não. Pode ser usada com: Valores puros de testes, penalidades, DT de testes ou a DP. Quando você visualizar uma “Raíz Quadrada” no resultado de algum dos valores citados acima, pode gastar 3 FOL para aplicar a habilidade se souber o valor da Raíz Quadrada, aplicando o valor que achou como uma penalidade ou um bônus. Por exemplo, se o seu adversário tirou 16 no valor final, você pode gastar 3 FOL caso saiba que a Raíz Quadrada de 16 é 4. Esse 4 pode voltar como penalidade para o resultado dele, que torna-se 12. Também pode ser usado como bônus, para você ou seus aliados (nesse caso, o resultado tornaria-se 20). O efeito é o mesmo para penalidades e DP’s, gastando uma Ação Livre ou de Reação. Essa habilidade pode ser aplicada em valores fixos de certas habilidades (como a "DT da Zaga" do Arquétipo Muralha). A Raíz não precisa ser exata, podendo ser quebrada. Por exemplo, 8 = 2√2. Nesse caso, você multiplica os valores de dentro e fora da raíz (utilizando do exemplo de 8, 2 X 2 seria igual a 4, ou seja, o valor usado para a habilidade é 4). Não funciona com raízes como 2, que não pode ser dividida dessa forma, mas ainda é “não exata”.'
      },
      {
        name: 'Balanceamento Majestoso',
        description: 'Cada passo seu, por mais simples que pareça, tem um enorme cálculo por trás. Uma precisão digna de palmas por tamanha majestosidade. Ao ativar o efeito com 11 FOL, você receberá uma equação que se iniciará em "0 = 0", e conforme o tempo passa, irá adicionar valores para manter o "x" em zero. No turno de ativação, você irá girar 1d20 para decidir o primeiro número. Você pode escolher um número igual ao que caiu, ou um maior no limite de 20. Por exemplo, se tirou 2, pode escolher de 2 para cima. Supondo que escolha 8, de início, a equação será 8x = 0. Dali para frente, no início de todo turno, você irá girar uma quantidade de d20 igual à metade do seu modificador de INT, e os valores podem ser adicionados em qualquer um dos lados, sempre positivos. Você pode movimentar os números para ajustar seus sinais, dividir ou multiplicar. Você só pode multiplicar um número por um x já existente caso ele esteja sozinho, sem nenhum outro número acompanhando (como 8x, 4x, 2x, necessário que seja somente "x"). Quando o valor de x for igual a 0, você receberá +10 em três perícias físicas à sua escolha (exceto Defesa, Chute e Precisão, que podem receber +1d), +8m de Deslocamento, +4 FOL, +2 PA e +1 CA máximo, além de +1 Ação Livre ou Mental. Os únicos requisitos são: O zero deve ser exato, e só pode haver um “x” por vez. A habilidade dura uma quantidade de rodadas igual à metade do seu Modificador de INT, e depois, precisa recomeçar para manter o efeito (durante o uso, os bônus ficam desativados).'
      },
      {
        name: 'Paradigma do Primoroso',
        description: 'Você possui controle sobre o ritmo do jogo, ditando a forma como ele anda através de sua visão genial e técnicas refinadas de futebol. No seu turno, você pode gastar 5 FOL, 4 INT e uma Ação Física para iniciar o efeito. Rodadas em andamento são encerradas, dando início a uma nova Rodada. Você deve escolher um número de 1 a 5 para você, e depois, no próximo turno, um número de 1 a 5 para o próximo jogador, e assim se seguirá, para todos os próximos jogadores que ainda não tiveram número definido, mas que irão jogar. Essa habilidade fica ativa por 3 Rodadas, sendo a primeira, a Rodada “a”, a segunda a Rodada “b” e a última, a Rodada “c”. Ao fim de cada Rodada, você irá somar o número de cada jogador, chegando ao resultado final. Após conseguir todos os 3 resultados, você irá aplicar a seguinte fórmula: -b ± √(b² - 4ac) / 2a (Fórmula de Bhaskara). Você irá subtrair os dois resultados, e o valor (positivo ou negativo), será a quantidade de vezes que você pode: Pular um turno; aumentar um turno de uma Rodada; reduzir um turno de uma Rodada; Pular uma Rodada e adicionar 1 turno ao fim de uma Rodada. Se o valor da Raíz der um número decimal (raiz de 2), arredonda para baixo. 1 + vezes que despertou usos.'
      },
      {
        name: 'Eixo de Simetria',
        description: 'Sua visão do campo se torna absoluta. Você enxerga os jogadores, os eventos, suas decisões e até os seus próximos passos. O campo se tornou um gráfico, e você é capaz de medir os pontos, retas, coeficientes, tudo, controlando seus eixos. Ao ativar (sem gasto inicial), o campo todo, para você, irá girar em torno do "Eixo X" e do "Eixo Y". Assim como em uma função de segundo grau, o Eixo X representa a "continuidade horizontal", enquanto o Eixo Y representa a "altura vertical". Jogadores correndo, bolas terrestres, personagens posicionados, tudo isso passa pelo Eixo X. Já bolas altas como passes, arremessos, jogadores saltando, tudo isso passa pelo Eixo Y. Todos os jogadores iniciam em "0", que é um ponto neutro, e a cada 10 metros que se moverem, avançam 1 no Eixo X. Então, por exemplo, caso se movam 30 metros, irão de 0 para 3 no Eixo X. Uma bola alta segue a mesma lógica, porém usando como parâmetro a quantidade de metros que foi deslocada. Jogadores podem saltar um valor no Eixo Y igual à metade do valor que se encontram no Eixo X (se é 4, podem ir até 2). Caso use a Regra Opcional de Altura, para cada categoria acima de 1,71, aumenta em 1 esse valor. Agora que já entendeu o posicionamento, deve saber como usar a habilidade. Gastando 3 FOL, você pode marcar algo dentro do campo como um ponto. Esse "algo" pode ser um jogador, o árbitro ou a bola. Quando marcar um ponto no Eixo X e outro no Eixo Y, você pode conectá-los para criar uma "Reta". Quando algum alvo passar no ponto da Reta do Eixo X, você pode gastar 5 FOL e se mover até lá instantaneamente. Além disso, no Ponto do Eixo Y, você recebe +2d para interação com qualquer coisa. Além disso, você também pode "premeditar" um evento possível, prevendo em qual ponto de qual Eixo ele irá acontecer. Se acertar, você pode se mover até lá e anular esse evento (1 uso, caso esteja em Fluxo, ganha +1, e se despertar, ganha +1). Por último, a sua própria movimentação se torna baseado nos Pontos do Eixo X, e suas interações aéreas baseadas no Eixo Y. Ao invés de se mover 20m, você se move 2 no Eixo X, podendo ir até o local onde esteja outro jogador nesse mesmo ponto, ou em um local aproximado de alguém com um valor similar (esse efeito não se aplica com a posse da bola). O valor máximo dos Eixos inicialmente é 5, não se acumulando mais que isso. Para aumentar, você deve gastar uma quantidade de FOL igual o valor desejado. Por exemplo, se quer aumentar para 6, deve gastar 6 FOL. Para 12, 12 FOL, e por aí vai.'
      },
      {
        name: 'Perfeição Áurea',
        description: 'Você atingiu um nível de genialidade totalmente absurdo. Um fenômeno humano da natureza, capaz de se conectar perfeitamente com o "Número de Deus", graças a seu dom digno de ser chamado de divino. Sua visualização do jogo é tão perfeita, que você é capaz de enxergar a "Proporção Áurea" em tudo dentro do campo, tornando seu estilo de jogo majestoso ainda mais perfeito. Quando despertar e tirar um resultado 1, você pode gastar 1 PA para registrá-lo. A partir de seu próximo turno, você pode girar 3 dados de 10, para definir três valores depois da vírgula desse 1. Supondo que tire 2, 4 e 3, o valor ficará 1,243. Nos turnos seguintes, você pode gastar 1 PA para girar 3d10, e decidir quais números irá somar ou subtrair dos números já existentes, com intuito de atingir 1,618 (Caso tire 10, pode escolher o número que quiser). Quando conseguir esse valor, você pode gastar 3 PA para "enxergar" a Proporção Áurea nas coisas, como nas regiões da quadra, nos jogadores, na bola, em tudo. Ao interagir com aquilo, você consegue atingir a perfeição humana nas ações que um ser vivo conseguiria enxergar. Você replicará o valor mais alto que conseguiu atingir naquela partida, e isso definirá seus resultados. Na primeira vitória com a Proporção Áurea, todos os seus atributos se igualam com o maior deles. Na terceira, o mesmo, porém com as Perícias e suas Classes. Por fim, na última, com 5 vitórias, todas as suas Armas ou Habilidades Gerais igualam seu nível com a que tem o Nível mais alto. Quando atingir o último efeito, você perde o efeito do maior resultado, mas mantém todo o resto até o fim da partida. Além disso, nesses 5 usos bem sucedidos da Proporção Áurea, você ganha +1 NT para cada um (Se for NT 50, ganha +1 em todas as perícias permanentemente).'
      }
    ]
  },
  {
    id: 'kaiser-impact',
    name: 'Kaiser Impact',
    category: 'Ofensivo',
    description: 'O Kaiser Impact, “Impacto do Imperador” é um voleio com uma potência e precisão incrível, que pode, a depender do seu nível de talento, ser considerado o chute mais veloz do mundo, quase impossível de ser parado.',
    specialization: ['Precisão', 'Voleio', 'Velocidade', 'Imperial'],
    levels: [
      {
        name: 'Kaiser Impact: Voleio Imperial',
        description: 'A versão de voleio do Impacto Imperial, executada com a ajuda da inércia da bola durante sua permanência em movimento no ar, passando por cima de todos os defensores. Você recebe o Movimento "Voleio" (que tem seu teste e bônus mudados para "Precisão") , ao qual evolui juntamente de sua arma (a cada nível que desbloquear do Kaiser Impact, desbloqueia um nível do Voleio, ao qual se inicia no nível equivalente ao primeiro treinamento do movimento após a obtenção). Sempre que usar o "Voleio", pode gastar uma Ação Física extra para aplicar o Impacto Imperial. Ninguém (exceto o goleiro) pode reagir ao movimento (a não ser que tenha Meta Visão (e esteja ativa) ou uma habilidade específica para tal feito), e você anula o teste de Defesa do Goleiro, fazendo-o depender apenas da DP, que tem redução igual à metade do resultado do seu teste. O gasto de FOL desse nível é o gasto do "Voleio".'
      },
      {
        name: 'Kaiser Impact: Lightning Strike',
        description: 'Você conseguiu aprimorar o seu Impacto para executá-lo em terra firme, se aproveitando da bola em movimento para pegar a velocidade e pressão necessárias para um chute digno de um imperador. Para compensar a velocidade inferior à versão de voleio, você afia ao máximo a sua precisão e mira, apontando o seu tiro para aquele canto mais impossível do gol. Ao obter esse nível do Kaiser Impact, você passa a conseguir usar Precisão dentro do seu alcance padrão de chute. Para utilizar esse nível da arma, é necessário gastar uma Ação Mental ou Livre na hora de chutar, te permitindo mirar num canto exato do gol e disparar. Você anula a DP do Goleiro e estipula uma DT para o seu teste de Precisão, teste esse que pode ser interceptado por defensores de NT maior ou igual ao seu que possuam Int. Espacial (Não aplica para o Goleiro). Se você bater a DT, marca o gol; se o goleiro bater a DT, agarra a bola; se um dos defensores bater a DT, intercepta o chute (Vence quem tirar mais no dado caso mais de uma pessoa bata a DT). Para cada 10 que colocar na DT, um defensor a menos (por ordem de proximidade) pode reagir (exceto pelo goleiro), e metade do seu bônus em Precisão volta como penalidade para os testes dos defensores e do Goleiro. Não pode usar o Lightning Strike se estiver sendo marcado.'
      },
      {
        name: 'Kaiser Impact: Beinschuss',
        description: 'Nessa versão do Kaiser Impact, feita de bicicleta, é necessário equilibrar mira e velocidade de chute para conseguir causar o Impacto. Você recebe o movimento "Bicicleta" caso ainda não tivesse, e sempre que fosse usá-lo, pode escolher triplicar seu gasto (irredutível) e sacrificar momentaneamente sua capacidade de trocar "Precisão" por "Chute" para aplicar o Kaiser Impact: Beinschuss. Você deve dar um teste de Precisão (DT 22 +2 a cada 5 NT) na hora do chute, e pode tentar re-rolar esse teste um máximo de vezes igual a metade das suas classes em Precisão. Quando alcançar o resultado, desfere um poderoso chute contra o chão, que bate e vai para o gol, anulando a DP e as Ações do goleiro, que nada pode fazer, a não ser que tire um resultado extremamente sortudo (DT 20 puro no teste para defender), porém, para cada teste depois do primeiro que girou, reduz em -1 a DT que o goleiro deve atingir, e um defensor com Int. Espacial e de NT igual ou maior que o seu pode reagir (Tirando um resultado maior no teste do que o seu teste de Precisão). Porém, se precisou de apenas um teste, não há nada que possa ser feito: todos foram executados.'
      },
      {
        name: 'Kaiser Impact: Blitzkrieg',
        description: 'Você aprendeu uma técnica para combinar cortes com o seu Kaiser Impact afim de executá-lo com mais facilidade, sem defensores no seu caminho. Você recebe o movimento "Corte", e gastando seus FOL padrão + 5 FOL, pode definir uma "meta de cortes", definindo em quantos defensores à sua frente (Máximo 3. Não pode usar no goleiro) quer usar um corte, executando um Kaiser Impact: Lightning Strike automaticamente se estiver no seu alcance no chute no final da rota. Essa habilidade por inteiro custa apenas uma Ação de Reação e uma Ação Física para usar o Kaiser Impact. O primeiro defensor deve estar dentro do seu alcance de Reação, e se conseguir cortá-lo, avança em até 8m em direção ao próximo escolhido, se estiver em seu alcance de Reação após os 8m, pode executar outro Corte (se não estiver, apenas perde o resto da habilidade, assim como também perde se falhar em algum dos cortes e falha se não estiver no alcance de chute no final da rota). Ao final dos Cortes, os defensores ultrapassados por essa habilidade não podem reagir ao seu Kaiser Impact: LS, e para cada Corte que usou nessa rota, a DT do KI para quem desejar interceptar/defender (conta o goleiro) aumenta em 5 (se passar de 10, não aplica o efeito de anular um defensor, isso deve ser feito aumentando 10 na DT manualmente).'
      },
      {
        name: 'Kaiser Impact: Magnus',
        description: 'O estágio perfeito do Kaiser Impact. Através da aplicação do efeito Magnus, manipulando a pressão do ar com um chute preciso em um ponto da bola, permitindo que o Kaiser Impact seja um chute “Magnum Opus”, com uma curvatura perfeita. Agora, todas as limitações que essa arma tinha somem. Você só precisa de 30m e o talento necessário. Entretanto, a bola precisa estar perfeitamente posicionada, com duas soluções. A bola (que deve estar no solo) precisa ser chutada com uma precisão muito difícil de se alcançar no meio de uma partida. Você deve dar um teste de Precisão, e somente com 19 puro o chute pode ser realizado (cada tentativa extra gasta +10 FOL). A segunda solução, é que um passe muito preciso seja feito. Mas não basta o passe ser preciso. O posicionamento e o momento devem ser exatos e coesos com a sua posição. E tamanha especificação só poderia ser alcançada com o fator “Sorte”. Aquele que realizar o passe para você deve dar um teste de Sorte (DT 18) para que a bola caia perfeitamente em seus pés. Se o passe for bem feito, as propriedades da distância do Kaiser Kick são aplicadas para decidir a forma que o teste deve ser realizado. Se cumprir os requisitos, basta estar no alcance. Todas as outras barreiras são anuladas, só precisando de alcance e o talento necessário. Só é possível usar Magnus uma vez por partida. 15 FOL. Após utilizar o Magnus pela primeira vez em um Despertar (antes de liberar com o Nível 5), no NT 40 você pode utilizá-lo mesmo sem o Nível, porém com o gasto dobrado (ainda com uso único).'
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
        description: 'O principal movimento dessa Arma, onde você avança para frente em um cabeceio, pulando. Você consegue se jogar uma distância igual a sua Classe em Cabeceio +12, e a bola se move metade desse valor +15m. Você recebe +2d em disputas por bola aérea, e pode trocar qualquer teste de uma Perícia Física. Porém, ao cabeceá-la, você cai no chão, se machucando. Você sofre uma lesão leve, e cai 1d20 metros para frente. Se tirar 1, anula a lesão, e se tirar 20, a lesão se torna “Mediana”.'
      },
      {
        name: 'Impulso Aprimorado',
        description: 'O Valor base do impulso se torna 15m, e ao receber a bola, você pode gastar 4 FOL para emendar um impulso cabeceio, enviando ela 20m para frente, sem precisar de teste de Domínio, deixando todos que tentarem reagir sob a condição “Surpreso”. Além disso, você recebe +2 Classes em Cabeceio quando usado com essa Arma.'
      },
      {
        name: 'Linha Reta Destrutiva',
        description: 'Você pode utilizar do Impulso Cabeceio para roubar a bola, dando um teste de Cabeceio X Domínio. Se vencer, a bola vai 4m para frente, e você deve dar um teste de Reação (DT 24) para se levantar e pegá-la.'
      },
      {
        name: 'Investida Impulsionada Cabeceada',
        description: 'Quando finalizar um Impulso Cabeceio, pode gastar 1 CA e realizar outro em sequência. Além disso, você só passa a sofrer lesões a partir do terceiro impulso seguido.'
      },
      {
        name: 'Maestria Impulsiva',
        description: 'Você dominou completamente o Impulso Cabeceio, tornando sua cabeçada impulsionada ainda mais potente que seu chute. Você recebe +8 no seu primeiro Impulso, e +6 nos testes subsequentes utilizados para o Impulso Cabeceio.'
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
