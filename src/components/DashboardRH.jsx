import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import ListeDemandesRH from './ListeDemandesRH';

function DashboardRH() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Non authentifié');
        }

        const response = await fetch('http://localhost:8080/api/auth/verify', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Session expirée');
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    verifyAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center py-3 border-bottom">
        <h2>Toutes les demandes de stage</h2>
        <Button variant="outline-danger" onClick={handleLogout}>
          Déconnexion
        </Button>
      </div>
      
      <ListeDemandesRH />
    </Container>
  );
}

export default DashboardRH;