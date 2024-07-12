import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import './Facts.css'
import { assets } from "../../assets/assets";

const Example = () => {
  return (
    <div className="bg-white back">
      <br></br>
      <br></br>
      <HorizontalScrollCarousel />
    </div>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-47%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh] bg-white">
      <div className="sticky top-[40vh] flex h-[60vh] items-center overflow-hidden">
        <motion.div style={{ x }} className="flex">
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
    <div
      key={card.id}
      className="group relative h-[450px] w-[3000px] overflow-hidden bg-neutral-200"
    >
      <div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0"
      ></div>
    </div>
  );
};

export default Example;

const cards = [
  {
    url: assets.wallpaper,
    title: "Title 1",
    id: 1,
  }
];














