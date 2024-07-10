import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";

import About from '..//..//assets/abb.png'

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
        z: 370,
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
    <div className="wrapper" ref={wrapperRef} >
      <div className="content">
        <section className="section hero" ref={heroSectionRef}>
        </section>
      </div>
      <div className="image-container" style={{ willChange: 'transform' }} id='about'>
      <img
          src={About} // or {Image2}, depending on which image you want to use
          alt="image"
          ref={imageRef}
          width="3016px" // Adjust width as needed
          height="1697px" // Adjust height as needed
      />
      </div>
    </div>
  );
};

export default App;




