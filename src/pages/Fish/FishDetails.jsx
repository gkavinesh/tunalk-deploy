import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import Categories from '../../components/explore/maincat';
import LoginPopup from '../../components/LoginPopup/LoginPopup'; // Adjust the import path if needed
import Preloader from '../../components/preloadersub/preloader';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer along with toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for styling

const ProductPage = () => {
    const { state } = useLocation();
    const { item } = state || {}; // Get the item from state

    const { addToCart, url, token } = useContext(StoreContext);
    const [activeImg, setActiveImage] = useState(''); // Initially set to empty
    const [amount, setAmount] = useState(1);
    const [selectedType, setSelectedType] = useState(null); // Initially set to null
    const [selectedWeight, setSelectedWeight] = useState('0.5'); // Initially set to 500g
    const [price, setPrice] = useState(0);
    const [showLogin, setShowLogin] = useState(false); // State for showing login popup
    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        if (selectedType && selectedType.price) {
            const basePrice = selectedType.price; // Assuming basePrice is for 500g

            // Adjusting weightMultiplier based on the selected weight
            let weightMultiplier = 1;
            switch (selectedWeight) {
                case '0.5':
                    weightMultiplier = 1; // 500g is the base price
                    break;
                case '1':
                    weightMultiplier = 2; // 1kg = 2 * 500g
                    break;
                case '2':
                    weightMultiplier = 4; // 2kg = 4 * 500g
                    break;
                case '3':
                    weightMultiplier = 6; // 3kg = 6 * 500g
                    break;
                default:
                    weightMultiplier = 1;
            }

            setPrice(basePrice * weightMultiplier * amount); // Updated to include amount
        }
    }, [selectedType, selectedWeight, amount]);

    // Simulate a delay to show the preloader for 1 second
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Set loading to false after 1 second
        }, 1000);

        // Cleanup timer on component unmount
        return () => clearTimeout(timer);
    }, []);

    const handleTypeChange = (e) => {
        const selectedTypeName = e.target.value;
        const newType =
            item.types.find((type) => type.type === selectedTypeName) || {
                type: '',
                price: 0,
            };
        setSelectedType(newType);

        // Assuming the first type uses the second image, the second type uses the third image
        const typeIndex = item.types.indexOf(newType);
        if (typeIndex === 0 && item.images[1]) {
            // If the first type is selected, use the second image
            setActiveImage(`${url}/images/${item.images[1]}`);
        } else if (typeIndex === 1 && item.images[2]) {
            // If the second type is selected, use the third image
            setActiveImage(`${url}/images/${item.images[2]}`);
        } else if (typeIndex === 2 && item.images[3]) {
            // If the third type is selected, use the fourth image
            setActiveImage(`${url}/images/${item.images[3]}`);
        }
    };

    const handleAddToCart = () => {
        if (!token) {
            setShowLogin(true); // Show login popup if not logged in
        } else if (!selectedType || !selectedWeight) {
            toast.warn(
                'Please select a type and weight before adding to cart.',
                {
                    position: 'bottom-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: 'colored',
                }
            );
        } else {
            addToCart(item._id, amount, selectedType.type, price, selectedWeight);

            // Show toast notification when product is added to cart
            toast.success(`${item.name} added to cart!`, {
                position: 'bottom-right', // Display the toast at the bottom right corner
                autoClose: 3000, // Auto close the toast after 3 seconds
                hideProgressBar: false, // Show the progress bar
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
            });
        }
    };

    if (!item) {
        return <div className="text-center">Product not found</div>;
    }

    // Render the preloader if loading
    if (loading) {
        return <Preloader />;
    }

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <ToastContainer /> {/* Add ToastContainer here */}

            {/* Categories Component */}
            <Categories />

            {/* Login Popup */}
            {showLogin && <LoginPopup setShowLogin={setShowLogin} />}

            {/* Product Container */}
            <div className="w-11/12 md:w-9/12 p-8 bg-gray-100 rounded-lg shadow-lg mt-6 mx-auto">
                <div className="flex flex-col lg:flex-row gap-16 lg:items-center">
                    <div className="flex flex-col gap-6 lg:w-2/4">
                        {/* Active Image */}
                        <img
                            src={activeImg || `${url}/images/${item.images[0]}`} // Show the first image if none is selected
                            alt={item.name}
                            className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-md"
                        />
                        {/* Thumbnail Images */}
                        <div className="flex flex-row gap-4 overflow-x-auto">
                            {item.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`${url}/images/${image}`}
                                    alt={`Thumbnail ${index + 1}`}
                                    className={`w-24 h-24 rounded-md cursor-pointer object-cover flex-shrink-0 transition-transform duration-300 transform hover:scale-110 ${
                                        activeImg === `${url}/images/${image}`
                                            ? 'border-2 border-teal-500'
                                            : ''
                                    }`}
                                    onClick={() =>
                                        setActiveImage(`${url}/images/${image}`)
                                    }
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 lg:w-2/4">
                        <div>
                            <span className="text-teal-600 font-semibold text-lg">
                                {item.category}
                            </span>
                            <h1 className="text-4xl font-bold text-gray-800 mt-2">
                                {item.name}
                            </h1>
                        </div>
                        <p className="text-gray-700 text-lg mt-4">
                            {item.description}
                        </p>
                        <div className="flex flex-col gap-4 mt-6">
                            <div className="flex flex-col gap-2">
                                <label className="font-semibold text-lg">
                                    Select Type
                                </label>
                                <div className="flex flex-wrap gap-4">
                                    {item.types.map((type, index) => (
                                        <label
                                            key={index}
                                            className="flex items-center gap-2 cursor-pointer"
                                        >
                                            <input
                                                type="radio"
                                                name="type"
                                                value={type.type}
                                                checked={
                                                    selectedType &&
                                                    selectedType.type === type.type
                                                }
                                                onChange={handleTypeChange}
                                                className="form-radio text-teal-700"
                                            />
                                            <span
                                                className={`text-gray-800 px-3 py-1 rounded-full border ${
                                                    selectedType &&
                                                    selectedType.type === type.type
                                                        ? 'border-teal-500'
                                                        : 'border-gray-300'
                                                } transition-all duration-200`}
                                            >
                                                {type.type}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-6 mt-4">
                                <div className="flex flex-col gap-2 w-full lg:w-32">
                                    <label
                                        htmlFor="weight-select"
                                        className="font-semibold text-lg"
                                    >
                                        Select Weight
                                    </label>
                                    <select
                                        id="weight-select"
                                        value={selectedWeight}
                                        onChange={(e) =>
                                            setSelectedWeight(e.target.value)
                                        }
                                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    >
                                        <option value="0.5">500g</option>
                                        <option value="1">1kg</option>
                                        <option value="2">2kg</option>
                                        <option value="3">3kg</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2 w-full lg:w-32">
                                    <label
                                        htmlFor="quantity-select"
                                        className="font-semibold text-lg"
                                    >
                                        Quantity
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={amount}
                                        onChange={(e) =>
                                            setAmount(parseInt(e.target.value))
                                        }
                                        className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                </div>
                            </div>
                            <div className="mt-4">
                                <span className="text-xl font-bold text-gray-800">
                                    Total Price : රු {price}
                                </span>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                className="mt-6 py-3 px-6 bg-teal-500 text-white rounded-lg shadow-md hover:bg-teal-600 transition-colors duration-300"
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




























