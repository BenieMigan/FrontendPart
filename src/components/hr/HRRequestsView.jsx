
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Check, X, Download, Mail } from "lucide-react";


// Mock data
const mockRequests = [
  {
    id: "1",
    applicantName: "Koffi Jean-Baptiste",
    applicantEmail: "koffi.jean@univ-cotonou.bj",
    applicantPhone: "+229 97 12 34 56",
    school: "Université d'Abomey-Calavi",
    stageType: "observation",
    startDate: "2025-07-01",
    endDate: "2025-08-31",
    requestedDepartment: "Informatique",
    status: "en_attente",
    submittedDate: "2025-06-10",
    motivation: "Découvrir le fonctionnement des systèmes portuaires",
    cv: "/documents/cv-koffi.pdf"
  },
  {
    id: "2",
    applicantName: "Akouavi Mensah",
    applicantEmail: "akouavi.m@estim.univ-lome.tg",
    applicantPhone: "+228 90 45 67 89",
    school: "ESTIM - Lomé",
    stageType: "perfectionnement",
    startDate: "2025-06-15",
    endDate: "2025-09-15",
    requestedDepartment: "Finance",
    status: "acceptee",
    submittedDate: "2025-05-25",
    motivation: "Approfondir mes connaissances en gestion financière portuaire"
  },
  {
    id: "3",
    applicantName: "Bio Saliou",
    applicantEmail: "bio.saliou@uac.bj",
    applicantPhone: "+229 95 78 90 12",
    school: "UAC - FASEG",
    stageType: "application",
    startDate: "2025-07-15",
    endDate: "2025-10-15",
    requestedDepartment: "Operations",
    status: "en_attente",
    submittedDate: "2025-06-12",
    motivation: "Mettre en pratique mes connaissances en logistique"
  }
];

export function HRRequestsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [selectedRequest, setSelectedRequest] = useState(null);

  const filteredRequests = mockRequests.filter(request => {
    const matchesSearch = request.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestedDepartment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "tous" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'en_attente':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'acceptee':
        return <Badge className="bg-green-100 text-green-800">Acceptée</Badge>;
      case 'refusee':
        return <Badge className="bg-red-100 text-red-800">Refusée</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getStageTypeBadge = (type) => {
    switch (type) {
      case 'observation':
        return <Badge variant="outline" className="text-blue-600 border-blue-600">Observation</Badge>;
      case 'perfectionnement':
        return <Badge variant="outline" className="text-purple-600 border-purple-600">Perfectionnement</Badge>;
      case 'application':
        return <Badge variant="outline" className="text-green-600 border-green-600">Application</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
    }
  };

  const handleAcceptRequest = (requestId) => {
    console.log(`Demande ${requestId} acceptée`);
    // In real app, this would update the request status and send email
  };

  const handleRejectRequest = (requestId) => {
    console.log(`Demande ${requestId} refusée`);
    // In real app, this would update the request status and send email
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  if (selectedRequest) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedRequest(null)}>
            ← Retour à la liste
          </Button>
          <h1 className="text-3xl font-bold text-port-navy">Détails de la demande</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center justify-between">
              <span>Demande de {selectedRequest.applicantName}</span>
              {getStatusBadge(selectedRequest.status)}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-port-navy mb-3">Informations personnelles</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Nom :</span> {selectedRequest.applicantName}</p>
                  <p><span className="font-medium">Email :</span> {selectedRequest.applicantEmail}</p>
                  <p><span className="font-medium">Téléphone :</span> {selectedRequest.applicantPhone}</p>
                  <p><span className="font-medium">École :</span> {selectedRequest.school}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-port-navy mb-3">Détails du stage</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Type :</span> {getStageTypeBadge(selectedRequest.stageType)}</p>
                  <p><span className="font-medium">Département :</span> {selectedRequest.requestedDepartment}</p>
                  <p><span className="font-medium">Période :</span> {new Date(selectedRequest.startDate).toLocaleDateString('fr-FR')} - {new Date(selectedRequest.endDate).toLocaleDateString('fr-FR')}</p>
                  <p><span className="font-medium">Soumise le :</span> {new Date(selectedRequest.submittedDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-port-navy mb-3">Motivation</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRequest.motivation}</p>
            </div>

            {selectedRequest.cv && (
              <div>
                <h3 className="font-semibold text-port-navy mb-3">Documents joints</h3>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger CV
                  </Button>
                </div>
              </div>
            )}

            {selectedRequest.status === "en_attente" && (
              <div className="flex gap-4 pt-4 border-t">
                <Button 
                  onClick={() => handleAcceptRequest(selectedRequest.id)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Accepter la demande
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleRejectRequest(selectedRequest.id)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Refuser la demande
                </Button>
                <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" />
                  Contacter le demandeur
                </Button>
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
        <h1 className="text-3xl font-bold text-port-navy mb-2">Gestion des Demandes de Stage</h1>
        <p className="text-gray-600">Traitement et validation des demandes entrantes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Filtres et recherche</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, école ou département..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-port-blue"
              >
                <option value="tous">Tous les statuts</option>
                <option value="en_attente">En attente</option>
                <option value="acceptee">Acceptée</option>
                <option value="refusee">Refusée</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">
            Demandes de stage ({filteredRequests.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Demandeur</TableHead>
                <TableHead>École</TableHead>
                <TableHead>Type de stage</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{request.applicantName}</div>
                      <div className="text-sm text-gray-500">{request.applicantEmail}</div>
                    </div>
                  </TableCell>
                  <TableCell>{request.school}</TableCell>
                  <TableCell>{getStageTypeBadge(request.stageType)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(request.startDate).toLocaleDateString('fr-FR')}</div>
                      <div className="text-gray-500">→ {new Date(request.endDate).toLocaleDateString('fr-FR')}</div>
                    </div>
                  </TableCell>
                  <TableCell>{request.requestedDepartment}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDetails(request)}
                        className="text-port-blue border-port-blue hover:bg-port-blue hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {request.status === "en_attente" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRejectRequest(request.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredRequests.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune demande trouvée avec ces critères de recherche.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
