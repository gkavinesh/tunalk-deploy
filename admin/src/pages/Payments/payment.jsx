import React, { useState, useEffect } from 'react';
import './payment.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payment = ({ url, token }) => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  const fetchPayments = async () => {
    try {
      console.log(`Fetching payments from ${url}/api/payment/list`);
      const response = await fetch(`${url}/api/payment/list`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Payments data:', data);

      if (data.success) {
        setPayments(data.payments);
        setFilteredPayments(data.payments); // Initialize with all payments
      } else {
        toast.error("Error fetching payments: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error in fetchPayments:", error);
      toast.error("Error fetching payments: " + error.message);
    }
  };

  const filterPaymentsByDate = () => {
    const filtered = payments.filter(payment => {
      const createdAt = new Date(payment.createdAt);
      return (!startDate || createdAt >= new Date(startDate)) && (!endDate || createdAt <= new Date(endDate));
    });
    setFilteredPayments(filtered);
  };

  const handleViewReceipt = (receiptUrl) => {
    setModalImageUrl(receiptUrl);
    setShowModal(true);
  };

  const removePayment = async (paymentId) => {
    try {
      const response = await fetch(`${url}/api/payment/${paymentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Remove payment response:', data);

      if (data.success) {
        await fetchPayments();
        toast.success(data.message);
      } else {
        toast.error(data.message || "Error removing payment");
      }
    } catch (error) {
      console.error("Error in removePayment:", error);
      toast.error("Error removing payment: " + error.message);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPaymentsByDate();
  }, [startDate, endDate, payments]);

  return (
    <div className="payment-container">
      <h2 className="header">Payments</h2>

      <div className="date-filter">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="payments-table">
          <thead>
            <tr>
              <th>Receipt</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Postcode</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>
                    <img
                      src={`${url}/receipts/${payment.image_filename}`}
                      alt="Receipt"
                      className="receipt-thumbnail"
                      onClick={() => handleViewReceipt(`${url}/receipts/${payment.image_filename}`)}
                    />
                  </td>
                  <td>{payment.firstName}</td>
                  <td>{payment.lastName}</td>
                  <td>{payment.email}</td>
                  <td>{payment.phone}</td>
                  <td>{payment.address.address}</td>
                  <td>{payment.address.postcode}</td>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
                  <td>
                    <button className="remove-button" onClick={() => removePayment(payment._id)}>❌</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="no-payments">No payments found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Payment;








