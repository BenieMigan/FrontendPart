
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCheck, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Données fictives des statistiques
const mockStats = {
  total: 12,
  en_cours: 8,
  en_attente: 2,
  termine: 2
};

export function DepartmentHeadHomeView() {
  const completionRate = Math.round((mockStats.termine / mockStats.total) * 100);
  const activeRate = Math.round((mockStats.en_cours / mockStats.total) * 100);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Tableau de bord</h1>
        <p className="text-gray-600">Service Informatique - Vue d'ensemble</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total stagiaires</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.total}</div>
            <p className="text-xs text-muted-foreground">
              Dans votre service
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En cours</CardTitle>
            <UserCheck className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockStats.en_cours}</div>
            <p className="text-xs text-muted-foreground">
              Stages actifs
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">En attente</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{mockStats.en_attente}</div>
            <p className="text-xs text-muted-foreground">
              À démarrer
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Terminés</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockStats.termine}</div>
            <p className="text-xs text-muted-foreground">
              Stages achevés
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques et indicateurs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center">
              <TrendingUp className="h-5 w-5 mr-2" />
              Taux de réalisation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Stages terminés</span>
                <span className="text-sm text-muted-foreground">{completionRate}%</span>
              </div>
              <Progress value={completionRate} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Stages en cours</span>
                <span className="text-sm text-muted-foreground">{activeRate}%</span>
              </div>
              <Progress value={activeRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy">Répartition par statut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-sm">En cours</span>
                </div>
                <span className="text-sm font-medium">{mockStats.en_cours}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-sm">En attente</span>
                </div>
                <span className="text-sm font-medium">{mockStats.en_attente}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-sm">Terminés</span>
                </div>
                <span className="text-sm font-medium">{mockStats.termine}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions rapides */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Actions rapides</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <Users className="h-8 w-8 text-port-blue mx-auto mb-2" />
              <h3 className="font-medium">Voir tous les stagiaires</h3>
              <p className="text-sm text-gray-600">Liste complète</p>
            </div>
            <div className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <TrendingUp className="h-8 w-8 text-port-gold mx-auto mb-2" />
              <h3 className="font-medium">Rapport mensuel</h3>
              <p className="text-sm text-gray-600">Générer un rapport</p>
            </div>
            <div className="text-center p-4 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-medium">Évaluations</h3>
              <p className="text-sm text-gray-600">Suivi des performances</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
