import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <div>
      <h2>Bienvenue sur votre tableau de bord</h2>
      <Link to="/admin/demandes">
        <button className="btn btn-primary">Accéder à la gestion des demandes</button>
      </Link>
    </div>
  );
}

export default Dashboard;
