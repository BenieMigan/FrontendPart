
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

export function TrackingView() {
  const requests = [
    {
      id: "REQ-2024-001",
      service: "Service Commercial",
      type: "Stage d'application",
      status: "En attente",
      submittedDate: "15 janvier 2024",
      expectedResponse: "22 janvier 2024",
      lastUpdate: "Demande reçue et en cours d'examen"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "En attente":
        return <Clock className="h-4 w-4" />;
      case "Accepté":
        return <CheckCircle className="h-4 w-4" />;
      case "Refusé":
        return <XCircle className="h-4 w-4" />;
      case "Documents requis":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "En attente":
        return "bg-yellow-100 text-yellow-800";
      case "Accepté":
        return "bg-green-100 text-green-800";
      case "Refusé":
        return "bg-red-100 text-red-800";
      case "Documents requis":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Suivi de mes demandes</h1>
        <p className="text-gray-600">Consultez l'état d'avancement de vos demandes de stage</p>
      </div>

      <div className="space-y-4">
        {requests.map((request) => (
          <Card key={request.id} className="border-l-4 border-l-port-blue">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-port-navy flex items-center gap-2">
                    {getStatusIcon(request.status)}
                    Demande #{request.id}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {request.service} • {request.type}
                  </CardDescription>
                </div>
                <Badge className={getStatusColor(request.status)}>
                  {request.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Date de soumission</p>
                  <p className="text-sm text-gray-600">{request.submittedDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Réponse attendue</p>
                  <p className="text-sm text-gray-600">{request.expectedResponse}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Dernière mise à jour</p>
                  <p className="text-sm text-gray-600">{request.lastUpdate}</p>
                </div>
              </div>

              {/* Timeline de progression */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-port-blue rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-port-navy">Demande soumise</p>
                    <p className="text-xs text-gray-600">{request.submittedDate}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-port-navy">En cours d'examen</p>
                    <p className="text-xs text-gray-600">Délai estimé : 5-7 jours ouvrables</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-400">Décision finale</p>
                    <p className="text-xs text-gray-400">En attente</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {requests.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune demande en cours</h3>
            <p className="text-gray-500">Vous n'avez aucune demande de stage en cours de traitement.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
