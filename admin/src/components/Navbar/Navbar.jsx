import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = () => {
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
      <div className="navbar">
        <img className='logo' src={assets.logo} alt='logo'/>
        <div className='clock'>{time}</div>
    </div>
  );
}

export default Navbar;

