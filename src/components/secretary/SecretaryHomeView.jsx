
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserPlus, FileText, TrendingUp } from "lucide-react";


// Mock data - in real app, this would come from API
const mockStats = {
  activeInterns: 28,
  newInternsThisWeek: 5,
  recentServiceNotes: 3
};

export function SecretaryHomeView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Tableau de bord - Secrétaire</h1>
        <p className="text-gray-600">Vue d'ensemble des stagiaires et notes de service</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-l-4 border-l-port-blue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stagiaires Actifs</CardTitle>
            <Users className="h-4 w-4 text-port-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.activeInterns}</div>
            <p className="text-xs text-muted-foreground">
              Stagiaires en cours
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-port-gold">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nouveaux cette semaine</CardTitle>
            <UserPlus className="h-4 w-4 text-port-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.newInternsThisWeek}</div>
            <p className="text-xs text-muted-foreground">
              Arrivées récentes
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Notes de service</CardTitle>
            <FileText className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.recentServiceNotes}</div>
            <p className="text-xs text-muted-foreground">
              Publiées récemment
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" />
              Activité récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Nouvelle arrivée</p>
                  <p className="text-xs text-gray-600">Marie Adjovi - Département Finance</p>
                </div>
                <span className="text-xs text-gray-500">Aujourd'hui</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Note de service publiée</p>
                  <p className="text-xs text-gray-600">Procédures d'accueil mises à jour</p>
                </div>
                <span className="text-xs text-gray-500">Hier</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Demande d'absence traitée</p>
                  <p className="text-xs text-gray-600">Kossi Rodrigue - Approuvée</p>
                </div>
                <span className="text-xs text-gray-500">Il y a 2 jours</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy">Actions rapides</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              <button className="p-3 bg-port-blue text-white rounded-lg hover:bg-port-blue/90 transition-colors text-left">
                <div className="font-medium">Consulter les stagiaires</div>
                <div className="text-sm opacity-90">Voir tous les stagiaires actifs</div>
              </button>
              <button className="p-3 bg-port-gold text-white rounded-lg hover:bg-port-gold/90 transition-colors text-left">
                <div className="font-medium">Notes de service</div>
                <div className="text-sm opacity-90">Lire les dernières publications</div>
              </button>
              <button className="p-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-left">
                <div className="font-medium">Générer un rapport</div>
                <div className="text-sm opacity-90">Rapport hebdomadaire des présences</div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
