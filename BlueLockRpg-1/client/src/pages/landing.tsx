import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { InvitationEnvelope } from "@/components/InvitationEnvelope";

export default function Landing() {
  const { login, register, isLoginPending, isRegisterPending } = useAuth();
  const { toast } = useToast();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [showInvitation, setShowInvitation] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isLoginMode) {
        await login({
          username: formData.username,
          password: formData.password,
        });
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo ao Projeto Expurgo",
        });
      } else {
        await register({
          username: formData.username,
          password: formData.password,
        });
        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo ao Projeto Expurgo",
        });
      }
    } catch (error: any) {
      toast({
        title: "Erro",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleInvitationAccept = () => {
    setShowInvitation(false);
  };

  if (showInvitation) {
    return <InvitationEnvelope onAccept={handleInvitationAccept} />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Estádio de futebol" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-red-900/25 to-black/95"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <motion.div 
              className="inline-block mb-4 animate-menacing-glow"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-2xl">
                {/* Fundo quadrado frontal */}
                <rect x="10" y="10" width="60" height="60" fill="url(#predatorGradient)" rx="8" stroke="#7f1d1d" strokeWidth="3"/>
                
                {/* Definir gradiente predador */}
                <defs>
                  <linearGradient id="predatorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626"/>
                    <stop offset="30%" stopColor="#991b1b"/>
                    <stop offset="70%" stopColor="#7f1d1d"/>
                    <stop offset="100%" stopColor="#450a0a"/>
                  </linearGradient>
                  <filter id="innerGlow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Marcas de garra frontais - 5 riscos verticais predadores CENTRALIZADAS */}
                <g filter="url(#innerGlow)">
                  <path d="M22 20 L25 60" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.95"/>
                  <path d="M30 18 L33 62" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
                  <path d="M38 17 L41 63" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" fill="none"/>
                  <path d="M46 18 L49 62" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none"/>
                  <path d="M54 20 L57 60" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.95"/>
                </g>
                
                {/* Efeito de brilho nas bordas */}
                <rect x="10" y="10" width="60" height="60" fill="none" stroke="url(#glowGradient)" strokeWidth="1" rx="8"/>
                <defs>
                  <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8"/>
                    <stop offset="50%" stopColor="#dc2626" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-bebas text-5xl font-black text-red-500 mb-2 tracking-wider transform -skew-x-6"
            >
              PROJETO EXPURGO
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="font-oswald text-lg text-amber-600 uppercase tracking-widest"
            >
              SISTEMA DE EXTERMÍNIO
            </motion.p>
          </motion.div>

          {/* Auth Form */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="expurgo-border rounded-lg"
          >
            <Card className="bg-black/95 backdrop-blur-sm rounded-lg hud-corner border-0">
              <CardContent className="p-8">
                <h2 className="font-bebas text-3xl font-bold text-center mb-6 text-red-500 tracking-wider">
                  {isLoginMode ? "ENTRAR NO EXPURGO" : "JUNTAR-SE AO EXPURGO"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label className="block text-gray-300 font-oswald font-semibold mb-2 tracking-wide">
                      SOBREVIVENTE
                    </Label>
                    <Input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border-2 border-gray-700 focus:border-red-500 text-white font-mono"
                      placeholder={isLoginMode ? "Digite sua identificação" : "Escolha sua identificação"}
                      required
                    />
                  </div>



                  <div>
                    <Label className="block text-gray-300 font-oswald font-semibold mb-2 tracking-wide">
                      CÓDIGO DE ACESSO
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-gray-900 border-2 border-gray-700 focus:border-red-500 text-white font-mono"
                      placeholder={isLoginMode ? "Digite seu código de acesso" : "Crie seu código de acesso"}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-bebas font-bold py-4 text-xl tracking-widest transform hover:scale-105 transition-all duration-300 border-2 border-red-500 shadow-lg hover:shadow-red-500/50"
                    disabled={isLoginPending || isRegisterPending}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" className="mr-3" fill="currentColor">
                      <path d="M12 2L11 4L12 10L13 4L12 2Z"/>
                      <path d="M8 8L10 10M16 8L14 10"/>
                      <path d="M8 16L10 14M16 16L14 14"/>
                      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {isLoginMode ? 
                      (isLoginPending ? "ACESSANDO EXPURGO..." : "ENTRAR NO EXPURGO") : 
                      (isRegisterPending ? "INGRESSANDO..." : "JUNTAR-SE AO EXPURGO")
                    }
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="text-amber-500 hover:text-red-400 font-oswald font-semibold transition-colors tracking-wide"
                  >
                    {isLoginMode ? (
                      <>Não foi recrutado? <span className="underline text-red-500">Inscreva-se no Projeto Expurgo</span></>
                    ) : (
                      <>Já faz parte? <span className="underline text-red-500">Acesse sua conta</span></>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
