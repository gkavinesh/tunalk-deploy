import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { assets } from '../../assets/assets';
import './shop.css';

const ComponentName = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            image: assets.thumb1,
            title: "Cuttle Fish",
            link: "/fish", // Add link for redirection
        },
        {
            id: 2,
            image: assets.thumb2,
            title: "Prawns",
            link: "/fish", // Add link for redirection
        },
        {
            id: 3,
            image: assets.thumb3,
            title: "Scad",
            link: "/fish", // Add link for redirection
        },
        {
            id: 4,
            image: assets.thumb4,
            title: "Hot Deals",
            link: "/fish", // Add link for redirection
        },
        {
            id: 5,
            image: assets.thumb5,
            title: "Tuna",
            link: "/fish", // Add link for redirection
        },
        {
            id: 6,
            image: assets.thumb6,
            title: "Seer",
            link: "/fish", // Add link for redirection
        },
        {
            id: 7,
            image: assets.thumb7,
            title: "Crab",
            link: "/fish", // Add link for redirection
        },
        {
            id: 8,
            image: assets.thumb8,
            title: "Anchovy",
            link: "/fish", // Add link for redirection
        },
    ]);

    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20" id='shop'>
        <div className="shop px-0 mx-auto sm:px-6 lg:px-8" id='Category'>
          <div className="grid grid-cols-2 gap-6 mt-0 lg:mt-0 lg:gap-4 lg:grid-cols-4">
            {items.map(item => (
              <Link key={item.id} to={item.link} className="relative group">
                {/* Wrap the card with Link */}
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl border-solid border-1 border-inherit">
                  <div className="bubby bg-cyan-100 py-0 px-5 text-white text-center transition duration-700 ease-in-out">
                    <h3 className="text-md font-200 text-slate-700">{item.title}</h3>
                  </div>
                  <div className="overflow-hidden aspect-w-3 aspect-h-2">
                    <img className="object-cover w-full h-full transition-all duration-300" src={item.image} alt={item.title} />
                  </div>
                  {item.label && (
                    <div className="absolute left-3 top-3">
                      <p className={`sm:px-3 sm:py-1.5 px-1.5 py-1 text-xs sm:text-sm font-bold tracking-wide text-${item.label === 'New' ? 'gray-900' : 'white'} uppercase bg-${item.label === 'New' ? 'white' : 'gray-900'} rounded-full`}>
                        {item.label}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
    );
};

export default ComponentName;



