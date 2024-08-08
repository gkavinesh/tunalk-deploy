import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from 'crypto';
import axios from "axios";

const frontendUrl = "https://localhost:5173";

// OnePay configuration
const paymentUrl = 'https://merchant-api-live-v2.onepay.lk/api/ipg/gateway/request-payment-link/?hash=';
const appId = 'FYUZ118E58041E1505AA3';
const appToken = '77b5298f53d8cafcf66f43278718206f07d0f3006f12c1a470...'; // Keep the full token in your actual code
const hashSalt = 'OSFA118E58041E1505AC9';


const placeOrder = async (req, res) => {
    try {
        // Extracting data from request
        const { orderId, userId, address, items, firstName, lastName, email, phone, total, paymentMethod } = req.body;
        console.log('Received order data:', req.body);

        // Validate required fields
        if (!userId || !address || !items || !total || !firstName || !lastName || !email || !phone) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        if (paymentMethod === "bankTransfer" || paymentMethod === "cashOnDelivery") {
            // Save the order to the database
            const newOrder = new orderModel({
                orderId,
                userId,
                address,
                items,
                total,
                firstName,
                lastName,
                email,
                phone,
                paymentMethod,
            });

            await newOrder.save();
            await userModel.findByIdAndUpdate(userId, { cartData: {} });

            return res.json({ success: true, message: "Order placed successfully" });
        } else {
            return res.status(400).json({ success: false, message: "Invalid payment method" });
        }
    } catch (error) {
        console.error("Error processing order:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


  
// Verify Order Function
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Payment successful" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({
        success: false,
        message: "Payment not successful, order deleted",
      });
    }
  } catch (error) {
    console.error("Error verifying order:", error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

// Function to get user orders
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    const orders = await orderModel.find({ userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// Displaying Orders in Admin Panel
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error retrieving orders" });
  }
};

const updateOrder= async (req, res) => {
  const { orderId, status, payment } = req.body;

  try {
    // Find the order by ID
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Update the order's status and payment status
    order.status = status;
    order.payment = payment;

    // Save the updated order
    await order.save();

    // Send a success response
    res.json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Error updating order" });
  }
};

const placeAdminOrder = async (req, res) => {
  try {
    const { orderId, userId, address, items, firstName, lastName, email, phone, total, paymentMethod } = req.body;

    // Validate required fields
    if (!userId || !address || !items || !total || !firstName || !lastName || !email || !phone) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Save the order to the database
    const newOrder = new orderModel({
      orderId,
      userId,
      address,
      items,
      total,
      firstName,
      lastName,
      email,
      phone,
      paymentMethod,
    });

    await newOrder.save();

    return res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error("Error placing admin order:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrder, placeAdminOrder};


















