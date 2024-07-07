import React, { useState } from 'react';
import './Home.css';
import Facts from '..//..//components/Facts/Facts';
import About from '..//..//components/about/about';
import Poll from '..//..//components/poll/poll';
import Step from '..//..//components/steps/step';
import Header from '..//..//components/header/header'
import Recipes from '..//..//components/recipes/recipes'
import Faq from '..//..//components/faq/faq';
const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <Facts />
      <About />
      <Poll />
      <Step/>
      <Recipes/>
      <Faq/>
    </div>
  );
};

export default Home;

