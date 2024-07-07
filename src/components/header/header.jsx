import React from 'react';
import ReactTypingEffect from 'react-typing-effect';
import Video from './tunalk.mp4';
import './header.css';
import Image10 from './line1.png';

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <VideoBackground />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h2 className="welcome">
          <ReactTypingEffect
            text={['Welcome to TunaLK..','We bring fresh fish','From the ocean to your plate']}
            speed={180}
            eraseSpeed={100}
            eraseDelay={2000}
            typingDelay={1000}
          />
        </h2>
        <div className="absolute bottom-0 text-center">
          <img src={Image10} alt="" />
        </div>
      </div>
    </div>
  );
};

const VideoBackground = () => {
  return (
    <video
      autoPlay
      loop
      muted
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={Video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default Hero;







