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
  
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 120;
  
    // Criar pontos do hexágono dos dados
    const dataPoints = hexagonValues.map((value, index) => 
      getHexagonPoint(value, index, centerX, centerY, maxRadius)
    );
  
    // Criar path do hexágono
    const dataPath = `M ${dataPoints[0].x} ${dataPoints[0].y} ` +
      dataPoints.slice(1).map(point => `L ${point.x} ${point.y}`).join(' ') + ' Z';
  
    // Cores dos atributos
    const statColors = {
      speed: '#ff6b6b',      // vermelho
      strength: '#4ecdc4',   // ciano
      stamina: '#45b7d1',    // azul
      shooting: '#96ceb4',   // verde
      passing: '#feca57',    // amarelo
      dribbling: '#ff9ff3'   // rosa
    };
  
    return (
      <div className="w-full bg-gray-900 rounded-lg p-6">
        {/* Título */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-white mb-2">BLUE LOCK RADAR</h3>
          <p className="text-gray-400">Sistema de Análise de Atributos</p>
        </div>
  
        {/* SVG Radar Chart */}
        <div className="flex justify-center mb-8">
          <svg width="300" height="300" className="drop-shadow-lg">
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
                  stroke="rgba(255, 255, 255, 0.1)"
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
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="1"
                />
              );
            })}
  
            {/* Área preenchida dos dados */}
            <path
              d={dataPath}
              fill="rgba(79, 172, 254, 0.2)"
              stroke="#4facfe"
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
                fill="#4facfe"
                stroke="#ffffff"
                strokeWidth="2"
              />
            ))}
  
            {/* Labels dos atributos */}
            {statLabels.map((label, index) => {
              const labelPoint = getGridPoint(index, centerX, centerY, maxRadius + 30);
              const rank = getStatRank(hexagonValues[index]);
              const color = getRankColor(rank);
              
              return (
                <g key={index}>
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm font-bold fill-white"
                    style={{ fontSize: '12px' }}
                  >
                    {label}
                  </text>
                  <text
                    x={labelPoint.x}
                    y={labelPoint.y + 15}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-bold"
                    style={{ fontSize: '10px', fill: color }}
                  >
                    {rank} ({hexagonValues[index]})
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
  
        {/* Controles dos Atributos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* FÍSICOS */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white text-center border-b border-gray-600 pb-2">FÍSICOS</h4>
            
            {/* Velocidade */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">VELOCIDADE</span>
                <span className="text-white bg-gray-700 px-2 py-1 rounded text-sm">{stats.speed}</span>
              </div>
              {!readonly && (
                <Slider
                  value={[stats.speed]}
                  onValueChange={(value) => onStatChange?.('speed', value[0])}
                  max={100}
                  step={1}
                  className="slider-red"
                  style={{
                    '--slider-thumb-color': statColors.speed,
                    '--slider-track-color': `${statColors.speed}40`
                  } as React.CSSProperties}
                />
              )}
            </div>
  
            {/* Força */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">FORÇA</span>
                <span className="text-white bg-gray-700 px-2 py-1 rounded text-sm">{stats.strength}</span>
              </div>
              {!readonly && (
                <Slider
                  value={[stats.strength]}
                  onValueChange={(value) => onStatChange?.('strength', value[0])}
                  max={100}
                  step={1}
                  className="slider-cyan"
                  style={{
                    '--slider-thumb-color': statColors.strength,
                    '--slider-track-color': `${statColors.strength}40`
                  } as React.CSSProperties}
                />
              )}
            </div>
  
            {/* Resistência */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">RESISTÊNCIA</span>
                <span className="text-white bg-gray-700 px-2 py-1 rounded text-sm">{stats.stamina}</span>
              </div>
              {!readonly && (
                <Slider
                  value={[stats.stamina]}
                  onValueChange={(value) => onStatChange?.('stamina', value[0])}
                  max={100}
                  step={1}
                  className="slider-blue"
                  style={{
                    '--slider-thumb-color': statColors.stamina,
                    '--slider-track-color': `${statColors.stamina}40`
                  } as React.CSSProperties}
                />
              )}
            </div>
          </div>
  
          {/* TÉCNICOS */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-white text-center border-b border-gray-600 pb-2">TÉCNICOS</h4>
            
            {/* Chute */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">CHUTE</span>
                <span className="text-white bg-gray-700 px-2 py-1 rounded text-sm">{stats.shooting}</span>
              </div>
              {!readonly && (
                <Slider
                  value={[stats.shooting]}
                  onValueChange={(value) => onStatChange?.('shooting', value[0])}
                  max={100}
                  step={1}
                  className="slider-green"
                  style={{
                    '--slider-thumb-color': statColors.shooting,
                    '--slider-track-color': `${statColors.shooting}40`
                  } as React.CSSProperties}
                />
              )}
            </div>
  
            {/* Passe */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">PASSE</span>
                <span className="text-white bg-gray-700 px-2 py-1 rounded text-sm">{stats.passing}</span>
              </div>
              {!readonly && (
                <Slider
                  value={[stats.passing]}
                  onValueChange={(value) => onStatChange?.('passing', value[0])}
                  max={100}
                  step={1}
                  className="slider-yellow"
                  style={{
                    '--slider-thumb-color': statColors.passing,
                    '--slider-track-color': `${statColors.passing}40`
                  } as React.CSSProperties}
                />
              )}
            </div>
  
            {/* Drible */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-white font-medium">DRIBLE</span>
                <span className="text-white bg-gray-700 px-2 py-1 rounded text-sm">{stats.dribbling}</span>
              </div>
              {!readonly && (
                <Slider
                  value={[stats.dribbling]}
                  onValueChange={(value) => onStatChange?.('dribbling', value[0])}
                  max={100}
                  step={1}
                  className="slider-pink"
                  style={{
                    '--slider-thumb-color': statColors.dribbling,
                    '--slider-track-color': `${statColors.dribbling}40`
                  } as React.CSSProperties}
                />
              )}
            </div>
          </div>
        </div>
  
        {/* Pontos Restantes */}
        {!readonly && (
          <div className="mt-6 text-center">
            <span className="text-white text-lg">
              Pontos Restantes: <span className="font-bold text-blue-400">{remainingPoints}</span>
            </span>
          </div>
        )}
      </div>
    );
  }