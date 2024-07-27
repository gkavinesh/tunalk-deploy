import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import './preloader.css';
import loaderAnimation from './loader.json';
import { assets } from '../../assets/assets';

const Preloader = ({ isLoading }) => {
  const [isVisible, setIsVisible] = useState(isLoading);

  useEffect(() => {
    // When loading completes, wait for the fade-out transition before hiding the component
    if (!isLoading) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1000); // This should match the fade-out transition duration
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  return (
    isVisible && (
      <div className={`preloader ${!isLoading ? 'fade-out' : ''}`}>
        <div className="lottie-container">
          <Lottie animationData={loaderAnimation} loop={true} speed={0.3} /> {/* Slower speed */}
          <img src={assets.tuna} alt="Logo" className="logo-loader" width={200} height={200} />
        </div>
      </div>
    )
  );
};

export default Preloader;

