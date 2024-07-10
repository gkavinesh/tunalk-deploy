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
                <Link to='/fishdetails'>
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
                    {!cartItems[id] ? (
                        <img className='add' onClick={(e) => {e.stopPropagation(); e.preventDefault(); addToCart(id)}} src={assets.add_icon_white} alt='Add' />
                    ) : (
                        <div className='food-item-counter'>
                            <img onClick={(e) => {e.stopPropagation(); e.preventDefault(); removeFromCart(id)}} src={assets.remove_icon_red} alt='Remove' />
                            <p>{cartItems[id]}</p>
                            <img onClick={(e) => {e.stopPropagation(); e.preventDefault(); addToCart(id)}} src={assets.add_icon_green} alt='Add' />
                        </div>
                    )}
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





