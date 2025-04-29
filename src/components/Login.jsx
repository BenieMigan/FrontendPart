import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('stagiaire');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = { email, role };
    setUser(user);
    if (role === 'admin') {
      navigate('/admin/demandes');
    } else {
      navigate('/formulaire');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Connexion</h3>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email :</label>
          <input type="email" className="form-control" onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Rôle :</label>
          <select className="form-control" onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="stagiaire">Stagiaire</option>
            <option value="admin">RH / Admin</option>
          </select>
        </div>
        <button className="btn btn-primary">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
