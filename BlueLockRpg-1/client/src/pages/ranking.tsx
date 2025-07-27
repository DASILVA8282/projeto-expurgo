import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import defaultAvatar from "@assets/c33bd226d924c0e6c81af6810cc1f723_cleanup_upscayl_3x_realesrgan-x4plus-anime_1752871326667.png";

export default function Ranking() {
  const { user, logout } = useAuth();

  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/ranking/public"],
    queryFn: async () => {
      const res = await fetch("/api/ranking/public", {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch ranking");
      return res.json();
    },
  });

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      window.location.href = "/";
    }
  };

  const getRankColor = (rank: number) => {
    return "text-red-400"; // Unified color for all player ranks
  };

  const getRankBadgeStyle = (rank: number) => {
    return "bg-gradient-to-r from-red-500 to-red-600 border-red-400"; // Unified style for all player ranks
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="inline-block p-4 blue-lock-gradient rounded-2xl mb-4 animate-glow">
            <i className="fas fa-trophy text-4xl text-white"></i>
          </div>
          <h1 className="font-bebas text-2xl font-bold text-red-500 tracking-wider">CARREGANDO RANKING...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b-2 border-red-600 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-lg flex items-center justify-center animate-menacing-glow shadow-lg shadow-red-500/50">
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-white">
                  <rect x="4" y="4" width="24" height="24" fill="url(#charNavGradient)" rx="3" stroke="#7f1d1d" strokeWidth="1"/>
                  <defs>
                    <linearGradient id="charNavGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
              <Link href="/ranking">
                <button className="text-red-400 font-oswald font-semibold transition-colors tracking-wide">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="inline mr-2" fill="currentColor">
                    <path d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4L8 1z"/>
                  </svg>RANKING EXPURGO
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
              <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 font-rajdhani font-semibold">
                <i className="fas fa-sign-out-alt mr-2"></i>Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Ranking Content */}
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 rounded-lg blur-sm opacity-75"></div>
              <div className="relative bg-black px-8 py-4 rounded-lg border-2 border-red-600">
                <h2 className="font-bebas text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-yellow-400 to-red-400 tracking-wider text-center">
                  RANKING EXPURGO
                </h2>
              </div>
            </div>
          </div>
          <p className="text-gray-400 font-oswald tracking-wide text-center text-lg">
            Hierarquia dos sobreviventes mais temidos do projeto. Apenas os mais fortes permanecem no topo.
          </p>
        </motion.div>

        {/* Ranking Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
            <CardContent className="p-0">
              {/* Header inspired by Blue Lock ranking */}
              <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 p-6 border-b-2 border-red-600">
                <div className="flex items-center justify-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center border-4 border-yellow-300 shadow-lg shadow-yellow-500/50">
                    <i className="fas fa-trophy text-2xl text-black"></i>
                  </div>
                  <div className="text-center">
                    <h3 className="font-bebas text-3xl font-bold text-yellow-400 tracking-wider mb-1">
                      HIERARQUIA EXPURGO
                    </h3>
                    <p className="text-gray-300 font-oswald text-sm tracking-wide">
                      Sistema de Classificação dos Sobreviventes
                    </p>
                  </div>
                </div>
              </div>

              {/* Ranking List */}
              <div className="p-6">
                {users && users.length > 0 ? (
                  <div className="space-y-3">
                    {users.map((user: any, index: number) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg border border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20"
                      >
                        <div className="flex items-center space-x-4">
                          {/* Rank Badge */}
                          <div className={`relative w-16 h-16 rounded-full border-2 ${getRankBadgeStyle(user.character.ranking)} flex items-center justify-center shadow-lg`}>
                            <div className="text-center">
                              <div className="text-white font-bebas text-lg font-bold leading-none">
                                #{user.character.ranking}
                              </div>
                            </div>

                          </div>

                          {/* Character Info */}
                          <div className="flex items-center space-x-4">
                            <img 
                              src={user.character.avatar || defaultAvatar}
                              alt={`Avatar de ${user.character.name}`}
                              className="w-16 h-16 rounded-full border-2 border-red-500 object-cover shadow-lg"
                            />
                            <div>
                              <h4 className="font-bebas text-xl text-white font-bold tracking-wide">
                                {user.character.name}
                              </h4>
                              <div className="flex items-center space-x-3 text-sm">
                                <span className="text-gray-400 font-oswald">
                                  {user.username}
                                </span>
                                <span className="text-red-400 font-oswald font-semibold">
                                  {user.character.classe || "SEM CLASSE"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Character Stats */}
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <div className="text-green-400 font-bebas text-lg font-bold">
                              {user.character.level}
                            </div>
                            <div className="text-gray-400 font-oswald text-xs">
                              NÍVEL
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-blue-400 font-bebas text-lg font-bold">
                              {user.character.goals}
                            </div>
                            <div className="text-gray-400 font-oswald text-xs">
                              GOLS
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-purple-400 font-bebas text-lg font-bold">
                              {user.character.matches}
                            </div>
                            <div className="text-gray-400 font-oswald text-xs">
                              PARTIDAS
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-800 flex items-center justify-center">
                      <i className="fas fa-users text-3xl text-gray-600"></i>
                    </div>
                    <h3 className="font-bebas text-2xl text-gray-400 mb-2">NENHUM SOBREVIVENTE ENCONTRADO</h3>
                    <p className="text-gray-500 font-oswald">
                      O ranking será preenchido conforme novos sobreviventes se registrarem no projeto.
                    </p>
                  </div>
                )}
              </div>

              {/* Footer Info */}
              <div className="bg-gray-800 px-6 py-4 border-t border-gray-700">
                <div className="flex items-center justify-center">
                  <div className="text-gray-500 font-oswald text-sm text-center">
                    Rankings são atribuídos automaticamente e gerenciados pelo sistema
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
// Filter only users with characters and remove passwords
      const usersWithCharacters = users
        .filter(user => user.character)
        .map(({ password, ...user }) => user)
        .sort((a, b) => (a.character?.ranking || 300) - (b.character?.ranking || 300));
