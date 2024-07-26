import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext'; // Adjust the import path if needed
import Categories from '../../components/explore/maincat'; // Adjust the import path if needed

const ProductPage = () => {
    const { state } = useLocation();
    const { item } = state || {}; // Ensure item is defined
    const { addToCart, url } = useContext(StoreContext);

    const [activeImg, setActiveImage] = useState(item ? `${url}/images/${item.images[0]}` : '');
    const [amount, setAmount] = useState(1);
    const [selectedType, setSelectedType] = useState(item && item.types.length > 0 ? item.types[0] : { type: '', price: 0 });
    const [selectedWeight, setSelectedWeight] = useState(1);
    const [price, setPrice] = useState(selectedType.price);

    useEffect(() => {
        if (selectedType && selectedType.price) {
            const basePrice = selectedType.price;
            let weightMultiplier = 1;

            if (selectedWeight === 0.5) {
                weightMultiplier = 0.5;
            } else if (selectedWeight === 2) {
                weightMultiplier = 2;
            } else if (selectedWeight === 3) {
                weightMultiplier = 3;
            }

            setPrice(basePrice * weightMultiplier * amount); // Updated to include amount
        }
    }, [selectedType, selectedWeight, amount]);

    const handleTypeChange = (e) => {
        const selectedTypeName = e.target.value;
        const newType = item.types.find(type => type.type === selectedTypeName) || { type: '', price: 0 };
        setSelectedType(newType);
    };

    if (!item) {
        return <div className='text-center'>Product not found</div>;
    }

    return (
        <div className='flex flex-col min-h-screen bg-gray-100'>
            {/* Categories Component */}
            <Categories />

            {/* Product Container */}
            <div className='w-9/12 p-8 bg-white rounded-lg shadow-lg mt-0 mx-auto'>
                <div className='flex flex-col lg:flex-row gap-16 lg:items-center'>
                    <div className='flex flex-col gap-6 lg:w-2/4'>
                        {/* Active Image */}
                        <img
                            src={activeImg}
                            alt={item.name}
                            className='w-full h-auto max-h-[500px] object-cover rounded-xl'
                        />
                        {/* Thumbnail Images */}
                        <div className='flex flex-row gap-4 overflow-x-auto'>
                            {item.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`${url}/images/${image}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className='w-24 h-24 rounded-md cursor-pointer object-cover flex-shrink-0'
                                    onClick={() => setActiveImage(`${url}/images/${image}`)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 lg:w-2/4'>
                        <div>
                            <span className='text-teal-600 font-semibold'>{item.category}</span>
                            <h1 className='text-3xl font-bold'>{item.name}</h1>
                        </div>
                        <p className='text-gray-700'>
                            {item.description}
                        </p>
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-2'>
                                <label className='font-semibold'>Select Type</label>
                                <div className='flex flex-col'>
                                    {item.types.map((type, index) => (
                                        <label key={index} className='flex items-center gap-2'>
                                            <input
                                                type='radio'
                                                name='type'
                                                value={type.type}
                                                checked={selectedType.type === type.type}
                                                onChange={handleTypeChange}
                                                className='form-radio text-teal-700'
                                            />
                                            <span className='text-gray-800'>{type.type}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <label htmlFor='weight-select' className='font-semibold'>Select Weight</label>
                                <select
                                    id='weight-select'
                                    value={selectedWeight}
                                    onChange={(e) => setSelectedWeight(Number(e.target.value))}
                                    className='p-2 border rounded'
                                >
                                    <option value={0.5}>0.5 kg</option>
                                    <option value={1}>1 kg</option>
                                    <option value={2}>2 kg</option>
                                    <option value={3}>3 kg</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <span className='text-xl font-semibold'>Price: රු {price.toFixed(2)}</span>
                        </div>
                        <div className='flex flex-row items-center gap-12'>
                            <div className='flex flex-row items-center'>
                                <button className='bg-gray-200 py-2 px-5 rounded-lg text-teal-800 text-3xl' onClick={() => setAmount((prev) => prev > 1 ? prev - 1 : 1)}>-</button>
                                <span className='py-4 px-6 rounded-lg'>{amount}</span>
                                <button className='bg-gray-200 py-2 px-4 rounded-lg text-teal-800 text-3xl' onClick={() => setAmount((prev) => prev + 1)}>+</button>
                            </div>
                            <button
                                className='transition ease-in-out delay-150 bg-teal-700 text-white font-semibold py-3 px-16 rounded-xl h-full'
                                onClick={() => addToCart(item._id, amount, selectedType.type, price, selectedWeight)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;

















