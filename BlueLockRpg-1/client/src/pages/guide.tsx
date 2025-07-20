import { motion } from "framer-motion";
import { Book, Zap, Brain, Users, Target } from "lucide-react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Guide() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b-2 border-red-600 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 predator-claws rounded-lg flex items-center justify-center animate-menacing-glow">
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-white">
                  {/* Logo predador frontal - versão guide */}
                  <rect x="4" y="4" width="24" height="24" fill="url(#guideNavGradient)" rx="3" stroke="#7f1d1d" strokeWidth="1"/>
                  <defs>
                    <linearGradient id="guideNavGradient" x1="0%" y1="0%" x2="100%" y2="100%">
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
                <button className="text-red-400 font-oswald font-semibold transition-colors tracking-wide">
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

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-bebas text-5xl font-bold text-red-500 tracking-wider mb-2">MANUAL DO PREDADOR</h1>
          <p className="font-oswald text-xl text-gray-300">Guia completo do sistema de atributos e perícias</p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Atributos Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-700/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-8 h-8 text-red-400" />
              <h2 className="font-bebas text-3xl text-red-400 tracking-wide">ATRIBUTOS</h2>
            </div>
            
            <p className="text-gray-300 mb-6 font-oswald text-lg">
              Definem o limite das capacidades do seu personagem.<br/>
              <span className="text-red-400 font-bold">Você começa com 18 pontos para distribuir entre 5 Atributos (máximo 10 por atributo).</span><br/>
              <span className="text-amber-400 font-bold">Sistema de Perícias: Escolha 8 perícias iniciais que começarão no nível CLASSE I.</span>
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-red-400" />
                  <h3 className="font-bebas text-xl text-red-400">FÍSICO</h3>
                </div>
                <p className="text-gray-300 font-oswald">Força bruta e resistência.</p>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-red-400" />
                  <h3 className="font-bebas text-xl text-red-400">VELOCIDADE</h3>
                </div>
                <p className="text-gray-300 font-oswald">Reflexos, agilidade e resposta rápida.</p>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-red-400" />
                  <h3 className="font-bebas text-xl text-red-400">INTELECTO</h3>
                </div>
                <p className="text-gray-300 font-oswald">Estratégia, leitura de jogo e tomada de decisão.</p>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-red-400" />
                  <h3 className="font-bebas text-xl text-red-400">CARISMA</h3>
                </div>
                <p className="text-gray-300 font-oswald">Como lida com a fama, fãs e relações fora de campo.</p>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-4 md:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-red-400" />
                  <h3 className="font-bebas text-xl text-red-400">EGOÍSMO</h3>
                </div>
                <p className="text-gray-300 font-oswald">Sua ambição individual — a fome de ser o número 1.</p>
              </div>
            </div>
          </motion.section>

          {/* Origins Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-700/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Book className="w-8 h-8 text-amber-400" />
              <h2 className="font-bebas text-3xl text-amber-400 tracking-wide">ORIGENS DO SOBREVIVENTE</h2>
            </div>
            
            <p className="text-gray-300 mb-6 font-oswald text-lg">
              Cada sobrevivente tem uma origem que define sua personalidade e habilidades especiais.<br/>
              <span className="text-amber-400 font-bold">Escolha uma origem na criação do personagem para receber bônus únicos em atributos e habilidades especiais.</span>
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🌟</span>
                  <h3 className="font-bebas text-lg text-amber-400">PRODÍGIO</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Genial desde pequeno; nasceu pro futebol.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 INT</span><br/>
                  <span className="text-amber-200">3 Perícias começam 1 Classe acima</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🎓</span>
                  <h3 className="font-bebas text-lg text-amber-400">JOGADOR ESTUDANTIL</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Vem do cenário escolar competitivo.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 VEL</span><br/>
                  <span className="text-amber-200">Começa com 2 Movimentos</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💰</span>
                  <h3 className="font-bebas text-lg text-amber-400">HERDEIRO</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Riquíssimo. Sempre teve tudo do bom e do melhor.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 CAR</span><br/>
                  <span className="text-amber-200">+4 de bônus dividível entre aliados</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🥀</span>
                  <h3 className="font-bebas text-lg text-amber-400">MISERÁVEL</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Cresceu na miséria; futebol virou fuga ou revelação.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 FÍS</span><br/>
                  <span className="text-amber-200">Determinação é Especialidade</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🏅</span>
                  <h3 className="font-bebas text-lg text-amber-400">FAMÍLIA ESPORTISTA</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Pais atletas. Pressionado desde cedo a brilhar.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 EGO</span><br/>
                  <span className="text-amber-200">Ganha 1 Habilidade Geral extra</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🕊️</span>
                  <h3 className="font-bebas text-lg text-amber-400">INCOMPREENDIDO</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Sempre solitário; futebol era o único amigo.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 EGO</span><br/>
                  <span className="text-amber-200">Ação Química com quem entende</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">⚽</span>
                  <h3 className="font-bebas text-lg text-amber-400">JOGADOR DE BASE</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Jogava em base regional antes do Blue Lock.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 VEL</span><br/>
                  <span className="text-amber-200">Subclasse principal +1 nível</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">😴</span>
                  <h3 className="font-bebas text-lg text-amber-400">PREGUIÇOSO</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Preguiçoso, desmotivado — energia desperta no futebol.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 INT</span><br/>
                  <span className="text-amber-200">3x por partida, +1 nível em arma</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💔</span>
                  <h3 className="font-bebas text-lg text-amber-400">FRACASSADO</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Ignorado, desacreditado — o Blue Lock é sua chance.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 EGO</span><br/>
                  <span className="text-amber-200">Ganha Arma "Força de Vontade"</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🌲</span>
                  <h3 className="font-bebas text-lg text-amber-400">BICHO DO MATO</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Cresceu longe da sociedade, guiado por instinto.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 FÍS</span><br/>
                  <span className="text-amber-200">Intuição é Especialidade</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🧘</span>
                  <h3 className="font-bebas text-lg text-amber-400">MONGE</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Vem de vida religiosa, busca no futebol sua libertação.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 INT</span><br/>
                  <span className="text-amber-200">Resistência contra penalidades</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🩻</span>
                  <h3 className="font-bebas text-lg text-amber-400">ARRUINADO</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Teve o sonho interrompido; Blue Lock é a segunda chance.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 EGO</span><br/>
                  <span className="text-amber-200">Ao falhar, recebe +1 na perícia</span>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💪</span>
                  <h3 className="font-bebas text-lg text-amber-400">ESFORÇADO</h3>
                </div>
                <p className="text-xs text-gray-300 mb-2">Sem talento, venceu na raça. Treino puro e dedicação.</p>
                <div className="text-xs bg-amber-900/30 border border-amber-700/30 rounded p-2">
                  <span className="text-amber-300 font-semibold">+3 FÍS</span><br/>
                  <span className="text-amber-200">Ganho de atributos +2 extras</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Perícias Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-700/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-red-400" />
              <h2 className="font-bebas text-3xl text-red-400 tracking-wide">PERÍCIAS</h2>
            </div>
            
            <p className="text-gray-300 mb-6 font-oswald text-lg">
              Sistema de Classes (I-X) com 23 perícias diferentes organizadas em categorias.<br/>
              <span className="text-red-400 font-bold">Na criação do personagem, escolha 8 perícias que começarão no nível CLASSE I (1d20+2).</span><br/>
              <span className="text-amber-400">Perícias Principais</span> | 
              <span className="text-amber-400"> Perícias Livres</span> | 
              <span className="text-green-400"> Perícias de Reação</span>
            </p>

            {/* Sistema de Classes */}
            <div className="mb-8 bg-gray-900/50 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bebas text-lg text-red-400 mb-4 text-center">SISTEMA DE CLASSES</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 text-sm">
                <div className="text-center p-2 bg-red-900/30 rounded">
                  <div className="font-bebas text-red-400">CLASSE I</div>
                  <div className="text-gray-300">1d20+2</div>
                </div>
                <div className="text-center p-2 bg-red-900/30 rounded">
                  <div className="font-bebas text-red-400">CLASSE II</div>
                  <div className="text-gray-300">1d20+4</div>
                </div>
                <div className="text-center p-2 bg-red-900/30 rounded">
                  <div className="font-bebas text-red-400">CLASSE III</div>
                  <div className="text-gray-300">2d20+6</div>
                </div>
                <div className="text-center p-2 bg-red-900/30 rounded">
                  <div className="font-bebas text-red-400">CLASSE IV</div>
                  <div className="text-gray-300">2d20+8</div>
                </div>
                <div className="text-center p-2 bg-red-900/30 rounded">
                  <div className="font-bebas text-red-400">CLASSE V</div>
                  <div className="text-gray-300">3d20+10</div>
                </div>
                <div className="text-center p-2 bg-red-900/30 rounded">
                  <div className="font-bebas text-red-400">CLASSE VI</div>
                  <div className="text-gray-300">3d20+12</div>
                </div>
                <div className="text-center p-2 bg-red-900/30 rounded">
                  <div className="font-bebas text-red-400">CLASSE VII</div>
                  <div className="text-gray-300">4d20+14</div>
                </div>
                <div className="text-center p-2 bg-red-900/30 rounded">
                  <div className="font-bebas text-red-400">CLASSE VIII</div>
                  <div className="text-gray-300">4d20+16</div>
                </div>
                <div className="text-center p-2 bg-red-900/30 rounded">
                  <div className="font-bebas text-red-400">CLASSE IX</div>
                  <div className="text-gray-300">5d20+18</div>
                </div>
                <div className="text-center p-2 bg-red-900/30 rounded">
                  <div className="font-bebas text-red-400">CLASSE X</div>
                  <div className="text-gray-300">5d20+20</div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🥅</span>
                  <h3 className="font-bebas text-2xl text-red-400">CHUTE (FÍS, VEL, EGO)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> finalizar gol.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Chute:</span> teste contra DP; goleiro reage com Defesa.</div>
                  <div><span className="text-red-400 font-bold">Blefar:</span> pode converter em passe; cada +10 no chute = +1 Passe; +20 puro = +1d Passe.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎯</span>
                  <h3 className="font-bebas text-2xl text-red-400">PRECISÃO (VEL)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> chutes certeiros (média/distância).
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Chute Distante:</span> além do alcance, paga 4 FOL + penalidades.</div>
                  <div><span className="text-red-400 font-bold">Gol Olímpico/Falta:</span> testes contra Defesa do goleiro.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🏴‍☠️</span>
                  <h3 className="font-bebas text-2xl text-red-400">ROUBO (FÍS, VEL, EGO)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> tirar a bola do oponente.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Roubo:</span> teste vs Domínio.</div>
                  <div><span className="text-red-400 font-bold">Reação:</span> se adversário passou perto com bola, Roubo vs Domínio (se já tinha a bola) ou vs Reação (se acabou de pegá-la).</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🧠</span>
                  <h3 className="font-bebas text-2xl text-red-400">ANÁLISE (INT)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> copiar ações, estudar campo.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Copiar:</span> DT = resultado original; gasta 3 INT; limite = Mod INT; não copia armas/Habs.</div>
                  <div><span className="text-red-400 font-bold">Estudo:</span> DT variável para insights táticos.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💪</span>
                  <h3 className="font-bebas text-2xl text-red-400">DETERMINAÇÃO (EGO)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> força mental.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Resistência:</span> resistir a efeitos/auras/status.</div>
                  <div><span className="text-red-400 font-bold">Ativação:</span> para ativar habilidades de força de vontade.</div>
                  <div><span className="text-red-400 font-bold">Anular Condição/Abalo:</span> DT ~30 para manter foco/podem anular condições.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🗺️</span>
                  <h3 className="font-bebas text-2xl text-red-400">ESTRATÉGIA (INT)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> tática e liderança.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Tática:</span> DT variável, define planos e dicas.</div>
                  <div><span className="text-red-400 font-bold">Intervalo:</span> 3+ aliados passam → recebem bônus.</div>
                  <div><span className="text-red-400 font-bold">Auxílio:</span> fora do jogo, uso para suporte narrativo.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🌟</span>
                  <h3 className="font-bebas text-2xl text-red-400">INTUIÇÃO (INT, EGO)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> instinto e fluxo.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Instintos:</span> DT 22/25/30 → mestre controla um turno; custa 2 EGO.</div>
                  <div><span className="text-red-400 font-bold">Intuição livre:</span> DT variável para soluções espontâneas.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🗣️</span>
                  <h3 className="font-bebas text-2xl text-red-400">INTERAÇÃO SOCIAL (CAR)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> comunicação, encanto, persuasão.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Comunicação:</span> diplomacia, lábia, fãs, entrevistas.</div>
                  <div><span className="text-red-400 font-bold">Comportamento:</span> postura, carisma.</div>
                  <div><span className="text-red-400 font-bold">Habilidades:</span> pode ser usado junto com outras DT sociais.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🗣️</span>
                  <h3 className="font-bebas text-2xl text-red-400">LÍNGUA ESTRANGEIRA (INT)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> comunicação idiomática.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Inglês:</span> +1 Interação Social formal.</div>
                  <div><span className="text-red-400 font-bold">Francês:</span> +1 charme.</div>
                  <div><span className="text-red-400 font-bold">Português:</span> +1 lábia.</div>
                  <div><span className="text-red-400 font-bold">Alemão:</span> +1 intimidação.</div>
                </div>
              </div>

              {/* Novas Perícias Principais */}
              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🏃</span>
                  <h3 className="font-bebas text-2xl text-red-400">CORRIDA (FÍS, VEL)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> aceleração, explosão, perseguição.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Aceleração:</span> teste contra opositor → diferença de 2 gera 3m de vantagem.</div>
                  <div><span className="text-red-400 font-bold">Explosão:</span> DT 22/24/28 → deslocamento extra de 5/10/15m + Mod VEL (+1 CA dobra base).</div>
                  <div><span className="text-red-400 font-bold">Disparada:</span> DT = 25 +1 por 10m de distância ao alvo.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">➰</span>
                  <h3 className="font-bebas text-2xl text-red-400">CRUZAMENTO (VEL)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> passe longo das laterais.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Cruzar (DT "Bom"):</span> receptor 31m → ele deve tirar "Bom"/"Medíocre"; interceptores testam &gt; teu cruzamento.</div>
                  <div><span className="text-red-400 font-bold">Escanteio/Tiro Livre:</span> teste padrão; chute pro gol usa Precisão; receptor +2 em Domínio.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🛡️</span>
                  <h3 className="font-bebas text-2xl text-red-400">DEFESA (FÍS, VEL, INT)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> agarrar ou defender chutes.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Agarrar:</span> teste de Defesa vs teste de Chute/Precisão.</div>
                  <div><span className="text-red-400 font-bold">Preparação:</span> pré-alerta até 50m → DT 20/24/28 concede +1d4/6/8 DP; ajuste por nível.</div>
                  <div><span className="text-red-400 font-bold">Proteção ao Gol (não-goleiro):</span> uso similar, mas com DP/2 – 2; bola vai para fora se dominares.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🌀</span>
                  <h3 className="font-bebas text-2xl text-red-400">DRIBLE (VEL, EGO)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> enganar adversários com a bola.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Driblar:</span> teste contra Reação; se vences, passa; contra goleiro, passa DP antes. Requer Especialidade.</div>
                  <div><span className="text-red-400 font-bold">Reação:</span> reação fora do teu turno → Drible vs Roubo.</div>
                  <div><span className="text-red-400 font-bold">Disputa:</span> com bola em disputa de Corrida → Drible vs Corrida.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎯</span>
                  <h3 className="font-bebas text-2xl text-red-400">PASSE (VEL, INT)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> passes simples, reações e alcance.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Tocar:</span> teste de Passe + receptor faz Domínio.</div>
                  <div><span className="text-red-400 font-bold">Reação:</span> 25m alcance, -2 no teste; adversário escolhe Roubo/Interceptação/Reação.</div>
                  <div><span className="text-red-400 font-bold">Distância:</span> &le;10m automático; 11–20m rasteiro (Interceptação necessária + carrinho), 21–30m alto (Interceptação ou Cabeceio). No meio, indefensável.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎭</span>
                  <h3 className="font-bebas text-2xl text-red-400">PERFORMANCE (CAR)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> expressividade e fama.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Em campo:</span> Ação Livre descrita → DT base 20 ± até ±6 → fama +6/penalidade conversão.</div>
                  <div><span className="text-red-400 font-bold">Social:</span> defile, postura, experiências de mídia.</div>
                </div>
              </div>

              <div className="bg-red-800/20 border border-red-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎉</span>
                  <h3 className="font-bebas text-2xl text-red-400">COMEMORAÇÃO (CAR)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-red-400 font-bold">Função:</span> interação pós-gol.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-red-400 font-bold">Gasta 3 FOL; escolhe entre:</span></div>
                  <div><span className="text-red-400 font-bold">Empolgação (DT 24):</span> conquista condição "Empolgado"; + incremental.</div>
                  <div><span className="text-red-400 font-bold">Gol Marcante (DT 25):</span> ganha 10 Fama +1 por ponto acima da DT.</div>
                  <div><span className="text-red-400 font-bold">Torcida (DT 26):</span> ativa Torcida; se já ativa, aumenta nível.</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Perícias Livres Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-700/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">💥</span>
              <h2 className="font-bebas text-3xl text-amber-400 tracking-wide">PERÍCIAS LIVRES</h2>
            </div>
            
            <p className="text-gray-300 mb-6 font-oswald text-lg">
              Perícias gerais que podem ser usadas em diversas situações.<br/>
              <span className="text-amber-400 font-bold">Flexibilidade total de aplicação durante as partidas.</span>
            </p>

            <div className="space-y-6">
              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💥</span>
                  <h3 className="font-bebas text-2xl text-amber-400">FORTITUDE (FÍS)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-amber-400 font-bold">Função:</span> resistência física ou pênalti físico.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-amber-400 font-bold">Intensificação de ações:</span> Fortitude vs Fortitude ou DT 25-Mod Físico; +Mod Físico; gasta 3 FOL.</div>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💥</span>
                  <h3 className="font-bebas text-2xl text-amber-400">FINTA (INT, VEL)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-amber-400 font-bold">Função:</span> enganação.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-amber-400 font-bold">Enganação:</span> Finta vs Reação → alvo -2 por 2 Classes em Finta.</div>
                  <div><span className="text-amber-400 font-bold">Confusão:</span> movimento furtivo sem bola para escapar ou iludir.</div>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💥</span>
                  <h3 className="font-bebas text-2xl text-amber-400">FURTIVIDADE (VEL)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-amber-400 font-bold">Função:</span> se esconder.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-amber-400 font-bold">Se esconder:</span> teste vs Percepção (até 15m); aliados também testam; movê-lo revela.</div>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💥</span>
                  <h3 className="font-bebas text-2xl text-amber-400">INICIATIVA (VEL)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-amber-400 font-bold">Função:</span> atitude.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-amber-400 font-bold">Atitude:</span> determina próximo turno após vácuo.</div>
                  <div><span className="text-amber-400 font-bold">Disputa:</span> define ordem em confrontos.</div>
                  <div><span className="text-amber-400 font-bold">Bola inicial:</span> disputa de posse no começo.</div>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💥</span>
                  <h3 className="font-bebas text-2xl text-amber-400">PERCEPÇÃO (INT, VEL)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-amber-400 font-bold">Função:</span> perceber.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-amber-400 font-bold">Perceber:</span> teste vs Furtividade.</div>
                  <div><span className="text-amber-400 font-bold">Observação:</span> DT variável; dá bônus ao suporte com Análise.</div>
                  <div><span className="text-amber-400 font-bold">Habilidades:</span> ativa habilidades relacionadas.</div>
                </div>
              </div>

              <div className="bg-amber-800/20 border border-amber-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">💥</span>
                  <h3 className="font-bebas text-2xl text-amber-400">SORTE</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-amber-400 font-bold">Função:</span> disputa de sorte.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-amber-400 font-bold">Disputa de Sorte:</span> 1d20 puro versus adversário.</div>
                  <div><span className="text-amber-400 font-bold">Apostar/Riscar:</span> teste solo; sucesso gera vantagem.</div>
                  <div><span className="text-amber-400 font-bold">Milagre:</span> situações especiais geram eventos favoráveis se passar.</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Perícias de Reação Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">⏱️</span>
              <h2 className="font-bebas text-3xl text-green-400 tracking-wide">PERÍCIAS DE REAÇÃO</h2>
            </div>
            
            <p className="text-gray-300 mb-6 font-oswald text-lg">
              Podem ser usadas fora do turno principal, ativadas por Ação de Reação.<br/>
              <span className="text-green-400 font-bold">Incluem Cabeceio, Domínio, Interceptação, Reação, e ocasionalmente outras (Corrida, Finta etc.).</span>
            </p>

            <div className="space-y-6">
              <div className="bg-green-800/20 border border-green-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🎯</span>
                  <h3 className="font-bebas text-2xl text-green-400">DOMÍNIO (FÍS, VEL, EGO)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-green-400 font-bold">Função:</span> receber passe.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-green-400 font-bold">Receber Passe:</span> DT "Bom" para controle preciso.</div>
                  <div><span className="text-green-400 font-bold">Manter Posse:</span> teste vs Roubo.</div>
                  <div><span className="text-green-400 font-bold">Segurar Bola (DT 26):</span> +2 no próximo Domínio; concede reação a aliados; avisa adversário remanescente.</div>
                </div>
              </div>

              <div className="bg-green-800/20 border border-green-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🧬</span>
                  <h3 className="font-bebas text-2xl text-green-400">CABECEIO (FÍS, VEL)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-green-400 font-bold">Função:</span> jogo de cabeça.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-green-400 font-bold">Ao Gol:</span> funciona como chute com metade do alcance; se arma de nível 3, alcance normal.</div>
                  <div><span className="text-green-400 font-bold">Interceptação:</span> pode substituir Interceptação em bola alta + Domínio custo.</div>
                  <div><span className="text-green-400 font-bold">Passe com Cabeça:</span> classe VII + gastar 5 FOL → passe irreversível; DT 27 Passe.</div>
                </div>
              </div>

              <div className="bg-green-800/20 border border-green-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">🛑</span>
                  <h3 className="font-bebas text-2xl text-green-400">INTERCEPTAÇÃO (VEL, EGO)</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-green-400 font-bold">Função:</span> interceptar.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-green-400 font-bold">Interceptar:</span> teste vs Passe/Chute/Cruzamento; tipos requerem classes elevadas.</div>
                  <div><span className="text-green-400 font-bold">Passe de Peito:</span> Classe VII + 5 FOL → DT 27; passe seguro (sem Interceptação/Roubo).</div>
                </div>
              </div>

              <div className="bg-green-800/20 border border-green-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">⏱️</span>
                  <h3 className="font-bebas text-2xl text-green-400">REAÇÃO</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-green-400 font-bold">Função:</span> reação fora do turno.
                </p>
                <div className="space-y-2 text-gray-300 font-oswald">
                  <div><span className="text-green-400 font-bold">Uso:</span> pode ser usada fora do turno principal, ativada por Ação de Reação junto com outras perícias.</div>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Classes e Subclasses Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-700/50 rounded-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Target className="w-8 h-8 text-purple-400" />
              <h2 className="font-bebas text-3xl text-purple-400 tracking-wide">CLASSES E SUBCLASSES</h2>
            </div>
            
            <p className="text-gray-300 mb-6 font-oswald text-lg">
              <span className="text-purple-400 font-bold">Classes definem o estilo de jogo e concedem 2 perícias automáticas:</span><br/>
              <span className="text-amber-400 font-bold">• 1 Perícia de Classe (especialidade principal)</span><br/>
              <span className="text-amber-400 font-bold">• 1 Perícia de Subclasse (habilidade especial)</span><br/>
              <span className="text-red-400 font-bold">Estas perícias são automáticas e não consomem suas 8 escolhas iniciais.</span>
            </p>

            <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* ATACANTE */}
              <div className="bg-purple-800/20 border border-purple-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">⚡</span>
                  <h3 className="font-bebas text-2xl text-purple-400">ATACANTE</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-purple-400 font-bold">Perícia de Classe:</span> Chute<br/>
                  <span className="text-purple-400 font-bold">Função:</span> Linha de frente. Foco em finalizações, movimentação ofensiva
                </p>
                
                <div className="space-y-4">
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🎯 FINALIZADOR</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Precisão
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Chutes certeiros de média/longa distância. Gols olímpicos e faltas.
                    </p>
                  </div>
                  
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🏃 VELOCISTA</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Corrida
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Contra-ataques rápidos. Explosão de velocidade para superar defensores.
                    </p>
                  </div>
                  
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🎪 DRIBLADOR</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Drible
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Superação individual. Jogadas técnicas para quebrar defesas compactas.
                    </p>
                  </div>
                </div>
              </div>

              {/* MEIO-CAMPO */}
              <div className="bg-purple-800/20 border border-purple-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🧠</span>
                  <h3 className="font-bebas text-2xl text-purple-400">MEIO-CAMPO</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-purple-400 font-bold">Perícia de Classe:</span> Passe<br/>
                  <span className="text-purple-400 font-bold">Função:</span> Centro do jogo. Distribuição, criação, controle de ritmo
                </p>
                
                <div className="space-y-4">
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🎯 ARMADOR</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Estratégia
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Visão de jogo superior. Criação de jogadas e assistências precisas.
                    </p>
                  </div>
                  
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🔄 VOLANTE</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Interceptação
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Recuperação de bola. Equilíbrio entre defesa e ataque.
                    </p>
                  </div>
                  
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🌊 REGISTA</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Intuição
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Leitura de jogo instintiva. Passes inspirados e timing perfeito.
                    </p>
                  </div>
                </div>
              </div>

              {/* DEFENSOR */}
              <div className="bg-purple-800/20 border border-purple-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🛡️</span>
                  <h3 className="font-bebas text-2xl text-purple-400">DEFENSOR</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-purple-400 font-bold">Perícia de Classe:</span> Defesa<br/>
                  <span className="text-purple-400 font-bold">Função:</span> Última linha. Proteção, desarme, jogo aéreo
                </p>
                
                <div className="space-y-4">
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🗿 ZAGUEIRO CENTRAL</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Cabeceio
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Domínio aéreo. Liderança defensiva e jogo de cabeça.
                    </p>
                  </div>
                  
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🏃 LATERAL</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Cruzamento
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Apoio ofensivo pelas laterais. Cruzamentos precisos e overlapping.
                    </p>
                  </div>
                  
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🏴‍☠️ MARCADOR</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Roubo
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Marcação agressiva. Desarmes precisos e pressão constante.
                    </p>
                  </div>
                </div>
              </div>

              {/* GOLEIRO */}
              <div className="bg-purple-800/20 border border-purple-700/30 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">🥅</span>
                  <h3 className="font-bebas text-2xl text-purple-400">GOLEIRO</h3>
                </div>
                <p className="text-gray-300 font-oswald text-lg mb-4">
                  <span className="text-purple-400 font-bold">Perícia de Classe:</span> Defesa<br/>
                  <span className="text-purple-400 font-bold">Função:</span> Guardião. Proteção do gol, distribuição, liderança
                </p>
                
                <div className="space-y-4">
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🦅 GOLEIRO CLÁSSICO</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Reação
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Reflexos excepcionais. Defesas impossíveis e timing perfeito.
                    </p>
                  </div>
                  
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">📡 GOLEIRO MODERNO</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Passe
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Distribuição precisa. Início de jogadas ofensivas com passes longos.
                    </p>
                  </div>
                  
                  <div className="bg-purple-700/20 rounded-lg p-4">
                    <h4 className="font-bebas text-lg text-purple-300 mb-2">🎯 GOLEIRO GOLEADOR</h4>
                    <p className="text-gray-300 font-oswald text-sm mb-2">
                      <span className="text-purple-400 font-bold">Perícia de Subclasse:</span> Chute
                    </p>
                    <p className="text-gray-300 font-oswald text-sm">
                      <span className="text-purple-400 font-bold">Especialidade:</span> Cobranças de falta e pênaltis. Participação ofensiva em momentos decisivos.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-purple-700/20 border border-purple-600/30 rounded-lg p-6">
              <h3 className="font-bebas text-xl text-purple-400 mb-4">COMO FUNCIONA O SISTEMA DE CLASSES</h3>
              <div className="space-y-3 text-gray-300 font-oswald">
                <div><span className="text-purple-400 font-bold">1. Seleção:</span> Escolha uma classe principal e uma subclasse durante a criação do personagem.</div>
                <div><span className="text-purple-400 font-bold">2. Perícias Automáticas:</span> Receba automaticamente 1 perícia de classe + 1 perícia de subclasse.</div>
                <div><span className="text-purple-400 font-bold">3. Perícias Livres:</span> Ainda escolha 8 perícias adicionais normalmente.</div>
                <div><span className="text-purple-400 font-bold">4. Especialização:</span> Sua classe define seu estilo de jogo e identidade no campo.</div>
                <div><span className="text-red-400 font-bold">Importante:</span> As perícias de classe/subclasse não contam no limite de 8 escolhas iniciais.</div>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </div>
  );
}