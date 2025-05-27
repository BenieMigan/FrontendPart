import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
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
    const response = await fetch('http://localhost:8080/api/auth/login/stagiaire', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    // Vérifiez d'abord si la réponse est OK
    if (!response.ok) {
      // Essayez de lire le message d'erreur en JSON
      try {
        const errorData = await response.clone().json();
        throw new Error(errorData.message || errorData || "Email ou mot de passe incorrect");
      } catch {
        // Si le JSON échoue, lisez le texte brut
        const errorText = await response.text();
        throw new Error(errorText || "Email ou mot de passe incorrect");
      }
    }

    // Si la réponse est OK, traitez le JSON
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    navigate('/stagiaire');
  } catch (err) {
    setError(err.message);
  }
};

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

                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="remember-me"
                  />
                  <label className="form-check-label" htmlFor="remember-me">
                    Se souvenir de moi
                  </label>
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
  </div> 
); 
}

export default Login;