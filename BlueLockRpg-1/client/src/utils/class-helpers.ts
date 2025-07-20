import { CLASSES } from "@/components/ui/class-system";

export interface CharacterSkills {
  chute: number;
  precisao: number;
  roubo: number;
  analise: number;
  determinacao: number;
  estrategia: number;
  intuicao: number;
  interacao_social: number;
  lingua_estrangeira: number;
  corrida: number;
  cruzamento: number;
  defesa: number;
  drible: number;
  passe: number;
  performance: number;
  comemoracao: number;
  fortitude: number;
  finta: number;
  furtividade: number;
  iniciativa: number;
  percepcao: number;
  sorte: number;
  dominio: number;
  cabeceio: number;
  interceptacao: number;
  reacao: number;
}

// Get the class skill for a given class
export function getClassSkill(className: string): string | null {
  if (!className) return null;
  const classData = CLASSES[className as keyof typeof CLASSES];
  return classData?.skill || null;
}

// Get the subclass skill for a given class and subclass
export function getSubclassSkill(className: string, subclassName: string): string | null {
  if (!className || !subclassName) return null;
  const classData = CLASSES[className as keyof typeof CLASSES];
  if (!classData) return null;
  
  const subclassData = (classData.subclasses as any)[subclassName];
  return subclassData?.skill || null;
}

// Apply class and subclass skills to character skills
export function applyClassSkills(
  baseSkills: CharacterSkills, 
  className: string, 
  subclassName: string
): CharacterSkills {
  const updatedSkills = { ...baseSkills };
  
  // Apply class skill (set to 1 if it's 0)
  const classSkill = getClassSkill(className);
  if (classSkill && (updatedSkills as any)[classSkill] === 0) {
    (updatedSkills as any)[classSkill] = 1;
  }
  
  // Apply subclass skill (set to 1 if it's 0)
  const subclassSkill = getSubclassSkill(className, subclassName);
  if (subclassSkill && (updatedSkills as any)[subclassSkill] === 0) {
    (updatedSkills as any)[subclassSkill] = 1;
  }
  
  return updatedSkills;
}

// Get list of automatically granted skills for display
export function getGrantedSkills(className: string, subclassName: string): string[] {
  const grantedSkills: string[] = [];
  
  const classSkill = getClassSkill(className);
  if (classSkill) {
    grantedSkills.push(classSkill);
  }
  
  const subclassSkill = getSubclassSkill(className, subclassName);
  if (subclassSkill && subclassSkill !== classSkill) {
    grantedSkills.push(subclassSkill);
  }
  
  return grantedSkills;
}

// Sistema sem limite - função mantida para compatibilidade
export function getRemainingSkillChoices(className: string, subclassName: string): number {
  return 0; // Sem limite de perícias
}