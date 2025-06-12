import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Connexion from '@/feature/Connexion/index'
export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path = "connexion" element={<Connexion/>} />
            </Routes>
        </Router>
    )
}
