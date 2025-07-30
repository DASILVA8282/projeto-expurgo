import React, { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl?: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  // Extrair ID do YouTube da URL e converter para link direto
  const getAudioUrl = (url: string): string => {
    if (!url) return '';

    // Se já é um link direto de áudio, usar como está
    if (url.includes('.mp3') || url.includes('.wav') || url.includes('.ogg')) {
      return url;
    }

    // Para YouTube, vamos usar um serviço de conversão ou sugerir upload direto
    // Por enquanto, retornar uma URL de exemplo para teste
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      // Aqui você pode implementar integração com um serviço de conversão
      // Por enquanto, vou usar um áudio de exemplo
      return 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
    }

    return url;
  };

  // Inicializar áudio
  const initializeAudio = async (audioUrl: string) => {
    if (!audioRef.current || !audioUrl) return;

    setIsLoading(true);
    setError(null);

    try {
      const audio = audioRef.current;
      audio.src = getAudioUrl(audioUrl);
      audio.loop = true;
      audio.volume = 0.7;

      // Aguardar carregamento
      await new Promise((resolve, reject) => {
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
        audio.load();
      });

      setIsLoading(false);

      // Tentar reproduzir
      await playAudio();

    } catch (error) {
      console.error('Erro ao inicializar áudio:', error);
      setError('Erro ao carregar música');
      setIsLoading(false);
    }
  };

  // Reproduzir áudio
  const playAudio = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();
      setIsPlaying(true);
      setError(null);
    } catch (error) {
      console.error('Erro ao reproduzir áudio:', error);
      setError('Clique para ativar áudio');
      setIsPlaying(false);
    }
  };

  // Parar áudio
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Handler para clique do usuário (necessário para autoplay)
  const handleUserClick = async () => {
    setUserInteracted(true);
    if (isActive && musicUrl && audioRef.current) {
      await playAudio();
    }
  };

  // Effect principal
  useEffect(() => {
    if (isActive && musicUrl && musicUrl.trim() !== "") {
      console.log('Flow State Music: Iniciando reprodução');
      initializeAudio(musicUrl);
    } else {
      console.log('Flow State Music: Parando reprodução');
      stopAudio();
      setError(null);
    }
  }, [isActive, musicUrl]);

  // Cleanup
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  // Não renderizar se não está ativo
  if (!isActive || !musicUrl || musicUrl.trim() === "") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Elemento de áudio oculto */}
      <audio
        ref={audioRef}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setError('Erro na reprodução');
          setIsPlaying(false);
          setIsLoading(false);
        }}
        onLoadStart={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
      />

      {/* Indicador visual */}
      <div 
        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3 border-2 border-purple-400 cursor-pointer hover:from-purple-700 hover:to-purple-800 transition-all"
        onClick={handleUserClick}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="font-bebas text-sm tracking-wider">CARREGANDO MÚSICA</span>
          </>
        ) : error ? (
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
            <div className="w-4 h-4 bg-purple-300 rounded-full animate-pulse"></div>
            <span className="font-bebas text-sm tracking-wider">CLIQUE PARA ATIVAR</span>
          </>
        )}
      </div>
    </div>
  );
}
