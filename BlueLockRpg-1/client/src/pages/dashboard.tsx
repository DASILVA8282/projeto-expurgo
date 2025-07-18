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
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b-2 border-red-600 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 expurgo-gradient rounded-lg flex items-center justify-center transform rotate-12">
                <svg width="24" height="24" viewBox="0 0 24 24" className="text-white">
                  {/* Marcas de garra - versão pequena, maiores e centralizadas */}
                  <g transform="translate(12,12) rotate(-20) translate(-12,-12)">
                    <path d="M4 2 L6 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <path d="M7 1 L9 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <path d="M10 0.5 L12 20.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <path d="M13 1 L15 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    <path d="M16 2 L18 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                  </g>
                </svg>
              </div>
              <h1 className="font-bebas text-xl font-bold text-red-500 tracking-wider">PROJETO EXPURGO</h1>
            </div>

            <div className="hidden md:flex items-center space-x-6">
              <Link href="/">
                <button className="text-red-400 font-oswald font-semibold transition-colors tracking-wide">
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
              {user?.isAdmin && (
                <Link href="/admin">
                  <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-colors tracking-wide">
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
          <h2 className="font-bebas text-4xl font-bold text-red-500 mb-2 tracking-wider">DASHBOARD</h2>
          <p className="text-gray-400 font-oswald tracking-wide">Bem-vindo ao sistema Projeto Expurgo</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-oswald text-sm">LEVEL</p>
                  <p className="text-2xl font-bebas font-bold text-red-400">
                    {character?.level || 1}
                  </p>
                </div>
                <i className="fas fa-chart-line text-3xl text-red-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-oswald text-sm">PARTIDAS</p>
                  <p className="text-2xl font-bebas font-bold text-red-400">
                    {character?.matches || 0}
                  </p>
                </div>
                <i className="fas fa-futbol text-3xl text-red-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-oswald text-sm">GOLS</p>
                  <p className="text-2xl font-bebas font-bold text-red-400">
                    {character?.goals || 0}
                  </p>
                </div>
                <i className="fas fa-trophy text-3xl text-red-500"></i>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 font-oswald text-sm">RANKING</p>
                  <p className="text-2xl font-bebas font-bold text-red-400">
                    #{character?.ranking || 299}
                  </p>
                </div>
                <i className="fas fa-medal text-3xl text-red-500"></i>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
          <CardContent className="p-6">
            <h3 className="font-bebas text-xl font-bold text-red-400 mb-4 tracking-wider">ATIVIDADE RECENTE</h3>
            <div className="space-y-3">
              {character ? (
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                  <i className="fas fa-user-edit text-red-500"></i>
                  <span className="text-gray-300">Sobrevivente {character.name} configurado</span>
                  <span className="text-gray-500 text-sm ml-auto">Recente</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                  <i className="fas fa-exclamation-circle text-amber-500"></i>
                  <span className="text-gray-300">Configure seu sobrevivente para começar</span>
                  <Link href="/character">
                    <Button size="sm" className="ml-auto bg-red-600 hover:bg-red-700 font-oswald font-semibold">
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
