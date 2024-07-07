import React, { useContext, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FoodItem from '../../fooditem/FoodItem';
import { StoreContext } from '../../context/StoreContext';
import './Facts.css';
import Bottom from '..//..//assets/bottom.png'

const Example = () => {
  return (
    <div className="background bg-white">
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["38%", "-40%"]);
  const { food_list } = useContext(StoreContext);

  // Check if food_list is available
  if (!food_list) {
    console.error('food_list is not defined');
    return <div>Loading...</div>; // or some other fallback UI
  }

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-white" id='products'>
      <div className="hero sticky top-0 flex h-screen items-center overflow-hidden py-4">
        <h2>The seafood palette</h2>
        <h2>The seafood palette</h2>
        <motion.div style={{ x }} className="container-products flex gap-4 p-0 custom-height">
          {food_list.map((item, index) => (
            <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
          ))}
        </motion.div>
        <div className="absolute bottom-0 text-center">
          <img src={Bottom} alt="" style={{ opacity: 0.3 }} />
        </div>

      </div>
    </section>
  );
};

export default Example;













