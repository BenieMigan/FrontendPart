import React, { useState, useEffect } from 'react';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import {
  Card, Row, Col, Table, Spinner, Alert, Badge,
  ProgressBar, ListGroup, Button, Container, Form
} from 'react-bootstrap';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { FiUser, FiCheckCircle, FiFileText, FiBell, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/r";
const COLORS = ['#4E79A7', '#F28E2B', '#E15759', '#76B7B2', '#59A14F', '#EDC948', '#B07AA1', '#FF9DA7', '#9C755F', '#BAB0AC'];

function TableauDeBord() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [capacityData, setCapacityData] = useState([]);
  const [quarterStats, setQuarterStats] = useState([]);
  const [yearStats, setYearStats] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedQuarter, setSelectedQuarter] = useState(null);
  const navigate = useNavigate();

 useEffect(() => {
  
  const fetchAllData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch main stats
      const statsResponse = await axios.get('http://localhost:8080/api/rh/dashboard/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setData(statsResponse.data);

      // Fetch capacity data
      const capacityResponse = await axios.get('http://localhost:8080/api/rh/dashboard/capacity', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCapacityData(capacityResponse.data);

      // Fetch completed by quarter stats
      const quarterResponse = await axios.get('http://localhost:8080/api/rh/dashboard/completed-by-quarter', { 
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setQuarterStats(quarterResponse.data);

      // Fetch completed by year stats
      const yearResponse = await axios.get('http://localhost:8080/api/rh/dashboard/completed-by-year', { 
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setYearStats(yearResponse.data);

    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchAllData();

   // Rafraîchir les données toutes les 30 secondes
  const intervalId = setInterval(fetchAllData, 30000);
  
  // Nettoyer l'intervalle lors du démontage du composant
  return () => clearInterval(intervalId);
}, []);
 
 const handleDeleteStagiaire = async (id) => {
  try {
    const token = localStorage.getItem('token');
    
    // Faire la requête DELETE vers l'API
    await axios.delete(`http://localhost:8080/api/rh/stagiaires-finalises/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    // Recharger les données après suppression
    const statsResponse = await axios.get('http://localhost:8080/api/rh/dashboard/stats', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setData(statsResponse.data);

    // Recharger les données par année/trimestre si nécessaire
    if (selectedYear) {
      const yearResponse = await axios.get('http://localhost:8080/api/rh/dashboard/completed-by-year', { 
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setYearStats(yearResponse.data);
    }

    if (selectedQuarter) {
      const quarterResponse = await axios.get('http://localhost:8080/api/rh/dashboard/completed-by-quarter', { 
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setQuarterStats(quarterResponse.data);
    }

    // Recharger les données de capacité
    const capacityResponse = await axios.get('http://localhost:8080/api/rh/dashboard/capacity', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    setCapacityData(capacityResponse.data);

  } catch (err) {
    setError(err.response?.data?.error || err.message);
  }
};
 
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <Spinner animation="border" variant="primary" />
    </Container>
  );

  if (error) return (
    <Container className="mt-4">
      <Alert variant="danger">Erreur lors du chargement des données: {error}</Alert>
    </Container>
  );

  return (
    <Container fluid className="py-4" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header avec fond coloré */}
      <Row className="mb-4 align-items-center justify-content-between py-3" style={{ 
        backgroundColor: '#3f51b5',
        borderRadius: '8px',
        color: 'white',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        <Col>
          <h2 className="mb-0" style={{ fontWeight: '600' }}>Tableau de bord RH</h2>
        </Col>
        <Col xs="auto" className="d-flex gap-2">
          <Button
            variant={showNotifications ? 'danger' : 'light'}
            onClick={() => setShowNotifications(!showNotifications)}
            className="d-flex align-items-center"
            style={{ borderRadius: '20px' }}
          >
            <FiBell className="me-2" />
            {data?.finsProches?.length || 0} Alertes
          </Button>
          <Button
            variant="outline-light"
            onClick={handleLogout}
            className="d-flex align-items-center"
            title="Déconnexion"
            style={{ borderRadius: '20px' }}
          >
            <FiLogOut className="me-2" />
            Déconnexion
          </Button>
        </Col>
      </Row>

      {/* Notifications Panel */}
   {showNotifications && data?.finsProches?.length > 0 && (
  <Alert variant="warning" className="mb-4" style={{ borderRadius: '8px' }}>
    <Alert.Heading className="d-flex align-items-center">
      <FiBell className="me-2" />
      Alertes - Fin de stage proche
    </Alert.Heading>
    <ListGroup variant="flush">
      {data.finsProches.map((stagiaire, index) => (
        <ListGroup.Item key={index} className="bg-transparent">
          <strong>{stagiaire.nomComplet}</strong> - {stagiaire.departementPrincipal}
          <div className="text-muted">
            Fin de stage dans {stagiaire.joursRestants} jour(s) ({formatDate(stagiaire.dateFin)})
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  </Alert>
)}
      {/* Cartes de statistiques */}
      <Row className="g-4 mb-4">
        {[
          { 
            title: "Nombres total de demandes reçues", 
            value: data?.totalDemandes, 
            icon: <FiUser size={24} />,
            color: '#4E79A7',
            progress: 100
          },
          { 
            title: "Nombres total de demandes validées", 
            value: data?.demandesValidees, 
            icon: <FiCheckCircle size={24} />,
            color: '#59A14F',
            progress: (data?.totalDemandes > 0) ? (data.demandesValidees / data.totalDemandes) * 100 : 0
          },
          { 
            title: "Nombres total de stagiaires", 
            value: data?.dossiersFinalises, 
            icon: <FiFileText size={24} />,
            color: '#F28E2B',
            progress: (data?.totalDemandes > 0) ? (data.dossiersFinalises / data.totalDemandes) * 100 : 0
          }
        ].map((stat, index) => (
          <Col md={4} key={index}>
            <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '12px' }}>
              <Card.Body className="text-center">
                <div className="d-flex justify-content-center mb-3">
                  <div style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    backgroundColor: `${stat.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {React.cloneElement(stat.icon, { color: stat.color })}
                  </div>
                </div>
                <Card.Title style={{ color: '#495057', fontWeight: '500' }}>{stat.title}</Card.Title>
                <Card.Text className="display-5" style={{ 
                  color: stat.color,
                  fontWeight: '600',
                  margin: '10px 0'
                }}>
                  {stat.value}
                </Card.Text>
                <ProgressBar
                  now={stat.progress}
                  variant=""
                  style={{ height: '8px', borderRadius: '4px' }}
                  className="mt-2"
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Graphiques principaux */}
      <Row className="g-4 mb-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '12px' }}>
            <Card.Header className="bg-white border-0" style={{ padding: '1.25rem 1.5rem' }}>
              <h5 className="mb-0" style={{ fontWeight: '500' }}>Statistique des stagiaires par année</h5>
            </Card.Header>
            <Card.Body style={{ padding: '0 1.5rem 1.5rem' }}>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={yearStats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6c757d' }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6c757d' }}
                    />
                    <Tooltip 
                      contentStyle={{
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      fill="#4E79A7" 
                      radius={[4, 4, 0, 0]}
                      name="Stagiaires"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '12px' }}>
            <Card.Header className="bg-white border-0" style={{ padding: '1.25rem 1.5rem' }}>
              <h5 className="mb-0" style={{ fontWeight: '500' }}>Statistique des stagiaires par trimestre</h5>
            </Card.Header>
            <Card.Body style={{ padding: '0 1.5rem 1.5rem' }}>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={quarterStats}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                    <XAxis 
                      dataKey="quarter" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6c757d' }}
                      tickFormatter={(value) => `T${value}`}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#6c757d' }}
                    />
                    <Tooltip 
                      formatter={(value) => [value, 'Stagiaires finalisés']}
                      labelFormatter={(value) => `Trimestre ${value}`}
                      contentStyle={{
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      fill="#F28E2B" 
                      radius={[4, 4, 0, 0]}
                      name="Stagiaires"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tableau de capacité et répartition */}
      <Row className="g-4 mb-4">
    <Card className="shadow-sm mb-4">
      <Card.Header className="bg-white">
        <h5 className="mb-0">Places disponibles par département</h5>
      </Card.Header>
      <Card.Body>
        <Table striped hover>
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
            {capacityData.map((dept, index) => (
              <tr key={index}>
                <td>{dept.department}</td>
                <td>{dept.occupied}</td>
                <td>{dept.total}</td>
                <td>{dept.remaining}</td>
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

        <Col md={6}>
          <Card className="h-100 shadow-sm border-0" style={{ borderRadius: '12px' }}>
            <Card.Header className="bg-white border-0" style={{ padding: '1.25rem 1.5rem' }}>
              <h5 className="mb-0" style={{ fontWeight: '500' }}>Répartition par département</h5>
            </Card.Header>
            <Card.Body style={{ padding: '0 1.5rem 1.5rem' }}>
              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.statsParDepartement || []}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      innerRadius={50}
                      paddingAngle={5}
                      dataKey="count"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {data?.statsParDepartement?.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        borderRadius: '8px',
                        border: 'none',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend 
                      layout="vertical"
                      verticalAlign="middle"
                      align="right"
                      wrapperStyle={{
                        paddingLeft: '20px'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tableau des stagiaires */}
      <Card className="shadow-sm border-0 mb-4" style={{ borderRadius: '12px' }}>
        <Card.Header className="bg-white border-0" style={{ padding: '1.25rem 1.5rem' }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0" style={{ fontWeight: '500' }}>Liste de tous les stagiaires</h5>
            <div className="d-flex gap-2">
              <Form.Select 
                value={selectedYear} 
                onChange={(e) => {
                  setSelectedYear(parseInt(e.target.value));
                  setSelectedQuarter(null);
                }}
                style={{ 
                  width: '120px',
                  borderRadius: '20px',
                  borderColor: '#dee2e6'
                }}
              >
                {Array.from({length: 5}, (_, i) => new Date().getFullYear() - i).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </Form.Select>
              <Form.Select
                value={selectedQuarter || ''}
                onChange={(e) => setSelectedQuarter(e.target.value ? parseInt(e.target.value) : null)}
                style={{ 
                  width: '140px',
                  borderRadius: '20px',
                  borderColor: '#dee2e6'
                }}
              >
                <option value="">Tous les trimestres</option>
                <option value="1">T1</option>
                <option value="2">T2</option>
                <option value="3">T3</option>
                <option value="4">T4</option>
              </Form.Select>
            </div>
          </div>
        </Card.Header>
        <Card.Body style={{ padding: '0 1.5rem 1.5rem' }}>
          <div className="table-responsive">
            <Table hover className="m-0">
              <thead style={{ backgroundColor: '#f8f9fa' }}>
                <tr>
                  <th style={{ borderTop: 'none' }}>Nom</th>
                  <th style={{ borderTop: 'none' }}>Département(s)</th>
                  <th style={{ borderTop: 'none' }}>Période</th>
                  <th style={{ borderTop: 'none' }}>Contact</th>
                  <th style={{ borderTop: 'none', textAlign: 'center' }}>Statut</th>
                </tr>
              </thead>
              <tbody>
              
   {data?.stagiairesFinalises?.map((stagiaire, index) => {
  // Calculer si la fin est proche (dans les 15 jours)
  const dateFin = new Date(stagiaire.dateFin);
  const aujourdhui = new Date();
  const differenceJours = Math.floor((dateFin - aujourdhui) / (1000 * 60 * 60 * 24));
  const isEndingSoon = differenceJours <= 15 && differenceJours >= 0;

  return (
    <tr key={index}>
<td style={{ fontWeight: '500' }}>{stagiaire.nomComplet}</td>
          <td>
            <div className="d-flex flex-wrap gap-1">
              {stagiaire.departements?.map((dep, i) => (
                <Badge
                  key={i}
                  bg=""
                  style={{
                    backgroundColor: COLORS[i % COLORS.length],
                    color: 'white',
                    fontWeight: 'normal',
                  }}
                >
                  {dep}
                </Badge>
              ))}
            </div>
          </td>

        <td>
        <div>
          <div>{formatDate(stagiaire.dateDebut)}</div>
          <div className={isEndingSoon ? 'text-warning fw-bold' : ''}>
            {formatDate(stagiaire.dateFin)} {isEndingSoon && <FiBell className="ms-2" />}
          </div>
        </div>
      </td>
 <td>
            <div className="text-truncate" style={{ maxWidth: '150px' }}>{stagiaire.email}</div>
            <div className="text-muted" style={{ fontSize: '0.85rem' }}>{stagiaire.telephone}</div>
          </td>
          <td style={{ textAlign: 'center' }}>
            <div className="d-flex gap-2 justify-content-center">
              <Badge
                bg=""
                style={{
                  backgroundColor: '#59A14F',
                  color: 'white',
                  fontWeight: 'normal',
                  padding: '5px 10px',
                  borderRadius: '12px',
                }}
              >
                Complet
              </Badge>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => {
                  if (window.confirm('Êtes-vous sûr de vouloir supprimer ce stagiaire ?')) {
                    handleDeleteStagiaire(stagiaire.id);
                  }
                }}
                style={{ borderRadius: '12px' }}
              >
                Supprimer
              </Button>
            </div>
          </td>
        </tr>
  );
})}

              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-between mt-3">
            <Button
              variant="outline-secondary"
              className="px-4 py-2 rounded-pill d-flex align-items-center gap-2"
              onClick={() => navigate('/rhspace')}
              style={{ borderColor: '#dee2e6' }}
            >
              <BsArrowLeftCircleFill size={20} />
              Retourner à l'accueil
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="d-flex align-items-center rounded-pill"
              style={{ borderColor: '#dee2e6' }}
            >
              📅 Faire une planification
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default TableauDeBord;