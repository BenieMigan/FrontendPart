import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Connexion from '@/feature/Connexion/index';
import Landing from '@/feature/LandingPage/Landing'
import DemandeStage from '@/feature/DemandeStage/DemandeStage'
import Register from '@/feature/Register'
import DashboardStagiaire from '@/feature/DashboardSatgiaire/DashboardStagiaire';
import SupervisorDashboard from '@/feature/SupervisorDashboard/SupervisorDashboard';
import ResetPassword from '@/feature/ResetPassword';
import DepartmentHeadDashboard from '@/feature/ChefDepartment/DepartmentHeadDashboard';
export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                {/* Page d'accueil */}
                <Route path = "/" element={<Landing/>} />
                {/* Page de connexion */}
                <Route path = "connexion" element={<Connexion/>} />
                {/* Page demande de stage */}
                <Route path="/demande-stage" element={<DemandeStage />} />
                <Route path="/register" element={<Register/>} />
                <Route path="/stagiaire/dashboard" element={<DashboardStagiaire/>} />
                <Route path="/supervisor/dashboard" element={<SupervisorDashboard/>} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/chefdepartement/dashboard" element={<DepartmentHeadDashboard/>} />
            </Routes>
        </Router>
    );
}
