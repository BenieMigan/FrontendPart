import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaClipboardCheck, FaChartLine } from 'react-icons/fa';
import { motion } from 'framer-motion';

function RHSpace() {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: 'url("/background-rh.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', top: 0, left: 0, zIndex: 1 }}></div>

      {/* Logo + Titre */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white position-relative"
        style={{ zIndex: 2 }}
      >
        <img
          src="/logo-port.png"
          alt="Logo du Port de Cotonou"
          className="mb-4 rounded-circle bg-light p-2 shadow"
          style={{ width: '120px', objectFit: 'contain' }}
        />

        <h1 className="display-5 fw-bold">Espace Ressources Humaines</h1>
        <p className="lead">Gérez les demandes de stages et accédez à vos tableaux de bord RH.</p>
      </motion.div>

      {/* Cartes RH */}
      <Container className="mt-4 position-relative" style={{ zIndex: 2 }}>
        <Row className="justify-content-center">
          {/* Validation des demandes */}
          <Col md={6}>
            <Card className="border-0 shadow-sm bg-light text-dark p-4 text-center">
              <Card.Body>
                <FaClipboardCheck className="text-primary fs-1 mb-3" />
                <h5 className="fw-bold">Valider les demandes</h5>
                <p>Consultez et approuvez les demandes de stage reçues.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="primary" onClick={() => navigate('/rh/login')}>
                    Accéder aux demandes
                  </Button>
                </motion.div>
              </Card.Body>
            </Card>
          </Col>

          {/* Tableau de bord */}
<Col md={6}>
  <Card className="border-0 shadow-sm bg-dark text-light p-4 text-center">
    <Card.Body>
      <FaChartLine className="text-warning fs-1 mb-3" />
       <h5 className="fw-bold">Tableau de bord</h5>
      <p>Suivi des stages, statistiques et rapports RH.</p>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          variant="warning"
          onClick={() => navigate('/loginrh')}> 
                 Accéder au dashboard
          </Button>
      </motion.div>
    </Card.Body>
  </Card>
</Col>

        </Row>
      </Container>
    </div>
  );
}

export default RHSpace;
