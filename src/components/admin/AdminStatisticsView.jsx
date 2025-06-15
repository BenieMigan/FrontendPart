
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, TrendingUp, TrendingDown, Users, FileText, Calendar, Clock } from "lucide-react";

// Mock data pour les statistiques
const monthlyStats = [
  { month: "Jan", requests: 45, interns: 38, completed: 12 },
  { month: "Fév", requests: 52, interns: 45, completed: 15 },
  { month: "Mar", requests: 48, interns: 42, completed: 18 },
  { month: "Avr", requests: 61, interns: 55, completed: 22 },
  { month: "Mai", requests: 58, interns: 51, completed: 19 },
  { month: "Juin", requests: 67, interns: 62, completed: 25 }
];

const departmentStats = [
  { name: "Opérations", interns: 15, requests: 23, completion: 85 },
  { name: "Finance", interns: 8, requests: 12, completion: 92 },
  { name: "IT", interns: 6, requests: 15, completion: 78 },
  { name: "RH", interns: 3, requests: 8, completion: 95 },
  { name: "Marketing", interns: 4, requests: 9, completion: 88 }
];

const stageTypeStats = [
  { type: "Observation", count: 18, percentage: 40 },
  { type: "Perfectionnement", count: 22, percentage: 49 },
  { type: "Application", count: 5, percentage: 11 }
];

export function AdminStatisticsView() {
  const currentMonth = monthlyStats[monthlyStats.length - 1];
  const previousMonth = monthlyStats[monthlyStats.length - 2];
  
  const requestsGrowth = ((currentMonth.requests - previousMonth.requests) / previousMonth.requests) * 100;
  const internsGrowth = ((currentMonth.interns - previousMonth.interns) / previousMonth.interns) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Statistiques & Rapports</h1>
        <p className="text-gray-600">Analyse des données et tendances du système</p>
      </div>

      {/* KPI principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-port-blue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Demandes ce mois</CardTitle>
            <FileText className="h-4 w-4 text-port-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{currentMonth.requests}</div>
            <div className="flex items-center gap-1 text-xs">
              {requestsGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={requestsGrowth > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(requestsGrowth).toFixed(1)}%
              </span>
              <span className="text-gray-500">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Stagiaires actifs</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{currentMonth.interns}</div>
            <div className="flex items-center gap-1 text-xs">
              {internsGrowth > 0 ? (
                <TrendingUp className="h-3 w-3 text-green-500" />
              ) : (
                <TrendingDown className="h-3 w-3 text-red-500" />
              )}
              <span className={internsGrowth > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(internsGrowth).toFixed(1)}%
              </span>
              <span className="text-gray-500">vs mois dernier</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Stages terminés</CardTitle>
            <Calendar className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{currentMonth.completed}</div>
            <p className="text-xs text-gray-500">
              Taux de réussite: 95%
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Durée moyenne</CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">12.5</div>
            <p className="text-xs text-gray-500">
              semaines par stage
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques principaux */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Évolution Mensuelle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyStats.slice(-3).map((stat, index) => (
                <div key={stat.month} className="grid grid-cols-4 gap-4 items-center">
                  <div className="font-medium">{stat.month}</div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{stat.requests}</div>
                    <div className="text-xs text-gray-500">Demandes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{stat.interns}</div>
                    <div className="text-xs text-gray-500">Stagiaires</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-medium">{stat.completed}</div>
                    <div className="text-xs text-gray-500">Terminés</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy">Répartition par Type de Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stageTypeStats.map((stat) => (
                <div key={stat.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="font-medium">{stat.type}</div>
                    <Badge variant="outline">{stat.count}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-port-blue h-2 rounded-full" 
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{stat.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance par département */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Performance par Département</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Département</th>
                  <th className="text-center py-3 px-4">Stagiaires Actifs</th>
                  <th className="text-center py-3 px-4">Demandes Reçues</th>
                  <th className="text-center py-3 px-4">Taux de Completion</th>
                  <th className="text-center py-3 px-4">Performance</th>
                </tr>
              </thead>
              <tbody>
                {departmentStats.map((dept) => (
                  <tr key={dept.name} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{dept.name}</td>
                    <td className="text-center py-3 px-4">
                      <Badge variant="outline">{dept.interns}</Badge>
                    </td>
                    <td className="text-center py-3 px-4">
                      <Badge variant="outline">{dept.requests}</Badge>
                    </td>
                    <td className="text-center py-3 px-4">{dept.completion}%</td>
                    <td className="text-center py-3 px-4">
                      <div className="flex items-center justify-center">
                        {dept.completion >= 90 ? (
                          <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                        ) : dept.completion >= 80 ? (
                          <Badge className="bg-yellow-100 text-yellow-800">Bon</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">À améliorer</Badge>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Métriques détaillées */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy text-lg">Efficacité du Processus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Temps moyen de traitement</span>
                <span className="font-medium">2.3 jours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Taux d'acceptation</span>
                <span className="font-medium">89%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Satisfaction moyenne</span>
                <span className="font-medium">4.2/5</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy text-lg">Tendances Temporelles</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Pic de demandes</span>
                <span className="font-medium">Septembre</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Saison creuse</span>
                <span className="font-medium">Décembre</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Croissance annuelle</span>
                <span className="font-medium text-green-600">+15%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy text-lg">Ressources Système</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Documents générés</span>
                <span className="font-medium">1,234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Emails envoyés</span>
                <span className="font-medium">5,678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Stockage utilisé</span>
                <span className="font-medium">2.4 GB</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
