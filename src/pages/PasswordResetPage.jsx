import React, { useState } from 'react';

const PasswordReset = ({ onReset }) => {
  const [form, setForm] = useState({
    email: '',
    code: '',
    newPassword: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onReset(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="code" placeholder="Code à 5 chiffres" onChange={handleChange} required />
      <input name="newPassword" type="password" placeholder="Nouveau mot de passe" onChange={handleChange} required />
      <button type="submit">Réinitialiser le mot de passe</button>
    </form>
  );
};

export default PasswordReset;
