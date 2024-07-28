import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

// Import images for payment methods
import { assets } from '../../assets/assets';
import Preloader from '../../components/preloadersub/preloader'; // Ensure this is the correct path to the Preloader component

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url, clearCart } = useContext(StoreContext);
  const navigate = useNavigate(); // For navigation

  // State for form data
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

  // State for loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 2 seconds
    }, 2000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const generateOrderId = () => {
    // Simple order ID generator using timestamp and random number
    const timestamp = Date.now(); // Current timestamp in milliseconds
    const randomNumber = Math.floor(Math.random() * 1000000); // Random number between 0 and 999999
    return `ORD-${timestamp}-${randomNumber}`; // Ensure this is returned as a string
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    console.log('Placing order with data:', data);

    if (!data.paymentMethod) {
      toast.error('Please select a payment method.');
      return;
    }

    const orderItems = Object.keys(cartItems)
      .map((key) => {
        const [itemId, type] = key.split('-');
        const item = food_list.find((food) => food._id === itemId);
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
      })
      .filter((item) => item !== null);

    // Generate a unique order ID
    const orderId = generateOrderId();

    const orderData = {
      orderId: String(orderId), // Make sure orderId is explicitly converted to a string
      userId: token.userId, // Make sure token.userId is available
      address: {
        address: data.address,
        type: data.type,
        postcode: data.postcode,
      },
      items: orderItems,
      total: getTotalCartAmount() + 200,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      paymentMethod: data.paymentMethod, // Include payment method in order data
    };

    console.log('Order data to be sent:', orderData);

    try {
      let response;

      if (data.paymentMethod === 'bankTransfer') {
        clearCart(); // Clear the cart when proceeding to payment
        navigate('/payment', { state: { orderData } });
        response = await axios.post(`${url}/api/order/place`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (data.paymentMethod === 'cashOnDelivery') {
        clearCart(); // Clear the cart when order is placed
        navigate('/myorders');
        response = await axios.post(`${url}/api/order/place`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else if (data.paymentMethod === 'onePay') {
        // Send order data to the backend for onePay
        response = await axios.post(`${url}/api/order/place`, orderData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Response from backend:', response.data);
        if (response.data && response.data.session_url) {
        } else {
          console.error('No session URL found in response.');
        }
      } else {
        console.error('Please select a payment method.');
      }
    } catch (error) {

    }
  };

  // Render preloader if loading
  if (loading) {
    return <Preloader />;
  }

  return (
    <>
      <form onSubmit={placeOrder} className="place-order">
        <div className="place-order-left">
          <p className="title"> Delivery Information</p>
          <div className="multi-fields">
            <input
              required
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              type="text"
              placeholder="First Name"
            />
            <input
              required
              name="lastName"
              onChange={onChangeHandler}
              value={data.lastName}
              type="text"
              placeholder="Last Name"
            />
          </div>
          <input
            required
            name="address"
            onChange={onChangeHandler}
            value={data.address}
            type="text"
            placeholder="Address"
          />
          <div className="multi-fields">
            <input
              required
              name="type"
              onChange={onChangeHandler}
              value={data.type}
              type="text"
              placeholder="Landmark, Apartment, suite, etc."
            />
            <input
              required
              name="postcode"
              onChange={onChangeHandler}
              value={data.postcode}
              type="text"
              placeholder="Post Code"
            />
          </div>
          <input
            required
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email Address"
          />
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
          />
        </div>
        <div className="place-order-right">
          <div className="payment-method">
            <p className="title">Payment Method</p>
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
                <img src={assets.card1} alt="OnePay" />
                <img src={assets.card2} alt="OnePay" />
                <img src={assets.card3} alt="OnePay" />
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
              <button type="submit" className="btn" disabled={getTotalCartAmount() === 0}>
                Place Order
              </button>
            </div>
          </div>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default PlaceOrder;













