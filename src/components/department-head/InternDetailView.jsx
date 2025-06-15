
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Mail, Phone, School, User, Calendar, FileText } from "lucide-react";


const statusConfig = {
  en_cours: {
    label: "En cours",
    color: "bg-green-100 text-green-800"
  },
  en_attente: {
    label: "En attente",
    color: "bg-orange-100 text-orange-800"
  },
  termine: {
    label: "Terminé",
    color: "bg-gray-100 text-gray-800"
  }
};



export function InternDetailView({ intern, onBack }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  const handleDownload = (filename) => {
    // Simulation du téléchargement
    console.log(`Téléchargement de ${filename}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          onClick={onBack}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour à la liste
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-port-navy">{intern.name}</h1>
          <p className="text-gray-600">Fiche détaillée du stagiaire</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Informations principales */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy flex items-center">
                <User className="h-5 w-5 mr-2" />
                Informations personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Nom complet</label>
                  <p className="text-lg font-medium">{intern.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Statut</label>
                  <div className="mt-1">
                    <Badge className={statusConfig[intern.status].color}>
                      {statusConfig[intern.status].label}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Email</label>
                  <p className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {intern.email}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Téléphone</label>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {intern.phone}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy flex items-center">
                <School className="h-5 w-5 mr-2" />
                Formation et stage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">École d'origine</label>
                  <p className="text-lg">{intern.school}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Département</label>
                  <p className="text-lg">{intern.department}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Encadreur assigné</label>
                  <p className="text-lg">{intern.supervisor}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Durée du stage</label>
                  <p className="text-lg">{intern.duration}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-600">Date de début</label>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {formatDate(intern.startDate)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Date de fin</label>
                  <p className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    {formatDate(intern.endDate)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents administratifs */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-port-navy flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {intern.documents.insurance && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Assurance</p>
                    <p className="text-sm text-gray-600">{intern.documents.insurance}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(intern.documents.insurance != null)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {intern.documents.assignmentLetter && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Lettre d'affectation</p>
                    <p className="text-sm text-gray-600">{intern.documents.assignmentLetter}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(intern.documents.assignmentLetter != null)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {intern.documents.contract && (
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Contrat de stage</p>
                    <p className="text-sm text-gray-600">{intern.documents.contract}</p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(intern.documents.contract != null)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {Object.keys(intern.documents).length === 0 && (
                <p className="text-gray-500 text-center py-4">
                  Aucun document disponible
                </p>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-port-navy">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-port-gold hover:bg-port-gold/90 text-white"
              >
                Générer fiche PDF
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
              >
                Envoyer un email
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
              >
                Historique des demandes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
