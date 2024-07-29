import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import './Facts.css';
import { assets } from "../../assets/assets";

const TextParallaxContentExample = () => {
  return (
    <div className="bg-white cube">
      <TextParallaxContent
        imgUrl={assets.fact}
      >
        <ExampleContent />
      </TextParallaxContent>
      <TextParallaxContent
        imgUrl={assets.fact2}
      >
      </TextParallaxContent>
    </div>
  );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, children }) => {
  return (
    <div className="w-full mx-auto">
      <div className="relative h-[100vh]">
        <StickyImage imgUrl={imgUrl} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 bg-transparent"
        style={{
          opacity,
        }}
      />
    </motion.div>
  );
};

const ExampleContent = () => (
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pb-0 pt-12 px-4 sm:px-6 md:grid-cols-12">
    <h2 className="col-span-1 text-2xl font-bold md:text-3xl md:col-span-4">
      The Power of Fish
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-md text-neutral-600 md:text-xl">
      Fish are a fantastic source of high-quality protein, omega-3 fatty acids, vitamins, and minerals. They support heart health, brain function, and reduce inflammation. 
      </p>
      <p className="mb-4 text-lg text-neutral-600 md:text-xl">Low in saturated fats, fish are a nutritious seafood choice, offering numerous health benefits in a delicious package.
      </p>
      <br></br>
      <a
        href="https://www.healthline.com/nutrition/11-health-benefits-of-fish"
        className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-teal-500 text-teal-500 hover:border-teal-400 hover:text-teal-400 focus:outline-none focus:border-teal-400 focus:text-teal-400 disabled:opacity-50 disabled:pointer-events-none"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn more <FiArrowUpRight className="inline" />
      </a>
    </div>
  </div>
);

export default TextParallaxContentExample;

















