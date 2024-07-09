import React, { useState } from 'react';
import FoodDisplay from '../../fooddisplay/FoodDisplay';
import './Fish.css';
import Explore from '..//..//components/explore/maincat'
const Fish = () => {
  const [category, setCategory] = useState("All");

  return (
    <div className='fish'>
      <Explore/>
      <h2>FRESH FISH</h2>
      <hr></hr>
      <FoodDisplay category={category} />
    </div>
  );
};

export default Fish;