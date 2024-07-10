import React, { useState } from 'react';
import FoodDisplay from '../../fooddisplay/FoodDisplay';
import './Fish.css';
import Explore from '..//..//components/explore/maincat'
import Categories from '..//..//components/explore/maincat';
const Fish = () => {
  const [category, setCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div>
      <div className='fish'>
        <Categories />
        <h2>Fresh Fish</h2>
        <hr></hr>
        <FoodDisplay category={category} />
      </div>
    </div>

  );
};

export default Fish;