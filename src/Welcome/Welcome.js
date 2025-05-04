import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Welcome.css';
import weatherIcon from '../images/weathe-removebg-preview.png'; // 👈 Adjust path as needed

export default function Welcome() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
    <h1>Welcome</h1>
    <p>Click the image below!</p>
      <img
        src={weatherIcon}
        alt="Click to enter"
        className="welcome-image"
        onClick={handleClick}
      />
    </div>
  );
}
