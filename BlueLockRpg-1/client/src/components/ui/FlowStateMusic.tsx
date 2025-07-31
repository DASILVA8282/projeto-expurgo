
import React, { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl?: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Função para tocar áudio
  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio || !musicUrl) return;

    try {
      console.log('🎵 Tentando tocar música:', musicUrl);

      // Configurar áudio
      audio.src = musicUrl;
      audio.loop = true;
      audio.volume = 0.7;
      audio.preload = 'auto';

      // Aguardar carregamento
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => reject(new Error('Timeout')), 5000);

        const onCanPlay = () => {
          clearTimeout(timeout);
          audio.removeEventListener('canplaythrough', onCanPlay);
          audio.removeEventListener('error', onError);
          resolve(true);
        };

        const onError = (e: any) => {
          clearTimeout(timeout);
          audio.removeEventListener('canplaythrough', onCanPlay);
          audio.removeEventListener('error', onError);
          reject(e);
        };

        audio.addEventListener('canplaythrough', onCanPlay);
        audio.addEventListener('error', onError);
        audio.load();
      });

      // Tentar reproduzir
      await audio.play();
      console.log('🎵 Música tocando com sucesso!');
      setIsPlaying(true);
      setError(null);

    } catch (err) {
      console.log('🎵 Reprodução automática bloqueada, tentando com interação do usuário...');

      // Adicionar listener para próxima interação
      const startOnInteraction = () => {
        const audio = audioRef.current;
        if (audio && musicUrl) {
          audio.play().then(() => {
            setIsPlaying(true);
            setError(null);
            console.log('🎵 Música iniciada após interação!');
          }).catch(console.error);
        }
        document.removeEventListener('click', startOnInteraction);
        document.removeEventListener('touchstart', startOnInteraction);
      };

      document.addEventListener('click', startOnInteraction);
      document.addEventListener('touchstart', startOnInteraction);

      setError('Clique para iniciar música');
    }
  };

  // Função para parar música
  const stopAudio = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.src = '';
    }
    setIsPlaying(false);
    setError(null);
  };

  // Effect principal - VERSÃO FUNCIONANDO
  useEffect(() => {
    console.log('🎵 FlowStateMusic - isActive:', isActive, 'musicUrl:', musicUrl);
    console.log('🎵 FlowStateMusic - musicUrl length:', musicUrl?.length || 0);

    if (isActive && musicUrl && musicUrl.trim() !== '') {
      console.log('🎵 Tentando tocar música para TODOS os usuários:', musicUrl);
      playAudio();
    } else {
      console.log('🎵 Parando música - isActive:', isActive, 'musicUrl exists:', !!musicUrl);
      stopAudio();
    }

    return () => {
      if (!isActive) {
        stopAudio();
      }
    };
  }, [isActive, musicUrl]);

  // Cleanup no unmount
  useEffect(() => {
    return () => stopAudio();
  }, []);

  // Handler para clique manual
  const handleManualPlay = () => {
    if (audioRef.current && musicUrl) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setError(null);
      }).catch(console.error);
    }
  };

  if (!isActive) {
    return null;
  }

  return (
    <>
      {/* Elemento de áudio */}
      <audio
        ref={audioRef}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={(e) => {
          console.error('🎵 Erro no áudio:', e);
          setError('Erro na música');
        }}
      />

      {/* Botão manual se houver erro */}
      {error && (
        <div className="fixed bottom-4 right-4 z-[9999]">
          <button
            onClick={handleManualPlay}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg border border-purple-500/50 flex items-center space-x-2"
          >
            <div className="w-3 h-3 bg-white rounded-full"></div>
            <span className="text-sm font-medium">▶ Tocar música</span>
          </button>
        </div>
      )}

      {/* Indicador visual */}
      <div className="fixed top-4 right-4 z-[9998] pointer-events-none">
        <div className="bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg border border-purple-500/50 flex items-center space-x-3">
          {isPlaying ? (
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
          ) : error ? (
            <>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Música aguardando</span>
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
