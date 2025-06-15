
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileCheck, AlertTriangle } from "lucide-react";

export function InsuranceView() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!uploadedFile) return;
    
    setIsUploading(true);
    // Simuler l'upload
    setTimeout(() => {
      setIsUploading(false);
      // Ici on pourrait afficher un toast de succès
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Téléversement de l'assurance</h1>
        <p className="text-gray-600">Fournissez votre certificat d'assurance responsabilité civile</p>
      </div>

      <Card className="border-l-4 border-l-port-gold">
        <CardHeader>
          <CardTitle className="text-port-navy flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-port-gold" />
            Documents requis
          </CardTitle>
          <CardDescription>
            Votre demande de stage a été acceptée. Vous devez maintenant fournir votre assurance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">Demande acceptée !</h4>
              <p className="text-sm text-green-700">
                Félicitations ! Votre demande de stage pour le <strong>Service Commercial</strong> 
                du 01/03/2024 au 31/05/2024 a été acceptée.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-port-navy">Exigences pour l'assurance :</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-port-blue rounded-full mt-2 flex-shrink-0"></span>
                  <span>Assurance responsabilité civile valide</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-port-blue rounded-full mt-2 flex-shrink-0"></span>
                  <span>Couverture minimale de 150 000 € par sinistre</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-port-blue rounded-full mt-2 flex-shrink-0"></span>
                  <span>Période de validité couvrant la durée du stage</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-2 h-2 bg-port-blue rounded-full mt-2 flex-shrink-0"></span>
                  <span>Format accepté : PDF uniquement</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-port-navy">Téléverser votre assurance</CardTitle>
          <CardDescription>
            Sélectionnez le fichier PDF de votre certificat d'assurance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-port-blue transition-colors">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-lg font-medium text-gray-700">
                  Glissez votre fichier ici ou cliquez pour parcourir
                </p>
                <p className="text-sm text-gray-500">
                  Formats acceptés : PDF • Taille max : 10 MB
                </p>
              </div>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>

            {uploadedFile && (
              <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <FileCheck className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-green-800">{uploadedFile.name}</p>
                  <p className="text-sm text-green-600">
                    {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Button 
                variant="outline" 
                className="border-port-navy text-port-navy"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleSubmit}
                disabled={!uploadedFile || isUploading}
                className="bg-port-blue hover:bg-port-blue/90"
              >
                {isUploading ? "Téléversement..." : "Valider l'assurance"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
