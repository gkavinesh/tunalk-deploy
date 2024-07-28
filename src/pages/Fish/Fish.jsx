import React, { useState, useEffect } from 'react';
import FoodDisplay from '../../fooddisplay/FoodDisplay';
import './Fish.css';
import Explore from '../../components/explore/maincat';
import Categories from '../../components/explore/maincat';
import ExploreProducts from '../../components/ExploreProducts/ExploreProducts';
import Preloader from '..//..//components//preloadersub//preloader'; // Import the Preloader component

const Fish = () => {
  const [category, setCategory] = useState('All');
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate a delay to show the preloader for 6 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 6 seconds
    }, 3000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Render the preloader if loading
  if (loading) {
    return <Preloader />; // Use the Preloader component here
  }

  return (
    <div>
      <div className='fish'>
        <Categories />
        <FoodDisplay category={category} />
      </div>
    </div>
  );
};

export default Fish;
