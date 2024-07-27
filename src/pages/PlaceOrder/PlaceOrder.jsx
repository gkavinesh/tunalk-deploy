import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

// Import images for payment methods
import { assets } from '../../assets/assets';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const navigate = useNavigate(); // For navigation

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    type: "",
    postcode: "",
    email: "",
    phone: "",
    paymentMethod: "" // New state for payment method
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log('Placing order with data:', data);

    const orderItems = Object.keys(cartItems).map((key) => {
      const [itemId, type] = key.split('-');
      const item = food_list.find(food => food._id === itemId);
      if (item) {
        return {
          itemId: item._id,
          name: item.name,
          type,
          price: cartItems[key].price,
          weight: cartItems[key].weight,
          amount: cartItems[key].amount,
        };
      }
      return null;
    }).filter(item => item !== null);

    const orderData = {
      userId: token.userId, // Make sure token.userId is available
      address: {
        address: data.address,
        type: data.type,
        postcode: data.postcode
      },
      items: orderItems,
      total: getTotalCartAmount() + 200,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone
    };

    console.log('Order data to be sent:', orderData);

    try {
      if (data.paymentMethod === 'bankTransfer') {
        navigate('/payment', { state: { orderData } });
      } else if (data.paymentMethod === 'cashOnDelivery') {
        navigate('/myorders');
      } else if (data.paymentMethod === 'onePay') {
        const response = await axios.post(`${url}/api/order/place`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log('Response from backend:', response.data);

        if (response.data && response.data.session_url) {
          window.location.replace(response.data.session_url);
        } else {
          console.error('No session URL found in response.');
        }
      }
    } catch (error) {
      console.error('Error placing order:', error);
      // Optionally, you can show a user-friendly error message here
    }
  };

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className='title'> Delivery Information</p>
        <div className="multi-fields">
          <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
          <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name' />
        </div>
        <input required name='address' onChange={onChangeHandler} value={data.address} type="text" placeholder='Address' />
        <div className="multi-fields">
          <input required name='type' onChange={onChangeHandler} value={data.type} type="text" placeholder='Landmark, Apartment, suite, etc.' />
          <input required name='postcode' onChange={onChangeHandler} value={data.postcode} type="text" placeholder='Post Code' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type='text' placeholder='Phone' />
      </div>
      <div className="place-order-right">
        <div className="payment-method">
          <p className='title'>Payment Method</p>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="onePay"
                onChange={onChangeHandler}
                checked={data.paymentMethod === 'onePay'}
              />
              OnePay
              <img src={assets.card1} alt="Bank Transfer" />
              <img src={assets.card2} alt="Bank Transfer" />
              <img src={assets.card3} alt="Bank Transfer" />
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="bankTransfer"
                onChange={onChangeHandler}
                checked={data.paymentMethod === 'bankTransfer'}
              />
              Bank Transfer
              <img src={assets.bank} alt="Bank Transfer" />
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cashOnDelivery"
                onChange={onChangeHandler}
                checked={data.paymentMethod === 'cashOnDelivery'}
              />
              Cash on Delivery
              <img src={assets.cod} alt="Cash on Delivery" />
            </label>
          </div>
        </div>
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>LKR {getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>LKR {getTotalCartAmount() === 0 ? 0 : 200}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>LKR {getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 200}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;








