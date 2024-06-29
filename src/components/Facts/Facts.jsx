import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import { useRef } from 'react';
import Lottie from 'lottie-react';
import fishAnimation from "..//..//assets/Fish.json";
import Crab from "..//..//assets/crab.png";
import Lobster from "..//..//assets/lobster2.png";


const Example = () => {
  return (
    <div className="bg-black">
      <br></br>
      <br/>
      <h1 className='heading'>The Seafood Pallete</h1>
      <div className="flex justify-center my-4">
        <Lottie 
          animationData={fishAnimation} 
          style={{ width: 150, height: 250, marginTop:-50 }}  // Adjust the size as needed
        />
      </div>
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
    <section ref={targetRef} className="relative h-[200vh] bg-black">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-20"> {/* Added gap-4 for spacing */}
          {cards.map((card) => {
            return <Card card={card} key={card.id} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};


const Card = ({ card }) => {
  // Define different content for each card based on the title
  let content = "";
  switch (card.title) {
    case "Fish":
      content = "Fresh Fish Directly from the Ocean";
      break;
    case "Crab":
      content = "Delicious Crab Ready to Cook";
      break;
    case "Shrimps":
      content = "Tasty Shrimps for Your Favorite Dishes";
      break;
    case "Lobster":
      content = "Premium Lobsters, Perfect for Special Occasions";
      break;
    case "Clamps":
      content = "Exquisite Clams for Seafood Lovers";
      break;
    case "Mussels":
      content = "Tender Mussels for a Rich Seafood Experience";
      break;
    case "Octopus":
      content = "Fresh Octopus for Unique Seafood Recipes";
      break;
    default:
      content = "Discover More Seafood Delights";
      break;
  }

  return (
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
      className="relative h-96 w-80 shrink-0 overflow-hidden rounded-xl bg-black text-white p-8"
      style={{
        width: "750px", // Adjust the width of the card
        height: "600px", // Adjust the height of the card
      }}
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover", // Adjusts how the image fits within its container
          backgroundPosition: "center", // Centers the background image
          borderRadius: "100px", // Makes the image circular
        }}
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
      ></div>
      <div className="absolute inset-0 flex items-center justify-center z-10 text-white text-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">{card.title}</h2>
          <p className="text-sm mb-4">{content}</p>
          <button className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 transition-colors duration-300">
            Explore
          </button>
        </div>
      </div>
    </motion.div>
  );
};


const Background = () => {
  return (
    <motion.svg
      width="320"
      height="384"
      viewBox="0 0 320 384"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 z-0"
      variants={{
        hover: {
          scale: 1.5,
        },
      }}
      transition={{
        duration: 1,
        ease: "backInOut",
      }}
    >
      <motion.circle
        variants={{
          hover: {
            scaleY: 0.5,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="114.5"
        r="101.5"
        fill="#262626"
      />
      <motion.ellipse
        variants={{
          hover: {
            scaleY: 2.25,
            y: -25,
          },
        }}
        transition={{
          duration: 1,
          ease: "backInOut",
          delay: 0.2,
        }}
        cx="160.5"
        cy="265.5"
        rx="101.5"
        ry="43.5"
        fill="#262626"
      />
    </motion.svg>
  );
};


export default Example;



const cards = [
  {
    url: Crab,
    title: "Fish",
    id: 1,
  },
  {
    url: Crab,
    title: "Crab",
    id: 2,
  },
  {
    url: Crab,
    title: "Shrimps",
    id: 3,
  },
  {
    url: Crab,
    title: "Lobster",
    id: 4,
  },
  {
    url: Crab,
    title: "Clamps",
    id: 5,
  },
  {
    url: Crab,
    title: "Mussels",
    id: 6,
  },
  {
    url: Crab,
    title: "Octopus",
    id: 7,
  },
];