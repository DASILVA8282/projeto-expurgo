
import { useEffect, useRef, useState } from 'react';

interface FlowStateMusicProps {
  isActive: boolean;
  musicUrl: string;
}

export default function FlowStateMusic({ isActive, musicUrl }: FlowStateMusicProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<any>(null);
  const playerRef = useRef<HTMLDivElement>(null);

  // Função para extrair ID do vídeo do YouTube
  const extractYouTubeId = (url: string): string | null => {
    if (!url) return null;
    
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Carregar API do YouTube
  useEffect(() => {
    console.log('FlowStateMusic: Loading YouTube API');
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        console.log('YouTube API loaded and ready');
      };
    } else {
      console.log('YouTube API already loaded');
    }
  }, []);

  // Criar player quando necessário
  useEffect(() => {
    console.log('FlowStateMusic: Effect triggered', { isActive, musicUrl, hasYT: !!window.YT, hasPlayer: !!player });
    
    if (isActive && musicUrl && window.YT && window.YT.Player && !player) {
      const videoId = extractYouTubeId(musicUrl);
      console.log('FlowStateMusic: Extracted video ID:', videoId);
      
      if (videoId && playerRef.current) {
        console.log('FlowStateMusic: Creating YouTube player');
        try {
          const newPlayer = new window.YT.Player(playerRef.current, {
            height: '0',
            width: '0',
            videoId: videoId,
            playerVars: {
              autoplay: 1,
              controls: 0,
              loop: 1,
              playlist: videoId,
              start: 0,
              modestbranding: 1,
              rel: 0,
              showinfo: 0,
              iv_load_policy: 3,
              fs: 0,
              cc_load_policy: 0,
              disablekb: 1,
              autohide: 1
            },
            events: {
              onReady: (event: any) => {
                console.log('FlowStateMusic: YouTube player ready, starting playback');
                event.target.playVideo();
                setIsPlaying(true);
              },
              onStateChange: (event: any) => {
                console.log('FlowStateMusic: Player state changed:', event.data);
                if (event.data === window.YT.PlayerState.PLAYING) {
                  setIsPlaying(true);
                } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
                  setIsPlaying(false);
                }
              },
              onError: (event: any) => {
                console.error('FlowStateMusic: YouTube player error:', event.data);
              }
            }
          });
          
          setPlayer(newPlayer);
        } catch (error) {
          console.error('FlowStateMusic: Error creating YouTube player:', error);
        }
      } else {
        console.log('FlowStateMusic: Missing requirements', { videoId, hasPlayerRef: !!playerRef.current });
      }
    }
  }, [isActive, musicUrl, player]);

  // Controlar reprodução baseado no estado do Flow State
  useEffect(() => {
    console.log('FlowStateMusic: Playback control effect', { hasPlayer: !!player, isActive, musicUrl });
    
    if (player) {
      if (isActive && musicUrl) {
        console.log('FlowStateMusic: Starting playback');
        player.playVideo();
      } else {
        console.log('FlowStateMusic: Pausing playback');
        player.pauseVideo();
        // Limpar player quando Flow State termina
        if (!isActive) {
          console.log('FlowStateMusic: Destroying player');
          player.destroy();
          setPlayer(null);
          setIsPlaying(false);
        }
      }
    }
  }, [isActive, player, musicUrl]);

  // Retry mechanism para carregar API do YouTube se não estiver disponível
  useEffect(() => {
    if (isActive && musicUrl && !window.YT) {
      console.log('FlowStateMusic: YouTube API not available, retrying in 1 second');
      const retryTimer = setTimeout(() => {
        if (!window.YT) {
          console.log('FlowStateMusic: Still no YouTube API, trying to reload script');
          const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
          if (!existingScript) {
            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
          }
        }
      }, 1000);
      
      return () => clearTimeout(retryTimer);
    }
  }, [isActive, musicUrl]);

  if (!isActive || !musicUrl) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Player invisível do YouTube */}
      <div ref={playerRef} style={{ display: 'none' }}></div>
      
      {/* Indicador visual */}
      {isPlaying && (
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-3 border-2 border-purple-400">
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-white rounded animate-pulse"></div>
            <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            <div className="w-1 h-4 bg-white rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          </div>
          <span className="font-bebas text-sm tracking-wider">FLOW STATE MUSIC</span>
          <i className="fas fa-music animate-bounce"></i>
        </div>
      )}
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
