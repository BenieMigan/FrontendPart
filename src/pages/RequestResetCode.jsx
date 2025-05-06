import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PasswordResetPage({ email }) {
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [expireTimer, setExpireTimer] = useState(0);

  // Démarrer le compte à rebours quand on envoie le code
  useEffect(() => {
    if (expireTimer > 0) {
      const timer = setTimeout(() => setExpireTimer(expireTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [expireTimer]);

  // Fonction pour envoyer ou renvoyer le code
  const sendCode = async () => {
    try {
      await axios.post('/api/auth/send-code', { email });
      setMessage("Code envoyé à votre adresse mail.");
      setError('');
      setExpireTimer(5);
    } catch (err) {
      setError("Erreur lors de l'envoi du code.");
    }
  };

  // Vérification du code
  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/verify-code', { email, code });
      if (res.data.valid) {
        setStep(2); // Passe à l'étape suivante
        setError('');
      } else {
        throw new Error("Code invalide");
      }
    } catch (err) {
      setError("Code incorrect ou expiré. Nouveau code envoyé.");
      sendCode(); // renvoyer automatiquement un nouveau code
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/reset-password', { email, newPassword });
      setMessage("Mot de passe réinitialisé avec succès !");
      setError('');
    } catch (err) {
      setError("Erreur lors de la réinitialisation.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      {step === 1 && (
        <>
          <h4>Vérification du code</h4>
          <form onSubmit={handleCodeSubmit}>
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Code à 5 chiffres"
              maxLength="5"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />

            <button type="submit" className="btn btn-primary w-100">Vérifier</button>

            <button
              type="button"
              className="btn btn-link mt-2"
              onClick={sendCode}
            >
              Renvoyer le code
            </button>

            {expireTimer > 0 && (
              <div className="text-muted mt-2">Le code expire dans {expireTimer} secondes</div>
            )}
          </form>
        </>
      )}

      {step === 2 && (
        <>
          <h4>Nouveau mot de passe</h4>
          <form onSubmit={handlePasswordChange}>
            <input
              type="password"
              className="form-control mb-2"
              placeholder="Nouveau mot de passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-success w-100">Changer le mot de passe</button>
          </form>
        </>
      )}

      {error && <div className="alert alert-danger mt-3">{error}</div>}
      {message && <div className="alert alert-info mt-3">{message}</div>}
    </div>
  );
}

export default PasswordResetPage;
