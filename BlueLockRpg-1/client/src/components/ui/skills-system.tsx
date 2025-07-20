import { motion } from "framer-motion";
import { Target, Crosshair, Shield, Brain, Zap, Map, Eye, Users, Languages, Timer, Wind, ArrowRight, Shuffle, MessageSquare, Star, PartyPopper, Heart, Move, EyeOff, PlayCircle, Search, Dice6 } from "lucide-react";
import { Button } from "./button";

// Sistema de Classes de Perícia
const SKILL_CLASSES = [
  { level: 0, name: "SEM CLASSE", dice: "0", bonus: 0, description: "Sem treinamento" },
  { level: 1, name: "CLASSE I", dice: "1d20", bonus: 2, description: "Treinamento básico" },
  { level: 2, name: "CLASSE II", dice: "1d20", bonus: 4, description: "Técnica básica com treino" },
  { level: 3, name: "CLASSE III", dice: "2d20", bonus: 6, description: "Iniciante avançado" },
  { level: 4, name: "CLASSE IV", dice: "2d20", bonus: 8, description: "Habilidoso" },
  { level: 5, name: "CLASSE V", dice: "3d20", bonus: 10, description: "Talento reconhecível" },
  { level: 6, name: "CLASSE VI", dice: "3d20", bonus: 12, description: "Assinatura pessoal" },
  { level: 7, name: "CLASSE VII", dice: "4d20", bonus: 14, description: "Movimentos avançados" },
  { level: 8, name: "CLASSE VIII", dice: "4d20", bonus: 16, description: "Prodígio da área" },
  { level: 9, name: "CLASSE IX", dice: "5d20", bonus: 18, description: "Talento absoluto" },
  { level: 10, name: "CLASSE X", dice: "5d20", bonus: 20, description: "Talento sobre-humano" }
];

interface SkillsSystemProps {
  skills: {
    chute: number;
    precisao: number;
    roubo: number;
    analise: number;
    determinacao: number;
    estrategia: number;
    intuicao: number;
    interacao_social: number;
    lingua_estrangeira: number;
    // Novas perícias
    corrida: number;
    cruzamento: number;
    defesa: number;
    drible: number;
    passe: number;
    performance: number;
    comemoracao: number;
    // Perícias livres
    fortitude: number;
    finta: number;
    furtividade: number;
    iniciativa: number;
    percepcao: number;
    sorte: number;
    // Perícias de reação
    dominio: number;
    cabeceio: number;
    interceptacao: number;
    reacao: number;
  };
  onSkillChange: (skill: string, value: number) => void;
  grantedSkills: string[];
}

