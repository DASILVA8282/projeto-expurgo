import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import StatSlider from "@/components/ui/stat-slider";
import type { Character, UpdateCharacter } from "@shared/schema";

export default function Character() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: character, isLoading } = useQuery({
    queryKey: ["/api/characters/me"],
    retry: false,
  });

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    age: "",
    height: "",
    bio: "",
    weapon: "",
    speed: 50,
    strength: 50,
    stamina: 50,
    shooting: 50,
    passing: 50,
    dribbling: 50,
    flowColor: "cyan",
    flowPhrase: "É hora de dominar o campo!",
  });

  useEffect(() => {
    if (character) {
      setFormData({
        name: character.name || "",
        position: character.position || "",
        age: character.age?.toString() || "",
        height: character.height || "",
        bio: character.bio || "",
        weapon: character.weapon || "",
        speed: character.speed,
        strength: character.strength,
        stamina: character.stamina,
        shooting: character.shooting,
        passing: character.passing,
        dribbling: character.dribbling,
        flowColor: character.flowColor || "cyan",
        flowPhrase: character.flowPhrase || "É hora de dominar o campo!",
      });
    }
  }, [character]);

  const createCharacterMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/characters", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/characters/me"] });
      toast({
        title: "Personagem criado com sucesso!",
        description: "Sua ficha foi salva no sistema.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao criar personagem",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const updateCharacterMutation = useMutation({
    mutationFn: async (data: UpdateCharacter) => {
      const response = await apiRequest("PUT", "/api/characters", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/characters/me"] });
      toast({
        title: "Personagem atualizado com sucesso!",
        description: "Suas alterações foram salvas.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao atualizar personagem",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      position: value,
    });
  };

  const handleFlowColorChange = (value: string) => {
    setFormData({
      ...formData,
      flowColor: value,
    });
  };

  const getFlowPreviewColor = (color: string) => {
    const colorMap = {
      cyan: "#22d3ee",
      purple: "#a855f7",
      red: "#ef4444",
      blue: "#3b82f6",
      green: "#10b981",
      yellow: "#f59e0b",
      orange: "#f97316",
      pink: "#ec4899"
    };
    return colorMap[color as keyof typeof colorMap] || "#22d3ee";
  };

  const handleStatChange = (stat: string, value: number) => {
    setFormData({
      ...formData,
      [stat]: value,
    });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.position) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e posição do personagem",
        variant: "destructive",
      });
      return;
    }

    const characterData = {
      name: formData.name,
      position: formData.position,
      age: formData.age ? parseInt(formData.age) : null,
      height: formData.height,
      bio: formData.bio,
      weapon: formData.weapon,
      speed: formData.speed,
      strength: formData.strength,
      stamina: formData.stamina,
      shooting: formData.shooting,
      passing: formData.passing,
      dribbling: formData.dribbling,
    };

    if (character) {
      updateCharacterMutation.mutate(characterData);
    } else {
      createCharacterMutation.mutate(characterData);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
      // Force logout even if server request fails
      window.location.href = "/";
    }
  };

  const totalStats = formData.speed + formData.strength + formData.stamina + 
                    formData.shooting + formData.passing + formData.dribbling;
  const remainingPoints = Math.max(0, 600 - totalStats);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="inline-block p-4 blue-lock-gradient rounded-2xl mb-4 animate-glow">
            <i className="fas fa-futbol text-4xl text-white"></i>
          </div>
          <h1 className="font-orbitron text-2xl font-bold text-blue-500">Carregando...</h1>
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
                <button className="text-blue-400 font-rajdhani font-semibold transition-colors">
                  <i className="fas fa-user-edit mr-2"></i>Meu Personagem
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
              <Button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 font-rajdhani font-semibold">
                <i className="fas fa-sign-out-alt mr-2"></i>Sair
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Character Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-orbitron text-3xl font-bold text-blue-400 mb-2">MEU PERSONAGEM</h2>
          <p className="text-slate-400 font-rajdhani">Configure e edite sua ficha de personagem</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Character Basic Info */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900 border-2 border-blue-600 hud-corner">
              <CardContent className="p-6">
                <h3 className="font-orbitron text-xl font-bold text-blue-400 mb-4">INFORMAÇÕES BÁSICAS</h3>

                {/* Character Avatar */}
                <div className="text-center mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300" 
                    alt="Avatar do personagem" 
                    className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700 font-rajdhani font-semibold">
                    <i className="fas fa-camera mr-2"></i>Alterar Foto
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="block text-slate-300 font-rajdhani font-semibold mb-2">
                      NOME DO PERSONAGEM
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border-2 border-slate-700 focus:border-blue-500 text-white"
                      placeholder="Nome do seu jogador"
                    />
                  </div>

                  <div>
                    <Label className="block text-slate-300 font-rajdhani font-semibold mb-2">
                      POSIÇÃO
                    </Label>
                    <Select value={formData.position} onValueChange={handleSelectChange}>
                      <SelectTrigger className="w-full bg-slate-800 border-2 border-slate-700 focus:border-blue-500 text-white">
                        <SelectValue placeholder="Selecione a posição" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="atacante">Atacante</SelectItem>
                        <SelectItem value="meio-campo">Meio-Campo</SelectItem>
                        <SelectItem value="defensor">Defensor</SelectItem>
                        <SelectItem value="goleiro">Goleiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-slate-300 font-rajdhani font-semibold mb-2">
                      IDADE
                    </Label>
                    <Input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border-2 border-slate-700 focus:border-blue-500 text-white"
                      placeholder="Idade"
                      min="16"
                      max="25"
                    />
                  </div>

                  <div>
                    <Label className="block text-slate-300 font-rajdhani font-semibold mb-2">
                      ALTURA
                    </Label>
                    <Input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border-2 border-slate-700 focus:border-blue-500 text-white"
                      placeholder="Ex: 1.75m"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Character Stats */}
          <div className="lg:col-span-2">
            <Card className="bg-slate-900 border-2 border-blue-600 hud-corner">
              <CardContent className="p-6">
                <h3 className="font-orbitron text-xl font-bold text-blue-400 mb-6">ATRIBUTOS</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Physical Stats */}
                  <div>
                    <h4 className="font-rajdhani text-lg font-bold text-blue-300 mb-4">FÍSICOS</h4>
                    <div className="space-y-4">
                      <StatSlider
                        label="VELOCIDADE"
                        value={formData.speed}
                        onChange={(value) => handleStatChange("speed", value)}
                        color="blue"
                      />
                      <StatSlider
                        label="FORÇA"
                        value={formData.strength}
                        onChange={(value) => handleStatChange("strength", value)}
                        color="green"
                      />
                      <StatSlider
                        label="RESISTÊNCIA"
                        value={formData.stamina}
                        onChange={(value) => handleStatChange("stamina", value)}
                        color="yellow"
                      />
                    </div>
                  </div>

                  {/* Technical Stats */}
                  <div>
                    <h4 className="font-rajdhani text-lg font-bold text-blue-300 mb-4">TÉCNICOS</h4>
                    <div className="space-y-4">
                      <StatSlider
                        label="CHUTE"
                        value={formData.shooting}
                        onChange={(value) => handleStatChange("shooting", value)}
                        color="red"
                      />
                      <StatSlider
                        label="PASSE"
                        value={formData.passing}
                        onChange={(value) => handleStatChange("passing", value)}
                        color="purple"
                      />
                      <StatSlider
                        label="DRIBLE"
                        value={formData.dribbling}
                        onChange={(value) => handleStatChange("dribbling", value)}
                        color="cyan"
                      />
                    </div>
                  </div>
                </div>

                {/* Points Remaining */}
                <div className="mt-6 p-4 bg-slate-800 rounded-lg border-2 border-yellow-500">
                  <div className="flex justify-between items-center">
                    <span className="font-rajdhani font-bold text-yellow-400">PONTOS RESTANTES:</span>
                    <span className="font-orbitron text-2xl font-bold text-yellow-400">{remainingPoints}</span>
                  </div>
                </div>

                {/* Save Button */}
                <div className="mt-6">
                  <Button 
                    onClick={handleSave}
                    className="w-full blue-lock-gradient hover:opacity-90 text-white font-orbitron font-bold py-3"
                    disabled={createCharacterMutation.isPending || updateCharacterMutation.isPending}
                  >
                    <i className="fas fa-save mr-2"></i>
                    {createCharacterMutation.isPending || updateCharacterMutation.isPending ? "SALVANDO..." : "SALVAR PERSONAGEM"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character Bio */}
            <Card className="bg-slate-900 border-2 border-blue-600 hud-corner mt-6">
              <CardContent className="p-6">
                <h3 className="font-orbitron text-xl font-bold text-blue-400 mb-4">BIOGRAFIA</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-slate-300 font-rajdhani font-semibold mb-2">
                      HISTÓRIA PESSOAL
                    </Label>
                    <Textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border-2 border-slate-700 focus:border-blue-500 text-white h-32"
                      placeholder="Conte a história do seu personagem..."
                    />
                  </div>

                  <div>
                    <Label className="block text-slate-300 font-rajdhani font-semibold mb-2">
                      WEAPON (HABILIDADE ESPECIAL)
                    </Label>
                    <Input
                      type="text"
                      name="weapon"
                      value={formData.weapon}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border-2 border-slate-700 focus:border-blue-500 text-white"
                      placeholder="Ex: Chute Certeiro, Drible Fantasma..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Flow State Configuration */}
            <Card className="bg-slate-900 border-2 border-purple-600 hud-corner mt-6">
              <CardContent className="p-6">
                <h3 className="font-orbitron text-xl font-bold text-purple-400 mb-4">
                  <i className="fas fa-bolt mr-2"></i>
                  CONFIGURAÇÃO DO FLOW STATE
                </h3>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-slate-300 font-rajdhani font-semibold mb-2">
                      COR DO FLOW STATE
                    </Label>
                    <Select value={formData.flowColor} onValueChange={handleFlowColorChange}>
                      <SelectTrigger className="w-full bg-slate-800 border-2 border-slate-700 focus:border-purple-500 text-white">
                        <SelectValue placeholder="Selecione a cor do seu Flow State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cyan">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
                            <span>Cyan - Velocidade</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="purple">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-purple-400"></div>
                            <span>Purple - Controle</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="red">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-red-400"></div>
                            <span>Red - Força</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="blue">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                            <span>Blue - Precisão</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="green">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-green-400"></div>
                            <span>Green - Resistência</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="yellow">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                            <span>Yellow - Agilidade</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="orange">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-orange-400"></div>
                            <span>Orange - Explosão</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="pink">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full bg-pink-400"></div>
                            <span>Pink - Criatividade</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-slate-300 font-rajdhani font-semibold mb-2">
                      FRASE DE ATIVAÇÃO
                    </Label>
                    <Input
                      type="text"
                      name="flowPhrase"
                      value={formData.flowPhrase}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border-2 border-slate-700 focus:border-purple-500 text-white"
                      placeholder="Ex: É hora de dominar o campo!"
                      maxLength={255}
                    />
                    <p className="text-slate-500 text-sm mt-1 font-rajdhani">
                      Esta frase aparecerá durante a ativação do seu Flow State
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="mt-6 p-4 bg-slate-800 rounded-lg border-2 border-purple-500">
                    <h4 className="font-rajdhani font-bold text-purple-400 mb-2">PREVIEW DO FLOW STATE</h4>
                    <div className="text-center p-6 bg-black rounded-lg relative overflow-hidden">
                      {/* Background effect */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: `radial-gradient(circle, ${getFlowPreviewColor(formData.flowColor)} 0%, transparent 70%)`
                        }}
                      />
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div 
                          className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                          style={{
                            background: `linear-gradient(45deg, ${getFlowPreviewColor(formData.flowColor)}, ${getFlowPreviewColor(formData.flowColor)}80)`,
                            boxShadow: `0 0 20px ${getFlowPreviewColor(formData.flowColor)}`
                          }}
                        >
                          <i className="fas fa-bolt text-white text-xl"></i>
                        </div>
                        <h3 
                          className="text-2xl font-bold font-orbitron mb-2"
                          style={{
                            color: getFlowPreviewColor(formData.flowColor),
                            textShadow: `0 0 10px ${getFlowPreviewColor(formData.flowColor)}`
                          }}
                        >
                          {formData.name || "SEU PERSONAGEM"}
                        </h3>
                        <p 
                          className="text-lg font-rajdhani font-bold text-white mb-2"
                          style={{
                            textShadow: `0 0 8px ${getFlowPreviewColor(formData.flowColor)}`
                          }}
                        >
                          "{formData.flowPhrase}"
                        </p>
                        <p className="text-sm text-gray-300 font-rajdhani">FLOW STATE ACTIVATED</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
