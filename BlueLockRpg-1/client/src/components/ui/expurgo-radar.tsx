import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface ExpurgoRadarProps {
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

export default function ExpurgoRadar({ stats, onStatChange, readonly = false, remainingPoints = 0 }: ExpurgoRadarProps) {
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
  
  const statKeys = ['speed', 'strength', 'stamina', 'shooting', 'passing', 'dribbling'];
  const statValues = hexagonValues;

  const data = {
    labels: statLabels,
    datasets: [
      {
        label: 'Player Stats',
        data: statValues,
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(239, 68, 68, 1)',
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 100,
        ticks: {
          stepSize: 20,
          color: 'rgba(100, 116, 139, 0.6)',
          font: {
            size: 10,
            family: 'Orbitron, monospace',
            weight: 'normal' as const,
          },
          backdropColor: 'transparent',
          showLabelBackdrop: false,
        },
        grid: {
          color: 'rgba(100, 116, 139, 0.5)',
          lineWidth: 2,
        },
        angleLines: {
          color: 'rgba(100, 116, 139, 0.5)',
          lineWidth: 2,
        },
        pointLabels: {
          color: '#e2e8f0',
          font: {
            size: 12,
            family: 'Orbitron, monospace',
            weight: 'bold' as const,
          },
          padding: 20,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ef4444',
        bodyColor: '#e2e8f0',
        borderColor: '#ef4444',
        borderWidth: 1,
        titleFont: {
          family: 'Orbitron, monospace',
          size: 11,
          weight: 'bold' as const,
        },
        bodyFont: {
          family: 'Orbitron, monospace',
          size: 10,
        },
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.r;
            const rank = getStatRank(value);
            return `${context.label}: ${value} (${rank})`;
          },
        },
      },
    },
    onHover: (event: any, activeElements: any) => {
      if (event.native && event.native.target) {
        event.native.target.style.cursor = readonly ? 'default' : 'pointer';
      }
    },
    onClick: (event: any, activeElements: any) => {
      if (readonly || !onStatChange || activeElements.length === 0) return;
      
      const element = activeElements[0];
      const statKey = statKeys[element.index];
      const currentValue = statValues[element.index];
      
      // Incrementar valor em 10 pontos (máximo 100)
      const newValue = Math.min(100, currentValue + 10);
      onStatChange(statKey, newValue);
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-gray-900 rounded-lg p-6 border border-red-500/20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-red-400 font-bebas font-bold text-lg tracking-wider">ATRIBUTOS</h3>
          <div className="text-xs text-gray-400 font-oswald">
            {readonly ? 'VISUALIZAÇÃO' : 'CLIQUE PARA MODIFICAR'}
          </div>
        </div>

        <div className="flex flex-col items-center gap-6">
          {/* Radar Chart - Centralized like the hexagon */}
          <div className="relative" style={{ width: '400px', height: '400px' }}>
            <Radar data={data} options={options} />
          </div>

          {/* Stats Values Display - Positioned in a grid like the original */}
          <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
            {statKeys.map((key, index) => {
              const value = statValues[index];
              const rank = getStatRank(value);
              const color = getRankColor(rank);
              
              return (
                <div key={key} className="text-center">
                  <div className="text-xs text-slate-300 font-orbitron font-bold mb-2 uppercase">
                    {statLabels[index]}
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <div 
                      className="w-8 h-8 rounded-full border-2 border-slate-500 flex items-center justify-center text-sm font-bold shadow-md"
                      style={{ backgroundColor: color, color: '#000' }}
                    >
                      {rank}
                    </div>
                    <span className="text-lg font-bold text-slate-200">
                      {value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pontos Restantes - positioned below like the original */}
          {!readonly && remainingPoints !== undefined && (
            <div className="bg-yellow-600/20 border border-yellow-500 rounded-lg p-3">
              <div className="text-center">
                <div className="text-xs text-yellow-400 font-orbitron font-bold mb-1">PONTOS RESTANTES:</div>
                <div className="text-2xl text-yellow-400 font-orbitron font-bold">
                  {remainingPoints}
                </div>
              </div>
            </div>
          )}

          {/* Additional information sections */}
          <div className="w-full max-w-md space-y-2">
            {/* Rank Scale - Dark theme */}
            <div className="bg-slate-800 rounded-lg p-3 border border-slate-700">
              <div className="text-xs text-slate-300 font-orbitron font-bold mb-2 text-center">ESCALA DE RANK</div>
              <div className="grid grid-cols-4 gap-1 text-xs text-slate-400">
                <div className="text-center">S: 90-100</div>
                <div className="text-center">A: 80-89</div>
                <div className="text-center">B: 70-79</div>
                <div className="text-center">C: 60-69</div>
                <div className="text-center">D: 50-59</div>
                <div className="text-center">E: 40-49</div>
                <div className="text-center">F: 30-39</div>
                <div className="text-center">G: 0-29</div>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Stat Controls - Organized like in the image */}
        {!readonly && (
          <div className="mt-6 w-full max-w-4xl">
            <h4 className="text-red-400 font-bebas font-bold text-lg mb-6 text-center tracking-wider">AJUSTAR ATRIBUTOS</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Atributos Físicos */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-red-500/20">
                <h5 className="text-red-400 font-oswald font-bold text-sm mb-4">FÍSICOS</h5>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-slate-300 font-orbitron font-bold min-w-[100px]">
                      VELOCIDADE:
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={stats.speed}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        const currentValue = stats.speed;
                        const difference = newValue - currentValue;
                        
                        if (difference <= 0 || difference <= remainingPoints) {
                          onStatChange?.('speed', newValue);
                        }
                      }}
                      className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${stats.speed}%, #475569 ${stats.speed}%, #475569 100%)`
                      }}
                    />
                    <span className="text-xs text-red-400 font-oswald font-bold min-w-[30px]">
                      {stats.speed}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-slate-300 font-orbitron font-bold min-w-[100px]">
                      FORÇA:
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={stats.strength}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        const currentValue = stats.strength;
                        const difference = newValue - currentValue;
                        
                        if (difference <= 0 || difference <= remainingPoints) {
                          onStatChange?.('strength', newValue);
                        }
                      }}
                      className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #10b981 0%, #10b981 ${stats.strength}%, #475569 ${stats.strength}%, #475569 100%)`
                      }}
                    />
                    <span className="text-xs text-green-400 font-orbitron font-bold min-w-[30px]">
                      {stats.strength}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-slate-300 font-orbitron font-bold min-w-[100px]">
                      RESISTÊNCIA:
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={stats.stamina}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        const currentValue = stats.stamina;
                        const difference = newValue - currentValue;
                        
                        if (difference <= 0 || difference <= remainingPoints) {
                          onStatChange?.('stamina', newValue);
                        }
                      }}
                      className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${stats.stamina}%, #475569 ${stats.stamina}%, #475569 100%)`
                      }}
                    />
                    <span className="text-xs text-yellow-400 font-orbitron font-bold min-w-[30px]">
                      {stats.stamina}
                    </span>
                  </div>
                </div>
              </div>

              {/* Atributos Técnicos */}
              <div className="bg-gray-800/50 rounded-lg p-4 border border-red-500/20">
                <h5 className="text-red-400 font-oswald font-bold text-sm mb-4">TÉCNICOS</h5>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-slate-300 font-orbitron font-bold min-w-[100px]">
                      CHUTE:
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={stats.shooting}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        const currentValue = stats.shooting;
                        const difference = newValue - currentValue;
                        
                        if (difference <= 0 || difference <= remainingPoints) {
                          onStatChange?.('shooting', newValue);
                        }
                      }}
                      className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #ef4444 0%, #ef4444 ${stats.shooting}%, #475569 ${stats.shooting}%, #475569 100%)`
                      }}
                    />
                    <span className="text-xs text-red-400 font-orbitron font-bold min-w-[30px]">
                      {stats.shooting}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-slate-300 font-orbitron font-bold min-w-[100px]">
                      PASSE:
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={stats.passing}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        const currentValue = stats.passing;
                        const difference = newValue - currentValue;
                        
                        if (difference <= 0 || difference <= remainingPoints) {
                          onStatChange?.('passing', newValue);
                        }
                      }}
                      className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #a855f7 0%, #a855f7 ${stats.passing}%, #475569 ${stats.passing}%, #475569 100%)`
                      }}
                    />
                    <span className="text-xs text-purple-400 font-orbitron font-bold min-w-[30px]">
                      {stats.passing}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-slate-300 font-orbitron font-bold min-w-[100px]">
                      DRIBLE:
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={stats.dribbling}
                      onChange={(e) => {
                        const newValue = parseInt(e.target.value);
                        const currentValue = stats.dribbling;
                        const difference = newValue - currentValue;
                        
                        if (difference <= 0 || difference <= remainingPoints) {
                          onStatChange?.('dribbling', newValue);
                        }
                      }}
                      className="flex-1 h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #22d3ee 0%, #22d3ee ${stats.dribbling}%, #475569 ${stats.dribbling}%, #475569 100%)`
                      }}
                    />
                    <span className="text-xs text-cyan-400 font-orbitron font-bold min-w-[30px]">
                      {stats.dribbling}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}