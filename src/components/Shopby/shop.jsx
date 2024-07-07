import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const ComponentName = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            image: assets.shop,
            title: "Fish",
        },
        {
            id: 2,
            image: assets.shop,
            title: "Crab",
        },
        {
            id: 3,
            image: assets.shop,
            title: "Prawns",
        },
        {
            id: 3,
            image: assets.shop,
            title: "Lobster",
        },
        {
            id: 3,
            image: assets.shop,
            title: "Beylob 90 Speaker",
        },
        // Add more items as needed
    ]);

    return (
        <section className="py-12 bg-white sm:py-16 lg:py-20" id='shop'>
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
                <div className="mx-auto text-left">
                    <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Our featured items</h2>
                    <p className="mt-4 text-base font-normal leading-7 text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus massa dignissim tempus.</p>
                </div>


                <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-5">
                    {items.map(item => (
                        <div key={item.id} className="relative group">
                            <div className="overflow-hidden aspect-w-1 aspect-h-1">
                                <img className="object-cover w-full h-full transition-all duration-300 group-hover:scale-125" src={item.image} alt={item.title} />
                            </div>
                            {item.label && (
                                <div className="absolute left-3 top-3">
                                    <p className={`sm:px-3 sm:py-1.5 px-1.5 py-1 text-[8px] sm:text-xs font-bold tracking-wide text-${item.label === 'New' ? 'gray-900' : 'white'} uppercase bg-${item.label === 'New' ? 'white' : 'gray-900'} rounded-full`}>
                                        {item.label}
                                    </p>
                                </div>
                            )}
                            <div className="flex items-start justify-between mt-4 space-x-4">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-900 sm:text-sm md:text-base">
                                        <a href="#" title="">
                                            {item.title}
                                            <span className="absolute inset-0" aria-hidden="true"></span>
                                        </a>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ComponentName;
