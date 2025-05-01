// RHValidation.jsx
import { useState, useEffect } from "react";

function RHValidation() {
    const [demandes, setDemandes] = useState([]);

    useEffect(() => {
        fetchDemandes();
    }, []);

    const fetchDemandes = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/rh/demandes");
            if (response.ok) {
                const data = await response.json();
                setDemandes(data);
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };
  
    const handleValidation = async (id) => {
      try {
          const response = await fetch(`http://localhost:8080/api/rh/demandes/${id}/validation`, {
              method: "PUT"
          });
          
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.message || "Erreur lors de la validation");
          }
          
          const updatedDemande = await response.json();
          setDemandes(demandes.map(d => 
              d.id === updatedDemande.id ? updatedDemande : d
          ));
          alert("Demande validée avec succès !");
      } catch (error) {
          console.error("Erreur:", error);
          alert(error.message);
      }
  };
  
      const handleRejet = async (id) => {
          try {
              const response = await fetch(`http://localhost:8080/api/rh/demandes/${id}/rejet`, {
                  method: "PUT"
              });
              
              if (response.ok) {
                  fetchDemandes(); // Rafraîchir la liste
                  alert("Demande rejetée !");
              }
          } catch (error) {
              console.error("Erreur:", error);
          }
      };
  
      return (
          <div className="container mt-5">
              <table className="table">
                  <thead>
                      <tr>
                          <th>Nom</th>
                          <th>Prénom</th>
                          <th>Statut</th>
                          <th>Actions</th>
                      </tr>
                  </thead>
                  <tbody>
                      {demandes.map(demande => (
                          <tr key={demande.id}>
                              <td>{demande.nom}</td>
                              <td>{demande.prenom}</td>
                              <td>{demande.statut}</td>
                              <td>
                                  <button 
                                      onClick={() => handleValidation(demande.id)}
                                      className="btn btn-success btn-sm me-2"
                                      disabled={demande.statut === "VALIDEE"}
                                  >
                                      Valider
                                  </button>
                                  <button 
                                      onClick={() => handleRejet(demande.id)}
                                      className="btn btn-danger btn-sm"
                                      disabled={demande.statut === "REJETEE"}
                                  >
                                      Rejeter
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      );
  }

export default RHValidation;