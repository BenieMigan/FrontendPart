import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import StageForm from './components/StageForm'; // <<< ajoute ton formulaire utilisateur

function App() {
  return (
    <div className="container mt-3">
      {/* Nouveau formulaire d'inscription */}
      <StageForm />
    </div> // <<< ici : la bonne fermeture
  );
};

export default App;