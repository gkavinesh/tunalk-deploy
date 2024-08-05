import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/Home/Home';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Render the App component inside a BrowserRouter
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

