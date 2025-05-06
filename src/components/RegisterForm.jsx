import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    civilite: '',
    nom: '',
    prenom: '',
    email: '',
    motDePasse: '',
    confirmerMotDePasse: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (formData.motDePasse !== formData.confirmerMotDePasse) {
      setError("Les mots de passe ne correspondent pas.");
      setSuccess('');
      return;
    }

    try {
      const { confirmerMotDePasse, ...dataToSend } = formData;
      await axios.post('http://localhost:8080/api/auth/register', dataToSend);
      setSuccess("Compte créé avec succès !");
      setError('');
    } catch (err) {
      setError("Erreur lors de la création du compte.");
      setSuccess('');
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h4>Créer un compte</h4>
      <form onSubmit={handleSubmit}>
        <select
          name="civilite"
          className="form-control mb-2"
          onChange={handleChange}
          required
        >
          <option value="">-- Civilité --</option>
          <option value="M.">M.</option>
          <option value="Mme">Mme</option>
        </select>

        <input name="nom" placeholder="Nom" className="form-control mb-2" onChange={handleChange} required />
        <input name="prenom" placeholder="Prénom" className="form-control mb-2" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" className="form-control mb-2" onChange={handleChange} required />
        <input type="password" name="motDePasse" placeholder="Mot de passe" className="form-control mb-2" onChange={handleChange} required />
        <input type="password" name="confirmerMotDePasse" placeholder="Confirmer le mot de passe" className="form-control mb-2" onChange={handleChange} required />

        <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
      </form>

      {error && <div className="alert alert-danger mt-2">{error}</div>}
      {success && <div className="alert alert-success mt-2">{success}</div>}
    </div>
  );
}

export default Register;
