
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
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Scientific grid background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
        
        {/* Data points and scientific elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-red-500 rounded-full opacity-30"
            style={{
              left: `${15 + i * 7}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}

        {/* Scanning lines */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-red-500/5 to-transparent h-8"
          animate={{
            y: ["-100vh", "100vh"],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          className="relative cursor-pointer mx-auto w-fit"
          onClick={handleEnvelopeClick}
          onHoverStart={() => setIsHovering(true)}
          onHoverEnd={() => setIsHovering(false)}
          whileHover={!isOpened ? { 
            scale: 1.02,
            rotateY: 2,
          } : {}}
          transition={{ duration: 0.3 }}
        >
          {/* Envelope shadow */}
          <motion.div
            className="absolute inset-0 bg-black/60 blur-2xl rounded-lg"
            style={{
              transform: "translateZ(-20px) translateY(10px)",
            }}
            animate={{
              opacity: isHovering && !isOpened ? 0.8 : 0.6,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Scientific seal - positioned correctly */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                className="absolute w-16 h-16 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-full shadow-2xl flex items-center justify-center border-2 border-red-400 z-20"
                style={{
                  top: '40%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: '0 0 20px rgba(239, 68, 68, 0.6), inset 0 0 10px rgba(0, 0, 0, 0.3)',
                }}
                initial={{ scale: 1, opacity: 1, rotateZ: 0 }}
                exit={{ 
                  scale: 0.2, 
                  opacity: 0, 
                  rotateZ: 180,
                  y: -80,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.8), inset 0 0 15px rgba(0, 0, 0, 0.3)',
                }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-700 to-red-900 rounded-full flex items-center justify-center shadow-inner">
                  {/* Scientific DNA helix symbol */}
                  <motion.svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    className="text-gray-100"
                    animate={{ rotateZ: isHovering ? [0, 360] : 0 }}
                    transition={{ duration: 2, repeat: isHovering ? Infinity : 0 }}
                  >
                    <path d="M4 4 C8 8, 16 8, 20 4" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M4 8 C8 12, 16 12, 20 8" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M4 12 C8 16, 16 16, 20 12" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M4 16 C8 20, 16 20, 20 16" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <circle cx="6" cy="6" r="1" fill="currentColor"/>
                    <circle cx="18" cy="6" r="1" fill="currentColor"/>
                    <circle cx="6" cy="18" r="1" fill="currentColor"/>
                    <circle cx="18" cy="18" r="1" fill="currentColor"/>
                  </motion.svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope Base - fixed proportions */}
          <motion.div
            className="relative w-[400px] h-[280px] bg-gradient-to-br from-gray-900 via-gray-800 to-black shadow-2xl border border-gray-600"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            }}
            animate={{
              rotateY: isOpened ? 3 : 0,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Technical grid overlay */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(239, 68, 68, 0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(239, 68, 68, 0.3) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }}
            />
            
            {/* Technical border */}
            <div className="absolute inset-2 border border-red-900/30" />
            <div className="absolute inset-4 border border-red-800/20" />
          </motion.div>

          {/* Envelope flap - brutal design */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 shadow-inner border-b border-red-800/50"
            style={{
              clipPath: "polygon(0 0, 50% 50%, 100% 0, 100% 0, 0 0)",
              transformOrigin: "50% 0%",
              boxShadow: 'inset 0 -3px 10px rgba(0, 0, 0, 0.5)',
            }}
            animate={isOpened ? {
              rotateX: -160,
              scale: 1.01,
            } : {}}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Technical pattern on flap */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-900/20 to-transparent" />
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `linear-gradient(45deg, rgba(239, 68, 68, 0.3) 2px, transparent 2px)`,
                backgroundSize: '15px 15px'
              }}
            />
          </motion.div>

          {/* Envelope back flap */}
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 border-b border-red-800/50"
            style={{
              height: "50%",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              transformOrigin: "50% 0%",
              boxShadow: '0 3px 15px rgba(0, 0, 0, 0.6)',
            }}
            animate={isOpened ? {
              rotateX: -140,
              scale: 1.05,
              y: -8,
            } : {}}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          />

          {/* Letter inside - fixed sizing and brutal design */}
          <AnimatePresence>
            {showLetter && (
              <motion.div
                className="absolute inset-4 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 shadow-2xl overflow-hidden border-2 border-red-800"
                initial={{ 
                  scale: 0.8, 
                  opacity: 0, 
                  y: 20,
                  rotateX: -10,
                }}
                animate={{ 
                  scale: 1, 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                style={{
                  boxShadow: '0 0 30px rgba(239, 68, 68, 0.3), inset 0 0 20px rgba(239, 68, 68, 0.05)',
                }}
              >
                {/* Technical document texture */}
                <div 
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '15px 15px'
                  }}
                />

                <div className="p-4 text-xs text-gray-900 font-mono leading-tight h-full overflow-y-auto relative z-10">
                  {/* Scientific Header */}
                  <div className="text-center border-b-2 border-red-800 pb-3 mb-4">
                    <motion.div 
                      className="flex justify-center mb-2"
                      initial={{ scale: 0, rotateZ: -90 }}
                      animate={{ scale: 1, rotateZ: 0 }}
                      transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-red-700 via-red-800 to-red-900 flex items-center justify-center border-2 border-red-600 relative">
                        {/* Scientific symbol */}
                        <svg width="20" height="20" viewBox="0 0 20 20" className="text-gray-100">
                          <path d="M2 2 L18 18 M18 2 L2 18" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                          <circle cx="10" cy="10" r="2" fill="currentColor"/>
                        </svg>
                      </div>
                    </motion.div>
                    
                    <motion.h1 
                      className="text-lg font-bold text-red-700 tracking-widest font-mono mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 }}
                    >
                      PROJETO EXPURGO
                    </motion.h1>
                    
                    <motion.p 
                      className="text-xs text-red-600 font-mono tracking-wider"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.9 }}
                    >
                      CLASSIFICAÇÃO: ULTRA-CONFIDENCIAL
                    </motion.p>
                    
                    <div className="flex justify-between text-xs text-gray-600 mt-2 font-mono">
                      <span>ID: EXP-001</span>
                      <span>VER: 2.1</span>
                    </div>
                  </div>

                  {/* Scientific title */}
                  <motion.h2 
                    className="text-center text-sm font-bold text-red-600 mb-4 tracking-wide font-mono"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.1 }}
                  >
                    <div className="bg-red-50 border-l-4 border-red-600 p-2 my-3">
                      <p className="text-red-800 font-bold text-xs">
                        LOCALIZAÇÃO: Centro de Excelência Eclipse<br/>
                        COORDENADAS: EPIA 1350 - Setor Industrial, BSB-DF<br/>
                        HORÁRIO: 06:00 - SEGUNDA-FEIRA<br/>
                        TRANSPORTE: Fornecido pela organização
                      </p>
                    </div>
                    <p className="text-red-600 font-bold text-center border border-red-600 p-2 bg-red-50">
                      COMPAREÇA APENAS COM DOCUMENTOS DE IDENTIFICAÇÃO
                    </p>

                    <div className="mt-4 pt-3 border-t border-red-800 text-right">
                      <p>
                        <span className="font-bold text-red-600 font-mono">Dr. César Valente</span><br/>
                        <span className="text-xs text-gray-700">Diretor Científico</span><br/>
                        <span className="text-xs text-gray-700">Divisão de Genética Esportiva</span>
                      </p>
                    </div>
                  </motion.div>

                  {/* Accept button - brutal style */}
                  <motion.div 
                    className="mt-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                  >
                    <motion.button
                      className="px-8 py-3 bg-gradient-to-r from-red-700 to-red-800 text-white font-bold shadow-xl hover:from-red-800 hover:to-red-900 transition-all duration-300 tracking-wider font-mono text-sm border border-red-600 relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.05, 
                        boxShadow: "0 0 25px rgba(239, 68, 68, 0.7)",
                      }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleAccept}
                    >
                      <span className="relative z-10">CONFIRMAR PARTICIPAÇÃO</span>
                      
                      {/* Scanning effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Scientific instruction */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 2 }}
            >
              <motion.p 
                className="text-red-400 font-mono text-lg tracking-wider mb-2"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                [CLIQUE PARA ABRIR DOCUMENTO]
              </motion.p>
              
              <motion.div
                className="w-6 h-6 mx-auto border border-red-400 flex items-center justify-center"
                animate={{
                  y: [0, 8, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-2 h-2 bg-red-400 rotate-45" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
