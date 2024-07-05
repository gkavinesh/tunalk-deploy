import React from 'react';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import "./Facts.css";
import lottie from 'lottie-web';
import Lottie from 'react-lottie';
import animationData from '../../assets/waves.json'; // Adjust the path as per your project structure
import fish from '../../assets/fishtest.png';
import cuttle from '../../assets/cuttle.png';
import scad from '../../assets/scad.png';
import seer from '../../assets/seer.png';
import prawns from '../../assets/prawns.png';
import sail from '../../assets/sail.png';
import trevally from '../../assets/trevally.png';
import { FaShoppingCart } from 'react-icons/fa'; // Import FontAwesome cart icon

const Example = () => {
  return (
    <div className="background">
      <h1 className="head">The Seafood Pallete</h1>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[350vh] bg-transparent">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-4">
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }) => {
  return (
    <div>
      <motion.div
        whileHover="hover"
        transition={{
          duration: 1,
          ease: "backInOut",
        }}
        variants={{
          hover: {
            scale: 1.05,
          },
        }}
        className="relative flex flex-col items-center justify-center h-80 w-80 shrink-0 overflow-hidden rounded-full bg-brown p-8 border-4 border-black"
      >
        <Background />
        <div className="relative z-10 text-black text-center">
          <span className="mb-1 block w-fit rounded-full bg-white/30 px-3 py-0.5 text-sm font-light text-white">
            {card.title}
          </span>
          <img
            src={card.url} // Use card.url as the image source
            alt={card.title} // Use card.title as the alt text
            className="my-1 block object-cover h-55 w-55 rounded-full mt-0"
            style={{ marginTop: '-50px' }} // Circular image styling with margin-top added
          />
          <p className="text-sm mt-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, rem.
          </p>
        </div>
      </motion.div>
      <button className="mt-6 mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-black text-white">
        <FaShoppingCart />
      </button>
    </div>
  );
};

const Background = () => {
  const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };


  return (
    <div className="absolute inset-0 z-0 flex justify-center items-center">
      <div className="relative h-96 w-80">
        <div className="absolute inset-0 flex justify-center items-center">
          <Lottie options={defaultOptions1} height={400} width={350} />
        </div>
      </div>
    </div>
  );
};

const cards = [
  {
    url: fish,
    title: "Fish",
    id: 1,
  },
  {
    url: seer,
    title: "Seer",
    id: 2,
  },
  {
    url: scad,
    title: "Scad",
    id: 3,
  },
  {
    url: seer,
    title: "Seer",
    id: 4,
  },
  {
    url: trevally,
    title: "Title 5",
    id: 5,
  },
  {
    url: sail,
    title: "Sail",
    id: 6,
  },
  {
    url: trevally,
    title: "Title 7",
    id: 7,
  },
  {
    url: trevally,
    title: "Title 7",
    id: 8,
  },
  {
    url: trevally,
    title: "Title 7",
    id: 9,
  },
  {
    url: trevally,
    title: "Title 7",
    id: 10,
  },
  {
    url: trevally,
    title: "Title 7",
    id: 11,
  },
];

export default Example;








