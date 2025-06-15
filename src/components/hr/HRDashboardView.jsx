
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, FileText, Shield, AlertTriangle, TrendingUp, Clock } from "lucide-react";

// Mock data
const mockStats = {
  pendingRequests: 12,
  activeInterns: 45,
  pendingInterns: 8,
  completedInterns: 23,
  pendingInsurance: 5,
  pendingDocuments: 3,
  recentRequests: 7
};

const alerts = [
  {
    id: "1",
    type: "insurance",
    message: "5 assurances en attente de validation",
    priority: "urgent",
    count: 5
  },
  {
    id: "2",
    type: "documents",
    message: "3 documents à générer",
    priority: "normal" ,
    count: 3
  },
  {
    id: "3",
    type: "requests",
    message: "7 nouvelles demandes cette semaine",
    priority: "info" ,
    count: 7
  }
];

export function HRDashboardView() {
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return <Badge className="bg-red-100 text-red-800">Urgent</Badge>;
      case 'normal':
        return <Badge className="bg-yellow-100 text-yellow-800">Normal</Badge>;
      case 'info':
        return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Tableau de Bord RH</h1>
        <p className="text-gray-600">Vue d'ensemble de la gestion des stagiaires</p>
      </div>

      {/* Statistiques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-port-blue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Demandes en attente</CardTitle>
            <FileText className="h-4 w-4 text-port-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.pendingRequests}</div>
            <p className="text-xs text-gray-500">
              À traiter
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Stagiaires actifs</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.activeInterns}</div>
            <p className="text-xs text-gray-500">
              En cours de stage
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">En attente validation</CardTitle>
            <Shield className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.pendingInterns}</div>
            <p className="text-xs text-gray-500">
              Assurance à valider
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Stages terminés</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{mockStats.completedInterns}</div>
            <p className="text-xs text-gray-500">
              Ce semestre
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Alertes et actions urgentes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Alertes et Actions Urgentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {getPriorityBadge(alert.priority)}
                      <span className="text-xs text-gray-500">
                        {alert.count} élément{alert.count > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <Clock className="h-5 w-5 text-port-blue" />
              Activité Récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Convention générée pour Akouavi T.</p>
                  <p className="text-xs text-gray-500">Il y a 2 heures</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Nouvelle demande de Bio S.</p>
                  <p className="text-xs text-gray-500">Il y a 4 heures</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Assurance validée pour Koffi J.</p>
                  <p className="text-xs text-gray-500">Hier</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Répartition par type de stage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Répartition par Type de Stage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-port-navy">18</div>
              <div className="text-sm text-gray-600">Observation</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-port-blue h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-port-navy">22</div>
              <div className="text-sm text-gray-600">Perfectionnement</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-port-gold h-2 rounded-full" style={{ width: '49%' }}></div>
              </div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-2xl font-bold text-port-navy">5</div>
              <div className="text-sm text-gray-600">Application</div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '11%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
