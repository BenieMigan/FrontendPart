
import { AdminDashboardView } from "./AdminDashboardView";
import { AdminUsersView } from "./AdminUsersView";
import { AdminDepartmentsView } from "./AdminDepartmentsView";
import { AdminStatisticsView } from "./AdminStatisticsView";
import { AdminSettingsView } from "./AdminSettingsView";
import { AdminLogsView } from "./AdminLogsView";
import { AdminProfileView } from "./AdminProfileView";

const views = {
  dashboard: AdminDashboardView,
  users: AdminUsersView,
  departments: AdminDepartmentsView,
  statistics: AdminStatisticsView,
  settings: AdminSettingsView,
  logs: AdminLogsView,
  profile: AdminProfileView,
};



export function AdminDashboardContent({ currentView }) {
  const CurrentComponent = views[currentView];
  
  return (
    <div className="p-6">
      <CurrentComponent />
    </div>
  );
}
