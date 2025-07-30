import React, { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl?: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Função para converter YouTube URL para embed de áudio
  const getEmbedAudioUrl = (url: string): string => {
    if (!url || url.trim() === '') return '';

    // Se for YouTube, converter para embed
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1].split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0];
      }
      
      if (videoId) {
        // Usar API do YouTube para obter o áudio
        return `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&showinfo=0`;
      }
    }

    // Para links diretos de áudio
    if (url.includes('.mp3') || url.includes('.wav') || url.includes('.ogg') || url.includes('.m4a')) {
      return url;
    }

    // Fallback - usar um áudio de exemplo que funciona
    return 'https://commondatastorage.googleapis.com/codeskulptor-assets/Epoq-Lepidoptera.ogg';
  };

  // Effect principal
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isActive && musicUrl && musicUrl.trim() !== '') {
      console.log('🎵 Flow State Music: Iniciando reprodução');
      console.log('🎵 URL original:', musicUrl);
      
      const workingUrl = getEmbedAudioUrl(musicUrl);
      console.log('🎵 URL processada:', workingUrl);

      // Se for YouTube, usar iframe em vez de audio
      if (musicUrl.includes('youtube.com') || musicUrl.includes('youtu.be')) {
        console.log('🎵 Detectado YouTube - usando iframe');
        // Para YouTube, criar um iframe oculto
        const existingIframe = document.getElementById('flow-music-iframe');
        if (existingIframe) {
          existingIframe.remove();
        }

        const iframe = document.createElement('iframe');
        iframe.id = 'flow-music-iframe';
        iframe.src = workingUrl;
        iframe.style.position = 'fixed';
        iframe.style.top = '-1000px';
        iframe.style.left = '-1000px';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.border = 'none';
        iframe.allow = 'autoplay';
        document.body.appendChild(iframe);
        
        setIsPlaying(true);
        setError(null);
      } else {
        // Para áudio direto
        audio.src = workingUrl;
        audio.loop = true;
        audio.volume = 0.7;

        const playAudio = async () => {
          try {
            console.log('🎵 Tentando reproduzir áudio direto');
            await audio.play();
            setIsPlaying(true);
            setError(null);
            console.log('🎵 Áudio reproduzindo com sucesso');
          } catch (err) {
            console.error('🎵 Erro ao reproduzir:', err);
            setError('Clique para ativar áudio');
            setIsPlaying(false);
          }
        };

        playAudio();
      }
    } else {
      console.log('🎵 Flow State Music: Parando reprodução');
      
      // Parar música quando Flow State não está ativo
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      setError(null);
      
      // Remover iframe se existir
      const existingIframe = document.getElementById('flow-music-iframe');
      if (existingIframe) {
        existingIframe.remove();
      }
    }
  }, [isActive, musicUrl]);

  // Handler para clique manual
  const handleClick = async () => {
    const audio = audioRef.current;
    if (!isActive || !musicUrl) return;

    try {
      if (musicUrl.includes('youtube.com') || musicUrl.includes('youtu.be')) {
        // Para YouTube, recriar o iframe
        const existingIframe = document.getElementById('flow-music-iframe');
        if (existingIframe) {
          existingIframe.remove();
        }

        const workingUrl = getEmbedAudioUrl(musicUrl);
        const iframe = document.createElement('iframe');
        iframe.id = 'flow-music-iframe';
        iframe.src = workingUrl;
        iframe.style.position = 'fixed';
        iframe.style.top = '-1000px';
        iframe.style.left = '-1000px';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        iframe.style.border = 'none';
        iframe.allow = 'autoplay';
        document.body.appendChild(iframe);
        
        setIsPlaying(true);
        setError(null);
      } else {
        if (audio.paused) {
          await audio.play();
          setIsPlaying(true);
          setError(null);
        } else {
          audio.pause();
          setIsPlaying(false);
        }
      }
    } catch (err) {
      setError('Erro na reprodução');
    }
  };

  // Não renderizar se não está ativo
  if (!isActive) {
    return null;
  }

  return (
    <>
      {/* Elemento de áudio para arquivos diretos */}
      <audio
        ref={audioRef}
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setError('Erro na música')}
      />

      {/* Indicador visual sempre visível quando Flow State ativo */}
      <div 
        className="fixed bottom-4 right-4 z-[9999] bg-purple-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3 border-2 border-purple-400 cursor-pointer hover:bg-purple-700 transition-all"
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
