import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ user }) {
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

            {/* Stagiaire : pages accessibles */}
            {user.role === 'stagiaire' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/formulaire">Inscription Stagiaire</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/stagiaires-departement">Stagiaires par Département</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/stagiaires-port">Stagiaires au Port</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/attestation">Retirer Attestation</Link>
                </li>
              </>
            )}

            {/* Admin : pages admin */}
            {user.role === 'admin' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/demandes">Demandes</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/documents">Documents générés</Link>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
