import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
<<<<<<< HEAD
import Navigation from './components/Navigation';
import { AuthProvider } from './components/AuthProvider';
import ProtectedRoute from './components/ProtectedRoute';
=======
import Home from './components/Home';
import Navigation from './components/Navigation'; 
import './index.css';
>>>>>>> f4e5be2dfa04a2ef57b06682eaa7116d566f2094

function App() {
  return (
<<<<<<< HEAD
    <AuthProvider>
      <Router>
        <div>
          <Navigation />
          <div className="container">
            <Routes>
              <Route path="/" element={<ProtectedRoute element={Home} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
=======
    <Router>
      <div className="App">
        <Navigation /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
>>>>>>> f4e5be2dfa04a2ef57b06682eaa7116d566f2094
  );
}

export default App;




