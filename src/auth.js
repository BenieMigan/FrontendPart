export const isAuthenticated = () => {
    return !!localStorage.getItem('token'); // ou vérifie un utilisateur
  };
  