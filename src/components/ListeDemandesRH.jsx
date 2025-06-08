import { useEffect, useState } from 'react';
import { Alert, Badge, Button, Card, Col, Modal, Row, Spinner, Table } from 'react-bootstrap';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container , Form} from 'react-bootstrap';


function ListeDemandesRH() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDemande, setSelectedDemande] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDemandes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('Non authentifié');

        const response = await fetch('http://localhost:8080/api/rh/demandes', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          if (response.status === 403) throw new Error('Accès refusé - RH uniquement');
          throw new Error('Erreur serveur');
        }

        const data = await response.json();
        setDemandes(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDemandes();
  }, []);
// Ajouter cette fonction pour valider la fiche d'assurance
const validerFicheAssurance = async (stagiaireId) => {
  if (!window.confirm('Êtes-vous sûr de vouloir valider cette fiche d\'assurance ? Cette action permettra au stagiaire de télécharger ses documents administratifs.')) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:8080/api/rh/valider-fiche-assurance/${stagiaireId}`,
      {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    if (!response.ok) throw new Error(await response.text());

    const result = await response.json();
    toast.success(result.message);
    updateLocalStatut(stagiaireId, result.statut);
  } catch (err) {
    toast.error(err.message);
  }
};

 const rejeterFicheAssurance = async (id) => {
  if (!window.confirm('Êtes-vous sûr de vouloir rejeter cette fiche d\'assurance ? Cette action supprimera définitivement la demande et enverra une notification au stagiaire.')) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(
      `http://localhost:8080/api/rh/rejeter-demande-assurance/${id}`,
      {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      }
    );

    if (!response.ok) throw new Error(await response.text());

    const result = await response.json();
    toast.success(result.message);
    // Mettre à jour la liste locale
    setDemandes(prev => prev.filter(d => d.id !== id));
  } catch (err) {
    toast.error(err.message);
  }
};
  const updateLocalStatut = (id, newStatut) => {
    setDemandes(prev => prev.map(d => d.id === id ? { ...d, statut: newStatut } : d));
    if (selectedDemande?.id === id) {
      setSelectedDemande(prev => ({ ...prev, statut: newStatut }));
    }
  };

const updateStatut = async (id, statut) => {
  try {
    // Vérifier si on essaie de rejeter une demande déjà validée
    if (statut === 'REJETEE') {
      const demande = demandes.find(d => d.id === id);
      if (demande && demande.statut === 'VALIDEE') {
        throw new Error("Impossible de rejeter une demande déjà validée");
      }
    }

    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/rh/demandes/${id}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ statut })
    });

    // Gérer la réponse différemment selon le statut
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error || errorData.message || "Échec de la mise à jour";
      throw new Error(errorMessage);
    }

    const responseData = await response.json();
    
    if (statut === 'REJETEE') {
      setDemandes(prev => prev.filter(d => d.id !== id));
      if (selectedDemande?.id === id) setShowModal(false);
      
      // Recharger les données du tableau de bord
      try {
        const statsResponse = await fetch('http://localhost:8080/api/rh/dashboard/stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!statsResponse.ok) throw new Error("Erreur lors du rechargement des stats");
      } catch (err) {
        console.error("Erreur lors du rechargement des stats:", err);
      }
    } else {
      updateLocalStatut(id, statut);
    }
  } catch (err) {
    // Utiliser une alerte plus propre ou un toast
    alert(`Erreur: ${err.message}`);
  }
};

const handleDeleteDemande = async (id) => {
  if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette demande ? ')) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:8080/api/rh/demandes/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!response.ok) throw new Error("Échec de la suppression");
    
    // Mise à jour locale
    setDemandes(prev => prev.filter(d => d.id !== id));
    if (selectedDemande?.id === id) setShowModal(false);
    
  } catch (err) {
    alert(`Erreur: ${err.message}`);
  }
};


