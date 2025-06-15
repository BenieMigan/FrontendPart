
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, XCircle, Clock, Filter } from "lucide-react";

// Données fictives pour la démonstration
const mockRequests= [
  {
    id: "1",
    type: "absence",
    submittedDate: "2025-06-12",
    status: "approuvee",
    responseComment: "Accordé par encadrant",
    motif: "Visite médicale",
    dateAbsence: "2025-06-15"
  },
  {
    id: "2",
    type: "pause",
    submittedDate: "2025-06-15",
    status: "en_attente",
    motif: "Raisons personnelles",
    dateDebut: "2025-06-20",
    dureeJours: 3
  },
  {
    id: "3",
    type: "reprise",
    submittedDate: "2025-06-22",
    status: "refusee",
    responseComment: "Date trop proche",
    dateReprise: "2025-06-23"
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
    icon: CheckCircle
  },
  refusee: {
    label: "Refusée",
    color: "bg-red-100 text-red-800",
    icon: XCircle
  }
};

const typeLabels = {
  absence: "Absence",
  pause: "Pause",
  reprise: "Reprise"
};

export function RequestsTable() {
  const [filterType, setFilterType] = useState("all");
  
  const filteredRequests = filterType === "all" 
    ? mockRequests 
    : mockRequests.filter(req => req.type === filterType);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-port-navy">Mes demandes</CardTitle>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filterType} onValueChange={(value) => setFilterType(value )}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filtrer par type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="absence">Absence</SelectItem>
                <SelectItem value="pause">Pause</SelectItem>
                <SelectItem value="reprise">Reprise</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredRequests.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-700 mb-2">Aucune demande</h3>
            <p className="text-gray-500">
              {filterType === "all" 
                ? "Vous n'avez encore fait aucune demande." 
                : `Aucune demande de ${typeLabels[filterType]} trouvée.`}
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type de demande</TableHead>
                <TableHead>Date de soumission</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Commentaire de réponse</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => {
                const StatusIcon = statusConfig[request.status].icon;
                return (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">
                      {typeLabels[request.type]}
                    </TableCell>
                    <TableCell>
                      {formatDate(request.submittedDate)}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[request.status].color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {statusConfig[request.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {request.responseComment || "—"}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
