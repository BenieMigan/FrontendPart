
import { HRDashboardView } from "./HRDashboardView";
import { HRRequestsView } from "./HRRequestsView";
import { HRInsuranceView } from "./HRInsuranceView";
import { HRInternsView } from "./HRInternsView";
import { HRInternRequestsView } from "./HRInternRequestsView";
import { HRServiceNotesView } from "./HRServiceNotesView";
import { HRProfileView } from "./HRProfileView";

const views = {
  dashboard: HRDashboardView,
  requests: HRRequestsView,
  insurance: HRInsuranceView,
  interns: HRInternsView,
  internRequests: HRInternRequestsView,
  serviceNotes: HRServiceNotesView,
  profile: HRProfileView,
};


export function HRDashboardContent({ currentView }) {
  const CurrentComponent = views[currentView];
  
  return (
    <div className="p-6">
      <CurrentComponent />
    </div>
  );
}
