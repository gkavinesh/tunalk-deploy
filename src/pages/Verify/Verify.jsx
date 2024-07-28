import React, { useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import StoreContext from "../../context/StoreContext";
import './Verify.css';
import { toast } from 'react-toastify';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "api/order/verify", { success, orderId });
      if (response.data.success) {
        toast.success('Payment was successful! Redirecting to your orders...');
        setTimeout(() => {
          navigate("/myorders");
        }, 3000); // Delay to allow users to see the success message
      } else {
        toast.error('Payment failed. Redirecting to the homepage...');
        setTimeout(() => {
          navigate("/");
        }, 3000); // Delay to allow users to see the error message
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error('An error occurred during verification. Please try again.');
      navigate("/");
    }
  };

  useEffect(() => {
    verifyPayment();
    // Adding empty dependency array to ensure it runs once after component mounts
  }, []);

  return (
    <div className='verify'>
      <div className='spinner'></div>
    </div>
  );
}

export default Verify;

