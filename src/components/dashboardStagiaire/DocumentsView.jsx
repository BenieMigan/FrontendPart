
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar, AlertCircle } from "lucide-react";

export function DocumentsView() {
  const documents = [
    {
      id: 1,
      name: "Convention de stage",
      type: "PDF",
      size: "245 KB",
      generatedDate: "25 janvier 2024",
      status: "Disponible",
      description: "Document officiel définissant les modalités du stage"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Mes documents</h1>
        <p className="text-gray-600">Consultez et téléchargez vos documents de stage</p>
      </div>

      {documents.length > 0 ? (
        <div className="space-y-4">
          {documents.map((doc) => (
            <Card key={doc.id} className="border-l-4 border-l-port-blue">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-start space-x-3">
                    <FileText className="h-6 w-6 text-port-blue mt-1" />
                    <div>
                      <CardTitle className="text-port-navy">{doc.name}</CardTitle>
                      <CardDescription>{doc.description}</CardDescription>
                    </div>
                  </div>
                  <Button className="bg-port-blue hover:bg-port-blue/90">
                    <Download className="mr-2 h-4 w-4" />
                    Télécharger
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium text-gray-700">Format</p>
                    <p className="text-gray-600">{doc.type}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Taille</p>
                    <p className="text-gray-600">{doc.size}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Généré le</p>
                    <p className="text-gray-600">{doc.generatedDate}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Statut</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      {doc.status}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">Aucun document disponible</h3>
            <p className="text-gray-500 mb-6">
              Vos documents seront générés automatiquement une fois votre demande traitée et l'assurance validée.
            </p>
            
            <div className="max-w-md mx-auto">
              <Card className="border-port-gold bg-port-gold/5">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 text-port-gold mt-0.5" />
                    <div className="text-left">
                      <p className="text-sm font-medium text-port-navy">Documents à venir</p>
                      <ul className="text-xs text-gray-600 mt-1 space-y-1">
                        <li>• Convention de stage tripartite</li>
                        <li>• Attestation de début de stage</li>
                        <li>• Fiche d'évaluation</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Informations sur les documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy flex items-center">
            <Calendar className="mr-2 h-5 w-5" />
            Planning des documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-700">Convention de stage</p>
                <p className="text-sm text-gray-600">Après validation de l'assurance</p>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                Disponible
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-700">Attestation de début</p>
                <p className="text-sm text-gray-600">Le premier jour du stage</p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                En attente
              </span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-700">Attestation de fin</p>
                <p className="text-sm text-gray-600">À la fin du stage</p>
              </div>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                En attente
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
