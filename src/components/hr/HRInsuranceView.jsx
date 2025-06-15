
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Check, FileText, Shield, AlertCircle } from "lucide-react";


// Mock data - stagiaires en attente de validation d'assurance
const mockPendingInsurance = [
  {
    id: "1",
    name: "Akouavi Mensah",
    email: "akouavi.m@estim.univ-lome.tg",
    phone: "+228 90 45 67 89",
    school: "ESTIM - Lomé",
    department: "Finance",
    supervisor: "Mme Sossa",
    startDate: "2025-06-15",
    endDate: "2025-09-15",
    status: "en_attente",
    stageType: "perfectionnement",
    insuranceValidated: false,
    documentsGenerated: false,
    badgeGenerated: false,
    insuranceFile: "/documents/assurance-akouavi.pdf"
  },
  {
    id: "2",
    name: "Bio Saliou",
    email: "bio.saliou@uac.bj",
    phone: "+229 95 78 90 12",
    school: "UAC - FASEG",
    department: "Operations",
    supervisor: "M. Tossou",
    startDate: "2025-07-15",
    endDate: "2025-10-15",
    status: "en_attente",
    stageType: "application",
    insuranceValidated: false,
    documentsGenerated: false,
    badgeGenerated: false,
    insuranceFile: "/documents/assurance-bio.pdf"
  }
];

export function HRInsuranceView() {
  const [interns, setInterns] = useState(mockPendingInsurance);

  const handleValidateInsurance = async (internId) => {
    console.log(`Validation de l'assurance pour le stagiaire ${internId}`);
    
    // Simulate insurance validation and document generation
    setInterns(prev => prev.map(intern => {
      if (intern.id === internId) {
        return {
          ...intern,
          insuranceValidated: true,
          documentsGenerated: true,
          badgeGenerated: true,
          status: "en_cours"
        };
      }
      return intern;
    }));

    // In real app, this would:
    // 1. Update database
    // 2. Generate documents (convention, lettre d'affectation)
    // 3. Create badge
    // 4. Send notification email to intern
  };

  const handleDownloadInsurance = (insuranceFile) => {
    console.log(`Téléchargement de ${insuranceFile}`);
    // In real app, this would download the file
  };

  const pendingValidation = interns.filter(intern => !intern.insuranceValidated);
  const recentlyValidated = interns.filter(intern => intern.insuranceValidated);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-port-navy mb-2">Validation des Assurances</h1>
        <p className="text-gray-600">Vérification et validation des polices d'assurance des stagiaires</p>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">En attente de validation</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{pendingValidation.length}</div>
            <p className="text-xs text-gray-500">
              Assurances à vérifier
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Validées aujourd'hui</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{recentlyValidated.length}</div>
            <p className="text-xs text-gray-500">
              Documents générés
            </p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-port-blue">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Documents générés</CardTitle>
            <FileText className="h-4 w-4 text-port-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-port-navy">{recentlyValidated.length * 3}</div>
            <p className="text-xs text-gray-500">
              Convention, affectation, badge
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Assurances en attente de validation */}
      {pendingValidation.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-500" />
              Assurances en attente de validation ({pendingValidation.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stagiaire</TableHead>
                  <TableHead>École</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Période</TableHead>
                  <TableHead>Assurance</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingValidation.map((intern) => (
                  <TableRow key={intern.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{intern.name}</div>
                        <div className="text-sm text-gray-500">{intern.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{intern.school}</TableCell>
                    <TableCell>{intern.department}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(intern.startDate).toLocaleDateString('fr-FR')}</div>
                        <div className="text-gray-500">→ {new Date(intern.endDate).toLocaleDateString('fr-FR')}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownloadInsurance(intern.insuranceFile != null)}
                        className="text-port-blue border-port-blue hover:bg-port-blue hover:text-white"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        size="sm"
                        onClick={() => handleValidateInsurance(intern.id)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Valider et générer documents
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Assurances récemment validées */}
      {recentlyValidated.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-port-navy flex items-center gap-2">
              <Shield className="h-5 w-5 text-green-500" />
              Récemment validées ({recentlyValidated.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Stagiaire</TableHead>
                  <TableHead>Département</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Documents générés</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentlyValidated.map((intern) => (
                  <TableRow key={intern.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{intern.name}</div>
                        <div className="text-sm text-gray-500">{intern.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{intern.department}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-100 text-green-800">Validée</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant="outline" className="text-xs">Convention générée</Badge>
                        <Badge variant="outline" className="text-xs">Lettre d'affectation</Badge>
                        <Badge variant="outline" className="text-xs">Badge créé</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4 mr-1" />
                          Documents
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {pendingValidation.length === 0 && recentlyValidated.length === 0 && (
        <Card>
          <CardContent className="text-center py-8 text-gray-500">
            <Shield className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Aucune assurance en attente de validation</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
