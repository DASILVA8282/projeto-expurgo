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
