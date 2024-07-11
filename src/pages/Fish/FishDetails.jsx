import './FishDetails.css';
import React, { useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import HeaderCarousel from '../../components/headercarousel/headercarousel';
import { assets } from '../../assets/assets';

const ProductPage = () => {
    const [images, setImages] = useState({
        img1: assets.fishy,
        img2: assets.slice,
        img3: assets.cubes,
        img4: assets.currycut
    });

    const [activeImg, setActiveImage] = useState(images.img1);
    const [amount, setAmount] = useState(1);
    const [cutType, setCutType] = useState('Fresh');
    const [quantity, setQuantity] = useState(1); // Updated to numeric value for kilograms
    const [basePrice] = useState(2000); // Initial base price per kilogram

    // Function to handle cut type change and update active image
    const handleCutTypeChange = (type) => {
        setCutType(type);
        switch (type) {
            case 'Fresh':
                setActiveImage(images.img1);
                break;
            case 'Slice':
                setActiveImage(images.img2);
                break;
            case 'Cubes':
                setActiveImage(images.img3);
                break;
            case 'Curry Cut':
                setActiveImage(images.img4);
                break;
            default:
                setActiveImage(images.img1);
                break;
        }
    };

    // Function to calculate total price based on quantity and base price
    const calculateTotalPrice = () => {
        return basePrice * quantity;
    };

    const calculateTotalPrice2 = () => {
        return calculateTotalPrice * 2;
    };

    return (
        <>
        <div className='carousel-2'>
            <HeaderCarousel/>
        </div>
        <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center'>
            <div className='flex flex-col gap-6 lg:w-2/4 my-16 bubbish'>
                <div className='centered-image-container'>
                    <img src={activeImg} alt='' className='w-6/12 h-full aspect-square object-cover rounded-xl biggy' />
                </div>

                <div className='flex flex-row justify-center items-center h-16' style={{ gap: '1rem' }}>
                    <img
                        src={images.img1}
                        alt=''
                        className='w-24 h-16 rounded-md cursor-pointer'
                        onClick={() => setActiveImage(images.img1)}
                    />
                    <img
                        src={images.img2}
                        alt=''
                        className='w-24 h-16 rounded-md cursor-pointer'
                        onClick={() => setActiveImage(images.img2)}
                    />
                    <img
                        src={images.img3}
                        alt=''
                        className='w-24 h-16 rounded-md cursor-pointer'
                        onClick={() => setActiveImage(images.img3)}
                    />
                    <img
                        src={images.img4}
                        alt=''
                        className='w-24 h-16 rounded-md cursor-pointer'
                        onClick={() => setActiveImage(images.img4)}
                    />
                </div>
            </div>

            {/* ABOUT */}
            <div className='flex flex-col gap-4 lg:w-2/4 text-left bubbist'>
                <div>
                    <span className='text-teal-500 font-semibold'>Fresh Fish</span>
                    <h1 className='text-3xl font-l'>Seer Fish</h1>
                </div>
                <div className='w-10/12'>
                    <p className='text-gray-700'>
                        The Seer Fish is a highly prized saltwater fish found in the Indian Ocean and the western Pacific Ocean. Renowned for its firm texture and rich, oily flesh, it's a favorite in various cuisines for its distinctive taste and nutritional benefits, including being high in protein and omega-3 fatty acids. Its versatile nature makes it suitable for a wide range of preparations, from grilling to currying.
                    </p>
                </div>
                <br></br>
                <h6 className='text-2xl font-semibold text-red-500'>LKR {calculateTotalPrice()}</h6>
                <div className='flex flex-row items-center gap-12'>
                    <div className='flex flex-row items-center'>
                        <button className='bg-gray-200 py-2 px-5 rounded-lg text-black text-3xl' onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}>-</button>
                        <span className='py-4 px-6 rounded-lg'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-black text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>
                    <select className='bg-gray-200 py-2 px-4 rounded-lg text-black text-xl' value={cutType} onChange={(e) => handleCutTypeChange(e.target.value)}>
                        <option value='Fresh'>Fresh</option>
                        <option value='Slice'>Slice</option>
                        <option value='Cubes'>Cubes</option>
                        <option value='Curry Cut'>Curry Cut</option>
                    </select>
                    <select className='bg-gray-200 py-2 px-4 rounded-lg text-black text-xl' value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))}>
                        <option value={1}>1 KG</option>
                        <option value={2}>2 KG</option>
                        <option value={3}>3 KG</option>
                    </select>
                </div>
                <button className='bg-teal-500 text-white font-semibold py-3 px-5 rounded-xl h-full w-2/3'>Add to Cart</button>
            </div>
        </div>
        </>
    );
};

export default ProductPage;


