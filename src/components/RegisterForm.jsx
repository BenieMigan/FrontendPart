// src/components/RegisterForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    civilite: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Remplace l'URL par celle de ton backend
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Compte créé avec succès !');
        navigate('/'); // Redirection vers la page de login
      } else {
        setMessage("Erreur lors de la création du compte");
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur réseau");
    }
  };

  return (
    <div className="container col-md-6 mt-5">
      <h3>Créer un compte stagiaire</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Civilité</label>
          <select className="form-select" name="civilite" value={formData.civilite} onChange={handleChange} required>
            <option value="">Choisir...</option>
            <option value="M.">M.</option>
            <option value="Mme">Mme</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Nom</label>
          <input type="text" className="form-control" name="nom" value={formData.nom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Prénom</label>
          <input type="text" className="form-control" name="prenom" value={formData.prenom} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Mot de passe</label>
          <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Créer un compte</button>
      </form>
    </div>
  );
};

export default RegisterForm;
