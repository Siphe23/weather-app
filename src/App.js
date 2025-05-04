import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
import Welcome from './Welcome/Welcome';
import './App.css';

const AppContent = () => {
  const location = useLocation();

  // Only show Navigation on the Home page
  const showNavigation = location.pathname === '/home';

  return (
    <>
      {showNavigation && <Navigation />}
      <Routes>
      <Route path="/welcome" element={<Welcome />} />
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;
