import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/register/stagiaire', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data || "Erreur lors de l'inscription");
      }

      setSuccess('Inscription réussie! Redirection vers la page de connexion...');
      setTimeout(() => navigate('/login'), 2000);
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
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card" style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
            }}>
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Créer un compte</h2>
                
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                
                {success && (
                  <div className="alert alert-success" role="alert">
                    {success}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="civilite" className="form-label">Civilité</label>
                    <select
                      id="civilite"
                      name="civilite"
                      className="form-select"
                      value={formData.civilite}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Sélectionnez</option>
                      <option value="Mlle">Mlle</option>
                      <option value="M.">M.</option>
                      <option value="Mme">Mme</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="nom" className="form-label">Nom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nom"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="prenom" className="form-label">Prénom</label>
                    <input
                      type="text"
                      className="form-control"
                      id="prenom"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      required
                    />
                  </div>

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

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    S'inscrire
                  </button>
                </form>

                <div className="text-center mt-3">
                  <p className="text-muted">
                    Déjà un compte?{' '}
                    <button 
                      className="btn btn-link p-0"
                      onClick={() => navigate('/login')}
                    >
                      Se connecter
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
};

export default Register;