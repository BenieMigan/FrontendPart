import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AttestationRequestForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    type: '',
    motif: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Envoyer les données à l'API via fetch/axios
    console.log(formData);
    alert('Demande envoyée !');
  };

  return (
    <Container className="mt-4">
      <h3>Demande d'attestation</h3>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="nom" className="mb-3">
              <Form.Label>Nom complet</Form.Label>
              <Form.Control type="text" name="nom" value={formData.nom} onChange={handleChange} required />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="email" className="mb-3">
              <Form.Label>Adresse e-mail</Form.Label>
              <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="type" className="mb-3">
          <Form.Label>Type d’attestation</Form.Label>
          <Form.Select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">-- Sélectionnez --</option>
            <option value="scolarite">Attestation de scolarité</option>
            <option value="reussite">Attestation de réussite</option>
            <option value="stage">Attestation de stage</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="motif" className="mb-3">
          <Form.Label>Motif</Form.Label>
          <Form.Control as="textarea" rows={4} name="motif" value={formData.motif} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit">Envoyer</Button>
      </Form>
    </Container>
  );
};

export default AttestationRequestForm;
