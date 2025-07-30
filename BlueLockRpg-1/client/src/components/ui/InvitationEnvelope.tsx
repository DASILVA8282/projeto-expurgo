
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface InvitationEnvelopeProps {
  onAccept: () => void;
}

export function InvitationEnvelope({ onAccept }: InvitationEnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleEnvelopeClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      setTimeout(() => {
        setShowLetter(true);
      }, 800);
    }
  };

  const handleAccept = () => {
    onAccept();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-8 relative overflow-hidden">
      {/* Brutal background effects */}
      <div className="absolute inset-0 opacity-20">
        {/* Animated red veins/cracks */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 20% 80%, transparent 0%, rgba(220, 38, 38, 0.1) 40%, transparent 60%),
              radial-gradient(circle at 80% 20%, transparent 0%, rgba(153, 27, 27, 0.15) 30%, transparent 50%),
              radial-gradient(circle at 40% 40%, transparent 0%, rgba(239, 68, 68, 0.08) 50%, transparent 70%)
            `
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating blood particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-600 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <motion.div
          className="relative cursor-pointer"
          onClick={handleEnvelopeClick}
          whileHover={!isOpened ? { 
            scale: 1.05,
            rotateY: 5,
            rotateX: 5
          } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {/* Enhanced wax seal */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                className="absolute w-20 h-20 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-full shadow-2xl flex items-center justify-center border-2 border-red-500 z-10"
                style={{
                  top: '30%',
                  left: '40%',
                  transform: 'translate(-50%, -50%)',
                  boxShadow: `
                    0 0 20px rgba(220, 38, 38, 0.8),
                    0 0 40px rgba(153, 27, 27, 0.6),
                    inset 0 2px 4px rgba(0, 0, 0, 0.3)
                  `
                }}
                initial={{ scale: 1, opacity: 1, rotateZ: 0 }}
                exit={{ 
                  scale: 0.3, 
                  opacity: 0, 
                  rotateZ: 720,
                  y: -50
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(153, 27, 27, 0.6)",
                    "0 0 30px rgba(220, 38, 38, 1), 0 0 60px rgba(153, 27, 27, 0.8)",
                    "0 0 20px rgba(220, 38, 38, 0.8), 0 0 40px rgba(153, 27, 27, 0.6)"
                  ]
                }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 40px rgba(220, 38, 38, 1), 0 0 80px rgba(153, 27, 27, 0.8)"
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-red-700 via-red-800 to-red-900 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden">
                  {/* Seal texture overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-600/20 to-red-900/40 rounded-full" />
                  
                  <svg width="36" height="36" viewBox="0 0 36 36" className="text-gray-100 relative z-10">
                    <g transform="translate(18,18) rotate(-20) translate(-18,-18)">
                      <path d="M8 4 L10 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M12 3 L14 31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M16 2 L18 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M20 3 L22 31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M24 4 L26 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    </g>
                  </svg>

                  {/* Seal breaking effect particles */}
                  <AnimatePresence>
                    {isOpened && (
                      <>
                        {[...Array(8)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-red-600 rounded-full"
                            initial={{ 
                              scale: 1,
                              x: 0, 
                              y: 0,
                              opacity: 1
                            }}
                            animate={{ 
                              scale: 0,
                              x: Math.cos(i * 45 * Math.PI / 180) * 50,
                              y: Math.sin(i * 45 * Math.PI / 180) * 50,
                              opacity: 0
                            }}
                            transition={{ 
                              duration: 0.6,
                              ease: "easeOut"
                            }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Envelope Base with brutal textures */}
          <motion.div
            className="relative w-96 h-64 bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-2xl border-2 border-gray-700"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              boxShadow: `
                0 20px 40px rgba(0, 0, 0, 0.8),
                inset 0 1px 2px rgba(255, 255, 255, 0.1),
                0 0 60px rgba(220, 38, 38, 0.2)
              `
            }}
            animate={isOpened ? {
              boxShadow: [
                "0 20px 40px rgba(0, 0, 0, 0.8), 0 0 60px rgba(220, 38, 38, 0.2)",
                "0 25px 50px rgba(0, 0, 0, 0.9), 0 0 80px rgba(220, 38, 38, 0.4)",
                "0 20px 40px rgba(0, 0, 0, 0.8), 0 0 60px rgba(220, 38, 38, 0.2)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {/* Envelope texture overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-gray-700/10 to-gray-900/20 pointer-events-none" />
            
            {/* Scratches and wear marks */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-4 right-8 w-16 h-px bg-gray-600 rotate-12" />
              <div className="absolute bottom-6 left-12 w-8 h-px bg-gray-600 -rotate-6" />
              <div className="absolute top-1/2 left-4 w-px h-12 bg-gray-600 rotate-45" />
            </div>

            {/* Enhanced envelope flap with brutal opening */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-inner border-b-2 border-gray-600"
              style={{
                clipPath: "polygon(0 0, 50% 45%, 100% 0, 100% 0, 0 0)",
                transformOrigin: "50% 0%"
              }}
              animate={isOpened ? {
                rotateX: -180,
                scale: 1.02
              } : {}}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.8, 0.25, 1],
                type: "spring",
                damping: 20
              }}
            />

            {/* Enhanced envelope back flap */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-b-2 border-gray-600"
              style={{
                height: "45%",
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                transformOrigin: "50% 0%",
                boxShadow: "inset 0 -2px 4px rgba(0, 0, 0, 0.3)"
              }}
              animate={isOpened ? {
                rotateX: -130,
                scale: 1.15,
                y: -5
              } : {}}
              transition={{ 
                duration: 1.2, 
                ease: [0.25, 0.8, 0.25, 1],
                delay: 0.3,
                type: "spring",
                damping: 15
              }}
            />

            {/* Enhanced Letter with brutal styling */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  className="absolute inset-4 bg-gradient-to-br from-black via-gray-900 to-black shadow-2xl overflow-hidden border-2 border-red-900"
                  style={{
                    boxShadow: `
                      0 0 30px rgba(220, 38, 38, 0.4),
                      inset 0 0 20px rgba(0, 0, 0, 0.8),
                      0 10px 20px rgba(0, 0, 0, 0.6)
                    `
                  }}
                  initial={{ 
                    scale: 0.7, 
                    opacity: 0, 
                    y: 30,
                    rotateY: -15
                  }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    y: 0,
                    rotateY: 0
                  }}
                  transition={{ 
                    duration: 1,
                    ease: [0.25, 0.8, 0.25, 1],
                    type: "spring",
                    damping: 20
                  }}
                >
                  {/* Paper texture and aging effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-red-950/10 to-gray-900/20 pointer-events-none" />
                  <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-transparent to-gray-800/30 pointer-events-none" />
                  
                  <div className="p-6 text-xs text-gray-200 font-mono leading-relaxed h-full overflow-y-auto">
                    {/* Header */}
                    <div className="text-center border-b border-red-700 pb-4 mb-4">
                      <div className="flex justify-center mb-3">
                        <motion.div
                          className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg border border-red-500"
                          animate={{
                            boxShadow: [
                              "0 0 10px rgba(220, 38, 38, 0.6)",
                              "0 0 20px rgba(220, 38, 38, 0.8)",
                              "0 0 10px rgba(220, 38, 38, 0.6)"
                            ]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 20 20" className="text-gray-100">
                            <g transform="translate(10,10) rotate(-20) translate(-10,-10)">
                              <path d="M4 2 L5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                              <path d="M6 1.5 L7 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                              <path d="M8 1 L9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                              <path d="M10 1.5 L11 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                              <path d="M12 2 L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                            </g>
                          </svg>
                        </motion.div>
                      </div>
                      <h1 className="text-xl font-bold text-red-500 tracking-wider font-orbitron">PROJETO EXPURGO</h1>
                      <p className="text-xs text-red-400 mt-1 font-oswald tracking-widest">DOCUMENTO OFICIAL CONFIDENCIAL</p>
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-sm font-bold text-red-400 mb-4 tracking-wide font-bebas">
                      CONVITE PARA A ELITE DO FUTEBOL BRASILEIRO
                    </h2>

                    {/* Letter content */}
                    <div className="space-y-3 text-justify">
                      <p>
                        <span className="font-semibold text-red-400">Prezado destinatário,</span>
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

                      <p className="font-semibold text-red-400">
                        Não leve distrações. Leve apenas sua vontade.
                      </p>

                      <div className="mt-6 pt-4 border-t border-red-800">
                        <p className="text-right">
                          <span className="font-bold text-red-400 font-orbitron">César "O Carniceiro" Valente</span><br/>
                          <span className="text-xs text-gray-400 font-oswald">Diretor Executivo</span><br/>
                          <span className="text-xs text-gray-400 font-oswald">Projeto Expurgo</span>
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Accept button */}
                    <div className="mt-6 text-center">
                      <motion.button
                        className="relative px-8 py-3 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-bold rounded-lg shadow-2xl border-2 border-red-500 tracking-wide font-bebas text-lg overflow-hidden"
                        style={{
                          boxShadow: `
                            0 0 20px rgba(220, 38, 38, 0.6),
                            0 8px 16px rgba(0, 0, 0, 0.4),
                            inset 0 1px 2px rgba(255, 255, 255, 0.2)
                          `
                        }}
                        whileHover={{ 
                          scale: 1.05,
                          boxShadow: `
                            0 0 30px rgba(220, 38, 38, 0.8),
                            0 12px 24px rgba(0, 0, 0, 0.6),
                            inset 0 1px 2px rgba(255, 255, 255, 0.3)
                          `
                        }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAccept}
                        animate={{
                          boxShadow: [
                            "0 0 20px rgba(220, 38, 38, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)",
                            "0 0 30px rgba(220, 38, 38, 0.8), 0 8px 16px rgba(0, 0, 0, 0.4)",
                            "0 0 20px rgba(220, 38, 38, 0.6), 0 8px 16px rgba(0, 0, 0, 0.4)"
                          ]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Button energy sweep */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-red-300/30 to-transparent"
                          animate={{
                            x: [-200, 200],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1
                          }}
                        />
                        
                        <span className="relative z-10">ACEITAR CONVITE</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Enhanced brutal glow effect */}
          {!isOpened && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.3, 0.7, 0.3],
                scale: [1.2, 1.4, 1.2]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              style={{
                background: `
                  radial-gradient(ellipse at center, 
                    rgba(220, 38, 38, 0.4) 0%, 
                    rgba(153, 27, 27, 0.3) 30%, 
                    rgba(127, 29, 29, 0.2) 50%, 
                    transparent 80%
                  )
                `,
                filter: "blur(20px)"
              }}
            />
          )}
        </motion.div>

        {/* Enhanced instruction text */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <motion.p
                className="text-red-400 font-orbitron text-lg tracking-wide relative"
                animate={{
                  textShadow: [
                    "0 0 10px rgba(220, 38, 38, 0.8)",
                    "0 0 20px rgba(220, 38, 38, 1)",
                    "0 0 10px rgba(220, 38, 38, 0.8)"
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                CLIQUE NO ENVELOPE PARA ABRIR
                
                {/* Glitch effect overlay */}
                <motion.span
                  className="absolute inset-0 text-red-300"
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, 2, 0],
                    textShadow: [
                      "0 0 5px rgba(248, 113, 113, 0)",
                      "2px 0 5px rgba(248, 113, 113, 1)",
                      "0 0 5px rgba(248, 113, 113, 0)"
                    ]
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                >
                  CLIQUE NO ENVELOPE PARA ABRIR
                </motion.span>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
