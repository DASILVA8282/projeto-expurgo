import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface ClassData {
  name: string;
  emoji: string;
  skill: string;
  description: string;
  subclasses: SubclassData[];
}

export interface SubclassData {
  name: string;
  skill: string;
  description: string;
}

const CLASSES: ClassData[] = [
  {
    name: "ATACANTE",
    emoji: "⚔️",
    skill: "Chute",
    description: "Linha de frente. Foco em finalizações, movimentação ofensiva e criação de oportunidades.",
    subclasses: [
      {
        name: "Caçador de Gols",
        skill: "Interceptação",
        description: "Bônus em testes de interceptar perto do gol e dominar passes ofensivos."
      },
      {
        name: "Contra Atacante", 
        skill: "Corrida",
        description: "Ganho de deslocamento em contra-ataques, mais bônus se estiver isolado."
      },
      {
        name: "Driblador Avançado",
        skill: "Drible", 
        description: "Acúmulo de bônus em Chute ou Precisão com número de dribles."
      },
      {
        name: "Finalizador Clínico",
        skill: "Precisão",
        description: "Gera +1d a +3d em finalizações contínuas. Imunidade a penalidades no último nível."
      },
      {
        name: "Atacante Completo",
        skill: "Roubo",
        description: "Pode usar Subclasses de Atacante diferentes a cada turno. Não pode Multiclassear."
      },
      {
        name: "Homem Alvo",
        skill: "Fortitude",
        description: "Atrai defensores e recebe bônus em Domínio contra marcação."
      },
      {
        name: "Atacante Móvel",
        skill: "Corrida",
        description: "Capaz de se reposicionar perto de outros atacantes."
      },
      {
        name: "Falso 9",
        skill: "Passe",
        description: "Alterna entre Subclasses de Atacante e Intermediário. Permite transição de função."
      }
    ]
  },
  {
    name: "INTERMEDIÁRIO",
    emoji: "🧠",
    skill: "Passe",
    description: "Controle de jogo, criação de jogadas e marcação inteligente.",
    subclasses: [
      {
        name: "Médio Agressivo",
        skill: "Fortitude",
        description: "Reduz dados de inimigos ao marcá-los diretamente."
      },
      {
        name: "Criativo",
        skill: "Análise",
        description: "Gasta INT para prever e usar ações físicas extras sem custo."
      },
      {
        name: "General",
        skill: "Determinação",
        description: "Pode comandar ações de outros Intermediários."
      },
      {
        name: "Investigador",
        skill: "Intuição",
        description: "Classifica áreas do campo para buffs e debuffs em aliados/inimigos."
      },
      {
        name: "Defensivo",
        skill: "Defesa",
        description: "Troca testes de várias perícias por Defesa e dá bônus ao goleiro."
      },
      {
        name: "Armador",
        skill: "Cruzamento",
        description: "Cria sequência de jogadas com buffs para o time e bônus pessoal."
      },
      {
        name: "Driblador Controlador",
        skill: "Drible",
        description: "Gera combos entre dribles e passes/cruzamentos com progressão de movimentos."
      },
      {
        name: "Utilitário (Intermediário)",
        skill: "Defesa",
        description: "Semelhante ao Utilitário defensor, mas voltado ao controle e análise."
      }
    ]
  },
  {
    name: "DEFENSOR",
    emoji: "🛡️",
    skill: "Defesa",
    description: "Proteção da área, recuperação de bola e suporte à transição ofensiva.",
    subclasses: [
      {
        name: "Ganhador",
        skill: "Roubo",
        description: "Bônus em roubo e passe para atacantes. Benefícios em contra-ataques."
      },
      {
        name: "Ala",
        skill: "Corrida",
        description: "Retorno rápido ao ponto inicial do jogo. Suporte ofensivo e defensivo."
      },
      {
        name: "Líbero",
        skill: "Reação",
        description: "Atua como último homem. Avança e retorna à defesa com FOL."
      },
      {
        name: "Marcador",
        skill: "Fortitude",
        description: "Penalidade passiva aplicada aos alvos marcados."
      },
      {
        name: "Aéreo",
        skill: "Cabeceio",
        description: "Intercepta bolas altas com acertos garantidos e bloqueios."
      },
      {
        name: "Utilitário (Defensor)",
        skill: "Passe",
        description: "Alterna funções entre defesa e meio. Gera bônus de classe temporário."
      },
      {
        name: "Impedimento",
        skill: "Fortitude",
        description: "Usa físico para aumentar penalidades em marcados."
      },
      {
        name: "Prático",
        skill: "Nenhuma",
        description: "Menos perícias, mas com bônus altos e ação programada poderosa."
      }
    ]
  },
  {
    name: "GOLEIRO",
    emoji: "🧤",
    skill: "Defesa",
    description: "Última linha de defesa. Pode também participar da organização do jogo.",
    subclasses: [
      {
        name: "Linha",
        skill: "Corrida",
        description: "Maior deslocamento. Usa Carrinho sem penalidade no último nível."
      },
      {
        name: "Líbero (Goleiro)",
        skill: "Reação",
        description: "Atua como zagueiro. Subclasse híbrida com movimentação de retorno."
      },
      {
        name: "Reativo",
        skill: "Reação",
        description: "Troca Reação por Defesa com bônus. Imunidade a anuladores de DP."
      },
      {
        name: "Comandante",
        skill: "Estratégia",
        description: "Inspira aliados e os movimenta dentro da área."
      },
      {
        name: "Improvisado",
        skill: "Escolha do jogador",
        description: "Pode usar qualquer perícia em defesa com penalidade ajustável."
      },
      {
        name: "Tradicional",
        skill: "+1 Classe em Defesa",
        description: "Simples e confiável. Usa DP como recurso para bônus no teste."
      },
      {
        name: "Criativo (Goleiro)",
        skill: "Análise",
        description: "Usa criatividade para bônus variáveis. Com regra opcional, recebe dicas sobre o atacante."
      },
      {
        name: "Tanque",
        skill: "Fortitude",
        description: "Reduz penalidades em DP e Defesa, depois transforma em penalidade ao inimigo."
      }
    ]
  }
];

