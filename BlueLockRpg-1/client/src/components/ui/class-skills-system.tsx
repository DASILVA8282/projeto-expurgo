import { motion } from "framer-motion";
import { Target, Crosshair, Shield, Brain, Zap, Map, Eye, Users, Languages, Timer, Wind, ArrowRight, Shuffle, MessageSquare, Star, PartyPopper, Heart, Move, EyeOff, PlayCircle, Search, Dice6 } from "lucide-react";
import { Button } from "./button";
import { useState } from "react";

interface ClassSkillsSystemProps {
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
    corrida: number;
    cruzamento: number;
    defesa: number;
    drible: number;
    passe: number;
    performance: number;
    comemoracao: number;
    fortitude: number;
    finta: number;
    furtividade: number;
    iniciativa: number;
    percepcao: number;
    sorte: number;
    dominio: number;
    cabeceio: number;
    interceptacao: number;
    reacao: number;
  };
  onSkillChange: (skill: string, value: number) => void;
  isCreatingCharacter: boolean;
}

// Definição das Classes I-X com dados e bônus
const skillClasses = [
  { level: 0, name: "SEM CLASSE", dice: "—", bonus: "—", description: "Não possui treinamento nesta perícia" },
  { level: 1, name: "CLASSE I", dice: "1d20", bonus: "+2", description: "Treinamento básico nessa área, o necessário para usar a função." },
  { level: 2, name: "CLASSE II", dice: "1d20", bonus: "+4", description: "Técnica ainda básica, porém com um pouco de treino aplicado." },
  { level: 3, name: "CLASSE III", dice: "2d20", bonus: "+6", description: "Ainda é iniciante, porém quase se torna intermediário, com habilidades altas na perícia." },
  { level: 4, name: "CLASSE IV", dice: "2d20", bonus: "+8", description: "Nesse nível, você já pode ser chamado de habilidoso." },
  { level: 5, name: "CLASSE V", dice: "3d20", bonus: "+10", description: "Talento e habilidade reconhecíveis. É realmente bom no que faz." },
  { level: 6, name: "CLASSE VI", dice: "3d20", bonus: "+12", description: "Essa habilidade se torna quase sua assinatura, sendo um dos seus grandes trunfos." },
  { level: 7, name: "CLASSE VII", dice: "4d20", bonus: "+14", description: "Você tem facilidade em executar movimentos avançados, realmente habilidoso." },
  { level: 8, name: "CLASSE VIII", dice: "4d20", bonus: "+16", description: "Você é um prodígio dessa área, níveis extremos de habilidade." },
  { level: 9, name: "CLASSE IX", dice: "5d20", bonus: "+18", description: "Talento absoluto, destaque total, talvez inalcançável." },
  { level: 10, name: "CLASSE X", dice: "5d20", bonus: "+20", description: "Você atingiu o impossível nessa área. Talento sobre-humano." }
];

