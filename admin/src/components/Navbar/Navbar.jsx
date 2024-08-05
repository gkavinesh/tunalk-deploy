// src/components/Navbar/Navbar.jsx
import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    window.location.href = '/'; // Redirect to login page
  };

  return (
    <div className="navbar">
      <div className="clock">{time}</div>
      <FaSignOutAlt className="logout-icon" onClick={handleLogout} />
    </div>
  );
};

export default Navbar;


