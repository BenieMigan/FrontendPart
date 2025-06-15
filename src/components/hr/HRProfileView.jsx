
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Phone, Building, Calendar, Edit } from "lucide-react";

export function HRProfileView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Profil RH</h1>
        <p className="text-gray-600">Informations personnelles et préférences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nom complet
                </label>
                <Input value="Adjoa KOFFI" readOnly />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Poste
                </label>
                <Input value="Responsable Ressources Humaines" readOnly />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email professionnel
                </label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <Input value="adjoa.koffi@portdecotonou.bj" readOnly />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Téléphone
                </label>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <Input value="+229 21 31 25 90" readOnly />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Département
                </label>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-400" />
                  <Input value="Direction des Ressources Humaines" readOnly />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date d'embauche
                </label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <Input value="15/03/2018" readOnly />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button className="bg-port-blue hover:bg-port-blue/90 text-white">
                <Edit className="h-4 w-4 mr-2" />
                Modifier les informations
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy">Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Gestion demandes</span>
                  <Badge className="bg-green-100 text-green-800">Accordée</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Validation assurances</span>
                  <Badge className="bg-green-100 text-green-800">Accordée</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Génération documents</span>
                  <Badge className="bg-green-100 text-green-800">Accordée</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Publication notes</span>
                  <Badge className="bg-green-100 text-green-800">Accordée</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Administration système</span>
                  <Badge className="bg-green-100 text-green-800">Accordée</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy">Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Demandes traitées</span>
                  <Badge variant="outline">127</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Assurances validées</span>
                  <Badge variant="outline">89</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Documents générés</span>
                  <Badge variant="outline">267</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Notes publiées</span>
                  <Badge variant="outline">23</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
