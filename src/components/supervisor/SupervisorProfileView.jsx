
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Phone, Building } from "lucide-react";

export function SupervisorProfileView() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Mon profil</h1>
        <p className="text-gray-600">Gérez vos informations personnelles</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations personnelles
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  defaultValue="Jean"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  defaultValue="Dupont"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="jean.dupont@portdecotonou.bj"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Téléphone
              </Label>
              <Input
                id="phone"
                defaultValue="+229 21 31 25 25"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="department" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Département
              </Label>
              <Input
                id="department"
                defaultValue="Direction des Ressources Humaines"
                className="mt-1"
              />
            </div>

            <div className="pt-4">
              <Button className="bg-port-blue hover:bg-port-blue/90">
                Mettre à jour le profil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
