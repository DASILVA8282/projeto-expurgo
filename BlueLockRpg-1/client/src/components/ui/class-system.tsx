import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ClassSystemProps {
  selectedClass: string;
  selectedSubclass: string;
  onClassChange: (className: string) => void;
  onSubclassChange: (subclassName: string) => void;
}

interface SubclassData {
  name: string;
  skill: string | null;
  description: string;
}

// Definição completa das classes e subclasses
const CLASSES = {
  ATACANTE: {
    name: "ATACANTE",
    emoji: "⚔️",
    skill: "chute",
    description: "Linha de frente: foco em finalizações, movimentação ofensiva e criação de oportunidades.",
    subclasses: {
      "Caçador de Gols": {
        name: "Caçador de Gols",
        skill: "interceptacao",
        description: "Bônus em testes de interceptar perto do gol e dominar passes ofensivos."
      },
      "Contra Atacante": {
        name: "Contra Atacante", 
        skill: "corrida",
        description: "Ganho de deslocamento em contra-ataques, mais bônus se estiver isolado."
      },
      "Driblador Avançado": {
        name: "Driblador Avançado",
        skill: "drible", 
        description: "Acúmulo de bônus em Chute ou Precisão com número de dribles."
      },
      "Finalizador Clínico": {
        name: "Finalizador Clínico",
        skill: "precisao",
        description: "Gera +1d a +3d em finalizações contínuas. Imunidade a penalidades no último nível."
      },
      "Atacante Completo": {
        name: "Atacante Completo",
        skill: "roubo",
        description: "Pode usar Subclasses de Atacante diferentes a cada turno. Não pode Multiclassear."
      },
      "Homem Alvo": {
        name: "Homem Alvo",
        skill: "fortitude",
        description: "Atrai defensores e recebe bônus em Domínio contra marcação."
      },
      "Atacante Móvel": {
        name: "Atacante Móvel",
        skill: "corrida",
        description: "Capaz de se reposicionar perto de outros atacantes."
      },
      "Falso 9": {
        name: "Falso 9",
        skill: "passe",
        description: "Alterna entre Subclasses de Atacante e Intermediário. Permite transição de função."
      }
    }
  },
  INTERMEDIARIO: {
    name: "INTERMEDIÁRIO",
    emoji: "🧠",
    skill: "passe",
    description: "Controle de jogo: criação de jogadas e marcação inteligente.",
    subclasses: {
      "Médio Agressivo": {
        name: "Médio Agressivo",
        skill: "fortitude",
        description: "Reduz dados de inimigos ao marcá-los diretamente."
      },
      "Criativo": {
        name: "Criativo",
        skill: "analise",
        description: "Gasta INT para prever e usar ações físicas extras sem custo."
      },
      "General": {
        name: "General",
        skill: "determinacao",
        description: "Pode comandar ações de outros Intermediários."
      },
      "Investigador": {
        name: "Investigador",
        skill: "intuicao",
        description: "Classifica áreas do campo para buffs e debuffs em aliados/inimigos."
      },
      "Defensivo": {
        name: "Defensivo",
        skill: "defesa",
        description: "Troca testes de várias perícias por Defesa e dá bônus ao goleiro."
      },
      "Armador": {
        name: "Armador",
        skill: "cruzamento",
        description: "Cria sequência de jogadas com buffs para o time e bônus pessoal."
      },
      "Driblador Controlador": {
        name: "Driblador Controlador",
        skill: "drible",
        description: "Gera combos entre dribles e passes/cruzamentos com progressão de movimentos."
      },
      "Utilitário (Intermediário)": {
        name: "Utilitário (Intermediário)",
        skill: "defesa",
        description: "Semelhante ao Utilitário defensor, mas voltado ao controle e análise."
      }
    }
  },
  DEFENSOR: {
    name: "DEFENSOR",
    emoji: "🛡️", 
    skill: "defesa",
    description: "Proteção da área, recuperação de bola e suporte à transição ofensiva.",
    subclasses: {
      "Ganhador": {
        name: "Ganhador",
        skill: "roubo",
        description: "Bônus em roubo e passe para atacantes. Benefícios em contra-ataques."
      },
      "Ala": {
        name: "Ala",
        skill: "corrida",
        description: "Retorno rápido ao ponto inicial do jogo. Suporte ofensivo e defensivo."
      },
      "Líbero": {
        name: "Líbero",
        skill: "reacao",
        description: "Atua como último homem. Avança e retorna à defesa com FOL."
      },
      "Marcador": {
        name: "Marcador",
        skill: "fortitude",
        description: "Penalidade passiva aplicada aos alvos marcados."
      },
      "Aéreo": {
        name: "Aéreo",
        skill: "cabeceio",
        description: "Intercepta bolas altas com acertos garantidos e bloqueios."
      },
      "Utilitário (Defensor)": {
        name: "Utilitário (Defensor)",
        skill: "passe",
        description: "Alterna funções entre defesa e meio. Gera bônus de classe temporário."
      },
      "Impedimento": {
        name: "Impedimento",
        skill: "fortitude",
        description: "Usa físico para aumentar penalidades em marcados."
      },
      "Prático": {
        name: "Prático",
        skill: null, // Sem perícia de subclasse
        description: "Menos perícias, mas com bônus altos e ação programada poderosa."
      }
    }
  },
  GOLEIRO: {
    name: "GOLEIRO",
    emoji: "🧤",
    skill: "defesa",
    description: "Última linha de defesa. Pode também participar da organização do jogo.",
    subclasses: {
      "Linha": {
        name: "Linha",
        skill: "corrida",
        description: "Maior deslocamento. Usa Carrinho sem penalidade no último nível."
      },
      "Líbero (Goleiro)": {
        name: "Líbero (Goleiro)",
        skill: "reacao",
        description: "Atua como zagueiro. Subclasse híbrida com movimentação de retorno."
      },
      "Reativo": {
        name: "Reativo",
        skill: "reacao",
        description: "Troca Reação por Defesa com bônus. Imunidade a anuladores de DP."
      },
      "Comandante": {
        name: "Comandante",
        skill: "estrategia",
        description: "Inspira aliados e os movimenta dentro da área."
      },
      "Improvisado": {
        name: "Improvisado",
        skill: null, // Escolha do jogador
        description: "Pode usar qualquer perícia em defesa com penalidade ajustável."
      },
      "Tradicional": {
        name: "Tradicional",
        skill: "defesa", // +1 Classe em Defesa
        description: "Simples e confiável. Usa DP como recurso para bônus no teste."
      },
      "Criativo (Goleiro)": {
        name: "Criativo (Goleiro)",
        skill: "analise",
        description: "Usa criatividade para bônus variáveis. Com regra opcional, recebe dicas sobre o atacante."
      },
      "Tanque": {
        name: "Tanque",
        skill: "fortitude",
        description: "Reduz penalidades em DP e Defesa, depois transforma em penalidade ao inimigo."
      }
    }
  }
};

