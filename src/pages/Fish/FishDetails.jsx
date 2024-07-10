import './FishDetails.css'
import React, { useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'

const ProductPage = () => {

    const [images, setImages] = useState({
        img1: assets.fishy,
        img2: assets.slice,
        img3: assets.cubes,
        img4: assets.currycut
    })

    const [activeImg, setActiveImage] = useState(images.img1)
    const [amount, setAmount] = useState(1);
    const [cutType, setCutType] = useState("Fresh");
    const [quantity, setQuantity] = useState("1 KG");

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

    return (
        <div className='flex flex-col lg:flex-row gap-16 items-center'>
            <div className='lg:w-2/5 flex flex-col gap-6 my-7 ml-32'>
                <img src={activeImg} alt="" className='w-full h-full aspect-square object-cover rounded-xl' />
                <div className='flex justify-center gap-4'>
                    <img
                        src={images.img1}
                        alt=""
                        className='w-16 h-16 rounded-md cursor-pointer'
                        onClick={() => setActiveImage(images.img1)}
                    />
                    <img
                        src={images.img2}
                        alt=""
                        className='w-16 h-16 rounded-md cursor-pointer'
                        onClick={() => setActiveImage(images.img2)}
                    />
                    <img
                        src={images.img3}
                        alt=""
                        className='w-16 h-16 rounded-md cursor-pointer'
                        onClick={() => setActiveImage(images.img3)}
                    />
                    <img
                        src={images.img4}
                        alt=""
                        className='w-16 h-16 rounded-md cursor-pointer'
                        onClick={() => setActiveImage(images.img4)}
                    />
                </div>
            </div>

            {/* ABOUT */}
            <div className='lg:w-3/5 flex flex-col gap-4 text-left'>
                <div>
                    <span className='text-teal-500 font-semibold'>Fresh Fish</span>
                    <h1 className='text-3xl font-l'>Seer Fish</h1>
                </div>
                <div className='w-10/12'>
                    <p className='text-gray-700'>
                        The Seer Fish, also known as Vanjaram or Nei Meen, is a highly prized saltwater fish found in the Indian Ocean and the western Pacific Ocean. Renowned for its firm texture and rich, oily flesh, it's a favorite in various cuisines for its distinctive taste and nutritional benefits, including being high in protein and omega-3 fatty acids. Its versatile nature makes it suitable for a wide range of preparations, from grilling to currying.
                    </p>
                </div>
                <h6 className='text-2xl font-semibold'>LKR 2000</h6>
                <div className='flex items-center gap-4'>
                    <div className='flex items-center'>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-black text-xl' onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}>-</button>
                        <span className='py-2 px-4 rounded-lg'>{amount}</span>
                        <button className='bg-gray-200 py-2 px-4 rounded-lg text-black text-xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                    </div>
                    <select className='bg-gray-200 py-2 px-4 rounded-lg text-black text-xl' value={cutType} onChange={(e) => handleCutTypeChange(e.target.value)}>
                        <option value="Fresh">Fresh</option>
                        <option value="Slice">Slice</option>
                        <option value="Cubes">Cubes</option>
                        <option value="Curry Cut">Curry Cut</option>
                    </select>
                    <select className='bg-gray-200 py-2 px-4 rounded-lg text-black text-xl' value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                        <option value="1kg">1 KG</option>
                        <option value="2kg">2 KG</option>
                        <option value="3kg">3 KG</option>
                    </select>
                    <button className='bg-teal-500 text-white font-semibold py-2 px-8 rounded-xl'>Add to Cart</button>
                </div>
            </div>

        </div>
    )
}

export default ProductPage;


