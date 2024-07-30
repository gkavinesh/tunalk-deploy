import React from 'react';
import { useInView } from 'react-intersection-observer';
import './step.css';
import Lottie from 'react-lottie'; // Import Lottie
import animationDataStep2 from '..//..//assets/quality.json';
import animationDataStep3 from '..//..//assets/packaging.json';
import animationDataStep4 from '..//..//assets/delivery.json';// Import animation data for Step 2
import { assets } from '../../assets/assets';

const StepsSection = () => {
    // Configure options for Lottie animations
    const defaultOptionsStep2 = {
        loop: true,
        autoplay: true,
        animationData: animationDataStep2,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const defaultOptionsStep3 = {
        loop: true,
        autoplay: true,
        animationData: animationDataStep3,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const defaultOptionsStep4 = {
        loop: true,
        autoplay: true,
        animationData: animationDataStep4,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    return (
        <section className="py-10 bg-white sm:py-16 lg:py-24">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8" id='why'>
                <div className="bubbly">
                    <h2>Why Tuna.LK</h2>
                    <h2>Why Tuna.LK</h2>
                </div>
                <br></br>
                <br></br>
                <div className="relative mt-12 lg:mt-20">
                    <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                        <img className="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
                    </div>

                    <div className="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                        {/* Step 1 */}
                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700">1</span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Sourcing and testing our fish</h3>
                            <p className="mt-4 text-base text-gray-600">At TunaLK, we prioritize sustainable sourcing and rigorous quality checks to deliver the freshest and safest seafood, ensuring a premium experience for our customers.</p>
                            <div className="mt-4 mx-auto">
                                <Lottie options={defaultOptionsStep2} height={200} width={200} />
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700">2</span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Packing the seafood</h3>
                            <p className="mt-4 text-base text-gray-600">At TunaLK, we meticulously package our fish to preserve its freshness and quality, maintaining our commitment to delivering a superior seafood experience.</p>
                            <div className="mt-4 mx-auto">
                                <Lottie options={defaultOptionsStep3} height={200} width={200} />
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div>
                            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                                <span className="text-xl font-semibold text-gray-700">3</span>
                            </div>
                            <h3 className="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Delivering the fish to you</h3>
                            <p className="mt-4 text-base text-gray-600">At TunaLK, we prioritize efficient delivery to ensure our seafood arrives fresh and on time, reflecting our commitment to quality service.</p>
                            <div className="mt-4 mx-auto">
                                <Lottie options={defaultOptionsStep4} height={200} width={250} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>
        </section>
    );
};

export default StepsSection;









