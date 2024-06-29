import React from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { FiArrowRight, FiMail, FiMapPin } from "react-icons/fi";
import { SiPorsche, SiTiktok, SiFacebook } from "react-icons/si";
import { assets } from "../../assets/assets";
import './about.css'
import DeliveryArea from '..//..//components/deliveryareas/DeliveryArea'

export const RevealBento = () => {
  return (
    <div className="min-h-screen bg-neutral-950 px-2 py-10 text-zinc-50" id='about'>
  <Logo />
  
  <motion.div
    initial="initial"
    animate="animate"
    transition={{
      staggerChildren: 0.05,
    }}
    className="mx-auto grid max-w-4xl grid-flow-dense grid-cols-12 gap-4"
  >
    <HeaderBlock />
    <SocialsBlock />
    <AboutBlock />
    <LocationBlock />
    <EmailListBlock />
  </motion.div>
</div>

  );
};

const Block = ({ className, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
      }}
      transition={{
        type: "spring",
        mass: 3,
        stiffness: 400,
        damping: 50,
      }}
      className={twMerge(
        "col-span-4 rounded-lg border border-zinc-700 bg-zinc-800 p-6",
        className
      )}
      {...rest}
    />
  );
};

const HeaderBlock = () => (
  <Block className="col-span-12 row-span-2 md:col-span-6">
    <img
      src={assets.tunamain}
      alt="avatar"
      width="100px"
      height="100px"
      className="mb-4"
    />
    <h1 className="mb-4 text-4xl font-medium leading-tight">
      We are TunaLK.{" "}
      <br />
      <span className="text-zinc-400">
        Your Provider of Fresh Delights!
      </span>
    </h1>
    <DeliveryArea/>
  </Block>
);

const SocialsBlock = () => (
  <>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-blue-500 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiFacebook />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-green-600 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiPorsche />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "-2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-zinc-50 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-black"
      >
        <SiTiktok />
      </a>
    </Block>
    <Block
      whileHover={{
        rotate: "2.5deg",
        scale: 1.1,
      }}
      className="col-span-6 bg-blue-500 md:col-span-3"
    >
      <a
        href="#"
        className="grid h-full place-content-center text-3xl text-white"
      >
        <SiTiktok />
      </a>
    </Block>
  </>
);

const AboutBlock = () => (
  <Block className="col-span-12 text-3xl leading-snug">
    <p>
      🐬 - {" "}
      <span className="text-zinc-400">
        At TunaLK, we prioritize sourcing from sustainable fisheries to support responsible seafood practices. Whether you're looking for a delicious catch for a special occasion or everyday meals, our diverse selection caters to all tastes and preferences. With a focus on freshness and customer satisfaction, TunaLK is your trusted provider for premium seafood offerings.
      </span>
    </p>
  </Block>
);

const LocationBlock = () => (
  <Block className="col-span-12 flex flex-col items-center gap-4 md:col-span-3">
    <FiMapPin className="text-3xl" />
    <p className="text-center text-lg text-zinc-400">Colombo</p>
  </Block>
);

const EmailListBlock = () => (
  <Block className="col-span-12 md:col-span-9">
    <p className="mb-3 text-lg">Sign up for our newsletters!</p>
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex items-center gap-2"
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="w-full rounded border border-zinc-700 bg-zinc-800 px-3 py-1.5 transition-colors focus:border-red-300 focus:outline-0"
      />
      <button
        type="submit"
        className="flex items-center gap-2 whitespace-nowrap rounded bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-300"
      >
        <FiMail /> Join the list
      </button>
    </form>
  </Block>
);

export const Logo = () => {
  return (
    <h1 className="heading">
      About Us
      <br />
    </h1>
  );
};

export default RevealBento;
