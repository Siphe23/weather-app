import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js').then(
    (registration) => {
      console.log('ServiceWorker registration successful:', registration);
    },
    (error) => {
      console.log('ServiceWorker registration failed:', error);
    }
  );
}

reportWebVitals();
