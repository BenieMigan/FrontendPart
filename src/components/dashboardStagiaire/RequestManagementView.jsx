
import { RequestsTable } from "./requests/RequestsTable";

export function RequestManagementView() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-port-navy mb-2">Gestion des demandes</h1>
        <p className="text-gray-600">Consultez et suivez l'état de toutes vos demandes</p>
      </div>

      <RequestsTable />
    </div>
  );
}
