import React, { useState } from 'react';
import { assets } from '../../assets/assets';
import './deliveryarea.css';

const ComponentName = () => {
    // Dummy delivery areas data (replace with actual data if available)
    const deliveryAreas = [
        { id: 1, name: 'Colombo' },
        { id: 2, name: 'Kandy' },
        { id: 3, name: 'Galle' },
        { id: 4, name: 'Negombo' },
        { id: 5, name: 'Jaffna' },
        { id: 6, name: 'Matara' },
        { id: 7, name: 'Trincomalee' },
        { id: 8, name: 'Anuradhapura' },
        { id: 9, name: 'Ratnapura' },
        { id: 10, name: 'Batticaloa' },
        // Add more areas or specific names as needed
    ];

    return (
        <div className="relative">
            <section className="bg-white overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center lg:min-h-[800px]">

                    {/* Delivery Areas on the Left */}
                    <div className="lg:order-1 lg:w-6/12 p-4">
                        <ul>
                            {deliveryAreas.map(area => (
                                <li key={area.id} className="py-2">
                                    {area.name}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Map Image Centered */}
                    <div className="relative w-full lg:w-6/12 h-96 lg:h-auto flex justify-center items-center">
                        <div className="relative w-full h-full max-w-lg max-h-lg">
                            <img className="object-contain w-full h-full" src={assets.map} alt="Map of Colombo" />
                        </div>
                    </div>

                    {/* Placeholder for Lottie Animation */}
                    <div className="lg:order-3 lg:w-3/12 p-4">
                        <div className="relative w-full h-full max-w-lg max-h-lg">
                            {/* Add Lottie animation here */}
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}

export default ComponentName;



