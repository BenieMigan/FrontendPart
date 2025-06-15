
import { useState } from "react";
import { SecretaryHomeView } from "./SecretaryHomeView";
import { SecretaryInternsView } from "./SecretaryInternsView";
import { InternDetailViewSecretary } from "./InternDetailViewSecretary";
import { SecretaryServiceNotesView } from "./SecretaryServiceNotesView";
import { SecretaryProfileView } from "./SecretaryProfileView";


const views = {
  home: SecretaryHomeView,
  serviceNotes: SecretaryServiceNotesView,
  profile: SecretaryProfileView,
};


export function SecretaryDashboardContent({ currentView }) {
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
        <InternDetailViewSecretary intern={selectedIntern} onBack={handleBackToList} />
      </div>
    );
  }

  // Sinon on affiche la vue normale
  if (currentView === "interns") {
    return (
      <div className="p-6">
        <SecretaryInternsView onViewDetails={handleViewDetails} />
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
