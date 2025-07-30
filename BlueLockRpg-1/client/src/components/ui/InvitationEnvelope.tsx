
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface InvitationEnvelopeProps {
  onAccept: () => void;
}

export function InvitationEnvelope({ onAccept }: InvitationEnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [bloodSplatters, setBloodSplatters] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);

  const handleEnvelopeClick = () => {
    if (!isOpened) {
      setIsOpened(true);
      // Create blood splatter effect on envelope open
      const newSplatters = Array.from({length: 8}, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 30 + 10
      }));
      setBloodSplatters(newSplatters);
      
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
      {/* Ultra-brutal background with dynamic effects */}
      <div className="absolute inset-0">
        {/* Pulsating blood veins network */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(45deg, transparent 48%, rgba(139, 0, 0, 0.3) 49%, rgba(139, 0, 0, 0.3) 51%, transparent 52%),
              linear-gradient(-45deg, transparent 48%, rgba(139, 0, 0, 0.2) 49%, rgba(139, 0, 0, 0.2) 51%, transparent 52%),
              radial-gradient(circle at 15% 85%, rgba(220, 38, 38, 0.4) 0%, transparent 40%),
              radial-gradient(circle at 85% 15%, rgba(153, 27, 27, 0.5) 0%, transparent 35%),
              radial-gradient(circle at 50% 50%, rgba(139, 0, 0, 0.2) 0%, transparent 60%)
            `,
            backgroundSize: '200px 200px, 150px 150px, 800px 800px, 600px 600px, 1000px 1000px'
          }}
          animate={{
            backgroundPosition: [
              '0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px',
              '200px 200px, -150px -150px, 100px -100px, -200px 200px, 300px -300px',
              '0px 0px, 0px 0px, 0px 0px, 0px 0px, 0px 0px'
            ],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Aggressive floating blood particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              background: `radial-gradient(circle, rgba(220, 38, 38, ${0.8 + Math.random() * 0.2}) 0%, rgba(139, 0, 0, ${0.4 + Math.random() * 0.4}) 100%)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(220, 38, 38, 0.8)`
            }}
            animate={{
              y: [0, -200, 0],
              x: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 1, 0],
              scale: [0.2, 1.5, 0.2],
              rotate: [0, 360, 720]
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}

        {/* Dynamic lightning/crack effects */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            opacity: [0, 0.3, 0, 0.5, 0],
            filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(360deg)"]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            times: [0, 0.1, 0.2, 0.3, 1]
          }}
        >
          <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-red-500 via-transparent to-red-600 opacity-60 transform rotate-12" />
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-red-600 via-transparent to-red-400 opacity-40 transform -rotate-6" />
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-red-500 via-transparent to-red-600 opacity-30" />
        </motion.div>

        {/* Blood splatters from envelope opening */}
        <AnimatePresence>
          {bloodSplatters.map((splatter) => (
            <motion.div
              key={splatter.id}
              className="absolute rounded-full"
              style={{
                left: `${splatter.x}%`,
                top: `${splatter.y}%`,
                width: `${splatter.size}px`,
                height: `${splatter.size}px`,
                background: `radial-gradient(circle, rgba(139, 0, 0, 0.9) 0%, rgba(220, 38, 38, 0.6) 50%, transparent 100%)`,
                filter: 'blur(1px)'
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.5, 1], 
                opacity: [0, 1, 0.7],
                rotate: [0, Math.random() * 360]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 1.5,
                ease: "easeOut"
              }}
            />
          ))}
        </AnimatePresence>
      </div>

      <div className="relative z-10">
        <motion.div
          className="relative cursor-pointer"
          onClick={handleEnvelopeClick}
          whileHover={!isOpened ? { 
            scale: 1.08,
            rotateY: 8,
            rotateX: 8,
            filter: "brightness(1.2) contrast(1.1)"
          } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            transformStyle: "preserve-3d",
            filter: "drop-shadow(0 0 40px rgba(220, 38, 38, 0.6))"
          }}
        >
          {/* Ultra-enhanced wax seal with brutal effects */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                className="absolute w-24 h-24 rounded-full shadow-2xl flex items-center justify-center border-4 border-red-400 z-10"
                style={{
                  top: '30%',
                  left: '40%',
                  transform: 'translate(-50%, -50%)',
                  background: `
                    radial-gradient(circle at 30% 30%, rgba(220, 38, 38, 1) 0%, rgba(153, 27, 27, 0.9) 40%, rgba(139, 0, 0, 1) 100%)
                  `,
                  boxShadow: `
                    0 0 30px rgba(220, 38, 38, 1),
                    0 0 60px rgba(153, 27, 27, 0.8),
                    0 0 90px rgba(139, 0, 0, 0.6),
                    inset 0 4px 8px rgba(0, 0, 0, 0.5),
                    inset 0 -2px 4px rgba(255, 255, 255, 0.1)
                  `
                }}
                initial={{ scale: 1, opacity: 1, rotateZ: 0 }}
                exit={{ 
                  scale: 0.2, 
                  opacity: 0, 
                  rotateZ: 1080,
                  y: -100
                }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.25, 0.8, 0.25, 1],
                  type: "spring",
                  damping: 15
                }}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(220, 38, 38, 1), 0 0 60px rgba(153, 27, 27, 0.8), 0 0 90px rgba(139, 0, 0, 0.6)",
                    "0 0 50px rgba(220, 38, 38, 1), 0 0 100px rgba(153, 27, 27, 1), 0 0 150px rgba(139, 0, 0, 0.8)",
                    "0 0 30px rgba(220, 38, 38, 1), 0 0 60px rgba(153, 27, 27, 0.8), 0 0 90px rgba(139, 0, 0, 0.6)"
                  ],
                  scale: [1, 1.05, 1]
                }}
                whileHover={{
                  scale: 1.15,
                  boxShadow: "0 0 60px rgba(220, 38, 38, 1), 0 0 120px rgba(153, 27, 27, 1), 0 0 180px rgba(139, 0, 0, 0.8)",
                  rotate: [0, 5, -5, 0]
                }}
              >
                <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-inner relative overflow-hidden"
                     style={{
                       background: `
                         linear-gradient(135deg, rgba(139, 0, 0, 1) 0%, rgba(220, 38, 38, 0.8) 50%, rgba(153, 27, 27, 1) 100%)
                       `
                     }}>
                  {/* Enhanced seal texture with brutal patterns */}
                  <div className="absolute inset-0 rounded-full"
                       style={{
                         background: `
                           radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 30%),
                           radial-gradient(circle at 60% 80%, rgba(0, 0, 0, 0.4) 0%, transparent 40%),
                           conic-gradient(from 45deg, transparent, rgba(139, 0, 0, 0.3), transparent)
                         `
                       }} />
                  
                  <motion.svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 40 40" 
                    className="text-gray-100 relative z-10"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <g transform="translate(20,20) rotate(-20) translate(-20,-20)">
                      <path d="M8 4 L10 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                      <path d="M12 3 L14 35" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                      <path d="M16 2 L18 34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                      <path d="M20 2 L22 34" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                      <path d="M24 3 L26 35" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                      <path d="M28 4 L30 36" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" fill="none"/>
                    </g>
                  </motion.svg>

                  {/* Brutal seal breaking particles */}
                  <AnimatePresence>
                    {isOpened && (
                      <>
                        {[...Array(12)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                              width: `${Math.random() * 6 + 2}px`,
                              height: `${Math.random() * 6 + 2}px`,
                              background: `radial-gradient(circle, rgba(220, 38, 38, 1) 0%, rgba(139, 0, 0, 0.8) 100%)`
                            }}
                            initial={{ 
                              scale: 1,
                              x: 0, 
                              y: 0,
                              opacity: 1,
                              rotate: 0
                            }}
                            animate={{ 
                              scale: 0,
                              x: Math.cos(i * 30 * Math.PI / 180) * 80,
                              y: Math.sin(i * 30 * Math.PI / 180) * 80,
                              opacity: 0,
                              rotate: 720
                            }}
                            transition={{ 
                              duration: 1,
                              ease: "easeOut",
                              delay: i * 0.05
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

          {/* Ultra-brutal envelope base with horrific textures */}
          <motion.div
            className="relative w-[440px] h-80 shadow-2xl border-4"
            style={{
              background: `
                linear-gradient(135deg, 
                  rgba(20, 20, 20, 1) 0%, 
                  rgba(40, 0, 0, 0.9) 25%, 
                  rgba(0, 0, 0, 1) 50%, 
                  rgba(30, 0, 0, 0.8) 75%, 
                  rgba(10, 10, 10, 1) 100%
                )
              `,
              borderColor: 'rgba(139, 0, 0, 0.8)',
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              boxShadow: `
                0 30px 60px rgba(0, 0, 0, 0.9),
                inset 0 2px 4px rgba(255, 255, 255, 0.05),
                0 0 80px rgba(220, 38, 38, 0.4),
                0 0 120px rgba(139, 0, 0, 0.3)
              `
            }}
            animate={isOpened ? {
              boxShadow: [
                "0 30px 60px rgba(0, 0, 0, 0.9), 0 0 80px rgba(220, 38, 38, 0.4)",
                "0 40px 80px rgba(0, 0, 0, 1), 0 0 120px rgba(220, 38, 38, 0.6)",
                "0 30px 60px rgba(0, 0, 0, 0.9), 0 0 80px rgba(220, 38, 38, 0.4)"
              ],
              filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"]
            } : {}}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {/* Brutal envelope texture overlays */}
            <div className="absolute inset-0 pointer-events-none"
                 style={{
                   background: `
                     repeating-linear-gradient(
                       45deg,
                       transparent,
                       transparent 10px,
                       rgba(139, 0, 0, 0.1) 10px,
                       rgba(139, 0, 0, 0.1) 12px
                     ),
                     repeating-linear-gradient(
                       -45deg,
                       transparent,
                       transparent 8px,
                       rgba(80, 0, 0, 0.15) 8px,
                       rgba(80, 0, 0, 0.15) 10px
                     )
                   `
                 }} 
            />
            
            {/* Enhanced scratches and brutal wear marks */}
            <div className="absolute inset-0 opacity-60">
              <div className="absolute top-8 right-12 w-24 h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent rotate-12 blur-sm" />
              <div className="absolute bottom-12 left-16 w-16 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent -rotate-6 blur-sm" />
              <div className="absolute top-1/2 left-8 w-1 h-20 bg-gradient-to-b from-transparent via-red-600 to-transparent rotate-45 blur-sm" />
              <div className="absolute top-1/4 right-1/4 w-20 h-px bg-red-700 -rotate-12 opacity-80" />
              <div className="absolute bottom-1/3 left-1/3 w-px h-16 bg-red-600 rotate-30 opacity-70" />
            </div>

            {/* Ultra-brutal envelope flap with devastating opening */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full shadow-inner border-b-4"
              style={{
                background: `
                  linear-gradient(145deg, 
                    rgba(60, 0, 0, 1) 0%, 
                    rgba(20, 20, 20, 0.9) 30%, 
                    rgba(0, 0, 0, 1) 60%, 
                    rgba(40, 0, 0, 0.8) 100%
                  )
                `,
                borderBottomColor: 'rgba(139, 0, 0, 0.9)',
                clipPath: "polygon(0 0, 50% 45%, 100% 0, 100% 0, 0 0)",
                transformOrigin: "50% 0%"
              }}
              animate={isOpened ? {
                rotateX: -190,
                scale: 1.05,
                filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
              } : {}}
              transition={{ 
                duration: 1.8, 
                ease: [0.25, 0.8, 0.25, 1],
                type: "spring",
                damping: 18
              }}
            />

            {/* Enhanced brutal envelope back flap */}
            <motion.div
              className="absolute top-0 left-0 w-full border-b-4"
              style={{
                height: "45%",
                background: `
                  linear-gradient(160deg, 
                    rgba(80, 0, 0, 1) 0%, 
                    rgba(40, 40, 40, 0.9) 25%, 
                    rgba(20, 20, 20, 1) 50%, 
                    rgba(60, 0, 0, 0.8) 100%
                  )
                `,
                borderBottomColor: 'rgba(139, 0, 0, 0.8)',
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                transformOrigin: "50% 0%",
                boxShadow: "inset 0 -4px 8px rgba(0, 0, 0, 0.5)"
              }}
              animate={isOpened ? {
                rotateX: -140,
                scale: 1.2,
                y: -10,
                filter: "brightness(1.3)"
              } : {}}
              transition={{ 
                duration: 1.8, 
                ease: [0.25, 0.8, 0.25, 1],
                delay: 0.4,
                type: "spring",
                damping: 12
              }}
            />

            {/* Ultra-brutal letter with enhanced styling */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  className="absolute inset-6 shadow-2xl overflow-hidden border-4"
                  style={{
                    background: `
                      linear-gradient(135deg, 
                        rgba(0, 0, 0, 1) 0%, 
                        rgba(20, 0, 0, 0.95) 25%, 
                        rgba(40, 40, 40, 0.9) 50%, 
                        rgba(20, 0, 0, 0.95) 75%, 
                        rgba(0, 0, 0, 1) 100%
                      )
                    `,
                    borderColor: 'rgba(139, 0, 0, 0.9)',
                    boxShadow: `
                      0 0 40px rgba(220, 38, 38, 0.6),
                      inset 0 0 30px rgba(0, 0, 0, 0.9),
                      0 15px 30px rgba(0, 0, 0, 0.8),
                      0 0 80px rgba(139, 0, 0, 0.4)
                    `
                  }}
                  initial={{ 
                    scale: 0.6, 
                    opacity: 0, 
                    y: 50,
                    rotateY: -25,
                    rotateX: 15
                  }}
                  animate={{ 
                    scale: 1, 
                    opacity: 1, 
                    y: 0,
                    rotateY: 0,
                    rotateX: 0
                  }}
                  transition={{ 
                    duration: 1.5,
                    ease: [0.25, 0.8, 0.25, 1],
                    type: "spring",
                    damping: 25
                  }}
                >
                  {/* Enhanced paper texture and brutal aging effects */}
                  <div className="absolute inset-0 pointer-events-none"
                       style={{
                         background: `
                           radial-gradient(circle at 20% 20%, rgba(139, 0, 0, 0.2) 0%, transparent 40%),
                           radial-gradient(circle at 80% 80%, rgba(60, 0, 0, 0.3) 0%, transparent 50%),
                           linear-gradient(45deg, transparent 48%, rgba(139, 0, 0, 0.1) 49%, rgba(139, 0, 0, 0.1) 51%, transparent 52%)
                         `
                       }} 
                  />
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-transparent to-rgba(80, 0, 0, 0.4) pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 bg-gradient-to-tr from-transparent to-rgba(60, 0, 0, 0.3) pointer-events-none" />
                  
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

                    {/* Ultra-brutal Accept button */}
                    <div className="mt-6 text-center">
                      <motion.button
                        className="relative px-10 py-4 text-white font-bold rounded-lg shadow-2xl border-4 tracking-wide font-bebas text-xl overflow-hidden"
                        style={{
                          background: `
                            linear-gradient(135deg, 
                              rgba(139, 0, 0, 1) 0%, 
                              rgba(220, 38, 38, 0.9) 25%, 
                              rgba(153, 27, 27, 1) 50%, 
                              rgba(220, 38, 38, 0.9) 75%, 
                              rgba(139, 0, 0, 1) 100%
                            )
                          `,
                          borderColor: 'rgba(220, 38, 38, 0.8)',
                          boxShadow: `
                            0 0 30px rgba(220, 38, 38, 0.8),
                            0 12px 24px rgba(0, 0, 0, 0.6),
                            inset 0 2px 4px rgba(255, 255, 255, 0.2),
                            0 0 60px rgba(139, 0, 0, 0.5)
                          `
                        }}
                        whileHover={{ 
                          scale: 1.08,
                          boxShadow: `
                            0 0 50px rgba(220, 38, 38, 1),
                            0 20px 40px rgba(0, 0, 0, 0.8),
                            inset 0 2px 4px rgba(255, 255, 255, 0.3),
                            0 0 100px rgba(139, 0, 0, 0.7)
                          `,
                          filter: "brightness(1.2) contrast(1.1)"
                        }}
                        whileTap={{ 
                          scale: 0.92,
                          filter: "brightness(0.9)"
                        }}
                        onClick={handleAccept}
                        animate={{
                          boxShadow: [
                            "0 0 30px rgba(220, 38, 38, 0.8), 0 12px 24px rgba(0, 0, 0, 0.6)",
                            "0 0 50px rgba(220, 38, 38, 1), 0 12px 24px rgba(0, 0, 0, 0.6)",
                            "0 0 30px rgba(220, 38, 38, 0.8), 0 12px 24px rgba(0, 0, 0, 0.6)"
                          ],
                          scale: [1, 1.02, 1]
                        }}
                        transition={{
                          duration: 2.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Brutal button energy sweep */}
                        <motion.div
                          className="absolute inset-0 rounded-lg"
                          style={{
                            background: `
                              linear-gradient(90deg, 
                                transparent 0%, 
                                rgba(255, 255, 255, 0.4) 50%, 
                                transparent 100%
                              )
                            `
                          }}
                          animate={{
                            x: [-300, 300],
                            opacity: [0, 1, 0]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            repeatDelay: 1.5
                          }}
                        />

                        {/* Button texture overlay */}
                        <div className="absolute inset-0 rounded-lg pointer-events-none"
                             style={{
                               background: `
                                 repeating-linear-gradient(
                                   45deg,
                                   transparent,
                                   transparent 2px,
                                   rgba(255, 255, 255, 0.05) 2px,
                                   rgba(255, 255, 255, 0.05) 4px
                                 )
                               `
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

          {/* Ultra-brutal mega glow effect */}
          {!isOpened && (
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.4, 0.8, 0.4],
                scale: [1.3, 1.6, 1.3]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
              style={{
                background: `
                  radial-gradient(ellipse at center, 
                    rgba(220, 38, 38, 0.6) 0%, 
                    rgba(153, 27, 27, 0.5) 20%, 
                    rgba(139, 0, 0, 0.4) 40%, 
                    rgba(220, 38, 38, 0.3) 60%,
                    transparent 85%
                  )
                `,
                filter: "blur(30px)"
              }}
            />
          )}
        </motion.div>

        {/* Ultra-brutal instruction text with glitch effects */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <motion.p
                className="text-red-400 font-orbitron text-xl tracking-wide relative font-bold"
                animate={{
                  textShadow: [
                    "0 0 15px rgba(220, 38, 38, 1)",
                    "0 0 30px rgba(220, 38, 38, 1), 0 0 40px rgba(139, 0, 0, 0.8)",
                    "0 0 15px rgba(220, 38, 38, 1)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                CLIQUE NO ENVELOPE PARA ABRIR
                
                {/* Enhanced glitch effect overlay */}
                <motion.span
                  className="absolute inset-0 text-red-300 font-orbitron font-bold"
                  animate={{
                    opacity: [0, 1, 0],
                    x: [0, -3, 3, 0],
                    textShadow: [
                      "0 0 10px rgba(248, 113, 113, 0)",
                      "3px 0 10px rgba(248, 113, 113, 1), -3px 0 10px rgba(220, 38, 38, 1)",
                      "0 0 10px rgba(248, 113, 113, 0)"
                    ]
                  }}
                  transition={{
                    duration: 0.15,
                    repeat: Infinity,
                    repeatDelay: 4,
                    ease: "easeInOut"
                  }}
                >
                  CLIQUE NO ENVELOPE PARA ABRIR
                </motion.span>

                {/* Double glitch layer for extra brutality */}
                <motion.span
                  className="absolute inset-0 text-red-200 font-orbitron font-bold"
                  animate={{
                    opacity: [0, 0.8, 0],
                    x: [0, 2, -2, 0],
                    y: [0, -1, 1, 0],
                    filter: ["hue-rotate(0deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"]
                  }}
                  transition={{
                    duration: 0.1,
                    repeat: Infinity,
                    repeatDelay: 6,
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
