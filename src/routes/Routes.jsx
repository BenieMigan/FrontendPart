import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Connexion from '@/feature/Connexion/index';
import Register from '@/feature/Register'
export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/RegisterForm" element={<Register />} />
            </Routes>
        </Router>
    );
}
