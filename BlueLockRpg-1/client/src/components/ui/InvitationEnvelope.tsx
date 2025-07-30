
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface InvitationEnvelopeProps {
  onAccept: () => void;
}

export function InvitationEnvelope({ onAccept }: InvitationEnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      setTimeout(() => {
        setShowLetter(true);
      }, 1200);
    }
  };

  const handleAccept = () => {
    onAccept();
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Background ambient effects */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [0, -50, -100],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
          />
        ))}
        
        {/* Ambient glow */}
        <div className="absolute inset-0 bg-gradient-radial from-red-900/10 via-transparent to-transparent" />
      </div>

      <div className="relative z-10">
        <motion.div
          className="relative cursor-pointer"
          onClick={handleEnvelopeClick}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={!isOpened ? { 
            scale: 1.05,
            rotateY: 5,
            rotateX: -5,
          } : {}}
          transition={{ duration: 0.3 }}
          style={{
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Envelope shadow */}
          <motion.div
            className="absolute inset-0 bg-black/40 blur-xl rounded-lg"
            style={{
              transform: "translateZ(-50px) translateY(20px)",
            }}
            animate={{
              opacity: isHovering && !isOpened ? 0.8 : 0.4,
              scale: isHovering && !isOpened ? 1.1 : 1,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Wax seal positioned at the center of the envelope */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                className="absolute w-24 h-24 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-full shadow-2xl flex items-center justify-center border-4 border-red-500 z-20"
                style={{
                  top: '35%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.6), inset 0 0 20px rgba(0, 0, 0, 0.3)',
                }}
                initial={{ scale: 1, opacity: 1, rotateZ: 0 }}
                exit={{ 
                  scale: 0.3, 
                  opacity: 0, 
                  rotateZ: 180,
                  y: -100,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 40px rgba(239, 68, 68, 0.8), inset 0 0 25px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-red-700 to-red-900 rounded-full flex items-center justify-center shadow-inner">
                  <motion.svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 40 40" 
                    className="text-gray-100"
                    animate={{ rotateZ: isHovering ? [0, 5, -5, 0] : 0 }}
                    transition={{ duration: 2, repeat: isHovering ? Infinity : 0 }}
                  >
                    <g transform="translate(20,20) rotate(-20) translate(-20,-20)">
                      <path d="M8 4 L12 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                      <path d="M12 3 L16 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                      <path d="M16 2 L20 34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                      <path d="M20 3 L24 35" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                      <path d="M24 4 L28 36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                    </g>
                  </motion.svg>
                </div>
                
                {/* Seal glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-red-500/20"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope Base with enhanced textures */}
          <motion.div
            className="relative w-[480px] h-[320px] bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl border-2 border-gray-600"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            animate={{
              rotateY: isOpened ? 5 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Envelope texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-700/20 to-gray-900/40" />
            
            {/* Decorative border lines */}
            <div className="absolute inset-4 border border-gray-600/30 rounded-sm" />
            <div className="absolute inset-6 border border-gray-500/20 rounded-sm" />
          </motion.div>

          {/* Enhanced envelope flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 shadow-inner border-b-2 border-gray-500"
            style={{
              clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 0, 0 0)",
              transformOrigin: "50% 0%",
              boxShadow: 'inset 0 -5px 15px rgba(0, 0, 0, 0.5)',
            }}
            animate={isOpened ? {
              rotateX: -160,
              scale: 1.02,
            } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Flap texture */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800/50 to-transparent" />
          </motion.div>

          {/* Enhanced envelope back flap */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 border-b-2 border-gray-500"
            style={{
              height: "50%",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              transformOrigin: "50% 0%",
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.6)',
            }}
            animate={isOpened ? {
              rotateX: -140,
              scale: 1.08,
              y: -10,
            } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />

          {/* Letter inside with enhanced design */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                className="absolute inset-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 shadow-2xl overflow-hidden border-4 border-red-800 rounded-lg"
                initial={{ 
                  scale: 0.7, 
                  opacity: 0, 
                  y: 30,
                  rotateX: -15,
                }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  boxShadow: '0 0 50px rgba(239, 68, 68, 0.3), inset 0 0 30px rgba(239, 68, 68, 0.1)',
                }}
              >
                {/* Parchment texture */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/20 to-orange-100/20" />
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 20% 50%, rgba(139, 69, 19, 0.03) 0%, transparent 50%),
                                   radial-gradient(circle at 80% 20%, rgba(139, 69, 19, 0.03) 0%, transparent 50%),
                                   radial-gradient(circle at 40% 80%, rgba(139, 69, 19, 0.03) 0%, transparent 50%)`,
                }} />

                <div className="p-8 text-xs text-gray-800 font-mono leading-relaxed h-full overflow-y-auto relative z-10">
                  {/* Enhanced Header */}
                  <div className="text-center border-b-2 border-red-700 pb-6 mb-6">
                    <motion.div 
                      className="flex justify-center mb-4"
                      initial={{ scale: 0, rotateZ: -180 }}
                      animate={{ scale: 1, rotateZ: 0 }}
                      transition={{ duration: 1, delay: 0.5, type: "spring" }}
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-full flex items-center justify-center shadow-lg border-4 border-red-500 relative">
                        <svg width="28" height="28" viewBox="0 0 28 28" className="text-gray-100">
                          <g transform="translate(14,14) rotate(-20) translate(-14,-14)">
                            <path d="M6 3 L8 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                            <path d="M9 2.5 L11 24.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                            <path d="M12 2 L14 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                            <path d="M15 2.5 L17 24.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                            <path d="M18 3 L20 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                          </g>
                        </svg>
                        
                        {/* Seal inner glow */}
                        <div className="absolute inset-0 rounded-full bg-red-400/20 animate-pulse" />
                      </div>
                    </motion.div>
                    
                    <motion.h1 
                      className="text-2xl font-bold text-red-600 tracking-wider font-orbitron mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      PROJETO EXPURGO
                    </motion.h1>
                    
                    <motion.p 
                      className="text-sm text-red-500 mt-2 font-oswald tracking-widest"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      DOCUMENTO OFICIAL CONFIDENCIAL
                    </motion.p>
                  </div>

                  {/* Enhanced Title */}
                  <motion.h2 
                    className="text-center text-base font-bold text-red-500 mb-6 tracking-wide font-bebas"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    CONVITE PARA A ELITE DO FUTEBOL BRASILEIRO
                  </motion.h2>

                  {/* Letter content with staggered animation */}
                  <motion.div 
                    className="space-y-4 text-justify"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.3 }}
                  >
                    <p>
                      <span className="font-semibold text-red-500">Prezado destinatário,</span>
                    </p>

                    <p>
                      É com enorme satisfação que o Projeto Expurgo convida você a fazer parte de uma iniciativa sem precedentes no futebol nacional. Seu talento, seu faro de gol e, acima de tudo, sua fome insaciável não passaram despercebidos.
                    </p>

                    <p>
                      Este não é um convite qualquer. É a sua chance de ir além do comum, de se livrar das correntes da mediocridade que ainda travam o nosso esporte. Estamos reunindo a verdadeira elite do talento brasileiro para moldar os predadores do futuro.
                    </p>

                    <p>
                      Compareça ao <span className="font-semibold text-red-700">Centro de Excelência Eclipse</span>, localizado na <strong>EPIA – Estrada Parque Indústria e Abastecimento</strong>, 1350 - Setor Industrial, Brasília - DF, CEP: 72220-140. Chegue pontualmente às <span className="font-semibold">06:00</span> de <span className="font-semibold">segunda-feira</span>. Um ônibus exclusivo estará esperando para levá-lo até o centro.
                    </p>

                    <p>
                      Essa é uma peneira diferente de tudo o que você já viu, onde só os mais determinados terão a chance de fazer parte da nova geração de atletas que transformará o futebol brasileiro. Sua presença é mais que essencial...
                    </p>

                    <p className="font-semibold text-red-500">
                      Não leve distrações. Leve apenas sua vontade.
                    </p>

                    <div className="mt-8 pt-6 border-t-2 border-red-800">
                      <p className="text-right">
                        <span className="font-bold text-red-500 font-orbitron text-lg">César "O Carniceiro" Valente</span><br/>
                        <span className="text-sm text-gray-600 font-oswald">Diretor Executivo</span><br/>
                        <span className="text-sm text-gray-600 font-oswald">Projeto Expurgo</span>
                      </p>
                    </div>
                  </motion.div>

                  {/* Enhanced accept button */}
                  <motion.div 
                    className="mt-8 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                  >
                    <motion.button
                      className="px-12 py-4 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-bold rounded-xl shadow-2xl hover:from-red-700 hover:to-red-900 transition-all duration-300 tracking-wide font-bebas text-xl border-2 border-red-500 relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.08, 
                        boxShadow: "0 0 30px rgba(239, 68, 68, 0.8)",
                        y: -2,
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAccept}
                    >
                      {/* Button glow effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 rounded-xl"
                        animate={{
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      
                      <span className="relative z-10">ACEITAR CONVITE</span>
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Enhanced instruction text */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              className="absolute -bottom-24 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <motion.p 
                className="text-red-400 font-orbitron text-xl tracking-wide mb-2"
                animate={{
                  opacity: [0.7, 1, 0.7],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                CLIQUE NO ENVELOPE PARA ABRIR
              </motion.p>
              
              <motion.div
                className="w-8 h-8 mx-auto border-2 border-red-400 rounded-full flex items-center justify-center"
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <motion.svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  className="text-red-400"
                  fill="currentColor"
                >
                  <path d="M8 12l-4-4h8l-4 4z"/>
                </motion.svg>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
