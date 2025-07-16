import React from 'react';
import { Slider } from "@/components/ui/slider";

interface BlueLockRadarProps {
  stats: {
    speed: number;
    strength: number;
    stamina: number;
    shooting: number;
    passing: number;
    dribbling: number;
  };
  onStatChange?: (stat: string, value: number) => void;
  readonly?: boolean;
  remainingPoints?: number;
}

const getStatRank = (value: number): string => {
  if (value >= 90) return 'S';
  if (value >= 80) return 'A';
  if (value >= 70) return 'B';
  if (value >= 60) return 'C';
  if (value >= 50) return 'D';
  if (value >= 40) return 'E';
  if (value >= 30) return 'F';
  return 'G';
};

const getRankColor = (rank: string): string => {
  switch (rank) {
    case 'S': return '#ff6b6b';
    case 'A': return '#4ecdc4';
    case 'B': return '#45b7d1';
    case 'C': return '#96ceb4';
    case 'D': return '#feca57';
    case 'E': return '#ff9ff3';
    case 'F': return '#54a0ff';
    default: return '#5f27cd';
  }
};

export default function BlueLockRadar({ stats, onStatChange, readonly = false, remainingPoints = 0 }: BlueLockRadarProps) {
  // Mapeamento correto: Físicos e Técnicos como na imagem do Blue Lock
  const statLabels = ['VELOCIDADE', 'DEFESA', 'OFENSA', 'CHUTE', 'PASSE', 'DRIBLE'];
  
  // Calcular os valores do hexágono baseado nos atributos básicos com lógica de influência
  const hexagonValues = [
    stats.speed, // SPEED = velocidade diretamente
    Math.round((stats.strength + stats.stamina) / 2), // DEFENSE = (força + resistência) / 2
    Math.round((stats.shooting + stats.stamina) / 2), // OFFENSE = (chute + resistência) / 2  
    stats.shooting, // SHOOT = chute diretamente
    stats.passing, // PASS = passe diretamente
    stats.dribbling // DRIBBLE = drible diretamente
  ];

  // Função para calcular pontos do hexágono
  const getHexagonPoint = (value: number, index: number, centerX: number, centerY: number, radius: number) => {
    const angle = (index * 60 - 90) * (Math.PI / 180); // -90 para começar no topo
    const distance = (value / 100) * radius;
    return {
      x: centerX + Math.cos(angle) * distance,
      y: centerY + Math.sin(angle) * distance
    };
  };

  // Função para calcular pontos das grades do hexágono
  const getGridPoint = (index: number, centerX: number, centerY: number, radius: number) => {
    const angle = (index * 60 - 90) * (Math.PI / 180);
    return {
      x: centerX + Math.cos(angle) * radius,
      y: centerY + Math.sin(angle) * radius
    };
  };

  const centerX = 200;
  const centerY = 200;
  const maxRadius = 140;

  // Criar pontos do hexágono dos dados
  const dataPoints = hexagonValues.map((value, index) => 
    getHexagonPoint(value, index, centerX, centerY, maxRadius)
  );

  // Criar path do hexágono
  const dataPath = `M ${dataPoints[0].x} ${dataPoints[0].y} ` +
    dataPoints.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ') + ' Z';

  // Cores dos atributos para sliders
  const sliderColors = {
    speed: '#3b82f6',      // azul
    strength: '#10b981',   // verde
    stamina: '#f59e0b',    // laranja
    shooting: '#ef4444',   // vermelho
    passing: '#8b5cf6',    // roxo
    dribbling: '#06b6d4'   // ciano
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg p-6 border border-blue-500/30">
      {/* Título "ATRIBUTOS" no canto superior esquerdo */}
      <div className="mb-6">
        <h2 className="text-blue-400 text-lg font-bold">ATRIBUTOS</h2>
      </div>

      {/* Radar Chart Section */}
      <div className="mb-8">
        {/* Título Central */}
        <div className="text-center mb-6">
          <h3 className="text-white text-2xl font-bold mb-2">BLUE LOCK RADAR</h3>
          <p className="text-gray-400 text-sm">Sistema de Análise de Atributos</p>
        </div>

        {/* SVG Radar Chart */}
        <div className="flex justify-center mb-6">
          <svg width="400" height="400" className="drop-shadow-lg">
            {/* Grades do hexágono */}
            {[20, 40, 60, 80, 100].map((percentage) => {
              const radius = (percentage / 100) * maxRadius;
              const gridPoints = Array.from({ length: 6 }, (_, index) => 
                getGridPoint(index, centerX, centerY, radius)
              );
              const gridPath = `M ${gridPoints[0].x} ${gridPoints[0].y} ` +
                gridPoints.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ') + ' Z';
              
              return (
                <path
                  key={percentage}
                  d={gridPath}
                  fill="none"
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Linhas radiais */}
            {Array.from({ length: 6 }, (_, index) => {
              const point = getGridPoint(index, centerX, centerY, maxRadius);
              return (
                <line
                  key={index}
                  x1={centerX}
                  y1={centerY}
                  x2={point.x}
                  y2={point.y}
                  stroke="rgba(59, 130, 246, 0.2)"
                  strokeWidth="1"
                />
              );
            })}

            {/* Área preenchida dos dados */}
            <path
              d={dataPath}
              fill="rgba(59, 130, 246, 0.2)"
              stroke="#3b82f6"
              strokeWidth="3"
              strokeLinejoin="round"
            />

            {/* Pontos dos dados */}
            {dataPoints.map((point, index) => (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="6"
                fill="#3b82f6"
                stroke="#ffffff"
                strokeWidth="2"
              />
            ))}

            {/* Labels dos atributos */}
            {statLabels.map((label, index) => {
              const labelPoint = getGridPoint(index, centerX, centerY, maxRadius + 50);
              const rank = getStatRank(hexagonValues[index]);
              const color = getRankColor(rank);
              
              return (
                <g key={index}>
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y - 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-white font-bold"
                    style={{ fontSize: '12px' }}
                  >
                    {label}
                  </text>
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y + 8}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-bold"
                    style={{ fontSize: '10px', fill: color }}
                  >
                    {rank} ({hexagonValues[index]})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Círculos de Rank dos 6 atributos como na segunda imagem */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {[
            { label: 'VELOCIDADE', value: hexagonValues[0] },
            { label: 'DEFESA', value: hexagonValues[1] },
            { label: 'OFENSA', value: hexagonValues[2] },
            { label: 'CHUTE', value: hexagonValues[3] },
            { label: 'PASSE', value: hexagonValues[4] },
            { label: 'DRIBLE', value: hexagonValues[5] }
          ].map((item, index) => {
            const rank = getStatRank(item.value);
            const color = getRankColor(rank);
            
            return (
              <div key={index} className="text-center">
                <div className="text-white text-sm font-bold mb-2">{item.label}</div>
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto text-white font-bold text-lg border-2"
                  style={{ backgroundColor: color, borderColor: color }}
                >
                  {rank}
                </div>
                <div className="text-white text-sm mt-1">{item.value}</div>
              </div>
            );
          })}
        </div>

        {/* Pontos Restantes */}
        {!readonly && (
          <div className="text-center mb-6">
            <div 
              className="inline-block px-6 py-3 border-2 border-yellow-400 rounded-lg"
              style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)' }}
            >
              <span className="text-yellow-400 text-lg font-bold">
                PONTOS RESTANTES: {remainingPoints}
              </span>
            </div>
          </div>
        )}

        {/* Escala de Rank */}
        <div className="mb-8">
          <div className="text-center mb-4">
            <h4 className="text-gray-400 text-sm font-bold">ESCALA DE RANK</h4>
          </div>
          <div className="grid grid-cols-4 gap-4 text-xs text-gray-400">
            <div>S: 90-100</div>
            <div>A: 80-89</div>
            <div>B: 70-79</div>
            <div>C: 60-69</div>
            <div>D: 50-59</div>
            <div>E: 40-49</div>
            <div>F: 30-39</div>
            <div>G: 0-29</div>
          </div>
        </div>
      </div>

      {/* Título "AJUSTAR ATRIBUTOS" */}
      <div className="text-center mb-6">
        <h3 className="text-blue-400 text-xl font-bold">AJUSTAR ATRIBUTOS</h3>
      </div>

      {/* Controles dos Atributos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* FÍSICOS */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-blue-500/20">
          <h4 className="text-blue-400 text-lg font-bold text-center mb-6 border-b border-gray-600 pb-3">FÍSICOS</h4>
          
          {/* Velocidade */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium text-sm">VELOCIDADE:</span>
              <span className="text-white bg-gray-700 px-3 py-1 rounded text-sm">{stats.speed}</span>
            </div>
            {!readonly && (
              <div className="relative">
                <Slider
                  value={[stats.speed]}
                  onValueChange={(value) => onStatChange?.('speed', value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div 
                  className="absolute top-0 left-0 h-2 rounded-full"
                  style={{ 
                    width: `${stats.speed}%`,
                    backgroundColor: sliderColors.speed
                  }}
                />
              </div>
            )}
          </div>

          {/* Força */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium text-sm">FORÇA:</span>
              <span className="text-white bg-gray-700 px-3 py-1 rounded text-sm">{stats.strength}</span>
            </div>
            {!readonly && (
              <div className="relative">
                <Slider
                  value={[stats.strength]}
                  onValueChange={(value) => onStatChange?.('strength', value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div 
                  className="absolute top-0 left-0 h-2 rounded-full"
                  style={{ 
                    width: `${stats.strength}%`,
                    backgroundColor: sliderColors.strength
                  }}
                />
              </div>
            )}
          </div>

          {/* Resistência */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium text-sm">RESISTÊNCIA:</span>
              <span className="text-white bg-gray-700 px-3 py-1 rounded text-sm">{stats.stamina}</span>
            </div>
            {!readonly && (
              <div className="relative">
                <Slider
                  value={[stats.stamina]}
                  onValueChange={(value) => onStatChange?.('stamina', value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div 
                  className="absolute top-0 left-0 h-2 rounded-full"
                  style={{ 
                    width: `${stats.stamina}%`,
                    backgroundColor: sliderColors.stamina
                  }}
                />
              </div>
            )}
          </div>
        </div>

        {/* TÉCNICOS */}
        <div className="bg-gray-800/50 rounded-lg p-6 border border-blue-500/20">
          <h4 className="text-blue-400 text-lg font-bold text-center mb-6 border-b border-gray-600 pb-3">TÉCNICOS</h4>
          
          {/* Chute */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium text-sm">CHUTE:</span>
              <span className="text-white bg-gray-700 px-3 py-1 rounded text-sm">{stats.shooting}</span>
            </div>
            {!readonly && (
              <div className="relative">
                <Slider
                  value={[stats.shooting]}
                  onValueChange={(value) => onStatChange?.('shooting', value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div 
                  className="absolute top-0 left-0 h-2 rounded-full"
                  style={{ 
                    width: `${stats.shooting}%`,
                    backgroundColor: sliderColors.shooting
                  }}
                />
              </div>
            )}
          </div>

          {/* Passe */}
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium text-sm">PASSE:</span>
              <span className="text-white bg-gray-700 px-3 py-1 rounded text-sm">{stats.passing}</span>
            </div>
            {!readonly && (
              <div className="relative">
                <Slider
                  value={[stats.passing]}
                  onValueChange={(value) => onStatChange?.('passing', value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div 
                  className="absolute top-0 left-0 h-2 rounded-full"
                  style={{ 
                    width: `${stats.passing}%`,
                    backgroundColor: sliderColors.passing
                  }}
                />
              </div>
            )}
          </div>

          {/* Drible */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-white font-medium text-sm">DRIBLE:</span>
              <span className="text-white bg-gray-700 px-3 py-1 rounded text-sm">{stats.dribbling}</span>
            </div>
            {!readonly && (
              <div className="relative">
                <Slider
                  value={[stats.dribbling]}
                  onValueChange={(value) => onStatChange?.('dribbling', value[0])}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div 
                  className="absolute top-0 left-0 h-2 rounded-full"
                  style={{ 
                    width: `${stats.dribbling}%`,
                    backgroundColor: sliderColors.dribbling
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}