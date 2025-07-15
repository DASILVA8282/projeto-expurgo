import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Landing() {
  const { login, register, isLoginPending, isRegisterPending } = useAuth();
  const { toast } = useToast();
  const [isLoginMode, setIsLoginMode] = useState(true);
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
          description: "Bem-vindo ao Blue Lock RPG",
        });
      } else {
        await register({
          username: formData.username,
          password: formData.password,
        });
        toast({
          title: "Conta criada com sucesso!",
          description: "Bem-vindo ao Blue Lock RPG",
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

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1459865264687-595d652de67e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080" 
          alt="Estádio de futebol" 
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-blue-600/20 to-slate-950/90"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 blue-lock-gradient rounded-2xl mb-4 animate-glow">
              <i className="fas fa-futbol text-4xl text-white"></i>
            </div>
            <h1 className="font-orbitron text-4xl font-black text-blue-500 mb-2">BLUE LOCK</h1>
            <p className="font-rajdhani text-lg text-slate-400">SISTEMA DE RPG</p>
          </div>

          {/* Auth Form */}
          <div className="blue-lock-border rounded-xl">
            <Card className="bg-slate-900/95 backdrop-blur-sm rounded-xl hud-corner border-0">
              <CardContent className="p-8">
                <h2 className="font-orbitron text-2xl font-bold text-center mb-6 text-blue-400">
                  {isLoginMode ? "ENTRAR" : "REGISTRAR"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label className="block text-slate-300 font-rajdhani font-semibold mb-2">
                      USUÁRIO
                    </Label>
                    <Input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border-2 border-slate-700 focus:border-blue-500 text-white"
                      placeholder={isLoginMode ? "Digite seu usuário" : "Escolha um usuário"}
                      required
                    />
                  </div>



                  <div>
                    <Label className="block text-slate-300 font-rajdhani font-semibold mb-2">
                      SENHA
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border-2 border-slate-700 focus:border-blue-500 text-white"
                      placeholder={isLoginMode ? "Digite sua senha" : "Crie uma senha"}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full blue-lock-gradient hover:opacity-90 text-white font-orbitron font-bold py-3"
                    disabled={isLoginPending || isRegisterPending}
                  >
                    <i className={`fas ${isLoginMode ? 'fa-sign-in-alt' : 'fa-user-plus'} mr-2`}></i>
                    {isLoginMode ? 
                      (isLoginPending ? "ENTRANDO..." : "ENTRAR") : 
                      (isRegisterPending ? "REGISTRANDO..." : "REGISTRAR")
                    }
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsLoginMode(!isLoginMode)}
                    className="text-blue-400 hover:text-blue-300 font-rajdhani font-semibold transition-colors"
                  >
                    {isLoginMode ? (
                      <>Não tem conta? <span className="underline">Registre-se</span></>
                    ) : (
                      <>Já tem conta? <span className="underline">Faça login</span></>
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
