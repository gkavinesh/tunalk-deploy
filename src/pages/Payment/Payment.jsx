import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import Preloader from '../../components/preloadersub/preloader';

const Payment = () => {
  const { url, token } = useContext(StoreContext);
  const location = useLocation();
  const orderData = location.state?.orderData; // Retrieve order data from location state
  const navigate = useNavigate();

  const [image, setImage] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate a delay to show the preloader for 6 seconds
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after 6 seconds
    }, 2000);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  // Handler for image change
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
    setSubmitted(false); // Reset the submitted state
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error('Please upload an image before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('receipt', image);
    formData.append('firstName', orderData.firstName);
    formData.append('lastName', orderData.lastName);
    formData.append('email', orderData.email);
    formData.append('phone', orderData.phone);
    formData.append('address', JSON.stringify(orderData.address));

    try {
      const response = await axios.post(`${url}/api/payment/confirm`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Done! Await your confirmation in the orders page.');
        setSubmitted(true);
        setImage(null);
        // Wait for the toast to be visible, then navigate
        setTimeout(() => {
          navigate('/myorders');
        }, 3000); // Adjust the delay to match your toast display time
      } else {
        toast.error(response.data.message || 'Failed to submit payment confirmation.');
      }
    } catch (error) {
      console.error('Error submitting payment confirmation:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  // Render the preloader if loading
  if (loading) {
    return <Preloader />; // Use the Preloader component here
  }

  return (
    <div className="payment">
      <div className="payment-container">
        <div className="payment-details">
          <h3>Payment Details</h3>
          <p><b>ACCOUNT NO:</b> 009010500546</p>
          <p><b>NAME:</b> Daily Fresh Colombo Pvt Ltd</p>
          <p><b>BANK:</b> HNB Bank, Colombo 06</p>
          <p><b>SWIFT CODE:</b> HBLILKLX</p>
          <p><b>BANK CODE:</b> 7083</p>
          <p><b>BRANCH CODE:</b> 009</p>
        </div>
        <div className="image-upload-section">
          <h3>Upload Payment Receipt</h3>
          <br></br>
          <form className="payment-form" onSubmit={handleSubmit}>
            <label htmlFor="receipt">
              <div className="image-preview">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Receipt Preview"
                    className="receipt-preview"
                  />
                ) : (
                  <img src={assets.upload} alt="Upload area" />
                )}
              </div>
            </label>
            <input
              onChange={handleImageChange}
              type="file"
              id="receipt"
              hidden
              accept="image/*"
              required
            />
            <br></br>
            <button type="submit" className="submit-btn" disabled={submitted}>
              {submitted ? 'Receipt Uploaded' : 'Submit Confirmation'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Payment;




















