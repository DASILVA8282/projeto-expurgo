import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/api";
import { AlertTriangle, Users, Zap } from "lucide-react";

export function WildCardAdmin() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: eliminatedCharacters = [] } = useQuery({
    queryKey: ["/api/admin/eliminated-characters"],
    enabled: true,
  });

  const { data: wildCardInvitations = [] } = useQuery({
    queryKey: ["/api/admin/wildcard/invitations"],
    enabled: true,
  });

  const eliminatePlayerMutation = useMutation({
    mutationFn: async (userId: number) => {
      return apiRequest("PATCH", `/api/admin/character/${userId}/eliminate`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/users"] });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/eliminated-characters"] });
      toast({
        title: "Jogador Eliminado",
        description: "O jogador foi eliminado com sucesso",
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Falha ao eliminar o jogador",
        variant: "destructive",
      });
    },
  });

  const sendWildCardInviteMutation = useMutation({
    mutationFn: async (userId: number) => {
      return apiRequest("POST", "/api/admin/wildcard/invite", { userId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/wildcard/invitations"] });
      toast({
        title: "Convite Enviado",
        description: "Convite do Wild Card enviado com sucesso!",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Erro",
        description: error.message || "Falha ao enviar convite do Wild Card",
        variant: "destructive",
      });
    },
  });

  const handleSendWildCardInvite = async (userId: number) => {
    sendWildCardInviteMutation.mutate(userId);
  };

  const handleEliminatePlayer = async (userId: number) => {
    eliminatePlayerMutation.mutate(userId);
  };

  const getInvitationStatus = (userId: number) => {
    const invitation = wildCardInvitations.find((inv: any) => inv.userId === userId);
    return invitation?.status || "none";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Pendente</Badge>;
      case "accepted":
        return <Badge variant="default" className="bg-green-500 text-white">Aceito</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejeitado</Badge>;
      default:
        return <Badge variant="outline">Sem Convite</Badge>;
    }
  };

  const pendingInvitations = wildCardInvitations.filter((inv: any) => inv.status === "pending");
  const acceptedInvitations = wildCardInvitations.filter((inv: any) => inv.status === "accepted");
  const rejectedInvitations = wildCardInvitations.filter((inv: any) => inv.status === "rejected");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-yellow-900 to-yellow-800 border-yellow-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-yellow-100">
              Convites Pendentes
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-100">
              {pendingInvitations.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900 to-green-800 border-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">
              Convites Aceitos
            </CardTitle>
            <Zap className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-100">
              {acceptedInvitations.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900 to-red-800 border-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-red-100">
              Convites Rejeitados
            </CardTitle>
            <Users className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-100">
              {rejectedInvitations.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-900 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-cyan-400" />
            Projeto Wild Card - Jogadores Eliminados
          </CardTitle>
        </CardHeader>
        <CardContent>
          {eliminatedCharacters.length === 0 ? (
            <p className="text-gray-400 text-center py-8">
              Nenhum jogador eliminado encontrado
            </p>
          ) : (
            <div className="space-y-4">
              {eliminatedCharacters.map((character: any) => {
                const invitationStatus = getInvitationStatus(character.userId);
                
                return (
                  <div
                    key={character.id}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-600"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-400 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {character.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{character.name}</h3>
                        <p className="text-sm text-gray-400">
                          {character.position} • Ranking: {character.ranking}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {invitationStatus === "none" && (
                        <>
                          {getStatusBadge(invitationStatus)}
                          <Button
                            onClick={() => handleSendWildCardInvite(character.userId)}
                            disabled={sendWildCardInviteMutation.isPending}
                            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border border-purple-400"
                          >
                            {sendWildCardInviteMutation.isPending ? "Enviando..." : "Enviar Wild Card"}
                          </Button>
                        </>
                      )}
                      
                      {invitationStatus === "pending" && (
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary" className="bg-yellow-500 text-white animate-pulse">
                            Aguardando Resposta
                          </Badge>
                          <Button
                            onClick={() => handleSendWildCardInvite(character.userId)}
                            disabled={sendWildCardInviteMutation.isPending}
                            variant="outline"
                            size="sm"
                            className="border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white"
                          >
                            Reenviar
                          </Button>
                        </div>
                      )}
                      
                      {invitationStatus === "rejected" && (
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive">Rejeitado</Badge>
                          <Button
                            onClick={() => handleSendWildCardInvite(character.userId)}
                            disabled={sendWildCardInviteMutation.isPending}
                            variant="outline"
                            size="sm"
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            Reenviar
                          </Button>
                        </div>
                      )}
                      
                      {invitationStatus === "accepted" && (
                        <Badge variant="default" className="bg-green-500 text-white">
                          Aceito
                        </Badge>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}