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

import CesarMonitor from "@/components/ui/CesarMonitor";
import { SkillsSystem } from "@/components/ui/skills-system";
import { CharacterOrigins } from "@/components/ui/character-origins";
import { ClassSystem } from "@/components/ui/class-system";
import { CharacterMotivations } from "@/components/ui/character-motivations";
import { WeaponSelection } from "@/components/ui/weapon-selection";
import { applyClassSkills, getGrantedSkills, getRemainingSkillChoices } from "@/utils/class-helpers";
import type { Character, UpdateCharacter } from "@shared/schema";
import defaultAvatar from "@assets/c33bd226d924c0e6c81af6810cc1f723_cleanup_upscayl_3x_realesrgan-x4plus-anime_1752871326667.png";

export default function Character() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: character, isLoading, error } = useQuery({
    queryKey: ["/api/characters/me"],
    queryFn: async () => {
      console.log("EXECUTANDO QUERY PARA BUSCAR PERSONAGEM...");
      try {
        const res = await fetch("/api/characters/me", {
          credentials: "include",
        });

        if (res.status === 401 || res.status === 403) {
          console.log("Usuário não autenticado - retornando null");
          return null;
        }

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();
        console.log("DADOS DO PERSONAGEM RECEBIDOS DA API:", data);
        return data;
      } catch (error) {
        console.error("Erro ao buscar personagem:", error);
        throw error;
      }
    },
    retry: false,
    enabled: !!user, // Só executa a query quando há usuário autenticado
  });

  console.log("Query status:", { character, isLoading, error, user: !!user });

  const [formData, setFormData({
        name: character.name || "",
        position: character.position || "Atacante",
        motivacao: character.motivacao || "",
        age: character.age?.toString() || "",
        height: character.height || "",
        bio: character.bio || "",
        weapon: character.weapon || "",
        origin: character.origin || "",
        classe: character.classe || "",
        subclasse: character.subclasse || "",
        fisico: character.fisico || 0,
        velocidade: character.velocidade || 0,
        intelecto: character.intelecto || 0,
        carisma: character.carisma || 0,
        egoismo: character.egoismo || 0,
        chute: character.chute || 0,
        precisao: character.precisao || 0,
        roubo: character.roubo || 0,
        analise: character.analise || 0,
        determinacao: character.determinacao || 0,
        estrategia: character.estrategia || 0,
        intuicao: character.intuicao || 0,
        interacao_social: character.interacao_social || 0,
        lingua_estrangeira: character.lingua_estrangeira || 0,
        corrida: character.corrida || 0,
        cruzamento: character.cruzamento || 0,
        defesa: character.defesa || 0,
        drible: character.drible || 0,
        passe: character.passe || 0,
        performance: character.performance || 0,
        comemoracao: character.comemoracao || 0,
        fortitude: character.fortitude || 0,
        finta: character.finta || 0,
        furtividade: character.furtividade || 0,
        iniciativa: character.iniciativa || 0,
        percepcao: character.percepcao || 0,
        sorte: character.sorte || 0,
        dominio: character.dominio || 0,
        cabeceio: character.cabeceio || 0,
        interceptacao: character.interceptacao || 0,
        reacao: character.reacao || 0,
        flowColor: character.flowColor || "cyan",
        flowPhrase: character.flowPhrase || "É hora de dominar o campo!",
        fama: character.fama || 0,
        adrenalina: character.adrenalina || 0,
        aura: character.aura || 0,
        furia: character.furia || 0,
      });
    }
  }, [character]);

  // Helper functions
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (statName: string, value: number) => {
    setFormData(prev => ({ ...prev, [statName]: value }));
  };

  const handleOriginSelect = (origin: string) => {
    setFormData(prev => ({ ...prev, origin }));
  };

  const handleMotivationChange = (motivacao: string) => {
    setFormData(prev => ({ ...prev, motivacao }));
  };

  const handleClassChange = (classe: string) => {
    setFormData(prev => ({ ...prev, classe, subclasse: "" }));
  };

  const handleSubclassChange = (subclasse: string) => {
    setFormData(prev => ({ ...prev, subclasse }));
  };

  const handleWeaponSelect = (weapon: string) => {
    setFormData(prev => ({ ...prev, weapon }));
  };

  const handleFlowColorChange = (flowColor: string) => {
    setFormData(prev => ({ ...prev, flowColor }));
  };

  const handleSkillChange = (skillName: string, value: number) => {
    setFormData(prev => ({ ...prev, [skillName]: value }));
  };

  // Origin bonuses mapping
  const originBonuses = {
    "prodigio": { intelecto: 3 },
    "jogador-estudantil": { velocidade: 3 },
    "herdeiro": { carisma: 3 },
    "miseravel": { fisico: 3 },
    "familia-esportista": { egoismo: 3 },
    "incompreendido": { egoismo: 3 },
    "jogador-de-base": { velocidade: 3 },
    "preguicoso": { intelecto: 3 },
    "fracassado": { egoismo: 3 },
    "bicho-do-mato": { fisico: 3 },
    "monge": { intelecto: 3 },
    "arruinado": { egoismo: 3 },
    "esforcado": { fisico: 3 }
  };

  // Get origin bonus for current selected origin
  const getOriginBonus = (attributeName: string) => {
    if (!formData.origin) return 0;
    const bonus = originBonuses[formData.origin as keyof typeof originBonuses];
    return bonus?.[attributeName as keyof typeof bonus] || 0;
  };

  // Calculate remaining attribute points
  const totalAttributes = formData.fisico + formData.velocidade + formData.intelecto + formData.carisma + formData.egoismo;
  const remainingAttributePoints = 15 - totalAttributes;

  // Helper function for flow color preview
  const getFlowPreviewColor = (color: string) => {
    const colors: { [key: string]: string } = {
      cyan: "#06b6d4",
      purple: "#a855f7",
      red: "#ef4444",
      blue: "#3b82f6",
      green: "#22c55e",
      yellow: "#eab308",
      orange: "#f97316",
      pink: "#ec4899",
    };
    return colors[color] || "#06b6d4";
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if user has a character first
    if (!character) {
      toast({
        title: "Crie seu personagem primeiro",
        description: "Você precisa salvar seu personagem antes de fazer upload do avatar.",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erro",
        description: "Por favor, selecione apenas arquivos de imagem (PNG, JPEG).",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Erro",
        description: "A imagem deve ter no máximo 5MB.",
        variant: "destructive",
      });
      return;
    }

    uploadAvatarMutation.mutate(file);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.motivacao) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome e motivação do personagem",
        variant: "destructive",
      });
      return;
    }

    // Garantir que todos os valores numéricos sejam preservados, incluindo 0
    const characterData = {
      name: formData.name,
      position: formData.position,
      motivacao: formData.motivacao,
      age: formData.age ? parseInt(formData.age) : null,
      height: formData.height,
      bio: formData.bio,
      weapon: formData.weapon,
      origin: formData.origin,
      classe: formData.classe,
      subclasse: formData.subclasse,
      // Garantir que valores 0 sejam preservados explicitamente
      fisico: Number(formData.fisico) || 0,
      velocidade: Number(formData.velocidade) || 0,
      intelecto: Number(formData.intelecto) || 0,
      carisma: Number(formData.carisma) || 0,
      egoismo: Number(formData.egoismo) || 0,
      // Perícias originais - preservar valores 0
      chute: Number(formData.chute) || 0,
      precisao: Number(formData.precisao) || 0,
      roubo: Number(formData.roubo) || 0,
      analise: Number(formData.analise) || 0,
      determinacao: Number(formData.determinacao) || 0,
      estrategia: Number(formData.estrategia) || 0,
      intuicao: Number(formData.intuicao) || 0,
      interacao_social: Number(formData.interacao_social) || 0,
      lingua_estrangeira: Number(formData.lingua_estrangeira) || 0,
      // Novas perícias - preservar valores 0
      corrida: Number(formData.corrida) || 0,
      cruzamento: Number(formData.cruzamento) || 0,
      defesa: Number(formData.defesa) || 0,
      drible: Number(formData.drible) || 0,
      passe: Number(formData.passe) || 0,
      performance: Number(formData.performance) || 0,
      comemoracao: formData.comemoracao || 0,
      // Perícias livres - preservar valores 0
      fortitude: Number(formData.fortitude) || 0,
      finta: Number(formData.finta) || 0,
      furtividade: Number(formData.furtividade) || 0,
      iniciativa: Number(formData.iniciativa) || 0,
      percepcao: Number(formData.percepcao) || 0,
      sorte: Number(formData.sorte) || 0,
      // Perícias de reação - preservar valores 0
      dominio: Number(formData.dominio) || 0,
      cabeceio: Number(formData.cabeceio) || 0,
      interceptacao: Number(formData.interceptacao) || 0,
      reacao: Number(formData.reacao) || 0,
      flowColor: formData.flowColor,
      flowPhrase: formData.flowPhrase,
      // New stats
      fama: Number(formData.fama) || 0,
      adrenalina: Number(formData.adrenalina) || 0,
      aura: Number(formData.aura) || 0,
      furia: Number(formData.furia) || 0,
      // NEVER include ranking in updates - it should remain fixed once set
    };

    console.log("SAVING CHARACTER DATA WITH EXPLICIT ZEROS:", characterData);

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

  // Duplicate removed - already declared above

  // Sistema de Classes: jogador escolhe 8 perícias iniciais que começam em Classe I
  const selectedSkillsCount = Object.values({
    chute: formData.chute, precisao: formData.precisao, roubo: formData.roubo,
    analise: formData.analise, determinacao: formData.determinacao, estrategia: formData.estrategia,
    intuicao: formData.intuicao, interacao_social: formData.interacao_social, lingua_estrangeira: formData.lingua_estrangeira,
    corrida: formData.corrida, cruzamento: formData.cruzamento, defesa: formData.defesa,
    drible: formData.drible, passe: formData.passe, performance: formData.performance, comemoracao: formData.comemoracao,
    fortitude: formData.fortitude, finta: formData.finta, furtividade: formData.furtividade,
    iniciativa: formData.iniciativa, percepcao: formData.percepcao, sorte: formData.sorte,
    dominio: formData.dominio, cabeceio: formData.cabeceio, interceptacao: formData.interceptacao, reacao: formData.reacao
  }).filter(value => value > 0).length;

  // Calculated stats
  const calculatedFolego = 10 + formData.fisico;
  const calculatedDeslocamento = 27 + formData.velocidade;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="inline-block p-4 blue-lock-gradient rounded-2xl mb-4 animate-glow">
            <i className="fas fa-futbol text-4xl text-white"></i>
          </div>
          <h1 className="font-bebas text-2xl font-bold text-red-500 tracking-wider">CARREGANDO...</h1>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="bg-gray-900 border-b-2 border-red-600 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-lg flex items-center justify-center animate-menacing-glow shadow-lg shadow-red-500/50">
                <svg width="32" height="32" viewBox="0 0 32 32" className="text-white">
                  {/* Logo predador frontal - versão navegação */}
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
                <button className="text-red-400 font-oswald font-semibold transition-colors tracking-wide">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="inline mr-2" fill="currentColor">
                    <path d="M8 8c1.5 0 3-1.5 3-3s-1.5-3-3-3-3 1.5-3 3 1.5 3 3 3zm0 1c-2 0-6 1-6 3v1h12v-1c0-2-4-3-6-3z"/>
                  </svg>MEU SOBREVIVENTE
                </button>
              </Link>
              <Link href="/ranking">
                <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-colors tracking-wide">
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

      {/* Character Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="font-bebas text-4xl font-bold text-red-500 mb-2 tracking-wider">MEU SOBREVIVENTE</h2>
          <p className="text-gray-400 font-oswald tracking-wide">Configure e edite sua ficha de sobrevivente.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Character Basic Info */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
              <CardContent className="p-6">
                <h3 className="font-bebas text-xl font-bold text-red-400 mb-4 tracking-wider">INFORMAÇÕES BÁSICAS</h3>

                {/* Character Avatar */}
                <div className="text-center mb-6">
                  <div className="relative">
                    <img 
                      src={(character as any)?.avatar || defaultAvatar}
                      alt="Avatar do personagem" 
                      className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-red-500 object-cover"
                    />
                    {uploadAvatarMutation.isPending && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarUpload}
                    className="hidden"
                    id="avatar-upload"
                  />
                  <Button 
                    onClick={() => document.getElementById('avatar-upload')?.click()}
                    className="bg-red-600 hover:bg-red-700 font-oswald font-semibold tracking-wide"
                    disabled={uploadAvatarMutation.isPending || !character}
                    title={!character ? "Crie seu personagem primeiro para fazer upload do avatar" : ""}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" className="mr-2" fill="currentColor">
                      <path d="M8 1L7 2L8 6L9 2L8 1Z"/>
                      <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {uploadAvatarMutation.isPending ? 'Enviando...' : character ? 'Alterar Foto' : 'Crie Personagem Primeiro'}
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="block text-gray-300 font-oswald font-semibold mb-2">
                      NOME DO SOBREVIVENTE
                    </Label>
                    <Input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white"
                      placeholder="Nome do seu sobrevivente"
                    />
                  </div>

                  <div>
                    <Label className="block text-gray-300 font-oswald font-semibold mb-2">
                      POSIÇÃO
                    </Label>
                    <Select value={formData.position} onValueChange={(value) => setFormData({...formData, position: value})}>
                      <SelectTrigger className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white">
                        <SelectValue placeholder="Selecione uma posição" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="Atacante" className="text-white">Atacante</SelectItem>
                        <SelectItem value="Meio-campo" className="text-white">Meio-campo</SelectItem>
                        <SelectItem value="Defensor" className="text-white">Defensor</SelectItem>
                        <SelectItem value="Goleiro" className="text-white">Goleiro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="block text-gray-300 font-oswald font-semibold mb-2">
                      IDADE
                    </Label>
                    <Input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white"
                      placeholder="Idade"
                      min="16"
                      max="25"
                    />
                  </div>

                  <div>
                    <Label className="block text-gray-300 font-oswald font-semibold mb-2">
                      ALTURA
                    </Label>
                    <Input
                      type="text"
                      name="height"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white"
                      placeholder="Ex: 1.75m"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Character Origins */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
              <CardContent className="p-6">
                <CharacterOrigins 
                  selectedOrigin={formData.origin}
                  onOriginSelect={handleOriginSelect}
                />
              </CardContent>
            </Card>
          </div>

          {/* Character Motivations */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
              <CardContent className="p-6">
                <CharacterMotivations 
                  selectedMotivation={formData.motivacao}
                  onMotivationChange={handleMotivationChange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Character Classes */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
              <CardContent className="p-6">
                <ClassSystem 
                  selectedClass={formData.classe}
                  selectedSubclass={formData.subclasse}
                  onClassChange={handleClassChange}
                  onSubclassChange={handleSubclassChange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Weapon Selection */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
              <CardContent className="p-6">
                <WeaponSelection 
                  selectedWeapon={formData.weapon}
                  onWeaponSelect={handleWeaponSelect}
                />
              </CardContent>
            </Card>
          </div>

          {/* Character Stats */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-900 border-2 border-red-600 hud-corner">
              <CardContent className="p-6">
                {/* Novo Sistema de Atributos */}
                <div className="mb-6">
                  <div className="space-y-6">
                    <div className="text-center mb-6">
                      <h3 className="font-bebas text-2xl text-red-400 tracking-wider mb-2">ATRIBUTOS</h3>
                      <p className="text-gray-300 font-oswald">
                        Definem o limite das capacidades do seu sobrevivente.<br/>
                        <span className="text-red-400 font-bold">Você tem {remainingAttributePoints} pontos restantes para distribuir (máximo de 10 por atributo).</span>
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {[
                        { name: "fisico", displayName: "FÍSICO", description: "Força bruta e resistência", value: formData.fisico },
                        { name: "velocidade", displayName: "VELOCIDADE", description: "Reflexos, agilidade e resposta rápida", value: formData.velocidade },
                        { name: "intelecto", displayName: "INTELECTO", description: "Estratégia, leitura de jogo e tomada de decisão", value: formData.intelecto },
                        { name: "carisma", displayName: "CARISMA", description: "Como lida com a fama, fãs e relações fora de campo", value: formData.carisma },
                        { name: "egoismo", displayName: "EGOÍSMO", description: "Sua ambição individual — a fome de ser o número 1", value: formData.egoismo }
                      ].map((attr) => {
                        const originBonus = getOriginBonus(attr.name);
                        const totalValue = attr.value + originBonus;

                        return (
                        <div key={attr.name} className="bg-red-800/20 border border-red-700/30 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="font-bebas text-lg text-red-400 tracking-wide">
                                {attr.displayName}
                              </h4>
                              <p className="text-gray-300 font-oswald text-sm">
                                {attr.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => attr.value > 0 && handleStatChange(attr.name, attr.value - 1)}
                                disabled={attr.value <= 0}
                                className="h-8 w-8 p-0 hover:bg-red-700/30 disabled:opacity-30"
                              >
                                -
                              </Button>

                              <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-1 min-w-[200px] justify-center flex-wrap">
                                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((dot) => (
                                    <div
                                      key={dot}
                                      className={`w-3 h-3 rounded-full border-2 ${
                                        dot <= attr.value
                                          ? "bg-red-500 border-red-500"
                                          : "border-red-700/50"
                                      }`}
                                    />
                                  ))}
                                </div>

                                {/* Origin Bonus Display */}
                                {originBonus > 0 && (
                                  <div className="flex items-center gap-1">
                                    <div className="text-xs text-yellow-400 font-oswald font-bold">
                                      +{originBonus} ORIGEM
                                    </div>
                                    <div className="flex gap-1">
                                      {Array.from({ length: originBonus }).map((_, i) => (
                                        <div
                                          key={i}
                                          className="w-2 h-2 rounded-full bg-yellow-400 border border-yellow-300"
                                        />
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>

                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => attr.value < 10 && remainingAttributePoints > 0 && handleStatChange(attr.name, attr.value + 1)}
                                disabled={attr.value >= 10 || remainingAttributePoints <= 0}
                                className="h-8 w-8 p-0 hover:bg-red-700/30 disabled:opacity-30"
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          <div className="text-center">
                            <span className="font-bebas text-xl text-red-400">
                              NÍVEL {totalValue}
                              {originBonus > 0 && (
                                <span className="text-sm text-yellow-400 ml-2">
                                  ({attr.value} + {originBonus})
                                </span>
                              )}
                            </span>
                          </div>
                        </div>
                      );
                      })}
                    </div>
                  </div>
                </div>

                {/* Total Stats Display */}
                <div className="mt-6 p-4 bg-gray-800 rounded-lg border-2 border-red-500">
                  <div className="flex justify-between items-center">
                    <span className="font-oswald font-bold text-red-400">ATRIBUTOS DISTRIBUÍDOS:</span>
                    <span className="font-bebas text-lg font-bold text-red-400">{totalAttributes}/15</span>
                  </div>
                  {remainingAttributePoints === 0 && (
                    <p className="text-gray-300 font-oswald text-sm mt-2 text-center">
                      ✓ Todos os pontos de atributos distribuídos
                    </p>
                  )}
                </div>

                {/* Granted Skills Info */}
                {formData.classe && (
                  <div className="mt-8 p-4 bg-red-950/30 border border-red-800 rounded-lg">
                    <h3 className="text-red-400 font-bebas text-lg mb-3">
                      PERÍCIAS CONCEDIDAS AUTOMATICAMENTE
                    </h3>
                    <div className="space-y-2">
                      {getGrantedSkills(formData.classe, formData.subclasse).map((skill) => (
                        <div key={skill} className="flex items-center text-green-400 font-oswald text-sm">
                          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {skill.charAt(0).toUpperCase() + skill.slice(1)} (Classe I)
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-400 font-oswald text-xs mt-3">
                      Essas perícias começam automaticamente em CLASSE I
                    </p>
                  </div>
                )}

                {/* New Character Stats Section */}
                <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Auto-calculated stats */}
                  <div className="space-y-4">
                    <h3 className="font-bebas text-xl text-red-400 tracking-wider">ESTATÍSTICAS CALCULADAS</h3>

                    <div className="bg-red-950/30 border border-red-800 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-oswald font-bold text-red-400">PONTOS DE FÔLEGO</h4>
                          <p className="text-gray-300 text-sm">10 base + Físico</p>
                        </div>
                        <span className="font-bebas text-2xl text-red-400">{calculatedFolego}</span>
                      </div>
                    </div>

                    <div className="bg-red-950/30 border border-red-800 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-oswald font-bold text-red-400">DESLOCAMENTO</h4>
                          <p className="text-gray-300 text-sm">27 base + Velocidade</p>
                        </div>
                        <span className="font-bebas text-2xl text-red-400">{calculatedDeslocamento}</span>
                      </div>
                    </div>
                  </div>

                  {/* Manual stats */}
                  <div className="space-y-4">
                    <h3 className="font-bebas text-xl text-red-400 tracking-wider">ESTATÍSTICAS VARIÁVEIS</h3>

                    <div className="space-y-3">
                      <div>
                        <Label className="block text-gray-300 font-oswald font-semibold mb-2">FAMA</Label>
                        <Input
                          type="number"
                          value={formData.fama}
                          onChange={(e) => setFormData({ ...formData, fama: parseInt(e.target.value) || 0 })}
                          className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white"
                          placeholder="0"
                          min="0"
                        />
                      </div>

                      <div>
                        <Label className="block text-gray-300 font-oswald font-semibold mb-2">ADRENALINA</Label>
                        <Input
                          type="number"
                          value={formData.adrenalina}
                          onChange={(e) => setFormData({ ...formData, adrenalina: parseInt(e.target.value) || 0 })}
                          className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white"
                          placeholder="0"
                          min="0"
                        />
                      </div>

                      <div>
                        <Label className="block text-gray-300 font-oswald font-semibold mb-2">AURA</Label>
                        <Input
                          type="number"
                          value={formData.aura}
                          onChange={(e) => setFormData({ ...formData, aura: parseInt(e.target.value) || 0 })}
                          className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white"
                          placeholder="0"
                          min="0"
                        />
                      </div>

                      <div>
                        <Label className="block text-gray-300 font-oswald font-semibold mb-2">FÚRIA</Label>
                        <Input
                          type="number"
                          value={formData.furia}
                          onChange={(e) => setFormData({ ...formData, furia: parseInt(e.target.value) || 0 })}
                          className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white"
                          placeholder="0"
                          min="0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Ranking - Display only */}
              <div className="text-center mt-6">
                <p className="text-gray-400 font-oswald text-sm mb-2">RANKING</p>
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full border-2 border-red-400">
                  <i className="fas fa-medal text-white"></i>
                  <span className="text-white font-bebas text-lg font-bold">
                    #{character?.ranking || "Não definido"}
                  </span>
                </div>
                <p className="text-gray-500 font-oswald text-xs mt-1">
                  Definido automaticamente pelo sistema
                </p>
              </div>

                {/* Skills Section */}
                <div className="mt-8">
                  <SkillsSystem 
                    skills={{
                      chute: formData.chute,
                      precisao: formData.precisao,
                      roubo: formData.roubo,
                      analise: formData.analise,
                      determinacao: formData.determinacao,
                      estrategia: formData.estrategia,
                      intuicao: formData.intuicao,
                      interacao_social: formData.interacao_social,
                      lingua_estrangeira: formData.lingua_estrangeira,
                      corrida: formData.corrida,
                      cruzamento: formData.cruzamento,
                      defesa: formData.defesa,
                      drible: formData.drible,
                      passe: formData.passe,
                      performance: formData.performance,
                      comemoracao: formData.comemoracao,
                      fortitude: formData.fortitude,
                      finta: formData.finta,
                      furtividade: formData.furtividade,
                      iniciativa: formData.iniciativa,
                      percepcao: formData.percepcao,
                      sorte: formData.sorte,
                      dominio: formData.dominio,
                      cabeceio: formData.cabeceio,
                      interceptacao: formData.interceptacao,
                      reacao: formData.reacao,
                    }}
                    onSkillChange={handleSkillChange}
                    grantedSkills={getGrantedSkills(formData.classe, formData.subclasse)}
                  />
                </div>

                {/* Save Button */}
                <div className="mt-6">
                  <Button 
                    onClick={handleSave}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bebas font-bold py-3 tracking-wider"
                    disabled={createCharacterMutation.isPending || updateCharacterMutation.isPending}
                  >
                    <i className="fas fa-save mr-2"></i>
                    {createCharacterMutation.isPending || updateCharacterMutation.isPending ? "SALVANDO..." : "SALVAR SOBREVIVENTE"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Character Bio */}
            <Card className="bg-gray-900 border-2 border-red-600 hud-corner mt-6">
              <CardContent className="p-6">
                <h3 className="font-bebas text-xl font-bold text-red-400 mb-4 tracking-wider">BIOGRAFIA</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-gray-300 font-oswald font-semibold mb-2">
                      HISTÓRIA PESSOAL
                    </Label>
                    <Textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white h-32"
                      placeholder="Conte a história do seu sobrevivente..."
                    />
                  </div>

                  <div>
                    <Label className="block text-gray-300 font-oswald font-semibold mb-2">
                      HABILIDADES ESPECIAIS
                    </Label>
                    <Textarea
                      name="weapon"
                      value={formData.weapon}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white h-24"
                      placeholder="Descreva as habilidades únicas do seu personagem, técnicas especiais, jogadas favoritas..."
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

    {/* César Monitor - appears for new character creation */}
    {showCesarMonitor && (
      <CesarMonitor onClose={() => setShowCesarMonitor(false)} />
    )}
    </>
  );
}

// Helper function to get origin attribute bonus
const getOriginAttributeBonus = (origin: string, attributeName: string) => {
  const originBonuses = {
    "prodigio": { intelecto: 3 },
    "jogador-estudantil": { velocidade: 3 },
    "herdeiro": { carisma: 3 },
    "miseravel": { fisico: 3 },
    "familia-esportista": { egoismo: 3 },
    "incompreendido": { egoismo: 3 },
    "jogador-de-base": { velocidade: 3 },
    "preguicoso": { intelecto: 3 },
    "fracassado": { egoismo: 3 },
    "bicho-do-mato": { fisico: 3 },
    "monge": { intelecto: 3 },
    "arruinado": { egoismo: 3 },
    "esforcado": { fisico: 3 }
  };
  const bonus = originBonuses[origin as keyof typeof originBonuses];
  return bonus?.[attributeName as keyof typeof bonus] || 0;
};

// Função para aplicar bônus de origem
const applyOriginBonus = (origin: string, attributes: any) => {
  const bonuses: Record<string, Partial<typeof attributes>> = {
    "prodigio": { intelecto: 3 },
    "jogador-estudantil": { velocidade: 3 },
    "herdeiro": { carisma: 3 },
    "miseravel": { fisico: 3 },
    "familia-esportista": { egoismo: 3 },
    "incompreendido": { egoismo: 3 },
    "jogador-de-base": { velocidade: 3 },
    "preguicoso": { intelecto: 3 },
    "fracassado": { egoismo: 3 },
    "bicho-do-mato": { fisico: 3 },
    "monge": { intelecto: 3 },
    "arruinado": { egoismo: 3 },
    "esforcado": { fisico: 3 }
  };

  const bonus = bonuses[origin];
  if (bonus) {
    const newAttributes = { ...attributes };
    Object.keys(bonus).forEach(attr => {
      newAttributes[attr] = Math.min(10, (newAttributes[attr] || 1) + (bonus as any)[attr]);
    });
    return newAttributes;
  }
  return attributes;
};
