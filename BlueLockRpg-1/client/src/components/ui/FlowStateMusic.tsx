
import React, { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl?: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerInstanceRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const currentMusicUrlRef = useRef<string>("");

  // Extrair ID do YouTube da URL
  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Garantir que a API do YouTube está carregada
  const ensureYouTubeAPILoaded = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Se já está carregada
      if (window.YT && window.YT.Player) {
        console.log('YouTube API already available');
        resolve();
        return;
      }

      // Se já há um script carregando
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (existingScript) {
        // Aguardar API ficar disponível
        const checkInterval = setInterval(() => {
          if (window.YT && window.YT.Player) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
        
        setTimeout(() => {
          clearInterval(checkInterval);
          reject(new Error('YouTube API load timeout'));
        }, 10000);
        return;
      }

      // Carregar a API
      console.log('Loading YouTube API...');
      setIsLoading(true);

      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      
      script.onerror = () => {
        console.error('Failed to load YouTube API script');
        setError('Failed to load YouTube API');
        setIsLoading(false);
        reject(new Error('Failed to load YouTube API'));
      };

      // Callback global para quando a API estiver pronta
      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API ready!');
        setIsLoading(false);
        setError(null);
        resolve();
      };

      document.head.appendChild(script);
    });
  };

  // Criar player
  const createPlayer = async (videoUrl: string) => {
    const videoId = extractYouTubeId(videoUrl);
    if (!videoId) {
      console.error('Invalid YouTube URL:', videoUrl);
      setError('URL do YouTube inválida');
      return;
    }

    console.log('Creating YouTube player for video ID:', videoId);

    try {
      // Garantir que a API está carregada
      await ensureYouTubeAPILoaded();

      if (!containerRef.current) {
        console.error('No container element for player');
        return;
      }

      console.log('Creating new YouTube player instance');
      setIsLoading(true);
      setError(null);

      // Limpar container
      containerRef.current.innerHTML = '';

      // Criar um div específico para o player
      const playerDiv = document.createElement('div');
      playerDiv.id = `youtube-player-${Date.now()}`;
      containerRef.current.appendChild(playerDiv);

      const player = new window.YT.Player(playerDiv, {
        height: '1',
        width: '1',
        videoId: videoId,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: videoId,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          fs: 0,
          cc_load_policy: 0,
          disablekb: 1,
          autohide: 1,
          start: 0,
          playsinline: 1,
          enablejsapi: 1,
          origin: window.location.origin
        },
        events: {
          onReady: (event: any) => {
            console.log('YouTube player ready - starting music');
            setIsLoading(false);
            playerInstanceRef.current = event.target;
            currentMusicUrlRef.current = videoUrl;
            
            try {
              // Definir volume alto
              event.target.setVolume(100);
              // Iniciar reprodução imediatamente
              event.target.playVideo();
              console.log('Music playback started successfully');
              setIsPlaying(true);
            } catch (e) {
              console.error('Error starting playback:', e);
              setError('Erro ao iniciar reprodução');
            }
          },
          onStateChange: (event: any) => {
            console.log('Player state changed:', event.data);
            const state = event.data;
            
            if (state === window.YT.PlayerState.PLAYING) {
              console.log('Music is now playing');
              setIsPlaying(true);
              setError(null);
              setIsLoading(false);
            } else if (state === window.YT.PlayerState.PAUSED) {
              console.log('Music paused - attempting to resume');
              // Tentar reativar automaticamente
              if (playerInstanceRef.current) {
                playerInstanceRef.current.playVideo();
              }
            } else if (state === window.YT.PlayerState.ENDED) {
              console.log('Music ended - restarting loop');
              // Loop infinito
              event.target.playVideo();
            } else if (state === window.YT.PlayerState.BUFFERING) {
              console.log('Music buffering');
              setIsLoading(true);
            } else if (state === window.YT.PlayerState.CUED) {
              console.log('Music cued - starting playback');
              event.target.playVideo();
            }
          },
          onError: (event: any) => {
            console.error('YouTube player error:', event.data);
            let errorMessage = 'Erro na reprodução';
            
            switch (event.data) {
              case 2:
                errorMessage = 'ID do vídeo inválido';
                break;
              case 5:
                errorMessage = 'Erro de reprodução HTML5';
                break;
              case 100:
                errorMessage = 'Vídeo não encontrado';
                break;
              case 101:
              case 150:
                errorMessage = 'Vídeo não permite reprodução incorporada';
                break;
              default:
                errorMessage = `Erro de reprodução: ${event.data}`;
            }
            
            setError(errorMessage);
            setIsLoading(false);
            setIsPlaying(false);
          }
        }
      });

    } catch (error) {
      console.error('Error creating YouTube player:', error);
      setError('Falha ao criar player de música');
      setIsLoading(false);
    }
  };

  // Destruir player
  const destroyPlayer = () => {
    if (playerInstanceRef.current) {
      console.log('Destroying YouTube player');
      try {
        playerInstanceRef.current.stopVideo();
        playerInstanceRef.current.destroy();
      } catch (e) {
        console.warn('Error destroying player:', e);
      }
      playerInstanceRef.current = null;
      currentMusicUrlRef.current = "";
      setIsPlaying(false);
      setIsLoading(false);
      setError(null);
    }
  };

  // Effect principal
  useEffect(() => {
    console.log('=== FLOW STATE MUSIC COMPONENT DEBUG ===');
    console.log('FlowStateMusic effect triggered');
    console.log('- isActive:', isActive);
    console.log('- musicUrl received:', musicUrl);
    console.log('- musicUrl type:', typeof musicUrl);
    console.log('- musicUrl length:', musicUrl ? musicUrl.length : 0);
    console.log('- musicUrl after trim:', musicUrl ? musicUrl.trim() : 'null/undefined');
    console.log('- should play condition:', isActive && musicUrl && musicUrl.trim() !== "");

    if (isActive && musicUrl && musicUrl.trim() !== "") {
      console.log('✅ Flow State music should start playing');
      
      // Se já temos um player com a mesma URL, garantir que está tocando
      if (playerInstanceRef.current && currentMusicUrlRef.current === musicUrl) {
        console.log('Player exists with same URL - ensuring it plays');
        try {
          playerInstanceRef.current.playVideo();
        } catch (e) {
          console.warn('Error resuming existing player:', e);
        }
        return;
      }

      // Destruir player existente se URL mudou
      if (playerInstanceRef.current && currentMusicUrlRef.current !== musicUrl) {
        console.log('Music URL changed - destroying old player');
        destroyPlayer();
      }

      // Criar novo player após um pequeno delay
      console.log('Creating new player for Flow State music');
      const timer = setTimeout(() => {
        createPlayer(musicUrl);
      }, 100);
      
      return () => clearTimeout(timer);

    } else {
      // Flow State desativado - destruir player
      console.log('Flow State deactivated - destroying player');
      destroyPlayer();
    }
  }, [isActive, musicUrl]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      console.log('FlowStateMusic component unmounting');
      destroyPlayer();
    };
  }, []);

  // Debug contínuo
  useEffect(() => {
    const interval = setInterval(() => {
      if (isActive && musicUrl) {
        console.log('FlowStateMusic status check:', {
          isActive,
          musicUrl: musicUrl ? 'HAS_URL' : 'NO_URL',
          hasPlayer: !!playerInstanceRef.current,
          isPlaying,
          isLoading,
          error
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isActive, musicUrl, isPlaying, isLoading, error]);

  if (!isActive || !musicUrl || musicUrl.trim() === "") {
    console.log('FlowStateMusic not rendering - isActive:', isActive, 'musicUrl:', !!musicUrl);
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Player do YouTube - oculto mas funcional */}
      <div 
        ref={containerRef} 
        style={{ 
          position: 'absolute',
          left: '-9999px',
          top: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      ></div>
      
      {/* Indicador visual */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3 border-2 border-purple-400">
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="font-bebas text-sm tracking-wider">CARREGANDO MÚSICA</span>
          </>
        ) : error ? (
          <>
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="font-bebas text-sm tracking-wider">ERRO: {error}</span>
          </>
        ) : isPlaying ? (
          <>
            <div className="flex space-x-1">
              <div className="w-1 h-4 bg-white rounded animate-pulse"></div>
              <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            </div>
            <span className="font-bebas text-sm tracking-wider">FLOW STATE MUSIC</span>
            <i className="fas fa-music animate-bounce"></i>
          </>
        ) : (
          <>
            <div className="w-4 h-4 bg-purple-300 rounded-full animate-pulse"></div>
            <span className="font-bebas text-sm tracking-wider">INICIANDO MÚSICA</span>
          </>
        )}
      </div>
    </div>
  );
}

// Declarar tipos para a API do YouTube
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}
