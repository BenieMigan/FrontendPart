
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Mail, Shield, Calendar, Save, Key, Bell } from "lucide-react";

export function AdminProfileView() {
  const [isEditing, setIsEditing] = useState(false);

  const adminProfile = {
    id: "admin1",
    name: "Admin Principal",
    email: "admin@portcotonou.bj",
    role: "admin",
    createdAt: "2024-01-15",
    lastLogin: "2025-01-15 09:30",
    permissions: ["full_access", "user_management", "system_settings", "data_export"],
    sessionCount: 156,
    actionsPerformed: 1234
  };

  const getPermissionBadge = (permission) => {
    const permissionLabels = {
      full_access: "Accès complet",
      user_management: "Gestion utilisateurs",
      system_settings: "Paramètres système", 
      data_export: "Export de données"
    };

    return (
      <Badge key={permission} className="bg-red-100 text-red-800">
        {permissionLabels[permission ]}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-port-navy mb-2">Profil Administrateur</h1>
          <p className="text-gray-600">Gestion de votre compte et préférences</p>
        </div>
        
        <Button 
          onClick={() => setIsEditing(!isEditing)}
          className="bg-port-blue hover:bg-port-blue/90"
        >
          {isEditing ? "Annuler" : "Modifier"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy flex items-center gap-2">
                <User className="h-5 w-5" />
                Informations Personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    value={adminProfile.name}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Adresse email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={adminProfile.email}
                    disabled={!isEditing}
                    className={!isEditing ? "bg-gray-50" : ""}
                  />
                </div>
              </div>
              
              <div>
                <Label>Rôle</Label>
                <div className="mt-1">
                  <Badge className="bg-red-100 text-red-800">Administrateur</Badge>
                </div>
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button className="bg-port-blue hover:bg-port-blue/90">
                    <Save className="h-4 w-4 mr-2" />
                    Sauvegarder
                  </Button>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Annuler
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Sécurité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Mot de passe</Label>
                <div className="flex gap-2 mt-1">
                  <Input type="password" value="••••••••" disabled />
                  <Button variant="outline">
                    <Key className="h-4 w-4 mr-2" />
                    Changer
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Authentification à deux facteurs</Label>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-gray-600">
                    Sécurisez votre compte avec une authentification supplémentaire
                  </span>
                  <Button variant="outline" size="sm">
                    Configurer
                  </Button>
                </div>
              </div>

              <Separator />

              <div>
                <Label>Sessions actives</Label>
                <div className="text-sm text-gray-600 mt-1">
                  1 session active • Dernière connexion: {adminProfile.lastLogin}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Voir toutes les sessions
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Préférences */}
          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Préférences de Notification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Nouvelles demandes de stage</Label>
                    <p className="text-sm text-gray-500">Recevoir un email à chaque nouvelle demande</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Alertes système</Label>
                    <p className="text-sm text-gray-500">Notifications pour les problèmes système</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Rapports hebdomadaires</Label>
                    <p className="text-sm text-gray-500">Résumé d'activité envoyé chaque lundi</p>
                  </div>
                  <input type="checkbox" defaultChecked className="rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar avec statistiques */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy">Statistiques du Compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-port-navy">{adminProfile.sessionCount}</div>
                <div className="text-sm text-gray-600">Sessions totales</div>
              </div>
              
              <Separator />
              
              <div className="text-center">
                <div className="text-2xl font-bold text-port-navy">{adminProfile.actionsPerformed}</div>
                <div className="text-sm text-gray-600">Actions effectuées</div>
              </div>
              
              <Separator />
              
              <div className="text-center">
                <div className="text-sm text-gray-600">Membre depuis</div>
                <div className="font-medium">
                  {new Date(adminProfile.createdAt).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy">Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {adminProfile.permissions.map((permission) => (
                  getPermissionBadge(permission)
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy">Activité Récente</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Connexion réussie</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Paramètres modifiés</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Export de données</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
