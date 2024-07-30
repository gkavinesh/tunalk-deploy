import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PlaceOrder.css';
import { StoreContext } from '../../context/StoreContext';

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

  // State for validation errors
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
  });

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

  const selectPaymentMethod = (method) => {
    setData((data) => ({ ...data, paymentMethod: method }));
    toast.info(`Selected Payment Method: ${method.charAt(0).toUpperCase() + method.slice(1)}`);
  };

  const validateEmail = (email) => {
    // Simple regex for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    // Regex for Sri Lankan phone number validation (should be 10 digits starting with 0)
    const phoneRegex = /^0\d{9}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = () => {
    const emailError = validateEmail(data.email) ? '' : 'Invalid email format.';
    const phoneError = validatePhone(data.phone) ? '' : 'Phone number must be a 10-digit Sri Lankan number.';
    setErrors({ email: emailError, phone: phoneError });
    return !emailError && !phoneError;
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

    if (!validateForm()) {
      toast.error('Please correct the errors in the form.');
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
        response = await fetch(`${url}/api/order/place`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });
      } else if (data.paymentMethod === 'cashOnDelivery') {
        clearCart(); // Clear the cart when order is placed
        navigate('/myorders');
        response = await fetch(`${url}/api/order/place`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });
      } else if (data.paymentMethod === 'onePay') {
        // Send order data to the backend for onePay
        response = await fetch(`${url}/api/order/place`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        });

        const responseData = await response.json();
        console.log('Response from backend:', responseData);

        if (responseData && responseData.session_url) {
          // Handle OnePay session URL if applicable
          window.location.href = responseData.session_url;
        } else {
          console.error('No session URL found in response.');
        }
      } else {
        console.error('Please select a payment method.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('An error occurred while placing the order.');
    }
  };

  // Render preloader if loading
  if (loading) {
    return <Preloader />;
  }

  const orderSummaryItems = Object.keys(cartItems)
    .map((key) => {
      const [itemId, type] = key.split('-');
      const item = food_list.find((food) => food._id === itemId);
      if (item) {
        return {
          itemId: item._id,
          name: item.name,
          quantity: cartItems[key].amount,
        };
      }
      return null;
    })
    .filter((item) => item !== null);

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
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            required
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            type="text"
            placeholder="Phone"
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
          <div className="order-summary">
            <h3>Order Summary</h3>
            {orderSummaryItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              orderSummaryItems.map((item) => (
                <div key={item.itemId} className="order-item">
                  <div className="order-item-details">
                    <p className="order-item-name">{item.name}</p>
                    <p className="order-item-quantity">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="place-order-right">
          <div className="payment-method">
            <p className="title">Payment Method</p>
            <div className="payment-options">
              <div
                className={`payment-option ${data.paymentMethod === 'onePay' ? 'selected' : ''}`}
                onClick={() => selectPaymentMethod('onePay')}
              >
                <span>OnePay</span>
                <div className="payment-images">
                  <img src={assets.card1} alt="OnePay" />
                  <img src={assets.card2} alt="OnePay" />
                  <img src={assets.card3} alt="OnePay" />
                </div>
              </div>
              <div
                className={`payment-option ${data.paymentMethod === 'bankTransfer' ? 'selected' : ''}`}
                onClick={() => selectPaymentMethod('bankTransfer')}
              >
                <span>Bank Transfer</span>
                <div className="payment-images">
                  <img src={assets.bank} alt="Bank Transfer" />
                </div>
              </div>
              <div
                className={`payment-option ${data.paymentMethod === 'cashOnDelivery' ? 'selected' : ''}`}
                onClick={() => selectPaymentMethod('cashOnDelivery')}
              >
                <span>Cash on Delivery</span>
                <div className="payment-images">
                  <img src={assets.cod} alt="Cash on Delivery" />
                </div>
              </div>
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


