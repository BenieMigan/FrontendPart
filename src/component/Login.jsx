import { useState } from 'react';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthContext';


const Login = () => {

  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMessage, setResetMessage] = useState('');
  const [resetError, setResetError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    let response;
    
    // Connexion RH
    if (formData.email === "resourcehumaine@pac.bj" && formData.password === "Admin123@rhPassword@12") {
      response = await fetch('http://localhost:8080/api/auth/login/rh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email, // Utilisez les données du formulaire
          password: formData.password
        }),
      });
    } 
    // Connexion Stagiaire
    else {
      response = await fetch('http://localhost:8080/api/auth/login/stagiaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Email ou mot de passe incorrect");
    }

    const data = await response.json();
    
    // Utilisez la fonction login du contexte qui gère le localStorage
    login(data.user, data.token);

    // Redirection en fonction du rôle
    if (data.user.role === 'RH') {
      navigate('/rhspace');
    } else {
      navigate('/stagiaire');
    }

  } catch (err) {
    setError(err.message || "Erreur lors de la connexion");
  }
};
  

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setResetError('');
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: resetEmail }),
      });

      const responseData = await response.json();
      
      if (!response.ok) {
        throw new Error(responseData.error || "Erreur lors de la demande de réinitialisation");
      }

    
      toast.success("Un lien a été envoyé a ce compte");

      setResetEmail('');
    } catch (err) {
      setResetError(err.message);
    }
  };

  <ToastContainer />

  return (
    
    <div style={{
      backgroundImage: "url('/pac.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
  <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Connexion</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <Button variant="outline">Button</Button>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
              <div className="mb-3 d-flex justify-content-between align-items-center">
  <div className="form-check m-0">
    <input
      type="checkbox"
      className="form-check-input"
      id="remember-me"
    />
    <label className="form-check-label" htmlFor="remember-me">
      Se souvenir de moi
    </label>
  </div>
  <button
    type="button"
    className="btn btn-link p-0"
    onClick={() => setShowForgotPassword(true)}
  >
    Mot de passe oublié ?
  </button>
</div>


                  <button type="submit" className="btn btn-primary w-100">
                    Se connecter
                  </button>
                </form>

                <div className="text-center mt-3">
                  <p className="text-muted">
                    Pas encore de compte?{' '}
                    <button 
                      className="btn btn-link p-0"
                      onClick={() => navigate('/register')}
                    >
                      S'inscrire
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    
      {/* Modal pour mot de passe oublié */}
      <Modal show={showForgotPassword} onHide={() => {
        setShowForgotPassword(false);
        setResetMessage('');
        setResetError('');
      }}>
        <Modal.Header closeButton>
          <Modal.Title>Mot de passe oublié</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {resetMessage ? (
            <Alert variant="success">
              {resetMessage.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </Alert>
          ) : (
            <>
              {resetError && <Alert variant="danger">{resetError}</Alert>}
              <Form onSubmit={handleForgotPassword}>
                <Form.Group className="mb-3">
                  <Form.Label>Entrez votre email</Form.Label>
                  <Form.Control
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    placeholder="votre@email.com"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Envoyer le lien de réinitialisation
                </Button>
              </Form>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Login;