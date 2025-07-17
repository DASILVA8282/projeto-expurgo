import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Character } from '@shared/schema';

interface CharacterIntroductionProps {
  character: Character;
  isVisible: boolean;
  onComplete: () => void;
}

export default function CharacterIntroduction({ character, isVisible, onComplete }: CharacterIntroductionProps) {
  const [hasStarted, setHasStarted] = React.useState(false);
  const timerRef = React.useRef<NodeJS.Timeout | null>(null);
  const safetyTimerRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (isVisible && character && !hasStarted) {
      console.log("Character introduction starting for:", character.name);
      setHasStarted(true);
      
      // Timer principal de 6 segundos
      timerRef.current = setTimeout(() => {
        console.log("Character introduction timer completed for:", character.name);
        onComplete();
      }, 6000);

      // Timer de segurança de 8 segundos para garantir que sempre termine
      safetyTimerRef.current = setTimeout(() => {
        console.log("Character introduction safety timeout triggered for:", character.name);
        onComplete();
      }, 8000);
    }

    // Cleanup ao desmontar ou quando isVisible muda para false
    if (!isVisible && hasStarted) {
      setHasStarted(false);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      if (safetyTimerRef.current) {
        clearTimeout(safetyTimerRef.current);
        safetyTimerRef.current = null;
      }
    };
  }, [isVisible, character, onComplete, hasStarted]);

  // Cleanup quando componente é desmontado (sem dependências para evitar loops)
  React.useEffect(() => {
    return () => {
      console.log("Character introduction component unmounting");
    };
  }, []);

  if (!isVisible || !character) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Efeitos de fundo */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Linhas de energia */}
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-blue-400 to-cyan-300"
              style={{
                top: `${20 + i * 10}%`,
                left: '-100%',
                width: '200%',
                transform: `rotate(${i * 15}deg)`,
              }}
              initial={{ x: '-100%', opacity: 0 }}
              animate={{ 
                x: '100%', 
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
          
          {/* Partículas de energia */}
          {Array.from({ length: 15 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -50],
              }}
              transition={{
                duration: 4,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>

        {/* Conteúdo principal */}
        <div className="relative z-10 flex items-center justify-center space-x-12">
          {/* Imagem do personagem circular */}
          <motion.div
            className="relative"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          >
            {/* Anel externo pulsante */}
            <motion.div
              className="absolute inset-0 w-64 h-64 rounded-full border-4 border-cyan-400"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                  '0 0 40px rgba(34, 211, 238, 0.6)',
                  '0 0 20px rgba(34, 211, 238, 0.3)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            
            {/* Imagem do personagem */}
            <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-white/20 bg-gray-800">
              {character.avatar ? (
                <img
                  src={character.avatar}
                  alt={character.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback se imagem falhar
                    e.currentTarget.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
                  <span className="text-white text-6xl font-bold">
                    {character.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              {/* Fallback sempre presente para quando não há imagem */}
              {!character.avatar && (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700">
                  <span className="text-white text-6xl font-bold">
                    {character.name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Informações do personagem */}
          <motion.div
            className="text-white space-y-6"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            {/* Título "NOVO BL RANKING" estilizado */}
            <motion.div
              className="text-center mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <div className="text-white text-2xl font-bold mb-2 tracking-widest">
                RANK
              </div>
            </motion.div>

            {/* Logo Blue Lock com rank */}
            <motion.div
              className="flex items-center justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="relative w-40 h-40 flex items-center justify-center">
                {/* Logo Blue Lock Pentagon */}
                <svg 
                  width="160" 
                  height="160" 
                  viewBox="0 0 160 160" 
                  className="absolute inset-0"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(59, 130, 246, 0.6))',
                  }}
                >
                  <defs>
                    <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1e40af" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                  </defs>
                  
                  {/* Pentagon dividido em 5 partes */}
                  <g transform="translate(80, 80)">
                    {/* Parte superior */}
                    <path 
                      d="M 0,-60 L 57,-18 L 0,0 Z" 
                      fill="url(#blueGradient)" 
                      stroke="#1e40af" 
                      strokeWidth="2"
                    />
                    {/* Parte superior direita */}
                    <path 
                      d="M 0,0 L 57,-18 L 35,48 Z" 
                      fill="url(#blueGradient)" 
                      stroke="#1e40af" 
                      strokeWidth="2"
                    />
                    {/* Parte inferior direita */}
                    <path 
                      d="M 0,0 L 35,48 L -35,48 Z" 
                      fill="url(#blueGradient)" 
                      stroke="#1e40af" 
                      strokeWidth="2"
                    />
                    {/* Parte inferior esquerda */}
                    <path 
                      d="M 0,0 L -35,48 L -57,-18 Z" 
                      fill="url(#blueGradient)" 
                      stroke="#1e40af" 
                      strokeWidth="2"
                    />
                    {/* Parte superior esquerda */}
                    <path 
                      d="M 0,0 L -57,-18 L 0,-60 Z" 
                      fill="url(#blueGradient)" 
                      stroke="#1e40af" 
                      strokeWidth="2"
                    />
                  </g>
                </svg>
                
                {/* Rank text */}
                <div className="relative z-10 text-white font-bold text-2xl text-center">
                  <div className="text-lg">RANK</div>
                  <div className="text-3xl font-black">{character.ranking || 299}</div>
                </div>
              </div>
            </motion.div>

            {/* Nome do personagem */}
            <motion.div
              className="text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="text-white text-4xl font-bold mb-2 tracking-wider">
                {character.name.toUpperCase()}
              </div>
              <div className="text-gray-300 text-xl">
                {character.position || 'JOGADOR'}
              </div>
            </motion.div>

            {/* Barra de progresso da cutscene */}
            <motion.div
              className="w-full h-3 bg-gray-700 rounded-full overflow-hidden mt-8"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, delay: 1.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 6, delay: 0, ease: 'linear' }}
              />
            </motion.div>
            
            {/* Texto indicador de progresso */}
            <motion.div
              className="text-center text-cyan-400 text-sm mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              Preparando entrada em campo...
            </motion.div>
          </motion.div>
        </div>

        {/* Texto "ENTRANDO NO BLUE LOCK" na parte inferior */}
        <motion.div
          className="absolute bottom-20 left-0 right-0 text-center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.5, delay: 3 }}
        >
          <div className="text-white text-3xl font-bold tracking-wider">
            ENTRANDO EM CAMPO
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}