import React, { useState } from 'react';
import './Home.css';
import FoodDisplay from '..//..//fooddisplay/FoodDisplay';
import AppDownload from '..//..//components/AppDownload/AppDownload';
import Facts from '..//..//components/Facts/Facts';
import About from '..//..//components/about/about';
import Poll from '..//..//components/poll/poll';
import Step from '..//..//components/steps/step';
import Header from '..//..//components/header/header'
const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <Facts />
      <About />
      <FoodDisplay category={category} />
      <hr />
      <Poll />
      <hr />
      <Step/>
      <AppDownload />
    </div>
  );
};

export default Home;

