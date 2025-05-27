import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container, Card, Spinner } from 'react-bootstrap';

function LoginTableauDeBord() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login/rh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Échec de la connexion');
      }

      // Sauvegarde du token et redirection
      localStorage.setItem('token', data.token);
      navigate('/rh-tableauDeBord');
    } catch (err) {
      setError(err.message || 'Erreur lors de la connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="p-4 shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Connexion RH</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              className="w-100 mt-3"
              disabled={loading}
            >
              {loading ? (
                <Spinner as="span" size="sm" animation="border" role="status" />
              ) : (
                'Se connecter'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginTableauDeBord;