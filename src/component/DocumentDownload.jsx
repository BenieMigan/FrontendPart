import React, { useState, useEffect } from 'react';
import { Alert, Button, Card, Spinner, Modal, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const DocumentDownload = () => {
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [downloadedDocs, setDownloadedDocs] = useState([]);
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const navigate = useNavigate();

  const staticDocuments = [
    { name: "attestation.jpg", displayName: "Demande d'attestation de fin de stage" },
    { name: "engagement.jpg", displayName: "Engagement à écrire derrière la fiche" },
    { name: "organigramme.jpg", displayName: "Organigramme du PAC" }
  ];

  const handleDownload = async (filename) => {
    try {
      if (filename.endsWith('.jpg')) {
        const link = document.createElement('a');
        link.href = `/documents/${filename}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        if (!downloadedDocs.includes(filename)) {
          setDownloadedDocs([...downloadedDocs, filename]);
        }
        return;
      }

      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:8080/api/users/documents/download/${encodeURIComponent(filename)}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (!response.ok) throw new Error('Échec du téléchargement');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      if (!downloadedDocs.includes(filename)) {
        setDownloadedDocs([...downloadedDocs, filename]);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const allDocumentsDownloaded = () => {
    if (!documents) return false;

    const allDocs = [
      documents.noteDeService,
      documents.demandeStage,
      ...staticDocuments.map(doc => doc.name)
    ];

    return allDocs.every(doc => downloadedDocs.includes(doc));
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        const response = await fetch(`http://localhost:8080/api/users/documents/${user.id}/generate`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error(await response.text());

        const data = await response.json();
        setDocuments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const confirmDownload = async () => {
    try {
      if (!allDocumentsDownloaded()) {
        toast.warning("Veuillez télécharger tous les documents avant de confirmer");
        return;
      }

      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));

      const response = await fetch(`http://localhost:8080/api/users/documents/${user.id}/confirm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error(await response.text());

      const result = await response.json();

      const updatedUser = {
        ...user,
        statut: result.statut,
        alerte: "Vous êtes maintenant stagiaire au PAC. Veuillez commencer votre stage le lendemain."
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setShowModal(false);
      setShowFinalMessage(true);

setTimeout(() => {
  navigate('/stagiaire');
}, 7000);
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h4>Téléchargement des documents administratifs</h4>
        </Card.Header>
        <Card.Body>
          <Alert variant="success">
            Votre fiche d'assurance a été validée. Veuillez télécharger tous les documents suivants :
          </Alert>

          <div className="mb-4">
            <h5>Documents générés :</h5>
            <ListGroup className="mb-3">
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>Note de service</span>
                <Button
                  variant={downloadedDocs.includes(documents.noteDeService) ? "success" : "primary"}
                  size="sm"
                  onClick={() => handleDownload(documents.noteDeService)}
                >
                  {downloadedDocs.includes(documents.noteDeService) ? '✔ Téléchargé' : 'Télécharger'}
                </Button>
              </ListGroup.Item>
              <ListGroup.Item className="d-flex justify-content-between align-items-center">
                <span>Demande de stage</span>
                <Button
                  variant={downloadedDocs.includes(documents.demandeStage) ? "success" : "primary"}
                  size="sm"
                  onClick={() => handleDownload(documents.demandeStage)}
                >
                  {downloadedDocs.includes(documents.demandeStage) ? '✔ Téléchargé' : 'Télécharger'}
                </Button>
              </ListGroup.Item>
            </ListGroup>

            <h5>Documents complémentaires :</h5>
            <ListGroup>
              {staticDocuments.map((doc, index) => (
                <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                  <span>{doc.displayName}</span>
                  <Button
                    variant={downloadedDocs.includes(doc.name) ? "success" : "primary"}
                    size="sm"
                    onClick={() => handleDownload(doc.name)}
                  >
                    {downloadedDocs.includes(doc.name) ? '✔ Téléchargé' : 'Télécharger'}
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Card.Body>
        <Card.Footer className="d-flex justify-content-end">
          <Button
            onClick={() => setShowModal(true)}
            variant={allDocumentsDownloaded() ? "success" : "secondary"}
            size="lg"
            disabled={!allDocumentsDownloaded()}
          >
            {allDocumentsDownloaded() ? 'Confirmer les téléchargements' : 'Téléchargez tous les documents pour confirmer'}
          </Button>
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Êtes-vous sûr d'avoir bien téléchargé tous les documents nécessaires ?
          Cette action marquera votre dossier comme complet.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Annuler
          </Button>
          <Button variant="primary" onClick={confirmDownload}>
            Confirmer
          </Button>
        </Modal.Footer>
      </Modal>

      {showFinalMessage && (
        <Alert variant="success" className="mt-4 text-center fs-5">
          Vous êtes maintenant stagiaire au PAC. Veuillez commencer votre stage le lendemain.
        </Alert>
      )}
    </div>
  );
};

export default DocumentDownload;
