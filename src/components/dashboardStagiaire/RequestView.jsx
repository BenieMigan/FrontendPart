
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UnifiedRequestForm } from "./requests/UnifiedRequestForm";
import { FileText } from "lucide-react";

export function RequestView() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Faire une demande</h1>
        <p className="text-gray-600">Soumettez vos demandes de pause, d'absence ou de reprise</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="border-l-4 border-l-port-blue">
          <CardHeader className="pb-4">
            <CardTitle className="text-port-navy flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Formulaire de demande
            </CardTitle>
            <CardDescription>
              Choisissez le type de demande et remplissez les informations requises
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UnifiedRequestForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
