import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, AlertTriangle } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface CesarMonitorProps {
  onClose: () => void;
}

export default function CesarMonitor({ onClose }: CesarMonitorProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showEyes, setShowEyes] = useState(false);
  const [eyesBlink, setEyesBlink] = useState(false);
  const [showSmile, setShowSmile] = useState(false);
  const [glassesGlow, setGlassesGlow] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const fullText = `Atenção, meu caro Expurgador,

Você está prestes a vestir uma nova pele pra entrar no abatedouro. E enfia na sua cabeça de uma vez: o Projeto Expurgo não tem espaço pra ninguém bonzinho. Aqui, fair play não passa de uma piada. O que a gente procura são sobreviventes.

Seu personagem tem que ter fome. Tem que ter a frieza de atacar quando o outro comete um erro, de esmagar quando a mente do rival trinca. Acha mesmo que futebol é sobre coleguismo? Aqui é só sobre quem sobrevive.

Não tô pedindo um vilão de novela mexicana. Tô pedindo alguém que entenda o jogo como ele é. O que move um vencedor de verdade? Fome. Obsessão. Devorar seus próprios parceiros para permanecer sendo o centro das atenções, só assim para não voltar pra sua vida mediocre.

Pensa em dar pro seu personagem traços que façam ele alguém incômodo. Um cara que olha pro companheiro e enxerga um rival. Um narcisista, que acredita que o gramado inteiro gira ao redor do próprio umbigo... Você pode criar um perfeccionista doente, que trata cada passe errado como um crime seja o passe vindo dele mesmo ou dos companheiros. Não há limitação nesse aspecto e os jogadores não podem julgar uns aos outros por isso na mesa.`;


  const words = fullText.split(' ');

  useEffect(() => {
    setShowEyes(true);
    
    const eyeBlinkInterval = setInterval(() => {
      setEyesBlink(true);
      setTimeout(() => setEyesBlink(false), 150);
    }, 3000);

    const glassesGlowInterval = setInterval(() => {
      setGlassesGlow(true);
      setTimeout(() => setGlassesGlow(false), 800);
    }, 2000);

    const typewriterInterval = setInterval(() => {
      setCurrentWordIndex((prev) => {
        if (prev >= words.length - 1) {
          setShowSmile(true);
          return prev;
        }
        return prev + 1;
      });
    }, 100);

    return () => {
      clearInterval(eyeBlinkInterval);
      clearInterval(glassesGlowInterval);
      clearInterval(typewriterInterval);
    };
  }, [words.length]);

  const displayText = words.slice(0, currentWordIndex + 1).join(' ');

  const handleConfirmUnderstanding = () => {
    setShowConfirmation(true);
  };

  const handleFinalConfirmation = async () => {
    try {
      await apiRequest('POST', '/api/auth/mark-cesar-seen', {});
      onClose();
    } catch (error) {
      console.error('Error marking César monitor as seen:', error);
      // Even if there's an error, close the modal
      onClose();
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Old Monitor Frame - Enhanced Texture */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Monitor Bezel - Enhanced Design with Better Texture */}
          <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 rounded-2xl shadow-2xl border-4 border-gray-600 max-w-5xl relative">
            {/* Enhanced outer frame texture */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-600/20 to-gray-900/40 rounded-2xl" />
            <div className="absolute inset-2 bg-gradient-to-tl from-gray-800/30 to-transparent rounded-2xl" />
            
            {/* Metallic highlights on frame */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-400/30 rounded-full" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gray-400/30 rounded-full" />
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-1 h-20 bg-gray-400/30 rounded-full" />
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 w-1 h-20 bg-gray-400/30 rounded-full" />
            
            {/* Corner details */}
            <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-gray-500/40 rounded-tl-lg" />
            <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-gray-500/40 rounded-tr-lg" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-gray-500/40 rounded-bl-lg" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-gray-500/40 rounded-br-lg" />
            
            {/* Monitor brand/model label */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-gray-500 text-xs font-mono">
              PROJETO EXPURGO • MODELO CRT-2025
            </div>
            {/* Decorative monitor LEDs */}
            <div className="absolute top-4 left-4 flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg animate-pulse" />
              <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg" />
              <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg" />
            </div>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-red-400 hover:text-red-300 transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Monitor Screen - Enhanced */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-2 border-gray-500 shadow-inner relative overflow-hidden">
              {/* Enhanced Screen Glow - Crimson Red */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-transparent to-red-600/10 animate-pulse" />
              {/* Scanlines Effect - Crimson Red */}
              <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-full h-px bg-red-500 opacity-10"
                    style={{ top: `${i * 5}%` }}
                  />
                ))}
              </div>

              {/* Screen Flicker - Crimson Red */}
              <div className="absolute inset-0 bg-red-500 opacity-5 animate-pulse" />

              {/* Content Container */}
              <div className="relative z-10 grid grid-cols-3 gap-6 min-h-96">
                {/* Left Side - César's Face */}
                <div className="flex flex-col items-center justify-center">
                  <div className="relative">
                    {/* Face outline - Enhanced red circle with texture */}
                    <div className="w-40 h-40 bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-full relative shadow-2xl border-2 border-red-500/50">
                      {/* Texture overlays */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-red-500/30 to-transparent" />
                      <div className="absolute inset-2 rounded-full bg-gradient-to-tl from-red-900/40 to-transparent" />
                      <div className="absolute inset-4 rounded-full bg-gradient-to-br from-red-400/20 to-transparent" />
                      
                      {/* Subtle shadow/depth lines */}
                      <div className="absolute top-8 left-8 w-24 h-px bg-red-400/30 rounded-full" />
                      <div className="absolute bottom-12 right-8 w-16 h-px bg-red-800/40 rounded-full" />
                      <div className="absolute top-16 right-12 w-8 h-px bg-red-300/25 rounded-full" />
                      
                      {/* Metallic highlights */}
                      <div className="absolute top-4 left-6 w-3 h-3 bg-red-300/60 rounded-full blur-sm" />
                      <div className="absolute bottom-8 left-12 w-2 h-2 bg-red-400/50 rounded-full blur-sm" />
                      
                      {/* Lateral Glasses - Based on the image */}
                      <AnimatePresence>
                        {showEyes && (
                          <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                          >
                            {/* Glasses Frame */}
                            <div className="relative flex items-center justify-center">
                              {/* Left lens */}
                              <motion.div
                                className="relative w-12 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-sm shadow-lg border border-gray-600"
                                animate={glassesGlow ? { 
                                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6)',
                                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(0, 255, 255, 0.8) 100%)'
                                } : { 
                                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
                                  background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.7) 0%, rgba(0, 150, 255, 0.6) 100%)'
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {/* Light reflection on glasses */}
                                <motion.div
                                  className="absolute top-1 left-1 w-3 h-2 bg-white rounded-full opacity-60"
                                  animate={glassesGlow ? { opacity: 1, scale: 1.5 } : { opacity: 0.6, scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </motion.div>
                              
                              {/* Bridge */}
                              <div className="w-2 h-1 bg-gray-600 mx-1" />
                              
                              {/* Right lens */}
                              <motion.div
                                className="relative w-12 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-sm shadow-lg border border-gray-600"
                                animate={glassesGlow ? { 
                                  boxShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.6)',
                                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(0, 255, 255, 0.8) 100%)'
                                } : { 
                                  boxShadow: '0 0 10px rgba(0, 255, 255, 0.4)',
                                  background: 'linear-gradient(135deg, rgba(0, 255, 255, 0.7) 0%, rgba(0, 150, 255, 0.6) 100%)'
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                {/* Light reflection on glasses */}
                                <motion.div
                                  className="absolute top-1 left-1 w-3 h-2 bg-white rounded-full opacity-60"
                                  animate={glassesGlow ? { opacity: 1, scale: 1.5 } : { opacity: 0.6, scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                />
                              </motion.div>
                              
                              {/* Side temples */}
                              <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-px bg-gray-600" />
                              <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-px bg-gray-600" />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Enhanced Name Label - Crimson Red */}
                    <div className="mt-6 text-center">
                      <motion.div 
                        className="text-red-400 text-sm font-mono font-bold tracking-wider border-2 border-red-400/30 bg-black/50 px-4 py-2 rounded-lg shadow-lg"
                        animate={{ 
                          boxShadow: glassesGlow ? '0 0 15px rgba(220, 38, 38, 0.5)' : '0 0 5px rgba(220, 38, 38, 0.2)' 
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        CÉSAR "O CARNICEIRO" VALENTE
                      </motion.div>
                      <div className="text-red-300 text-xs font-mono opacity-70 mt-2 bg-black/30 px-2 py-1 rounded">
                        DIRETOR EXECUTIVO • PROJETO EXPURGO
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side - Enhanced Text Panel */}
                <div className="col-span-2 flex flex-col justify-center">
                  <div className="bg-gradient-to-br from-black/80 to-red-900/20 border-2 border-red-400/30 rounded-lg p-6 shadow-2xl relative">
                    {/* Terminal header - Crimson Red */}
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-red-400/20">
                      <div className="text-red-400 text-xs font-mono font-bold tracking-wider">
                        PROJETO EXPURGO :: TERMINAL DE ACESSO
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                      </div>
                    </div>
                    
                    {/* Enhanced text with glow effect - Crimson Red */}
                    <motion.div 
                      className="text-red-400 font-mono text-sm leading-relaxed whitespace-pre-wrap"
                      animate={{ 
                        textShadow: glassesGlow ? '0 0 10px rgba(220, 38, 38, 0.8)' : '0 0 5px rgba(220, 38, 38, 0.4)' 
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {displayText}
                      <motion.span
                        className="inline-block w-2 h-4 bg-red-400 ml-1"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.div>
                    
                    {/* Data stream effect - Crimson Red */}
                    <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-red-400/60 to-transparent animate-pulse" />
                  </div>
                </div>
              </div>

              {/* Monitor Static/Noise - Crimson Red */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-transparent via-red-200 to-transparent animate-pulse" />
              </div>
            </div>

            {/* Enhanced Monitor Base */}
            <div className="mt-6 mx-auto w-32 h-8 bg-gradient-to-b from-gray-700 to-gray-900 rounded-b-lg border-2 border-gray-600 shadow-lg relative">
              {/* Monitor stand */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-2 bg-gray-800 rounded-full" />
              {/* Status LED - Crimson Red */}
              <div className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-lg" />
            </div>

            {/* Action Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleConfirmUnderstanding}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-red-500/50 hover:border-red-400/70"
              >
                COMPREENDIDO
              </button>
            </div>
          </div>
        </motion.div>

        {/* Confirmation Modal */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              className="absolute inset-0 bg-black/70 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-lg border-2 border-red-500/50 shadow-2xl max-w-md mx-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              >
                <div className="flex items-center mb-4">
                  <AlertTriangle className="text-red-400 mr-3" size={24} />
                  <h3 className="text-red-400 font-bold text-lg">CONFIRMAÇÃO</h3>
                </div>
                
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Ao confirmar, esta mensagem do César não aparecerá novamente. 
                  Você tem certeza de que compreendeu totalmente as instruções?
                </p>
                
                <div className="flex gap-4 justify-end">
                  <button
                    onClick={handleCancel}
                    className="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleFinalConfirmation}
                    className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-bold"
                  >
                    Confirmar
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}