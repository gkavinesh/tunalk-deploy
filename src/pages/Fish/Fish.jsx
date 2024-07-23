import React, { useState } from 'react';
import FoodDisplay from '../../fooddisplay/FoodDisplay';
import './Fish.css';
import Explore from '..//..//components/explore/maincat'
import Categories from '..//..//components/explore/maincat';
import ExploreProducts from '../../components/ExploreProducts/ExploreProducts';
const Fish = () => {
  const [category, setCategory] = useState("All");
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div>
      <div className='fish'>
      <ExploreProducts category={category} setCategory={setCategory}/>
      <FoodDisplay category={category} />
      </div>
    </div>

  );
};

export default Fish;