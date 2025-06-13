import React, { useState, useEffect } from 'react';
import { Button, Card, Alert, Spinner, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FinalisationDemande = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { 

    // Récupérer les données de l'utilisateur depuis le localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'STAGIAIRE' || user.statut !== 'VALIDEE' ) {
      navigate('/');
    }
    setUserData(user);
  }, [navigate]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Veuillez sélectionner un fichier');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('assurance', file);

      const response = await fetch('http://localhost:8080/api/users/finaliser-demande', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur lors de l\'envoi de la fiche');
      }

      const result = await response.json();
      
      // Mettre à jour le statut dans le localStorage
      const updatedUser = { ...userData, statut: result.statut };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUserData(updatedUser);

      toast.success(result.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Rediriger après un délai
      setTimeout(() => {
        navigate('/stagiaire');
      }, 3000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!userData) {
    return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" /></div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <Card className="shadow">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Finalisation de votre demande de stage</h4>
            </Card.Header>
            <Card.Body>
              <Alert variant="info">
                Votre demande a été validée par le service RH. Veuillez maintenant uploader votre 
                fiche d'assurance pour finaliser votre dossier.
              </Alert>

              {error && <Alert variant="danger">{error}</Alert>}

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFile" className="mb-4">
                  <Form.Label>Fiche d'assurance (PDF uniquement)</Form.Label>
                  <Form.Control 
                    type="file" 
                    accept=".pdf"
                    onChange={handleFileChange}
                    required
                  />
                  <Form.Text className="text-muted">
                    Veuillez uploader votre fiche d'assurance en format PDF.
                  </Form.Text>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="ms-2">Envoi en cours...</span>
                      </>
                    ) : (
                      'Envoyer la fiche d\'assurance'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="text-muted">
              Après validation de votre fiche par le service RH, votre dossier sera complet. D'ici 48h la RH vérifiera.
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinalisationDemande;