import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';
import { assets } from '../assets/assets'; // Ensure this import is correct based on your actual file structure
import { StoreContext } from '../context/StoreContext'; // Correct the import path if needed

const FoodItem = ({ id, name, description }) => { 
    const { cartItems, addToCart, removeFromCart, url, food_list } = useContext(StoreContext);
    const navigate = useNavigate();

    const handleCustomizeClick = () => {
        navigate('/fish-overview');
    };

    // Find the item in the food list
    const item = food_list.find((product) => product._id === id);
    const displayImage = item?.images[0] ? `${url}/images/${item.images[0]}` : assets.default_image;

    // Extract the lowest price from the product types
    const lowestPrice = item?.types?.reduce((min, type) => Math.min(min, type.price), Infinity) || "N/A";

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img 
                    className='food-item-image' 
                    src={displayImage} 
                    alt={name} 
                />
                {!cartItems[id] ? (
                    <img 
                        className='add' 
                        onClick={() => addToCart(id)} 
                        src={assets.add_icon_white} 
                        alt='Add to cart' 
                    />
                ) : (
                    <div className='food-item-counter'>
                        <img 
                            onClick={() => removeFromCart(id)} 
                            src={assets.remove_icon_red} 
                            alt='Remove from cart' 
                        />
                        <p>{cartItems[id]}</p>
                        <img 
                            onClick={() => addToCart(id)} 
                            src={assets.add_icon_green} 
                            alt='Add more' 
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-details">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                    </div>
                    <p className="food-item-desc">
                        {description}
                    </p>
                    <p className='food-item-price'>
                        From: රු {lowestPrice}
                    </p>
                </div>
                <div>
                    <button 
                        className='customize-button' 
                        onClick={handleCustomizeClick}
                    >
                        Customize
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FoodItem;










