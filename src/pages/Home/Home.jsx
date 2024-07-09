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
import Explore from '..//..//components/explore/maincat'

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Explore/>
      <SwipeCarousel/>
      <Shop/>
      <Step/>
      <About />
      <Poll />
      <Faq/>
    </div>
  );
};

export default Home;

