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

  const [formData, setFormData] = useState({
    name: "",
    position: "Atacante",
    motivacao: "",
    age: "",
    height: "",
    bio: "",
    weapon: "",
    origin: "",
    classe: "",
    subclasse: "",
    fisico: 0,
    velocidade: 0,
    intelecto: 0,
    carisma: 0,
    egoismo: 0,
    chute: 0,
    precisao: 0,
    roubo: 0,
    analise: 0,
    determinacao: 0,
    estrategia: 0,
    intuicao: 0,
    interacao_social: 0,
    lingua_estrangeira: 0,
    corrida: 0,
    cruzamento: 0,
    defesa: 0,
    drible: 0,
    passe: 0,
    performance: 0,
    comemoracao: 0,
    fortitude: 0,
    finta: 0,
    furtividade: 0,
    iniciativa: 0,
    percepcao: 0,
    sorte: 0,
    dominio: 0,
    cabeceio: 0,
    interceptacao: 0,
    reacao: 0,
    flowColor: "cyan",
    flowPhrase: "É hora de dominar o campo!",
    flowMusicUrl: "",
    fama: 0,
    adrenalina: 0,
    aura: 0,
    furia: 0,
  });

  console.log("Query status:", { character, isLoading, error, user: !!user });

  const [showCesarMonitor, setShowCesarMonitor] = useState(false);

  // Mutations
  const createCharacterMutation = useMutation({
    mutationFn: async (characterData: any) => {
      const response = await apiRequest("POST", "/api/characters", characterData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Personagem criado!",
        description: "Seu sobrevivente foi criado com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/characters/me"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: "Falha ao criar personagem",
        variant: "destructive",
      });
    },
  });

  const updateCharacterMutation = useMutation({
    mutationFn: async (characterData: any) => {
      const response = await apiRequest("PATCH", "/api/characters/me", characterData);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Personagem atualizado!",
        description: "Suas alterações foram salvas.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/characters/me"] });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: "Falha ao atualizar personagem",
        variant: "destructive",
      });
    },
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      console.log("Starting avatar upload:", { name: file.name, size: file.size, type: file.type });

      const formData = new FormData();
      formData.append('avatar', file);

      const response = await fetch('/api/characters/avatar', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      console.log("Upload response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Upload error response:", errorText);
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: `Erro ${response.status}: ${errorText || 'Upload failed'}` };
        }
        throw new Error(errorData.message || 'Upload failed');
      }

      const result = await response.json();
      console.log("Upload successful:", result);
      return result;
    },
    onSuccess: () => {
      toast({
        title: "Avatar atualizado!",
        description: "Sua imagem foi salva com sucesso.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/characters/me"] });
    },
    onError: (error: Error) => {
      console.error("Upload mutation error:", error);
      toast({
        title: "Erro no upload",
        description: error.message || "Falha ao enviar a imagem",
        variant: "destructive",
      });
    },
  });

  // Load character data into form when available
  useEffect(() => {
    if (character) {
      setFormData({
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
        flowMusicUrl: character.flowMusicUrl || "",
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
      flowMusicUrl: formData.flowMusicUrl,
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

  // Sistema de Classes: jogador escolhe 8 períícias iniciais que começam em Classe I
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
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center animate-pulse">
          <div className="relative mb-8">
            <div className="w-24 h-24 mx-auto bg-gradient-to-r from-red-600 via-red-700 to-red-900 rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50">
              <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div className="absolute -top-2 -left-2 w-28 h-28 border-2 border-red-500/30 rounded-full animate-ping"></div>
            <div className="absolute -top-4 -left-4 w-32 h-32 border border-red-400/20 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <div className="space-y-4">
            <h1 className="font-bebas text-4xl font-bold text-red-500 tracking-wider animate-glow">
              INICIALIZANDO PROTOCOLO...
            </h1>
            <div className="flex justify-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="text-gray-400 font-oswald tracking-wide">CARREGANDO DADOS DO SOBREVIVENTE</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-red-950/10 to-black pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

      {/* Navigation - Melhorado */}
      <nav className="bg-gradient-to-r from-gray-900 via-black to-gray-900 border-b-4 border-red-600 sticky top-0 z-50 shadow-2xl shadow-red-500/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 via-red-700 to-red-900 rounded-lg flex items-center justify-center shadow-2xl shadow-red-500/50 animate-menacing-glow">
                  <svg width="40" height="40" viewBox="0 0 32 32" className="text-white">
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
                <div className="absolute -inset-1 bg-red-500/20 rounded-lg blur animate-pulse"></div>
              </div>
              <div>
                <h1 className="font-bebas text-2xl font-bold text-red-500 tracking-wider">PROJETO EXPURGO</h1>
                <p className="text-red-300 font-oswald text-xs tracking-widest">SOBREVIVENTE EM FORJAMENTO</p>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link href="/">
                <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-all duration-300 tracking-wide hover:scale-105 group">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1L7 2L8 6L9 2L8 1Z"/>
                        <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span>CENTRAL DE COMANDO</span>
                  </div>
                </button>
              </Link>
              <Link href="/character">
                <button className="text-red-400 font-oswald font-semibold transition-all duration-300 tracking-wide scale-110 group">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-red-500/50">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 8c1.5 0 3-1.5 3-3s-1.5-3-3-3-3 1.5-3 3 1.5 3 3 3zm0 1c-2 0-6 1-6 3v1h12v-1c0-2-4-3-6-3z"/>
                      </svg>
                    </div>
                    <span>MEU SOBREVIVENTE</span>
                  </div>
                </button>
              </Link>
              <Link href="/ranking">
                <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-all duration-300 tracking-wide hover:scale-105 group">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 1l2 4h4l-3 3 1 4-4-2-4 2 1-4-3-3h4L8 1z"/>
                      </svg>
                    </div>
                    <span>RANKING EXPURGO</span>
                  </div>
                </button>
              </Link>
              <Link href="/match">
                <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-all duration-300 tracking-wide hover:scale-105 group">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M5 8L11 8M8 5L8 11" stroke="currentColor" strokeWidth="1.5"/>
                      </svg>
                    </div>
                    <span>COMBATES</span>
                  </div>
                </button>
              </Link>
              <Link href="/guide">
                <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-all duration-300 tracking-wide hover:scale-105 group">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M3 2h10v12H3V2zm2 2v8h6V4H5zm1 1h4v1H6V5zm0 2h4v1H6V7zm0 2h2v1H6V9z"/>
                      </svg>
                    </div>
                    <span>MANUAL</span>
                  </div>
                </button>
              </Link>
              {user?.isAdmin && (
                <Link href="/admin">
                  <button className="text-gray-300 hover:text-red-400 font-oswald font-semibold transition-all duration-300 tracking-wide hover:scale-105 group">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-all">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M8 2L3 4v4c0 3.5 3 6 5 6s5-2.5 5-6V4L8 2zm0 2l3.5 1.5v3c0 2-1.5 3.5-3.5 3.5s-3.5-1.5-3.5-3.5v-3L8 4z"/>
                          <circle cx="8" cy="7.5" r="1.5"/>
                        </svg>
                      </div>
                      <span>CONTROLE MESTRE</span>
                    </div>
                  </button>
                </Link>
              )}
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-red-400 font-bebas text-lg tracking-wider">{user?.username}</p>
                <p className="text-gray-500 font-oswald text-xs tracking-widest">OPERADOR ATIVO</p>
              </div>
              <Button onClick={handleLogout} className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bebas font-bold text-lg px-6 py-3 shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105">
                <i className="fas fa-sign-out-alt mr-2"></i>DESCONECTAR
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header Section - Redesenhado */}
      <div className="relative bg-gradient-to-r from-black via-red-950/30 to-black py-12 border-b-2 border-red-600/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M30%2030L30%200M30%2030L60%2030M30%2030L30%2060M30%2030L0%2030%22%20stroke%3D%22%23991b1b%22%20stroke-width%3D%220.5%22%20opacity%3D%220.1%22/%3E%3C/svg%3E')] opacity-20"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <h2 className="font-bebas text-6xl font-bold text-red-500 tracking-wider animate-glow">
                MEU SOBREVIVENTE
              </h2>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
            </div>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-0.5 bg-red-500"></div>
              <p className="text-gray-300 font-oswald tracking-widest text-lg">FORJAMENTO EXPERIMENTAL</p>
              <div className="w-12 h-0.5 bg-red-500"></div>
            </div>
            <div className="bg-red-950/20 border-l-4 border-red-500 p-4 inline-block">
              <p className="text-red-300 font-oswald italic">
                "Configure e molde sua ficha de sobrevivente para enfrentar o expurgo definitivo."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Totalmente Reorganizado */}
      <div className="container mx-auto px-4 py-12 space-y-12">

        {/* SEÇÃO 1: PERFIL BÁSICO DO SOBREVIVENTE */}
        <div className="relative">
          <div className="absolute -top-8 left-0 right-0">
            <div className="flex items-center justify-center">
              <div className="bg-red-600 text-white px-6 py-2 font-bebas text-xl tracking-wider shadow-lg">
                01. IDENTIDADE DO SOBREVIVENTE
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-4 border-red-600 shadow-2xl shadow-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Avatar Section - Melhorado */}
                <div className="lg:col-span-1 text-center space-y-6">
                  <div className="relative inline-block">
                    <div className="absolute -inset-4 bg-red-500/20 rounded-full blur-xl animate-pulse"></div>
                    <div className="relative">
                      <img 
                        src={character?.avatar ? `${character.avatar}${character.avatar.includes('?') ? '&' : '?'}t=${Date.now()}` : defaultAvatar}
                        alt="Avatar do personagem" 
                        className="w-48 h-48 rounded-full mx-auto border-8 border-red-500 object-cover bg-gray-800 shadow-2xl shadow-red-500/50"
                        onError={(e) => {
                          console.log("Avatar failed to load, using default");
                          (e.target as HTMLImageElement).src = defaultAvatar;
                        }}
                        onLoad={() => {
                          console.log("Avatar loaded successfully");
                        }}
                      />
                      {uploadAvatarMutation.isPending && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80 rounded-full">
                          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}
                    </div>
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
                    className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 font-bebas font-bold text-lg px-8 py-4 shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105"
                    disabled={uploadAvatarMutation.isPending || !character}
                    title={!character ? "Crie seu personagem primeiro para fazer upload do avatar" : ""}
                  >
                    <svg width="20" height="20" viewBox="0 0 16 16" className="mr-3" fill="currentColor">
                      <path d="M8 1L7 2L8 6L9 2L8 1Z"/>
                      <circle cx="8" cy="8" r="5" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                    {uploadAvatarMutation.isPending ? 'PROCESSANDO...' : character ? 'ALTERAR IMAGEM' : 'CRIAR PERSONAGEM PRIMEIRO'}
                  </Button>

                  {/* Ranking Display */}
                  <div className="bg-black border-2 border-red-500 rounded-lg p-6 space-y-4">
                    <h4 className="font-bebas text-xl text-red-400 tracking-wider">CLASSIFICAÇÃO</h4>
                    <div className="flex items-center justify-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                        <i className="fas fa-medal text-white text-xl"></i>
                      </div>
                      <div className="text-center">
                        <span className="text-white font-bebas text-3xl font-bold">
                          #{character?.ranking || "???"}
                        </span>
                        <p className="text-gray-400 font-oswald text-xs">POSIÇÃO ATUAL</p>
                      </div>
                    </div>
                    <p className="text-red-300 font-oswald text-xs text-center italic">
                      Definido automaticamente pelo sistema
                    </p>
                  </div>
                </div>

                {/* Basic Info - Melhorado */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="block text-red-400 font-bebas text-lg tracking-wider flex items-center">
                        <i className="fas fa-user-circle mr-2"></i>
                        NOME DO SOBREVIVENTE
                      </Label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white h-12 text-lg font-oswald"
                        placeholder="Nome do seu sobrevivente"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="block text-red-400 font-bebas text-lg tracking-wider flex items-center">
                        <i className="fas fa-futbol mr-2"></i>
                        POSIÇÃO
                      </Label>
                      <Select value={formData.position} onValueChange={(value) => setFormData({...formData, position: value})}>
                        <SelectTrigger className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white h-12 text-lg">
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

                    <div className="space-y-3">
                      <Label className="block text-red-400 font-bebas text-lg tracking-wider flex items-center">
                        <i className="fas fa-calendar-alt mr-2"></i>
                        IDADE
                      </Label>
                      <Input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white h-12 text-lg font-oswald"
                        placeholder="Idade"
                        min="16"
                        max="25"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="block text-red-400 font-bebas text-lg tracking-wider flex items-center">
                        <i className="fas fa-ruler-vertical mr-2"></i>
                        ALTURA
                      </Label>
                      <Input
                        type="text"
                        name="height"
                        value={formData.height}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white h-12 text-lg font-oswald"
                        placeholder="Ex: 1.75m"
                      />
                    </div>
                  </div>

                  {/* Calculated Stats Display */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-red-950/30 border-2 border-red-800 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bebas text-xl text-red-400 tracking-wider">PONTOS DE FÔLEGO</h4>
                          <p className="text-gray-300 font-oswald text-sm">10 base + Físico</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bebas text-4xl text-red-400">{calculatedFolego}</span>
                          <div className="w-12 h-1 bg-red-500 ml-auto"></div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-red-950/30 border-2 border-red-800 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bebas text-xl text-red-400 tracking-wider">DESLOCAMENTO</h4>
                          <p className="text-gray-300 font-oswald text-sm">27 base + Velocidade</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bebas text-4xl text-red-400">{calculatedDeslocamento}</span>
                          <div className="w-12 h-1 bg-red-500 ml-auto"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEÇÃO 2: ORIGENS */}
        <div className="relative">
          <div className="absolute -top-8 left-0 right-0">
            <div className="flex items-center justify-center">
              <div className="bg-red-600 text-white px-6 py-2 font-bebas text-xl tracking-wider shadow-lg">
                02. ORIGEM DO SOBREVIVENTE
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-4 border-red-600 shadow-2xl shadow-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>
            <CardContent className="p-8">
              <CharacterOrigins 
                selectedOrigin={formData.origin}
                onOriginSelect={handleOriginSelect}
              />
            </CardContent>
          </Card>
        </div>

        {/* SEÇÃO 3: MOTIVAÇÕES */}
        <div className="relative">
          <div className="absolute -top-8 left-0 right-0">
            <div className="flex items-center justify-center">
              <div className="bg-red-600 text-white px-6 py-2 font-bebas text-xl tracking-wider shadow-lg">
                03. MOTIVAÇÃO PRIMÁRIA
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-4 border-red-600 shadow-2xl shadow-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>
            <CardContent className="p-8">
              <CharacterMotivations 
                selectedMotivation={formData.motivacao}
                onMotivationChange={handleMotivationChange}
              />
            </CardContent>
          </Card>
        </div>

        {/* SEÇÃO 4: CLASSES */}
        <div className="relative">
          <div className="absolute -top-8 left-0 right-0">
            <div className="flex items-center justify-center">
              <div className="bg-red-600 text-white px-6 py-2 font-bebas text-xl tracking-wider shadow-lg">
                04. CLASSIFICAÇÃO TÁTICA
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-4 border-red-600 shadow-2xl shadow-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>
            <CardContent className="p-8">
              <ClassSystem 
                selectedClass={formData.classe}
                selectedSubclass={formData.subclasse}
                onClassChange={handleClassChange}
                onSubclassChange={handleSubclassChange}
              />
            </CardContent>
          </Card>
        </div>

        {/* SEÇÃO 5: ARMAS */}
        <div className="relative">
          <div className="absolute -top-8 left-0 right-0">
            <div className="flex items-center justify-center">
              <div className="bg-red-600 text-white px-6 py-2 font-bebas text-xl tracking-wider shadow-lg">
                05. ARSENAL ESPECIAL
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-4 border-red-600 shadow-2xl shadow-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>
            <CardContent className="p-8">
              <WeaponSelection 
                selectedWeapon={formData.weapon}
                onWeaponSelect={handleWeaponSelect}
              />
            </CardContent>
          </Card>
        </div>

        {/* SEÇÃO 6: ATRIBUTOS E ESTATÍSTICAS */}
        <div className="relative">
          <div className="absolute -top-8 left-0 right-0">
            <div className="flex items-center justify-center">
              <div className="bg-red-600 text-white px-6 py-2 font-bebas text-xl tracking-wider shadow-lg">
                06. CAPACIDADES FUNDAMENTAIS
              </div>
            </div>
          </div>

          <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-4 border-red-600 shadow-2xl shadow-red-500/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>
            <CardContent className="p-8 space-y-12">

              {/* Atributos Principais */}
              <div>
                <div className="text-center mb-8">
                  <h3 className="font-bebas text-4xl text-red-400 tracking-wider mb-4">ATRIBUTOS PRIMÁRIOS</h3>
                  <div className="flex items-center justify-center space-x-4 mb-6">
                    <div className="w-16 h-0.5 bg-red-500"></div>
                    <p className="text-gray-300 font-oswald text-lg">
                      Definem o limite das capacidades do seu sobrevivente
                    </p>
                    <div className="w-16 h-0.5 bg-red-500"></div>
                  </div>
                  <div className="bg-red-950/30 border-2 border-red-600 rounded-lg p-4 inline-block">
                    <p className="text-red-300 font-bebas text-xl">
                      PONTOS RESTANTES: <span className="text-white text-2xl">{remainingAttributePoints}/15</span>
                    </p>
                  </div>
                </div>

                <div className="grid gap-8">
                  {[
                    { name: "fisico", displayName: "FÍSICO", description: "Força bruta e resistência corporal", icon: "fas fa-fist-raised", value: formData.fisico },
                    { name: "velocidade", displayName: "VELOCIDADE", description: "Reflexos, agilidade e resposta rápida", icon: "fas fa-bolt", value: formData.velocidade },
                    { name: "intelecto", displayName: "INTELECTO", description: "Estratégia, leitura de jogo e tomada de decisão", icon: "fas fa-brain", value: formData.intelecto },
                    { name: "carisma", displayName: "CARISMA", description: "Como lida com a fama, fãs e relações fora de campo", icon: "fas fa-star", value: formData.carisma },
                    { name: "egoismo", displayName: "EGOÍSMO", description: "Sua ambição individual — a fome de ser o número 1", icon: "fas fa-crown", value: formData.egoismo }
                  ].map((attr) => {
                    const originBonus = getOriginBonus(attr.name);
                    const totalValue = attr.value + originBonus;

                    return (
                      <div key={attr.name} className="bg-gradient-to-r from-red-950/30 via-black to-red-950/30 border-2 border-red-700/50 rounded-xl p-8 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>

                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center shadow-lg shadow-red-500/50">
                              <i className={`${attr.icon} text-white text-2xl`}></i>
                            </div>
                            <div>
                              <h4 className="font-bebas text-2xl text-red-400 tracking-wider">
                                {attr.displayName}
                              </h4>
                              <p className="text-gray-300 font-oswald text-lg">
                                {attr.description}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="font-bebas text-4xl text-red-400 mb-2">
                              NÍVEL {totalValue}
                            </div>
                            {originBonus > 0 && (
                              <div className="text-yellow-400 font-oswald text-sm">
                                ({attr.value} + {originBonus} origem)
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => attr.value > 0 && handleStatChange(attr.name, attr.value - 1)}
                            disabled={attr.value <= 0}
                            className="w-12 h-12 p-0 hover:bg-red-700/30 disabled:opacity-30 border-2 border-red-600"
                          >
                            <i className="fas fa-minus text-xl"></i>
                          </Button>

                          <div className="flex items-center gap-3 flex-1 justify-center">
                            <div className="flex items-center gap-2 flex-wrap justify-center">
                              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((dot) => (
                                <div
                                  key={dot}
                                  className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                                    dot <= attr.value
                                      ? "bg-red-500 border-red-500 shadow-lg shadow-red-500/50"
                                      : "border-red-700/50"
                                  }`}
                                />
                              ))}
                            </div>

                            {originBonus > 0 && (
                              <div className="flex items-center gap-2 ml-4">
                                <span className="text-yellow-400 font-oswald font-bold text-sm">+{originBonus}</span>
                                <div className="flex gap-1">
                                  {Array.from({ length: originBonus }).map((_, i) => (
                                    <div
                                      key={i}
                                      className="w-3 h-3 rounded-full bg-yellow-400 border border-yellow-300 shadow-lg shadow-yellow-400/50"
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>

                          <Button
                            variant="ghost"
                            size="lg"
                            onClick={() => attr.value < 10 && remainingAttributePoints > 0 && handleStatChange(attr.name, attr.value + 1)}
                            disabled={attr.value >= 10 || remainingAttributePoints <= 0}
                            className="w-12 h-12 p-0 hover:bg-red-700/30 disabled:opacity-30 border-2 border-red-600"
                          >
                            <i className="fas fa-plus text-xl"></i>
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Status da Distribuição */}
                <div className="mt-8 p-6 bg-gradient-to-r from-red-950/50 to-black border-4 border-red-500 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="font-bebas text-2xl text-red-400 tracking-wider">ATRIBUTOS DISTRIBUÍDOS:</span>
                    <span className="font-bebas text-3xl font-bold text-red-400">{totalAttributes}/15</span>
                  </div>
                  {remainingAttributePoints === 0 && (
                    <div className="mt-4 text-center">
                      <div className="inline-flex items-center space-x-2 bg-green-800/30 border border-green-600 rounded-lg px-4 py-2">
                        <i className="fas fa-check-circle text-green-400"></i>
                        <p className="text-green-300 font-oswald font-bold">DISTRIBUIÇÃO COMPLETA</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Estatísticas Variáveis */}
              <div>
                <div className="text-center mb-8">
                  <h3 className="font-bebas text-4xl text-red-400 tracking-wider mb-4">ESTATÍSTICAS VARIÁVEIS</h3>
                  <div className="flex items-center justify-center space-x-4">
                    <div className="w-16 h-0.5 bg-red-500"></div>
                    <p className="text-gray-300 font-oswald text-lg">Recursos dinâmicos do sobrevivente</p>
                    <div className="w-16 h-0.5 bg-red-500"></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { name: "fama", label: "FAMA", icon: "fas fa-trophy", color: "yellow" },
                    { name: "adrenalina", label: "ADRENALINA", icon: "fas fa-heartbeat", color: "red" },
                    { name: "aura", label: "AURA", icon: "fas fa-eye", color: "purple" },
                    { name: "furia", label: "FÚRIA", icon: "fas fa-fire", color: "orange" }
                  ].map((stat) => (
                    <div key={stat.name} className="bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 rounded-xl p-6 hover:border-red-500 transition-all duration-300">
                      <div className="text-center space-y-4">
                        <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center ${
                          stat.color === 'yellow' ? 'bg-yellow-600' :
                          stat.color === 'red' ? 'bg-red-600' :
                          stat.color === 'purple' ? 'bg-purple-600' :
                          'bg-orange-600'
                        } shadow-lg`}>
                          <i className={`${stat.icon} text-white text-xl`}></i>
                        </div>
                        <Label className="block text-red-400 font-bebas text-lg tracking-wider">
                          {stat.label}
                        </Label>
                        <Input
                          type="number"
                          value={formData[stat.name as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [stat.name]: parseInt(e.target.value) || 0 })}
                          className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white text-center text-xl font-bebas"
                          placeholder="0"
                          min="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Granted Skills Info */}
              {formData.classe && (
                <div className="bg-gradient-to-r from-green-950/30 to-black border-2 border-green-600 rounded-xl p-8">
                  <h3 className="text-green-400 font-bebas text-2xl mb-6 text-center tracking-wider">
                    PERÍCIAS CONCEDIDAS AUTOMATICAMENTE
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getGrantedSkills(formData.classe, formData.subclasse).map((skill) => (
                      <div key={skill} className="flex items-center bg-green-800/20 border border-green-700 rounded-lg p-3">
                        <svg className="w-6 h-6 mr-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <div>
                          <span className="text-green-300 font-oswald font-bold">{skill.charAt(0).toUpperCase() + skill.slice(1)}</span>
                          <span className="text-green-400 font-oswald text-sm ml-2">(Classe I)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-green-300/70 font-oswald text-sm text-center mt-6 italic">
                    Essas perícias começam automaticamente em CLASSE I
                  </p>
                </div>
              )}

              {/* Skills Section */}
              <div>
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
            </CardContent>
          </Card>
        </div>

        {/* SEÇÃO 7: BIOGRAFIA E PERSONALIZAÇÃO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Biografia */}
          <div className="relative">
            <div className="absolute -top-8 left-0 right-0">
              <div className="flex items-center justify-center">
                <div className="bg-red-600 text-white px-6 py-2 font-bebas text-xl tracking-wider shadow-lg">
                  07. BIOGRAFIA
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-4 border-red-600 shadow-2xl shadow-red-500/20 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600"></div>
              <CardContent className="p-8 space-y-8">
                <div className="space-y-4">
                  <Label className="block text-red-400 font-bebas text-xl tracking-wider flex items-center">
                    <i className="fas fa-book mr-3"></i>
                    HISTÓRIA PESSOAL
                  </Label>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white h-40 text-lg font-oswald resize-none"
                    placeholder="Conte a história do seu sobrevivente... De onde veio, o que o motivou, quais foram suas lutas..."
                  />
                                </div>

                <div className="space-y-4">
                  <Label className="block text-red-400 font-bebas text-xl tracking-wider flex items-center">
                    <i className="fas fa-magic mr-3"></i>
                    HABILIDADES ESPECIAIS
                  </Label>
                  <Textarea
                    name="weapon"
                    value={formData.weapon}
                    onChange={handleInputChange}
                    className="w-full bg-gray-800 border-2 border-gray-700 focus:border-red-500 text-white h-32 text-lg font-oswald resize-none"
                    placeholder="Descreva as habilidades únicas do seu personagem, técnicas especiais, jogadas favoritas..."
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Flow State */}
          <div className="relative">
            <div className="absolute -top-8 left-0 right-0">
              <div className="flex items-center justify-center">
                <div className="bg-purple-600 text-white px-6 py-2 font-bebas text-xl tracking-wider shadow-lg">
                  08. FLOW STATE
                </div>
              </div>
            </div>

            <Card className="bg-gradient-to-br from-slate-900 via-black to-slate-900 border-4 border-purple-600 shadow-2xl shadow-purple-500/20 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600"></div>
              <CardContent className="p-8 space-y-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-purple-600 to-purple-700 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                    <i className="fas fa-bolt text-white text-2xl"></i>
                  </div>
                  <h3 className="font-bebas text-2xl text-purple-400 tracking-wider">
                    CONFIGURAÇÃO DO FLOW STATE
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <Label className="block text-purple-400 font-bebas text-lg tracking-wider mb-3">
                      COR DO FLOW STATE
                    </Label>
                    <Select value={formData.flowColor} onValueChange={handleFlowColorChange}>
                      <SelectTrigger className="w-full bg-slate-800 border-2 border-slate-700 focus:border-purple-500 text-white h-12 text-lg">
                        <SelectValue placeholder="Selecione a cor do seu Flow State" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cyan">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-cyan-400 shadow-lg shadow-cyan-400/50"></div>
                            <span>Cyan - Velocidade</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="purple">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
                            <span>Purple - Controle</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="red">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-red-400 shadow-lg shadow-red-400/50"></div>
                            <span>Red - Força</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="blue">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-blue-400 shadow-lg shadow-blue-400/50"></div>
                            <span>Blue - Precisão</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="green">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-green-400 shadow-lg shadow-green-400/50"></div>
                            <span>Green - Resistência</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="yellow">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-yellow-400 shadow-lg shadow-yellow-400/50"></div>
                            <span>Yellow - Agilidade</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="orange">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50"></div>
                            <span>Orange - Explosão</span>
                          </div>
                        </SelectItem>
                        <SelectItem value="pink">
                          <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-pink-400 shadow-lg shadow-pink-400/50"></div>
                            <span>Pink - Criatividade</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="block text-purple-400 font-bebas text-lg tracking-wider mb-3">
                      FRASE DE ATIVAÇÃO
                    </Label>
                    <Input
                      type="text"
                      name="flowPhrase"
                      value={formData.flowPhrase}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border-2 border-slate-700 focus:border-purple-500 text-white h-12 text-lg font-oswald"
                      placeholder="Ex: É hora de dominar o campo!"
                      maxLength={255}
                    />
                    <p className="text-slate-500 text-sm mt-2 font-oswald italic">
                      Esta frase aparecerá durante a ativação do seu Flow State
                    </p>
                  </div>

                   <div>
                    <Label className="block text-purple-400 font-bebas text-lg tracking-wider mb-3">
                      LINK DA MÚSICA DE FLOW STATE
                    </Label>
                    <Input
                      type="text"
                      name="flowMusicUrl"
                      value={formData.flowMusicUrl}
                      onChange={handleInputChange}
                      className="w-full bg-slate-800 border-2 border-slate-700 focus:border-purple-500 text-white h-12 text-lg font-oswald"
                      placeholder="Cole aqui o link direto do áudio (.mp3, .wav, .ogg)"
                    />
                    <p className="text-slate-500 text-sm mt-2 font-oswald italic">
                      Use links diretos de arquivos de áudio para melhor compatibilidade. Exemplos: arquivo.mp3, arquivo.wav
                    </p>
                      Esta música tocará para todos durante seu Flow State
                    </p>
                  </div>

                  {/* Preview */}
                  <div className="bg-black border-2 border-purple-500 rounded-xl p-6 relative overflow-hidden">
                    <h4 className="font-bebas text-lg text-purple-400 mb-4 text-center">PREVIEW DO FLOW STATE</h4>
                    <div className="text-center p-8 bg-gray-900 rounded-lg relative overflow-hidden">
                      {/* Background effect */}
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: `radial-gradient(circle, ${getFlowPreviewColor(formData.flowColor)} 0%, transparent 70%)`
                        }}
                      />

                      {/* Content */}
                      <div className="relative z-10">
                        <div 
                          className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
                          style={{
                            background: `linear-gradient(45deg, ${getFlowPreviewColor(formData.flowColor)}, ${getFlowPreviewColor(formData.flowColor)}80)`,
                            boxShadow: `0 0 30px ${getFlowPreviewColor(formData.flowColor)}`
                          }}
                        >
                          <i className="fas fa-bolt text-white text-3xl"></i>
                        </div>
                        <h3 
                          className="text-3xl font-bold font-bebas mb-4"
                          style={{
                            color: getFlowPreviewColor(formData.flowColor),
                            textShadow: `0 0 15px ${getFlowPreviewColor(formData.flowColor)}`
                          }}
                        >
                          {formData.name || "SEU PERSONAGEM"}
                        </h3>
                        <p 
                          className="text-xl font-oswald font-bold text-white mb-4"
                          style={{
                            textShadow: `0 0 10px ${getFlowPreviewColor(formData.flowColor)}`
                          }}
                        >
                          "{formData.flowPhrase}"
                        </p>
                        <p className="text-sm text-gray-300 font-bebas tracking-widest">FLOW STATE ACTIVATED</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* BOTÃO DE SALVAMENTO FINAL */}
        <div className="text-center py-12">
          <div className="relative inline-block">
            <Button 
              onClick={handleSave}
              className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-700 hover:via-red-800 hover:to-red-900 text-white font-bebas font-bold text-2xl px-16 py-6 shadow-2xl shadow-red-500/40 transition-all duration-500 hover:scale-110 border-4 border-red-400 hover:border-red-300"
              disabled={createCharacterMutation.isPending || updateCharacterMutation.isPending}
            >
              <div className="absolute -inset-2 bg-red-500/20 rounded-lg blur animate-pulse"></div>
              <div className="relative flex items-center space-x-4">
                <i className="fas fa-save text-3xl"></i>
                <span className="tracking-wider">
                  {createCharacterMutation.isPending || updateCharacterMutation.isPending ? "PROCESSANDO DADOS..." : "SALVAR SOBREVIVENTE"}
                </span>
                <i className="fas fa-save text-3xl"></i>
              </div>
            </Button>
          </div>
          <p className="text-gray-400 font-oswald text-lg mt-6 italic">
            "Sua jornada no Blue Lock está prestes a começar..."
          </p>
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
