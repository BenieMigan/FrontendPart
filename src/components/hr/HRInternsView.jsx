
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Eye, Download, Edit, Pause, Play, X } from "lucide-react";


// Mock data
const mockInterns = [
  {
    id: "1",
    name: "Akouavi Mensah",
    email: "akouavi.m@estim.univ-lome.tg",
    phone: "+228 90 45 67 89",
    school: "ESTIM - Lomé",
    department: "Finance",
    supervisor: "Mme Sossa",
    startDate: "2025-06-15",
    endDate: "2025-09-15",
    status: "en_cours",
    stageType: "perfectionnement",
    insuranceValidated: true,
    documentsGenerated: true,
    badgeGenerated: true
  },
  {
    id: "2",
    name: "Bio Saliou",
    email: "bio.saliou@uac.bj",
    phone: "+229 95 78 90 12",
    school: "UAC - FASEG",
    department: "Operations",
    supervisor: "M. Tossou",
    startDate: "2025-07-15",
    endDate: "2025-10-15",
    status: "en_attente",
    stageType: "application",
    insuranceValidated: false,
    documentsGenerated: false,
    badgeGenerated: false
  },
  {
    id: "3",
    name: "Koffi Jean-Baptiste",
    email: "koffi.jean@univ-cotonou.bj",
    phone: "+229 97 12 34 56",
    school: "Université d'Abomey-Calavi",
    department: "Informatique",
    supervisor: "M. Dossou",
    startDate: "2025-06-01",
    endDate: "2025-08-31",
    status: "termine",
    stageType: "observation",
    insuranceValidated: true,
    documentsGenerated: true,
    badgeGenerated: true
  }
];

export function HRInternsView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("tous");
  const [departmentFilter, setDepartmentFilter] = useState("tous");
  const [selectedIntern, setSelectedIntern] = useState(null);

  const filteredInterns = mockInterns.filter(intern => {
    const matchesSearch = intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         intern.supervisor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "tous" || intern.status === statusFilter;
    const matchesDepartment = departmentFilter === "tous" || intern.department === departmentFilter;
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'en_attente':
        return <Badge className="bg-yellow-100 text-yellow-800">En attente</Badge>;
      case 'en_cours':
        return <Badge className="bg-green-100 text-green-800">En cours</Badge>;
      case 'termine':
        return <Badge className="bg-gray-100 text-gray-800">Terminé</Badge>;
      case 'suspendu':
        return <Badge className="bg-red-100 text-red-800">Suspendu</Badge>;
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

  const handleSuspendIntern = (internId) => {
    console.log(`Suspension du stagiaire ${internId}`);
    // In real app, this would update the intern status
  };

  const handleTerminateIntern = (internId) => {
    console.log(`Clôture du stage ${internId}`);
    // In real app, this would update the intern status and generate end documents
  };

  const handleDownloadDocuments = (internId) => {
    console.log(`Téléchargement des documents pour ${internId}`);
    // In real app, this would download all documents for the intern
  };

  const departments = [...new Set(mockInterns.map(intern => intern.department))];

  if (selectedIntern) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => setSelectedIntern(null)}>
            ← Retour à la liste
          </Button>
          <h1 className="text-3xl font-bold text-port-navy">Fiche de {selectedIntern.name}</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center justify-between">
              <span>{selectedIntern.name}</span>
              <div className="flex gap-2">
                {getStatusBadge(selectedIntern.status)}
                {getStageTypeBadge(selectedIntern.stageType)}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-port-navy mb-3">Informations personnelles</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Email :</span> {selectedIntern.email}</p>
                  <p><span className="font-medium">Téléphone :</span> {selectedIntern.phone}</p>
                  <p><span className="font-medium">École :</span> {selectedIntern.school}</p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-port-navy mb-3">Affectation</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Département :</span> {selectedIntern.department}</p>
                  <p><span className="font-medium">Encadreur :</span> {selectedIntern.supervisor}</p>
                  <p><span className="font-medium">Période :</span> {new Date(selectedIntern.startDate).toLocaleDateString('fr-FR')} - {new Date(selectedIntern.endDate).toLocaleDateString('fr-FR')}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-port-navy mb-3">Statut administratif</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${selectedIntern.insuranceValidated ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">Assurance {selectedIntern.insuranceValidated ? 'validée' : 'non validée'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${selectedIntern.documentsGenerated ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">Documents {selectedIntern.documentsGenerated ? 'générés' : 'non générés'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${selectedIntern.badgeGenerated ? 'bg-green-500' : 'bg-red-500'}`}></div>
                  <span className="text-sm">Badge {selectedIntern.badgeGenerated ? 'créé' : 'non créé'}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button variant="outline">
                <Edit className="h-4 w-4 mr-2" />
                Modifier affectation
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleDownloadDocuments(selectedIntern.id)}
              >
                <Download className="h-4 w-4 mr-2" />
                Télécharger documents
              </Button>
              {selectedIntern.status === "en_cours" && (
                <>
                  <Button 
                    variant="outline"
                    onClick={() => handleSuspendIntern(selectedIntern.id)}
                    className="text-orange-600 border-orange-600 hover:bg-orange-50"
                  >
                    <Pause className="h-4 w-4 mr-2" />
                    Suspendre
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleTerminateIntern(selectedIntern.id)}
                    className="text-purple-600 border-purple-600 hover:bg-purple-50"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clôturer stage
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Gestion des Stagiaires</h1>
        <p className="text-gray-600">Suivi administratif et gestion des stagiaires</p>
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
                  placeholder="Rechercher par nom, école, département..."
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
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
                <option value="suspendu">Suspendu</option>
              </select>
            </div>
            <div>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-port-blue"
              >
                <option value="tous">Tous les départements</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">
            Stagiaires ({filteredInterns.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Stagiaire</TableHead>
                <TableHead>École</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Encadreur</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInterns.map((intern) => (
                <TableRow key={intern.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{intern.name}</div>
                      <div className="text-sm text-gray-500">{intern.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{intern.school}</TableCell>
                  <TableCell>{intern.department}</TableCell>
                  <TableCell>{intern.supervisor}</TableCell>
                  <TableCell>{getStageTypeBadge(intern.stageType)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(intern.startDate).toLocaleDateString('fr-FR')}</div>
                      <div className="text-gray-500">→ {new Date(intern.endDate).toLocaleDateString('fr-FR')}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(intern.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedIntern(intern)}
                        className="text-port-blue border-port-blue hover:bg-port-blue hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadDocuments(intern.id)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
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
