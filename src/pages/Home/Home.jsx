import React, { useState } from 'react';
import './Home.css';
import Header from '..//..//components/header/header';
import FoodDisplay from '..//..//fooddisplay/FoodDisplay';
import AppDownload from '..//..//components/AppDownload/AppDownload';
import Facts from '..//..//components/Facts/Facts';
import About from '..//..//components/about/about';
import Poll from '..//..//components/poll/poll';
import Step from '..//..//components/steps/step';
import DeliveryArea from '..//..//components/deliveryareas/DeliveryArea'
const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <Facts />
      <FoodDisplay category={category} />
      <About />
      <hr />
      <Poll />
      <hr />
      <Step/>
      <AppDownload />
    </div>
  );
};

export default Home;

