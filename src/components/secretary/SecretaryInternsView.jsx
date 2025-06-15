
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Search, Eye, Filter } from "lucide-react";

// Mock data
const mockInterns = [
  {
    id: "1",
    name: "Akouavi Togbé",
    email: "akouavi.togbe@email.com",
    phone: "+229 97 12 34 56",
    school: "Université d'Abomey-Calavi",
    department: "Finance",
    supervisor: "Mme Sossa",
    startDate: "2025-06-03",
    endDate: "2025-09-03",
    status: "en_cours",
    insuranceValidated: true,
    documentsGenerated: true,
    requestHistory: []
  },
  {
    id: "2",
    name: "Kossi Rodrigue",
    email: "kossi.rodrigue@email.com",
    phone: "+229 96 78 90 12",
    school: "EPAC - Université d'Abomey-Calavi",
    department: "Informatique",
    supervisor: "M. Dossou",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    status: "en_cours",
    insuranceValidated: true,
    documentsGenerated: false,
    requestHistory: [
      {
        id: "req1",
        type: "absence",
        date: "2025-06-20",
        status: "approved",
        motif: "Urgence familiale"
      }
    ]
  },
  {
    id: "3",
    name: "Marie Adjovi",
    email: "marie.adjovi@email.com",
    phone: "+229 95 45 67 89",
    school: "École Supérieure de Commerce",
    department: "Finance",
    supervisor: "Mme Sossa",
    startDate: "2025-06-15",
    endDate: "2025-08-15",
    status: "nouveau",
    insuranceValidated: false,
    documentsGenerated: false,
    requestHistory: []
  }
];


export function SecretaryInternsView({ onViewDetails} ) {
  const [searchTerm, setSearchTerm] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");

  const filteredInterns = mockInterns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = departmentFilter === "all" || intern.department === departmentFilter;
    
    return matchesSearch && matchesDepartment;
  });

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Stagiaires Actifs</h1>
        <p className="text-gray-600">Liste de tous les stagiaires en activité dans l'entreprise</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Recherche et filtres</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, département ou encadreur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-port-blue"
              >
                <option value="all">Tous les départements</option>
                <option value="Finance">Finance</option>
                <option value="Informatique">Informatique</option>
                <option value="Logistique">Logistique</option>
                <option value="RH">Ressources Humaines</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">
            Liste des stagiaires ({filteredInterns.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Date début</TableHead>
                <TableHead>Encadreur</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell className="font-medium">{intern.name}</TableCell>
                  <TableCell>{intern.department}</TableCell>
                  <TableCell>{new Date(intern.startDate).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{intern.supervisor}</TableCell>
                  <TableCell>{getStatusBadge(intern.status)}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      onClick={() => onViewDetails(intern)}
                      className="bg-port-gold hover:bg-port-gold/90 text-white"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Fiche
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredInterns.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun stagiaire trouvé avec ces critères de recherche.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
