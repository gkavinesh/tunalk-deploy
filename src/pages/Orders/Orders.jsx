import React, { useState, useEffect } from 'react';
import Preloader from '..//..//components/preloadersub/preloader'; // Import the Preloader component

const Orders = () => {
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    // Simulate loading time (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the delay
    }, 3000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />; // Show the preloader while loading
  }

  return (
    <div>
      {/* Content of the Orders page */}
      <h1>Your Orders</h1>
      {/* Add your order-related content here */}
    </div>
  );
};

export default Orders;

