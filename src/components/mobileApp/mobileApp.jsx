import { motion } from "framer-motion";
import { FiBatteryCharging, FiWifi } from "react-icons/fi";
import { assets } from "../../assets/assets";

const Example = () => {
  return (
    <section className="flex items-center justify-center min-h-screen bg-white p-12">
      <div className="flex items-center justify-between w-full max-w-screen-lg mx-auto">
        <FloatingPhone />
        <div className="ml-4 flex-shrink-0"> {/* Adjust the margin and add flex-shrink-0 */}
          <DownloadMessage />
        </div>
      </div>
    </section>
  );
};

const FloatingPhone = () => {
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
        transform: "rotateY(-30deg) rotateX(15deg)",
      }}
      className="rounded-[24px] bg-black mb-8"
    >
      <motion.div
        initial={{
          transform: "translateZ(8px) translateY(-2px)",
        }}
        animate={{
          transform: "translateZ(32px) translateY(-8px)",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 2,
          ease: "easeInOut",
        }}
        className="relative h-72 w-44 rounded-[24px] border-2 border-b-4 border-r-4 border-white border-l-neutral-200 border-t-neutral-200 bg-neutral-900 p-1 pl-[3px] pt-[3px]"
      >
        <HeaderBar />
        <Screen />
      </motion.div>
    </div>
  );
};

const HeaderBar = () => {
  return (
    <>
      <div className="absolute left-[50%] top-2.5 z-10 h-2 w-16 -translate-x-[50%] rounded-md bg-neutral-900"></div>
      <div className="absolute right-3 top-2 z-10 flex gap-2">
        <FiWifi className="text-neutral-600" />
        <FiBatteryCharging className="text-neutral-600" />
      </div>
    </>
  );
};

const Screen = () => {
  return (
    <div className="relative z-0 grid h-full w-full place-content-center overflow-hidden rounded-[20px] bg-white">
      <img src={assets.tunamain} alt="Logo" className="w-24 h-auto" /> {/* Your logo here */}

      <button className="absolute bottom-4 left-4 right-4 z-10 rounded-lg border-[1px] bg-white py-2 text-sm font-medium text-teal-500 backdrop-blur">
        Get Started
      </button>

      {/* <div className="absolute -left-32 -top-32 h-64 w-64 rounded-full bg-violet-500" /> */}
      <div className="absolute -bottom-72 left-[80%] h-96 w-96 -translate-x-[50%] rounded-full bg-teal-500" />
    </div>
  );
};

const DownloadMessage = () => {
  return (
    <div className="w-2/4 flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold text-teal-500 mb-4">
        Download the app for a much better experience
      </h2>
      <p className="text-center text-neutral-600">
        Available on iOS and Android.
      </p>
      <div className="flex justify-center gap-4 mt-4">
        <img src={assets.app_store} alt="App Store" className="w-32" />
        <img src={assets.play_store} alt="Play Store" className="w-32" />
      </div>
    </div>
  );
};

export default Example;






