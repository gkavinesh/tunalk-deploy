import React from 'react';
import Video from './tunalk.mp4';
import './header.css'
import Image1 from './line1.png'

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <VideoBackground />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="heading-hero">Welcome to TunaLK</h1>
        <p className="para">Your provider of fresh seafood</p>
        <div className="absolute bottom-0 text-center">
          <img src={Image1} alt="" />
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





