import React, { useContext, useState, useEffect } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Preloader from '../../components/preloadersub/preloader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPopup from '../../components/LoginPopup/LoginPopup'; // Adjust the import path if needed

const Cart = () => {
  const { cartItems, food_list, removeFromCart, updateItemQuantity, getTotalCartAmount, url, token } = useContext(StoreContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false); // State for showing login popup

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (Object.keys(cartItems).length === 0) {
      toast.info('Your cart is currently empty.');
    }
  }, [cartItems]);

  const handleQuantityChange = (itemId, type, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 0) {
      updateItemQuantity(`${itemId}-${type}`, newQuantity);
    }
  };

  const handleProceedToCheckout = () => {
    if (!token) {
      setShowLogin(true); // Show login popup if not logged in
    } else if (Object.keys(cartItems).length === 0) {
      toast.error('Please add items to the cart before proceeding to checkout.');
    } else {
      navigate('/order');
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <ToastContainer />
      {showLogin && <LoginPopup setShowLogin={setShowLogin} />}
      <div className='cart'>
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Type</p>
            <p>Weight</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {Object.keys(cartItems).map((cartKey) => {
            const { amount, type, price, weight } = cartItems[cartKey];
            const itemId = cartKey.split('-')[0];
            const item = food_list.find(item => item._id === itemId);
            if (!item) return null;

            const firstImage = item.images && item.images.length > 0 ? item.images[0] : 'default-image-url';

            return (
              <div key={cartKey}>
                <div className='cart-items-title cart-items-item'>
                  <img src={url + "/images/" + firstImage} alt={item.name} />
                  <p>{item.name}</p>
                  <p>{type}</p>
                  <p>{weight} kg</p>
                  <p>LKR {price}</p>
                  <input
                    type='number'
                    min='0'
                    value={amount}
                    onChange={(e) => handleQuantityChange(itemId, type, e)}
                    className='quantity-input'
                  />
                  <p>LKR {price * amount}</p>
                  <p onClick={() => removeFromCart(cartKey)} className='cross'>
                    <FaTrash />
                  </p>
                </div>
                <hr />
              </div>
            );
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Total</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>LKR {getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delivery</p>
                <p>FREE</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b>Total</b>
                <b>LKR {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 0}</b>
              </div>
            </div>
            <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promocode">
            <div>
              <p>If you have a promo code, Enter it here</p>
              <div className="cart-promocode-input">
                <input type='text' placeholder='Promo code' />
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;











