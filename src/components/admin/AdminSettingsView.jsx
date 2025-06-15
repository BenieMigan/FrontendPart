
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, Save, Download, Upload, Trash2, AlertTriangle } from "lucide-react";


// Mock data
const mockSettings = {
  id: "1",
  siteName: "PAC - Gestion des Stagiaires",
  supportEmail: "support@portcotonou.bj",
  maxFileSize: 10,
  allowedFileTypes: ["pdf", "doc", "docx", "jpg", "png"],
  autoApproval: false,
  emailNotifications: true,
  maintenanceMode: false,
  sessionTimeout: 30
};

export function AdminSettingsView() {
  const [settings, setSettings] = useState(mockSettings);
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSaveSettings = () => {
    console.log("Sauvegarde des paramètres:", settings);
    setHasChanges(false);
    // Here you would typically save to backend
  };

  const handleExportData = () => {
    console.log("Export des données système");
    // Generate and download system backup
  };

  const handleImportData = () => {
    console.log("Import des données système");
    // Handle file upload and import
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-port-navy mb-2">Paramètres Système</h1>
          <p className="text-gray-600">Configuration générale de l'application</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" onClick={handleImportData}>
            <Upload className="h-4 w-4 mr-2" />
            Importer
          </Button>
          <Button 
            onClick={handleSaveSettings}
            disabled={!hasChanges}
            className="bg-port-blue hover:bg-port-blue/90"
          >
            <Save className="h-4 w-4 mr-2" />
            Sauvegarder
          </Button>
        </div>
      </div>

      {hasChanges && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <span className="text-sm text-yellow-800">
              Des modifications non sauvegardées sont en attente.
            </span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Paramètres généraux */}
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Paramètres Généraux
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Nom de l'application</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => handleSettingChange('siteName', e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="supportEmail">Email de support</Label>
              <Input
                id="supportEmail"
                type="email"
                value={settings.supportEmail}
                onChange={(e) => handleSettingChange('supportEmail', e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="sessionTimeout">Délai d'expiration de session (minutes)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Paramètres de fichiers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy">Gestion des Fichiers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="maxFileSize">Taille max des fichiers (MB)</Label>
              <Input
                id="maxFileSize"
                type="number"
                value={settings.maxFileSize}
                onChange={(e) => handleSettingChange('maxFileSize', parseInt(e.target.value))}
              />
            </div>
            
            <div>
              <Label>Types de fichiers autorisés</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {settings.allowedFileTypes.map((type) => (
                  <Badge key={type} variant="outline" className="flex items-center gap-1">
                    {type.toUpperCase()}
                    <button
                      onClick={() => {
                        const newTypes = settings.allowedFileTypes.filter(t => t !== type);
                        handleSettingChange('allowedFileTypes', newTypes);
                      }}
                      className="ml-1 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 mt-2">
                <Input placeholder="Ajouter un type (ex: xlsx)" />
                <Button size="sm" variant="outline">Ajouter</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Paramètres fonctionnels */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Paramètres Fonctionnels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Approbation automatique</Label>
                  <p className="text-sm text-gray-500">
                    Approuver automatiquement certaines demandes de stage
                  </p>
                </div>
                <Switch
                  checked={settings.autoApproval}
                  onCheckedChange={(checked) => handleSettingChange('autoApproval', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Notifications par email</Label>
                  <p className="text-sm text-gray-500">
                    Envoyer des notifications automatiques par email
                  </p>
                </div>
                <Switch
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Mode maintenance</Label>
                  <p className="text-sm text-gray-500">
                    Désactiver temporairement l'accès au système
                  </p>
                </div>
                <Switch
                  checked={settings.maintenanceMode}
                  onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="backupFreq">Fréquence de sauvegarde</Label>
                <Select defaultValue="daily">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Toutes les heures</SelectItem>
                    <SelectItem value="daily">Quotidienne</SelectItem>
                    <SelectItem value="weekly">Hebdomadaire</SelectItem>
                    <SelectItem value="monthly">Mensuelle</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="logLevel">Niveau de logs</Label>
                <Select defaultValue="info">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="debug">Debug</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                    <SelectItem value="warn">Warning</SelectItem>
                    <SelectItem value="error">Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="retention">Rétention des données (mois)</Label>
                <Input
                  id="retention"
                  type="number"
                  defaultValue="24"
                  placeholder="Nombre de mois"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Messages système */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Messages Système</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="welcomeMsg">Message d'accueil</Label>
            <Textarea
              id="welcomeMsg"
              placeholder="Message affiché sur la page d'accueil"
              defaultValue="Bienvenue sur la plateforme de gestion des stagiaires du Port Autonome de Cotonou"
            />
          </div>
          
          <div>
            <Label htmlFor="maintenanceMsg">Message de maintenance</Label>
            <Textarea
              id="maintenanceMsg"
              placeholder="Message affiché en mode maintenance"
              defaultValue="Le système est temporairement indisponible pour maintenance. Veuillez réessayer plus tard."
            />
          </div>
        </CardContent>
      </Card>

      {/* Actions dangereuses */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Zone Dangereuse
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Réinitialisation du système</h4>
            <p className="text-sm text-red-600 mb-4">
              Cette action supprimera toutes les données et réinitialisera le système. Cette action est irréversible.
            </p>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Réinitialiser le système
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
