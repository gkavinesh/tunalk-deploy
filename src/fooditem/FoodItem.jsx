import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../assets/assets'; // Ensure this import is correct based on your actual file structure
import { StoreContext } from '../context/StoreContext'; // Correct the import path if needed

const FoodItem = ({ id, name, price, description, image }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className="food-item-image-container">
                <img className='food-item-image' src={image} alt='' />
                {!cartItems[id] ? (
                    <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt='' />
                ) : (
                    <div className='food-item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt='' />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt='' />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    {/* Assuming assets.rating_starts is your star rating image */}
                    <img src={assets.rating_starts} alt='' />
                </div>
                <p className="food-item-desc">
                    {description}
                </p>
                <p className='food-item-price'>
                    LKR {price}
                </p>
            </div>
        </div>
    );
}

export default FoodItem;

