import React, { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl?: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userInteractionNeeded, setUserInteractionNeeded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Função simplificada para tocar áudio
  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio || !musicUrl) return;

    try {
      console.log('🎵 Iniciando reprodução de:', musicUrl);

      // Limpar áudio anterior
      audio.pause();
      audio.currentTime = 0;

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
      const playPromise = audio.play();

      if (playPromise !== undefined) {
        await playPromise;
        console.log('🎵 Música tocando com sucesso!');
        setIsPlaying(true);
        setError(null);
        setUserInteractionNeeded(false);
      }
    } catch (err) {
      console.error('🎵 Erro na reprodução automática:', err);
      setUserInteractionNeeded(true);
      setError('Clique para tocar');
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
    setUserInteractionNeeded(false);
  };

  // Handler para clique do usuário
  const handleUserPlay = async () => {
    const audio = audioRef.current;
    if (!audio || !musicUrl) return;

    try {
      if (audio.src !== musicUrl) {
        audio.src = musicUrl;
        audio.load();
      }

      await audio.play();
      setIsPlaying(true);
      setError(null);
      setUserInteractionNeeded(false);
      console.log('🎵 Música iniciada pelo usuário!');
    } catch (err) {
      console.error('🎵 Erro mesmo com interação do usuário:', err);
      setError('Erro na reprodução');
    }
  };

  // Effect principal
  useEffect(() => {
    console.log('🎵 FlowStateMusic - isActive:', isActive, 'musicUrl:', musicUrl);

    if (isActive && musicUrl && musicUrl.trim() !== '') {
      console.log('🎵 Tentando tocar música:', musicUrl);
      playAudio();
    } else {
      console.log('🎵 Parando música');
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

      {/* Botão para interação do usuário se necessário */}
      {userInteractionNeeded && (
        <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center">
          <div className="bg-slate-800 border border-purple-500 rounded-lg p-6 text-center">
            <div className="text-white mb-4">
              <h3 className="text-xl font-bold mb-2">🎵 Flow State Music</h3>
              <p className="text-gray-300">Clique para iniciar a música</p>
            </div>
            <button
              onClick={handleUserPlay}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
            >
              ▶️ Tocar Música
            </button>
          </div>
        </div>
      )}

      {/* Indicador visual */}
      <div className="fixed top-4 right-4 z-[9998] pointer-events-none">
        <div className="bg-black/80 text-white px-4 py-2 rounded-lg shadow-lg border border-purple-500/50 flex items-center space-x-3">
          {error && !userInteractionNeeded ? (
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
          ) : userInteractionNeeded ? (
            <>
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Clique para tocar</span>
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
