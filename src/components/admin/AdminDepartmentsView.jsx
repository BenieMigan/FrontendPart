
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Users, Building2 } from "lucide-react";


// Mock data
const mockDepartments = [
  {
    id: "1",
    name: "Finance et Comptabilité",
    headId: "head1",
    headName: "Mme Adjoua Sossa",
    internCount: 8,
    status: "active"
  },
  {
    id: "2",
    name: "Opérations Portuaires",
    headId: "head2",
    headName: "M. Jean Tossou",
    internCount: 15,
    status: "active"
  },
  {
    id: "3",
    name: "Informatique et Télécoms",
    headId: "head3",
    headName: "M. Kofi Mensah",
    internCount: 6,
    status: "active"
  },
  {
    id: "4",
    name: "Ressources Humaines",
    headId: "head4",
    headName: "Mme Marie Kouassi",
    internCount: 3,
    status: "active"
  }
];

export function AdminDepartmentsView() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusBadge = (status) => {
    return status === 'active' ? 
      <Badge className="bg-green-100 text-green-800">Actif</Badge> :
      <Badge className="bg-gray-100 text-gray-800">Inactif</Badge>;
  };

  const totalInterns = departments.reduce((sum, dept) => sum + dept.internCount, 0);
  const activeDepartments = departments.filter(d => d.status === 'active').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-port-navy mb-2">Gestion des Départements</h1>
          <p className="text-gray-600">Administration des structures organisationnelles</p>
        </div>
        
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-port-gold hover:bg-port-gold/90 text-port-navy">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau département
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un nouveau département</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="deptName">Nom du département</Label>
                <Input id="deptName" placeholder="Ex: Marketing et Communication" />
              </div>
              <div>
                <Label htmlFor="deptHead">Chef de département</Label>
                <Input id="deptHead" placeholder="Nom du responsable" />
              </div>
              <div className="flex gap-2">
                <Button onClick={() => setIsCreateDialogOpen(false)} variant="outline" className="flex-1">
                  Annuler
                </Button>
                <Button className="flex-1 bg-port-blue hover:bg-port-blue/90">
                  Créer le département
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-port-navy">{departments.length}</div>
                <div className="text-sm text-gray-600">Départements totaux</div>
              </div>
              <Building2 className="h-8 w-8 text-port-blue" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">{activeDepartments}</div>
                <div className="text-sm text-gray-600">Actifs</div>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-port-blue">{totalInterns}</div>
                <div className="text-sm text-gray-600">Stagiaires totaux</div>
              </div>
              <Users className="h-8 w-8 text-port-blue" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-port-gold">
                  {Math.round(totalInterns / activeDepartments)}
                </div>
                <div className="text-sm text-gray-600">Stagiaires/dept</div>
              </div>
              <div className="w-3 h-3 bg-port-gold rounded-full"></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Table des départements */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Liste des Départements ({departments.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Département</TableHead>
                <TableHead>Chef de département</TableHead>
                <TableHead>Stagiaires</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  <TableCell>
                    <div className="font-medium">{department.name}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-port-blue/10 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-port-blue" />
                      </div>
                      <span>{department.headName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{department.internCount}</Badge>
                      <span className="text-sm text-gray-500">stagiaires</span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(department.status)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Répartition des stagiaires par département */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Répartition des Stagiaires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {departments.map((dept) => (
              <div key={dept.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{dept.name}</div>
                  <div className="text-sm text-gray-500">{dept.headName}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-port-navy">{dept.internCount}</div>
                    <div className="text-xs text-gray-500">stagiaires</div>
                  </div>
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-port-blue h-2 rounded-full" 
                      style={{ width: `${(dept.internCount / Math.max(...departments.map(d => d.internCount))) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
