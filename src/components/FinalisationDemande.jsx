import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner, Card, Row, Col } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import axios from 'axios';

function FinalisationDemande() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [demande, setDemande] = useState(null);
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState('');

  // Liste des images statiques à télécharger

  const [downloads, setDownloads] = useState({
  noteService: false,
  demandeStage: false,
  staticattestation: false,
  staticB: false,
  staticorganigramme: false
});

const allDownloaded = Object.values(downloads).every(Boolean);


  const staticDocuments = [
    { 
      name: 'attestation.jpg', 
      displayName: 'Fiche d\'attestation',
      description: 'Telecharger votre fiche d\'attestation'
    },
    { 
      name: 'B.jpg', 
      displayName: 'Engagement personnel',
      description: 'Engagement personnel pour les stagiaires'
    },
    { 
      name: 'organigramme.jpg', 
      displayName: 'Organigramme du pac',
      description: 'Plan pour accéder à nos locaux'
    }
  ];

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/validate-finalization-token?token=${token}`
        );
        
        if (response.data.error) {
          throw new Error(response.data.error);
        }
        
        setDemande(response.data);
      } catch (err) {
        setError(err.response?.data?.error || err.message);
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    try {
      setUploading(true);
      setError('');
      
      const formData = new FormData();
      formData.append('assurance', file);
      formData.append('token', token);

      const response = await axios.put(
        `http://localhost:8080/api/users/${demande.id}/upload-assurance`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      // Mettre à jour les données de la demande après l'upload
      setDemande(response.data);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.error || 'Erreur lors de l\'envoi du fichier');
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadDemandeStage = async () => {
    try {
        setDownloading(true);
        setDownloadError('');
        
        const response = await axios.get(
            `http://localhost:8080/api/users/${demande.id}/generate-demande-stage?token=${token}`,
            {
                responseType: 'blob',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        // Créer un URL pour le blob et déclencher le téléchargement
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'demande-stage.pdf');
        document.body.appendChild(link);
        link.click();
        link.remove();
        setDownloads(prev => ({ ...prev, demandeStage: true }));

    } catch (err) {
        setDownloadError(err.response?.data?.message || 'Erreur lors du téléchargement de la demande de stage');
    } finally {
        setDownloading(false);
    }
  };

  const handleDownloadNoteService = async () => {
    try {
      setDownloading(true);
      setDownloadError('');
      
      const response = await axios.get(
        `http://localhost:8080/api/users/${demande.id}/generate-note-service?token=${token}`,
        {
          responseType: 'blob',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      // Créer un URL pour le blob et déclencher le téléchargement
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'note-service.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
      setDownloads(prev => ({ ...prev, noteService: true }));

    } catch (err) {
      setDownloadError(err.response?.data?.message || 'Erreur lors du téléchargement de la note de service');
    } finally {
      setDownloading(false);
    }
  };

const handleDownloadStaticDocument = async (docName) => {
  try {
    setDownloading(true);
    setDownloadError('');

    // Ajoutez le type MIME approprié selon l'extension
    const mimeTypes = {
      '.jpeg': 'image/jpeg',
      '.jpg': 'image/jpeg',
      '.png': 'image/png'
    };

    const ext = docName.slice(docName.lastIndexOf('.'));
    const mimeType = mimeTypes[ext] || 'application/octet-stream';

    const response = await fetch(`${process.env.PUBLIC_URL}/documents/${docName}`);
    if (!response.ok) throw new Error("Fichier non trouvé");

    const blob = await response.blob();
    const correctedBlob = new Blob([blob], { type: mimeType }); // Force le bon type MIME

    const url = window.URL.createObjectURL(correctedBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = docName;
    document.body.appendChild(link);
    link.click();

    // Nettoyage retardé
    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);

    // Mise à jour du statut
    const downloadKey = {
      'attestation.jpg': 'staticattestation',
      'B.jpg': 'staticB',
      'organigramme.jpg': 'staticorganigramme'
    }[docName];
    
    if (downloadKey) setDownloads(prev => ({ ...prev, [downloadKey]: true }));

  } catch (err) {
    setDownloadError(`Erreur: ${err.message}`);
    console.error("Échec du téléchargement:", err);
  } finally {
    setDownloading(false);
  }
};

  if (loading) return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" /></div>;
  
  if (error) return (
    <div className="container mt-5">
      <Alert variant="danger">
        <h4>Erreur</h4>
        <p>{error}</p>
        <Button variant="primary" onClick={() => navigate('/')}>
          Retour à l'accueil
        </Button>
      </Alert>
    </div>
  );

  return (
    <div className="container mt-5">
        <Card>
            <Card.Header as="h5">Finalisation de votre demande</Card.Header>
            <Card.Body>
                {!success ? (
                    <>
                        <Card.Text>
                            Votre demande de stage a été acceptée. Pour finaliser votre dossier, veuillez uploader 
                            votre fiche d'assurance (format PDF ou image).
                        </Card.Text>
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Fiche d'assurance</Form.Label>
                                <Form.Control 
                                    type="file" 
                                    onChange={(e) => setFile(e.target.files[0])} 
                                    accept=".pdf,.jpg,.jpeg,.png" 
                                    required 
                                />
                                <Form.Text className="text-muted">
                                    Formats acceptés: PDF, JPG, JPEG, PNG
                                </Form.Text>
                            </Form.Group>
                            
                            <Button variant="primary" type="submit" disabled={uploading}>
                                {uploading ? 'Envoi en cours...' : 'Envoyer'}
                            </Button>
                        </Form>
                    </>
                ) : (
                    <>
                        <Alert variant="success" className="mb-4">
                            Votre fiche d'assurance a été envoyée avec succès. Votre demande est maintenant complète,telecharger tous ses documents pour pouvoir avoir accès a nos locaux tout au long de votre stage.
                        </Alert>
                        
                        <Row className="mt-4">
                            <Col md={6}>
                                <Card className="mb-4">
                                    <Card.Body>
                                        <Card.Title>Documents Administratifs</Card.Title>
                                        
                                        <Card.Text className="mb-3">
                                            Téléchargez votre note de service officielle.
                                        </Card.Text>
                                        {downloadError && downloadError.includes('note de service') && (
                                            <Alert variant="danger" className="mb-3">
                                                {downloadError}
                                            </Alert>
                                        )}
                                        <Button 
                                            variant="success" 
                                            onClick={handleDownloadNoteService}
                                            disabled={downloading}
                                            className="w-100 mb-3"
                                        >
                                            {downloading && downloadError.includes('note de service') 
                                                ? 'Génération en cours...' 
                                                : 'Télécharger la Note de Service'}
                                        </Button>
                                        
                                        <Card.Text className="mb-3">
                                            Téléchargez votre demande de stage officielle.
                                        </Card.Text>
                                        {downloadError && downloadError.includes('demande de stage') && (
                                            <Alert variant="danger" className="mb-3">
                                                {downloadError}
                                            </Alert>
                                        )}
                                        <Button 
                                            variant="primary" 
                                            onClick={handleDownloadDemandeStage}
                                            disabled={downloading}
                                            className="w-100 mb-3"
                                        >
                                            {downloading && downloadError.includes('demande de stage') 
                                                ? 'Génération en cours...' 
                                                : 'Télécharger la Demande de Stage'}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            <Col md={6}>
                                <Card className="mb-4">
                                    <Card.Body>
                                        <Card.Title>Documents Informatifs</Card.Title>
                                        
                                        {staticDocuments.map((doc, index) => (
                                            <div key={index} className="mb-3">
                                                <Card.Text>
                                                    <strong>{doc.displayName}</strong>: {doc.description}
                                                </Card.Text>
                                              <Button 
  variant="outline-primary" 
  onClick={() => handleDownloadStaticDocument(doc.name)}
  disabled={downloading}
  className="w-100"
>
  {downloading ? 'Téléchargement...' : `Télécharger ${doc.displayName}`}
</Button>
                                            </div>
                                        ))}
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        {allDownloaded && (
  <Alert variant="info" className="mt-4 text-center">
    <h5>Processus achevé</h5>
    <p>Vous débutez votre stage demain à <strong>8H</strong>. Veuillez passer au département des <strong>Ressources Humaines</strong>.</p>
  </Alert>
)}

                      <div className="mt-4 d-flex justify-content-start">
  <Button
    variant="outline-secondary"
    className="px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2"
    onClick={() => navigate('/')}
  >
    <BsArrowLeftCircleFill size={20} />
    Retourner à l'accueil
  </Button>
</div>

                    </>
                )}
            </Card.Body>
        </Card>
    </div>
  );
}

export default FinalisationDemande;