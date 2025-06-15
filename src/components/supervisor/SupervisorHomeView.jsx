
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Users, Filter } from "lucide-react";

// Données fictives des stagiaires
const mockInterns = [
  {
    id: "1",
    name: "Kossi Rodrigue",
    department: "Informatique",
    duration: "3 mois",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    status: "en_cours"
  },
  {
    id: "2",
    name: "Aminata Bio",
    department: "Logistique",
    duration: "2 mois",
    startDate: "2025-06-15",
    endDate: "2025-08-15",
    status: "en_attente"
  },
  {
    id: "3",
    name: "Jean-Baptiste Doe",
    department: "Finance",
    duration: "4 mois",
    startDate: "2025-05-01",
    endDate: "2025-08-31",
    status: "en_cours"
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
};

export function SupervisorHomeView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  const departments = ["all", "Informatique", "Logistique", "Finance"];

  const filteredInterns = mockInterns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          intern.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = filterDepartment === "all" || intern.department === filterDepartment;
    const matchesStatus = filterStatus === "all" || intern.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Mes stagiaires</h1>
        <p className="text-gray-600">Gérez et suivez vos stagiaires affectés</p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total stagiaires</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockInterns.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockInterns.filter(i => i.status === 'en_cours').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {mockInterns.filter(i => i.status === 'en_attente').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Liste des stagiaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Rechercher par nom ou département..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-2">
              <Select value={filterDepartment} onValueChange={setFilterDepartment}>
                <SelectTrigger className="w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>
                      {dept === "all" ? "Tous les départements" : dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-40">
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
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Aucun stagiaire trouvé</h3>
              <p className="text-gray-500">Aucun stagiaire ne correspond à vos critères de recherche.</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom du stagiaire</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Durée du stage</TableHead>
                  <TableHead>Date de début</TableHead>
                  <TableHead>Date de fin</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInterns.map((intern) => (
                  <TableRow key={intern.id}>
                    <TableCell className="font-medium">{intern.name}</TableCell>
                    <TableCell>{intern.department}</TableCell>
                    <TableCell>{intern.duration}</TableCell>
                    <TableCell>{formatDate(intern.startDate)}</TableCell>
                    <TableCell>{formatDate(intern.endDate)}</TableCell>
                    <TableCell>
                      <Badge className={statusConfig[intern.status].color}>
                        {statusConfig[intern.status].label}
                      </Badge>
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
