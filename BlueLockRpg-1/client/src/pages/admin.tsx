import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { WildCardAdmin } from "@/components/ui/WildCardAdmin";

// Ranking Manager Component
function RankingManager({ character, userId }: { character: any; userId: number }) {
  const [newRank, setNewRank] = useState(character?.ranking || 299);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateRankMutation = useMutation({
    mutationFn: async (rank: number) => {
      const response = await apiRequest("PATCH", `/api/admin/character/${userId}/rank`, { newRank: rank });
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Sucesso", description: "Ranking atualizado com sucesso!" });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: () => {
      toast({ title: "Erro", description: "Falha ao atualizar ranking", variant: "destructive" });
    },
  });

  const calculateRankMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/admin/character/${userId}/calculate-rank`);
      return response.json();
    },
    onSuccess: (data) => {
      setNewRank(data.ranking);
      toast({ 
        title: "Ranking Calculado", 
        description: `Novo ranking: #${data.ranking} baseado em stats e performance` 
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
    },
    onError: () => {
      toast({ title: "Erro", description: "Falha ao calcular ranking", variant: "destructive" });
    },
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <span className="text-slate-400 text-sm">Ranking atual: #{character?.ranking}</span>
      </div>

      <div className="flex items-center space-x-2">
        <Input
          type="number"
          min="1"
          max="300"
          value={newRank}
          onChange={(e) => setNewRank(parseInt(e.target.value))}
          className="w-20 bg-slate-700 border-slate-600 text-white"
        />
        <Button
          size="sm"
          onClick={() => updateRankMutation.mutate(newRank)}
          disabled={updateRankMutation.isPending}
          className="bg-yellow-600 hover:bg-yellow-700"
        >
          {updateRankMutation.isPending ? "..." : "Definir Rank"}
        </Button>
      </div>

      <Button
        size="sm"
        onClick={() => calculateRankMutation.mutate()}
        disabled={calculateRankMutation.isPending}
        className="bg-purple-600 hover:bg-purple-700 w-full"
      >
        {calculateRankMutation.isPending ? "Calculando..." : "Calcular Rank Automático"}
      </Button>
    </div>
  );
}

function MatchAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedMatch, setSelectedMatch] = useState<any>(null);
  const [selectedPlayer, setSelectedPlayer] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<'V' | 'H'>('V');
  const [goalMinute, setGoalMinute] = useState<number>(0);
  const [showGoalForm, setShowGoalForm] = useState(false);

  const { data: matches, isLoading: matchesLoading } = useQuery({
    queryKey: ['/api/admin/matches'],
    refetchInterval: 2000,
  });

  const { data: playersWithCharacters } = useQuery({
    queryKey: ['/api/admin/users-with-characters'],
    enabled: showGoalForm,
  });

  const createMatchMutation = useMutation({
    mutationFn: async (matchData: any) => {
      return await apiRequest('POST', '/api/admin/matches', matchData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/matches'] });
      toast({
        title: 'Partida criada!',
        description: 'A partida foi criada com sucesso.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao criar partida',
        description: error.message || 'Erro desconhecido',
        variant: 'destructive',
      });
    },
  });

  const createGoalMutation = useMutation({
    mutationFn: async (goalData: any) => {
      return await apiRequest('POST', '/api/admin/goals', goalData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/matches'] });
      setShowGoalForm(false);
      setSelectedPlayer(null);
      setGoalMinute(0);
      toast({
        title: 'Gol registrado!',
        description: 'O gol foi registrado com sucesso.',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Erro ao registrar gol',
        description: error.message || 'Erro desconhecido',
        variant: 'destructive',
      });
    },
  });

  const handleCreateGoal = () => {
    if (!selectedMatch || !selectedPlayer) return;

    createGoalMutation.mutate({
      matchId: selectedMatch.id,
      playerId: selectedPlayer.id,
      team: selectedTeam,
      minute: goalMinute,
    });
  };

  return (
    <div className="space-y-6">
      {/* Match List */}
      <Card className="bg-slate-900 border-2 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bebas text-xl font-bold text-red-400 tracking-wider">GERENCIAMENTO DE COMBATES</h3>
            <Button
              onClick={() => setShowGoalForm(true)}
              className="bg-red-600 hover:bg-red-700 font-oswald font-semibold tracking-wide"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" className="mr-2" fill="currentColor">
                <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M5 8L11 8M8 5L8 11" stroke="currentColor" strokeWidth="1.5"/>
              </svg>Registrar Ponto
            </Button>
          </div>

          {matchesLoading ? (
            <div className="text-center py-8">
              <i className="fas fa-spinner fa-spin text-2xl text-slate-400"></i>
              <p className="text-slate-400 mt-2">Carregando partidas...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-700">
                    <th className="text-left p-4 font-orbitron text-slate-300">ID</th>
                    <th className="text-left p-4 font-orbitron text-slate-300">TIMES</th>
                    <th className="text-left p-4 font-orbitron text-slate-300">PLACAR</th>
                    <th className="text-left p-4 font-orbitron text-slate-300">STATUS</th>
                    <th className="text-left p-4 font-orbitron text-slate-300">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {matches?.map((match: any) => (
                    <tr key={match.id} className="border-b border-slate-700 hover:bg-slate-800/50">
                      <td className="p-4 font-rajdhani text-slate-400">#{match.id}</td>
                      <td className="p-4 font-rajdhani text-white">{match.teamV} vs {match.teamH}</td>
                      <td className="p-4 font-rajdhani text-white">{match.scoreV} - {match.scoreH}</td>
                      <td className="p-4">
                        <Badge className={match.status === 'active' ? 'bg-green-600' : 'bg-slate-600'}>
                          {match.status === 'active' ? 'Ativa' : 'Inativa'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => setSelectedMatch(match)}
                            className="bg-red-600 hover:bg-red-700 font-rajdhani font-semibold"
                          >
                            <i className="fas fa-eye mr-1"></i>Ver
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedMatch(match);
                              setShowGoalForm(true);
                            }}
                            className="bg-green-600 hover:bg-green-700 font-rajdhani font-semibold"
                          >
                            <i className="fas fa-futbol mr-1"></i>Gol
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {matches?.length === 0 && (
                <div className="text-center py-8">
                  <i className="fas fa-futbol text-4xl text-slate-600 mb-4"></i>
                  <p className="text-slate-400 font-rajdhani">Nenhuma partida encontrada</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Goal Creation Form */}
      <Dialog open={showGoalForm} onOpenChange={setShowGoalForm}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle className="font-orbitron text-green-400">REGISTRAR GOL</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Match Selection */}
            <div>
              <Label className="text-slate-300 font-rajdhani">Partida</Label>
              <select
                value={selectedMatch?.id || ''}
                onChange={(e) => {
                  const match = matches?.find((m: any) => m.id === parseInt(e.target.value));
                  setSelectedMatch(match);
                }}
                className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="">Selecione uma partida</option>
                {matches?.map((match: any) => (
                  <option key={match.id} value={match.id}>
                    {match.teamV} vs {match.teamH} ({match.scoreV} - {match.scoreH})
                  </option>
                ))}
              </select>
            </div>

            {/* Player Selection */}
            <div>
              <Label className="text-slate-300 font-rajdhani">Jogador</Label>
              <select
                value={selectedPlayer?.id || ''}
                onChange={(e) => {
                  const player = playersWithCharacters?.find((p: any) => p.id === parseInt(e.target.value));
                  setSelectedPlayer(player);
                }}
                className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="">Selecione um jogador</option>
                {playersWithCharacters?.map((player: any) => (
                  <option key={player.id} value={player.id}>
                    {player.character?.name || player.username} ({player.username})
                  </option>
                ))}
              </select>
            </div>

            {/* Team Selection */}
            <div>
              <Label className="text-slate-300 font-rajdhani">Time</Label>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value as 'V' | 'H')}
                className="w-full p-2 bg-slate-800 border border-slate-600 rounded text-white"
              >
                <option value="V">Visitante</option>
                <option value="H">Casa</option>
              </select>
            </div>

            {/* Minute */}
            <div>
              <Label className="text-slate-300 font-rajdhani">Minuto</Label>
              <Input
                type="number"
                value={goalMinute}
                onChange={(e) => setGoalMinute(parseInt(e.target.value) || 0)}
                className="bg-slate-800 border-slate-600 text-white"
                placeholder="Ex: 45"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button
              onClick={() => setShowGoalForm(false)}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleCreateGoal}
              disabled={!selectedMatch || !selectedPlayer || createGoalMutation.isPending}
              className="bg-green-600 hover:bg-green-700"
            >
              {createGoalMutation.isPending ? (
                <><i className="fas fa-spinner fa-spin mr-2"></i>Registrando...</>
              ) : (
                <><i className="fas fa-futbol mr-2"></i>Registrar Gol</>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function Admin() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    console.log("Admin page - Current user:", user);
    console.log("Admin page - User isAdmin:", user?.isAdmin);
    
    if (user && !user.isAdmin) {
      console.log("Admin page - User is not admin, showing access denied");
      toast({
        title: "Acesso negado",
        description: "Você não tem permissão para acessar esta página",
        variant: "destructive",
      });
    }
  }, [user, toast]);

  const { data: users, isLoading: usersLoading } = useQuery({
    queryKey: ["/api/admin/users"],
    enabled: !!user?.isAdmin,
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    enabled: !!user?.isAdmin,
  });

  const eliminatePlayerMutation = useMutation({
    mutationFn: async (userId: number) => {
      return apiRequest("PATCH", `/api/admin/character/${userId}/eliminate`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Jogador Eliminado",
        description: "O jogador foi eliminado com sucesso",
      });
    },
    onError: (error: any) => {
      console.error("Eliminate player error:", error);
      toast({
        title: "Erro",
        description: error.message || "Falha ao eliminar o jogador",
        variant: "destructive",
      });
    },
  });

  const deleteUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const response = await apiRequest("DELETE", `/api/admin/user/${userId}`);
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      toast({
        title: "Usuário Deletado",
        description: `O usuário ${data.deletedUser.username} foi permanentemente removido do sistema`,
      });
    },
    onError: (error: any) => {
      console.error("Delete user error:", error);
      toast({
        title: "Erro",
        description: error.message || "Falha ao deletar o usuário",
        variant: "destructive",
      });
    },
  });

  const handleEliminatePlayer = async (userId: number) => {
    eliminatePlayerMutation.mutate(userId);
  };

  const handleDeleteUser = async (userId: number, username: string) => {
    const confirmed = window.confirm(
      `⚠️ ATENÇÃO: AÇÃO IRREVERSÍVEL ⚠️\n\n` +
      `Você está prestes a DELETAR PERMANENTEMENTE o usuário "${username}".\n\n` +
      `Isso irá remover:\n` +
      `• Conta do usuário\n` +
      `• Personagem e todas as suas estatísticas\n` +
      `• Histórico de partidas e gols\n` +
      `• Convites Wild Card\n` +
      `• TODOS os dados relacionados\n\n` +
      `Esta ação NÃO PODE ser desfeita!\n\n` +
      `Digite "CONFIRMAR EXCLUSÃO" para prosseguir:`
    );

    if (confirmed) {
      const secondConfirmation = window.prompt(
        `Por favor, digite "CONFIRMAR EXCLUSÃO" (sem aspas) para confirmar a remoção permanente do usuário ${username}:`
      );

      if (secondConfirmation === "CONFIRMAR EXCLUSÃO") {
        deleteUserMutation.mutate(userId);
      } else {
        toast({
          title: "Exclusão Cancelada",
          description: "A exclusão foi cancelada. Texto de confirmação incorreto.",
          variant: "destructive",
        });
      }
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if server request fails
      window.location.href = "/";
    }
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <svg width="80" height="80" viewBox="0 0 80 80" className="mx-auto mb-4 text-red-500">
              <path d="M40 8L38 10L40 32L42 10L40 8Z" fill="currentColor"/>
              <circle cx="40" cy="40" r="28" fill="none" stroke="currentColor" strokeWidth="4"/>
              <path d="M25 25L55 55M55 25L25 55" stroke="currentColor" strokeWidth="4"/>
              <path d="M30 40L50 40M40 30L40 50" stroke="currentColor" strokeWidth="3"/>
            </svg>
            <h1 className="text-2xl font-bebas font-bold text-red-500 mb-2 tracking-wider">ACESSO NEGADO</h1>
            <p className="text-gray-400 mb-4 font-oswald">Você não possui autorização para acessar o centro de comando.</p>
            <Link href="/">
              <Button className="expurgo-gradient font-bebas tracking-wider">
                RETORNAR À CENTRAL
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (usersLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="inline-block p-4 expurgo-gradient rounded-lg mb-4 animate-menacing-glow transform rotate-12">
            <svg width="48" height="48" viewBox="0 0 48 48" className="text-white">
              {/* Marcas de garra - 5 riscos diagonais maiores e centralizados */}
              <g transform="translate(24,24) rotate(-20) translate(-24,-24)">
                <path d="M8 4 L12 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <path d="M14 2 L18 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <path d="M20 1 L24 41" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <path d="M26 2 L30 42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
                <path d="M32 4 L36 44" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none"/>
              </g>
            </svg>
          </div>
          <h1 className="font-bebas text-3xl font-bold text-red-500 tracking-wider">CARREGANDO CENTRO DE COMANDO...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b-2 border-red-600 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 predator-claws rounded-lg flex items-center justify-center animate-menacing-glow">
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-white">
                  {/* Logo predador frontal - versão admin */}
                  <rect x="4" y="4" width="24" height="24" fill="url(#adminGradient)" rx="3" stroke="#7f1d1d" strokeWidth="1"/>
                  <defs>
                    <linearGradient id="adminGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#dc2626"/>
                      <stop offset="50%" stopColor="#991b1b"/>
                      <stop offset="100%" stopColor="#450a0a"/>
                    </linearGradient>
                  </defs>
                  <g>
                    <path d="M8 8 L9 24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <path d="M11 7 L12 25" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none"/>
                    <path d="M14 6.5 L15 25.5" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none"/>
                    <path d="M17 7 L18 25" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" fill="none"/>
                    <path d="M20 8 L21 24" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                  </g>
                </svg>
              </div>
              <h1 className="font-bebas text-xl font-bold text-red-500 tracking-wider">PROJETO EXPURGO</h1>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-colors tracking-wide">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="inline mr-2" fill="currentColor">
                    <path d="M8 1L7 2L8 6L9 2L8 1Z"/>
                    <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>CENTRAL DE COMANDO
                </button>
              </Link>
              <Link href="/character">
                <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-colors tracking-wide">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="inline mr-2" fill="currentColor">
                    <path d="M8 8c1.5 0 3-1.5 3-3s-1.5-3-3-3-3 1.5-3 3 1.5 3 3 3zm0 1c-2 0-6 1-6 3v1h12v-1c0-2-4-3-6-3z"/>
                  </svg>MEU SOBREVIVENTE
                </button>
              </Link>
              <Link href="/match">
                <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-colors tracking-wide">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="inline mr-2" fill="currentColor">
                    <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M5 8L11 8M8 5L8 11" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>COMBATES
                </button>
              </Link>
              <Link href="/guide">
                <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-colors tracking-wide">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="inline mr-2" fill="currentColor">
                    <path d="M3 2h10v12H3V2zm2 2v8h6V4H5zm1 1h4v1H6V5zm0 2h4v1H6V7zm0 2h2v1H6V9z"/>
                  </svg>MANUAL
                </button>
              </Link>
              <Link href="/admin">
                <button className="text-red-400 font-oswald font-semibold transition-colors tracking-wide">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="inline mr-2" fill="currentColor">
                    <path d="M8 2L3 4v4c0 3.5 3 6 5 6s5-2.5 5-6V4L8 2zm0 2l3.5 1.5v3c0 2-1.5 3.5-3.5 3.5s-3.5-1.5-3.5-3.5v-3L8 4z"/>
                    <circle cx="8" cy="7.5" r="1.5"/>
                  </svg>CONTROLE MESTRE
                </button>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-slate-300 font-medium">{user?.username}</span>
              <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 font-rajdhani font-semibold">
                <i className="fas fa-sign-out-alt mr-2"></i>Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-bebas text-4xl font-bold text-red-500 mb-2 tracking-wider">CONTROLE MESTRE</h2>
          <p className="text-gray-400 font-oswald tracking-wide">Comando supremo do sistema Projeto Expurgo.</p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-oswald text-sm">TOTAL DE JOGADORES</p>
                  <p className="text-2xl font-bebas font-bold text-red-400">
                    {stats?.totalPlayers || 0}
                  </p>
                </div>
                <i className="fas fa-users text-3xl text-red-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-oswald text-sm">SOBREVIVENTES ATIVOS</p>
                  <p className="text-2xl font-bebas font-bold text-red-400">
                    {stats?.activePlayers || 0}
                  </p>
                </div>
                <i className="fas fa-user-check text-3xl text-red-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-oswald text-sm">COMBATES DE HOJE</p>
                  <p className="text-2xl font-bebas font-bold text-red-400">
                    {stats?.matchesToday || 0}
                  </p>
                </div>
                <i className="fas fa-futbol text-3xl text-red-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-2 border-red-500 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-rajdhani text-sm">TOTAL DE GOLS</p>
                  <p className="text-2xl font-orbitron font-bold text-red-400">
                    {stats?.totalGoals || 0}
                  </p>
                </div>
                <i className="fas fa-trophy text-3xl text-red-500"></i>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Tabs */}
        <Tabs defaultValue="players" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800 border-2 border-slate-700">
            <TabsTrigger value="players" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <i className="fas fa-users mr-2"></i>Jogadores
            </TabsTrigger>
            <TabsTrigger value="matches" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <i className="fas fa-futbol mr-2"></i>Partidas
            </TabsTrigger>
            <TabsTrigger value="wildcard" className="data-[state=active]:bg-red-600 data-[state=active]:text-white">
              <i className="fas fa-bolt mr-2"></i>Wild Card
            </TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="mt-6">
            <Card className="bg-slate-900 border-2 border-slate-700">
              <CardContent className="p-6">
                <h3 className="font-orbitron text-xl font-bold text-yellow-400 mb-6">LISTA DE JOGADORES</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-slate-700">
                    <th className="font-rajdhani font-bold text-slate-300 py-3">JOGADOR</th>
                    <th className="font-rajdhani font-bold text-slate-300 py-3">CLASSE</th>
                    <th className="font-rajdhani font-bold text-slate-300 py-3">NÍVEL</th>
                    <th className="font-rajdhani font-bold text-slate-300 py-3">RANKING</th>
                    <th className="font-rajdhani font-bold text-slate-300 py-3">GOLS</th>
                    <th className="font-rajdhani font-bold text-slate-300 py-3">STATUS</th>
                    <th className="font-rajdhani font-bold text-slate-300 py-3">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.sort((a, b) => {
                    // Sort by ranking: players with characters ranked by ranking, then players without characters
                    if (!a.character && !b.character) return 0;
                    if (!a.character) return 1;
                    if (!b.character) return -1;
                    return (a.character.ranking || 300) - (b.character.ranking || 300);
                  }).map((userData) => (
                    <tr key={userData.id} className="border-b border-slate-700 hover:bg-slate-800 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center space-x-3">
                          <img 
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=50&h=50" 
                            alt="Avatar do jogador" 
                            className="w-10 h-10 rounded-full border-2 border-red-500 object-cover"
                          />
                          <div>
                            <p className="font-semibold text-white">{userData.character?.name || "Sem personagem"}</p>
                            <p className="text-sm text-slate-400">{userData.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-red-400 font-rajdhani font-semibold">
                        {userData.character?.classe || "N/A"}
                      </td>
                      <td className="py-4 text-green-400 font-orbitron font-bold">
                        {userData.character?.level || 1}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-orbitron font-bold ${
                            userData.character?.ranking <= 10 ? 'text-yellow-400' :
                            userData.character?.ranking <= 50 ? 'text-red-400' :
                            userData.character?.ranking <= 100 ? 'text-green-400' : 'text-slate-400'
                          }`}>
                            #{userData.character?.ranking || "N/A"}
                          </span>
                          {userData.character?.ranking <= 10 && (
                            <i className="fas fa-crown text-yellow-400 text-sm"></i>
                          )}
                        </div>
                      </td>
                      <td className="py-4 text-red-400 font-orbitron font-bold">
                        {userData.character?.goals || 0}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-rajdhani font-semibold ${
                            userData.character?.isEliminated ? 'bg-red-500 text-white' :
                            userData.character ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                          }`}>
                            {userData.character?.isEliminated ? 'ELIMINADO' : 
                             userData.character ? 'ATIVO' : 'INATIVO'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          {userData.character ? (
                            <>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    size="sm" 
                                    className="bg-red-600 hover:bg-red-700 font-rajdhani font-semibold"
                                    onClick={() => setSelectedPlayer(userData)}
                                  >
                                    <i className="fas fa-eye mr-1"></i>Ver Ficha
                                  </Button>
                                </DialogTrigger>
                              <DialogContent className="max-w-4xl bg-slate-900 border-2 border-red-600 max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="font-orbitron text-2xl text-red-400">
                                    FICHA COMPLETA - {userData.character?.name}
                                  </DialogTitle>
                                </DialogHeader>

                                {/* Character Sheet */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                                  {/* Basic Info */}
                                  <Card className="bg-slate-800 border-red-500">
                                    <CardContent className="p-4">
                                      <h3 className="font-orbitron font-bold text-red-400 mb-3">INFORMAÇÕES BÁSICAS</h3>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Nome:</span>
                                          <span className="text-white font-semibold">{userData.character?.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Usuário:</span>
                                          <span className="text-white">{userData.username}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Classe:</span>
                                          <Badge className="bg-red-600">{userData.character?.classe || 'N/A'}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Subclasse:</span>
                                          <Badge className="bg-purple-600">{userData.character?.subclasse || 'N/A'}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Idade:</span>
                                          <span className="text-white">{userData.character?.age || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Altura:</span>
                                          <span className="text-white">{userData.character?.height || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Origem:</span>
                                          <Badge className="bg-green-600">{userData.character?.origin || 'N/A'}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Motivação:</span>
                                          <span className="text-white">{userData.character?.motivacao || 'N/A'}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Habilidades:</span>
                                          <span className="text-white text-sm">{userData.character?.weapon || 'N/A'}</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Progress Info */}
                                  <Card className="bg-slate-800 border-green-500">
                                    <CardContent className="p-4">
                                      <h3 className="font-orbitron font-bold text-green-400 mb-3">PROGRESSO</h3>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Level:</span>
                                          <Badge className="bg-green-600 font-orbitron">{userData.character?.level}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Experiência:</span>
                                          <span className="text-white font-bold">{userData.character?.experience} XP</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Ranking:</span>
                                          <Badge className="bg-yellow-600 font-orbitron">#{userData.character?.ranking}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Partidas:</span>
                                          <span className="text-white font-bold">{userData.character?.matches}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Gols:</span>
                                          <span className="text-white font-bold">{userData.character?.goals}</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Classes e Subclasses */}
                                  <Card className="bg-slate-800 border-red-500">
                                    <CardContent className="p-4">
                                      <h3 className="font-orbitron font-bold text-red-400 mb-3">CLASSE</h3>
                                      <div className="space-y-2">
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Classe:</span>
                                          <Badge className="bg-red-600 font-orbitron">{userData.character?.classe || 'N/A'}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Subclasse:</span>
                                          <Badge className="bg-orange-600 font-orbitron">{userData.character?.subclasse || 'N/A'}</Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Flow Color:</span>
                                          <div className="flex items-center space-x-2">
                                            <div 
                                              className={`w-4 h-4 rounded-full border-2 border-white`}
                                              style={{ backgroundColor: userData.character?.flowColor || '#ff0000' }}
                                            />
                                            <span className="text-white text-sm">{userData.character?.flowColor || 'red'}</span>
                                          </div>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-slate-400">Frase Flow:</span>
                                          <span className="text-white text-sm italic">{userData.character?.flowPhrase || 'N/A'}</span>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Atributos Básicos */}
                                  <Card className="bg-slate-800 border-purple-500 lg:col-span-2">
                                    <CardContent className="p-4">
                                      <h3 className="font-orbitron font-bold text-purple-400 mb-4">ATRIBUTOS BÁSICOS</h3>
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {[
                                          { name: 'FÍSICO', value: userData.character?.fisico, color: 'bg-red-500' },
                                          { name: 'VELOCIDADE', value: userData.character?.velocidade, color: 'bg-red-500' },
                                          { name: 'INTELECTO', value: userData.character?.intelecto, color: 'bg-purple-500' },
                                          { name: 'CARISMA', value: userData.character?.carisma, color: 'bg-green-500' },
                                        ].map((stat) => (
                                          <div key={stat.name} className="bg-slate-700 p-3 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                              <span className="text-slate-300 text-sm font-bold">{stat.name}</span>
                                              <span className="text-white font-bold text-lg">{stat.value || 3}</span>
                                            </div>
                                            <div className="w-full bg-slate-600 rounded-full h-2">
                                              <div 
                                                className={`h-2 rounded-full ${stat.color}`}
                                                style={{ width: `${((stat.value || 3) / 5) * 100}%` }}
                                              />
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                      <div className="mt-4 p-3 bg-slate-700 rounded-lg">
                                        <div className="flex items-center justify-between">
                                          <span className="text-slate-300 font-bold">EGOÍSMO</span>
                                          <span className="text-yellow-400 font-bold text-lg">{userData.character?.egoismo || 5}</span>
                                        </div>
                                        <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                                          <div 
                                            className="h-2 rounded-full bg-yellow-500"
                                            style={{ width: `${((userData.character?.egoismo || 5) / 5) * 100}%` }}
                                          />
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Perícias Principais */}
                                  <Card className="bg-slate-800 border-amber-500 lg:col-span-2">
                                    <CardContent className="p-4">
                                      <h3 className="font-orbitron font-bold text-amber-400 mb-4">PERÍCIAS PRINCIPAIS</h3>
                                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                        {[
                                          { name: 'Chute', value: userData.character?.chute || 0 },
                                          { name: 'Precisão', value: userData.character?.precisao || 0 },
                                          { name: 'Roubo', value: userData.character?.roubo || 0 },
                                          { name: 'Análise', value: userData.character?.analise || 0 },
                                          { name: 'Determinação', value: userData.character?.determinacao || 0 },
                                          { name: 'Estratégia', value: userData.character?.estrategia || 0 },
                                          { name: 'Intuição', value: userData.character?.intuicao || 0 },
                                          { name: 'Interação Social', value: userData.character?.interacao_social || 0 },
                                          { name: 'Corrida', value: userData.character?.corrida || 0 },
                                          { name: 'Cruzamento', value: userData.character?.cruzamento || 0 },
                                          { name: 'Defesa', value: userData.character?.defesa || 0 },
                                          { name: 'Drible', value: userData.character?.drible || 0 },
                                          { name: 'Passe', value: userData.character?.passe || 0 },
                                          { name: 'Performance', value: userData.character?.performance || 0 },
                                          { name: 'Comemoração', value: userData.character?.comemoracao || 0 },
                                          { name: 'Língua Estrangeira', value: userData.character?.lingua_estrangeira || 0 }
                                        ].map((skill) => (
                                          <div key={skill.name} className="bg-slate-700 p-2 rounded text-center">
                                            <div className="text-slate-300 text-xs font-semibold mb-1">{skill.name}</div>
                                            <div className={`text-sm font-bold ${
                                              skill.value === 0 ? 'text-gray-400' :
                                              skill.value <= 2 ? 'text-red-400' :
                                              skill.value <= 4 ? 'text-yellow-400' :
                                              'text-green-400'
                                            }`}>
                                              CLASSE {skill.value === 0 ? '—' : ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][skill.value - 1] || skill.value}
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Perícias Livres & Reação */}
                                  <Card className="bg-slate-800 border-cyan-500 lg:col-span-2">
                                    <CardContent className="p-4">
                                      <h3 className="font-orbitron font-bold text-cyan-400 mb-4">PERÍCIAS ESPECIAIS</h3>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <h4 className="text-green-400 font-semibold mb-2">Perícias Livres</h4>
                                          <div className="grid grid-cols-2 gap-2">
                                            {[
                                              { name: 'Fortitude', value: userData.character?.fortitude || 0 },
                                              { name: 'Finta', value: userData.character?.finta || 0 },
                                              { name: 'Furtividade', value: userData.character?.furtividade || 0 },
                                              { name: 'Iniciativa', value: userData.character?.iniciativa || 0 },
                                              { name: 'Percepção', value: userData.character?.percepcao || 0 },
                                              { name: 'Sorte', value: userData.character?.sorte || 0 }
                                            ].map((skill) => (
                                              <div key={skill.name} className="bg-slate-700 p-2 rounded text-center">
                                                <div className="text-slate-300 text-xs font-semibold mb-1">{skill.name}</div>
                                                <div className={`text-xs font-bold ${
                                                  skill.value === 0 ? 'text-gray-400' :
                                                  skill.value <= 2 ? 'text-red-400' :
                                                  skill.value <= 4 ? 'text-yellow-400' :
                                                  'text-green-400'
                                                }`}>
                                                  {skill.value === 0 ? '—' : `CL.${skill.value}`}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                        <div>
                                          <h4 className="text-orange-400 font-semibold mb-2">Perícias de Reação</h4>
                                          <div className="grid grid-cols-2 gap-2">
                                            {[
                                              { name: 'Domínio', value: userData.character?.dominio || 0 },
                                              { name: 'Cabeceio', value: userData.character?.cabeceio || 0 },
                                              { name: 'Interceptação', value: userData.character?.interceptacao || 0 },
                                              { name: 'Reação', value: userData.character?.reacao || 0 }
                                            ].map((skill) => (
                                              <div key={skill.name} className="bg-slate-700 p-2 rounded text-center">
                                                <div className="text-slate-300 text-xs font-semibold mb-1">{skill.name}</div>
                                                <div className={`text-xs font-bold ${
                                                  skill.value === 0 ? 'text-gray-400' :
                                                  skill.value <= 2 ? 'text-red-400' :
                                                  skill.value <= 4 ? 'text-yellow-400' :
                                                  'text-green-400'
                                                }`}>
                                                  {skill.value === 0 ? '—' : `CL.${skill.value}`}
                                                </div>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </div>
                                    </CardContent>
                                  </Card>

                                  {/* Bio */}
                                  {userData.character?.bio && (
                                    <Card className="bg-slate-800 border-slate-500 lg:col-span-2">
                                      <CardContent className="p-4">
                                        <h3 className="font-orbitron font-bold text-slate-400 mb-3">BIOGRAFIA</h3>
                                        <p className="text-slate-300 leading-relaxed">{userData.character.bio}</p>
                                      </CardContent>
                                    </Card>
                                  )}

                                  {/* Admin Actions */}
                                  <Card className="bg-slate-800 border-yellow-500 lg:col-span-2">
                                    <CardContent className="p-4">
                                      <h3 className="font-orbitron font-bold text-yellow-400 mb-4">AÇÕES ADMINISTRATIVAS</h3>
                                      <div className="flex flex-wrap gap-3">
                                        <RankingManager character={userData.character} userId={userData.id} />
                                      </div>
                                    </CardContent>
                                  </Card>
                                </div>
                              </DialogContent>
                            </Dialog>

                            {!userData.character.isEliminated && (
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleEliminatePlayer(userData.id)}
                                className="bg-red-600 hover:bg-red-700 font-rajdhani font-semibold"
                              >
                                <i className="fas fa-user-times mr-1"></i>Eliminar
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteUser(userData.id, userData.username)}
                              disabled={deleteUserMutation.isPending}
                              className="bg-red-800 hover:bg-red-900 font-rajdhani font-semibold border-2 border-red-600"
                            >
                              {deleteUserMutation.isPending ? (
                                <><i className="fas fa-spinner fa-spin mr-1"></i>Deletando...</>
                              ) : (
                                <><i className="fas fa-trash mr-1"></i>Deletar Conta</>
                              )}
                            </Button>
                          </>
                          ) : (
                            <>
                              <Button size="sm" disabled className="bg-gray-600 font-rajdhani font-semibold">
                                <i className="fas fa-ban mr-1"></i>Sem Personagem
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteUser(userData.id, userData.username)}
                                disabled={deleteUserMutation.isPending}
                                className="bg-red-800 hover:bg-red-900 font-rajdhani font-semibold border-2 border-red-600"
                              >
                                {deleteUserMutation.isPending ? (
                                  <><i className="fas fa-spinner fa-spin mr-1"></i>Deletando...</>
                                ) : (
                                  <><i className="fas fa-trash mr-1"></i>Deletar Conta</>
                                )}
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {users?.length === 0 && (
                <div className="text-center py-8">
                  <i className="fas fa-users text-4xl text-slate-600 mb-4"></i>
                  <p className="text-slate-400 font-rajdhani">Nenhum jogador encontrado no sistema</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="matches" className="mt-6">
        <MatchAdmin />
      </TabsContent>

      <TabsContent value="wildcard" className="mt-6">
        <WildCardAdmin />
      </TabsContent>
    </Tabs>
      </div>
    </div>
  );
}
