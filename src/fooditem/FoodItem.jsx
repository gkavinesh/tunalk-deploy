import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './FoodItem.css';
import { assets } from '../assets/assets'; // Ensure this import is correct based on your actual file structure
import { StoreContext } from '../context/StoreContext'; // Correct the import path if needed

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart, url} = useContext(StoreContext);
    const navigate = useNavigate();

    const handleCustomizeClick = () => {
        navigate('/fish-overview');
    };

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img className='food-item-image' src={url + "/images/" + image} alt={name} />
                {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='Add to cart' />
                ) : (
                    <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='Remove from cart' />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='Add more' />
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
                        From: රු {price}
                    </p>
                </div>
                <div>
                <button className='customize-button' onClick={handleCustomizeClick}>
                    Customize
                </button>
                </div>
            </div>
        </div>
    );
}

export default FoodItem;



