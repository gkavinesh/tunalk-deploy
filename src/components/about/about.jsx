import React from 'react';
import { assets } from '../../assets/assets';

const HeroSection = () => {
  return (
    <div className="overflow-x-hidden bg-white">
      <header className="relative py-4 md:py-6">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between">
          </div>
        </div>
      </header>

      <section className="relative py-12 sm:py-16 lg:pt-20 xl:pb-0">
        <div className="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w mx-auto text-center">
            <p className="inline-flex px-4 py-2 text-base text-gray-900 border border-gray-200 rounded-full font-pj"><b>About TunaLK</b></p>
            <h1 className="max-w mt-5 text-3xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">
              Who is TunaLk ?
            </h1>
            <div className="max-w-5xl mx-auto text-center">
              <p className="max-w mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
                At Tunalk, we pride ourselves on offering the finest selection of fresh seafood, meticulously sourced daily and delivered with utmost care. Our commitment to quality ensures that every product, from succulent shrimp to premium fish fillets, meets the highest standards of freshness and taste.
              </p>

              <p className="max-w mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
                Whether you're preparing gourmet meals for a special occasion or hosting a casual gathering with friends and family, Tunalk is your trusted partner for seafood excellence. Explore our diverse range of seafood offerings and experience the unmistakable difference in quality and flavor.
              </p>

              <p className="max-w mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
                At Tunalk, we believe in more than just providing seafood; we're dedicated to delivering an exceptional culinary experience that delights our customers every time. Join us in celebrating the natural bounty of the ocean, prepared with precision and passion for your enjoyment.
              </p>

              <p className="max-w mx-auto mt-6 text-base leading-7 text-gray-600 font-inter">
                Welcome to Tunalk, where every dish begins with freshness and ends with satisfaction.
              </p>
            </div>
            <br></br>
            <div className="relative inline-flex mt-10 group">
              <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>

              <a
                href="#"
                title=""
                className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black transition-all duration-200 bg-cyan-100 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                role="button"
              >
                Wanna know some fish recipes ?
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 md:mt-20">
          <img
            className="object-cover object-top w-full h-auto mx-auto scale-150 2xl:max-w-screen-2xl xl:scale-100"
            src={assets.aboutsection}
            alt="Hero Illustration"
          />
        </div>
      </section>
    </div>
  );
};

export default HeroSection;





