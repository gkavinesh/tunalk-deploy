import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa'; // Import the Trash icon

const Cart = () => {
  const { cartItems, food_list, removeFromCart, updateItemQuantity, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 0) {
      updateItemQuantity(itemId, newQuantity); // Update quantity in context
    }
  };

  return (
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
        {food_list.map((item) => {
          if (cartItems[item._id]) {
            const { amount, type, price, weight } = cartItems[item._id];
            const firstImage = item.images && item.images.length > 0 ? item.images[0] : 'default-image-url'; // Replace with a default image URL if needed

            return (
              <div key={item._id}>
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
                    onChange={(e) => handleQuantityChange(item._id, e)} // Update quantity when changed
                    className='quantity-input'
                  />
                  <p>LKR {price * amount}</p> {/* Display updated total price */}
                  <p onClick={() => removeFromCart(item._id)} className='cross'>
                    <FaTrash /> {/* Use the Trash icon */}
                  </p>
                </div>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>LKR {getTotalCartAmount()}</p> {/* Display updated subtotal */}
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>LKR {getTotalCartAmount() === 0 ? 0 : 200}</p> {/* Display delivery fee */}
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>LKR {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200}</b> {/* Display updated total with delivery fee */}
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
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
  );
};

export default Cart;




