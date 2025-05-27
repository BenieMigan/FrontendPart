import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { FaUserGraduate, FaBookOpen, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

function StagiaireSpace() {
  const navigate = useNavigate();

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="position-absolute w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', top: 0, left: 0, zIndex: 1 }}></div>

      {/* Logo et titre */}
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

        <h1 className="display-4 fw-bold">Bienvenu(e) <span className="text-warning">Chère Candidat</span></h1>
        <p className="lead">Déposez votre demande de stage et commencez votre aventure professionnelle.</p>
      </motion.div>

      {/* Contenu principal */}
      <Container className="mt-4 position-relative" style={{ zIndex: 2 }}>
        <Row className="justify-content-center">
          {/* Connexion */}
          <Col md={6}>
            <Card className="border-0 shadow-sm bg-dark text-light p-4 text-center">
              <Card.Body>
                <FaBookOpen className="text-warning fs-1 mb-3" />
                <h5 className="fw-bold">Se connecter</h5>
                <p>Connectez vous et commencez votre demande de stage.</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="warning" onClick={() => navigate('/login')}>
                    Connexion
                  </Button>
                </motion.div>
              </Card.Body>
            </Card>
          </Col>

          {/* Infos supplémentaires */}
          <Col md={6}>
            <Card className="border-0 shadow-sm bg-light text-dark p-4 text-center">
              <Card.Body>
                <FaUserGraduate className="text-primary fs-1 mb-3" />
                <h5 className="fw-bold">Pourquoi nous choisir ?</h5>
                <p>Un stage formateur dans un cadre professionnel enrichissant.</p>
                <ul className="text-start list-unstyled mt-3">
                  <li><FaCheckCircle className="text-success me-2" /> Encadrement de qualité</li>
                  <li><FaCheckCircle className="text-success me-2" /> Expérience réelle</li>
                  <li><FaCheckCircle className="text-success me-2" /> Opportunités de carrière</li>
                </ul>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default StagiaireSpace;
