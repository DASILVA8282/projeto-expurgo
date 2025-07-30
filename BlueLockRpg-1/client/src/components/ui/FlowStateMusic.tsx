
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

  // Função para construir URL completa para arquivos de upload
  const buildAudioUrl = (url: string): string => {
    if (url.startsWith('/uploads/')) {
      // Se a URL já começa com /uploads/, usar diretamente
      return url;
    }
    return url;
  };

  

  // Função para tocar áudio direto
  const playDirectAudio = async (url: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      const fullUrl = buildAudioUrl(url);
      console.log('🎵 Tentando reproduzir áudio direto:', fullUrl);
      console.log('🎵 URL original:', url);
      
      // Verificar se a URL está acessível primeiro
      const testResponse = await fetch(fullUrl, { method: 'HEAD' });
      if (!testResponse.ok) {
        throw new Error(`Arquivo não encontrado: ${testResponse.status}`);
      }
      console.log('🎵 Arquivo de áudio encontrado no servidor');
      
      // Limpar qualquer src anterior
      audio.pause();
      audio.src = '';
      audio.load();
      
      // Configurar áudio
      audio.crossOrigin = 'anonymous';
      audio.preload = 'auto';
      audio.loop = true;
      audio.volume = 0.7;
      
      // Definir nova URL
      audio.src = fullUrl;

      // Aguardar carregamento com timeout
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          audio.removeEventListener('canplaythrough', handleCanPlay);
          audio.removeEventListener('error', handleError);
          reject(new Error('Timeout ao carregar áudio'));
        }, 10000); // 10 segundos timeout

        const handleCanPlay = () => {
          clearTimeout(timeout);
          audio.removeEventListener('canplaythrough', handleCanPlay);
          audio.removeEventListener('error', handleError);
          console.log('🎵 Áudio carregado e pronto para reprodução');
          resolve(true);
        };
        
        const handleError = (e: any) => {
          clearTimeout(timeout);
          audio.removeEventListener('canplaythrough', handleCanPlay);
          audio.removeEventListener('error', handleError);
          console.error('🎵 Erro no carregamento do áudio:', e);
          reject(e);
        };
        
        audio.addEventListener('canplaythrough', handleCanPlay);
        audio.addEventListener('error', handleError);
        
        audio.load();
      });

      // Tentar reproduzir com interação do usuário se necessário
      try {
        const playPromise = audio.play();
        
        if (playPromise !== undefined) {
          await playPromise;
          console.log('🎵 Áudio direto reproduzindo com sucesso');
          setIsPlaying(true);
          setError(null);
        }
      } catch (playError) {
        console.log('🎵 Reprodução automática bloqueada, tentando com clique do usuário');
        // Criar botão invisível para interação do usuário
        const playButton = document.createElement('button');
        playButton.style.position = 'fixed';
        playButton.style.top = '50%';
        playButton.style.left = '50%';
        playButton.style.zIndex = '10000';
        playButton.style.padding = '10px 20px';
        playButton.style.backgroundColor = '#8B5CF6';
        playButton.style.color = 'white';
        playButton.style.border = 'none';
        playButton.style.borderRadius = '5px';
        playButton.style.cursor = 'pointer';
        playButton.innerHTML = '🎵 Clique para tocar música do Flow State';
        
        document.body.appendChild(playButton);
        
        playButton.onclick = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            setError(null);
            document.body.removeChild(playButton);
            console.log('🎵 Áudio iniciado após clique do usuário');
          } catch (err) {
            console.error('🎵 Erro mesmo após clique:', err);
            setError('Erro na reprodução');
            document.body.removeChild(playButton);
          }
        };
        
        // Remover botão automaticamente após 10 segundos
        setTimeout(() => {
          if (document.body.contains(playButton)) {
            document.body.removeChild(playButton);
          }
        }, 10000);
      }

    } catch (err) {
      console.error('🎵 Erro ao reproduzir áudio direto:', err);
      console.error('🎵 Detalhes do erro:', err);
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
    console.log('🎵 Is direct audio URL?', musicUrl ? isDirectAudioUrl(musicUrl) : false);

    if (isActive && musicUrl && musicUrl.trim() !== '') {
      console.log('🎵 Iniciando reprodução da música do Flow State');
      console.log('🎵 URL final que será reproduzida:', musicUrl);
      console.log('🎵 URL construída:', buildAudioUrl(musicUrl));
      
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
          console.error('🎵 Audio element src:', audioRef.current?.src);
          console.error('🎵 Audio element error code:', e.currentTarget.error?.code);
          console.error('🎵 Audio element error message:', e.currentTarget.error?.message);
          setError('Erro na música');
        }}
        onLoadStart={() => {
          console.log('🎵 Carregamento do áudio iniciado');
          console.log('🎵 Audio src:', audioRef.current?.src);
        }}
        onCanPlay={() => {
          console.log('🎵 Áudio pode ser reproduzido');
          console.log('🎵 Audio duration:', audioRef.current?.duration);
        }}
        onLoadedData={() => console.log('🎵 Dados do áudio carregados')}
        onLoadedMetadata={() => console.log('🎵 Metadados do áudio carregados')}
        onProgress={() => console.log('🎵 Progresso do carregamento do áudio')}
        onSuspend={() => console.log('🎵 Carregamento do áudio suspenso')}
        onAbort={() => console.log('🎵 Carregamento do áudio abortado')}
        onStalled={() => console.log('🎵 Carregamento do áudio travado')}
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
