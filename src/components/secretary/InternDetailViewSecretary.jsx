
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, School, Calendar, User, CheckCircle, XCircle, Clock } from "lucide-react";



export function InternDetailViewSecretary({ intern, onBack }) {
  const getStatusBadge = (status) => {
    switch (status) {
      case 'en_cours':
        return <Badge className="bg-green-100 text-green-800">En cours</Badge>;
      case 'nouveau':
        return <Badge className="bg-blue-100 text-blue-800">Nouveau</Badge>;
      case 'termine':
        return <Badge className="bg-gray-100 text-gray-800">Terminé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRequestStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      default:
        return null;
    }
  };

  const getRequestStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Approuvée';
      case 'rejected':
        return 'Refusée';
      case 'pending':
        return 'En attente';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour à la liste
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-port-navy">Fiche Stagiaire</h1>
          <p className="text-gray-600">Informations détaillées de {intern.name}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center">
              <User className="mr-2 h-5 w-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Nom complet</label>
              <p className="text-lg font-semibold text-port-navy">{intern.name}</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{intern.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{intern.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{intern.school}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center">
              <Calendar className="mr-2 h-5 w-5" />
              Informations de stage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Département</label>
              <p className="font-semibold text-port-navy">{intern.department}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Encadreur</label>
              <p className="font-semibold">{intern.supervisor}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-600">Date début</label>
                <p className="font-semibold">{new Date(intern.startDate).toLocaleDateString('fr-FR')}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-600">Date fin</label>
                <p className="font-semibold">{new Date(intern.endDate).toLocaleDateString('fr-FR')}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Statut</label>
              <div className="mt-1">{getStatusBadge(intern.status)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Statut administratif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {intern.insuranceValidated ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">Assurance validée</span>
              </div>
              <Badge variant={intern.insuranceValidated ? "default" : "destructive"}>
                {intern.insuranceValidated ? "Validée" : "En attente"}
              </Badge>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                {intern.documentsGenerated ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">Documents générés</span>
              </div>
              <Badge variant={intern.documentsGenerated ? "default" : "destructive"}>
                {intern.documentsGenerated ? "Générés" : "En attente"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Historique des demandes</CardTitle>
        </CardHeader>
        <CardContent>
          {intern.requestHistory.length > 0 ? (
            <div className="space-y-3">
              {intern.requestHistory.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getRequestStatusIcon(request.status)}
                    <div>
                      <p className="font-medium capitalize">{request.type}</p>
                      <p className="text-sm text-gray-600">{request.motif}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{getRequestStatusText(request.status)}</p>
                    <p className="text-xs text-gray-500">{new Date(request.date).toLocaleDateString('fr-FR')}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              Aucune demande dans l'historique
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
