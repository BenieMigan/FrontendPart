import React, { useState, useEffect } from 'react';
import { Table, Button, Badge } from 'react-bootstrap';

const DemandesAdmin = () => {
  const [demandes, setDemandes] = useState([]);

  useEffect(() => {
    const donneesFictives = [
      { id: 1, nom: 'Alice', email: 'alice@gmail.com', type: 'scolarité', statut: 'En attente' },
      { id: 2, nom: 'Marc', email: 'marc@yahoo.com', type: 'réussite', statut: 'Validé' },
    ];
    setDemandes(donneesFictives);
  }, []);

  const updateStatut = (id, nouveauStatut) => {
    setDemandes(demandes.map((d) =>
      d.id === id ? { ...d, statut: nouveauStatut } : d
    ));
  };

  const getBadge = (statut) => {
    switch (statut) {
      case 'Validé': return <Badge bg="success">Validé</Badge>;
      case 'Rejeté': return <Badge bg="danger">Rejeté</Badge>;
      default: return <Badge bg="warning">En attente</Badge>;
    }
  };

  return (
    <div className="container mt-4">
      <h3>Demandes d’attestation</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom</th>
            <th>Email</th>
            <th>Type</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {demandes.map((demande, index) => (
            <tr key={demande.id}>
              <td>{index + 1}</td>
              <td>{demande.nom}</td>
              <td>{demande.email}</td>
              <td>{demande.type}</td>
              <td>{getBadge(demande.statut)}</td>
              <td>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={() => updateStatut(demande.id, 'Validé')}
                  disabled={demande.statut === 'Validé'}
                >
                  Valider
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => updateStatut(demande.id, 'Rejeté')}
                  disabled={demande.statut === 'Rejeté'}
                >
                  Rejeter
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DemandesAdmin;
