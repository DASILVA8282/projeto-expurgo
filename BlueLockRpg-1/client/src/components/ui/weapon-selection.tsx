import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { weaponsData, getAllWeaponCategories, getWeaponsByCategory, type Weapon } from "@/data/weapons";
import { Swords, Shield, Cog, Dumbbell, Brain, ChevronRight, Star } from "lucide-react";
import { Link } from "wouter";

interface WeaponSelectionProps {
  selectedWeapon: string;
  onWeaponSelect: (weaponId: string) => void;
}

const categoryIcons = {
  'Ofensivo': Swords,
  'Defensivo': Shield,
  'Técnico': Cog,
  'Físico': Dumbbell,
  'Mental': Brain
};

const categoryColors = {
  'Ofensivo': 'destructive',
  'Defensivo': 'secondary',
  'Técnico': 'default',
  'Físico': 'outline',
  'Mental': 'secondary'
};

export function WeaponSelection({ selectedWeapon, onWeaponSelect }: WeaponSelectionProps) {
  const [selectedCategory, setSelectedCategory] = useState('Ofensivo');
  const [viewingWeapon, setViewingWeapon] = useState<Weapon | null>(null);
  const categories = getAllWeaponCategories();

  const handleWeaponView = (weapon: Weapon) => {
    setViewingWeapon(weapon);
  };

  const handleWeaponSelect = (weaponId: string) => {
    onWeaponSelect(weaponId);
    setViewingWeapon(null);
  };

  if (viewingWeapon) {
    return (
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setViewingWeapon(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                ← Voltar
              </Button>
              <div>
                <CardTitle className="flex items-center gap-2">
                  {(() => {
                    const Icon = categoryIcons[viewingWeapon.category as keyof typeof categoryIcons];
                    return <Icon className="h-5 w-5" />;
                  })()}
                  {viewingWeapon.name}
                </CardTitle>
                <Badge variant={categoryColors[viewingWeapon.category as keyof typeof categoryColors] as any}>
                  {viewingWeapon.category}
                </Badge>
              </div>
            </div>
            <Button 
              onClick={() => handleWeaponSelect(viewingWeapon.id)}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Selecionar Arma
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {viewingWeapon.description}
            </p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Especializações
            </h4>
            <div className="flex flex-wrap gap-2">
              {viewingWeapon.specialization.map((spec, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
              Níveis da Arma
            </h4>
            <ScrollArea className="h-64">
              <div className="space-y-3 pr-4">
                {viewingWeapon.levels.map((level, index) => (
                  <div key={index} className="border rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <h5 className="font-medium">
                        Nível {index + 1}: {level.name}
                      </h5>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {level.description}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Seleção de Arma</CardTitle>
            <p className="text-sm text-muted-foreground">
              Escolha uma arma que definirá o estilo de jogo do seu personagem
            </p>
          </div>
          <Link href="/weapons-manual">
            <Button variant="outline" size="sm" className="text-xs">
              📖 Manual
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5">
            {categories.map((category) => {
              const Icon = categoryIcons[category as keyof typeof categoryIcons];
              return (
                <TabsTrigger 
                  key={category} 
                  value={category}
                  className="flex items-center gap-1 text-xs"
                >
                  {Icon ? <Icon className="h-3 w-3" /> : null}
                  {category}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-4">
              <ScrollArea className="h-96">
                <div className="grid gap-3 pr-4">
                  {getWeaponsByCategory(category).map((weapon) => (
                    <Card 
                      key={weapon.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedWeapon === weapon.id 
                          ? 'ring-2 ring-red-600 bg-red-950/30 border-red-600' 
                          : 'hover:bg-muted/50'
                      }`}
                      onClick={() => handleWeaponView(weapon)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold">{weapon.name}</h3>
                              {selectedWeapon === weapon.id && (
                                <Badge className="bg-red-600 text-white text-xs">
                                  Selecionada
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2">
                              {weapon.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {weapon.specialization.slice(0, 3).map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                              {weapon.specialization.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{weapon.specialization.length - 3}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>

        {selectedWeapon && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-green-600 fill-green-600" />
              <p className="text-sm text-green-800 dark:text-green-200">
                Arma selecionada: <strong>
                  {weaponsData.find(w => w.id === selectedWeapon)?.name}
                </strong>
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}