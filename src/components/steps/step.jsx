import React, { useRef } from 'react';
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
        <section className="max-w-5xl mx-auto py-10">
            <h1 className='head'>Why choose tuna lk</h1>
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
                <div className="flex-auto border rounded border-gray-300">
                    <div className="flex md:flex-row flex-col items-center">
                        <div className="flex-auto">
                            <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500"><span className="font-black">Step 1</span> - Idea</div>
                            <div className="p-3 text-3xl text-gray-800 font">High-quality selection of seafood.</div>
                            <div className="px-3 pb-6">Our shop is dedicated to sourcing the finest seafood available. We partner with trusted suppliers who prioritize sustainable practices, ensuring our selection of fish and shellfish is both fresh and responsibly harvested. Each product is chosen meticulously to meet our high standards for quality and taste.</div>
                        </div>
                        <div className="md:w-96 w-full p-5"><img src={assets.sourcing} alt="step 1" className="object-scale-down" /></div>
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
                <div className="flex-auto border rounded border-gray-300">
                    <div className="flex md:flex-row flex-col items-center">
                        <div className="flex-auto">
                            <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500"><span className="font-black">Step 2</span> - Collaboration</div>
                            <div className="p-3 text-3xl text-gray-800 font">Professional quality checks</div>
                            <div className="px-3 pb-6">Quality is our top priority. Before reaching our shelves, every piece of seafood undergoes rigorous professional checks. Our experts inspect each item to guarantee freshness, appearance, and flavor, ensuring that every purchase meets our exacting standards.</div>
                        </div>
                        <div className="md:w-96 w-full p-5"><img src={assets.quality} alt="step 2" className="object-scale-down" /></div>
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
                <div className="flex-auto border rounded border-gray-300">
                    <div className="flex md:flex-row flex-col items-center">
                        <div className="flex-auto">
                            <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500"><span className="font-black">Step 3</span> - Planification</div>
                            <div className="p-3 text-3xl text-gray-800 font">State-of-the-art facilities to preserve its freshness</div>
                            <div className="px-3 pb-6">Using advanced facilities, we employ state-of-the-art packaging techniques to preserve seafood freshness. Our methods maintain optimal conditions for each product, extending shelf life while retaining natural flavors and textures. From vacuum-sealed fillets to carefully iced shellfish, our packaging ensures peak quality upon delivery.</div>
                        </div>
                        <div className="md:w-96 w-full p-5"><img src={assets.packaging} alt="step 3" className="object-scale-down" /></div>
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
                <div className="flex-auto border rounded border-gray-300">
                    <div className="flex md:flex-row flex-col items-center">
                        <div className="flex-auto">
                            <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500"><span className="font-black">Step 4</span> - Implementation</div>
                            <div className="p-3 text-3xl text-gray-800 font">Browse the wide variety of seafood available</div>
                            <div className="px-3 pb-6">Explore our diverse seafood range with confidence. Our knowledgeable staff is here to assist, offering insights into flavors, cooking methods, and recommendations tailored to your preferences. We strive to make your shopping experience informative and enjoyable, helping you make informed choices.</div>
                        </div>
                        <div className="md:w-96 w-full p-5"><img src={assets.managing} alt="step 4" className="object-scale-down" /></div>
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
                <div className="flex-auto border rounded border-gray-300">
                    <div className="flex md:flex-row flex-col items-center">
                        <div className="flex-auto">
                            <div className="md:hidden text-sm font-normal uppercase pt-3 pl-3 text-gray-500"><span className="font-black">Step 5</span> - Reflection</div>
                            <div className="p-3 text-3xl text-gray-800 font">Quick and reliable delivery through a network of refrigerated vehicles</div>
                            <div className="px-3 pb-6">Enjoy prompt and reliable delivery through our network of refrigerated vehicles. Whether stocking up for an event or weekly meals, we ensure your seafood arrives fresh and ready to enjoy, prioritizing your satisfaction with every order.</div>
                        </div>
                        <div className="md:w-96 w-full p-5"><img src={assets.delivery} alt="step 5" className="object-scale-down" /></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
};

export default StepsSection;






