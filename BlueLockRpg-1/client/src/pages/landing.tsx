import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import InvitationEnvelope from "@/components/ui/InvitationEnvelope";

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
          <div className="text-center mb-8">
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
            <h1 className="font-bebas text-5xl font-black text-red-500 mb-2 tracking-wider transform -skew-x-6">PROJETO EXPURGO</h1>
            <p className="font-oswald text-lg text-amber-600 uppercase tracking-widest">SISTEMA DE EXTERMÍNIO</p>
          </div>

          {/* Auth Form */}
          <div className="expurgo-border rounded-lg">
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
                      placeholder={isLoginMode ? "Digite sua identificação" : "Escolha uma identificação"}
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
                      placeholder={isLoginMode ? "Digite seu código de acesso" : "Crie um código de acesso"}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full expurgo-gradient hover:opacity-90 text-white font-bebas font-bold py-3 text-lg tracking-widest transform hover:skew-x-1 transition-all duration-200"
                    disabled={isLoginPending || isRegisterPending}
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" className="mr-2" fill="currentColor">
                      <path d="M10 2L9 3L10 8L11 3L10 2Z"/>
                      <circle cx="10" cy="10" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      <path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="1.5"/>
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
                      <>Não foi recrutado? <span className="underline text-red-500">Inscreva-se no Expurgo</span></>
                    ) : (
                      <>Já faz parte? <span className="underline text-red-500">Acesse sua conta</span></>
                    )}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
