import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        {/* Logo sans lien */}
        <img
          src="/logo.png"
          alt="Logo Port Autonome"
          style={{ height: "40px", marginRight: "15px" }}
        />

        {/* Bouton burger (mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Liens de navigation */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-3">
            {/* Inscription Stagiaire */}
            <li className="nav-item">
              <Link className="nav-link active" to="/formulaire">Inscription Stagiaire</Link>
            </li>

            {/* Stagiaires par Département */}
            <li className="nav-item">
              <Link className="nav-link" to="/stagiaires-departement">Stagiaires par Département</Link>
            </li>

            {/* Stagiaires au Port */}
            <li className="nav-item">
              <Link className="nav-link" to="/stagiaires-port">Stagiaires au Port</Link>
            </li>

            {/* Retirer Attestation */}
            <li className="nav-item">
              <Link className="nav-link" to="/attestation">Retirer Attestation</Link>
            </li>

            {/* Documents générés (dernière position) */}
            <li className="nav-item">
              <Link className="nav-link" to="/admin/documents">Documents générés</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
