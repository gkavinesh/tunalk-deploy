import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import Preloader from '../../components/preloadersub/preloader'; // Ensure this is the correct path to the Preloader component
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import { ToastContainer, toast } from 'react-toastify'; // Import Toast components
import 'react-toastify/dist/ReactToastify.css'; // Import Toast CSS

const Orders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // Use useLocation to access state

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${url}/api/order/userorders`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      setError(error.message);
    } finally {
      // Ensure loading is set to false after at least 3 seconds
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }

    // Display toast notification if successMessage exists
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage);
    }
  }, [token, location.state]); // Add location.state to the dependency array

  const updatePaymentStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`${url}/api/order/updatePaymentStatus`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, newStatus }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      if (result.success) {
        // Update the data state with new payment status
        setData((prevData) =>
          prevData.map((order) =>
            order._id === orderId
              ? { ...order, payment: newStatus }
              : order
          )
        );
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error updating payment status:', error.message);
      toast.error('Error updating payment status');
    }
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="orders-container w-full max-w-[75%] px-7 mx-auto">
        <h2 className="text-2xl font-bold text-left text-teal-700 mb-8">
          My Orders
        </h2>
        {error && (
          <p className="error-message text-red-500 mb-4 text-center">
            Error fetching orders: {error}
          </p>
        )}
        {data.length === 0 ? (
          <p className="text-center text-gray-700">
            You have no orders yet. Place an order now to start shopping!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="orders-table w-full text-left text-sm font-light">
              <thead className="border-b bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white"
                  >
                    Order ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white"
                  >
                    Parcel
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white"
                  >
                    Item Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white"
                  >
                    Quantity
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white"
                  >
                    Amount
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white"
                  >
                    Payment Method
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white"
                  >
                    Order Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white"
                  >
                    Payment Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white"
                  >
                    Total Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {data.map((order) => {
                  const totalAmount = order.items.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  );
                  return (
                    <React.Fragment key={order._id}>
                      {order.items.map((item, itemIndex) => (
                        <tr
                          key={`${order._id}-${itemIndex}`}
                          className={`bg-white dark:bg-gray-800 ${
                            itemIndex % 2 === 0 ? 'bg-gray-50' : ''
                          }`}
                        >
                          {itemIndex === 0 && (
                            <>
                              <td
                                rowSpan={order.items.length}
                                className="px-6 py-4 font-medium text-gray-900 dark:text-white"
                              >
                                Order #{order._id}
                              </td>
                              <td rowSpan={order.items.length} className="px-6 py-4">
                                <img
                                  src={assets.parcel_icon}
                                  alt="Parcel Icon"
                                  className="parcel-icon w-8 h-8"
                                />
                              </td>
                              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                {item.name}
                              </td>
                              <td className="px-6 py-4">{item.amount}</td>
                              <td className="px-6 py-4">
                                {(item.price * item.amount).toFixed(2)}
                              </td>
                              <td
                                rowSpan={order.items.length}
                                className="px-6 py-4 text-left"
                              >
                                {order.paymentMethod}
                              </td>
                              <td
                                rowSpan={order.items.length}
                                className="px-6 py-4 text-left"
                              >
                                {order.status}
                              </td>
                              <td
                                rowSpan={order.items.length}
                                className="px-6 py-4 text-left"
                              >
                                {order.payment ? 'Pending' : 'Paid'}
                              </td>
                              <td
                                rowSpan={order.items.length}
                                className="px-6 py-4 text-left font-medium text-gray-900 dark:text-white"
                              >
                                LKR {order.total.toFixed(2)}
                              </td>
                            </>
                          )}
                          {itemIndex > 0 && (
                            <>
                              <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                {item.name}
                              </td>
                              <td className="px-6 py-4">{item.amount}</td>
                              <td className="px-6 py-4">
                                {(item.price * item.amount).toFixed(2)}
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <ToastContainer /> {/* Add ToastContainer to display toast messages */}
    </div>
  );
};

export default Orders;





























