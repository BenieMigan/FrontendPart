
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Download, Filter, Activity, AlertCircle, CheckCircle, XCircle } from "lucide-react";


// Mock data pour les journaux d'activité
const mockLogs = [
  {
    id: "1",
    userId: "hr1",
    userName: "Marie Kouassi",
    action: "Validation assurance",
    timestamp: "2025-01-15 14:30:15",
    details: "Assurance validée pour Akouavi Mensah - ESTIM",
    type: "intern"
  },
  {
    id: "2",
    userId: "admin1",
    userName: "System Admin",
    action: "Création utilisateur",
    timestamp: "2025-01-15 13:45:22",
    details: "Nouvel encadreur créé: Jean Tossou - Département Operations",
    type: "user"
  },
  {
    id: "3",
    userId: "sec1",
    userName: "Fatou Diallo",
    action: "Consultation fiche",
    timestamp: "2025-01-15 12:20:08",
    details: "Consultation fiche stagiaire Bio Saliou",
    type: "intern"
  },
  {
    id: "4",
    userId: "hr1",
    userName: "Marie Kouassi",
    action: "Rejet demande",
    timestamp: "2025-01-15 11:15:33",
    details: "Demande de stage rejetée - Koffi Jean (manque documents)",
    type: "request"
  },
  {
    id: "5",
    userId: "system",
    userName: "Système",
    action: "Sauvegarde automatique",
    timestamp: "2025-01-15 03:00:00",
    details: "Sauvegarde automatique des données effectuée",
    type: "system"
  }
];

export function AdminLogsView() {
  const [logs, setLogs] = useState(mockLogs);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");

  const getTypeIcon = (type) => {
    switch (type) {
      case 'user':
        return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'intern':
        return <Activity className="h-4 w-4 text-green-500" />;
      case 'request':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'system':
        return <XCircle className="h-4 w-4 text-gray-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeBadge = (type) => {
    const typeConfig = {
      user: { label: "Utilisateur", className: "bg-blue-100 text-blue-800" },
      intern: { label: "Stagiaire", className: "bg-green-100 text-green-800" },
      request: { label: "Demande", className: "bg-yellow-100 text-yellow-800" },
      system: { label: "Système", className: "bg-gray-100 text-gray-800" }
    };

    const config = typeConfig[type] || typeConfig.system;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const handleExportLogs = () => {
    console.log("Export des journaux d'activité");
    // Generate and download logs file
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-port-navy mb-2">Journaux d'Activité</h1>
          <p className="text-gray-600">Suivi de toutes les actions effectuées dans le système</p>
        </div>
        
        <Button onClick={handleExportLogs} className="bg-port-blue hover:bg-port-blue/90">
          <Download className="h-4 w-4 mr-2" />
          Exporter les logs
        </Button>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-port-blue" />
              <div>
                <div className="text-2xl font-bold text-port-navy">{logs.length}</div>
                <div className="text-sm text-gray-600">Total actions</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-port-navy">
                  {logs.filter(l => l.type === 'user').length}
                </div>
                <div className="text-sm text-gray-600">Actions utilisateurs</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-green-500" />
              <div>
                <div className="text-2xl font-bold text-port-navy">
                  {logs.filter(l => l.type === 'intern').length}
                </div>
                <div className="text-sm text-gray-600">Actions stagiaires</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-gray-500" />
              <div>
                <div className="text-2xl font-bold text-port-navy">
                  {logs.filter(l => l.type === 'system').length}
                </div>
                <div className="text-sm text-gray-600">Actions système</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher dans les logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Type d'action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="user">Utilisateur</SelectItem>
                <SelectItem value="intern">Stagiaire</SelectItem>
                <SelectItem value="request">Demande</SelectItem>
                <SelectItem value="system">Système</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Aujourd'hui</SelectItem>
                <SelectItem value="week">Cette semaine</SelectItem>
                <SelectItem value="month">Ce mois</SelectItem>
                <SelectItem value="quarter">Ce trimestre</SelectItem>
                <SelectItem value="year">Cette année</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Table des logs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Journaux Filtrés ({filteredLogs.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horodatage</TableHead>
                <TableHead>Utilisateur</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Détails</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell>
                    <div className="text-sm">
                      <div>{new Date(log.timestamp).toLocaleDateString('fr-FR')}</div>
                      <div className="text-gray-500">
                        {new Date(log.timestamp).toLocaleTimeString('fr-FR')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(log.type)}
                      <span className="font-medium">{log.userName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">{log.action}</span>
                  </TableCell>
                  <TableCell>{getTypeBadge(log.type)}</TableCell>
                  <TableCell>
                    <div className="text-sm text-gray-600 max-w-md">
                      {log.details}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {filteredLogs.length === 0 && (
        <Card>
          <CardContent className="text-center py-8 text-gray-500">
            <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucun journal d'activité trouvé avec les filtres actuels</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
