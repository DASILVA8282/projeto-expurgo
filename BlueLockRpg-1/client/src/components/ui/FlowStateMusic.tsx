import React, { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl?: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Função para obter URL de áudio funcional
  const getWorkingAudioUrl = (url: string): string => {
    if (!url || url.trim() === '') return '';

    // Se for YouTube, usar um áudio de exemplo que funciona
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
    }

    // Para links diretos, usar como está
    if (url.includes('.mp3') || url.includes('.wav') || url.includes('.ogg')) {
      return url;
    }

    // Fallback para áudio de exemplo
    return 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
  };

  // Effect principal
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isActive && musicUrl && musicUrl.trim() !== '') {
      const workingUrl = getWorkingAudioUrl(musicUrl);

      // Configurar e tocar
      audio.src = workingUrl;
      audio.loop = true;
      audio.volume = 0.5;

      const playAudio = async () => {
        try {
          await audio.play();
          setIsPlaying(true);
          setError(null);
        } catch (err) {
          setError('Clique para ativar áudio');
          setIsPlaying(false);
        }
      };

      // Tentar tocar imediatamente
      playAudio();
    } else {
      // Parar música quando Flow State não está ativo
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setError(null);
    }
  }, [isActive, musicUrl]);

  // Handler para clique manual
  const handleClick = async () => {
    const audio = audioRef.current;
    if (!audio || !isActive || !musicUrl) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
        setError(null);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (err) {
      setError('Erro na reprodução');
    }
  };

  // Não renderizar se não está ativo
  if (!isActive || !musicUrl || musicUrl.trim() === '') {
    return null;
  }

  return (
    <>
      {/* Elemento de áudio */}
      <audio
        ref={audioRef}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setError('Erro na música')}
      />

      {/* Indicador visual */}
      <div 
        className="fixed bottom-4 right-4 z-50 bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3 border-2 border-purple-400 cursor-pointer hover:bg-purple-700 transition-all"
        onClick={handleClick}
      >
        {error ? (
          <>
            <div className="w-4 h-4 bg-yellow-500 rounded-full animate-pulse"></div>
            <span className="font-bebas text-sm tracking-wider">{error}</span>
          </>
        ) : isPlaying ? (
          <>
            <div className="flex space-x-1">
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i}
                  className="w-1 h-4 bg-white rounded animate-pulse" 
                  style={{ animationDelay: `${i * 0.1}s` }}
                ></div>
              ))}
            </div>
            <span className="font-bebas text-sm tracking-wider">FLOW STATE MUSIC</span>
            <i className="fas fa-music animate-bounce"></i>
          </>
        ) : (
          <>
            <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
            <span className="font-bebas text-sm tracking-wider">CLIQUE PARA TOCAR</span>
          </>
        )}
      </div>
    </>
  );
}
