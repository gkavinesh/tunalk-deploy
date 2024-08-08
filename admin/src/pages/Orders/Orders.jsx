import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { assets } from "../../assets/assets";
import "react-toastify/dist/ReactToastify.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Orders.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import logo from '..//..//assets/2.png'
import border from '..//..//assets/bottom.png'

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
    const order = orders.find((o) => o._id === orderId);
    if (!order) {
      console.error(`Order with ID ${orderId} not found.`);
      return;
    }

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set a darker background color for the header
    doc.setFillColor(8, 172, 164); // Set the desired background color using RGB
    doc.rect(0, 0, 220, 40, "F"); // Draw a filled rectangle (full width of the page, height 40mm)

    doc.addImage(logo, "PNG", 160, 5, 40, 30); // Logo on top of the dark background

    // Add invoice header
    doc.setFontSize(35);
    doc.setFont("courier", "bold");
    doc.setTextColor(255, 255, 255); // Set text color to white
    doc.text("DISPATCH NOTE", 14, 25); // Adjust vertical position as needed

    // Add invoice number and additional data below the header
    doc.setFontSize(13);
    doc.setFont("courier", "bold");
    doc.setTextColor(0, 0, 0); // Set text color to black

    // Add invoice number
    doc.text(`Invoice Number: ________________`, 14, 55); // Adjust vertical position as needed

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(order.date).toLocaleDateString('en-US', dateOptions);
    doc.text(`Date: ${formattedDate}`, 14, 65); // Adjust vertical position as needed

    // Add a horizontal line below the details
    doc.setLineWidth(0.1);
    doc.line(14, 80, 196, 80); // Adjust y-coordinate based on where you want the line

    const maxWidth = 80; // Maximum width for address text
    const padding = 10; // Padding for the border box

    // Function to get the height of the wrapped text
    function getTextHeight(lines) {
      return lines.length * 8; // 8 is the approximate line height for font size 12
    }

    // Billed To and Delivered To sections
    const startY = 90; // Starting Y position for the box

    // Billed To
    doc.setFontSize(14); // Increase font size for the heading
    doc.setFont("courier", "bold");
    doc.text("Billed To:", 18, startY);
    doc.setFontSize(12); // Set normal font size for the details
    doc.setFont("courier", "normal");

    // Wrap and print the address
    const billedAddressLines = doc.splitTextToSize(order.address.address, maxWidth);
    const billedAddressHeight = getTextHeight(billedAddressLines);
    doc.text(`${order.firstName} ${order.lastName}`, 18, startY + 8);
    doc.text(billedAddressLines, 18, startY + 16);
    doc.text(`${order.phone}`, 18, startY + 16 + billedAddressHeight + 3);

    // Delivered To
    doc.setFontSize(14); // Increase font size for the heading
    doc.setFont("courier", "bold");
    doc.text("Delivered To:", 110, startY);
    doc.setFontSize(12); // Set normal font size for the details
    doc.setFont("courier", "normal");

    // Wrap and print the address
    const deliveredAddressLines = doc.splitTextToSize(order.address.address, maxWidth);
    const deliveredAddressHeight = getTextHeight(deliveredAddressLines);
    doc.text(`${order.firstName} ${order.lastName}`, 110, startY + 8);
    doc.text(deliveredAddressLines, 110, startY + 16);
    doc.text(`${order.phone}`, 110, startY + 16 + deliveredAddressHeight + 3);

    // Draw border box with padding
    const boxWidth = 182; // Adjust width as needed
    const boxHeight = Math.max(billedAddressHeight, deliveredAddressHeight) + 25 + padding * 1.5;
    doc.setLineWidth(0.5);
    doc.rect(14, startY - padding, boxWidth, boxHeight); // Adjust size and position for padding


    // Add a horizontal line below the Billed To and Delivered To sections
    const tableStartY = startY + 50; // Start Y position for the table


    // Add table headers
    const tableColumn = ["Item No", "Item Name", "Qty", "Weight (Kg)", "Rate (0.5 Kg)", "Amount"];
    const tableRows = [];

    // Add items to table with item numbers and individual rates
    order.items.forEach((item, index) => {
      const weight = parseFloat(item.weight || 0);
      const ratePerHalfKg = ((item.price / weight) * 0.5).toFixed(2); // Calculate rate for 0.5 kg

      const itemData = [
        (index + 1).toString(), // Item number (starting from 1)
        item.name,
        item.amount.toString(),
        weight.toFixed(2),
        `LKR ${ratePerHalfKg}`, // Display rate for 0.5 kg
        `LKR ${(item.price * item.amount).toFixed(2)}`, // Total amount for this item
      ];
      tableRows.push(itemData);
    });

    // Add table to PDF with styling
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: tableStartY + 5, // Adjust starting Y for the table
      theme: "plain", // Use "plain" theme to customize borders manually
      headStyles: {
        fillColor: [8, 172, 164], // Header background color
        textColor: [255, 255, 255], // Header text color (white)
        fontSize: 11,
        font: "courier",
        fontStyle: "bold",
      },
      styles: {
        fontSize: 11,
        cellPadding: 3,
        font: "courier",
        fontStyle: "bold",
        lineWidth: 0.5, // Set line width for borders
        lineColor: [0, 0, 0], // Set line color for borders (black)
        borderStyle: 'none', // No default border
      },
      columnStyles: {
        2: { cellWidth: 20, halign: "right" },
        3: { cellWidth: 20, halign: "right" },
        4: { cellWidth: 35, halign: "right" },
        5: { cellWidth: 35, halign: "right" }, // Align Amount column to the right
      },
      didDrawCell: (data) => {
        if (data.section === 'body') {
          const doc = data.doc;
          const cell = data.cell;
          // Draw the bottom border
          doc.setLineWidth(0.5);
          doc.setDrawColor(0, 0, 0); // Black color
          doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
        } else if (data.section === 'head') {
          const doc = data.doc;
          const cell = data.cell;
          // Draw the bottom border for the header
          doc.setLineWidth(0.5);
          doc.setDrawColor(0, 0, 0); // Black color
          doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
        }
      },
    });

    // Add payment details on the left side
    const paymentStartY = tableStartY + 65; // Starting Y position for payment details
    doc.setFontSize(16);
    doc.setFont("courier", "bold");
    doc.text("Payment Details:", 14, paymentStartY);
    doc.setFontSize(10);
    doc.setFont("courier", "normal");
    doc.text("ACCOUNT NO : 009010500546", 14, paymentStartY + 8);
    doc.text("NAME : Daily Fresh Colombo Pvt Ltd", 14, paymentStartY + 16);
    doc.text("BANK : HNB Bank, Colombo 06", 14, paymentStartY + 24);
    doc.text("SWIFT CODE - HBLILKLX", 14, paymentStartY + 32);
    doc.text("BANK CODE - 7083", 14, paymentStartY + 40);
    doc.text("BRANCH CODE - 009", 14, paymentStartY + 48);

    // Add cost summary on the right side
    const summaryStartY = paymentStartY + 0; // Align with payment details
    const summaryX = 115; // X position for cost summary
    const summaryWidth = 80; // Width of the border box
    const summaryHeight = 30; // Height of the border box

    // Draw the border box
    doc.setLineWidth(0.5);
    doc.rect(summaryX, summaryStartY - 5, summaryWidth, summaryHeight); // Draw border box with top padding

    // Add subtotal and delivery fee inside the box
    doc.setFontSize(12);
    doc.setFont("courier", "bold");
    doc.text("Subtotal:", summaryX + 8, summaryStartY + 5);
    doc.text(`LKR ${(order.items.reduce((acc, item) => acc + (item.price * item.amount), 0)).toFixed(2)}`, summaryX + 39, summaryStartY + 5);

    doc.text("Delivery Fee:", summaryX + 8, summaryStartY + 15);
    doc.text("Free", summaryX + 58, summaryStartY + 15);

    // Add total cost below the border box
    const totalCostStartY = summaryStartY + 40;
    const totalCostX = summaryX; // X position for the total cost section
    const totalCostWidth = summaryWidth; // Width of the background box
    const totalCostHeight = 15; // Height of the background box


    // Draw the background rectangle with the desired color
    doc.setFillColor(8, 172, 164); // Set the background color (example: teal)
    doc.rect(totalCostX, totalCostStartY - 10, totalCostWidth, totalCostHeight, "F"); // Draw filled rectangle

    // Set text color to white
    doc.setTextColor(255, 255, 255); // White color

    // Add the "Total Cost" text and the total amount with background
    doc.setFontSize(16);
    doc.setFont("courier", "bold");
    doc.text("TOTAL :", totalCostX + 8, totalCostStartY -1);
    doc.text(`LKR ${(order.items.reduce((acc, item) => acc + (item.price * item.amount), 0)).toFixed(2)}`, totalCostX + 35, totalCostStartY - 1);

    // Add a border image at the bottom
    const borderImageUrl = border; // Replace with your image URL

    // Use Image() to load the image
    const img = new Image();
    img.src = borderImageUrl;

    img.onload = function () {
      const pageHeight = doc.internal.pageSize.height;
      const imageHeight = 30; // Adjust based on the height of your image

      // Draw the image once it's loaded
      doc.addImage(img, "PNG", 0, pageHeight - imageHeight, 210, imageHeight);

      // Save and print the PDF after the image is drawn
      doc.autoPrint(); // This will automatically open the print dialog
      window.open(doc.output("bloburl")); // Opens the PDF in a new tab to trigger the print dialog
    };

    img.onerror = function () {
      console.error("Failed to load border image from URL.");
    };
  };

  const printInvoice = (orderId) => {
    const order = orders.find((o) => o._id === orderId);
    if (!order) {
      console.error(`Order with ID ${orderId} not found.`);
      return;
    }

    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Set a darker background color for the header
    doc.setFillColor(8, 172, 164); // Set the desired background color using RGB
    doc.rect(0, 0, 220, 40, "F"); // Draw a filled rectangle (full width of the page, height 40mm)

    doc.addImage(logo, "PNG", 160, 5, 40, 30); // Logo on top of the dark background

    // Add invoice header
    doc.setFontSize(50);
    doc.setFont("courier", "bold");
    doc.setTextColor(255, 255, 255); // Set text color to white
    doc.text("INVOICE", 14, 25); // Adjust vertical position as needed

    // Add invoice number and additional data below the header
    doc.setFontSize(13);
    doc.setFont("courier", "bold");
    doc.setTextColor(0, 0, 0); // Set text color to black

    // Add invoice number
    doc.text(`Invoice Number: ________________`, 14, 55); // Adjust vertical position as needed

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = new Date(order.date).toLocaleDateString('en-US', dateOptions);
    doc.text(`Date: ${formattedDate}`, 14, 65); // Adjust vertical position as needed

    // Add a horizontal line below the details
    doc.setLineWidth(0.1);
    doc.line(14, 80, 196, 80); // Adjust y-coordinate based on where you want the line

    const maxWidth = 80; // Maximum width for address text
    const padding = 10; // Padding for the border box

    // Function to get the height of the wrapped text
    function getTextHeight(lines) {
      return lines.length * 8; // 8 is the approximate line height for font size 12
    }

    // Billed To and Delivered To sections
    const startY = 90; // Starting Y position for the box

    // Billed To
    doc.setFontSize(14); // Increase font size for the heading
    doc.setFont("courier", "bold");
    doc.text("Billed To:", 18, startY);
    doc.setFontSize(12); // Set normal font size for the details
    doc.setFont("courier", "normal");

    // Wrap and print the address
    const billedAddressLines = doc.splitTextToSize(order.address.address, maxWidth);
    const billedAddressHeight = getTextHeight(billedAddressLines);
    doc.text(`${order.firstName} ${order.lastName}`, 18, startY + 8);
    doc.text(billedAddressLines, 18, startY + 16);
    doc.text(`${order.phone}`, 18, startY + 16 + billedAddressHeight + 3);

    // Delivered To
    doc.setFontSize(14); // Increase font size for the heading
    doc.setFont("courier", "bold");
    doc.text("Delivered To:", 110, startY);
    doc.setFontSize(12); // Set normal font size for the details
    doc.setFont("courier", "normal");

    // Wrap and print the address
    const deliveredAddressLines = doc.splitTextToSize(order.address.address, maxWidth);
    const deliveredAddressHeight = getTextHeight(deliveredAddressLines);
    doc.text(`${order.firstName} ${order.lastName}`, 110, startY + 8);
    doc.text(deliveredAddressLines, 110, startY + 16);
    doc.text(`${order.phone}`, 110, startY + 16 + deliveredAddressHeight + 3);

    // Draw border box with padding
    const boxWidth = 182; // Adjust width as needed
    const boxHeight = Math.max(billedAddressHeight, deliveredAddressHeight) + 25 + padding * 1.5;
    doc.setLineWidth(0.5);
    doc.rect(14, startY - padding, boxWidth, boxHeight); // Adjust size and position for padding


    // Add a horizontal line below the Billed To and Delivered To sections
    const tableStartY = startY + 50; // Start Y position for the table


    // Add table headers
    const tableColumn = ["Item No", "Item Name", "Qty", "Weight (Kg)", "Rate (0.5 Kg)", "Amount"];
    const tableRows = [];

    // Add items to table with item numbers and individual rates
    order.items.forEach((item, index) => {
      const weight = parseFloat(item.weight || 0);
      const ratePerHalfKg = ((item.price / weight) * 0.5).toFixed(2); // Calculate rate for 0.5 kg

      const itemData = [
        (index + 1).toString(), // Item number (starting from 1)
        item.name,
        item.amount.toString(),
        weight.toFixed(2),
        `LKR ${ratePerHalfKg}`, // Display rate for 0.5 kg
        `LKR ${(item.price * item.amount).toFixed(2)}`, // Total amount for this item
      ];
      tableRows.push(itemData);
    });

    // Add table to PDF with styling
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: tableStartY + 5, // Adjust starting Y for the table
      theme: "plain", // Use "plain" theme to customize borders manually
      headStyles: {
        fillColor: [8, 172, 164], // Header background color
        textColor: [255, 255, 255], // Header text color (white)
        fontSize: 11,
        font: "courier",
        fontStyle: "bold",
      },
      styles: {
        fontSize: 11,
        cellPadding: 3,
        font: "courier",
        fontStyle: "bold",
        lineWidth: 0.5, // Set line width for borders
        lineColor: [0, 0, 0], // Set line color for borders (black)
        borderStyle: 'none', // No default border
      },
      columnStyles: {
        2: { cellWidth: 20, halign: "right" },
        3: { cellWidth: 20, halign: "right" },
        4: { cellWidth: 35, halign: "right" },
        5: { cellWidth: 35, halign: "right" }, // Align Amount column to the right
      },
      didDrawCell: (data) => {
        if (data.section === 'body') {
          const doc = data.doc;
          const cell = data.cell;
          // Draw the bottom border
          doc.setLineWidth(0.5);
          doc.setDrawColor(0, 0, 0); // Black color
          doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
        } else if (data.section === 'head') {
          const doc = data.doc;
          const cell = data.cell;
          // Draw the bottom border for the header
          doc.setLineWidth(0.5);
          doc.setDrawColor(0, 0, 0); // Black color
          doc.line(cell.x, cell.y + cell.height, cell.x + cell.width, cell.y + cell.height);
        }
      },
    });

    // Add payment details on the left side
    const paymentStartY = tableStartY + 65; // Starting Y position for payment details
    doc.setFontSize(16);
    doc.setFont("courier", "bold");
    doc.text("Payment Details:", 14, paymentStartY);
    doc.setFontSize(10);
    doc.setFont("courier", "normal");
    doc.text("ACCOUNT NO : 009010500546", 14, paymentStartY + 8);
    doc.text("NAME : Daily Fresh Colombo Pvt Ltd", 14, paymentStartY + 16);
    doc.text("BANK : HNB Bank, Colombo 06", 14, paymentStartY + 24);
    doc.text("SWIFT CODE - HBLILKLX", 14, paymentStartY + 32);
    doc.text("BANK CODE - 7083", 14, paymentStartY + 40);
    doc.text("BRANCH CODE - 009", 14, paymentStartY + 48);

    // Add cost summary on the right side
    const summaryStartY = paymentStartY + 0; // Align with payment details
    const summaryX = 115; // X position for cost summary
    const summaryWidth = 80; // Width of the border box
    const summaryHeight = 30; // Height of the border box

    // Draw the border box
    doc.setLineWidth(0.5);
    doc.rect(summaryX, summaryStartY - 5, summaryWidth, summaryHeight); // Draw border box with top padding

    // Add subtotal and delivery fee inside the box
    doc.setFontSize(12);
    doc.setFont("courier", "bold");
    doc.text("Subtotal:", summaryX + 8, summaryStartY + 5);
    doc.text(`LKR ${(order.items.reduce((acc, item) => acc + (item.price * item.amount), 0)).toFixed(2)}`, summaryX + 39, summaryStartY + 5);

    doc.text("Delivery Fee:", summaryX + 8, summaryStartY + 15);
    doc.text("Free", summaryX + 58, summaryStartY + 15);

    // Add total cost below the border box
    const totalCostStartY = summaryStartY + 40;
    const totalCostX = summaryX; // X position for the total cost section
    const totalCostWidth = summaryWidth; // Width of the background box
    const totalCostHeight = 15; // Height of the background box


    // Draw the background rectangle with the desired color
    doc.setFillColor(8, 172, 164); // Set the background color (example: teal)
    doc.rect(totalCostX, totalCostStartY - 10, totalCostWidth, totalCostHeight, "F"); // Draw filled rectangle

    // Set text color to white
    doc.setTextColor(255, 255, 255); // White color

    // Add the "Total Cost" text and the total amount with background
    doc.setFontSize(16);
    doc.setFont("courier", "bold");
    doc.text("TOTAL :", totalCostX + 8, totalCostStartY - 1);
    doc.text(`LKR ${(order.items.reduce((acc, item) => acc + (item.price * item.amount), 0)).toFixed(2)}`, totalCostX + 35, totalCostStartY - 1);

    // Add a border image at the bottom
    const borderImageUrl = border; // Replace with your image URL

    // Use Image() to load the image
    const img = new Image();
    img.src = borderImageUrl;

    img.onload = function () {
      const pageHeight = doc.internal.pageSize.height;
      const imageHeight = 30; // Adjust based on the height of your image

      // Draw the image once it's loaded
      doc.addImage(img, "PNG", 0, pageHeight - imageHeight, 210, imageHeight);

      // Save and print the PDF after the image is drawn
      doc.autoPrint(); // This will automatically open the print dialog
      window.open(doc.output("bloburl")); // Opens the PDF in a new tab to trigger the print dialog
    };

    img.onerror = function () {
      console.error("Failed to load border image from URL.");
    };
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
















