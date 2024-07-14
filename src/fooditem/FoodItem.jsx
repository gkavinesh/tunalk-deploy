import React, { useContext } from 'react';
import './FoodItem.css';
import { StoreContext } from '../context/StoreContext';
import { FaShoppingCart } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const FoodItem = ({ id, name, price, description, image, offer }) => {
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);

    return (
        <div className='food-item'>
            {offer && <div className="food-item-offer">{offer}% Offer</div>}
            
            <div className="food-item-image-container">
                <Link to='/fish-overview'>
                    <img className='food-item-image' src={image} alt={name} />
                </Link>
            </div>
            <div className="food-item-info">
                <div className="food-item-details">
                    <p className="food-item-name">{name}</p>
                    <p className="food-item-desc">{description}</p>
                    <p className='food-item-price'>Starts from LKR {price}</p>
                </div>
                <div className="food-item-action">
                    <Link to='/fishdetails'>
                        <button className="customize-button">
                            <FaShoppingCart className="cart-icon" />
                            Customize
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default FoodItem;





