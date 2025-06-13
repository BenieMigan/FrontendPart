import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Table, 
  Spinner, 
  Alert, 
  Badge,
  ProgressBar,
  ListGroup
} from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

function DashboardStagiaire() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/dashboard_stagiaire_login');
          return;
        }

        const response = await fetch('http://localhost:8080/api/users/dashboard', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          if (response.status === 403) {
            navigate('/dashboard_stagiaire_login');
            return;
          }
          throw new Error('Erreur lors de la récupération des données');
        }

        const data = await response.json();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger" className="mt-3">{error}</Alert>;
  }

  if (!dashboardData) {
    return <Alert variant="info">Aucune donnée disponible</Alert>;
  }

  // Préparer les données pour le graphique
  const departementData = dashboardData.statsParDepartement.map(dept => ({
    name: dept.department,
    stagiaires: dept.count
  }));

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Tableau de Bord Stagiaire</h2>
      
      {/* Cartes de statistiques */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>Stagiaires actifs</Card.Title>
              <div className="display-4 text-primary">
                {dashboardData.totalStagiairesFinalises}
              </div>
              <Card.Text className="text-muted">
                Nombre total de stagiaires ayant finalisé leur dossier
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* 
<Col md={8}> 
  <Card className="h-100 shadow-sm">
    <Card.Body>
      <Card.Title>Répartition par département</Card.Title>
      <div style={{ height: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={departementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="stagiaires" fill="#8884d8" name="Stagiaires" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card.Body>
  </Card>
</Col> 
*/}

      </Row>

      {/* Capacité des départements */}
      <Card className="mb-4 shadow-sm">
        <Card.Header>
          <Card.Title>Places disponibles par département</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Département</th>
                <th>Places occupées</th>
                <th>Places totales</th>
                <th>Places restantes</th>
                <th>Taux d'occupation</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.capacityData.map((dept, index) => (
                <tr key={index}>
                  <td>{dept.department}</td>
                  <td>{dept.occupied}</td>
                  <td>{dept.total}</td>
                  <td>{dept.total - dept.occupied}</td>
                  <td>
                    <ProgressBar 
                      now={(dept.occupied / dept.total) * 100} 
                      label={`${Math.round((dept.occupied / dept.total) * 100)}%`} 
                      variant={dept.occupied >= dept.total ? 'danger' : 'success'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Liste des stagiaires */}
      <Card className="shadow-sm">
        <Card.Header>
          <Card.Title>Liste des stagiaires</Card.Title>
        </Card.Header>
        <Card.Body>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Département(s)</th>
                <th>Date début</th>
                <th>Date fin</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.stagiairesFinalises.map((stagiaire, index) => (
                <tr key={index}>
                  <td>{stagiaire.nomComplet}</td>
                  <td>{stagiaire.email}</td>
                  <td>
                    {stagiaire.departements.map((dep, i) => (
                      <Badge key={i} bg="info" className="me-1">
                        {dep}
                      </Badge>
                    ))}
                  </td>
                  <td>{new Date(stagiaire.dateDebut).toLocaleDateString()}</td>
                  <td>{new Date(stagiaire.dateFin).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default DashboardStagiaire;