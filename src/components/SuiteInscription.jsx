import React, { useState } from 'react';

function SuiteInscription() {
  const [assurance, setAssurance] = useState(null);

  const handleUpload = (e) => {
    setAssurance(e.target.files[0]);
  };

  const handleSubmit = () => {
    // Appel API pour envoyer le fichier
    console.log("Fichier à envoyer :", assurance);
  };

  return (
    <div>
      <h2>Étape suivante de l'inscription</h2>

      <h4>1. Téléverser la fiche d’assurance</h4>
      <input type="file" onChange={handleUpload} />
      <button onClick={handleSubmit}>Envoyer</button>

      <h4>2. Documents à télécharger</h4>
      <ul>
        <li><a href="/docs/convention.pdf" download>Télécharger la Convention</a></li>
        <li><a href="/docs/formulaire.pdf" download>Télécharger le Formulaire</a></li>
        {/* Pas de note de service ici */}
      </ul>
    </div>
  );
}

export default SuiteInscription;
