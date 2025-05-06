import React, { useState } from 'react';
import axios from 'axios';

function PasswordResetPage() {
  const [step, setStep] = useState(1); // Étape 1: email, Étape 2: code + nouveau mot de passe
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleRequestCode = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/request-reset', { email });
      setMessage("Code envoyé à votre adresse email.");
      setError('');
      setStep(2);
    } catch (err) {
      setError("Erreur lors de l'envoi du code.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/reset-password', {
        email,
        code,
        newPassword
      });
      setMessage("Mot de passe changé avec succès !");
      setError('');
      setStep(3); // ou redirige vers /login si tu veux
    } catch (err) {
      setError("Code invalide ou expiré.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {step === 1 && (
        <form onSubmit={handleRequestCode}>
          <h3>Mot de passe oublié</h3>
          <input
            type="email"
            placeholder="Votre email"
            className="form-control mb-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100">Envoyer le code</button>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword}>
          <h3>Réinitialiser le mot de passe</h3>
          <input
            type="text"
            placeholder="Code reçu (5 chiffres)"
            className="form-control mb-2"
            maxLength="5"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="form-control mb-2"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success w-100">Changer le mot de passe</button>
        </form>
      )}

      {step === 3 && (
        <div className="alert alert-success mt-3">
          Mot de passe réinitialisé. Vous pouvez maintenant vous connecter.
        </div>
      )}

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default PasswordResetPage;
