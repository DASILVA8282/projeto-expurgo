import { useState, useEffect, useCallback, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { Edit3, Play, Square, Plus, Timer, Trophy } from "lucide-react";
import type { Match, MatchWithGoals, User } from "@shared/schema";
import { useWebSocket } from "@/hooks/useWebSocket";
import FlowStateCutsceneSimple from "@/components/ui/FlowStateCutsceneSimple";
import FlowStateVignette from "@/components/ui/FlowStateVignette";
import CharacterIntroduction from "@/components/ui/CharacterIntroduction";
import FlowStateMusic from "@/components/ui/FlowStateMusic";

export default function Match() {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { lastMessage, sendMessage, isConnected } = useWebSocket();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [goalPlayer, setGoalPlayer] = useState<string>("");
  const [goalTeam, setGoalTeam] = useState<"V" | "Z">("V");
  const [goalMinute, setGoalMinute] = useState<number>(0);
  const [lastGoal, setLastGoal] = useState<any>(null);
  const [showGoalAnimation, setShowGoalAnimation] = useState(false);
  const [editingTeamV, setEditingTeamV] = useState(false);
  const [editingTeamZ, setEditingTeamZ] = useState(false);
  const [tempTeamVName, setTempTeamVName] = useState("");
  const [tempTeamZName, setTempTeamZName] = useState("");

  // Flow State
  const [showFlowCutscene, setShowFlowCutscene] = useState(false);
  const [flowPlayerName, setFlowPlayerName] = useState("");
  const [flowColor, setFlowColor] = useState("red");
  const [flowPhrase, setFlowPhrase] = useState("É hora de dominar o campo!");
  const [flowMusicUrl, setFlowMusicUrl] = useState("");
  const [isInFlowState, setIsInFlowState] = useState(false);
  const [flowStateTriggered, setFlowStateTriggered] = useState(false);
  const [flowStatePlayer, setFlowStatePlayer] = useState<string>("");

  // Controle de tempo
  const [customMatchTime, setCustomMatchTime] = useState<number>(0);

  // Introdução de personagem
  const [showCharacterIntro, setShowCharacterIntro] = useState(false);
  const [introCharacter, setIntroCharacter] = useState<any>(null);
  const [hasShownIntro, setHasShownIntro] = useState(false);
  const [characterSequence, setCharacterSequence] = useState<any[]>([]);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);

  // Usar refs para acessar valores atuais
  const characterSequenceRef = useRef<any[]>([]);
  const currentCharacterIndexRef = useRef(0);

  // Atualizar refs quando estados mudam
  useEffect(() => {
    characterSequenceRef.current = characterSequence;
  }, [characterSequence]);

  useEffect(() => {
    currentCharacterIndexRef.current = currentCharacterIndex;
  }, [currentCharacterIndex]);

  // Callback para completar introdução de personagem
  const handleCharacterIntroComplete = useCallback(() => {
    console.log("=== CHARACTER INTRO COMPLETED CALLBACK CALLED ===");
    console.log("Current index from ref:", currentCharacterIndexRef.current);
    console.log("Total characters from ref:", characterSequenceRef.current.length);
    console.log("Character sequence from ref:", characterSequenceRef.current.map(c => c?.name || 'undefined'));
    console.log("Current introCharacter:", introCharacter?.name);
    console.log("Current showCharacterIntro:", showCharacterIntro);

    const currentIndex = currentCharacterIndexRef.current;
    const sequence = characterSequenceRef.current;

    console.log("=== DECISION LOGIC ===");
    console.log("sequence.length > 0?", sequence.length > 0);
    console.log("currentIndex < sequence.length - 1?", currentIndex < sequence.length - 1);
    console.log("Condition result:", sequence.length > 0 && currentIndex < sequence.length - 1);

    // Use setTimeout to ensure state updates are processed
    setTimeout(() => {
      // Se há mais personagens na sequência, mostra o próximo
      if (sequence.length > 0 && currentIndex < sequence.length - 1) {
        const nextIndex = currentIndex + 1;
        console.log("=== ADVANCING TO NEXT CHARACTER ===");
        console.log("Next index:", nextIndex);
        console.log("Next character:", sequence[nextIndex]?.name || 'undefined');

        console.log("About to call setCurrentCharacterIndex with:", nextIndex);
        setCurrentCharacterIndex(nextIndex);

        console.log("About to call setIntroCharacter with:", sequence[nextIndex]);
        setIntroCharacter(sequence[nextIndex]);

        // Mantém showCharacterIntro como true para continuar a sequência
        console.log("Character sequence continuing... showCharacterIntro should remain true");
      } else {
        // Acabou a sequência ou é apresentação individual
        console.log("=== CHARACTER SEQUENCE COMPLETED ===");
        console.log("Returning to match page");
        console.log("About to call setShowCharacterIntro(false)");
        setShowCharacterIntro(false);
        setIntroCharacter(null);
        setCharacterSequence([]);
        setCurrentCharacterIndex(0);
      }
    }, 100); // Small delay to ensure state updates are processed
  }, []); // Sem dependências, usa refs para acessar valores atuais

  // Notifica que o usuário entrou na página de partidas e limpa cache
  const hasNotifiedRef = useRef(false);

  useEffect(() => {
    queryClient.removeQueries({ queryKey: ["/api/matches/active"] });
    queryClient.invalidateQueries({ queryKey: ["/api/matches/active"] });
  }, []); // Executa apenas uma vez ao montar o componente

  useEffect(() => {
    // Somente notifica se o usuário existir, WebSocket estiver conectado e ainda não foi notificado
    if (user?.id && isConnected && !hasNotifiedRef.current) {
      hasNotifiedRef.current = true;
      console.log("Sending match_page_connect message for user:", user.id);
      sendMessage({
        type: 'match_page_connect',
        userId: user.id
      });
    }

    // Cleanup: notifica saída da página
    return () => {
      if (user?.id && hasNotifiedRef.current) {
        hasNotifiedRef.current = false;
        console.log("Sending match_page_disconnect message for user:", user.id);
        sendMessage({
          type: 'match_page_disconnect',
          userId: user.id
        });
      }
    };
  }, [user?.id, isConnected]); // Removed sendMessage from dependencies

  // Atualiza o tempo atual a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Escuta notificações WebSocket para redirecionamento automático e Flow State
  useEffect(() => {
    if (lastMessage?.type === "match_finished") {
      toast({ title: "Partida finalizada!", description: lastMessage.message });

      // Limpa todos os estados do Flow State
      setShowFlowCutscene(false);
      setIsInFlowState(false);
      setFlowPlayerName("");
      setFlowColor("red");
      setFlowPhrase("É hora de dominar o campo!");
      setFlowMusicUrl("");
      setFlowStateTriggered(false);
      setFlowStatePlayer("");

      // Invalida e remove todas as queries relacionadas
      queryClient.invalidateQueries({ queryKey: ["/api/matches/active"] });
      queryClient.invalidateQueries({ queryKey: ["/api/matches/finished"] });
      queryClient.invalidateQueries({ queryKey: ["/api/flow-state"] });
      queryClient.removeQueries({ queryKey: ["/api/matches/active"] });

      // Redireciona TODOS os usuários para o dashboard (incluindo admin)
      setTimeout(() => {
        setLocation("/dashboard");
      }, 1500);
    }

    // Introdução de personagem quando partida inicia (sequencial) - Agora também para admin
    if (lastMessage?.type === "match_started_character_intro_sequence" && lastMessage.characters) {
      console.log("=== WEBSOCKET: CHARACTER SEQUENCE STARTED ===");
      console.log("Characters received:", lastMessage.characters.length);
      console.log("Characters:", lastMessage.characters.map(c => c.name));
      console.log("Current user:", user?.username);
      console.log("User is admin:", user?.isAdmin);

      console.log("About to set characterSequence with:", lastMessage.characters);
      setCharacterSequence(lastMessage.characters);

      console.log("About to set currentCharacterIndex to 0");
      setCurrentCharacterIndex(0);

      console.log("About to set introCharacter to:", lastMessage.characters[0]);
      setIntroCharacter(lastMessage.characters[0]);

      console.log("About to set showCharacterIntro to true");
      setShowCharacterIntro(true);

      console.log("About to set hasShownIntro to true");
      setHasShownIntro(true);

      console.log("=== WEBSOCKET SETUP COMPLETE ===");
      console.log("Set first character:", lastMessage.characters[0].name);
      console.log("showCharacterIntro set to:", true);

      toast({
        title: "Partida Iniciada!",
        description: "Apresentando os jogadores...",
      });
    }

    // Log para debugar todas as mensagens WebSocket
    console.log("=== ALL WEBSOCKET MESSAGES ===");
    console.log("Message type:", lastMessage?.type);
    console.log("Full message:", lastMessage);

    // Introdução de personagem quando partida inicia (individual - legacy)
    if (lastMessage?.type === "match_started_character_intro" && lastMessage.character) {
      setIntroCharacter(lastMessage.character);
      setShowCharacterIntro(true);
      setHasShownIntro(true);
      toast({
        title: "Partida Iniciada!",
        description: "Apresentando seu personagem...",
      });
    }

    // Flow State ativado
    if (lastMessage?.type === "flow_state_activated") {
      console.log("Flow State activated WebSocket message received:", lastMessage);
      setFlowPlayerName(lastMessage.playerName);
      setFlowColor(lastMessage.flowColor);
      setFlowPhrase(lastMessage.flowPhrase || "É hora de dominar o campo!");
      setFlowMusicUrl(lastMessage.flowMusicUrl || "");

      // Se é o próprio usuário, mostra a cutscene
      if (user && lastMessage.playerId === user.id && !showFlowCutscene) {
        console.log("Starting Epic Flow State cutscene for user", user.id);
        console.log("Current states before cutscene:", { showFlowCutscene, isInFlowState });
        // Reset any previous state first
        setIsInFlowState(false);
        setShowFlowCutscene(true);
        console.log("Set showFlowCutscene to true");
      } else {
        // Outros usuários recebem toast notification
        toast({
          title: "Flow State Ativado!",
          description: `${lastMessage.playerName} entrou no Flow State!`,
        });
      }
    }

    // Flow State encerrado
    if (lastMessage?.type === "flow_state_ended") {
      console.log("Flow State ended");
      setIsInFlowState(false);
      setShowFlowCutscene(false); // Garantir que cutscene também está fechada
      setFlowPlayerName("");
      setFlowColor("red");
      setFlowPhrase("É hora de dominar o campo!");
      setFlowMusicUrl("");
      toast({
        title: "Flow State Encerrado",
        description: lastMessage.message,
      });
    }
  }, [lastMessage, toast, setLocation, user]);

  // Busca a partida ativa
  const { data: match, isLoading, error, isFetched } = useQuery<MatchWithGoals>({
    queryKey: ["/api/matches/active"],
    refetchInterval: 2000, // Atualiza a cada 2 segundos
    retry: false, // Não tenta novamente se não há partida ativa
    throwOnError: false, // Não lança erro quando retorna 404
  });

  // Busca usuários conectados na página de partidas para seleção de jogador
  const { data: matchPageUsers } = useQuery<any[]>({
    queryKey: ["/api/admin/match-page-users"],
    enabled: user?.isAdmin,
    refetchInterval: 5000, // Reduzido para 5 segundos para menos flicker
  });

  // Busca o personagem do usuário atual (para verificar se pode participar)
  const { data: currentUserCharacter } = useQuery<any>({
    queryKey: ["/api/characters/me"],
    enabled: !user?.isAdmin, // Só busca se não for admin
    retry: false,
    throwOnError: false,
  });

  // Mostra introdução de personagem quando jogador entra em partida ativa
  useEffect(() => {
    if (
      !user?.isAdmin && 
      currentUserCharacter && 
      match?.status === "active" && 
      !hasShownIntro && 
      !showCharacterIntro &&
      characterSequence.length === 0 // Só mostra introdução individual se não há sequência ativa
    ) {
      setIntroCharacter(currentUserCharacter);
      setShowCharacterIntro(true);
      setHasShownIntro(true);
      toast({
        title: "Entrando na Partida!",
        description: "Apresentando seu personagem...",
      });
    }
  }, [currentUserCharacter, match, user, hasShownIntro, showCharacterIntro, characterSequence.length]);

  // Reset hasShownIntro when match changes or user changes
  useEffect(() => {
    setHasShownIntro(false);
    setShowCharacterIntro(false);
    setCharacterSequence([]);
    setCurrentCharacterIndex(0);
    setIntroCharacter(null);
  }, [match?.id, user?.id]);

  // Removed interfering safety timeout - CharacterIntroduction component handles its own timeouts

  // Verifica se o usuário atual está em Flow State
  const { data: userFlowState } = useQuery<any>({
    queryKey: [`/api/flow-state/${match?.id}/${user?.id}`],
    enabled: !user?.isAdmin && !!match?.id && !!user?.id && match?.status === "active",
    retry: false,
    throwOnError: false,
  });

  // Verifica se existe Flow State ativo na partida (para admin)
  const { data: activeFlowState, refetch: refetchActiveFlowState } = useQuery<any>({
    queryKey: [`/api/flow-state/${match?.id}/active`],
    enabled: user?.isAdmin && !!match?.id && match?.status === "active",
    retry: false,
    throwOnError: false,
    refetchInterval: 2000, // Aumentado para 2 segundos para reduzir flicker
  });



  // Atualiza o estado do Flow State baseado na resposta da API
  useEffect(() => {
    if (userFlowState) {
      setIsInFlowState(true);
      setFlowColor(userFlowState.flowColor);
      // NÃO modifica showFlowCutscene aqui para evitar loops
    } else {
      setIsInFlowState(false);
      // Só limpa cutscene se não estiver em processo de ativação
      if (!showFlowCutscene) {
        // OK para limpar quando não há cutscene ativa
      }
    }
  }, [userFlowState]);

  // Monitora se há Flow State ativo na partida (para admin)
  useEffect(() => {
    if (activeFlowState) {
      setFlowStateTriggered(true);
    } else {
      // Quando não há Flow State ativo, reseta o estado triggered para permitir nova ativação
      // MAS não se for desativação manual recente (evita reativação automática imediata)
      setTimeout(() => {
        setFlowStateTriggered(false);
      }, 1000);
    }
  }, [activeFlowState]);

  // Lógica para ativação automática do Flow State aos 30 minutos
  useEffect(() => {
    if (!match || !user?.isAdmin || match.status !== "active" || flowStateTriggered) return;

    const startTime = new Date(match.startTime).getTime();
    const now = currentTime.getTime();
    const elapsedMinutes = Math.floor((now - startTime) / (1000 * 60));

    // Ativa Flow State exatamente aos 30 minutos, mas só se não houver Flow State ativo
    if (elapsedMinutes >= 30 && !activeFlowState) {
      setFlowStateTriggered(true);

      // Seleciona um jogador aleatório conectado na página de partidas
      if (matchPageUsers && matchPageUsers.length > 0) {
        const playersWithCharacters = matchPageUsers.filter(u => u.character && !u.isAdmin);

        if (playersWithCharacters.length > 0) {
          const randomPlayer = playersWithCharacters[Math.floor(Math.random() * playersWithCharacters.length)];

          // Ativa Flow State via API
          activateFlowStateMutation.mutate({
            matchId: match.id,
            playerId: randomPlayer.id
          });
        }
      }
    }
  }, [match, currentTime, user, flowStateTriggered, matchPageUsers, activeFlowState]);

  // Busca partidas finalizadas para histórico
  const { data: finishedMatches } = useQuery<Match[]>({
    queryKey: ["/api/matches/finished"],
    enabled: !match, // Só busca quando não há partida ativa
  });

  // Mutação para criar nova partida
  const createMatchMutation = useMutation({
    mutationFn: async (matchData: { teamV: string; teamZ: string }) => {
      return await apiRequest("POST", "/api/admin/matches", matchData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/matches/active"] });
      toast({ title: "Partida criada com sucesso!" });
    },
    onError: (error) => {
      console.error("Erro ao criar partida:", error);
      toast({ title: "Erro ao criar partida", variant: "destructive" });
    },
  });

  // Mutação para iniciar partida
  const startMatchMutation = useMutation({
    mutationFn: async (matchId: number) => {
      return await apiRequest("POST", `/api/admin/matches/${matchId}/start`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/matches/active"] });
      toast({ title: "Partida iniciada!" });

      // Introdução será controlada pelo WebSocket message "match_started_character_intro_sequence"
      // Removido código que forçava introdução individual aqui
    },
  });

  // Mutação para finalizar partida
  const finishMatchMutation = useMutation({
    mutationFn: async (matchId: number) => {
      return await apiRequest("POST", `/api/admin/matches/${matchId}/finish`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/matches/active"] });
      queryClient.invalidateQueries({ queryKey: ["/api/matches/finished"] });
      toast({ title: "Partida finalizada!" });
      // Admin permanece na página de partidas para criar nova
      // Jogadores são redirecionados via WebSocket
    },
  });

  // Mutação para editar nomes dos times
  const updateTeamNameMutation = useMutation({
    mutationFn: async ({ matchId, teamV, teamZ }: { matchId: number; teamV?: string; teamZ?: string }) => {
      return await apiRequest("PATCH", `/api/admin/matches/${matchId}`, { teamV, teamZ });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/matches/active"] });
      setEditingTeamV(false);
      setEditingTeamZ(false);
      toast({ title: "Nome do time atualizado!" });
    },
  });

  // Mutação para adicionar gol
  const addGoalMutation = useMutation({
    mutationFn: async (goalData: { matchId: number; playerId: number; team: "V" | "Z"; minute: number }) => {
      return await apiRequest("POST", "/api/admin/goals", goalData);
    },
    onSuccess: (newGoal) => {
      queryClient.invalidateQueries({ queryKey: ["/api/matches/active"] });
      setLastGoal(newGoal);
      setShowGoalAnimation(true);
      setTimeout(() => setShowGoalAnimation(false), 3000);

      const selectedPlayer = matchPageUsers?.find(u => u.id.toString() === goalPlayer);
      const playerName = selectedPlayer?.character?.name || "Jogador";
      toast({ title: "Gol marcado!", description: `${playerName} marcou um gol!` });
    },
  });

  // Mutação para ativar Flow State
  const activateFlowStateMutation = useMutation({
    mutationFn: async ({ matchId, playerId }: { matchId: number; playerId: number }) => {
      const response = await apiRequest("POST", "/api/admin/flow-state", { matchId, playerId });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/flow-state"] });
    },
    onError: (error: any) => {
      console.error("Erro ao ativar Flow State:", error);
    },
  });

  // Mutação para desativar Flow State
  const deactivateFlowStateMutation = useMutation({
    mutationFn: async ({ matchId, playerId }: { matchId: number; playerId: number }) => {
      const response = await apiRequest("POST", "/api/admin/flow-state/deactivate", { matchId, playerId });
      return response.json();
    },
    onSuccess: () => {
      // Invalidar todas as queries relacionadas ao Flow State
      queryClient.invalidateQueries({ queryKey: ["/api/flow-state"] });
      queryClient.invalidateQueries({ queryKey: [`/api/flow-state/${match?.id}/active`] });
      queryClient.invalidateQueries({ queryKey: [`/api/flow-state/${match?.id}`] });

      // Forçar refetch imediato da query activeFlowState para atualizar o estado
      refetchActiveFlowState();

      // Limpar estado local de Flow State
      setIsInFlowState(false);
      setFlowPlayerName("");
      setFlowColor("");
      setFlowMusicUrl("");
      setShowFlowCutscene(false);

      // Evitar reativação automática imediata definindo um cooldown
      setFlowStateTriggered(true);
      setTimeout(() => {
        setFlowStateTriggered(false);
      }, 2000); // Cooldown de 2 segundos

      toast({ title: "Flow State desativado com sucesso!" });
    },
    onError: (error: any) => {
      console.error("Erro ao desativar Flow State:", error);
      toast({ title: "Erro ao desativar Flow State", variant: "destructive" });
    },
  });

  // Mutação para definir tempo da partida
  const setMatchTimeMutation = useMutation({
    mutationFn: async ({ matchId, minutes }: { matchId: number; minutes: number }) => {
      const response = await apiRequest("POST", "/api/admin/matches/set-time", { matchId, minutes });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/matches/active"] });
      toast({ title: "Tempo da partida definido com sucesso!" });
    },
    onError: (error: any) => {
      console.error("Erro ao definir tempo:", error);
      toast({ title: "Erro ao definir tempo", variant: "destructive" });
    },
  });

  // Handler para completar a cutscene do Flow State
  const handleFlowCutsceneComplete = useCallback(() => {
    console.log("Flow State cutscene completed - returning to match");

    // Limpar estado da cutscene IMEDIATAMENTE e forçar re-render
    setShowFlowCutscene(false);
    setIsInFlowState(true);

    // Show toast após pequeno delay
    setTimeout(() => {
      toast({
        title: "Flow State Ativado!",
        description: "Você está em estado de concentração máxima!",
      });
    }, 200);
  }, [toast]);

  // Handler para ativar Flow State manualmente
  const handleManualFlowState = () => {
    if (!match || !flowStatePlayer) {
      toast({ title: "Erro", description: "Selecione um jogador", variant: "destructive" });
      return;
    }

    if (activeFlowState) {
      toast({ 
        title: "Flow State já ativo", 
        description: `${activeFlowState.player.character?.name || activeFlowState.player.username} já está em Flow State!`,
        variant: "destructive" 
      });
      return;
    }

    const playerId = parseInt(flowStatePlayer);
    activateFlowStateMutation.mutate({
      matchId: match.id,
      playerId: playerId
    });
  };

  // Handler para desativar Flow State manualmente
  const handleDeactivateFlowState = () => {
    if (!match || !activeFlowState) {
      toast({ title: "Erro", description: "Nenhum Flow State ativo encontrado", variant: "destructive" });
      return;
    }

    deactivateFlowStateMutation.mutate({
      matchId: match.id,
      playerId: activeFlowState.playerId
    });
  };

  // Handler para definir tempo da partida
  const handleSetMatchTime = () => {
    if (!match || !customMatchTime) {
      toast({ title: "Erro", description: "Digite um tempo válido", variant: "destructive" });
      return;
    }

    if (customMatchTime < 0 || customMatchTime > 200) {
      toast({ title: "Erro", description: "Tempo deve estar entre 0 e 200 minutos", variant: "destructive" });
      return;
    }

    setMatchTimeMutation.mutate({
      matchId: match.id,
      minutes: customMatchTime
    });
  };

  // Calcula o tempo decorrido da partida
  const getMatchTime = () => {
    if (!match || !match.startTime) return "00:00";
    const start = new Date(match.startTime);
    const now = new Date();
    const diffMs = now.getTime() - start.getTime();
    const minutes = Math.floor(diffMs / 60000);
    const seconds = Math.floor((diffMs % 60000) / 1000);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCreateMatch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const teamV = formData.get("teamV") as string;
    const teamZ = formData.get("teamZ") as string;

    if (!teamV || !teamZ) {
      toast({ title: "Erro", description: "Preencha os nomes dos times", variant: "destructive" });
      return;
    }

    createMatchMutation.mutate({ teamV, teamZ });
  };

  const handleAddGoal = () => {
    if (!match || !goalPlayer || !goalMinute) {
      toast({ title: "Erro", description: "Preencha todos os campos", variant: "destructive" });
      return;
    }

    const selectedPlayer = matchPageUsers?.find(u => u.id.toString() === goalPlayer);
    if (!selectedPlayer || !selectedPlayer.character) {
      toast({ title: "Erro", description: "Jogador selecionado não tem personagem", variant: "destructive" });
      return;
    }

    const playerId = parseInt(goalPlayer);
    addGoalMutation.mutate({
      matchId: match?.id || 0,
      playerId,
      team: goalTeam,
      minute: goalMinute,
    });
  };

  const handleTeamNameEdit = (team: "V" | "Z") => {
    if (!match) return;

    if (team === "V") {
      if (editingTeamV && tempTeamVName.trim()) {
        updateTeamNameMutation.mutate({ 
          matchId: match?.id || 0, 
          teamV: tempTeamVName.trim() 
        });
      } else {
        setEditingTeamV(true);
        setTempTeamVName(match?.teamV || "");
      }
    } else {
      if (editingTeamZ && tempTeamZName.trim()) {
        updateTeamNameMutation.mutate({ 
          matchId: match?.id || 0, 
          teamZ: tempTeamZName.trim() 
        });
      } else {
        setEditingTeamZ(true);
        setTempTeamZName(match?.teamZ || "");
      }
    }
  };

  const cancelEdit = (team: "V" | "Z") => {
    if (team === "V") {
      setEditingTeamV(false);
      setTempTeamVName("");
    } else {
      setEditingTeamZ(false);
      setTempTeamZName("");
    }
  };

  // Verifica se o jogador não-admin tem personagem
  // Admin sempre pode acessar, jogadores precisam de personagem
  if (!user?.isAdmin && currentUserCharacter === null && currentUserCharacter !== undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="bg-gradient-to-br from-slate-800/90 to-gray-900/90 border-red-500/50 backdrop-blur-xl shadow-2xl">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                <Timer className="w-10 h-10 text-red-500" />
              </div>
              <CardTitle className="text-2xl font-bold text-white">
                Acesso Negado
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-300">
                Você precisa criar seu personagem antes de participar de partidas!
              </p>
              <p className="text-red-400 text-sm">
                Vá para a página de personagem e crie sua ficha completa.
              </p>
              <Button 
                onClick={() => setLocation("/character")}
                className="w-full bg-gradient-to-r from-red-600 to-red-600 hover:from-red-500 hover:to-red-500"
              >
                Criar Personagem
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  // Só mostra loading no primeiro carregamento, não quando não há partida ativa
  // Admin sempre pode ver a tela, jogadores precisam aguardar query do personagem
  if (isLoading && !isFetched && (!user?.isAdmin ? currentUserCharacter === undefined : false)) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-8">
            <div className="w-20 h-20 mx-auto rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Timer className="w-8 h-8 text-red-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bebas text-red-500 mb-2 tracking-wider">CARREGANDO SISTEMA DE COMBATE</h2>
          <p className="text-gray-400 font-oswald">Conectando ao Projeto Expurgo...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Fundo estilo estádio Blue Lock */}
      <div className="absolute inset-0 opacity-15">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px]" />

        {/* Centro do campo */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-red-500/30 rounded-full" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border-2 border-red-500/50 rounded-full bg-red-500/10" />

        {/* Áreas do gol */}
        <div className="absolute top-1/2 left-8 transform -translate-y-1/2 w-32 h-48 border-2 border-red-500/20" />
        <div className="absolute top-1/2 right-8 transform -translate-y-1/2 w-32 h-48 border-2 border-red-500/20" />
      </div>

      {/* Partículas animadas */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full"
            animate={{
              x: [0, Math.random() * window.innerWidth],
              y: [0, Math.random() * window.innerHeight],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              left: Math.random() * window.innerWidth,
              top: Math.random() * window.innerHeight,
            }}
          />
        ))}
      </div>

      {/* Animação de Gol */}
      <AnimatePresence>
        {showGoalAnimation && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, rotate: -10 }}
            animate={{ 
              opacity: 1, 
              scale: [0.3, 1.2, 1], 
              rotate: [0, 5, 0],
              y: [0, -20, 0]
            }}
            exit={{ opacity: 0, scale: 0.3, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="relative">
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px #fbbf24", 
                    "0 0 40px #f59e0b", 
                    "0 0 60px #d97706",
                    "0 0 40px #f59e0b", 
                    "0 0 20px #fbbf24"
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
                className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black text-8xl font-black p-8 rounded-3xl transform rotate-3"
              >
                GOOOOOL!
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.5, 0] }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute inset-0 border-4 border-yellow-400 rounded-3xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 p-6">
        {(!match || match?.status === "finished") && isFetched ? (
          // Tela de criação de partida - Design melhorado
          <div className="flex items-center justify-center min-h-screen">
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-lg w-full mx-4"
            >
              <Card className="bg-gradient-to-br from-slate-800/90 to-gray-900/90 border-red-500/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                {/* Header com gradiente animado */}
                <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 p-6">
                  <motion.div
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] 
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-red-400 via-red-500 to-red-600 opacity-30"
                    style={{ backgroundSize: "200% 200%" }}
                  />
                  <div className="relative z-10 text-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                      className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
                    >
                      <Trophy className="w-8 h-8 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bebas text-white mb-2 tracking-wider">NOVO COMBATE</h2>
                    <p className="text-red-100 font-oswald tracking-wide">Configure os predadores para a batalha</p>
                  </div>
                </div>

                <CardContent className="p-8">
                  <form onSubmit={handleCreateMatch} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Label htmlFor="teamV" className="text-white text-lg font-oswald font-semibold flex items-center gap-2 tracking-wide">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        PREDADORES V
                      </Label>
                      <Input
                        id="teamV"
                        name="teamV"
                        placeholder="Digite o nome do Team V"
                        className="bg-slate-700/50 border-slate-600 text-white text-lg h-12 mt-2 focus:border-red-400 focus:ring-red-400/20"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Label htmlFor="teamZ" className="text-white text-lg font-oswald font-semibold flex items-center gap-2 tracking-wide">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        PREDADORES Z
                      </Label>
                      <Input
                        id="teamZ"
                        name="teamZ"
                        placeholder="Digite o nome do Team Z"
                        className="bg-slate-700/50 border-slate-600 text-white text-lg h-12 mt-2 focus:border-red-400 focus:ring-red-400/20"
                        required
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Button
                        type="submit"
                        disabled={createMatchMutation.isPending}
                        className="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-600 to-red-600 hover:from-red-500 hover:to-red-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                      >
                        {createMatchMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Criando Partida...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Play className="w-5 h-5" />
                            INICIAR COMBATE
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Histórico de Partidas */}
            {finishedMatches && finishedMatches.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="max-w-lg w-full mx-4 mt-8"
              >
                <Card className="bg-gradient-to-br from-slate-800/90 to-gray-900/90 border-red-500/50 backdrop-blur-xl shadow-2xl overflow-hidden">
                  <div className="bg-gradient-to-r from-red-600 via-red-600 to-red-800 p-4">
                    <h3 className="text-xl font-bold text-white text-center flex items-center justify-center gap-2">
                      <Trophy className="w-5 h-5" />
                      Últimas Partidas
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      {finishedMatches.map((finishedMatch) => (
                        <div 
                          key={finishedMatch.id}
                          className="bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:border-red-500/50 transition-all duration-200"
                        >
                          <div className="flex justify-between items-center">
                            <div className="text-white font-semibold">
                              {finishedMatch.teamV} vs {finishedMatch.teamZ}
                            </div>
                            <div className="text-red-400 font-mono text-lg">
                              {finishedMatch.scoreV} - {finishedMatch.scoreZ}
                            </div>
                          </div>
                          <div className="text-gray-400 text-sm mt-1">
                            {finishedMatch.endTime ? new Date(finishedMatch.endTime).toLocaleDateString('pt-BR') : 'Finalizada'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        ) : match && match?.status !== "finished" ? (
          // Tela principal da partida
          <div className="space-y-8">
            {/* HUD Principal estilo Blue Lock - Baseado na imagem */}
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center"
            >
              <div className="relative">
                {/* Cronômetro estilo estádio */}
                <motion.div 
                  animate={{ 
                    boxShadow: [
                      "0 0 20px rgba(220, 38, 38, 0.5)",
                      "0 0 30px rgba(220, 38, 38, 0.8)",
                      "0 0 20px rgba(220, 38, 38, 0.5)"
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-black border-4 border-red-500 rounded-lg px-6 py-4 z-20"
                >
                  <div className="text-center">
                    <div className="text-green-400 text-sm font-bold mb-1">TEMPO</div>
                    <div className="text-white text-3xl font-mono font-black tracking-wider">
                      {match?.status === "active" ? getMatchTime() : "00:00"}
                    </div>
                  </div>
                </motion.div>

                {/* Placar principal - estilo da imagem Blue Lock */}
                <div className="bg-gradient-to-b from-gray-100 to-white border-8 border-gray-800 rounded-xl shadow-2xl min-w-[800px] overflow-hidden">
                  {/* Header com status */}
                  <div className="bg-gray-800 text-white py-3 px-6 flex justify-between items-center">
                    <Badge 
                      variant={match?.status === "active" ? "default" : "secondary"}
                      className={`text-lg px-4 py-2 font-bold ${
                        match?.status === "active" 
                          ? "bg-red-600 hover:bg-red-700 animate-pulse" 
                          : match?.status === "preparing"
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-gray-600"
                      }`}
                    >
                      {match?.status === "preparing" && "PREPARANDO"}
                      {match?.status === "active" && "• AO VIVO •"}
                      {match?.status === "finished" && "FINALIZADA"}
                    </Badge>
                    <div className="text-gray-300 font-mono">BLUE LOCK STADIUM</div>
                  </div>

                  {/* Placar - estilo display de estádio */}
                  <div className="flex items-center justify-between p-8 bg-gradient-to-b from-gray-50 to-gray-100">
                    {/* Team V */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="text-center flex-1 relative"
                    >
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="text-4xl font-black text-gray-800 tracking-wider">
                          TEAM
                        </div>
                        {user?.isAdmin && match?.status !== "finished" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleTeamNameEdit("V")}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                          >
                            <Edit3 className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>

                      {editingTeamV ? (
                        <div className="flex items-center gap-2 justify-center">
                          <Input
                            value={tempTeamVName}
                            onChange={(e) => setTempTeamVName(e.target.value)}
                            className="text-center text-3xl font-black bg-white border-2 border-red-500 w-32"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleTeamNameEdit("V");
                              if (e.key === "Escape") cancelEdit("V");
                            }}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => handleTeamNameEdit("V")}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            ✓
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => cancelEdit("V")}
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <div className="text-6xl font-black text-gray-900 mb-4 tracking-wider">
                          {match?.teamV || "TEAM V"}
                        </div>
                      )}

                      {/* Pontuação estilo display digital */}
                      <div className="relative">
                        <div className="text-[8rem] font-black text-gray-800 leading-none font-mono tracking-tighter relative">
                          {match?.scoreV || 0}
                          <div className="absolute inset-0 text-[8rem] font-black text-red-600/20 transform translate-x-1 translate-y-1">
                            {match?.scoreV || 0}
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Separador central */}
                    <div className="text-center mx-8 relative">
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl font-black text-gray-600 mb-4"
                      >
                        VS
                      </motion.div>
                      <div className="w-2 h-32 bg-gradient-to-b from-gray-400 to-gray-600 mx-auto rounded-full"></div>
                    </div>

                    {/* Team Z */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="text-center flex-1 relative"
                    >
                      <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="text-4xl font-black text-gray-800 tracking-wider">
                          TEAM
                        </div>
                        {user?.isAdmin && match?.status !== "finished" && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleTeamNameEdit("Z")}
                            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                          >
                            <Edit3 className="w-4 h-4" />
                          </motion.button>
                        )}
                      </div>

                      {editingTeamZ ? (
                        <div className="flex items-center gap-2 justify-center">
                          <Input
                            value={tempTeamZName}
                            onChange={(e) => setTempTeamZName(e.target.value)}
                            className="text-center text-3xl font-black bg-white border-2 border-red-500 w-32"
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleTeamNameEdit("Z");
                              if (e.key === "Escape") cancelEdit("Z");
                            }}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            onClick={() => handleTeamNameEdit("Z")}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            ✓
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => cancelEdit("Z")}
                          >
                            ✕
                          </Button>
                        </div>
                      ) : (
                        <div className="text-6xl font-black text-gray-900 mb-4 tracking-wider">
                          {match?.teamZ || "TEAM Z"}
                        </div>
                      )}

                      {/* Pontuação estilo display digital */}
                      <div className="relative">
                        <div className="text-[8rem] font-black text-gray-800 leading-none font-mono tracking-tighter relative">
                          {match?.scoreZ || 0}
                          <div className="absolute inset-0 text-[8rem] font-black text-red-600/20 transform translate-x-1 translate-y-1">
                            {match?.scoreZ || 0}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Barra inferior com detalhes */}
                  <div className="bg-gray-800 text-white py-2 px-6 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                      <span className="font-mono">MATCH #{match?.id || 0}</span>
                      <span>•</span>
                      <span>GOLS TOTAL: {(match?.goals?.length || 0)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="font-mono">SISTEMA BLUE LOCK</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Últimos gols - Design melhorado */}
            {match?.goals && match.goals.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-slate-800/90 to-gray-900/90 border border-red-500/30 backdrop-blur-xl rounded-xl p-6 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Trophy className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Últimos Gols</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                </div>

                <div className="space-y-3">
                  {match?.goals?.slice(-5).reverse().map((goal, index) => (
                    <motion.div 
                      key={goal.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg border border-slate-600/50 hover:border-red-500/50 transition-all duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${goal.team === "V" ? "bg-red-500" : "bg-red-500"}`}></div>
                        <span className="text-white font-semibold">
                          {goal.player.character?.name || goal.player.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-red-400 font-mono text-lg">{goal.minute}'</span>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          goal.team === "V" 
                            ? "bg-red-500/20 text-blue-300 border border-red-500/30" 
                            : "bg-red-500/20 text-red-300 border border-red-500/30"
                        }`}>
                          Team {goal.team}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Controles do Mestre - Design melhorado */}
            {user?.isAdmin && match && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-slate-800/90 to-gray-900/90 border border-red-500/30 backdrop-blur-xl rounded-xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                    <Timer className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Controles do Mestre</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                </div>

                {/* Botões de controle da partida */}
                <div className="flex gap-4 mb-8">
                  {match?.status === "preparing" && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => startMatchMutation.mutate(match?.id || 0)}
                        disabled={startMatchMutation.isPending}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-4 text-lg font-bold shadow-lg hover:shadow-green-500/25 transform transition-all duration-200"
                      >
                        {startMatchMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Iniciando...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Play className="w-5 h-5" />
                            Iniciar Partida
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  )}

                  {match?.status === "active" && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => finishMatchMutation.mutate(match?.id || 0)}
                        disabled={finishMatchMutation.isPending}
                        className="bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white px-8 py-4 text-lg font-bold shadow-lg hover:shadow-red-500/25 transform transition-all duration-200"
                      >
                        {finishMatchMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Finalizando...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Square className="w-5 h-5" />
                            Finalizar Partida
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  )}


                </div>

                {/* Seção Adicionar Gol - Design melhorado */}
                {match?.status === "active" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="border-t border-slate-600/50 pt-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Plus className="w-3 h-3 text-black" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Adicionar Gol</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Label htmlFor="goalPlayer" className="text-white text-lg font-semibold mb-2 block">Jogador</Label>
                        <Select onValueChange={setGoalPlayer}>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-12 text-lg hover:border-red-400 transition-colors">
                            <SelectValue placeholder="Selecione o jogador" />
                          </SelectTrigger>
                          <SelectContent>
                            {matchPageUsers?.filter(u => u.character && !u.isAdmin).map((userWithCharacter) => (
                              <SelectItem key={userWithCharacter.id} value={userWithCharacter.id.toString()}>
                                {userWithCharacter.character.name} ({userWithCharacter.username}) • ONLINE
                              </SelectItem>
                            ))}
                            {matchPageUsers?.filter(u => u.character && !u.isAdmin).length === 0 && (
                              <SelectItem value="no-players" disabled>
                                Nenhum jogador conectado
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Label htmlFor="goalTeam" className="text-white text-lg font-semibold mb-2 block">Time</Label>
                        <Select onValueChange={(value: "V" | "Z") => setGoalTeam(value)}>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-12 text-lg hover:border-red-400 transition-colors">
                            <SelectValue placeholder="Selecione o time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="V">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                Team V - {match?.teamV || "TEAM V"}
                              </div>
                            </SelectItem>
                            <SelectItem value="Z">
                              <div className="flex items-center gap-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                Team Z - {match?.teamZ || "TEAM Z"}
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Label htmlFor="goalMinute" className="text-white text-lg font-semibold mb-2 block">Minuto</Label>
                        <Input
                          type="number"
                          placeholder="Minuto do gol"
                          value={goalMinute || ""}
                          onChange={(e) => setGoalMinute(parseInt(e.target.value) || 0)}
                          className="bg-slate-700/50 border-slate-600 text-white h-12 text-lg focus:border-red-400 focus:ring-red-400/20"
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      className="mt-6"
                    >
                      <Button
                        onClick={handleAddGoal}
                        disabled={addGoalMutation.isPending || !goalPlayer || !goalMinute}
                        className="w-full h-14 text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-yellow-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {addGoalMutation.isPending ? (
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            Adicionando Gol...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Trophy className="w-6 h-6" />
                            Adicionar Gol
                          </div>
                        )}
                      </Button>
                    </motion.div>
                  </motion.div>
                )}

                {/* Seção Flow State Manual - Novo */}
                {match?.status === "active" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="border-t border-slate-600/50 pt-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                      </div>
                      <h4 className="text-xl font-bold text-white">Flow State Manual</h4>
                      <div className="text-sm text-gray-400">(Força ativação independente da minutagem)</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Label htmlFor="flowStatePlayer" className="text-white text-lg font-semibold mb-2 block">Jogador para Flow State</Label>
                        <Select onValueChange={setFlowStatePlayer}>
                          <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white h-12 text-lg hover:border-purple-400 transition-colors">
                            <SelectValue placeholder="Selecione o jogador" />
                          </SelectTrigger>
                          <SelectContent>
                            {matchPageUsers?.filter(u => u.character && !u.isAdmin).map((userWithCharacter) => (
                              <SelectItem key={userWithCharacter.id} value={userWithCharacter.id.toString()}>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                  {userWithCharacter.character.name} ({userWithCharacter.username}) • ONLINE
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex items-end gap-3"
                      >
                        <Button
                          onClick={handleManualFlowState}
                          disabled={activateFlowStateMutation.isPending || !flowStatePlayer || !!activeFlowState}
                          className="flex-1 h-14 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {activateFlowStateMutation.isPending ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Ativando...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-white rounded-full animate-pulse"></div>
                              Ativar Flow State
                            </div>
                          )}
                        </Button>

                        <Button
                          onClick={handleDeactivateFlowState}
                          disabled={deactivateFlowStateMutation.isPending || !activeFlowState}
                          className="flex-1 h-14 text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deactivateFlowStateMutation.isPending ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Desativando...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Square className="w-6 h-6" />
                              Desativar Flow State
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </div>

                    {/* Indicador de Flow State ativo */}
                    {activeFlowState && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 p-4 bg-purple-900/30 border border-purple-500/50 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                            <span className="text-purple-300 font-semibold">Flow State ativo:</span>
                            <span className="text-white font-bold">
                              {activeFlowState.player.character?.name || activeFlowState.player.username}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: activeFlowState.flowColor }}></div>
                            <span className="text-purple-300 text-sm capitalize">{activeFlowState.flowColor}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* Seção Controle de Tempo - Novo */}
                {match?.status === "active" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="border-t border-slate-600/50 pt-6"
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-6 h-6 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                        <Timer className="w-3 h-3 text-black" />
                      </div>
                      <h4 className="text-xl font-bold text-white">Controle de Tempo</h4>
                      <div className="text-sm text-gray-400">(Definir tempo para ativação automática do Flow State)</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Label htmlFor="matchTime" className="text-white text-lg font-semibold mb-2 block">Tempo da Partida (minutos)</Label>
                        <Input
                          type="number"
                          placeholder="Ex: 30 para ativar Flow State"
                          value={customMatchTime || ""}
                          onChange={(e) => setCustomMatchTime(parseInt(e.target.value) || 0)}
                          className="bg-slate-700/50 border-slate-600 text-white h-12 text-lg focus:border-red-400 focus:ring-red-400/20"
                        />
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 }}
                        className="flex items-end"
                      >
                        <Button
                          onClick={handleSetMatchTime}
                          disabled={setMatchTimeMutation.isPending || !customMatchTime}
                          className="w-full h-14 text-xl font-bold bg-gradient-to-r from-red-600 to-red-600 hover:from-red-500 hover:to-red-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-red-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {setMatchTimeMutation.isPending ? (
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Definindo Tempo...
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <Timer className="w-6 h-6" />
                              Definir Tempo
                            </div>
                          )}
                        </Button>
                      </motion.div>
                    </div>

                    {/* Indicador de tempo personalizado */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-4 p-4 bg-cyan-900/30 border border-red-500/50 rounded-lg"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                          <span className="text-red-300 font-semibold">Tempo atual da partida:</span>
                          <span className="text-white font-bold font-mono">
                            {getMatchTime()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-red-300 text-sm">
                            Flow State automático aos 30 minutos
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Visualização para jogadores não-admin */}
            {!user?.isAdmin && match && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-slate-800/90 to-gray-900/90 border border-red-500/30 backdrop-blur-xl rounded-xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center">
                    <Timer className="w-4 h-4 text-black" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Status da Partida</h3>
                  <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent"></div>
                </div>

                <div className="text-center space-y-4">
                  <div className="grid grid-cols-3 gap-6 items-center">
                    <div className="text-right">
                      <div className="text-white text-xl font-bold">{match?.teamV}</div>
                      <div className="text-red-400 text-3xl font-black">{match?.scoreV || 0}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-gray-400 text-lg font-bold mb-2">VS</div>
                      <Badge 
                        variant={match?.status === "active" ? "default" : "secondary"}
                        className={`text-sm px-3 py-1 ${
                          match?.status === "active" 
                            ? "bg-green-600 animate-pulse" 
                            : match?.status === "preparing"
                            ? "bg-yellow-600"
                            : "bg-gray-600"
                        }`}
                      >
                        {match?.status === "preparing" && "PREPARANDO"}
                        {match?.status === "active" && "AO VIVO"}
                        {match?.status === "finished" && "FINALIZADA"}
                      </Badge>
                    </div>

                    <div className="text-left">
                      <div className="text-white text-xl font-bold">{match?.teamZ}</div>
                      <div className="text-red-400 text-3xl font-black">{match?.scoreZ || 0}</div>
                    </div>
                  </div>

                  {match?.status === "active" && (
                    <div className="mt-6 p-4 bg-black/30 rounded-lg border border-red-500/30">
                      <div className="text-red-400 text-sm font-bold mb-1">TEMPO DE JOGO</div>
                      <div className="text-white text-2xl font-mono font-black">
                        {getMatchTime()}
                      </div>
                    </div>
                  )}

                  <div className="text-gray-400 text-sm mt-4">
                    <span className="inline-flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      Assistindo partida do Blue Lock
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        ) : null}
      </div>

      {/* Componentes visuais do Flow State */}
      <FlowStateCutsceneSimple
        isActive={showFlowCutscene}
        playerName={flowPlayerName}
        flowColor={flowColor}
        flowPhrase={flowPhrase}
        onComplete={handleFlowCutsceneComplete}
      />

      {/* Vinheta do Flow State - aparece após a cutscene */}
      <FlowStateVignette
        isActive={isInFlowState && !showFlowCutscene}
        flowColor={flowColor}
      />

      {/* Introdução de personagem quando a partida inicia */}
      {showCharacterIntro && introCharacter && (
        <CharacterIntroduction
          character={introCharacter}
          isVisible={showCharacterIntro}
          onComplete={handleCharacterIntroComplete}
        />
      )}

      {/* Sistema de música do Flow State */}
      <FlowStateMusic
        isActive={isInFlowState && !showFlowCutscene}
        musicUrl={flowMusicUrl}
      />
    </div>
  );
}
