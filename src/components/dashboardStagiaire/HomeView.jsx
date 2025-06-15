import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";


export function HomeView({ onNavigate }) {
  return (
    <div className="space-y-6">
      {/* En-tête de bienvenue */}
      <div className="bg-gradient-to-r from-port-navy to-port-blue rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Bienvenue sur votre espace stagiaire</h1>
        <p className="text-port-blue/80 text-lg">
          Gérez vos demandes de stage au Port Autonome de Cotonou en toute simplicité
        </p>
      </div>

      {/* Aperçu rapide */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-port-blue hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-port-navy">Demandes en cours</CardTitle>
            <Clock className="h-5 w-5 text-port-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">1</div>
            <p className="text-xs text-muted-foreground">En attente de validation</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-port-navy">Demandes acceptées</CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">0</div>
            <p className="text-xs text-muted-foreground">Prêtes pour le stage</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-port-gold hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-port-navy">Documents</CardTitle>
            <FileText className="h-5 w-5 text-port-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">0</div>
            <p className="text-xs text-muted-foreground">Documents générés</p>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-port-navy">Actions rapides</CardTitle>
          <CardDescription>
            Commencez votre parcours de stage
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              className="bg-port-blue hover:bg-port-blue/90"
              onClick={() => onNavigate?.('request')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Nouvelle demande de stage
            </Button>
            <Button 
              variant="outline"
              className="border-port-navy text-port-navy hover:bg-port-navy hover:text-white"
              onClick={() => onNavigate?.('tracking')}
            >
              <Clock className="mr-2 h-4 w-4" />
              Suivre mes demandes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Processus de demande */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-port-navy">Processus de demande de stage</CardTitle>
          <CardDescription>
            Suivez ces étapes pour effectuer votre demande de stage
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-port-blue/5 rounded-lg border border-port-blue/20">
              <div className="w-8 h-8 bg-port-blue text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-port-navy">Soumettre votre demande</h4>
                <p className="text-sm text-gray-600">Remplissez le formulaire avec vos informations et préférences</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-yellow-800">Validation par les RH</h4>
                <p className="text-sm text-yellow-700">Délai habituel : 5-7 jours ouvrables</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-600">Téléverser l'assurance</h4>
                <p className="text-sm text-gray-500">Si accepté, fournir le certificat d'assurance</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-600">Récupérer les documents</h4>
                <p className="text-sm text-gray-500">Convention de stage et autres documents officiels</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Informations importantes */}
      <Card className="border-l-4 border-l-port-gold hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle className="text-port-navy flex items-center">
            <AlertCircle className="mr-2 h-5 w-5 text-port-gold" />
            Informations importantes
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-700">
            • Les demandes de stage doivent être soumises au moins 2 mois avant la date de début souhaitée
          </p>
          <p className="text-sm text-gray-700">
            • L'assurance responsabilité civile est obligatoire pour tous les stagiaires
          </p>
          <p className="text-sm text-gray-700">
            • Pour toute question, contactez le service RH : rh@portdecotonou.bj
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
