
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Eye, Download, Clock, Calendar, AlertCircle } from "lucide-react";


// Mock data
const mockInternRequests = [
  {
    id: "1",
    internId: "intern_1",
    internName: "Akouavi Mensah",
    type: "absence",
    submittedDate: "2025-06-14",
    status: "en_attente",
    startDate: "2025-06-20",
    endDate: "2025-06-20",
    reason: "Rendez-vous médical urgent"
  },
  {
    id: "2",
    internId: "intern_2",
    internName: "Bio Saliou",
    type: "pause",
    submittedDate: "2025-06-13",
    status: "en_attente",
    startDate: "2025-07-01",
    endDate: "2025-07-15",
    reason: "Examens de fin d'année universitaire"
  },
  {
    id: "3",
    internId: "intern_3",
    internName: "Koffi Jean-Baptiste",
    type: "reprise",
    submittedDate: "2025-06-12",
    status: "approuvee",
    startDate: "2025-06-15",
    reason: "Reprise après pause autorisée",
    hrResponse: "Reprise autorisée. Bienvenue de retour !",
    responseDate: "2025-06-12"
  }
];

export function HRInternRequestsView() {
  const [requests, setRequests] = useState(mockInternRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [response, setResponse] = useState("");

  const getStatusBadge = (status) => {
    switch (status) {
      case 'en_attente':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'approuvee':
        return <Badge className="bg-green-100 text-green-800">Approuvée</Badge>;
      case 'refusee':
        return <Badge className="bg-red-100 text-red-800">Refusée</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getRequestTypeIcon = (type) => {
    switch (type) {
      case 'absence':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'pause':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'reprise':
        return <Calendar className="h-4 w-4 text-green-500" />;
      default:
        return null;
    }
  };

  const getRequestTypeBadge = (type) => {
    switch (type) {
      case 'absence':
        return <Badge variant="outline" className="text-red-600 border-red-600">Absence</Badge>;
      case 'pause':
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600">Pause</Badge>;
      case 'reprise':
        return <Badge variant="outline" className="text-green-600 border-green-600">Reprise</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleApproveRequest = (requestId) => {
    if (!response.trim()) {
      alert("Veuillez ajouter un commentaire de réponse");
      return;
    }

    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: "approuvee",
          hrResponse: response,
          responseDate: new Date().toISOString().split('T')[0]
        };
      }
      return req;
    }));

    setResponse("");
    setSelectedRequest(null);
    console.log(`Demande ${requestId} approuvée avec commentaire: ${response}`);
  };

  const handleRejectRequest = (requestId) => {
    if (!response.trim()) {
      alert("Veuillez ajouter un commentaire expliquant le refus");
      return;
    }

    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: "refusee" ,
          hrResponse: response,
          responseDate: new Date().toISOString().split('T')[0]
        };
      }
      return req;
    }));

    setResponse("");
    setSelectedRequest(null);
    console.log(`Demande ${requestId} refusée avec commentaire: ${response}`);
  };

  const pendingRequests = requests.filter(req => req.status === "en_attente");
  const processedRequests = requests.filter(req => req.status !== "en_attente");

  if (selectedRequest) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedRequest(null)}>
            ← Retour à la liste
          </Button>
          <h1 className="text-3xl font-bold text-port-navy">Traitement de la demande</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center justify-between">
              <span>Demande de {selectedRequest.internName}</span>
              <div className="flex gap-2">
                {getRequestTypeBadge(selectedRequest.type)}
                {getStatusBadge(selectedRequest.status)}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-port-navy mb-3">Détails de la demande</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Stagiaire :</span> {selectedRequest.internName}</p>
                  <p><span className="font-medium">Type :</span> {getRequestTypeBadge(selectedRequest.type)}</p>
                  <p><span className="font-medium">Soumise le :</span> {new Date(selectedRequest.submittedDate).toLocaleDateString('fr-FR')}</p>
                  {selectedRequest.startDate && (
                    <p><span className="font-medium">Date de début :</span> {new Date(selectedRequest.startDate).toLocaleDateString('fr-FR')}</p>
                  )}
                  {selectedRequest.endDate && (
                    <p><span className="font-medium">Date de fin :</span> {new Date(selectedRequest.endDate).toLocaleDateString('fr-FR')}</p>
                  )}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-port-navy mb-3">Motif</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRequest.reason}</p>
              </div>
            </div>

            {selectedRequest.justificationFile && (
              <div>
                <h3 className="font-semibold text-port-navy mb-3">Pièce justificative</h3>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger la pièce jointe
                </Button>
              </div>
            )}

            {selectedRequest.status === "en_attente" && (
              <div className="space-y-4 pt-4 border-t">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Commentaire de réponse *
                  </label>
                  <Textarea
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Ajoutez votre commentaire de réponse (obligatoire)..."
                    rows={3}
                  />
                </div>
                <div className="flex gap-4">
                  <Button 
                    onClick={() => handleApproveRequest(selectedRequest.id)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                    disabled={!response.trim()}
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Approuver
                  </Button>
                  <Button 
                    variant="destructive"
                    onClick={() => handleRejectRequest(selectedRequest.id)}
                    disabled={!response.trim()}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Refuser
                  </Button>
                </div>
              </div>
            )}

            {selectedRequest.hrResponse && (
              <div className="pt-4 border-t">
                <h3 className="font-semibold text-port-navy mb-2">Réponse RH</h3>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-gray-700">{selectedRequest.hrResponse}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Répondue le {selectedRequest.responseDate && new Date(selectedRequest.responseDate).toLocaleDateString('fr-FR')}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Gestion des Demandes Internes</h1>
        <p className="text-gray-600">Traitement des demandes d'absence, pause et reprise</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">En attente</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{pendingRequests.length}</div>
            <p className="text-xs text-gray-500">
              À traiter
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Approuvées</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">
              {requests.filter(req => req.status === "approuvee").length}
            </div>
            <p className="text-xs text-gray-500">
              Cette semaine
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Refusées</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">
              {requests.filter(req => req.status === "refusee").length}
            </div>
            <p className="text-xs text-gray-500">
              Cette semaine
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Demandes en attente */}
      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-500" />
              Demandes en attente ({pendingRequests.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stagiaire</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date soumission</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="font-medium">{request.internName}</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getRequestTypeIcon(request.type)}
                        {getRequestTypeBadge(request.type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {new Date(request.submittedDate).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      {request.startDate && request.endDate ? (
                        <div className="text-sm">
                          <div>{new Date(request.startDate).toLocaleDateString('fr-FR')}</div>
                          <div className="text-gray-500">→ {new Date(request.endDate).toLocaleDateString('fr-FR')}</div>
                        </div>
                      ) : request.startDate ? (
                        new Date(request.startDate).toLocaleDateString('fr-FR')
                      ) : '-'}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-48 truncate" title={request.reason}>
                        {request.reason}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedRequest(request)}
                        className="text-port-blue border-port-blue hover:bg-port-blue hover:text-white"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Traiter
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Demandes traitées */}
      {processedRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy">Demandes traitées ({processedRequests.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stagiaire</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date traitement</TableHead>
                  <TableHead>Réponse RH</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell>
                      <div className="font-medium">{request.internName}</div>
                    </TableCell>
                    <TableCell>{getRequestTypeBadge(request.type)}</TableCell>
                    <TableCell>{getStatusBadge(request.status)}</TableCell>
                    <TableCell>
                      {request.responseDate && new Date(request.responseDate).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-48 truncate" title={request.hrResponse}>
                        {request.hrResponse}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {requests.length === 0 && (
        <Card>
          <CardContent className="text-center py-8 text-gray-500">
            <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucune demande interne pour le moment</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
