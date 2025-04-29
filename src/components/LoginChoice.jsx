import React from 'react';
import { useUser } from '../context/UserContext';

function LoginChoice() {
  const { login } = useUser();

  return (
    <div className="text-center mt-5">
      <h3>Choisissez votre rôle :</h3>
      <button className="btn btn-primary m-2" onClick={() => login("admin")}>
        Connexion Admin
      </button>
      <button className="btn btn-secondary m-2" onClick={() => login("stagiaire")}>
        Connexion Stagiaire
      </button>
    </div>
  );
}

export default LoginChoice;
