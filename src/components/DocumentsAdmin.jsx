import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';

const DocumentsAdmin = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Données fictives pour simuler les documents
    const docsFictifs = [
      {
        id: 1,
        nom: 'Attestation Alice',
        url: '/documents/attestation_alice.pdf',
      },
      {
        id: 2,
        nom: 'Attestation Marc',
        url: '/documents/attestation_marc.pdf',
      },
    ];
    setDocuments(docsFictifs);
  }, []);

  return (
    <div className="container mt-4">
      <h3>📂 Documents générés</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Nom du document</th>
            <th>Aperçu</th>
            <th>Téléchargement</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={doc.id}>
              <td>{index + 1}</td>
              <td>{doc.nom}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => window.open(doc.url, '_blank')}
                >
                  Voir PDF
                </Button>
              </td>
              <td>
                <a href={doc.url} download className="btn btn-secondary btn-sm">
                  Télécharger
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DocumentsAdmin;
