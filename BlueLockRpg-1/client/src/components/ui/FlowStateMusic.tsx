
import React, { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl?: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Função para verificar se é áudio direto (agora incluindo uploads locais)
  const isDirectAudioUrl = (url: string): boolean => {
    return /\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i.test(url) || url.startsWith('/uploads/');
  };

  

  // Função para tocar áudio direto
  const playDirectAudio = async (url: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      console.log('🎵 Tentando reproduzir áudio direto:', url);
      
      audio.src = url;
      audio.loop = true;
      audio.volume = 0.7;

      const playPromise = audio.play();
      
      if (playPromise !== undefined) {
        await playPromise;
        console.log('🎵 Áudio direto reproduzindo com sucesso');
        setIsPlaying(true);
        setError(null);
      }

    } catch (err) {
      console.error('🎵 Erro ao reproduzir áudio direto:', err);
      setError('Erro na reprodução');
      setIsPlaying(false);
    }
  };

  // Função para parar toda música
  const stopMusic = () => {
    console.log('🎵 Parando toda reprodução de música');

    // Parar áudio direto
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    }

    setIsPlaying(false);
    setError(null);
  };

  // Effect principal para controlar a música
  useEffect(() => {
    console.log('🎵 FlowStateMusic Effect - isActive:', isActive, 'musicUrl:', musicUrl);
    console.log('🎵 Music URL type:', typeof musicUrl);
    console.log('🎵 Music URL length:', musicUrl?.length || 0);
    console.log('🎵 Music URL starts with /uploads?', musicUrl?.startsWith('/uploads/'));

    if (isActive && musicUrl && musicUrl.trim() !== '') {
      console.log('🎵 Iniciando reprodução da música do Flow State');
      console.log('🎵 URL final que será reproduzida:', musicUrl);
      
      // Pequeno delay para garantir que a UI esteja pronta
      setTimeout(() => {
        console.log('🎵 Reproduzindo áudio direto:', musicUrl);
        playDirectAudio(musicUrl);
      }, 500);
    } else {
      console.log('🎵 Parando música - Flow State inativo ou sem URL');
      console.log('🎵 Motivo: isActive =', isActive, ', musicUrl =', musicUrl || 'undefined/null');
      stopMusic();
    }

    // Cleanup quando componente desmonta ou Flow State muda
    return () => {
      if (!isActive) {
        stopMusic();
      }
    };
  }, [isActive, musicUrl]);

  // Cleanup no unmount
  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  // Não renderizar nada se não está ativo
  if (!isActive) {
    return null;
  }

  return (
    <>
      {/* Elemento de áudio para arquivos diretos */}
      <audio
        ref={audioRef}
        preload="auto"
        onPlay={() => {
          console.log('🎵 Áudio direto iniciou reprodução');
          setIsPlaying(true);
        }}
        onPause={() => {
          console.log('🎵 Áudio direto pausado');
          setIsPlaying(false);
        }}
        onError={(e) => {
          console.error('🎵 Erro no elemento audio:', e);
          setError('Erro na música');
        }}
        onLoadStart={() => console.log('🎵 Carregamento do áudio iniciado')}
        onCanPlay={() => console.log('🎵 Áudio pode ser reproduzido')}
      />

      {/* Indicador visual discreto */}
      <div className="fixed top-4 right-4 z-[9998] pointer-events-none">
        <div className="bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg border border-purple-500/50 flex items-center space-x-3">
          {error ? (
            <>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm font-medium">Erro na música</span>
            </>
          ) : isPlaying ? (
            <>
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i}
                    className="w-1 h-4 bg-purple-400 rounded animate-pulse" 
                    style={{ animationDelay: `${i * 0.2}s` }}
                  ></div>
                ))}
              </div>
              <span className="text-sm font-medium">♪ Flow State</span>
            </>
          ) : (
            <>
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <span className="text-sm font-medium">Carregando...</span>
            </>
          )}
        </div>
      </div>
    </>
  );
}
