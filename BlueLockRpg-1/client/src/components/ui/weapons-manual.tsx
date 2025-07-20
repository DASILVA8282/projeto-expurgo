import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { weaponsData, type Weapon } from "@/data/weapons";
import { 
  ChevronLeft, 
  ChevronRight, 
  Swords, 
  Shield, 
  Cog, 
  Dumbbell, 
  Brain, 
  Star,
  BookOpen
} from "lucide-react";

const categoryIcons = {
  'Ofensivo': Swords,
  'Defensivo': Shield,
  'Técnico': Cog,
  'Físico': Dumbbell,
  'Mental': Brain
};

export function WeaponsManual() {
  const [currentWeaponIndex, setCurrentWeaponIndex] = useState(0);
  const currentWeapon = weaponsData[currentWeaponIndex];

  const goToPrevious = () => {
    setCurrentWeaponIndex(prev => 
      prev === 0 ? weaponsData.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentWeaponIndex(prev => 
      prev === weaponsData.length - 1 ? 0 : prev + 1
    );
  };

  const CategoryIcon = categoryIcons[currentWeapon.category as keyof typeof categoryIcons];

  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card className="w-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-red-600" />
              <div>
                <CardTitle className="text-2xl">Manual das Armas</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {currentWeaponIndex + 1} de {weaponsData.length} armas
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={goToPrevious}
                className="flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={goToNext}
                className="flex items-center gap-1"
              >
                Próxima
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Weapon Header */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3">
              <CategoryIcon className="h-8 w-8 text-red-600" />
              <h1 className="text-3xl font-bold text-red-600">
                {currentWeapon.name}
              </h1>
            </div>
            
            <Badge 
              variant="outline" 
              className="text-sm px-3 py-1"
            >
              {currentWeapon.category}
            </Badge>
          </div>

          {/* Weapon Description */}
          <div className="bg-muted rounded-lg p-6">
            <h3 className="font-semibold mb-3 text-lg">Descrição</h3>
            <p className="text-muted-foreground leading-relaxed">
              {currentWeapon.description}
            </p>
          </div>

          {/* Specializations */}
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Especializações</h3>
            <div className="flex flex-wrap gap-2">
              {currentWeapon.specialization.map((spec, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {spec}
                </Badge>
              ))}
            </div>
          </div>

          {/* Weapon Levels */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Níveis da Arma</h3>
            <ScrollArea className="h-96 w-full">
              <div className="space-y-4 pr-4">
                {currentWeapon.levels.map((level, index) => (
                  <Card key={index} className="border-2">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-3 text-lg">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                          <span className="text-red-600 font-bold">
                            Nível {index + 1}
                          </span>
                        </div>
                        <span className="text-foreground">
                          {level.name}
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-muted-foreground leading-relaxed">
                        {level.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Navigation indicators */}
          <div className="flex justify-center">
            <div className="flex gap-2">
              {weaponsData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentWeaponIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentWeaponIndex 
                      ? 'bg-red-600' 
                      : 'bg-muted hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="border-t pt-4">
            <h4 className="text-sm font-medium text-muted-foreground mb-3">
              Navegação Rápida
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {weaponsData.map((weapon, index) => {
                const Icon = categoryIcons[weapon.category as keyof typeof categoryIcons];
                return (
                  <Button
                    key={weapon.id}
                    variant={index === currentWeaponIndex ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentWeaponIndex(index)}
                    className={`justify-start text-left h-auto py-2 ${
                      index === currentWeaponIndex 
                        ? "bg-red-600 hover:bg-red-700 text-white" 
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <Icon className="h-3 w-3 flex-shrink-0" />
                      <span className="truncate text-xs">
                        {weapon.name}
                      </span>
                    </div>
                  </Button>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}