import React, { useEffect, useState } from 'react';

function StagiairesDepartement() {
  const [stagiaires, setStagiaires] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStagiaires = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/stagiaires/departement");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des stagiaires");
        }
        const data = await response.json();
        setStagiaires(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStagiaires();
  }, []);

  if (loading) {
    return <div>Chargement des stagiaires...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <h2>Stagiaires par Département</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Département</th>
            <th>Disponibilité</th>
          </tr>
        </thead>
        <tbody>
          {stagiaires.map((stagiaire, index) => (
            <tr key={index}>
              <td>{stagiaire.nom}</td>
              <td>{stagiaire.prenom}</td>
              <td>{stagiaire.departement}</td>
              <td>{stagiaire.disponible ? 'Disponible' : 'Indisponible'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StagiairesDepartement;
