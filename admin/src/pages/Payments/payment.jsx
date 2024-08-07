import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './payment.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";

const Payment = ({ url, token }) => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [editing, setEditing] = useState(null);
  const [updatedPrices, setUpdatedPrices] = useState([]);

  // Fetch payments from the server
  const fetchPayments = async () => {
    try {
      const response = await axios.post(`${url}/api/payment/list`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setPayments(response.data.payments);
        setFilteredPayments(response.data.payments); // Initialize with all payments
      } else {
        setError('Error fetching payments');
      }
    } catch (error) {
      setError('Error fetching payments');
      console.error('Error fetching payments:', error);
    }
  };

  // Filter payments by selected date
  const filterPaymentsByDate = () => {
    const filtered = payments.filter(payment => {
      const createdAt = new Date(payment.createdAt);
      return !selectedDate || createdAt.toDateString() === new Date(selectedDate).toDateString();
    });
    setFilteredPayments(filtered);
  };

  // Show the modal with the receipt image
  const handleViewReceipt = (receiptUrl) => {
    setModalImageUrl(receiptUrl);
    setShowModal(true);
  };

  // Save updated prices
  const savePrices = async (id) => {
    try {
      // Replace with your update request
      await axios.put(`${url}/api/payment/update/${id}`, { updatedPrices }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Prices updated successfully');
      setEditing(null);
      fetchPayments(); // Refresh payments list
    } catch (error) {
      toast.error('Error updating prices');
      console.error('Error updating prices:', error);
    }
  };

  // Start editing the payment
  const startEditing = (payment) => {
    setEditing(payment._id);
    setUpdatedPrices(payment.types.map(type => ({ ...type })));
  };

  // Handle price change
  const handlePriceChange = (index, value) => {
    const newPrices = [...updatedPrices];
    newPrices[index].price = value;
    setUpdatedPrices(newPrices);
  };

  // Remove a payment
  const removeProduct = async (id) => {
    try {
      await axios.delete(`${url}/api/payment/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('Payment removed successfully');
      fetchPayments(); // Refresh payments list
    } catch (error) {
      toast.error('Error removing payment');
      console.error('Error removing payment:', error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  useEffect(() => {
    filterPaymentsByDate();
  }, [selectedDate, payments]);

  return (
    <div className="payment-container">
      <h2>Bank Transfers</h2>
      {error && <p className="error-message">{error}</p>}
      <br></br>
      <div className="date-filter">
      <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Filter Order Date"
          />
      </div>

      <div className="table-container">
        <table className="payments-table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Postcode</th>
              <th>Receipt</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr key={payment._id}>
                  <td>{payment.firstName}</td>
                  <td>{payment.lastName}</td>
                  <td>{payment.email}</td>
                  <td>{payment.phone}</td>
                  <td>{payment.address.address}</td>
                  <td>{payment.address.postcode}</td>
                  <td>
                    <img
                      src={`${url}/receipt/${payment.receiptUrl}`}
                      alt="Receipt"
                      className="receipt-thumbnail"
                      onClick={() => handleViewReceipt(`${url}/receipt/${payment.receiptUrl}`)}
                    />
                  </td>
                  <td>{new Date(payment.createdAt).toLocaleString()}</td>
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

      {/* Modal for viewing receipt image */}
      {showModal && (
        <div className="modal" onClick={() => setShowModal(false)}>
          <div className="modal-content">
            <img src={modalImageUrl} alt="Receipt" />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Payment;












