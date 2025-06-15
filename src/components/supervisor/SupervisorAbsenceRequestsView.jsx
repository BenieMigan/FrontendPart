
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Check, X, Download, MessageSquare, Clock } from "lucide-react";

// Données fictives des demandes d'absence
const mockAbsenceRequests = [
  {
    id: "1",
    internId: "2",
    internName: "Aminata Bio",
    requestedDate: "2025-06-20",
    reason: "Urgence familiale",
    justificationFile: "justificatif_aminata.pdf",
    status: "en_attente",
    submittedDate: "2025-06-18"
  },
  {
    id: "2",
    internId: "1",
    internName: "Kossi Rodrigue",
    requestedDate: "2025-06-25",
    reason: "Rendez-vous médical",
    justificationFile: "certificat_medical.pdf",
    status: "approuvee",
    supervisorComment: "Absence justifiée, accordée",
    submittedDate: "2025-06-20"
  }
];

const statusConfig = {
  en_attente: {
    label: "En attente",
    color: "bg-orange-100 text-orange-800",
    icon: Clock
  },
  approuvee: {
    label: "Approuvée",
    color: "bg-green-100 text-green-800",
    icon: Check
  },
  refusee: {
    label: "Refusée",
    color: "bg-red-100 text-red-800",
    icon: X
  }
};

export function SupervisorAbsenceRequestsView() {
  const [requests, setRequests] = useState(mockAbsenceRequests);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [supervisorComment, setSupervisorComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleDecision = async (requestId, decision) => {
    setRequests(prevRequests =>
      prevRequests.map(request =>
        request.id === requestId
          ? { ...request, status: decision, supervisorComment }
          : request
      )
    );

    const actionText = decision === 'approuvee' ? 'approuvée' : 'refusée';
    toast({
      title: "Demande traitée",
      description: `La demande a été ${actionText}. Le stagiaire sera notifié.`,
      variant: "default",
    });

    setIsDialogOpen(false);
    setSupervisorComment("");
    setSelectedRequest(null);
  };

  const openDecisionDialog = (request) => {
    setSelectedRequest(request);
    setSupervisorComment(request.supervisorComment || "");
    setIsDialogOpen(true);
  };

  const downloadFile = (filename) => {
    // Simulation du téléchargement
    toast({
      title: "Téléchargement",
      description: `Téléchargement de ${filename} en cours...`,
      variant: "default",
    });
  };

  const pendingRequests = requests.filter(r => r.status === 'en_attente');
  const processedRequests = requests.filter(r => r.status !== 'en_attente');

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Demandes d'absence</h1>
        <p className="text-gray-600">Traitez les demandes d'absence de vos stagiaires</p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{pendingRequests.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approuvées</CardTitle>
            <Check className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {requests.filter(r => r.status === 'approuvee').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refusées</CardTitle>
            <X className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {requests.filter(r => r.status === 'refusee').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Demandes en attente */}
      {pendingRequests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Demandes en attente de traitement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stagiaire</TableHead>
                  <TableHead>Date demandée</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Justificatif</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.internName}</TableCell>
                    <TableCell>{formatDate(request.requestedDate)}</TableCell>
                    <TableCell>{request.reason}</TableCell>
                    <TableCell>
                      {request.justificationFile ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(request.justificationFile != null)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Télécharger
                        </Button>
                      ) : (
                        <span className="text-gray-400">Aucun fichier</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => openDecisionDialog(request)}
                        >
                          <Check className="h-4 w-4 mr-1" />
                          Traiter
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Historique des demandes traitées */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Historique des demandes</CardTitle>
        </CardHeader>
        <CardContent>
          {processedRequests.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune demande traitée</h3>
              <p className="text-gray-500">Les demandes que vous avez traitées apparaîtront ici.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stagiaire</TableHead>
                  <TableHead>Date demandée</TableHead>
                  <TableHead>Motif</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Commentaire</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {processedRequests.map((request) => {
                  const StatusIcon = statusConfig[request.status].icon;
                  return (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.internName}</TableCell>
                      <TableCell>{formatDate(request.requestedDate)}</TableCell>
                      <TableCell>{request.reason}</TableCell>
                      <TableCell>
                        <Badge className={statusConfig[request.status].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[request.status].label}
                        </Badge>
                      </TableCell>
                      <TableCell>{request.supervisorComment || "—"}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Dialog de décision */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Traiter la demande d'absence</DialogTitle>
            <DialogDescription>
              Demande de {selectedRequest?.internName} pour le {selectedRequest && formatDate(selectedRequest.requestedDate)}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Motif :</label>
              <p className="text-sm text-gray-600 mt-1">{selectedRequest?.reason}</p>
            </div>
            
            <div>
              <label htmlFor="comment" className="text-sm font-medium text-gray-700">
                Commentaire de réponse (optionnel) :
              </label>
              <Textarea
                id="comment"
                placeholder="Ajoutez un commentaire pour expliquer votre décision..."
                value={supervisorComment}
                onChange={(e) => setSupervisorComment(e.target.value)}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={() => selectedRequest && handleDecision(selectedRequest.id, 'refusee')}
            >
              <X className="h-4 w-4 mr-1" />
              Refuser
            </Button>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => selectedRequest && handleDecision(selectedRequest.id, 'approuvee')}
            >
              <Check className="h-4 w-4 mr-1" />
              Approuver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
