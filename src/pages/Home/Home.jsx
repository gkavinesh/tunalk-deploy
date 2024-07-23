import React, { useState } from 'react';
import './Home.css';
import Facts from '..//..//components/Facts/Facts'
import About from "..//..//components/about/about"
import Poll from '..//..//components/poll/poll';
import Step from '..//..//components/steps/step';
import Header from '..//..//components/header/header'
import ExploreProducts from '..//..//components/ExploreProducts/ExploreProducts'
import MobileApp from '..//..//components/mobileApp/mobileApp'
import Testimonial from '..//..//components/testimonial/testimonial'
import FoodDisplay from '..//../fooddisplay/FoodDisplay';
import ShopBy from '..//..//components/Shopby/shop';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <ShopBy/>
      <Step/>
      <About />
      <Poll />
      <Testimonial/>
    </div>
  );
};

export default Home;

