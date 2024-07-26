import React, { useContext, useState } from 'react';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    type: "",
    postcode: "",
    email: "",
    phone: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
  
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
      userId: token.userId,
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
  
    try {
      let response = await axios.post(url + '/api/order/place', orderData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      if (response.data.success) {
        const { session_url } = response.data;
        window.location.replace(session_url);
      } else {
        alert("Error making payment");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
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




