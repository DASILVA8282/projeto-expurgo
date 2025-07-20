import { motion } from "framer-motion";
import { Target, Zap, Brain, Users, Star, Plus, Minus } from "lucide-react";
import { Button } from "./button";

interface AttributeSystemProps {
  attributes: {
    fisico: number;
    velocidade: number;
    intelecto: number;
    carisma: number;
    egoismo: number;
  };
  onAttributeChange: (attribute: string, value: number) => void;
  remainingPoints: number;
}

export function AttributeSystem({ attributes, onAttributeChange, remainingPoints }: AttributeSystemProps) {
  const attributeInfo = [
    {
      name: "fisico",
      displayName: "FÍSICO",
      description: "Força bruta e resistência",
      icon: Target,
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "velocidade", 
      displayName: "VELOCIDADE",
      description: "Reflexos, agilidade e resposta rápida",
      icon: Zap,
      color: "text-red-400",
      bgColor: "bg-red-800/20", 
      borderColor: "border-red-700/30"
    },
    {
      name: "intelecto",
      displayName: "INTELECTO", 
      description: "Estratégia, leitura de jogo e tomada de decisão",
      icon: Brain,
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "carisma",
      displayName: "CARISMA",
      description: "Como lida com a fama, fãs e relações fora de campo",
      icon: Users,
      color: "text-red-400", 
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    },
    {
      name: "egoismo",
      displayName: "EGOÍSMO",
      description: "Sua ambição individual — a fome de ser o número 1",
      icon: Star,
      color: "text-red-400",
      bgColor: "bg-red-800/20",
      borderColor: "border-red-700/30"
    }
  ];

  const handleIncrease = (attributeName: string) => {
    const currentValue = attributes[attributeName as keyof typeof attributes];
    if (remainingPoints > 0 && currentValue < 5) {
      onAttributeChange(attributeName, currentValue + 1);
    }
  };

  const handleDecrease = (attributeName: string) => {
    const currentValue = attributes[attributeName as keyof typeof attributes];
    if (currentValue > 1) {
      onAttributeChange(attributeName, currentValue - 1);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="font-bebas text-2xl text-red-400 tracking-wider mb-2">ATRIBUTOS</h3>
        <p className="text-gray-300 font-oswald">
          Definem o limite das capacidades do seu sobrevivente.<br/>
          <span className="text-red-400 font-bold">Você tem {remainingPoints} pontos restantes para distribuir.</span>
        </p>
      </div>

      <div className="grid gap-4">
        {attributeInfo.map((attr) => {
          const IconComponent = attr.icon;
          const currentValue = attributes[attr.name as keyof typeof attributes];
          
          return (
            <motion.div
              key={attr.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${attr.bgColor} ${attr.borderColor} border rounded-lg p-4`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <IconComponent className={`w-6 h-6 ${attr.color}`} />
                  <div>
                    <h4 className={`font-bebas text-lg ${attr.color} tracking-wide`}>
                      {attr.displayName}
                    </h4>
                    <p className="text-gray-300 font-oswald text-sm">
                      {attr.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDecrease(attr.name)}
                    disabled={currentValue <= 1}
                    className="h-8 w-8 p-0 hover:bg-red-700/30 disabled:opacity-30"
                  >
                    <Minus className="w-4 h-4 text-red-400" />
                  </Button>
                  
                  <div className="flex items-center gap-1 min-w-[100px] justify-center">
                    {[1, 2, 3, 4, 5].map((dot) => (
                      <div
                        key={dot}
                        className={`w-3 h-3 rounded-full border-2 ${
                          dot <= currentValue
                            ? "bg-red-500 border-red-500"
                            : "border-red-700/50"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleIncrease(attr.name)}
                    disabled={currentValue >= 5 || remainingPoints <= 0}
                    className="h-8 w-8 p-0 hover:bg-red-700/30 disabled:opacity-30"
                  >
                    <Plus className="w-4 h-4 text-red-400" />
                  </Button>
                </div>
              </div>
              
              <div className="text-center">
                <span className="font-bebas text-xl text-red-400">
                  NÍVEL {currentValue}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Points Summary */}
      <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-oswald font-bold text-red-400">PONTOS DISTRIBUÍDOS:</span>
          <span className="font-bebas text-lg font-bold text-red-400">
            {15 - remainingPoints}/15
          </span>
        </div>
        {remainingPoints === 0 && (
          <p className="text-gray-300 font-oswald text-sm mt-2 text-center">
            ✓ Todos os pontos foram distribuídos
          </p>
        )}
      </div>
    </div>
  );
}