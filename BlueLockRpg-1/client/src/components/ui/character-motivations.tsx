import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const MOTIVATIONS = {
  "O Topo": {
    emoji: "🏆",
    description: "Você anseia ser o melhor; estar no pódio, ser reconhecido como o Número 1 do mundo.",
    mechanics: "Ao enfrentar alguém de nível maior, ganha +2 em Perícias Físicas ou Mentais. Enquanto for Número 1, ganha +3 de EGO.",
    quote: "Eu serei o Número 1!"
  },
  "Vingança": {
    emoji: "⚔️",
    description: "Uma frustração do passado, um sonho despedaçado. Você joga para ser melhor que alguém que o desprezou.",
    mechanics: "Contra seu alvo de vingança: +4 em tudo. Pode gastar EGO para Fluxo (7 EGO em 10 rodadas, 10 EGO em 20 rodadas).",
    quote: "Meu motivo de viver é me vingar."
  },
  "Companhia": {
    emoji: "🤝",
    description: "Você se cansou da solidão e busca alguém que o entenda. Procura por uma 'dupla' verdadeira.",
    mechanics: "Com sua dupla, ambos podem gastar 2 FOL para ganhar 1 benefício de Sinergia naquela rodada.",
    quote: "Vamos ser amigos, até ver quem é o maior egoísta!"
  },
  "Necessidade Biológica": {
    emoji: "🧬",
    description: "Futebol não é escolha: a adrenalina e dopamina são necessárias para sua existência.",
    mechanics: "Sempre que gastar 3 CA, recebe 1 Ação Física extra naquele turno (Máximo: 2).",
    quote: "Necessidade Biológica, isso é futebol!"
  },
  "Fama": {
    emoji: "⭐",
    description: "Sua motivação é ser famoso: conseguir dinheiro, posses e status social.",
    mechanics: "Recebe atributo 'Fama' (25% da Estatística Fama) para jogadas bonitas. +9 se usar regra opcional.",
    quote: "Eu quero casar com uma modelo sexy!"
  },
  "Obrigação": {
    emoji: "⚖️",
    description: "Você joga por obrigação: sustentar família, pressão familiar, pagar dívidas.",
    mechanics: "Em situações que podem prejudicar seu futuro, gaste 5 FOL para rolar 1d3 e ganhar dados extras.",
    quote: "O que eu realmente quero pra minha vida?"
  },
  "Reconhecimento": {
    emoji: "❤️",
    description: "Você luta para ser amado e reconhecido; quer que o mundo saiba seu nome.",
    mechanics: "Recebe 1 Melhoria extra no Fluxo quando lutar pela sua Motivação.",
    quote: "Eu quero ser Amado..."
  },
  "Devorar": {
    emoji: "🦈",
    description: "Seu objetivo é esmagar sonhos dos adversários: fazê-los se sentirem inferiores.",
    mechanics: "Pode gastar 5 FOL para trocar qualquer teste por 'Devorar' (ganha essa Perícia Especial se não tinha).",
    quote: "Devorando todos, tipo um Egoísta."
  }
};

interface CharacterMotivationsProps {
  selectedMotivation: string;
  onMotivationChange: (motivation: string) => void;
}

export function CharacterMotivations({ selectedMotivation, onMotivationChange }: CharacterMotivationsProps) {
  const currentMotivation = selectedMotivation ? MOTIVATIONS[selectedMotivation as keyof typeof MOTIVATIONS] : null;

  return (
    <div className="space-y-6">
      <div>
        <Label className="text-red-400 font-bebas text-lg mb-3 block tracking-wider">
          MOTIVAÇÃO DO SOBREVIVENTE
        </Label>
        
        <Select value={selectedMotivation} onValueChange={onMotivationChange}>
          <SelectTrigger className="w-full bg-gray-800 border-red-600 text-white font-oswald">
            <SelectValue placeholder="Selecione sua motivação..." />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-red-600">
            {Object.entries(MOTIVATIONS).map(([name, data]) => (
              <SelectItem key={name} value={name} className="text-white hover:bg-red-700/30 font-oswald">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{data.emoji}</span>
                  <span>{name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {currentMotivation && (
        <Card className="bg-red-950/30 border-red-800">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-3 text-red-400 font-bebas text-xl tracking-wider">
              <span className="text-2xl">{currentMotivation.emoji}</span>
              {selectedMotivation}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-red-300 font-oswald font-semibold mb-2">DESCRIÇÃO:</h4>
              <p className="text-gray-300 font-oswald text-sm leading-relaxed">
                {currentMotivation.description}
              </p>
            </div>
            
            <div>
              <h4 className="text-red-300 font-oswald font-semibold mb-2">MECÂNICAS:</h4>
              <p className="text-gray-300 font-oswald text-sm leading-relaxed">
                {currentMotivation.mechanics}
              </p>
            </div>
            
            <div className="pt-2 border-t border-red-800">
              <p className="text-amber-400 font-oswald text-sm italic text-center">
                "{currentMotivation.quote}"
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}