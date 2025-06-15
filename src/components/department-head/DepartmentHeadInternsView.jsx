
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Eye } from "lucide-react";

// Données fictives des stagiaires du service
const mockInterns = [
  {
    id: "1",
    name: "Bio Saliou",
    email: "bio.saliou@email.com",
    phone: "+229 67 89 12 34",
    school: "Université d'Abomey-Calavi",
    department: "Informatique",
    supervisor: "M. Dossou",
    duration: "3 mois",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    status: "en_cours",
    documents: {
      insurance: "assurance_bio.pdf",
      assignmentLetter: "affectation_bio.pdf"
    }
  },
  {
    id: "2",
    name: "Marie Koffi",
    email: "marie.koffi@email.com",
    phone: "+229 67 89 12 35",
    school: "ESTIM",
    department: "Informatique",
    supervisor: "Mme. Agbessi",
    duration: "4 mois",
    startDate: "2025-05-15",
    endDate: "2025-09-15",
    status: "en_cours",
    documents: {
      insurance: "assurance_marie.pdf",
      assignmentLetter: "affectation_marie.pdf",
      contract: "contrat_marie.pdf"
    }
  },
  {
    id: "3",
    name: "Jean Houssou",
    email: "jean.houssou@email.com",
    phone: "+229 67 89 12 36",
    school: "IFRI",
    department: "Informatique",
    supervisor: "M. Dossou",
    duration: "2 mois",
    startDate: "2025-07-01",
    endDate: "2025-08-31",
    status: "en_attente",
    documents: {
      assignmentLetter: "affectation_jean.pdf"
    }
  }
];

const statusConfig = {
  en_cours: {
    label: "En cours",
    color: "bg-green-100 text-green-800"
  },
  en_attente: {
    label: "En attente",
    color: "bg-orange-100 text-orange-800"
  },
  termine: {
    label: "Terminé",
    color: "bg-gray-100 text-gray-800"
  }
}

export function DepartmentHeadInternsView({ onViewDetails} ) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredInterns = mockInterns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.school.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || intern.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Stagiaires du service</h1>
        <p className="text-gray-600">Service Informatique - Liste complète</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Liste des stagiaires</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtres et recherche */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom, encadreur ou école..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="en_cours">En cours</SelectItem>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="termine">Terminé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredInterns.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Aucun stagiaire trouvé.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>École</TableHead>
                  <TableHead>Encadreur</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterns.map((intern) => (
                  <TableRow key={intern.id}>
                    <TableCell className="font-medium">{intern.name}</TableCell>
                    <TableCell>{intern.school}</TableCell>
                    <TableCell>{intern.supervisor}</TableCell>
                    <TableCell>
                      {formatDate(intern.startDate)} - {formatDate(intern.endDate)}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusConfig[intern.status].color}>
                        {statusConfig[intern.status].label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => onViewDetails(intern)}
                        className="bg-port-gold hover:bg-port-gold/90 text-white"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Voir plus
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
