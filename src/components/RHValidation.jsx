import { useState, useEffect } from "react";

function RHValidation() {
    const [demandes, setDemandes] = useState([]);
    const [selectedDemande, setSelectedDemande] = useState(null);

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

    const handleViewDetails = (demande) => {
        setSelectedDemande(demande);
    };

    const handleCloseDetails = () => {
        setSelectedDemande(null);
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
                fetchDemandes();
                alert("Demande rejetée !");
            }
        } catch (error) {
            console.error("Erreur:", error);
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Demandes de stage</h2>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Prénom</th>
                        <th>Email</th>
                        <th>Statut</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {demandes.map(demande => (
                        <tr key={demande.id}>
                            <td>{demande.nom}</td>
                            <td>{demande.prenom}</td>
                            <td>{demande.email}</td>
                            <td>
                                <span className={`badge ${
                                    demande.statut === "VALIDEE" ? "bg-success" : 
                                    demande.statut === "REJETEE" ? "bg-danger" : "bg-warning"
                                }`}>
                                    {demande.statut}
                                </span>
                            </td>
                            <td>
                                <button 
                                    onClick={() => handleViewDetails(demande)}
                                    className="btn btn-info btn-sm me-2"
                                >
                                    Détails du stagiaire
                                </button>
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

            {/* Modal pour afficher les détails */}
            {selectedDemande && (
                <div className="modal fade show" style={{display: 'block', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Détails de la demande</h5>
                                <button type="button" className="btn-close" onClick={handleCloseDetails}></button>
                            </div>
                            <div className="modal-body">
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h6>Informations personnelles</h6>
                                        <p><strong>Civilité:</strong> {selectedDemande.civilite}</p>
                                        <p><strong>Nom:</strong> {selectedDemande.nom}</p>
                                        <p><strong>Prénom:</strong> {selectedDemande.prenom}</p>
                                        <p><strong>Email:</strong> {selectedDemande.email}</p>
                                        <p><strong>Contact d'urgence:</strong> {selectedDemande.contactUrgent}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Informations académiques</h6>
                                        <p><strong>Filière:</strong> {selectedDemande.filiere}</p>
                                        <p><strong>Année académique:</strong> {selectedDemande.anneeAcademique}</p>
                                        <p><strong>Établissement:</strong> {selectedDemande.nomEtablissement}</p>
                                        <p><strong>Adresse établissement:</strong> {selectedDemande.adresseEtablissement}</p>
                                    </div>
                                </div>
                                
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <h6>Informations sur le stage</h6>
                                        <p><strong>Type de stage:</strong> {selectedDemande.typeStage}</p>
                                        <p><strong>Date de début:</strong> {selectedDemande.dateDebut}</p>
                                        <p><strong>Date de fin:</strong> {selectedDemande.dateFin}</p>
                                    </div>
                                    <div className="col-md-6">
                                        <h6>Directions demandées</h6>
                                        <ul>
                                            {selectedDemande.directions && selectedDemande.directions.map((dir, index) => (
                                                <li key={index}>{dir}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                
                                <div className="mb-3">
                                    <h6>Message</h6>
                                    <p>{selectedDemande.message}</p>
                                </div>
                                
                                <div className="mb-3">
    <h6>Documents</h6>
    <div className="d-flex gap-2">
        <a 
            href={`http://localhost:8080/api/rh/documents/${selectedDemande.id}/cv`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
        >
            <i className="bi bi-file-earmark-pdf me-2"></i> Voir CV
        </a>
        <a 
            href={`http://localhost:8080/api/rh/documents/${selectedDemande.id}/lettre`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-primary"
        >
            <i className="bi bi-file-earmark-text me-2"></i> Voir Lettre
        </a>
    </div>
</div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    onClick={() => handleValidation(selectedDemande.id)}
                                    className="btn btn-success me-2"
                                    disabled={selectedDemande.statut === "VALIDEE"}
                                >
                                    Valider
                                </button>
                                <button 
                                    onClick={() => handleRejet(selectedDemande.id)}
                                    className="btn btn-danger me-2"
                                    disabled={selectedDemande.statut === "REJETEE"}
                                >
                                    Rejeter
                                </button>
                                <button 
                                    onClick={handleCloseDetails}
                                    className="btn btn-secondary"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default RHValidation;