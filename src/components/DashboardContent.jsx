
import { HomeView } from "./dashboardStagiaire/HomeView";
import { RequestView } from "./dashboardStagiaire/RequestView";
import { RequestManagementView } from "./dashboardStagiaire/RequestManagementView";
import { TrackingView } from "./dashboardStagiaire/TrackingView";
import { InsuranceView } from "./dashboardStagiaire/InsuranceView";
import { DocumentsView } from "./dashboardStagiaire/DocumentsView";
import { ProfileView } from "./dashboardStagiaire/ProfileView";

const views = {
  home: HomeView,
  request: RequestView,
  requestManagement: RequestManagementView,
  tracking: TrackingView,
  insurance: InsuranceView,
  documents: DocumentsView,
  profile: ProfileView,
};


export default function DashboardContent({ currentView }) {
  const CurrentComponent = views[currentView];
  
  return (
    <div className="p-6">
      <CurrentComponent />
    </div>
  );
}
