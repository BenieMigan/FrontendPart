import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Connexion from '@/feature/Connexion/index'
import Landing from '@/feature/LandingPage/Landing'
import DemandeStage from '@/feature/DemandeStage/DemandeStage'
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
            </Routes>
        </Router>
    )
}
