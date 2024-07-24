import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./about.css";
import {  EyeIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Image from './bg-fish.png'
import { FaBook } from "react-icons/fa";
import { RiMedalLine } from "react-icons/ri";

import About from '..//..//assets/About_wallpaper.png'

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
       <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0 tunabub">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p className="text-base font-semibold leading-7 text-teal-500">About</p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">We are Tuna LK</h1>
              <p className="mt-6 text-xl leading-8 text-gray-700">
              At TunaLK, we don't just sell seafood; we offer a journey into the heart of the ocean, bringing its freshest treasures right to your table.
              </p>
            </div>
          </div>
        </div>
          <img
            alt=""
            src={Image}
            className="w-[24rem] max-w-none bg-transparent ring-gray-400/10 sm:w-[57rem]"
          />
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
              <p>
              What sets TunaLK apart is our unwavering commitment to delivering the best. Our seafood is not only fresh but also full of flavor, capturing the essence of the ocean in every bite. We invite you to discover the difference that quality and care make. Experience the superior taste and exceptional service that only TunaLK can provide.
              </p>
              <ul role="list" className="mt-8 space-y-8 text-gray-600">
                <li className="flex gap-x-3">
                <EyeIcon aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-600" />

                  <span>
                    <strong className="font-semibold text-gray-900">Our Vision</strong> To be the top online source for fresh, sustainable seafood, known for quality, customer satisfaction, and environmental care.
                  </span>
                </li>
                <li className="flex gap-x-3">
                <RiMedalLine aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Our Mission</strong> We provide the freshest, highest-quality seafood from sustainable sources, enhancing culinary experiences with diverse products and exceptional online service.
                  </span>
                </li>
                <li className="flex gap-x-3">
                <FaBook aria-hidden="true" className="mt-1 h-5 w-5 flex-none text-teal-600" />
                  <span>
                    <strong className="font-semibold text-gray-900">Our Values</strong> Committed to quality and sustainability, we exceed customer expectations with personalized service and integrity, continuously innovating for an outstanding shopping experience.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="tunabubu">
      <div className="content">
        <section className="section hero" ref={heroSectionRef}>
        </section>
      </div>
      <div className="image-container" style={{ willChange: 'transform' }}>
      <img
          src={About} // or {Image2}, depending on which image you want to use
          alt="image"
          ref={imageRef}
          width="2617px" // Adjust width as needed
          height="1500px" // Adjust height as needed
      />
      </div>
    </div>
    </div>
  );
};

export default App;




