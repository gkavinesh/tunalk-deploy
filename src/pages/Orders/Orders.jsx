import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import Preloader from '../../components/preloadersub/preloader'; // Ensure this is the correct path to the Preloader component

const Orders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userorders`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching orders:", error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Set loading to false after data fetch is complete
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  // Render preloader if loading
  if (loading) {
    return <Preloader />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-gray-50">
      <div className="orders-container w-full max-w-7xl px-7">
        <h2 className="text-2xl font-bold text-left text-teal-700 mb-8">My Orders</h2>
        {error && <p className="error-message text-red-500 mb-4 text-center">Error fetching orders: {error}</p>}
        <div className="overflow-x-auto">
          <table className="orders-table w-full text-left text-sm font-light">
            <thead className="border-b bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white">Order ID</th>
                <th scope="col" className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white">Parcel</th>
                <th scope="col" className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white">Item Name</th>
                <th scope="col" className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white">Quantity</th>
                <th scope="col" className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white">Amount</th>
                <th scope="col" className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white">Payment Method</th>
                <th scope="col" className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white">Order Status</th>
                <th scope="col" className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white">Payment Status</th>
                <th scope="col" className="px-6 py-4 font-medium text-left text-gray-900 dark:text-white">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {data.map((order) => {
                const totalAmount = order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                return (
                  <React.Fragment key={order._id}>
                    {order.items.map((item, itemIndex) => (
                      <tr key={`${order._id}-${itemIndex}`} className={`bg-white dark:bg-gray-800 ${itemIndex % 2 === 0 ? 'bg-gray-50' : ''}`}>
                        {itemIndex === 0 && (
                          <>
                            <td rowSpan={order.items.length} className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                              Order #{order._id}
                            </td>
                            <td rowSpan={order.items.length} className="px-6 py-4">
                              <img src={assets.parcel_icon} alt="Parcel Icon" className="parcel-icon" />
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </td>
                            <td className="px-6 py-4">{item.amount}</td>
                            <td className="px-6 py-4">{(item.price * item.amount).toFixed(2)}</td>
                            <td rowSpan={order.items.length} className="px-6 py-4 text-left">{order.paymentMethod}</td>
                            <td rowSpan={order.items.length} className="px-6 py-4 text-left">{order.status}</td>
                            <td rowSpan={order.items.length} className="px-6 py-4 text-left">{order.payment ? 'Paid' : 'Pending'}</td>
                            <td rowSpan={order.items.length} className="px-6 py-4 text-left font-medium text-gray-900 dark:text-white">
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
                            <td className="px-6 py-4">{(item.price * item.amount).toFixed(2)}</td>
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
      </div>
    </div>
  );
};

export default Orders;























