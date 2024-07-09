import React, { useState } from 'react';
import FoodDisplay from '../../fooddisplay/FoodDisplay';
import './Fish.css';
const Fish = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className='fish'>
      <h2>Fresh Fish</h2>
      <hr></hr>
      <FoodDisplay category={category} />
    </div>
  );
};

export default Fish;