export function SkillsSystem({ skills, onSkillChange, grantedSkills = [] }: SkillsSystemProps) {
  
  // Função para obter informações da classe
  const getSkillClass = (level: number) => {
    return SKILL_CLASSES.find(c => c.level === level) || SKILL_CLASSES[0];
  };

  // Função para obter cor baseada na classe
  const getClassColor = (level: number) => {
    if (level === 0) return "text-gray-500";
    if (level <= 2) return "text-green-400";
    if (level <= 4) return "text-blue-400"; 
    if (level <= 6) return "text-purple-400";
    if (level <= 8) return "text-orange-400";
    return "text-red-400";
  };
  const skillsInfo = [
    {
      name: "chute",
      displayName: "CHUTE",
      description: "Finalizar gol (FÍS, VEL, EGO)",
      details: "Chute: teste contra DP; goleiro reage com Defesa. Blefar: pode converter em passe.",
      icon: Target,
      emoji: "🥅",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "precisao",
      displayName: "PRECISÃO",
      description: "Chutes certeiros (VEL)",
      details: "Chute Distante: além do alcance, paga 4 FOL + penalidades. Gol Olímpico/Falta contra Defesa do goleiro.",
      icon: Crosshair,
      emoji: "🎯",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "roubo",
      displayName: "ROUBO",
      description: "Tirar a bola do oponente (FÍS, VEL, EGO)",
      details: "Roubo: teste vs Domínio. Reação: se adversário passou perto com bola, Roubo vs Domínio/Reação.",
      icon: Shield,
      emoji: "🏴‍☠️",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "analise",
      displayName: "ANÁLISE",
      description: "Copiar ações, estudar campo (INT)",
      details: "Copiar: DT = resultado original; gasta 3 INT; limite = Mod INT. Estudo: insights táticos.",
      icon: Brain,
      emoji: "🧠",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "determinacao",
      displayName: "DETERMINAÇÃO",
      description: "Força mental (EGO)",
      details: "Resistência: resistir a efeitos/auras/status. Ativação: habilidades de força de vontade. Anular Condição: DT ~30.",
      icon: Zap,
      emoji: "💪",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "estrategia",
      displayName: "ESTRATÉGIA",
      description: "Tática e liderança (INT)",
      details: "Tática: DT variável, define planos. Intervalo: 3+ aliados passam → recebem bônus. Auxílio narrativo.",
      icon: Map,
      emoji: "🗺️",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "intuicao",
      displayName: "INTUIÇÃO",
      description: "Instinto e fluxo (INT, EGO)",
      details: "Instintos: DT 22/25/30 → mestre controla um turno; custa 2 EGO. Soluções espontâneas.",
      icon: Eye,
      emoji: "🌟",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "interacao_social",
      displayName: "INTERAÇÃO SOCIAL",
      description: "Comunicação, encanto, persuasão (CAR)",
      details: "Comunicação: diplomacia, lábia, fãs, entrevistas. Comportamento: postura, carisma. DT sociais.",
      icon: Users,
      emoji: "🗣️",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "lingua_estrangeira",
      displayName: "LÍNGUA ESTRANGEIRA",
      description: "Comunicação idiomática (INT)",
      details: "Inglês: +1 Interação formal. Francês: +1 charme. Português: +1 lábia. Alemão: +1 intimidação.",
      icon: Languages,
      emoji: "🗣️",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    // Novas perícias do documento
    {
      name: "corrida",
      displayName: "CORRIDA",
      description: "Aceleração, explosão, perseguição (FÍS, VEL)",
      details: "Aceleração: teste contra opositor → diferença de 2 gera 3m vantagem. Explosão: DT 22/24/28 → 5/10/15m extra.",
      icon: Timer,
      emoji: "🏃",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "cruzamento",
      displayName: "CRUZAMENTO",
      description: "Passe longo das laterais (VEL)",
      details: "Cruzar DT 'Bom': receptor 31m deve tirar 'Bom'/'Medíocre'. Escanteio/Tiro Livre: teste padrão.",
      icon: ArrowRight,
      emoji: "➰",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "defesa",
      displayName: "DEFESA",
      description: "Agarrar ou defender chutes (FÍS, VEL, INT)",
      details: "Agarrar: teste vs Chute/Precisão. Preparação: pré-alerta até 50m → DT 20/24/28 → +1d4/6/8 DP.",
      icon: Shield,
      emoji: "🛡️",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "drible",
      displayName: "DRIBLE",
      description: "Enganar adversários com a bola (VEL, EGO)",
      details: "Driblar: teste contra Reação. Reação fora do turno → Drible vs Roubo. Requer Especialidade.",
      icon: Shuffle,
      emoji: "🌀",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "passe",
      displayName: "PASSE",
      description: "Passes simples, reações e alcance (VEL, INT)",
      details: "Tocar: teste Passe + receptor faz Domínio. Reação: 25m alcance, -2 no teste. Distância variável.",
      icon: ArrowRight,
      emoji: "🎯",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "performance",
      displayName: "PERFORMANCE",
      description: "Expressividade e fama (CAR)",
      details: "Em campo: Ação Livre → DT base 20 ± até ±6 → fama +6/penalidade. Social: defile, postura, mídia.",
      icon: Star,
      emoji: "🎭",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "comemoracao",
      displayName: "COMEMORAÇÃO",
      description: "Interação pós-gol (CAR)",
      details: "Gasta 3 FOL. Empolgação DT24, Gol Marcante DT25 (+10 Fama), Torcida DT26 (ativa Torcida).",
      icon: PartyPopper,
      emoji: "🎉",
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    // Perícias livres
    {
      name: "fortitude",
      displayName: "FORTITUDE",
      description: "Resistência física (FÍS)",
      details: "Resistência física ou pênalti físico. Intensificação: vs DT 25-Mod Físico; +Mod Físico; gasta 3 FOL.",
      icon: Heart,
      emoji: "💥",
      color: "text-amber-400",
      bgColor: "bg-amber-800/20",
      borderColor: "border-amber-700/30"
    },
    {
      name: "finta",
      displayName: "FINTA",
      description: "Enganação (INT, VEL)",
      details: "Enganação: Finta vs Reação → alvo -2 por 2 Classes em Finta. Confusão: movimento furtivo sem bola.",
      icon: Move,
      emoji: "💥",
      color: "text-amber-400",
      bgColor: "bg-amber-800/20",
      borderColor: "border-amber-700/30"
    },
    {
      name: "furtividade",
      displayName: "FURTIVIDADE",
      description: "Se esconder (VEL)",
      details: "Se esconder: teste vs Percepção (até 15m); aliados também testam; movê-lo revela.",
      icon: EyeOff,
      emoji: "💥",
      color: "text-amber-400",
      bgColor: "bg-amber-800/20",
      borderColor: "border-amber-700/30"
    },
    {
      name: "iniciativa",
      displayName: "INICIATIVA",
      description: "Atitude (VEL)",
      details: "Atitude: determina próximo turno após vácuo. Disputa: define ordem. Bola inicial: disputa de posse.",
      icon: PlayCircle,
      emoji: "💥",
      color: "text-amber-400",
      bgColor: "bg-amber-800/20",
      borderColor: "border-amber-700/30"
    },
    {
      name: "percepcao",
      displayName: "PERCEPÇÃO",
      description: "Perceber (INT, VEL)",
      details: "Perceber: teste vs Furtividade. Observação: DT variável; bônus com Análise. Ativa habilidades relacionadas.",
      icon: Search,
      emoji: "💥",
      color: "text-amber-400",
      bgColor: "bg-amber-800/20",
      borderColor: "border-amber-700/30"
    },
    {
      name: "sorte",
      displayName: "SORTE",
      description: "Disputa de sorte",
      details: "Disputa: 1d20 puro vs adversário. Apostar/Riscar: teste solo; sucesso gera vantagem. Milagre: eventos favoráveis.",
      icon: Dice6,
      emoji: "💥",
      color: "text-amber-400",
      bgColor: "bg-amber-800/20",
      borderColor: "border-amber-700/30"
    },
    // Perícias de reação
    {
      name: "dominio",
      displayName: "DOMÍNIO",
      description: "Receber passe (FÍS, VEL, EGO) - REAÇÃO",
      details: "Receber Passe: DT 'Bom'. Manter Posse: vs Roubo. Segurar Bola DT26: +2 próximo Domínio.",
      icon: Target,
      emoji: "🎯",
      color: "text-green-400",
      bgColor: "bg-green-800/20",
      borderColor: "border-green-700/30"
    },
    {
      name: "cabeceio",
      displayName: "CABECEIO",
      description: "Cabeça (FÍS, VEL) - REAÇÃO",
      details: "Ao Gol: como chute com metade alcance. Interceptação: substitui em bola alta. Passe DT27 irreversível.",
      icon: Target,
      emoji: "🧬",
      color: "text-green-400",
      bgColor: "bg-green-800/20",
      borderColor: "border-green-700/30"
    },
    {
      name: "interceptacao",
      displayName: "INTERCEPTAÇÃO",
      description: "Interceptar (VEL, EGO) - REAÇÃO",
      details: "Interceptar: teste vs Passe/Chute/Cruzamento. Passe de Peito: Classe VII + 5 FOL → DT 27.",
      icon: Shield,
      emoji: "🛑",
      color: "text-green-400",
      bgColor: "bg-green-800/20",
      borderColor: "border-green-700/30"
    },
    {
      name: "reacao",
      displayName: "REAÇÃO",
      description: "Reação fora do turno - REAÇÃO",
      details: "Pode ser usada fora do turno principal, ativada por Ação de Reação junto com outras perícias.",
      icon: Zap,
      emoji: "⏱️",
      color: "text-green-400",
      bgColor: "bg-green-800/20",
      borderColor: "border-green-700/30"
    }
  ];

  const handleIncrease = (skillName: string) => {
    const currentValue = skills[skillName as keyof typeof skills];
    if (currentValue < 10) {
      onSkillChange(skillName, currentValue + 1);
    }
  };

  const handleDecrease = (skillName: string) => {
    const currentValue = skills[skillName as keyof typeof skills];
    const isGranted = grantedSkills.includes(skillName);
    const minValue = isGranted ? 1 : 0;
    if (currentValue > minValue) {
      onSkillChange(skillName, currentValue - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-bebas text-2xl text-red-400 tracking-wider mb-2">PERÍCIAS</h3>
        <p className="text-gray-300 font-oswald">
          Sistema de Classes: 0 (Sem Classe) até X (Talento Sobre-humano)<br/>
          <span className="text-red-400 font-bold">Desenvolva suas perícias através das classes</span>
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
          {SKILL_CLASSES.slice(1).map((cls) => (
            <div key={cls.level} className={`p-2 rounded border ${getClassColor(cls.level)} border-current/20 bg-current/5`}>
              <div className="font-bold">{cls.name}</div>
              <div className="opacity-75">{cls.dice}+{cls.bonus}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {skillsInfo.map((skill) => {
          const currentValue = skills[skill.name as keyof typeof skills];
          
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${skill.bgColor} ${skill.borderColor} border rounded-lg p-4`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{skill.emoji}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className={`font-bebas text-lg ${skill.color} tracking-wide mb-1`}>
                      {skill.displayName}
                    </h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      {skill.description}
                    </p>
                    <p className="text-gray-400 font-oswald text-xs">
                      {skill.details}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDecrease(skill.name)}
                    disabled={currentValue <= (grantedSkills.includes(skill.name) ? 1 : 0)}
                    className="h-8 w-8 p-0 hover:bg-red-700/30 disabled:opacity-30"
                  >
                    -
                  </Button>
                  
                  <div className={`px-3 py-2 rounded border min-w-[120px] text-center ${
                    currentValue === 0 ? 'border-gray-600 bg-gray-800/30' : 'border-current/30 bg-current/10'
                  } ${getClassColor(currentValue)}`}>
                    <div className="font-bebas text-sm">
                      {getSkillClass(currentValue).name}
                    </div>
                    <div className="text-xs opacity-75">
                      {currentValue > 0 && `${getSkillClass(currentValue).dice}+${getSkillClass(currentValue).bonus}`}
                      {currentValue === 0 && "Não treinada"}
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleIncrease(skill.name)}
                    disabled={currentValue >= 10}
                    className="h-8 w-8 p-0 hover:bg-red-700/30 disabled:opacity-30"
                  >
                    +
                  </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Sistema de Classes Explicação */}
      <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
        <h4 className="font-bebas text-lg text-red-400 mb-2">SISTEMA DE CLASSES</h4>
        <p className="text-gray-300 font-oswald text-sm">
          Sem limite de perícias: desenvolva livremente através das classes.<br/>
          <span className="text-amber-400">Perícias garantidas</span> por classe/origem já começam em CLASSE I ou superior.
        </p>
      </div>
    </div>
  );
}