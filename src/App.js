import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import DashboardRH from './components/DashboardRH';
import DashboardStagiaire from "./components/DashboardStagiaire";
import FinalisationDemande from './components/FinalisationDemande';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import RHSpace from "./components/RHSpace";
import RHValidation from './components/RHValidation';
import Register from './components/Register';
import ResetPassword from "./components/ResetPassword";
import StageForm from './components/StageForm';
import StagiaireSpace from './components/StagiaireSpace';
import TableauDeBord from './components/TableauDeBord';
import UploadAssurance from './components/UploadAssurance';
import DocumentDownload from './components/DocumentDownload';

          

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <Routes>
          <Route path="/rh" element={<RHValidation />} />
          <Route path="/register" element={<Register />} />
          <Route path="/stagiaire" element={<StagiaireSpace />} />
          <Route path="/" element={<Login />} />
          <Route path="/upload-assurance" element={<UploadAssurance />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/demandeStage" element={<StageForm />} />
          <Route path="/dashboardStagiaire" element={<DashboardStagiaire />} />
          <Route path="/rh/dashboard" element={<DashboardRH />} />
          <Route path="/rh-tableauDeBord" element={<TableauDeBord />} />

          <Route path="/stagiaire" element={
            <ProtectedRoute allowedRoles={['STAGIAIRE']}>
              <StagiaireSpace />
            </ProtectedRoute>
          } />

<Route 
  path="/telecharger-documents" 
  element={
    <ProtectedRoute allowedRoles={['STAGIAIRE']} requiredStatus="FICHE_ASSURANCE_VALIDEE">
      <DocumentDownload />
    </ProtectedRoute>
  } 
/>



        <Route 
  path="/finalisation" 
  element={
    <ProtectedRoute allowedRoles={['STAGIAIRE']} requiredStatus="VALIDEE">
      <FinalisationDemande />
    </ProtectedRoute>
  } 
/>

          <Route path="/rhspace" element={
            <ProtectedRoute allowedRoles={['RH']}>
              <RHSpace />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
