import React, { useState } from 'react';
import './Home.css';
import Delivery from '..//..//components/deliveryarea/deliveryarea'
import About from '..//..//components/about/about';
import Facts from '..//..//components/Facts/Facts'
import Poll from '..//..//components/poll/poll';
import Step from '..//..//components/steps/step';
import Header from '..//..//components/header/header'
import Faq from '..//..//components/faq/faq';
import MobileApp from '..//..//components/mobileApp/mobileApp'
import Testimonial from '..//..//components/testimonial/testimonial'

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header/>
      <Step/>
      <Poll />
      <Facts />
      <Testimonial/>
      <MobileApp/>
    </div>
  );
};

export default Home;

