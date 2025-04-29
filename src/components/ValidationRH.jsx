import { useEffect, useState } from "react";

function ValidationRH() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDemandes = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/users");
      const data = await res.json();
      console.log("Données reçues :", data); // 👈 debug ici
      if (Array.isArray(data)) {
        setDemandes(data);
      } else {
        console.warn("Réponse inattendue : pas un tableau");
        setDemandes([]); // fallback propre
      }
    } catch (error) {
      console.error("Erreur chargement demandes:", error);
      setDemandes([]); // sécurité
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const validerDemande = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/users/${id}/valider`, {
        method: "POST",
      });
      if (res.ok) {
        alert("Demande validée et email envoyé !");
        fetchDemandes();
      } else {
        alert("Erreur lors de la validation");
      }
    } catch (err) {
      console.error("Erreur validation:", err);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Demandes de Stage à Valider</h2>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Direction</th>
              <th>CV</th>
              <th>Lettre</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(demandes) && demandes.length > 0 ? (
              demandes.map((u) => (
                <tr key={u.id}>
                  <td>{u.nom}</td>
                  <td>{u.prenom}</td>
                  <td>{u.email}</td>
                  <td>{u.directions?.join(", ")}</td>
                  <td>
                    <a
                      href={`http://localhost:8080/uploads/${u.cvPath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Voir CV
                    </a>
                  </td>
                  <td>
                    <a
                      href={`http://localhost:8080/uploads/${u.lettrePath}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline-primary btn-sm"
                    >
                      Voir Lettre
                    </a>
                  </td>
                  <td>
                    <button className="btn btn-success btn-sm" onClick={() => validerDemande(u.id)}>
                      Valider
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Aucune demande disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ValidationRH;
