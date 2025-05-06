import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import StageForm from './components/StageForm';
import DemandesAdmin from './components/DemandesAdmin';
import Navbar from './components/Navbar';
import AttestationPage from './components/AttestationPage';
import StagiairesDepartement from './components/StagiairesDepartement';
import StagiairesPort from './components/StagiairesPort';
import DocumentsAdmin from './components/DocumentsAdmin';
import Login from './components/Login';
import SuiteInscription from './components/SuiteInscription';
import AssuranceUpload from './components/AssuranceUpload';
import AuthPage from './pages/AuthPage';
import PasswordResetPage from './pages/RequestResetCode';



function AppWrapper() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const publicRoutes = ['/', '/register', '/reset-password', '/suite-inscription'];
  const shouldShowNavbar = !publicRoutes.includes(location.pathname) && user;
  return (
    
    <>
      {shouldShowNavbar && <Navbar user={user} />}
      <div className="container mt-3">
        <Routes>
          {/* Auth */}
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/" element={<AuthPage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />

          {/* Pages stagiaire */}
          <Route path="/formulaire" element={<StageForm />} />
          <Route path="/attestation" element={<AttestationPage />} />
          <Route path="/stagiaires-departement" element={<StagiairesDepartement />} />
          <Route path="/stagiaires-port" element={<StagiairesPort />} />

          {/* Pages admin */}
          <Route path="/admin/demandes" element={<DemandesAdmin />} />
          <Route path="/admin/documents" element={<DocumentsAdmin />} />

          {/* Pages complémentaires */}
          <Route path="/suite-inscription" element={<SuiteInscription />} />
          <Route path="/assurance-upload/:id" element={<AssuranceUpload />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
