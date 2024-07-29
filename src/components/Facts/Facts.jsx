import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import './Facts.css'
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
    <div
      className="w-[100%]" // Width and center alignment
    >
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
  <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 pb-0 pt-12 md:grid-cols-12">
    <h2 className="col-span-1 text-3xl font-bold md:col-span-4">
    The Power of Fish
    </h2>
    <div className="col-span-1 md:col-span-8">
      <p className="mb-4 text-xl text-neutral-600 md:text-2xl">
      Fish offers numerous health benefits, including high-quality protein, essential omega-3 fatty acids, and vital nutrients like vitamin D, iodine, and selenium.
      </p>
      <br></br>
      <a href="https://www.healthline.com/nutrition/11-health-benefits-of-fish" className="w-full rounded bg-teal-600 px-9 py-4 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit">
        Learn more <FiArrowUpRight className="inline" />
      </a>
    </div>
  </div>
);

export default TextParallaxContentExample;
















