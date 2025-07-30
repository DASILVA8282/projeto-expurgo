
import React, { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl?: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const youtubePlayerRef = useRef<HTMLIFrameElement | null>(null);

  // Função para extrair ID do YouTube
  const getYouTubeVideoId = (url: string): string | null => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=)([^&\n?#]+)/,
      /(?:youtu\.be\/)([^&\n?#]+)/,
      /(?:youtube\.com\/embed\/)([^&\n?#]+)/
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    
    return null;
  };

  // Função para verificar se é URL do YouTube
  const isYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Função para verificar se é áudio direto
  const isDirectAudioUrl = (url: string): boolean => {
    return /\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i.test(url);
  };

  // Função para criar player do YouTube visível e funcional
  const createYouTubePlayer = (videoId: string) => {
    console.log('🎵 Criando player YouTube para:', videoId);
    
    // Remove player anterior
    if (youtubePlayerRef.current) {
      document.body.removeChild(youtubePlayerRef.current);
      youtubePlayerRef.current = null;
    }

    // Cria iframe visível para o YouTube
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=1&mute=0&enablejsapi=1&origin=${window.location.origin}`;
    iframe.style.position = 'fixed';
    iframe.style.bottom = '20px';
    iframe.style.right = '20px';
    iframe.style.width = '300px';
    iframe.style.height = '169px';
    iframe.style.border = '2px solid #dc2626';
    iframe.style.borderRadius = '10px';
    iframe.style.zIndex = '9999';
    iframe.style.background = 'black';
    iframe.allow = 'autoplay; encrypted-media';
    iframe.setAttribute('allowfullscreen', 'true');
    iframe.title = 'Flow State Music';

    document.body.appendChild(iframe);
    youtubePlayerRef.current = iframe;

    setIsPlaying(true);
    setError(null);
    console.log('🎵 Player YouTube criado e anexado');
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

    // Remover player do YouTube
    if (youtubePlayerRef.current) {
      try {
        document.body.removeChild(youtubePlayerRef.current);
      } catch (e) {
        console.log('🎵 Player já foi removido');
      }
      youtubePlayerRef.current = null;
    }

    setIsPlaying(false);
    setError(null);
  };

  // Effect principal para controlar a música
  useEffect(() => {
    console.log('🎵 FlowStateMusic Effect - isActive:', isActive, 'musicUrl:', musicUrl);

    if (isActive && musicUrl && musicUrl.trim() !== '') {
      console.log('🎵 Iniciando reprodução da música do Flow State');
      
      // Pequeno delay para garantir que a UI esteja pronta
      setTimeout(() => {
        if (isYouTubeUrl(musicUrl)) {
          console.log('🎵 Detectado YouTube URL:', musicUrl);
          const videoId = getYouTubeVideoId(musicUrl);
          if (videoId) {
            createYouTubePlayer(videoId);
          } else {
            console.error('🎵 Não foi possível extrair ID do vídeo');
            setError('URL do YouTube inválida');
          }
        } else if (isDirectAudioUrl(musicUrl)) {
          console.log('🎵 Detectado áudio direto:', musicUrl);
          playDirectAudio(musicUrl);
        } else {
          console.log('🎵 URL não reconhecida, tentando como áudio direto');
          playDirectAudio(musicUrl);
        }
      }, 500);
    } else {
      console.log('🎵 Parando música - Flow State inativo ou sem URL');
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

      {/* Indicador visual discreto - posicionado para não interferir com o player do YouTube */}
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
