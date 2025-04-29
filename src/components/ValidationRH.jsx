import { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Badge } from "react-bootstrap";

function ValidationRH() {
  const [demandes, setDemandes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDemande, setCurrentDemande] = useState(null);
  const [motif, setMotif] = useState("");

  const fetchDemandes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/demandes/en-attente");
      if (response.ok) {
        const data = await response.json();
        setDemandes(data);
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const handleValider = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/demandes/${id}/valider`, {
        method: "PUT",
      });
      if (response.ok) {
        fetchDemandes();
        alert("Demande validée avec succès !");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const handleRejeter = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/demandes/${currentDemande.id}/rejeter`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ motif }),
      });
      if (response.ok) {
        setShowModal(false);
        fetchDemandes();
        alert("Demande rejetée avec succès !");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  const getBadgeColor = (statut) => {
    switch (statut) {
      case "VALIDEE":
        return "success";
      case "REJETEE":
        return "danger";
      default:
        return "warning";
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Validation des demandes de stage</h2>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Type de stage</th>
            <th>Établissement</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande) => (
            <tr key={demande.id}>
              <td>{demande.nom}</td>
              <td>{demande.prenom}</td>
              <td>{demande.email}</td>
              <td>{demande.typeStage}</td>
              <td>{demande.nomEtablissement}</td>
              <td>
                <Badge bg={getBadgeColor(demande.statut)}>
                  {demande.statut}
                </Badge>
              </td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => handleValider(demande.id)}
                >
                  Valider
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => {
                    setCurrentDemande(demande);
                    setShowModal(true);
                  }}
                >
                  Rejeter
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Motif du rejet</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Veuillez indiquer le motif du rejet :</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={motif}
              onChange={(e) => setMotif(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="danger" onClick={handleRejeter}>
            Confirmer le rejet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ValidationRH;