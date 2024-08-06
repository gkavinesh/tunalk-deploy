// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Importing the App component
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Render the App component inside BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App /> {/* Render the App component here */}
    </BrowserRouter>
  </React.StrictMode>
);



