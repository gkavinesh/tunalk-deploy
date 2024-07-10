import React, { useState } from 'react';
import './Home.css';
import About from '..//..//components/about/about';
import Poll from '..//..//components/poll/poll';
import Step from '..//..//components/steps/step';
import Header from '..//..//components/header/header'
import Faq from '..//..//components/faq/faq';

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <Step/>
      <About />
      <Poll />
      <Faq/>
    </div>
  );
};

export default Home;

