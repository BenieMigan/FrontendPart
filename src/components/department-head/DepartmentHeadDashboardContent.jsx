
import { useState } from "react";
import { DepartmentHeadHomeView } from "./DepartmentHeadHomeView";
import { DepartmentHeadInternsView } from "./DepartmentHeadInternsView";
import { InternDetailView } from "./InternDetailView";
import { DepartmentHeadProfileView } from "./DepartmentHeadProfileView";

const views = {
  home: DepartmentHeadHomeView,
  profile: DepartmentHeadProfileView,
};


export function DepartmentHeadDashboardContent({ currentView }) {
  const [selectedIntern, setSelectedIntern] = useState(null);

  const handleViewDetails = (intern) => {
    setSelectedIntern(intern);
  };

  const handleBackToList = () => {
    setSelectedIntern(null);
  };

  // Si on affiche la vue des stagiaires et qu'un stagiaire est sélectionné, on affiche sa fiche
  if (currentView === "interns" && selectedIntern) {
    return (
      <div className="p-6">
        <InternDetailView intern={selectedIntern} onBack={handleBackToList} />
      </div>
    );
  }

  // Sinon on affiche la vue normale
  if (currentView === "interns") {
    return (
      <div className="p-6">
        <DepartmentHeadInternsView onViewDetails={handleViewDetails} />
      </div>
    );
  }

  const CurrentComponent = views[currentView];
  
  return (
    <div className="p-6">
      <CurrentComponent />
    </div>
  );
}
