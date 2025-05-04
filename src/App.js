import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
        {/* Set Welcome as the default landing page */}
        <Route path="/" element={<Welcome />} />
        
        {/* Other routes */}
        <Route path="/home" element={<ProtectedRoute component={Home} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Optional: Redirect to Welcome if route is not found */}
        <Route path="*" element={<Navigate to="/welcome" replace />} />
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
