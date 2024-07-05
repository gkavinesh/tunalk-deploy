import React, { useContext, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import FoodItem from '../../fooditem/FoodItem';
import { StoreContext } from '../../context/StoreContext';
import './Facts.css';

const Example = () => {
  return (
    <div className="background">
      <h1 className="head">The Seafood Pallete</h1>
      <HorizontalScrollCarousel category="All" />
    </div>
  );
};

const HorizontalScrollCarousel = ({ category }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-73%"]);

  const { food_list } = useContext(StoreContext);

  if (!food_list) {
    console.error('food_list is not defined');
    return <div>Loading...</div>; // or some other fallback UI
  }

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pb-0">
        {/* Adjust the pb-4 value to reduce padding-bottom as needed */}
        <motion.div style={{ x }} className="flex gap-8">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              return (
                <FoodItem
                  key={index}
                  id={item._id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              );
            }
            return null;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Example;








