
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Building, Settings, Save } from "lucide-react";

export function SecretaryProfileView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Mon Profil</h1>
        <p className="text-gray-600">Informations personnelles et paramètres du compte</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center">
              <User className="mr-2 h-5 w-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nom complet</Label>
              <Input 
                id="fullName"
                defaultValue="Fatima Koto"
                className="focus:ring-2 focus:ring-port-blue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email professionnel</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  id="email"
                  type="email"
                  defaultValue="f.koto@portdecotonou.bj"
                  className="pl-10 focus:ring-2 focus:ring-port-blue"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  id="phone"
                  defaultValue="+229 97 45 67 89"
                  className="pl-10 focus:ring-2 focus:ring-port-blue"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Service</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input 
                  id="department"
                  defaultValue="Secrétariat Général"
                  className="pl-10 focus:ring-2 focus:ring-port-blue"
                  readOnly
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center">
              <Settings className="mr-2 h-5 w-5" />
              Paramètres du compte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Mot de passe actuel</Label>
              <Input 
                id="currentPassword"
                type="password"
                placeholder="Entrez votre mot de passe actuel"
                className="focus:ring-2 focus:ring-port-blue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">Nouveau mot de passe</Label>
              <Input 
                id="newPassword"
                type="password"
                placeholder="Entrez un nouveau mot de passe"
                className="focus:ring-2 focus:ring-port-blue"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
              <Input 
                id="confirmPassword"
                type="password"
                placeholder="Confirmez le nouveau mot de passe"
                className="focus:ring-2 focus:ring-port-blue"
              />
            </div>
            <div className="pt-4">
              <Button className="bg-port-gold hover:bg-port-gold/90 text-white">
                Changer le mot de passe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Préférences de notification</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notifications email</p>
              <p className="text-sm text-gray-600">Recevoir les notifications par email</p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              className="h-4 w-4 text-port-blue focus:ring-port-blue border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Nouveaux stagiaires</p>
              <p className="text-sm text-gray-600">Être notifié lors de l'arrivée de nouveaux stagiaires</p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              className="h-4 w-4 text-port-blue focus:ring-port-blue border-gray-300 rounded"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Notes de service</p>
              <p className="text-sm text-gray-600">Être notifié des nouvelles notes de service</p>
            </div>
            <input 
              type="checkbox" 
              defaultChecked 
              className="h-4 w-4 text-port-blue focus:ring-port-blue border-gray-300 rounded"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button className="bg-port-blue hover:bg-port-blue/90 text-white">
          <Save className="mr-2 h-4 w-4" />
          Enregistrer les modifications
        </Button>
      </div>
    </div>
  );
}
