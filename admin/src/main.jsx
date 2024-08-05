// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Changed to App
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Render the App component inside BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);


