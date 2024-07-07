import React, { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { FiMousePointer } from "react-icons/fi";
import Image1 from './line1.png'
import Image2 from './line2.png'
import './recipes.css'
import { assets } from "../../assets/assets";

const Example = () => {
    return (
        <div className="flex flex-col justify-center items-center h-screen bg-cyan-100">
            <h1 className="heading-recipes mb-1">RECIPES</h1>
            <div className="water absolute text-center">
                <img src={Image2} alt="" />
            </div>
            <div className="grid grid-cols-5 gap-8 mt-8">
                <TiltCard
                    image=""
                    text=""
                />
                <TiltCard />
                <TiltCard />
                <TiltCard />
                <TiltCard />
            </div>
            <div className="myborder absolute text-center">
                <img src={Image1} alt="" />
            </div>
        </div>

    );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ image, text }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x);
    const ySpring = useSpring(y);

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const ROTATION_RANGE = 30;
    const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
        const rY = mouseX / width - HALF_ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: 'preserve-3d',
                transform,
            }}
            className="relative h-96 w-72 rounded-xl bg-teal-300"
        >
            <div
                style={{
                    transform: 'translateZ(75px)',
                    transformStyle: 'preserve-3d',
                }}
                className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
            >
                {image && (
                    <img
                        src={image}
                        alt="Card Image"
                        style={{
                            transform: 'translateZ(75px)',
                        }}
                        className="mx-auto h-24 w-24 rounded-full"
                    />
                )}
                <p
                    style={{
                        transform: 'translateZ(50px)',
                    }}
                    className="text-center text-2xl font-bold"
                >
                    {text}
                </p>
            </div>
        </motion.div>
    );
};

export default Example;