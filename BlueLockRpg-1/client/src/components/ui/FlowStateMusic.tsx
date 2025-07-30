
import React, { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl?: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

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

  // Função para criar URL embed do YouTube
  const createYouTubeEmbedUrl = (videoId: string): string => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&showinfo=0&mute=0`;
  };

  // Função para verificar se é URL do YouTube
  const isYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Função para verificar se é áudio direto
  const isDirectAudioUrl = (url: string): boolean => {
    return /\.(mp3|wav|ogg|m4a|aac|flac)(\?.*)?$/i.test(url);
  };

  // Effect principal para controlar a música
  useEffect(() => {
    console.log('🎵 FlowStateMusic Effect - isActive:', isActive, 'musicUrl:', musicUrl);

    if (isActive && musicUrl && musicUrl.trim() !== '') {
      console.log('🎵 Iniciando reprodução da música do Flow State');
      
      if (isYouTubeUrl(musicUrl)) {
        console.log('🎵 Detectado YouTube URL:', musicUrl);
        playYouTubeMusic(musicUrl);
      } else if (isDirectAudioUrl(musicUrl)) {
        console.log('🎵 Detectado áudio direto:', musicUrl);
        playDirectAudio(musicUrl);
      } else {
        console.log('🎵 URL não reconhecida, tentando como áudio direto');
        playDirectAudio(musicUrl);
      }
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

  // Função para tocar música do YouTube
  const playYouTubeMusic = (url: string) => {
    try {
      const videoId = getYouTubeVideoId(url);
      if (!videoId) {
        console.error('🎵 Não foi possível extrair ID do vídeo do YouTube');
        setError('URL do YouTube inválida');
        return;
      }

      console.log('🎵 YouTube Video ID extraído:', videoId);

      // Remove iframe anterior se existir
      if (iframeRef.current) {
        document.body.removeChild(iframeRef.current);
        iframeRef.current = null;
      }

      // Cria novo iframe para YouTube
      const iframe = document.createElement('iframe');
      iframe.src = createYouTubeEmbedUrl(videoId);
      iframe.style.position = 'fixed';
      iframe.style.top = '-9999px';
      iframe.style.left = '-9999px';
      iframe.style.width = '1px';
      iframe.style.height = '1px';
      iframe.style.border = 'none';
      iframe.style.opacity = '0';
      iframe.style.pointerEvents = 'none';
      iframe.allow = 'autoplay; encrypted-media';
      iframe.setAttribute('allowfullscreen', 'true');

      // Adiciona ao DOM
      document.body.appendChild(iframe);
      iframeRef.current = iframe;

      console.log('🎵 YouTube iframe criado e adicionado ao DOM');
      setIsPlaying(true);
      setError(null);

    } catch (err) {
      console.error('🎵 Erro ao reproduzir YouTube:', err);
      setError('Erro ao reproduzir YouTube');
      setIsPlaying(false);
    }
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

      // Tentar reproduzir
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

    // Remover iframe do YouTube
    if (iframeRef.current) {
      try {
        document.body.removeChild(iframeRef.current);
      } catch (e) {
        console.log('🎵 Iframe já foi removido');
      }
      iframeRef.current = null;
    }

    setIsPlaying(false);
    setError(null);
  };

  // Cleanup no unmount
  useEffect(() => {
    return () => {
      stopMusic();
    };
  }, []);

  // Não renderizar nada - música toca automaticamente em background
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
      <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
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
