import { WeaponsManual } from "@/components/ui/weapons-manual";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function WeaponsManualPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-red-950/20 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Header */}
        <div className="mb-8">
          <Link href="/character">
            <Button variant="ghost" className="text-gray-300 hover:text-white mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar para Criação de Personagem
            </Button>
          </Link>
          
          <div className="text-center">
            <h1 className="font-bebas text-5xl text-red-400 tracking-wider mb-2">
              MANUAL DAS ARMAS
            </h1>
            <p className="text-gray-300 font-oswald text-lg">
              Descubra todas as armas disponíveis no Projeto Expurgo
            </p>
          </div>
        </div>

        {/* Weapons Manual Component */}
        <WeaponsManual />

        {/* Footer */}
        <div className="mt-8 text-center">
          <Link href="/dashboard">
            <Button variant="outline" className="mr-4">
              Dashboard
            </Button>
          </Link>
          <Link href="/character">
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              Criar/Editar Personagem
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}