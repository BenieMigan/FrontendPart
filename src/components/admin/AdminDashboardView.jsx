
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Building2, FileText, Activity, TrendingUp, AlertTriangle, Server, HardDrive } from "lucide-react";


// Mock data
const mockStats = {
  totalUsers: 156,
  totalInterns: 89,
  totalRequests: 234,
  totalDepartments: 12,
  pendingRequests: 15,
  activeInterns: 67,
  completedInterns: 22,
  systemUptime: "99.8%",
  storageUsed: "2.4 GB / 10 GB",
  recentActivity: [
    {
      id: "1",
      userId: "hr1",
      userName: "Marie Kouassi",
      action: "Validation d'assurance",
      timestamp: "Il y a 15 minutes",
      details: "Assurance validée pour Akouavi T.",
      type: "intern"
    },
    {
      id: "2",
      userId: "admin1",
      userName: "System Admin",
      action: "Création utilisateur",
      timestamp: "Il y a 1 heure",
      details: "Nouvel encadreur ajouté - Service IT",
      type: "user"
    },
    {
      id: "3",
      userId: "sec1",
      userName: "Fatou Diallo",
      action: "Consultation fiche",
      timestamp: "Il y a 2 heures",
      details: "Consultation fiche stagiaire Bio S.",
      type: "intern"
    }
  ]
};

export function AdminDashboardView() {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'user':
        return <Users className="h-4 w-4 text-blue-500" />;
      case 'intern':
        return <FileText className="h-4 w-4 text-green-500" />;
      case 'request':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Administration Système</h1>
        <p className="text-gray-600">Vue d'ensemble du système de gestion des stagiaires</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-port-blue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Utilisateurs totaux</CardTitle>
            <Users className="h-4 w-4 text-port-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.totalUsers}</div>
            <p className="text-xs text-gray-500">
              Tous rôles confondus
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Stagiaires actifs</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.activeInterns}</div>
            <p className="text-xs text-gray-500">
              Sur {mockStats.totalInterns} total
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Demandes en attente</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.pendingRequests}</div>
            <p className="text-xs text-gray-500">
              À traiter par RH
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Départements</CardTitle>
            <Building2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.totalDepartments}</div>
            <p className="text-xs text-gray-500">
              Structures actives
            </p>
          </CardContent>
        </Card>
      </div>

      {/* État du système et activité récente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <Server className="h-5 w-5 text-port-blue" />
              État du Système
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Disponibilité</span>
                </div>
                <Badge className="bg-green-100 text-green-800">{mockStats.systemUptime}</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium">Stockage</span>
                </div>
                <span className="text-sm text-gray-600">{mockStats.storageUsed}</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-port-blue h-2 rounded-full" style={{ width: '24%' }}></div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-lg font-bold text-port-navy">{mockStats.totalRequests}</div>
                  <div className="text-xs text-gray-500">Requêtes traitées</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-port-navy">0</div>
                  <div className="text-xs text-gray-500">Erreurs système</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <Activity className="h-5 w-5 text-port-blue" />
              Activité Récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStats.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  {getActivityIcon(activity.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{activity.userName}</span>
                      <Badge variant="outline" className="text-xs">{activity.action}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{activity.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{activity.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graphiques de performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy">Évolution des Stagiaires</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{mockStats.activeInterns}</div>
                <div className="text-sm text-gray-600">En cours</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{mockStats.pendingRequests}</div>
                <div className="text-sm text-gray-600">En attente</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{mockStats.completedInterns}</div>
                <div className="text-sm text-gray-600">Terminés</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy">Répartition par Rôle</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Administrateurs</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '5%' }}></div>
                  </div>
                  <span className="text-sm font-medium">3</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">RH</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-port-blue h-2 rounded-full" style={{ width: '8%' }}></div>
                  </div>
                  <span className="text-sm font-medium">5</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Encadreurs</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                  <span className="text-sm font-medium">72</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Chefs département</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                  <span className="text-sm font-medium">12</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Secrétaires</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-port-gold h-2 rounded-full" style={{ width: '25%' }}></div>
                  </div>
                  <span className="text-sm font-medium">64</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
