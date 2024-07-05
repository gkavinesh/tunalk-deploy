import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";
import Image1 from './line1.png';
import Image2 from './line2.png';
import { assets } from "../../assets/assets";

const App = () => {
  const wrapperRef = useRef(null);
  const imageRef = useRef(null);
  const heroSectionRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "top top",
        end: "+=150%",
        pin: true,
        scrub: true,
      },
    });

    timeline
      .to(imageRef.current, {
        scale: 2,
        z: 350,
        transformOrigin: "center center",
        ease: "power1.inOut",
      })
      .to(
        heroSectionRef.current,
        {
          scale: 1.1,
          transformOrigin: "center center",
          ease: "power1.inOut",
        },
        "<"
      );

    // Cleanup function to kill ScrollTrigger and animations
    return () => {
      timeline.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="wrapper" ref={wrapperRef}>
      <div className="content">
        <section className="section hero" ref={heroSectionRef}></section>
      </div>
      <div className="image-container" style={{ willChange: 'transform' }}>
        <img
          src={assets.about} // or {Image2}, depending on which image you want to use
          alt="image"
          ref={imageRef}
        />
      </div>
    </div>
  );
};

export default App;



