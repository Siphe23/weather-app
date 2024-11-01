import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthProvider';

const LoginPage = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    const user = { username: 'user123' }; // Example user data
    login(user);
  };

  return (
    <button onClick={handleLogin}>Login</button>
  );
};

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);

  return (
    <button onClick={logout}>Logout</button>
  );
};
