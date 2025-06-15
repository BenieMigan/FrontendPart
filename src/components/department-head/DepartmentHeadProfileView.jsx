
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { User, Building, Mail, Phone, Key, Settings } from "lucide-react";

export function DepartmentHeadProfileView() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Mon profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations personnelles */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input id="firstName" defaultValue="Jean-Baptiste" />
                </div>
                <div>
                  <Label htmlFor="lastName">Nom</Label>
                  <Input id="lastName" defaultValue="DOSSOU" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="j.dossou@portdecotonou.bj" />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input id="phone" defaultValue="+229 67 89 12 34" />
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="department">Service</Label>
                  <Input id="department" defaultValue="Informatique" disabled />
                </div>
                <div>
                  <Label htmlFor="position">Poste</Label>
                  <Input id="position" defaultValue="Chef de Service" disabled />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button className="bg-port-blue hover:bg-port-blue/90">
                  Mettre à jour
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Changement de mot de passe */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-port-navy flex items-center">
                <Key className="h-5 w-5 mr-2" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <Input id="currentPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmer le nouveau mot de passe</Label>
                <Input id="confirmPassword" type="password" />
              </div>
              
              <div className="flex justify-end">
                <Button variant="outline">
                  Changer le mot de passe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Informations du service */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy flex items-center">
                <Building className="h-5 w-5 mr-2" />
                Mon service
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-600">Service</Label>
                <p className="text-lg font-medium">Informatique</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Stagiaires actuels</Label>
                <p className="text-lg font-medium">12</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Encadreurs</Label>
                <p className="text-lg font-medium">3</p>
              </div>
              
              <Separator />
              
              <div>
                <Label className="text-sm font-medium text-gray-600">Contact service</Label>
                <div className="space-y-2 mt-2">
                  <p className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-gray-400" />
                    informatique@portdecotonou.bj
                  </p>
                  <p className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    +229 21 31 52 60
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Préférences */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-port-navy flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Préférences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="notifications">Notifications email</Label>
                <input type="checkbox" id="notifications" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="reports">Rapports automatiques</Label>
                <input type="checkbox" id="reports" defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="reminders">Rappels</Label>
                <input type="checkbox" id="reminders" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
