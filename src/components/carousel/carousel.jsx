import React, { useState, useEffect } from 'react';
import Banner1 from './Fish.jpg';
import Banner2 from './Fresh.jpg';
import Banner3 from './isso.jpg';
import Banner4 from './package.jpg';
import './carousel.css'; // Import the CSS file for styling

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Array of image imports
  const images = [Banner1, Banner2, Banner3, Banner4];

  // Move to the next slide
  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  // Move to the previous slide
  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [currentIndex]);

  return (
    <div className="carousel">
      {/* Slides */}
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
          >
            <img src={image} className="carousel-image" alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      {/* Arrows */}
      <button className="prev" onClick={prevSlide} aria-label="Previous Slide">
        &lt;
      </button>
      <button className="next" onClick={nextSlide} aria-label="Next Slide">
        &gt;
      </button>
    </div>
  );
};

export default Carousel;