// Modifier le badge pour inclure les nouveaux statuts
  const getBadge = (statut) => {
    switch (statut) {
      case 'VALIDEE': return <Badge bg="success">Validée</Badge>;
      case 'REJETEE': return <Badge bg="danger">Rejetée</Badge>;
      case 'EN_ATTENTE_VALIDATION': return <Badge bg="warning">Fiche à valider</Badge>;
      case 'FICHE_ASSURANCE_VALIDEE': return <Badge bg="info">Fiche validée</Badge>;
      case 'DOCUMENT_COMPLET': return <Badge bg="primary">Finalisée</Badge>;
      default: return <Badge bg="secondary">En attente</Badge>;
    }
  };

  if (loading) return <div className="d-flex justify-content-center mt-5"><Spinner animation="border" /></div>;
  if (error) return <Alert variant="danger" className="mt-3">{error}</Alert>;

  return (
    <div className="mt-4 container">
      {demandes.length === 0 ? (
        <Alert variant="info">Aucune demande à afficher</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead className="table-dark">
              <tr>
                <th>Nom</th>
                <th>Prénom</th>
                <th>Email</th>
                <th>Statut</th>
                <th>Date de soumission</th>
                <th>Fiche Assurance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {demandes.map(demande => (
                <tr key={demande.id}>
                  <td>{demande.nom}</td>
                  <td>{demande.prenom}</td>
                  <td>{demande.email}</td>
                  <td>{getBadge(demande.statut)}</td>
                  <td>{new Date(demande.dateSoumission).toLocaleDateString()}</td>
  <td>
    {demande.ficheAssurancePath ? (
         <Button variant="outline-primary" onClick={async () => {
                        const token = localStorage.getItem('token');
                        const response = await fetch(`http://localhost:8080/api/rh/voir-fiche-assurance/${demande.id}`, {
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (response.ok) {
                          const blob = await response.blob();
                          const url = window.URL.createObjectURL(blob);
                          window.open(url, '_blank');
                        } else {
                          alert('Erreur lors de l\'ouverture de l"assurance');
                        }
                      }}>Voir Assurance</Button>
                  
    ) : (
      <span className="text-muted">Non fournie</span>
    )}
  </td>

     <td>
  <Button variant="info" size="sm" className="me-2" onClick={() => { setSelectedDemande(demande); setShowModal(true); }}>
    Détails
  </Button>
 <Button 
  variant="success" 
  size="sm" 
  className="me-2" 
  disabled={['VALIDEE', 'DOCUMENT_COMPLET', 'EN_ATTENTE_VALIDATION', 'FICHE_ASSURANCE_VALIDEE'].includes(demande.statut)}
  onClick={() => window.confirm('Êtes-vous sûr ?') && updateStatut(demande.id, 'VALIDEE')}
>
  Valider
</Button>

{/* Dans la colonne Actions */}
{demande.statut === 'EN_ATTENTE_VALIDATION' && (
  <>
    <Button
      variant="success"
      size="sm"
      className="me-2"
      onClick={() => validerFicheAssurance(demande.id)}
    >
      Valider fiche
    </Button>
    <Button
      variant="danger"
      size="sm"
      onClick={() => rejeterFicheAssurance(demande.id)}
    >
      Rejeter fiche
    </Button>
  </>
)} 
  <Button 
    variant="outline-danger" 
    size="sm" 
    onClick={() => handleDeleteDemande(demande.id)}
  >
    Supprimer
  </Button>
</td>
                </tr>
              ))}
            </tbody>
          </Table>

          {selectedDemande && (
            <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
              <Modal.Header closeButton>
                <Modal.Title>Détails de la demande</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={6}>
                    <Card className="mb-3 shadow-sm">
                      <Card.Body>
                        <Card.Title className="text-primary">Informations personnelles</Card.Title>
                        <Card.Text><strong>Civilité :</strong> {selectedDemande.civilite}</Card.Text>
                        <Card.Text><strong>Nom :</strong> {selectedDemande.nom}</Card.Text>
                        <Card.Text><strong>Prénom :</strong> {selectedDemande.prenom}</Card.Text>
                        <Card.Text><strong>Email :</strong> {selectedDemande.email}</Card.Text>
                        <Card.Text><strong>Téléphone :</strong> {selectedDemande.telephone}</Card.Text>
                        <Card.Text><strong>Contact d'urgence :</strong> {selectedDemande.contactUrgent}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3 shadow-sm">
                      <Card.Body>
                        <Card.Title className="text-primary">Informations académiques</Card.Title>
                        <Card.Text><strong>Filière :</strong> {selectedDemande.filiere}</Card.Text>
                        <Card.Text><strong>Année académique :</strong> {selectedDemande.anneeAcademique}</Card.Text>
                        <Card.Text><strong>Établissement :</strong> {selectedDemande.nomEtablissement}</Card.Text>
                        <Card.Text><strong>Adresse :</strong> {selectedDemande.adresseEtablissement}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Card className="mb-3 shadow-sm">
                      <Card.Body>
                        <Card.Title className="text-primary">Stage</Card.Title>
                        <Card.Text><strong>Type :</strong> {selectedDemande.typeStage}</Card.Text>
                        <Card.Text><strong>Début :</strong> {selectedDemande.dateDebut}</Card.Text>
                        <Card.Text><strong>Fin :</strong> {selectedDemande.dateFin}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={6}>
                    <Card className="mb-3 shadow-sm">
                      <Card.Body>
                        <Card.Title className="text-primary">Directions souhaitées</Card.Title>
                        <ul>
                          {selectedDemande.directions?.map((dir, i) => <li key={i}>{dir}</li>)}
                        </ul>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>

                <Card className="mb-3 shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-primary">Message</Card.Title>
                    <Card.Text>{selectedDemande.message}</Card.Text>
                  </Card.Body>
                </Card>

                <Card className="shadow-sm">
                  <Card.Body>
                    <Card.Title className="text-primary">Documents</Card.Title>
                    <div className="d-flex gap-2 flex-wrap">
                      <Button variant="outline-primary" onClick={async () => {
                        const token = localStorage.getItem('token');
                        const response = await fetch(`http://localhost:8080/api/rh/documents/${selectedDemande.id}/cv`, {
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (response.ok) {
                          const blob = await response.blob();
                          const url = window.URL.createObjectURL(blob);
                          window.open(url, '_blank');
                        } else {
                          alert('Erreur lors de l\'ouverture du CV');
                        }
                      }}>Voir CV</Button>

                      <Button variant="outline-primary" onClick={async () => {
                        const token = localStorage.getItem('token');
                        const response = await fetch(`http://localhost:8080/api/rh/documents/${selectedDemande.id}/lettre`, {
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (response.ok) {
                          const blob = await response.blob();
                          const url = window.URL.createObjectURL(blob);
                          window.open(url, '_blank');
                        } else {
                          alert('Erreur lors de l\'ouverture de la lettre');
                        }
                      }}>Voir Lettre</Button>

                      <Button variant="outline-primary" onClick={async () => {
                        const token = localStorage.getItem('token');
                        const response = await fetch(`http://localhost:8080/api/rh/voir-fiche-assurance/${selectedDemande.id}`, {
                          headers: { 'Authorization': `Bearer ${token}` }
                        });
                        if (response.ok) {
                          const blob = await response.blob();
                          const url = window.URL.createObjectURL(blob);
                          window.open(url, '_blank');
                        } else {
                          alert('Erreur lors de l\'ouverture de l"assurance');
                        }
                      }}>Voir Assurance</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Modal.Body>
             <Modal.Footer>
            {/* Après la modal existante */}
<Modal show={selectedDemande?.action === 'rejet'} onHide={() => setSelectedDemande(null)}>
  <Modal.Header closeButton>
    <Modal.Title>Motif de rejet</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Group>
      <Form.Label>Veuillez indiquer le motif de rejet :</Form.Label>
      <Form.Control 
        as="textarea" 
        rows={3} 
        onChange={(e) => setSelectedDemande({
          ...selectedDemande, 
          motifRejet: e.target.value
        })}
      />
    </Form.Group>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setSelectedDemande(null)}>
      Annuler
    </Button>
    <Button 
      variant="danger" 
      onClick={() => {
        rejeterFicheAssurance(selectedDemande.id, selectedDemande.motifRejet);
        setSelectedDemande(null);
      }}
      disabled={!selectedDemande?.motifRejet}
    >
      Confirmer le rejet
    </Button>
  </Modal.Footer>
</Modal>
  <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
  <Button 
    variant="success" 
    onClick={() => updateStatut(selectedDemande.id, 'VALIDEE')} 
    disabled={selectedDemande.statut === 'VALIDEE' || selectedDemande.statut === 'DOCUMENT_COMPLET'}
  >
    Valider
  </Button>
  <Button 
    variant="danger" 
    onClick={() => updateStatut(selectedDemande.id, 'REJETEE')} 
    disabled={selectedDemande.statut === 'REJETEE' || selectedDemande.statut === 'DOCUMENT_COMPLET'}
  >
    Rejeter
  </Button>
</Modal.Footer>
            </Modal>
          )}

         <div className="mt-4 d-flex justify-content-start">
  <Button
    variant="outline-secondary"
    className="px-4 py-2 rounded-pill shadow-sm d-flex align-items-center gap-2"
    onClick={() => navigate('/rhspace')}
  >
    <BsArrowLeftCircleFill size={20} />
    Retourner à l'accueil
  </Button>
</div>


        </>
      )}

    </div>

    
  );
}

export default ListeDemandesRH;
