
import { SupervisorHomeView } from "./SupervisorHomeView";
import { SupervisorAbsenceRequestsView } from "./SupervisorAbsenceRequestsView";
import { SupervisorProfileView } from "./SupervisorProfileView";

const views = {
  home: SupervisorHomeView,
  absenceRequests: SupervisorAbsenceRequestsView,
  profile: SupervisorProfileView,
};

export function SupervisorDashboardContent({ currentView }) {
  const CurrentComponent = views[currentView];
  
  return (
    <div className="p-6">
      <CurrentComponent />
    </div>
  );
}
