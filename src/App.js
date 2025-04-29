import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import StageForm from './components/StageForm';
import ValidationRH from './components/ValidationRH';

function App() {
  return (
    <Router>
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Navigate to="/stagiaire" />} />
          <Route path="/stagiaire" element={<StageForm />} />
          <Route path="/rh" element={<ValidationRH />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
