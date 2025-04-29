import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StageForm from './components/StageForm'; // Formulaire d'inscription des stagiaires
import DemandesAdmin from './components/DemandesAdmin'; // Gestion des demandes
import Navbar from './components/Navbar'; // Import de la Navbar
import AttestationPage from './components/AttestationPage'; // Page pour retirer une attestation
import StagiairesDepartement from './components/StagiairesDepartement'; // Liste des stagiaires par département
import StagiairesPort from './components/StagiairesPort'; // Liste des stagiaires au port
import DocumentsAdmin from './components/DocumentsAdmin'; // ⬅️ Ajoute ce nouvel import


function App() {
  return (
    <Router>
      <Navbar /> {/* Ajouter la navbar ici pour les autres pages */}
      <div className="container mt-3">
        {/* Définir les routes avec React Router */}
        <Routes>
          <Route path="/formulaire" element={<StageForm />} />
          <Route path="/attestation" element={<AttestationPage />} />
          <Route path="/stagiaires-departement" element={<StagiairesDepartement />} />
          <Route path="/stagiaires-port" element={<StagiairesPort />} />
          <Route path="/admin/documents" element={<DocumentsAdmin />} />

          
        </Routes>
      </div>

      {/* Route isolée pour la page de gestion des demandes */}
      <Routes>
        <Route path="/admin/demandes" element={<DemandesAdmin />} />

        
      </Routes>
    </Router>
  );
}

export default App;
