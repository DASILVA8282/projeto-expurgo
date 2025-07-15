import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { useWebSocket } from "@/hooks/useWebSocket";
import { WildCardModal } from "@/components/WildCardModal";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [showWildCardModal, setShowWildCardModal] = useState(false);
  const { lastMessage } = useWebSocket();

  const { data: character } = useQuery({
    queryKey: ["/api/characters/me"],
    retry: false,
  });

  const { data: wildCardInvitation } = useQuery({
    queryKey: ["/api/wildcard/invitation"],
    retry: false,
  });

  // Listen for Wild Card invitations via WebSocket
  useEffect(() => {
    if (lastMessage && lastMessage.type === "wildcard_invitation") {
      setShowWildCardModal(true);
    }
  }, [lastMessage]);

  // Check if there's a pending Wild Card invitation
  useEffect(() => {
    if (wildCardInvitation && wildCardInvitation.status === "pending") {
      setShowWildCardModal(true);
    }
  }, [wildCardInvitation]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if server request fails
      window.location.href = "/";
    }
  };

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
                <button className="text-blue-400 font-rajdhani font-semibold transition-colors">
                  <i className="fas fa-tachometer-alt mr-2"></i>Dashboard
                </button>
              </Link>
              <Link href="/character">
                <button className="text-slate-300 hover:text-blue-400 font-rajdhani font-semibold transition-colors">
                  <i className="fas fa-user-edit mr-2"></i>Meu Personagem
                </button>
              </Link>
              <Link href="/match">
                <button className="text-slate-300 hover:text-blue-400 font-rajdhani font-semibold transition-colors">
                  <i className="fas fa-futbol mr-2"></i>Partida
                </button>
              </Link>
              {user?.isAdmin && (
                <Link href="/admin">
                  <button className="text-slate-300 hover:text-blue-400 font-rajdhani font-semibold transition-colors">
                    <i className="fas fa-crown mr-2"></i>Admin
                  </button>
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-slate-300 font-medium">{user?.username}</span>
              <Button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 font-rajdhani font-semibold"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-orbitron text-3xl font-bold text-blue-400 mb-2">DASHBOARD</h2>
          <p className="text-slate-400 font-rajdhani">Bem-vindo ao sistema Blue Lock RPG</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-slate-900 border-2 border-blue-600 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-rajdhani text-sm">LEVEL</p>
                  <p className="text-2xl font-orbitron font-bold text-blue-400">
                    {character?.level || 1}
                  </p>
                </div>
                <i className="fas fa-chart-line text-3xl text-blue-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-2 border-green-500 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-rajdhani text-sm">PARTIDAS</p>
                  <p className="text-2xl font-orbitron font-bold text-green-400">
                    {character?.matches || 0}
                  </p>
                </div>
                <i className="fas fa-futbol text-3xl text-green-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-2 border-yellow-500 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-rajdhani text-sm">GOLS</p>
                  <p className="text-2xl font-orbitron font-bold text-yellow-400">
                    {character?.goals || 0}
                  </p>
                </div>
                <i className="fas fa-trophy text-3xl text-yellow-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 border-2 border-purple-500 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 font-rajdhani text-sm">RANKING</p>
                  <p className="text-2xl font-orbitron font-bold text-purple-400">
                    #{character?.ranking || 299}
                  </p>
                </div>
                <i className="fas fa-medal text-3xl text-purple-500"></i>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-slate-900 border-2 border-slate-700">
          <CardContent className="p-6">
            <h3 className="font-orbitron text-xl font-bold text-blue-400 mb-4">ATIVIDADE RECENTE</h3>
            <div className="space-y-3">
              {character ? (
                <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg">
                  <i className="fas fa-user-edit text-blue-500"></i>
                  <span className="text-slate-300">Personagem {character.name} configurado</span>
                  <span className="text-slate-500 text-sm ml-auto">Recente</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-slate-800 rounded-lg">
                  <i className="fas fa-exclamation-circle text-yellow-500"></i>
                  <span className="text-slate-300">Configure seu personagem para começar</span>
                  <Link href="/character">
                    <Button size="sm" className="ml-auto blue-lock-gradient">
                      Configurar
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Wild Card Modal */}
      <WildCardModal
        isOpen={showWildCardModal}
        onClose={() => setShowWildCardModal(false)}
      />
    </div>
  );
}
