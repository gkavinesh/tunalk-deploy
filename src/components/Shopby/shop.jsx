import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import { assets } from '../../assets/assets';
import './shop.css';

const ComponentName = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            image: assets.thumb1,
            title: "Fish",
            link: "/fish", // Add link for redirection
        },
        {
            id: 2,
            image: assets.thumb2,
            title: "Crab",
            link: "/crab", // Add link for redirection
        },
        {
            id: 3,
            image: assets.thumb3,
            title: "Prawns",
            link: "/prawns", // Add link for redirection
        },
        {
            id: 4,
            image: assets.thumb4,
            title: "Hot Deals",
            link: "/hot-deals", // Add link for redirection
        },
        // Add more items as needed
    ]);

    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20" id='shop'>
            <div className="shop px-0 mx-auto sm:px-6 lg:px-8 max-w-full" id='Category'>
            <div className="bubble">
                    <h2>Shop by category</h2>
                    <br></br>
            </div>
                <div className="grid grid-cols-2 gap-6 mt-5 lg:mt-5 lg:gap-4 lg:grid-cols-4">
                    {items.map(item => (
                        <Link key={item.id} to={item.link} className="relative group"> {/* Wrap the card with Link */}
                            <div className="bg-white rounded-lg overflow-hidden shadow-2xl border-solid border-1 border-inherit">
                                <div className="bubby bg-cyan-100 py-4 px-5 text-white text-center transition duration-700 ease-in-out">
                                    <h3 className="text-lg font-light text-slate-600">{item.title}</h3>
                                </div>
                                <div className="overflow-hidden aspect-w-1 aspect-h-1">
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



