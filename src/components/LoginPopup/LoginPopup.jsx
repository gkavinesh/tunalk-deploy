import React, { useState, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currentState, setCurrentState] = useState('Login'); // Determine if user is logging in or registering
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;

    // Determine API endpoint based on current state
    if (currentState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);

        // Display success message
        toast.success('Logged in successfully!', {
          autoClose: 3000, // Close toast after 3 seconds
          onClose: () => setShowLogin(false), // Close the popup after the toast disappears
        });

      } else {
        // Show error message as toast notification
        toast.error(response.data.message, {
          autoClose: 5000, // Keep error toast open longer
        });
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.', {
        autoClose: 5000, // Keep error toast open longer
      });
    }
  };

  return (
    <div className="login-popup">
      {/* Place the ToastContainer inside the popup */}
      <ToastContainer
        position="top-center" // Set the toast position to top-center of the popup
        autoClose={3000} // Automatically close after 3 seconds
        hideProgressBar={false} // Show progress bar
        newestOnTop={false} // Newest toast at the top
        closeOnClick // Close the toast when clicked
        rtl={false} // Left to right text direction
        pauseOnFocusLoss // Pause toast when window loses focus
        draggable // Allow toast to be draggable
        pauseOnHover // Pause toast on hover
        style={{ zIndex: 1000 }} // Ensure the toast appears above other elements
      />
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="Close"
          />
        </div>
        <div className="login-popup-input">
          {currentState === 'Login' ? null : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <div className="password-input-container">
            <input
              name="password"
              onChange={onChangeHandler}
              value={data.password}
              type={showPassword ? 'text' : 'password'}
              placeholder="Your Password"
              required
            />
            <button
              type="button"
              className="toggle-password-btn"
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <button type="submit" className="final-btn">
          {currentState === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy. </p>
        </div>
        {currentState === 'Login' ? (
          <p>
            Create a new account?{' '}
            <span onClick={() => setCurrentState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <span onClick={() => setCurrentState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;







