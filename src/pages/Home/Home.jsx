import React, { useState } from 'react';
import './Home.css';
import Facts from '..//..//components/Facts/Facts';
import About from '..//..//components/about/about';
import Poll from '..//..//components/poll/poll';
import Step from '..//..//components/steps/step';
import Header from '..//..//components/header/header'
import Recipes from '..//..//components/recipes/recipes'
import Faq from '..//..//components/faq/faq';
import SwipeCarousel from '../../components/carousel/carousel';
import Shop from '..//..//components/Shopby/shop'
const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <SwipeCarousel/>
      <Shop/>
      <Facts />
      <Poll />
      <About />
      <Recipes/>
      <Step/>
      <Faq/>
    </div>
  );
};

export default Home;

