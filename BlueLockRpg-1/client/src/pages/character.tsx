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

  const { data: character, isLoading } = useQuery({
    queryKey: ["/api/characters/me"],
    retry: false,
  });

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
    fisico: 3,
    velocidade: 3,
    intelecto: 3,
    carisma: 3,
    egoismo: 3,
    // Perícias começam em 1 (valor base)
    chute: 1,
    precisao: 1,
    roubo: 1,
    analise: 1,
    determinacao: 1,
    estrategia: 1,
    intuicao: 1,
    interacao_social: 1,
    lingua_estrangeira: 1,
    corrida: 1,
    cruzamento: 1,
    defesa: 1,
    drible: 1,
    passe: 1,
    performance: 1,
    comemoracao: 1,
    fortitude: 1,
    finta: 1,
    furtividade: 1,
    iniciativa: 1,
    percepcao: 1,
    sorte: 1,
    dominio: 1,
    cabeceio: 1,
    interceptacao: 1,
    reacao: 1,
    flowColor: "red",
    flowPhrase: "É hora de dominar o campo!",
  });

  const [showCesarMonitor, setShowCesarMonitor] = useState(false);
  const [hasInitializedForm, setHasInitializedForm] = useState(false);

  // Calculated values for attributes
  const totalAttributes = formData.fisico + formData.velocidade + formData.intelecto + formData.carisma + formData.egoismo;
  const remainingAttributePoints = Math.max(0, 18 - totalAttributes);

  useEffect(() => {
    if (character && typeof character === 'object' && !hasInitializedForm) {
      // Only initialize form from character data on first load, not after mutations
      setFormData({
        name: (character as any).name || "",
        position: (character as any).position || "Atacante",
        motivacao: (character as any).motivacao || "",
        age: (character as any).age?.toString() || "",
        height: (character as any).height || "",
        bio: (character as any).bio || "",
        weapon: (character as any).weapon || "",
        origin: (character as any).origin || "",
        classe: (character as any).classe || "",
        subclasse: (character as any).subclasse || "",
        fisico: (character as any).fisico || 3,
        velocidade: (character as any).velocidade || 3,
        intelecto: (character as any).intelecto || 3,
        carisma: (character as any).carisma || 3,
        egoismo: (character as any).egoismo || 3,
        // Perícias começam em 1 (valor base)
        chute: (character as any).chute || 1,
        precisao: (character as any).precisao || 1,
        roubo: (character as any).roubo || 1,
        analise: (character as any).analise || 1,
        determinacao: (character as any).determinacao || 1,
        estrategia: (character as any).estrategia || 1,
        intuicao: (character as any).intuicao || 1,
        interacao_social: (character as any).interacao_social || 1,
        lingua_estrangeira: (character as any).lingua_estrangeira || 1,
        corrida: (character as any).corrida || 1,
        cruzamento: (character as any).cruzamento || 1,
        defesa: (character as any).defesa || 1,
        drible: (character as any).drible || 1,
        passe: (character as any).passe || 1,
        performance: (character as any).performance || 1,
        comemoracao: (character as any).comemoracao || 1,
        fortitude: (character as any).fortitude || 1,
        finta: (character as any).finta || 1,
        furtividade: (character as any).furtividade || 1,
        iniciativa: (character as any).iniciativa || 1,
        percepcao: (character as any).percepcao || 1,
        sorte: (character as any).sorte || 1,
        dominio: (character as any).dominio || 1,
        cabeceio: (character as any).cabeceio || 1,
        interceptacao: (character as any).interceptacao || 1,
        reacao: (character as any).reacao || 1,
        flowColor: (character as any).flowColor || "red",
        flowPhrase: (character as any).flowPhrase || "É hora de dominar o campo!",
      });
      setHasInitializedForm(true);
    }
  }, [character, hasInitializedForm]);

  // Show César's monitor when user doesn't have a character and hasn't seen it before
  useEffect(() => {
    if (!isLoading && !character && user && !user.cesarMonitorSeen) {
      const timer = setTimeout(() => {
        setShowCesarMonitor(true);
      }, 1000); // Show after 1 second
      return () => clearTimeout(timer);
    }
  }, [isLoading, character, user]);

  const createCharacterMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/characters", data);
      return response.json();
    },
    onSuccess: (savedCharacter) => {
      // Use the actual saved character data from server instead of local form data
      queryClient.setQueryData(["/api/characters/me"], savedCharacter);
      
      setHasInitializedForm(true); // Mark as initialized to prevent form reset
      
      // Update form data to match the saved character to ensure consistency
      setFormData({
        name: savedCharacter.name || "",
        position: savedCharacter.position || "Atacante",
        motivacao: savedCharacter.motivacao || "",
        age: savedCharacter.age?.toString() || "",
        height: savedCharacter.height || "",
        bio: savedCharacter.bio || "",
        weapon: savedCharacter.weapon || "",
        origin: savedCharacter.origin || "",
        classe: savedCharacter.classe || "",
        subclasse: savedCharacter.subclasse || "",
        fisico: savedCharacter.fisico || 3,
        velocidade: savedCharacter.velocidade || 3,
        intelecto: savedCharacter.intelecto || 3,
        carisma: savedCharacter.carisma || 3,
        egoismo: savedCharacter.egoismo || 3,
        chute: savedCharacter.chute || 1,
        precisao: savedCharacter.precisao || 1,
        roubo: savedCharacter.roubo || 1,
        analise: savedCharacter.analise || 1,
        determinacao: savedCharacter.determinacao || 1,
        estrategia: savedCharacter.estrategia || 1,
        intuicao: savedCharacter.intuicao || 1,
        interacao_social: savedCharacter.interacao_social || 1,
        lingua_estrangeira: savedCharacter.lingua_estrangeira || 1,
        corrida: savedCharacter.corrida || 1,
        cruzamento: savedCharacter.cruzamento || 1,
        defesa: savedCharacter.defesa || 1,
        drible: savedCharacter.drible || 1,
        passe: savedCharacter.passe || 1,
        performance: savedCharacter.performance || 1,
        comemoracao: savedCharacter.comemoracao || 1,
        fortitude: savedCharacter.fortitude || 1,
        finta: savedCharacter.finta || 1,
        furtividade: savedCharacter.furtividade || 1,
        iniciativa: savedCharacter.iniciativa || 1,
        percepcao: savedCharacter.percepcao || 1,
        sorte: savedCharacter.sorte || 1,
        dominio: savedCharacter.dominio || 1,
        cabeceio: savedCharacter.cabeceio || 1,
        interceptacao: savedCharacter.interceptacao || 1,
        reacao: savedCharacter.reacao || 1,
        flowColor: savedCharacter.flowColor || "red",
        flowPhrase: savedCharacter.flowPhrase || "É hora de dominar o campo!",
      });
      
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
    onSuccess: (savedCharacter) => {
      // Use the actual saved character data from server instead of local form data
      queryClient.setQueryData(["/api/characters/me"], savedCharacter);
      
      setHasInitializedForm(true); // Mark as initialized to prevent form reset
      
      // Update form data to match the saved character to ensure consistency
      setFormData({
        name: savedCharacter.name || "",
        position: savedCharacter.position || "Atacante",
        motivacao: savedCharacter.motivacao || "",
        age: savedCharacter.age?.toString() || "",
        height: savedCharacter.height || "",
        bio: savedCharacter.bio || "",
        weapon: savedCharacter.weapon || "",
        origin: savedCharacter.origin || "",
        classe: savedCharacter.classe || "",
        subclasse: savedCharacter.subclasse || "",
        fisico: savedCharacter.fisico || 3,
        velocidade: savedCharacter.velocidade || 3,
        intelecto: savedCharacter.intelecto || 3,
        carisma: savedCharacter.carisma || 3,
        egoismo: savedCharacter.egoismo || 3,
        chute: savedCharacter.chute || 1,
        precisao: savedCharacter.precisao || 1,
        roubo: savedCharacter.roubo || 1,
        analise: savedCharacter.analise || 1,
        determinacao: savedCharacter.determinacao || 1,
        estrategia: savedCharacter.estrategia || 1,
        intuicao: savedCharacter.intuicao || 1,
        interacao_social: savedCharacter.interacao_social || 1,
        lingua_estrangeira: savedCharacter.lingua_estrangeira || 1,
        corrida: savedCharacter.corrida || 1,
        cruzamento: savedCharacter.cruzamento || 1,
        defesa: savedCharacter.defesa || 1,
        drible: savedCharacter.drible || 1,
        passe: savedCharacter.passe || 1,
        performance: savedCharacter.performance || 1,
        comemoracao: savedCharacter.comemoracao || 1,
        fortitude: savedCharacter.fortitude || 1,
        finta: savedCharacter.finta || 1,
        furtividade: savedCharacter.furtividade || 1,
        iniciativa: savedCharacter.iniciativa || 1,
        percepcao: savedCharacter.percepcao || 1,
        sorte: savedCharacter.sorte || 1,
        dominio: savedCharacter.dominio || 1,
        cabeceio: savedCharacter.cabeceio || 1,
        interceptacao: savedCharacter.interceptacao || 1,
        reacao: savedCharacter.reacao || 1,
        flowColor: savedCharacter.flowColor || "red",
        flowPhrase: savedCharacter.flowPhrase || "É hora de dominar o campo!",
      });
      
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

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);
      
      const response = await fetch('/api/characters/avatar', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/characters/me"] });
      toast({
        title: "Avatar atualizado!",
        description: "Sua imagem foi salva com sucesso.",
      });
    },
    onError: (error) => {
      console.error("Avatar upload error:", error);
      toast({
        title: "Erro",
        description: "Falha ao fazer upload da imagem. Tente novamente.",
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



  const handleFlowColorChange = (value: string) => {
    setFormData({
      ...formData,
      flowColor: value,
    });
  };

  const handleOriginSelect = (origin: string) => {
    setFormData({
      ...formData,
      origin: origin,
    });
  };

  const handleMotivationChange = (motivacao: string) => {
    setFormData({
      ...formData,
      motivacao: motivacao,
    });
  };

  const handleWeaponSelect = (weaponId: string) => {
    setFormData({
      ...formData,
      weapon: weaponId,
    });
  };

  const handleClassChange = (className: string) => {
    const updatedData = {
      ...formData,
      classe: className,
      subclasse: "", // Reset subclass when class changes
    };
    
    // Apply class skills automatically
    const updatedSkills = applyClassSkills({
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
    }, className, "");

    setFormData({
      ...updatedData,
      ...updatedSkills,
    });
  };



  const handleSubclassChange = (subclassName: string) => {
    const updatedData = {
      ...formData,
      subclasse: subclassName,
    };

    // Apply class and subclass skills automatically
    const updatedSkills = applyClassSkills({
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
    }, formData.classe, subclassName);

    setFormData({
      ...updatedData,
      ...updatedSkills,
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

  const handleSkillChange = (skillName: string, value: number) => {
    setFormData({
      ...formData,
      [skillName]: value,
    });
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
      fisico: formData.fisico,
      velocidade: formData.velocidade,
      intelecto: formData.intelecto,
      carisma: formData.carisma,
      egoismo: formData.egoismo,
      // Perícias originais
      chute: formData.chute,
      precisao: formData.precisao,
      roubo: formData.roubo,
      analise: formData.analise,
      determinacao: formData.determinacao,
      estrategia: formData.estrategia,
      intuicao: formData.intuicao,
      interacao_social: formData.interacao_social,
      lingua_estrangeira: formData.lingua_estrangeira,
      // Novas perícias
      corrida: formData.corrida,
      cruzamento: formData.cruzamento,
      defesa: formData.defesa,
      drible: formData.drible,
      passe: formData.passe,
      performance: formData.performance,
      comemoracao: formData.comemoracao,
      // Perícias livres
      fortitude: formData.fortitude,
      finta: formData.finta,
      furtividade: formData.furtividade,
      iniciativa: formData.iniciativa,
      percepcao: formData.percepcao,
      sorte: formData.sorte,
      // Perícias de reação
      dominio: formData.dominio,
      cabeceio: formData.cabeceio,
      interceptacao: formData.interceptacao,
      reacao: formData.reacao,
      flowColor: formData.flowColor,
      flowPhrase: formData.flowPhrase,
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
                      ].map((attr) => (
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
                              NÍVEL {attr.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Total Stats Display */}
                <div className="mt-6 p-4 bg-gray-800 rounded-lg border-2 border-red-500">
                  <div className="flex justify-between items-center">
                    <span className="font-oswald font-bold text-red-400">ATRIBUTOS DISTRIBUÍDOS:</span>
                    <span className="font-bebas text-lg font-bold text-red-400">{totalAttributes}/18</span>
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
