import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          token,
          newPassword: password,
          confirmPassword 
        }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Erreur lors de la réinitialisation");
      }

      setMessage("Votre mot de passe a été réinitialisé avec succès");
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ width: '400px' }} className="p-4 shadow">
        <Card.Body>
          <h2 className="text-center mb-4">Réinitialiser votre mot de passe</h2>
          
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nouveau mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Confirmer le mot de passe</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="8"
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Réinitialiser
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ResetPassword;