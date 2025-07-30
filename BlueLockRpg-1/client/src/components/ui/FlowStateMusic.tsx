
import { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const playerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const apiLoadedRef = useRef(false);
  const playerInstanceRef = useRef<any>(null);

  // Função para extrair ID do vídeo do YouTube
  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  };

  // Carregar API do YouTube uma única vez
  useEffect(() => {
    const loadYouTubeAPI = () => {
      if (apiLoadedRef.current || window.YT) {
        console.log('YouTube API already loaded');
        apiLoadedRef.current = true;
        return;
      }

      console.log('Loading YouTube API...');
      setIsLoading(true);

      // Remover script existente se houver
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (existingScript) {
        existingScript.remove();
      }

      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      
      script.onload = () => {
        console.log('YouTube API script loaded');
      };

      script.onerror = () => {
        console.error('Failed to load YouTube API script');
        setError('Failed to load YouTube API');
        setIsLoading(false);
      };

      // Callback global para quando a API estiver pronta
      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API ready!');
        apiLoadedRef.current = true;
        setIsLoading(false);
        setError(null);
      };

      document.head.appendChild(script);
    };

    loadYouTubeAPI();
  }, []);

  // Criar/destruir player baseado no estado
  useEffect(() => {
    const createPlayer = async () => {
      if (!isActive || !musicUrl || !apiLoadedRef.current || !window.YT || !window.YT.Player) {
        console.log('Cannot create player:', { 
          isActive, 
          hasMusicUrl: !!musicUrl, 
          apiLoaded: apiLoadedRef.current,
          hasYT: !!window.YT
        });
        return;
      }

      const videoId = extractYouTubeId(musicUrl);
      if (!videoId) {
        console.error('Invalid YouTube URL:', musicUrl);
        setError('Invalid YouTube URL');
        return;
      }

      if (playerInstanceRef.current) {
        console.log('Destroying existing player');
        try {
          playerInstanceRef.current.destroy();
        } catch (e) {
          console.warn('Error destroying player:', e);
        }
        playerInstanceRef.current = null;
      }

      if (!containerRef.current) {
        console.error('No container element for player');
        return;
      }

      console.log('Creating YouTube player with video ID:', videoId);
      setIsLoading(true);
      setError(null);

      try {
        // Limpar container
        containerRef.current.innerHTML = '';

        const player = new window.YT.Player(containerRef.current, {
          height: '0',
          width: '0',
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
            origin: window.location.origin
          },
          events: {
            onReady: (event: any) => {
              console.log('Player ready, starting playback');
              setIsLoading(false);
              playerInstanceRef.current = event.target;
              
              // Tentar reproduzir
              try {
                event.target.playVideo();
                setIsPlaying(true);
              } catch (e) {
                console.error('Error starting playback:', e);
                setError('Playback failed');
              }
            },
            onStateChange: (event: any) => {
              console.log('Player state changed:', event.data);
              const state = event.data;
              
              if (state === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setError(null);
              } else if (state === window.YT.PlayerState.PAUSED) {
                setIsPlaying(false);
              } else if (state === window.YT.PlayerState.ENDED) {
                // Loop the video
                event.target.playVideo();
              } else if (state === window.YT.PlayerState.BUFFERING) {
                setIsLoading(true);
              } else if (state === window.YT.PlayerState.CUED) {
                setIsLoading(false);
              }
            },
            onError: (event: any) => {
              console.error('YouTube player error:', event.data);
              setError(`Playback error: ${event.data}`);
              setIsLoading(false);
              setIsPlaying(false);
            }
          }
        });

      } catch (error) {
        console.error('Error creating YouTube player:', error);
        setError('Failed to create player');
        setIsLoading(false);
      }
    };

    const destroyPlayer = () => {
      if (playerInstanceRef.current) {
        console.log('Destroying player due to inactive state');
        try {
          playerInstanceRef.current.destroy();
        } catch (e) {
          console.warn('Error destroying player:', e);
        }
        playerInstanceRef.current = null;
        setIsPlaying(false);
        setIsLoading(false);
      }
    };

    if (isActive && musicUrl) {
      // Pequeno delay para garantir que a API está carregada
      const timer = setTimeout(createPlayer, 500);
      return () => clearTimeout(timer);
    } else {
      destroyPlayer();
    }
  }, [isActive, musicUrl]);

  // Cleanup ao desmontar
  useEffect(() => {
    return () => {
      if (playerInstanceRef.current) {
        try {
          playerInstanceRef.current.destroy();
        } catch (e) {
          console.warn('Cleanup error:', e);
        }
      }
    };
  }, []);

  if (!isActive || !musicUrl) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Player invisível do YouTube */}
      <div ref={containerRef} style={{ display: 'none' }}></div>
      
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
            <span className="font-bebas text-sm tracking-wider">ERRO NA MÚSICA</span>
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
            <div className="w-4 h-4 bg-purple-300 rounded-full"></div>
            <span className="font-bebas text-sm tracking-wider">MÚSICA PAUSADA</span>
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
