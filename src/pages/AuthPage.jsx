import React from 'react';
import LoginForm from '../components/LoginForm';

const AuthPage = () => {
  return (
    <div className="container mt-5">
      <LoginForm />
      <p className="mt-3">
        Pas encore de compte ? <a href="/register">Créer un compte</a>
      </p>
    </div>
  );
};

export default AuthPage;
