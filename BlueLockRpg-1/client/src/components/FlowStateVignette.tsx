import { motion } from "framer-motion";

interface FlowStateVignetteProps {
  isActive: boolean;
  flowColor: string;
}

export default function FlowStateVignette({ isActive, flowColor }: FlowStateVignetteProps) {
  if (!isActive) return null;

  const getFlowColorClasses = (color: string) => {
    const colorMap = {
      cyan: "from-cyan-400/20 via-transparent to-cyan-400/20",
      purple: "from-purple-400/20 via-transparent to-purple-400/20",
      red: "from-red-400/20 via-transparent to-red-400/20",
      blue: "from-blue-400/20 via-transparent to-blue-400/20",
      green: "from-green-400/20 via-transparent to-green-400/20",
      yellow: "from-yellow-400/20 via-transparent to-yellow-400/20",
      orange: "from-orange-400/20 via-transparent to-orange-400/20",
      pink: "from-pink-400/20 via-transparent to-pink-400/20"
    };
    return colorMap[color as keyof typeof colorMap] || "from-cyan-400/20 via-transparent to-cyan-400/20";
  };

  const getGlowColor = (color: string) => {
    const glowMap = {
      cyan: "rgba(34, 211, 238, 0.7)",
      purple: "rgba(168, 85, 247, 0.7)",
      red: "rgba(248, 113, 113, 0.7)",
      blue: "rgba(96, 165, 250, 0.7)",
      green: "rgba(52, 211, 153, 0.7)",
      yellow: "rgba(251, 191, 36, 0.7)",
      orange: "rgba(251, 146, 60, 0.7)",
      pink: "rgba(244, 114, 182, 0.7)"
    };
    return glowMap[color as keyof typeof glowMap] || "rgba(34, 211, 238, 0.7)";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 pointer-events-none z-40"
    >
      {/* Vinheta principal com brilho piscando */}
      <motion.div
        animate={{
          opacity: [0.5, 0.9, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, transparent 30%, ${getGlowColor(flowColor)} 100%)`
        }}
      />
      
      {/* Camada adicional de brilho para intensificar o efeito */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, transparent 50%, ${getGlowColor(flowColor)} 100%)`
        }}
      />
    </motion.div>
  );
}