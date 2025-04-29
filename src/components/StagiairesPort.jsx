import React, { useEffect, useState } from 'react';

const StagiairesPort = () => {
  const [stagiaires, setStagiaires] = useState([]);
  const [loading, setLoading] = useState(true);  // To track loading state
  const [error, setError] = useState(null);      // To track errors

  useEffect(() => {
    const fetchStagiaires = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/stagiaires/port");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des stagiaires");
        }
        const data = await response.json();
        setStagiaires(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // End loading once data is fetched or an error occurs
      }
    };

    fetchStagiaires();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <h2>Stagiaires au Port</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Disponibilité</th>
          </tr>
        </thead>
        <tbody>
          {stagiaires.map((stagiaire, index) => (
            <tr key={index}>
              <td>{stagiaire.nom}</td>
              <td>{stagiaire.prenom}</td>
              <td>{stagiaire.disponible ? 'Disponible' : 'Indisponible'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StagiairesPort;