export function ClassSystem({ selectedClass, selectedSubclass, onClassChange, onSubclassChange }: ClassSystemProps) {
  const currentClass = selectedClass ? CLASSES[selectedClass as keyof typeof CLASSES] : null;
  const currentSubclass: SubclassData | null = currentClass && selectedSubclass ? 
    (currentClass.subclasses as any)[selectedSubclass] : null;

  return (
    <div className="space-y-6">
      {/* Seleção de Classe */}
      <Card className="border-red-800 bg-black/50">
        <CardHeader>
          <CardTitle className="text-red-400 font-bebas tracking-wider text-xl">
            ESCOLHA SUA CLASSE
          </CardTitle>
          <CardDescription className="text-gray-400 font-oswald">
            Sua função principal no campo de combate
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-red-300 font-oswald">Classe Primária</Label>
            <Select value={selectedClass} onValueChange={onClassChange}>
              <SelectTrigger className="border-red-700 bg-black text-white focus:border-red-500">
                <SelectValue placeholder="Selecione uma classe..." />
              </SelectTrigger>
              <SelectContent className="border-red-700 bg-black">
                {Object.entries(CLASSES).map(([key, classData]) => (
                  <SelectItem key={key} value={key} className="text-white hover:bg-red-900">
                    {classData.emoji} {classData.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Detalhes da Classe Selecionada */}
          {currentClass && (
            <div className="mt-4 p-4 bg-red-950/30 border border-red-800 rounded-lg">
              <h3 className="text-red-400 font-bebas text-lg mb-2">
                {currentClass.emoji} {currentClass.name}
              </h3>
              <p className="text-gray-300 text-sm mb-3 font-oswald">
                {currentClass.description}
              </p>
              <div className="text-red-300 text-sm font-oswald">
                <strong>Perícia da Classe:</strong> {currentClass.skill.charAt(0).toUpperCase() + currentClass.skill.slice(1)} 
                <span className="text-gray-400 ml-2">(Adicionada automaticamente)</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Seleção de Subclasse */}
      {currentClass && (
        <Card className="border-red-800 bg-black/50">
          <CardHeader>
            <CardTitle className="text-red-400 font-bebas tracking-wider text-xl">
              ESCOLHA SUA ESPECIALIZAÇÃO
            </CardTitle>
            <CardDescription className="text-gray-400 font-oswald">
              Sua especialidade dentro da classe {currentClass.name}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-red-300 font-oswald">Subclasse</Label>
              <Select value={selectedSubclass} onValueChange={onSubclassChange}>
                <SelectTrigger className="border-red-700 bg-black text-white focus:border-red-500">
                  <SelectValue placeholder="Selecione uma especialização..." />
                </SelectTrigger>
                <SelectContent className="border-red-700 bg-black">
                  {Object.entries(currentClass.subclasses).map(([key, subclassData]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-red-900">
                      {subclassData.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Detalhes da Subclasse Selecionada */}
            {currentSubclass && (
              <div className="mt-4 p-4 bg-red-950/30 border border-red-800 rounded-lg">
                <h3 className="text-red-400 font-bebas text-lg mb-2">
                  {currentSubclass.name}
                </h3>
                <p className="text-gray-300 text-sm mb-3 font-oswald">
                  {currentSubclass.description}
                </p>
                {currentSubclass.skill && (
                  <div className="text-red-300 text-sm font-oswald">
                    <strong>Perícia da Subclasse:</strong> {currentSubclass.skill.charAt(0).toUpperCase() + currentSubclass.skill.slice(1)}
                    <span className="text-gray-400 ml-2">(Adicionada automaticamente)</span>
                  </div>
                )}
                {!currentSubclass.skill && currentSubclass.name === "Improvisado" && (
                  <div className="text-amber-400 text-sm font-oswald">
                    <strong>Perícia Especial:</strong> Escolha do jogador durante o jogo
                  </div>
                )}
                {!currentSubclass.skill && currentSubclass.name === "Prático" && (
                  <div className="text-amber-400 text-sm font-oswald">
                    <strong>Especialidade:</strong> Sem perícia adicional, mas com bônus altos
                  </div>
                )}
                {currentSubclass.name === "Tradicional" && (
                  <div className="text-amber-400 text-sm font-oswald">
                    <strong>Bônus Especial:</strong> +1 Classe em Defesa
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Exportar as classes para uso em outros componentes
export { CLASSES };