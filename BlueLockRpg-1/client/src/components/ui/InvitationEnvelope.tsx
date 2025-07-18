import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InvitationEnvelopeProps {
  onAccept: () => void;
}

export default function InvitationEnvelope({ onAccept }: InvitationEnvelopeProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);

  const handleEnvelopeClick = () => {
    setIsOpened(true);
    setTimeout(() => setShowLetter(true), 800);
  };

  const handleAccept = () => {
    setShowGlitch(true);
    setTimeout(() => onAccept(), 1000);
  };



  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      {/* Glitch overlay */}
      <AnimatePresence>
        {showGlitch && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full h-full bg-black animate-pulse">
              <div className="absolute inset-0 bg-red-900 opacity-20 animate-ping"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-30 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-6xl font-mono animate-bounce">
                SISTEMA INICIADO
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Subtle texture */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-red-900/30 via-transparent to-red-900/30"></div>
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-amber-500 rounded-full opacity-40 animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-red-400 rounded-full opacity-25 animate-pulse delay-2000"></div>
        </div>
      </div>

      {/* Envelope */}
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          className="relative cursor-pointer"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          onClick={!isOpened ? handleEnvelopeClick : undefined}
        >
          {/* Envelope seal - positioned at the center of the envelope */}
          <AnimatePresence>
            {!isOpened && (
              <motion.div
                className="absolute w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full shadow-2xl flex items-center justify-center border-2 border-red-500 z-10"
                style={{
                  top: '30%',
                  left: '40%',
                  transform: 'translate(-50%, -50%)'
                }}
                initial={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0, rotate: 180 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="w-16 h-16 bg-red-700 rounded-full flex items-center justify-center shadow-inner">
                  <svg width="36" height="36" viewBox="0 0 36 36" className="text-gray-100">
                    <g transform="translate(18,18) rotate(-20) translate(-18,-18)">
                      <path d="M8 4 L10 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M12 3 L14 31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M16 2 L18 30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M20 3 L22 31" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                      <path d="M24 4 L26 32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    </g>
                  </svg>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Envelope Base */}
          <motion.div
            className="relative w-96 h-64 bg-gradient-to-br from-gray-900 to-black shadow-2xl border border-gray-700"
            style={{
              clipPath: isOpened ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "polygon(0 0, 100% 0, 100% 100%, 0 100%)"
            }}
          >

            {/* Envelope flap */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 shadow-inner border-b border-gray-600"
              style={{
                clipPath: "polygon(0 0, 50% 45%, 100% 0, 100% 0, 0 0)",
                transformOrigin: "50% 0%"
              }}
              animate={isOpened ? {
                rotateX: -180
              } : {}}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />

            {/* Envelope back flap (opens organically) */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-br from-gray-700 to-gray-800 border-b border-gray-600"
              style={{
                height: "45%",
                clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                transformOrigin: "50% 0%"
              }}
              animate={isOpened ? {
                rotateX: -120,
                scale: 1.1
              } : {}}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
            />

            {/* Letter inside */}
            <AnimatePresence>
              {showLetter && (
                <motion.div
                  className="absolute inset-4 bg-gradient-to-br from-black to-gray-900 shadow-2xl overflow-hidden border border-red-900"
                  initial={{ scale: 0.8, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <div className="p-6 text-xs text-gray-200 font-mono leading-relaxed h-full overflow-y-auto">
                    {/* Header */}
                    <div className="text-center border-b border-red-700 pb-4 mb-4">
                      <div className="flex justify-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg border border-red-500">
                          <svg width="20" height="20" viewBox="0 0 20 20" className="text-gray-100">
                            <g transform="translate(10,10) rotate(-20) translate(-10,-10)">
                              <path d="M4 2 L5 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                              <path d="M6 1.5 L7 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                              <path d="M8 1 L9 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                              <path d="M10 1.5 L11 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                              <path d="M12 2 L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                            </g>
                          </svg>
                        </div>
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
                        <span className="font-semibold text-red-400">Prezado destinatário,</span></p>

                        <p>
                          É com enorme satisfação que o Projeto Expurgo convida você a fazer parte de uma iniciativa sem precedentes no futebol nacional. Seu talento, seu faro de gol e, acima de tudo, sua fome insaciável não passaram despercebidos.
                        </p>

                        <p>
                          Esse não é um convite qualquer. É a sua chance de ir além do comum, de se livrar das correntes da mediocridade que ainda travam o nosso esporte. Estamos reunindo a verdadeira elite do talento brasileiro para moldar os predadores do futuro.
                        </p>

                        <p>
                          Compareça ao <span className="font-semibold text-red-700">Centro de Excelência Eclipse</span>, localizado na <strong>EPIA – Estrada Parque Indústria e Abastecimento</strong>, 1350 - Setor Industrial, Brasília - DF, CEP: 72220-140. Chegue pontualmente às <span className="font-semibold">06:00h</span> da <span className="font-semibold">segunda-feira</span>. Um ônibus exclusivo estará esperando para levá-lo até o centro.
                        </p>

                        <p>
                          Essa é uma peneira diferente de tudo o que você já viu, onde só os mais determinados terão a chance de fazer parte da nova geração de atletas que vai transformar o futebol brasileiro. A sua presença é mais que...essencial.
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

                    {/* Accept button */}
                    <div className="mt-6 text-center">
                      <motion.button
                        className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold rounded-lg shadow-2xl hover:from-red-700 hover:to-red-900 transition-all duration-200 tracking-wide font-bebas text-lg border border-red-500"
                        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(239, 68, 68, 0.6)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleAccept}
                      >
                        ACEITAR CONVITE
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Hover glow effect */}
          {!isOpened && (
            <motion.div
              className="absolute inset-0 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
              style={{
                background: "radial-gradient(circle, rgba(239, 68, 68, 0.4) 0%, rgba(153, 27, 27, 0.2) 50%, transparent 80%)",
                transform: "scale(1.3)"
              }}
            />
          )}
        </motion.div>

        {/* Instruction text */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <p className="text-red-400 font-orbitron text-lg tracking-wide animate-pulse">
                CLIQUE NO ENVELOPE PARA ABRIR
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}