import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Admin() {
  const { user, logout } = useAuth();
  const { toast } = useToast();

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
                    <th className="font-rajdhani font-bold text-slate-300 py-3">STATUS</th>
                    <th className="font-rajdhani font-bold text-slate-300 py-3">AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((userData) => (
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
                      <td className="py-4 text-yellow-400 font-orbitron font-bold">
                        #{userData.character?.ranking || "N/A"}
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
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 font-rajdhani font-semibold">
                            <i className="fas fa-eye mr-1"></i>Ver
                          </Button>
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
