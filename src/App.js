import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import DashboardRH from './component/DashboardRH';
import DashboardStagiaire from "./component/DashboardStagiaire";
import FinalisationDemande from './component/FinalisationDemande';
import Login from './component/Login';
import ProtectedRoute from './component/ProtectedRoute';
import RHSpace from "./component/RHSpace";
import RHValidation from './component/RHValidation';
import Register from './component/Register';
import ResetPassword from "./component/ResetPassword";
import StageForm from './component/StageForm';
import StagiaireSpace from './component/StagiaireSpace';
import TableauDeBord from './component/TableauDeBord';
import UploadAssurance from './component/UploadAssurance';
import DocumentDownload from './component/DocumentDownload';

          

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
