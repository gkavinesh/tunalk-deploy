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
  const [selectedDate, setSelectedDate] = useState(null);
  const [firstNameSearch, setFirstNameSearch] = useState("");

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

  // Filter orders based on search term, first name, status, and date
  const filterOrders = () => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order._id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (firstNameSearch) {
      filtered = filtered.filter((order) =>
        order.firstName.toLowerCase().includes(firstNameSearch.toLowerCase())
      );
    }

    if (selectedStatus !== "All") {
      filtered = filtered.filter((order) => order.status === selectedStatus);
    }

    if (selectedDate) {
      const selectedDateStart = new Date(selectedDate);
      const selectedDateEnd = new Date(selectedDateStart);
      selectedDateEnd.setDate(selectedDateStart.getDate() + 1);

      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.date); // Ensure 'order.date' is the correct field
        return orderDate >= selectedDateStart && orderDate < selectedDateEnd;
      });
    }

    setFilteredOrders(filtered);
  };

  useEffect(() => {
    filterOrders();
  }, [searchTerm, firstNameSearch, selectedStatus, selectedDate, orders]);

  // Calculate total amount dynamically
  const calculateTotalAmount = (items) => {
    return items.reduce((total, item) => total + (item.price * item.amount || 0), 0);
  };

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

  // Print Dispatch Note and Invoice functionality (replace with actual implementation)
  const printDispatchNote = (orderId) => {
    console.log(`Print Dispatch Note for Order ID: ${orderId}`);
    // Implement the print functionality here
  };

  const printInvoice = (orderId) => {
    console.log(`Print Invoice for Order ID: ${orderId}`);
    // Implement the print functionality here
  };

  return (
    <div className="admin-orders">
      <ToastContainer /> {/* Enable Toast notifications */}
      <div className="orders-container">
        <h2>Orders</h2>
        <br></br>
        {error && <p className="error-message">Error: {error}</p>}

        {/* Search and Filter Section */}
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search Order ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <input
            type="text"
            placeholder="Search First Name"
            value={firstNameSearch}
            onChange={(e) => setFirstNameSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-select"
          >
            <option value="All">Filter Order Status</option>
            <option value="Processing">Processing</option>
            <option value="Preparing Order">Preparing Order</option>
            <option value="Out for delivery">Out for delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Filter Order Date"
          />
        </div>

        {Object.keys(groupedOrders).length === 0 ? (
          <p className="no-orders">No orders found.</p>
        ) : (
          Object.keys(groupedOrders).map((userId) => (
            <div key={userId} className="user-orders">
              <h3 className="user-id">User ID: {userId}</h3>
              <div className="table-container">
                {/* First Table: General Order Information */}
                <table className="orders-table general-info-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Phone Number</th>
                      <th>Payment Method</th>
                      <th>Order Status</th>
                      <th>Payment Status</th>
                      <th>Total Amount</th>
                      <th>Update Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedOrders[userId].map((order) => {
                      const { status, payment } = orderStates[order._id] || {};

                      // Calculate total amount dynamically
                      const totalAmount = calculateTotalAmount(order.items);

                      return (
                        <tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.firstName}</td>
                          <td>{order.lastName}</td>
                          <td>{order.phone}</td>
                          <td>{order.paymentMethod}</td>
                          <td>
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
                              <option value="Processing">Processing</option>
                              <option value="Preparing Order">
                                Preparing Order
                              </option>
                              <option value="Out for delivery">
                                Out for delivery
                              </option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td>
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
                          <td>{totalAmount.toFixed(2)}</td>
                          <td>
                            <button
                              className="btn-update"
                              onClick={() =>
                                updateOrder(
                                  order._id,
                                  orderStates[order._id].status,
                                  orderStates[order._id].payment
                                )
                              }
                            >
                              Update
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Second Table: Item Details */}
                <div className="item-details-container">
                  <table className="orders-table item-details-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Weight (Kg)</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {groupedOrders[userId].map((order) =>
                        order.items.map((item, itemIndex) => (
                          <tr key={`${order._id}-${itemIndex}`}>
                            <td>{item.name}</td>
                            <td>{item.amount}</td>
                            <td>{parseFloat(item.weight || 0).toFixed(2)}</td>
                            <td>{(item.price * item.amount).toFixed(2)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  {/* Buttons for Dispatch Note and Invoice */}
                  <div className="print-buttons">
                    <button
                      className="btn-print"
                      onClick={() => printDispatchNote(groupedOrders[userId][0]._id)}
                    >
                      Print Dispatch Note
                    </button>
                    <button
                      className="btn-print"
                      onClick={() => printInvoice(groupedOrders[userId][0]._id)}
                    >
                      Print Invoice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
