export function ClassSkillsSystem({ skills, onSkillChange, isCreatingCharacter }: ClassSkillsSystemProps) {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const allSkills = [
    // Perícias Principais (Vermelhas)
    { name: "chute", displayName: "CHUTE", description: "Finalização de gol", details: "Chute: teste contra DP; goleiro reage com Defesa", icon: Target, emoji: "🥅", category: "principal", attributes: "(FÍS, VEL, EGO)" },
    { name: "precisao", displayName: "PRECISÃO", description: "Chutes certeiros de longa distância", details: "Chute Distante: além do alcance, paga 4 FOL + penalidades", icon: Crosshair, emoji: "🎯", category: "principal", attributes: "(VEL)" },
    { name: "roubo", displayName: "ROUBO", description: "Desarme e interceptação de bola", details: "Roubo: teste vs Domínio. Reação contra passes próximos", icon: Shield, emoji: "🏴‍☠️", category: "principal", attributes: "(FÍS, VEL, EGO)" },
    { name: "analise", displayName: "ANÁLISE", description: "Copiar ações e estudar campo", details: "Copiar movimentos dos adversários e ler o jogo", icon: Brain, emoji: "🧠", category: "principal", attributes: "(INT)" },
    { name: "determinacao", displayName: "DETERMINAÇÃO", description: "Resistência mental", details: "Anulação de condições mentais e resistência psicológica", icon: Zap, emoji: "💪", category: "principal", attributes: "(EGO)" },
    { name: "estrategia", displayName: "ESTRATÉGIA", description: "Tática e liderança de equipe", details: "Comandar estratégias e liderar o time em campo", icon: Map, emoji: "🗺️", category: "principal", attributes: "(INT)" },
    { name: "intuicao", displayName: "INTUIÇÃO", description: "Instintos e soluções espontâneas", details: "Reações instintivas e soluções criativas", icon: Eye, emoji: "🌟", category: "principal", attributes: "(INT, EGO)" },
    { name: "interacao_social", displayName: "INTERAÇÃO SOCIAL", description: "Comunicação e carisma", details: "Influenciar pessoas e se comunicar efetivamente", icon: Users, emoji: "🗣️", category: "principal", attributes: "(CAR)" },
    { name: "lingua_estrangeira", displayName: "LÍNGUA ESTRANGEIRA", description: "Idiomas com bônus específicos", details: "Comunicação em idiomas estrangeiros", icon: Languages, emoji: "🗣️", category: "principal", attributes: "(INT)" },
    { name: "corrida", displayName: "CORRIDA", description: "Aceleração, explosão, perseguição", details: "Velocidade de deslocamento e corridas", icon: Timer, emoji: "🏃", category: "principal", attributes: "(FÍS, VEL)" },
    { name: "cruzamento", displayName: "CRUZAMENTO", description: "Passe longo das laterais", details: "Passes longos e cruzamentos das laterais", icon: Wind, emoji: "➰", category: "principal", attributes: "(VEL)" },
    { name: "defesa", displayName: "DEFESA", description: "Agarrar ou defender chutes", details: "Defesa de goleiros e zagueiros", icon: Shield, emoji: "🛡️", category: "principal", attributes: "(FÍS, VEL, INT)" },
    { name: "drible", displayName: "DRIBLE", description: "Enganar adversários com a bola", details: "Fintas e dribles para passar pelos oponentes", icon: Shuffle, emoji: "🌀", category: "principal", attributes: "(VEL, EGO)" },
    { name: "passe", displayName: "PASSE", description: "Passes simples, reações e alcance", details: "Passes básicos e distribuição de jogo", icon: ArrowRight, emoji: "🎯", category: "principal", attributes: "(VEL, INT)" },
    { name: "performance", displayName: "PERFORMANCE", description: "Expressividade e fama", details: "Carisma em campo e performance para público", icon: Star, emoji: "🎭", category: "principal", attributes: "(CAR)" },
    { name: "comemoracao", displayName: "COMEMORAÇÃO", description: "Interação pós-gol", details: "Comemorações épicas após marcar gols", icon: PartyPopper, emoji: "🎉", category: "principal", attributes: "(CAR)" },

    // Perícias Livres (Âmbar)
    { name: "fortitude", displayName: "FORTITUDE", description: "Resistência física", details: "Resistência a dano físico e cansaço", icon: Heart, emoji: "💥", category: "livre", attributes: "(FÍS)" },
    { name: "finta", displayName: "FINTA", description: "Enganação", details: "Fintas e movimentos para enganar", icon: Move, emoji: "💥", category: "livre", attributes: "(INT, VEL)" },
    { name: "furtividade", displayName: "FURTIVIDADE", description: "Se esconder", details: "Movimentação discreta e posicionamento", icon: EyeOff, emoji: "💥", category: "livre", attributes: "(VEL)" },
    { name: "iniciativa", displayName: "INICIATIVA", description: "Atitude", details: "Rapidez de reação e tomada de decisão", icon: PlayCircle, emoji: "💥", category: "livre", attributes: "(VEL)" },
    { name: "percepcao", displayName: "PERCEPÇÃO", description: "Perceber", details: "Consciência do campo e percepção espacial", icon: Search, emoji: "💥", category: "livre", attributes: "(INT, VEL)" },
    { name: "sorte", displayName: "SORTE", description: "Disputa de sorte", details: "Fatores aleatórios e coincidências", icon: Dice6, emoji: "💥", category: "livre", attributes: "" },

    // Perícias de Reação (Verdes)
    { name: "dominio", displayName: "DOMÍNIO", description: "Receber passe", details: "Controle de bola ao receber passes", icon: Target, emoji: "🎯", category: "reacao", attributes: "(FÍS, VEL, EGO)" },
    { name: "cabeceio", displayName: "CABECEIO", description: "Jogo de cabeça", details: "Cabeceadas para gol ou passes", icon: Brain, emoji: "🧬", category: "reacao", attributes: "(FÍS, VEL)" },
    { name: "interceptacao", displayName: "INTERCEPTAÇÃO", description: "Interceptar", details: "Interceptação de passes e cruzamentos", icon: Shield, emoji: "🛑", category: "reacao", attributes: "(VEL, EGO)" },
    { name: "reacao", displayName: "REAÇÃO", description: "Reação fora do turno", details: "Reações rápidas a situações imprevistas", icon: Zap, emoji: "⏱️", category: "reacao", attributes: "" },
  ];

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case "principal":
        return { color: "text-red-400", bgColor: "bg-red-800/20", borderColor: "border-red-700/30", title: "PERÍCIAS PRINCIPAIS" };
      case "livre":
        return { color: "text-amber-400", bgColor: "bg-amber-800/20", borderColor: "border-amber-700/30", title: "PERÍCIAS LIVRES" };
      case "reacao":
        return { color: "text-green-400", bgColor: "bg-green-800/20", borderColor: "border-green-700/30", title: "PERÍCIAS DE REAÇÃO" };
      default:
        return { color: "text-gray-400", bgColor: "bg-gray-800/20", borderColor: "border-gray-700/30", title: "OUTRAS" };
    }
  };

  const handleSkillToggle = (skillName: string) => {
    if (!isCreatingCharacter) return;

    const currentSkillValue = skills[skillName as keyof typeof skills];
    const newSelectedSkills = [...selectedSkills];

    if (currentSkillValue === 0) {
      // Adicionar perícia se tiver menos de 8 selecionadas
      if (selectedSkills.length < 8) {
        newSelectedSkills.push(skillName);
        setSelectedSkills(newSelectedSkills);
        onSkillChange(skillName, 1); // Classe I
      }
    } else {
      // Remover perícia
      const index = newSelectedSkills.indexOf(skillName);
      if (index > -1) {
        newSelectedSkills.splice(index, 1);
        setSelectedSkills(newSelectedSkills);
        onSkillChange(skillName, 0); // Sem classe
      }
    }
  };

  const handleSkillIncrease = (skillName: string) => {
    if (isCreatingCharacter) return; // Durante criação só pode escolher as 8 iniciais

    const currentValue = skills[skillName as keyof typeof skills];
    if (currentValue < 10) {
      onSkillChange(skillName, currentValue + 1);
    }
  };

  const handleSkillDecrease = (skillName: string) => {
    if (isCreatingCharacter) return; // Durante criação só pode escolher as 8 iniciais

    const currentValue = skills[skillName as keyof typeof skills];
    if (currentValue > 0) {
      onSkillChange(skillName, currentValue - 1);
    }
  };

  const getSkillClass = (value: number) => {
    return skillClasses[value] || skillClasses[0];
  };

  const selectedCount = Object.values(skills).filter(value => value > 0).length;

  const groupedSkills = allSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof allSkills>);

  return (
    <div className="space-y-8">
      {/* Instrução para criação de personagem */}
      {isCreatingCharacter && (
        <div className="text-center p-4 bg-red-900/30 border border-red-700 rounded-lg">
          <h3 className="font-bebas text-xl text-red-400 mb-2">ESCOLHA 8 PERÍCIAS INICIAIS</h3>
          <p className="text-gray-300 font-oswald">
            Selecione 8 perícias que começarão no nível <span className="text-red-400 font-bold">CLASSE I</span>.<br/>
            <span className="text-amber-400">Perícias selecionadas: {selectedCount}/8</span>
          </p>
        </div>
      )}

      {/* Sistema de Classes - Referência */}
      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-4">
        <h3 className="font-bebas text-lg text-red-400 mb-4 text-center">SISTEMA DE CLASSES</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
          {skillClasses.slice(1).map((skillClass) => (
            <div key={skillClass.level} className="text-center">
              <div className="font-bebas text-red-400">{skillClass.name}</div>
              <div className="text-gray-300">{skillClass.dice}{skillClass.bonus}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Perícias por categoria */}
      {Object.entries(groupedSkills).map(([category, categorySkills]) => {
        const categoryInfo = getCategoryInfo(category);
        
        return (
          <div key={category} className="space-y-4">
            <div className="text-center">
              <h3 className={`font-bebas text-xl ${categoryInfo.color} tracking-wide`}>
                {categoryInfo.title}
              </h3>
            </div>

            <div className="grid gap-4">
              {categorySkills.map((skill) => {
                const IconComponent = skill.icon;
                const currentValue = skills[skill.name as keyof typeof skills];
                const skillClass = getSkillClass(currentValue);
                const isSelected = currentValue > 0;

                return (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`${categoryInfo.bgColor} ${categoryInfo.borderColor} border rounded-lg p-4 ${
                      isCreatingCharacter ? (isSelected ? 'ring-2 ring-red-500' : 'cursor-pointer hover:bg-gray-800/50') : ''
                    }`}
                    onClick={() => isCreatingCharacter && handleSkillToggle(skill.name)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{skill.emoji}</span>
                          <IconComponent className={`w-5 h-5 ${categoryInfo.color}`} />
                        </div>
                        <div>
                          <h4 className={`font-bebas text-lg ${categoryInfo.color} tracking-wide`}>
                            {skill.displayName}
                          </h4>
                          <p className="text-gray-300 font-oswald text-sm">
                            {skill.description} <span className="text-gray-400">{skill.attributes}</span>
                          </p>
                          <p className="text-gray-400 font-oswald text-xs">
                            {skill.details}
                          </p>
                        </div>
                      </div>

                      {/* Controles de nível (apenas para personagens existentes) */}
                      {!isCreatingCharacter && (
                        <div className="flex items-center gap-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSkillDecrease(skill.name);
                            }}
                            disabled={currentValue <= 0}
                            className="h-8 w-8 p-0 hover:bg-red-700/30 disabled:opacity-30"
                          >
                            -
                          </Button>

                          <div className="text-center min-w-[120px]">
                            <div className={`font-bebas text-sm ${categoryInfo.color}`}>
                              {skillClass.name}
                            </div>
                            <div className="text-gray-300 text-xs">
                              {skillClass.dice}{skillClass.bonus}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSkillIncrease(skill.name);
                            }}
                            disabled={currentValue >= 10}
                            className="h-8 w-8 p-0 hover:bg-red-700/30 disabled:opacity-30"
                          >
                            +
                          </Button>
                        </div>
                      )}

                      {/* Estado da perícia durante criação */}
                      {isCreatingCharacter && (
                        <div className="text-center min-w-[120px]">
                          <div className={`font-bebas text-sm ${isSelected ? 'text-red-400' : 'text-gray-500'}`}>
                            {isSelected ? 'CLASSE I' : 'NÃO SELECIONADA'}
                          </div>
                          <div className={`text-xs ${isSelected ? 'text-gray-300' : 'text-gray-600'}`}>
                            {isSelected ? '1d20+2' : '—'}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Descrição da classe atual */}
                    {currentValue > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-700">
                        <p className="text-gray-400 font-oswald text-xs italic">
                          {skillClass.description}
                        </p>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}