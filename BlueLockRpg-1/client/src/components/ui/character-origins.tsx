import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface CharacterOriginsProps {
  selectedOrigin?: string;
  onOriginSelect: (origin: string) => void;
}

const ORIGINS = [
  {
    id: "prodigio",
    name: "Prodígio",
    emoji: "🌟",
    attribute: "+3 INT",
    effect: "3 Perícias começam 1 Classe acima",
    description: "Genial desde pequeno; nasceu pro futebol"
  },
  {
    id: "jogador-estudantil",
    name: "Jogador Estudantil", 
    emoji: "🎓",
    attribute: "+3 VEL",
    effect: "Começa com 2 Movimentos. Se usar só 1, -3 FOL no custo",
    description: "Vem do cenário escolar competitivo"
  },
  {
    id: "herdeiro",
    name: "Herdeiro",
    emoji: "💰", 
    attribute: "+3 CAR",
    effect: "+4 de bônus dividível entre aliados (perícias)",
    description: "Riquíssimo; sempre teve tudo do bom e do melhor."
  },
  {
    id: "miseravel",
    name: "Miserável",
    emoji: "🥀",
    attribute: "+3 FÍS", 
    effect: "Determinação é Especialidade e conta como 1 Classe acima",
    description: "Cresceu na miséria; o futebol virou fuga ou revelação."
  },
  {
    id: "familia-esportista",
    name: "Família Esportista",
    emoji: "🏅",
    attribute: "+3 EGO",
    effect: "Ganha 1 Habilidade Geral extra no Nível 1",
    description: "Pais atletas; pressionado desde cedo a brilhar."
  },
  {
    id: "incompreendido",
    name: "Incompreendido",
    emoji: "🕊️",
    attribute: "+3 EGO", 
    effect: "Quando encontra alguém que 'entende', formam Ação Química",
    description: "Sempre solitário; o futebol era o único amigo."
  },
  {
    id: "jogador-base",
    name: "Jogador de Base",
    emoji: "⚽",
    attribute: "+3 VEL",
    effect: "Subclasse principal conta como 1 nível acima",
    description: "Jogava em base regional antes do Projeto Expurgo."
  },
  {
    id: "preguicoso",
    name: "Preguiçoso",
    emoji: "😴",
    attribute: "+3 INT",
    effect: "3x por partida, aumenta +1 nível em uma arma",
    description: "Preguiçoso, desmotivado — a energia desperta no futebol."
  },
  {
    id: "fracassado",
    name: "Fracassado",
    emoji: "💔",
    attribute: "+3 EGO",
    effect: "Ganha a Arma Menor 'Força de Vontade'",
    description: "Ignorado, desacreditado — o Projeto Expurgo é sua chance."
  },
  {
    id: "bicho-mato",
    name: "Bicho do Mato",
    emoji: "🌲",
    attribute: "+3 FÍS",
    effect: "Intuição é Especialidade. Para cada 10 tirado, +1",
    description: "Cresceu longe da sociedade, guiado por instinto."
  },
  {
    id: "monge",
    name: "Monge",
    emoji: "🧘",
    attribute: "+3 INT",
    effect: "Cada Classe em Determinação = Resistência 1",
    description: "Vem de vida religiosa; busca no futebol sua libertação."
  },
  {
    id: "arruinado",
    name: "Arruinado",
    emoji: "🩻",
    attribute: "+3 EGO",
    effect: "Perde mecânica de Fúria. Ao falhar, recebe +1",
    description: "Teve o sonho interrompido; o Projeto Expurgo é a segunda chance."
  },
  {
    id: "esforcado",
    name: "Esforçado",
    emoji: "💪",
    attribute: "+3 FÍS",
    effect: "Nos níveis que ganharia Atributo → recebe +2 extras",
    description: "Sem talento, venceu na raça: treino puro e dedicação."
  }
];

export function CharacterOrigins({ selectedOrigin, onOriginSelect }: CharacterOriginsProps) {
  const [showAllOrigins, setShowAllOrigins] = useState(false);
  
  const visibleOrigins = showAllOrigins ? ORIGINS : ORIGINS.slice(0, 6);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-oswald font-semibold text-red-400 tracking-wider">
          ORIGEM DO SOBREVIVENTE
        </h3>
        {ORIGINS.length > 6 && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowAllOrigins(!showAllOrigins)}
            className="text-red-400 border-red-600 hover:bg-red-900/20"
          >
            {showAllOrigins ? 'Ver Menos' : `Ver Todas (${ORIGINS.length})`}
          </Button>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {visibleOrigins.map((origin) => (
          <Card
            key={origin.id}
            className={`cursor-pointer transition-all duration-200 border-2 ${
              selectedOrigin === origin.id
                ? 'border-red-500 bg-red-900/30'
                : 'border-gray-700 hover:border-red-700/50 bg-gray-800/50'
            }`}
            onClick={() => onOriginSelect(origin.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{origin.emoji}</span>
                  <h4 className="font-oswald font-semibold text-white text-sm">
                    {origin.name}
                  </h4>
                </div>
                <Badge
                  variant="outline"
                  className="text-xs bg-red-900/30 border-red-600 text-red-300"
                >
                  {origin.attribute}
                </Badge>
              </div>
              
              <p className="text-xs text-gray-300 mb-2 leading-tight">
                {origin.description}
              </p>
              
              <div className="mt-2 p-2 bg-gray-900/50 rounded border border-gray-700">
                <p className="text-xs text-red-300 font-medium">
                  <span className="font-semibold">Efeito:</span> {origin.effect}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {selectedOrigin && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-700 rounded">
          <p className="text-sm text-red-300">
            <span className="font-semibold">Origem Selecionada:</span> {ORIGINS.find(o => o.id === selectedOrigin)?.name}
          </p>
        </div>
      )}
    </div>
  );
}