interface CharacterClassesProps {
  selectedClass?: string;
  selectedSubclass?: string;
  onClassChange: (className: string, classSkill: string) => void;
  onSubclassChange: (subclassName: string, subclassSkill: string) => void;
}

export function CharacterClasses({ 
  selectedClass, 
  selectedSubclass, 
  onClassChange, 
  onSubclassChange 
}: CharacterClassesProps) {
  const [expandedClass, setExpandedClass] = useState<string | null>(selectedClass || null);

  const handleClassSelect = (classData: ClassData) => {
    setExpandedClass(classData.name);
    onClassChange(classData.name, classData.skill);
    // Reset subclass when changing class
    onSubclassChange('', '');
  };

  const handleSubclassSelect = (subclassData: SubclassData) => {
    onSubclassChange(subclassData.name, subclassData.skill);
  };

  const selectedClassData = CLASSES.find(c => c.name === selectedClass);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-red-400 mb-4 font-['Oswald']">
          Selecione sua Classe
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CLASSES.map((classData) => (
            <Card 
              key={classData.name}
              className={`border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                selectedClass === classData.name 
                  ? 'border-red-500 bg-red-900/20' 
                  : 'border-red-800 hover:border-red-600'
              }`}
              onClick={() => handleClassSelect(classData)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg text-red-100">
                  <span className="text-2xl">{classData.emoji}</span>
                  <div>
                    <div className="font-['Oswald'] tracking-wider">{classData.name}</div>
                    <Badge variant="outline" className="mt-1 border-red-600 text-red-300">
                      Perícia: {classData.skill}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {classData.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedClassData && (
        <div>
          <h3 className="text-xl font-bold text-red-400 mb-4 font-['Oswald']">
            Selecione sua Subclasse ({selectedClassData.name})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedClassData.subclasses.map((subclass) => (
              <Card
                key={subclass.name}
                className={`border cursor-pointer transition-all duration-300 hover:scale-[1.02] ${
                  selectedSubclass === subclass.name
                    ? 'border-amber-500 bg-amber-900/20'
                    : 'border-amber-800 hover:border-amber-600'
                }`}
                onClick={() => handleSubclassSelect(subclass)}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-base text-amber-100 font-['Oswald']">
                    {subclass.name}
                  </CardTitle>
                  <Badge variant="outline" className="border-amber-600 text-amber-300 text-xs">
                    {subclass.skill !== "Nenhuma" && subclass.skill !== "Escolha do jogador" && subclass.skill !== "+1 Classe em Defesa" 
                      ? `Perícia: ${subclass.skill}` 
                      : subclass.skill}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {subclass.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {selectedClass && selectedSubclass && (
        <div className="border-2 border-green-600 bg-green-900/20 p-4 rounded-lg">
          <h4 className="font-bold text-green-400 mb-2 font-['Oswald']">
            Perícias Automáticas Concedidas:
          </h4>
          <div className="flex gap-3">
            <Badge className="bg-red-700 text-red-100">
              Classe: {selectedClassData?.skill}
            </Badge>
            {selectedSubclass && (
              <Badge className="bg-amber-700 text-amber-100">
                Subclasse: {selectedClassData?.subclasses.find(s => s.name === selectedSubclass)?.skill}
              </Badge>
            )}
          </div>
          <p className="text-xs text-green-300 mt-2">
            Essas perícias são concedidas automaticamente e não consomem suas 8 escolhas iniciais.
          </p>
        </div>
      )}
    </div>
  );
}

export default CharacterClasses;