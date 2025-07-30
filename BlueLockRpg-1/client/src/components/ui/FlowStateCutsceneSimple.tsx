import { useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Zap, Star } from "lucide-react";

interface FlowStateCutsceneProps {
  isActive: boolean;
  playerName: string;
  flowColor: string;
  flowPhrase?: string;
  onComplete: () => void;
}

export default function FlowStateCutsceneSimple({ 
  isActive, 
  playerName, 
  flowColor,
  flowPhrase = "É hora de dominar o campo!",
  onComplete 
}: FlowStateCutsceneProps) {
  
  useEffect(() => {
    if (isActive) {
      console.log("🎬 Epic Flow State cutscene starting - 4 seconds...");
      const timer = setTimeout(() => {
        console.log("🎬 Epic Flow State cutscene completing now!");
        onComplete();
      }, 4000);
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  const getFlowColors = (color: string) => {
    const colorMap = {
      cyan: {
        primary: "#06b6d4",
        secondary: "#22d3ee", 
        accent: "#67e8f9",
        dark: "#0891b2"
      },
      purple: {
        primary: "#9333ea",
        secondary: "#a855f7",
        accent: "#c084fc", 
        dark: "#7c3aed"
      },
      red: {
        primary: "#dc2626",
        secondary: "#ef4444",
        accent: "#f87171",
        dark: "#b91c1c"
      },
      blue: {
        primary: "#2563eb",
        secondary: "#3b82f6",
        accent: "#60a5fa",
        dark: "#1d4ed8"
      },
      green: {
        primary: "#059669",
        secondary: "#10b981",
        accent: "#34d399",
        dark: "#047857"
      },
      yellow: {
        primary: "#d97706",
        secondary: "#f59e0b",
        accent: "#fbbf24",
        dark: "#b45309"
      },
      orange: {
        primary: "#ea580c",
        secondary: "#f97316",
        accent: "#fb923c",
        dark: "#c2410c"
      },
      pink: {
        primary: "#db2777",
        secondary: "#ec4899",
        accent: "#f472b6",
        dark: "#be185d"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.cyan;
  };

  const colors = getFlowColors(flowColor);

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">
      {/* Fundo gradiente dinâmico */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 30% 20%, ${colors.primary}40 0%, transparent 50%), 
                      radial-gradient(circle at 70% 80%, ${colors.secondary}30 0%, transparent 50%),
                      radial-gradient(circle at 50% 50%, ${colors.dark}20 0%, transparent 70%)`
        }}
      />

      {/* Raios de energia simples */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: [0, 1.5, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatDelay: 1
            }}
            className="absolute"
            style={{
              transformOrigin: "center",
              transform: `rotate(${i * 45}deg)`
            }}
          >
            <div
              className="w-1 h-96"
              style={{
                background: `linear-gradient(to top, ${colors.primary}, ${colors.accent}, transparent)`,
                boxShadow: `0 0 20px ${colors.primary}`
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Partículas de energia */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 0.5, 0],
              x: [
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
                Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920)
              ],
              y: [
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
                Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080)
              ]
            }}
            transition={{
              duration: 3,
              delay: i * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-2 h-2 rounded-full"
            style={{
              backgroundColor: colors.accent,
              boxShadow: `0 0 10px ${colors.accent}`
            }}
          />
        ))}
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 text-center">
        
        {/* Olho épico */}
        <motion.div
          initial={{ scale: 0, rotateY: 180 }}
          animate={{ scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                `0 0 50px ${colors.primary}`,
                `0 0 100px ${colors.secondary}`,
                `0 0 50px ${colors.primary}`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-40 h-40 rounded-full flex items-center justify-center mx-auto relative"
            style={{
              background: `radial-gradient(circle, ${colors.accent} 0%, ${colors.primary} 50%, ${colors.dark} 100%)`,
              border: `3px solid ${colors.secondary}`
            }}
          >
            <Eye className="w-20 h-20 text-white drop-shadow-lg" />
            
            {/* Brilho interno */}
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="absolute inset-2 rounded-full"
              style={{
                background: `radial-gradient(circle, ${colors.accent}60 0%, transparent 70%)`
              }}
            />
          </motion.div>
        </motion.div>

        {/* Nome do jogador */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.h1
            animate={{
              textShadow: [
                `0 0 20px ${colors.primary}`,
                `0 0 40px ${colors.secondary}`,
                `0 0 20px ${colors.primary}`
              ]
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-8xl font-black text-white"
            style={{ 
              color: colors.accent,
              fontFamily: "'Orbitron', monospace"
            }}
          >
            {playerName}
          </motion.h1>
        </motion.div>

        {/* Frase personalizada do jogador */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mb-8"
        >
          <motion.div
            animate={{
              scale: [1, 1.02, 1],
              textShadow: [
                `0 0 20px ${colors.primary}`,
                `0 0 40px ${colors.secondary}`,
                `0 0 20px ${colors.primary}`
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-4xl font-bold text-white px-8 py-4 rounded-lg"
            style={{ 
              fontFamily: "'Rajdhani', sans-serif",
              background: `rgba(0, 0, 0, 0.7)`,
              border: `2px solid ${colors.accent}`,
              boxShadow: `0 0 30px ${colors.primary}50, inset 0 0 20px ${colors.accent}20`
            }}
          >
            <span style={{ color: colors.accent }}>"{flowPhrase}"</span>
          </motion.div>
        </motion.div>

        {/* Texto FLOW STATE */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              textShadow: [
                `0 0 15px ${colors.primary}`,
                `0 0 30px ${colors.secondary}`,
                `0 0 15px ${colors.primary}`
              ]
            }}
            transition={{ duration: 1.8, repeat: Infinity }}
            className="text-6xl font-bold text-white"
            style={{ fontFamily: "'Orbitron', monospace" }}
          >
            <span style={{ color: colors.accent }}>FLOW</span>
            <span className="mx-4" style={{ color: colors.secondary }}>STATE</span>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-4xl font-semibold"
            style={{ 
              color: colors.primary,
              textShadow: `0 0 10px ${colors.primary}`,
              fontFamily: "'Orbitron', monospace"
            }}
          >
            ACTIVATED
          </motion.div>
        </motion.div>

        {/* Ícones de energia */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex justify-center space-x-12 mt-8"
        >
          {[Zap, Star, Zap].map((Icon, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2,
                delay: i * 0.3,
                repeat: Infinity
              }}
            >
              <Icon 
                className="w-8 h-8" 
                style={{ 
                  color: colors.accent,
                  filter: `drop-shadow(0 0 10px ${colors.primary})`
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
