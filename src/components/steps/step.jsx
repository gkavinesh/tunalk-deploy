import React from 'react';
import { useInView } from 'react-intersection-observer';
import './step.css';
import { assets } from '../../assets/assets';

const StepsSection = () => {
    const [refStep1, inViewStep1] = useInView({
        triggerOnce: true,
        threshold: 0.5, // Trigger animation when 50% of the component is in view
    });
    const [refStep2, inViewStep2] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });
    const [refStep3, inViewStep3] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });
    const [refStep4, inViewStep4] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });
    const [refStep5, inViewStep5] = useInView({
        triggerOnce: true,
        threshold: 0.5,
    });

    return (
        <section className="max-w-4xl mx-auto py-10 bg-white">
            <div className="hero-about">
                <h2>Why Tuna LK</h2>
                <h2>Why Tuna LK</h2>
            </div>
            <div>
                {/* Step 1 */}
                <div ref={refStep1} className={`flex flex-row ${inViewStep1 ? 'animate-appear' : 'opacity-0'}`}>
                    <div className="hidden md:flex flex-col items-center">
                        <div className="w-32 py-5 border border-gray-300 rounded mr-4 uppercase flex flex-col items-center justify-center">
                            <div className="text-3xl font-black text-gray-500">Step 1</div>
                            <div className="text-gray-500 text-sm">Sourcing</div>
                        </div>
                        <div className="h-full border-r-4 border-transparent">
                            <div className="border-l-4 ml-0 mr-2 h-full border-gray-300 border-dashed"></div>
                        </div>
                    </div>
                    <div className="w-full flex-auto border rounded border-gray-300">
                        <div className="flex md:flex-row flex-col items-center justify-between">
                            <div className="flex-auto">
                                <div className="md:hidden text-sm font-normal uppercase pt-1 pl-2 text-gray-500">
                                    <span className="font-black">Step 1</span> - Idea
                                </div>
                                <div className="p-2 text-3xl text-gray-800 title">
                                    <p>High-quality selection of seafood</p>
                                </div>
                            </div>
                            <div className="md:w-80 p-2 relative group flex-shrink-0">
                                <img src={assets.sourcing} alt="step 1" style={{ height: '100px', marginLeft: '9rem' }} className="object-scale-down transform transition-transform duration-300 ease-in-out group-hover:scale-150" />
                            </div>
                        </div>
                    </div>

                </div>

                {/* Divider */}
                <div className="flex items-start flex-row">
                    <div className="border-t-4 border-r-4 border-transparent">
                        <div className="w-16 ml-16 h-16 border-l-4 border-gray-300 border-dashed border-b-4 rounded-bl-full"></div>
                    </div>
                    <div className="border-t-4 border-transparent flex-auto">
                        <div className="h-16 border-b-4 border-gray-300 border-dashed"></div>
                    </div>
                    <div className="w-16 mt-16 mr-16 h-16 border-r-4 border-gray-300 border-dashed border-t-4 rounded-tr-full"></div>
                </div>

                {/* Step 2 */}
                <div ref={refStep2} className={`flex flex-row-reverse ${inViewStep2 ? 'animate-appear' : 'opacity-0'}`}>
                    <div className="hidden md:flex flex-col items-center">
                        <div className="w-32 py-5 border border-gray-300 rounded ml-4 uppercase flex flex-col items-center justify-center">
                            <div className="text-3xl font-black text-gray-500">Step 2</div>
                            <div className="text-gray-500 text-sm">Quality</div>
                        </div>
                        <div className="h-full border-r-4 border-transparent">
                            <div className="border-l-4 ml-4 h-full border-gray-300 border-dashed"></div>
                        </div>
                    </div>
                    <div className="w-full flex-auto border rounded border-gray-300">
                        <div className="flex md:flex-row flex-col items-center justify-between">
                            <div className="md:w-80 p-2 relative group flex-shrink-0">
                                <img src={assets.quality} alt="step 1" style={{ height: '100px' }} className="object-scale-down transform transition-transform duration-300 ease-in-out group-hover:scale-150" />
                            </div>
                            <div className="flex-auto">
                                <div className="md:hidden text-sm font-normal uppercase pt-1 pl-2 text-gray-500">
                                    <span className="font-black">Step 1</span> - Idea
                                </div>
                                <div className="p-2 text-3xl text-gray-800 title-2"><p>Professional quality checks</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-start flex-row-reverse">
                    <div className="border-t-4 border-l-4 border-transparent">
                        <div className="w-16 mr-16 h-16 border-r-4 border-gray-300 border-dashed border-b-4 rounded-br-full"></div>
                    </div>
                    <div className="border-t-4 border-transparent flex-auto">
                        <div className="h-16 border-b-4 border-gray-300 border-dashed"></div>
                    </div>
                    <div className="w-16 mt-16 ml-16 h-16 border-l-4 border-gray-300 border-dashed border-t-4 rounded-tl-full"></div>
                </div>

                {/* Step 3 */}
                <div ref={refStep3} className={`flex flex-row ${inViewStep3 ? 'animate-appear' : 'opacity-0'}`}>
                    <div className="hidden md:flex flex-col items-center">
                        <div className="w-32 py-5 border border-gray-300 rounded mr-4 uppercase flex flex-col items-center justify-center">
                            <div className="text-3xl font-black text-gray-500">Step 3</div>
                            <div className="text-gray-500 text-sm">Packaging</div>
                        </div>
                        <div className="h-full border-l-4 border-transparent">
                            <div className="border-l-4 mr-4 h-full border-gray-300 border-dashed"></div>
                        </div>
                    </div>
                    <div className="w-full flex-auto border rounded border-gray-300">
                        <div className="flex md:flex-row flex-col items-center justify-between">
                            <div className="flex-auto">
                                <div className="md:hidden text-sm font-normal uppercase pt-1 pl-2 text-gray-500">
                                    <span className="font-black">Step 1</span> - Idea
                                </div>
                                <div className="p-2 text-3xl text-gray-800 title">
                                    <p>Facilities to preserve its freshness</p>
                                </div>
                            </div>
                            <div className="md:w-80 p-2 relative group flex-shrink-0">
                                <img src={assets.packaging} alt="step 1" style={{ height: '100px', marginLeft: '9rem' }} className="object-scale-down transform transition-transform duration-300 ease-in-out group-hover:scale-150" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-start flex-row">
                    <div className="border-t-4 border-r-4 border-transparent">
                        <div className="w-16 ml-16 h-16 border-l-4 border-gray-300 border-dashed border-b-4 rounded-bl-full"></div>
                    </div>
                    <div className="border-t-4 border-transparent flex-auto">
                        <div className="h-16 border-b-4 border-gray-300 border-dashed"></div>
                    </div>
                    <div className="w-16 mt-16 mr-16 h-16 border-r-4 border-gray-300 border-dashed border-t-4 rounded-tr-full"></div>
                </div>

                {/* Step 4 */}
                <div ref={refStep4} className={`flex flex-row-reverse ${inViewStep4 ? 'animate-appear' : 'opacity-0'}`}>
                    <div className="hidden md:flex flex-col items-center">
                        <div className="w-32 py-5 border border-gray-300 rounded ml-4 uppercase flex flex-col items-center justify-center">
                            <div className="text-3xl font-black text-gray-500">Step 4</div>
                            <div className="text-gray-500 text-sm">Managing</div>
                        </div>
                        <div className="h-full border-r-4 border-transparent">
                            <div className="border-l-4 ml-4 h-full border-gray-300 border-dashed"></div>
                        </div>
                    </div>
                    <div className="w-full flex-auto border rounded border-gray-300">
                        <div className="flex md:flex-row flex-col items-center justify-between">
                            <div className="md:w-80 p-2 relative group flex-shrink-0">
                                <img src={assets.managing} alt="step 1" style={{ height: '100px' }} className="object-scale-down transform transition-transform duration-300 ease-in-out group-hover:scale-150" />
                            </div>
                            <div className="flex-auto">
                                <div className="md:hidden text-sm font-normal uppercase pt-1 pl-2 text-gray-500">
                                    <span className="font-black">Step 1</span> - Idea
                                </div>
                                <div className="p-2 text-3xl text-gray-800 title-2"><p>Explore wide range of sea food</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-start flex-row-reverse">
                    <div className="border-t-4 border-l-4 border-transparent">
                        <div className="w-16 mr-16 h-16 border-r-4 border-gray-300 border-dashed border-b-4 rounded-br-full"></div>
                    </div>
                    <div className="border-t-4 border-transparent flex-auto">
                        <div className="h-16 border-b-4 border-gray-300 border-dashed"></div>
                    </div>
                    <div className="w-16 mt-16 ml-16 h-16 border-l-4 border-gray-300 border-dashed border-t-4 rounded-tl-full"></div>
                </div>

                {/* Step 5 */}
                <div ref={refStep5} className={`flex flex-row ${inViewStep5 ? 'animate-appear' : 'opacity-0'}`}>
                    <div className="hidden md:flex flex-col items-center">
                        <div className="w-32 py-5 border border-gray-300 rounded mr-4 uppercase flex flex-col items-center justify-center">
                            <div className="text-3xl font-black text-gray-500">Step 5</div>
                            <div className="text-gray-500 text-sm">Delivery</div>
                        </div>
                    </div>
                    <div className="w-full flex-auto border rounded border-gray-300">
                        <div className="flex md:flex-row flex-col items-center justify-between">
                            <div className="flex-auto">
                                <div className="md:hidden text-sm font-normal uppercase pt-1 pl-2 text-gray-500">
                                    <span className="font-black">Step 1</span> - Idea
                                </div>
                                <div className="p-2 text-3xl text-gray-800 title">
                                    <p>High-quality selection of seafood</p>
                                </div>
                            </div>
                            <div className="md:w-80 p-2 relative group flex-shrink-0">
                                <img src={assets.delivery} alt="step 1" style={{ height: '100px', marginLeft: '9rem' }} className="object-scale-down transform transition-transform duration-300 ease-in-out group-hover:scale-150" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
        </section>
    );
};

export default StepsSection;







