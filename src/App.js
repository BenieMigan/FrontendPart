import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import StagiaireSpace from './components/StagiaireSpace'; // ajouter ceci en haut


import StageForm from './components/StageForm';
import RHValidation from './components/RHValidation';
import UploadAssurance from './components/UploadAssurance';
import Register from './components/Register';
import Login from './components/Login';
import LoginRH from './components/LoginRH';
import LoginTableauDeBord from './components/LoginTableauDeBord';
import DashboardRH from './components/DashboardRH';
import FinalisationDemande from './components/FinalisationDemande';
import TableauDeBord from './components/TableauDeBord';
import PrivateRoute from "./components/PrivateRoute";
import RHSpace from "./components/RHSpace";


// Ajoutez cette route protégée



function App() {
  return (
    <Router>
      <div className="container mt-3">

        <Routes>
          <Route path="/rh" element={<RHValidation />} />
          <Route path="/register" element={<Register />} />
        <Route path="/rh/login" element={<LoginRH />} />
        <Route path="/finalisation/:token" element={<FinalisationDemande />} />
          <Route path="/" element={<StagiaireSpace />} /> 
        <Route path="/upload-assurance" element={<UploadAssurance />} />

          <Route path="/login" element={<Login />} />
        <Route
          path="/stagiaire"
          element={
            <PrivateRoute>
              <StageForm />
            </PrivateRoute>
          }
        />

         <Route 
          path="/rh/dashboard" 
          element={
            <ProtectedRouteRH>
              <DashboardRH />
            </ProtectedRouteRH>
          } 
        />

        
         <Route 
          path="/rh-tableauDeBord" 
          element={
            <ProtectedRouteRH>
              <TableauDeBord />
            </ProtectedRouteRH>
          } 
        />

        <Route path="/rhspace" element={<RHSpace />} />
        <Route path="/loginrh" element={<LoginTableauDeBord />} />


        </Routes>
      </div>
    </Router>
  );
}

// Composant de protection de route
function ProtectedRouteRH({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/rh/login" replace />;
  }

  return children;
}


export default App;
