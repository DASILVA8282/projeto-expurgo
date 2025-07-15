import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";

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

export default function Admin() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    if (!user?.isAdmin) {
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
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <i className="fas fa-shield-alt text-6xl text-red-500 mb-4"></i>
            <h1 className="text-2xl font-bold text-red-500 mb-2">Acesso Negado</h1>
            <p className="text-slate-400 mb-4">Você não tem permissão para acessar esta página.</p>
            <Link href="/">
              <Button className="blue-lock-gradient">
                Voltar ao Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (usersLoading || statsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="inline-block p-4 blue-lock-gradient rounded-2xl mb-4 animate-glow">
            <i className="fas fa-crown text-4xl text-white"></i>
          </div>
          <h1 className="font-orbitron text-2xl font-bold text-yellow-400">Carregando Painel Admin...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900 border-b-2 border-blue-600 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 blue-lock-gradient rounded-lg flex items-center justify-center transform rotate-45">
                <i className="fas fa-futbol text-white transform -rotate-45"></i>
              </div>
              <h1 className="font-orbitron text-xl font-bold text-blue-500">BLUE LOCK RPG</h1>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <button className="text-slate-300 hover:text-blue-400 font-rajdhani font-semibold transition-colors">
                  <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
                </button>
              </Link>
              <Link href="/character">
                <button className="text-slate-300 hover:text-blue-400 font-rajdhani font-semibold transition-colors">
                  <i className="fas fa-user-edit mr-2"></i>Meu Personagem
                </button>
              </Link>
              <Link href="/admin">
                <button className="text-yellow-400 font-rajdhani font-semibold transition-colors">
                  <i className="fas fa-crown mr-2"></i>Admin
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
          <h2 className="font-orbitron text-3xl font-bold text-yellow-400 mb-2">PAINEL ADMINISTRATIVO</h2>
          <p className="text-slate-400 font-rajdhani">Gerencie todos os jogadores do sistema</p>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900 border-2 border-yellow-500 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-rajdhani text-sm">TOTAL JOGADORES</p>
                  <p className="text-2xl font-orbitron font-bold text-yellow-400">
                    {stats?.totalPlayers || 0}
                  </p>
                </div>
                <i className="fas fa-users text-3xl text-yellow-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-2 border-green-500 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-rajdhani text-sm">JOGADORES ATIVOS</p>
                  <p className="text-2xl font-orbitron font-bold text-green-400">
                    {stats?.activePlayers || 0}
                  </p>
                </div>
                <i className="fas fa-user-check text-3xl text-green-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-2 border-blue-500 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-rajdhani text-sm">PARTIDAS HOJE</p>
                  <p className="text-2xl font-orbitron font-bold text-blue-400">
                    {stats?.matchesToday || 0}
                  </p>
                </div>
                <i className="fas fa-futbol text-3xl text-blue-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-2 border-red-500 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-rajdhani text-sm">TOTAL GOLS</p>
                  <p className="text-2xl font-orbitron font-bold text-red-400">
                    {stats?.totalGoals || 0}
                  </p>
                </div>
                <i className="fas fa-trophy text-3xl text-red-500"></i>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Players List */}
        <Card className="bg-slate-900 border-2 border-slate-700">
          <CardContent className="p-6">
            <h3 className="font-orbitron text-xl font-bold text-yellow-400 mb-6">LISTA DE JOGADORES</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b-2 border-slate-700">
                    <th className="font-rajdhani font-bold text-slate-300 py-3">JOGADOR</th>
                    <th className="font-rajdhani font-bold text-slate-300 py-3">POSIÇÃO</th>
                    <th className="font-rajdhani font-bold text-slate-300 py-3">LEVEL</th>
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
                            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                          />
                          <div>
                            <p className="font-semibold text-white">{userData.character?.name || "Sem personagem"}</p>
                            <p className="text-sm text-slate-400">{userData.username}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-blue-400 font-rajdhani font-semibold">
                        {userData.character?.position || "N/A"}
                      </td>
                      <td className="py-4 text-green-400 font-orbitron font-bold">
                        {userData.character?.level || 1}
                      </td>
                      <td className="py-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-orbitron font-bold ${
                            userData.character?.ranking <= 10 ? 'text-yellow-400' :
                            userData.character?.ranking <= 50 ? 'text-blue-400' :
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
                        <span className={`px-3 py-1 rounded-full text-sm font-rajdhani font-semibold ${
                          userData.character ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                        }`}>
                          {userData.character ? 'ATIVO' : 'INATIVO'}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          {userData.character ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  className="bg-blue-600 hover:bg-blue-700 font-rajdhani font-semibold"
                                  onClick={() => setSelectedPlayer(userData)}
                                >
                                  <i className="fas fa-eye mr-1"></i>Ver Ficha
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl bg-slate-900 border-2 border-blue-600 max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                  <DialogTitle className="font-orbitron text-2xl text-blue-400">
                                    FICHA COMPLETA - {userData.character?.name}
                                  </DialogTitle>
                                </DialogHeader>
                                
                                {/* Character Sheet */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4">
                                  {/* Basic Info */}
                                  <Card className="bg-slate-800 border-blue-500">
                                    <CardContent className="p-4">
                                      <h3 className="font-orbitron font-bold text-blue-400 mb-3">INFORMAÇÕES BÁSICAS</h3>
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
                                          <span className="text-slate-400">Posição:</span>
                                          <Badge className="bg-blue-600">{userData.character?.position}</Badge>
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
                                          <span className="text-slate-400">Arma:</span>
                                          <span className="text-white">{userData.character?.weapon || 'N/A'}</span>
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

                                  {/* Stats */}
                                  <Card className="bg-slate-800 border-purple-500 lg:col-span-2">
                                    <CardContent className="p-4">
                                      <h3 className="font-orbitron font-bold text-purple-400 mb-4">ATRIBUTOS</h3>
                                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {[
                                          { name: 'Velocidade', value: userData.character?.speed, color: 'bg-blue-500' },
                                          { name: 'Força', value: userData.character?.strength, color: 'bg-red-500' },
                                          { name: 'Resistência', value: userData.character?.stamina, color: 'bg-green-500' },
                                          { name: 'Finalização', value: userData.character?.shooting, color: 'bg-yellow-500' },
                                          { name: 'Passe', value: userData.character?.passing, color: 'bg-purple-500' },
                                          { name: 'Drible', value: userData.character?.dribbling, color: 'bg-cyan-500' }
                                        ].map((stat) => (
                                          <div key={stat.name} className="bg-slate-700 p-3 rounded-lg">
                                            <div className="flex items-center justify-between mb-2">
                                              <span className="text-slate-300 text-sm">{stat.name}</span>
                                              <span className="text-white font-bold">{stat.value}</span>
                                            </div>
                                            <div className="w-full bg-slate-600 rounded-full h-2">
                                              <div 
                                                className={`h-2 rounded-full ${stat.color}`}
                                                style={{ width: `${(stat.value / 100) * 100}%` }}
                                              />
                                            </div>
                                          </div>
                                        ))}
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
                          ) : (
                            <Button size="sm" disabled className="bg-gray-600 font-rajdhani font-semibold">
                              <i className="fas fa-ban mr-1"></i>Sem Personagem
                            </Button>
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
      </div>
    </div>
  );
}
