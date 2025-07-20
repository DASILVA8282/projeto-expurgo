  import { useState, useEffect } from "react";
  import { motion } from "framer-motion";
  import { useQuery } from "@tanstack/react-query";
  import { useAuth } from "@/hooks/useAuth";
  import { Card, CardContent } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { Link } from "wouter";
  import { useWebSocket } from "@/hooks/useWebSocket";
  import { WildCardModal } from "@/components/ui/WildCardModal";
  
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
                <div className="w-12 h-12 predator-claws rounded-lg flex items-center justify-center animate-menacing-glow">
                  <svg width="32" height="32" viewBox="0 0 32 32" className="text-white">
                    {/* Marcas de garra frontais predadoras - versão compacta */}
                    <rect x="4" y="4" width="24" height="24" fill="url(#compactGradient)" rx="3" stroke="#7f1d1d" strokeWidth="1"/>
                    <defs>
                      <linearGradient id="compactGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                <Link href="/guide">
                  <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-colors tracking-wide">
                    <svg width="16" height="16" viewBox="0 0 16 16" className="inline mr-2" fill="currentColor">
                      <path d="M3 2h10v12H3V2zm2 2v8h6V4H5zm1 1h4v1H6V5zm0 2h4v1H6V7zm0 2h2v1H6V9z"/>
                    </svg>MANUAL
                  </button>
                </Link>
                {user?.isAdmin && (
                  <Link href="/admin">
                    <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-colors tracking-wide">
                      <svg width="16" height="16" viewBox="0 0 16 16" className="inline mr-2" fill="currentColor">
                        <path d="M8 2L3 4v4c0 3.5 3 6 5 6s5-2.5 5-6V4L8 2zm0 2l3.5 1.5v3c0 2-1.5 3.5-3.5 3.5s-3.5-1.5-3.5-3.5v-3L8 4z"/>
                        <circle cx="8" cy="7.5" r="1.5"/>
                      </svg>CONTROLE MESTRE
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
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h2 className="font-bebas text-4xl font-bold text-red-500 mb-2 tracking-wider">DASHBOARD</h2>
            <p className="text-gray-400 font-oswald tracking-wide">Bem-vindo ao sistema Projeto Expurgo.</p>
          </motion.div>
  
          {/* Stats Overview */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)" }}
            >
              <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 font-oswald text-sm">NÍVEL</p>
                      <p className="text-2xl font-bebas font-bold text-red-400">
                        {character?.level || 1}
                      </p>
                    </div>
                    <i className="fas fa-chart-line text-3xl text-red-500"></i>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
  
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)" }}
            >
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
            </motion.div>
  
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)" }}
            >
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
            </motion.div>
  
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(239, 68, 68, 0.5)" }}
            >
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
            </motion.div>
          </motion.div>
  
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
            <CardContent className="p-6">
              <h3 className="font-bebas text-xl font-bold text-red-400 mb-4 tracking-wider">ATIVIDADE RECENTE</h3>
              <div className="space-y-3">
                {character ? (
                  <div className="flex items-center space-x-3 p-3 bg-gray-800 rounded-lg">
                    <i className="fas fa-user-edit text-red-500"></i>
                    <span className="text-gray-300">Sobrevivente {character.name} configurado.</span>
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
          </motion.div>
        </div>
        
        {/* Wild Card Modal */}
        <WildCardModal
          isOpen={showWildCardModal}
          onClose={() => setShowWildCardModal(false)}
        />
      </div>
    );
  }
  
