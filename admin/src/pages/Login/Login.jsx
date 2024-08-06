// src/pages/Login/Login.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css'; // Import the CSS file for styling
import { assets } from '../../assets/assets';
import { toast, ToastContainer } from 'react-toastify'; // Import Toastify components
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const Login = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isEmployee, setIsEmployee] = useState(false); // State for employee checkbox
  const navigate = useNavigate();

  const validCredentials = [
    { username: 'adminone', password: 'control.tuna.lk.1' },
    { username: 'admintwo', password: 'control.tuna.lk.2' },
  ];

  const handleLogin = () => {
    const isValid = validCredentials.some(
      (cred) => cred.username === username && cred.password === password
    );

    if (isValid) {
      setIsAuthenticated(true); // Set the authentication status to true
      // Navigate to the add page with a success message
      navigate('/add', { state: { message: 'Successfully logged in!' } });
    } else {
      // Display a toastify error message for invalid credentials
      toast.error('Invalid credentials');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      <ToastContainer position="bottom-right" /> {/* Set ToastContainer position */}
      <div className="login-panel">
        <div className="logo">
          <img src={assets.logo} alt="Logo" />
        </div>
        <br></br>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <div className="password-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="password-toggle" onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </div>
        </div>
        <br></br>
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;



