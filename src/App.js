import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StageForm from './components/StageForm';
import DemandesAdmin from './components/DemandesAdmin';
import Navbar from './components/Navbar';
import AttestationPage from './components/AttestationPage';
import StagiairesDepartement from './components/StagiairesDepartement';
import StagiairesPort from './components/StagiairesPort';
import DocumentsAdmin from './components/DocumentsAdmin';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-3">
        <Routes>
          {/* Pages stagiaire */}
          <Route path="/formulaire" element={<StageForm />} />
          <Route path="/attestation" element={<AttestationPage />} />
          <Route path="/stagiaires-departement" element={<StagiairesDepartement />} />
          <Route path="/stagiaires-port" element={<StagiairesPort />} />

          {/* Pages admin */}
          <Route path="/admin/demandes" element={<DemandesAdmin />} />
          <Route path="/admin/documents" element={<DocumentsAdmin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
