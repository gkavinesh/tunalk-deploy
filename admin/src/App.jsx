// src/App.jsx

import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Login/Login';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const url = 'https://tunalk-backend-53lo.onrender.com';

  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Render Login component if not authenticated */}
        <Route
          path='/login'
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        {/* Redirect all other paths to Homepage if authenticated */}
        <Route
          path='/*'
          element={
            isAuthenticated ? (
              <Homepage url={url} />
            ) : (
              // If not authenticated, redirect to Login
              <Login setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;



