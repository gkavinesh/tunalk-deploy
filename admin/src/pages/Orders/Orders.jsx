import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { assets } from "../../assets/assets";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Orders.css";

const AdminOrders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [error, setError] = useState(null);
  const [orderStates, setOrderStates] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Fetch all orders
  const fetchOrders = async () => {
    try {
      const response = await fetch(`${url}/api/order/list`);
      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          const ordersData = data.data;
          setOrders(ordersData);
          setFilteredOrders(ordersData); // Initialize filtered orders

          // Initialize state for each order
          const initialStates = ordersData.reduce((acc, order) => {
            acc[order._id] = { status: order.status, payment: order.payment };
            return acc;
          }, {});
          setOrderStates(initialStates);
        } else {
          toast.error("Error fetching orders");
        }
      } else {
        toast.error("Error fetching orders");
      }
    } catch (error) {
      setError(error.message);
      console.error("Error fetching orders:", error);
      toast.error("Error fetching orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Update order status and payment status in the database
  const updateOrder = async (orderId, status, payment) => {
    try {
      const response = await fetch(`${url}/api/order/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status,
          payment,
        }),
      });
      const data = await response.json();

      if (response.ok) {
        if (data.success) {
          toast.success("Order updated successfully");
          fetchOrders(); // Refresh orders
        } else {
          toast.error("Error updating order");
        }
      } else {
        toast.error("Error updating order");
      }
    } catch (error) {
      toast.error("Error updating order");
      console.error("Error updating order:", error);
    }
  };

  // Filter orders based on search term, status, and date range
  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    if (startDate && endDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date); // Ensure 'order.date' is the correct field
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    filterOrders();
  }, [searchTerm, selectedStatus, startDate, endDate, orders]);

  // Group orders by user ID
  const groupOrdersByUserId = (orders) => {
    return orders.reduce((acc, order) => {
      if (!acc[order.userId]) {
        acc[order.userId] = [];
      }
      acc[order.userId].push(order);
      return acc;
    }, {});
  };

  // Grouped orders by user
  const groupedOrders = groupOrdersByUserId(filteredOrders);

  return (
    <div className="admin-orders">
      <ToastContainer /> {/* Enable Toast notifications */}
      <div className="orders-container">
        <h2 className="header">Admin Orders</h2>
        {error && <p className="error-message">Error: {error}</p>}

        {/* Search and Filter Section */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Last two digits of order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Processing">Processing</option>
            <option value="Preparing Order">Preparing Order</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Shipped">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {/* Date Range Picker */}
        <div className="date-picker-container">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="Start Date"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="End Date"
          />
        </div>

        {Object.keys(groupedOrders).length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          Object.keys(groupedOrders).map((userId) => (
            <div key={userId} className="user-orders">
              <h3 className="user-id">User ID: {userId}</h3>
              <div className="table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Parcel</th>
                      <th>First Name</th>
                      <th>Phone Number</th>
                      <th>Item Name</th>
                      <th>Quantity</th>
                      <th>Weight (Kg)</th>
                      <th>Amount</th>
                      <th>Payment Method</th>
                      <th>Order Status</th>
                      <th>Payment Status</th>
                      <th>Total Amount</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedOrders[userId].map((order) => {
                      const { status, payment } = orderStates[order._id] || {};

                      return (
                        <React.Fragment key={order._id}>
                          {order.items.map((item, itemIndex) => (
                            <tr key={`${order._id}-${itemIndex}`}>
                              {itemIndex === 0 && (
                                <>
                                  <td rowSpan={order.items.length}>
                                    {order._id}
                                  </td>
                                  <td rowSpan={order.items.length}>
                                    <img
                                      src={assets.parcel_icon}
                                      alt="Parcel Icon"
                                      className="parcel-icon"
                                    />
                                  </td>
                                  <td rowSpan={order.items.length}>
                                    {order.firstName}
                                  </td>
                                  <td rowSpan={order.items.length}>
                                    {order.phone}
                                  </td>
                                  <td>{item.name}</td>
                                  <td>{item.amount}</td>
                                  <td>{parseFloat(item.weight || 0).toFixed(2)}</td>
                                  <td>
                                    {(item.price * item.amount).toFixed(2)}
                                  </td>
                                  <td rowSpan={order.items.length}>
                                    {order.paymentMethod}
                                  </td>
                                  <td rowSpan={order.items.length}>
                                    <select
                                      value={status || "Processing"}
                                      onChange={(e) =>
                                        setOrderStates((prev) => ({
                                          ...prev,
                                          [order._id]: {
                                            ...prev[order._id],
                                            status: e.target.value,
                                          },
                                        }))
                                      }
                                    >
                                      <option value="Processing">
                                        Processing
                                      </option>
                                      <option value="Preparing Order">
                                        Preparing Order
                                      </option>
                                      <option value="Out for delivery">
                                        Out for delivery
                                      </option>
                                      <option value="Shipped">Delivered</option>
                                      <option value="Cancelled">
                                        Cancelled
                                      </option>
                                    </select>
                                  </td>
                                  <td rowSpan={order.items.length}>
                                    <select
                                      value={payment || "Pending"}
                                      onChange={(e) =>
                                        setOrderStates((prev) => ({
                                          ...prev,
                                          [order._id]: {
                                            ...prev[order._id],
                                            payment: e.target.value,
                                          },
                                        }))
                                      }
                                    >
                                      <option value="Pending">Pending</option>
                                      <option value="Paid">Paid</option>
                                    </select>
                                  </td>
                                  <td rowSpan={order.items.length}>
                                    LKR {order.total.toFixed(2)}
                                  </td>
                                  <td rowSpan={order.items.length}>
                                    <button
                                      className="update-button"
                                      onClick={() =>
                                        updateOrder(
                                          order._id,
                                          orderStates[order._id]?.status,
                                          orderStates[order._id]?.payment
                                        )
                                      }
                                    >
                                      Update
                                    </button>
                                  </td>
                                </>
                              )}
                              {itemIndex > 0 && (
                                <>
                                  <td>{item.name}</td>
                                  <td>{item.amount}</td>
                                  <td>{parseFloat(item.weight || 0).toFixed(2)}</td>
                                  <td>
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;











