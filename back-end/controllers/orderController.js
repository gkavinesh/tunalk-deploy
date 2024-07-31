import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from 'crypto';

const frontendUrl = "https://localhost:5173";

// OnePay configuration
const paymentUrl = 'https://merchant-api-live-v2.onepay.lk/api/ipg/gateway/request-payment-link/?hash=';
const appId = 'FYUZ118E58041E1505AA3';
const appToken = '77b5298f53d8cafcf66f43278718206f07d0f3006f12c1a470...'; // Keep the full token in your actual code
const hashSalt = 'OSFA118E58041E1505AC9';


// Helper function to generate hash
const generateHash = (data) => {
  const hash = crypto.createHash('sha256');
  const hashString = data + hashSalt;
  return hash.update(hashString, 'utf-8').digest('hex');
};

const placeOrder = async (req, res) => {
    try {
      const {
        orderId,
        userId,
        address,
        items,
        firstName,
        lastName,
        email,
        phone,
        total,
        paymentMethod
      } = req.body;
  
      if (!userId || !address || !items || !total || !firstName || !lastName || !email || !phone) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
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
  
      // Handle OnePay payment
      if (paymentMethod === 'onePay') {
        const requestDataObject = {
          amount: total,
          app_id: appId,
          reference: "tuna",
          customer_first_name: firstName,
          customer_last_name: lastName,
          customer_phone_number: phone,
          customer_email: email,
          transaction_redirect_url: `${frontendUrl}/payment-success`,
          currency: 'LKR', // Assuming LKR as the currency
        };
  
        // Stringify without spaces
        const requestData = JSON.stringify(requestDataObject, (key, value) => (typeof value === "string" ? value.trim() : value));
  
        // Log the data being hashed
        console.log('Data for hashing:', requestData);
  
        const hash = generateHash(requestData);
  
        // Log the generated hash
        console.log('Generated hash:', hash);
  
        try {
          const response = await fetch(`${paymentUrl}${hash}`, {
            method: 'POST',
            headers: {
              'Authorization': appToken,
              'Content-Type': 'application/json',
            },
            body: requestData,
          });
  
          const json_data = await response.json();
  
          if (json_data.status === 1000) {
            // Send hash and redirect URL to the frontend
            return res.json({
              success: true,
              paymentLink: json_data.data.gateway.redirect_url,
              hash,
            });
          } else {
            return res.status(400).json({ success: false, message: json_data.message });
          }
        } catch (error) {
          console.error("Error processing payment:", error);
          return res.status(500).json({ success: false, message: "Payment processing error" });
        }
      } else if (paymentMethod === "bankTransfer" || paymentMethod === "cash") {
        return res.json({ success: true, message: "Order placed successfully" });
      } else {
        return res.status(400).json({ success: false, message: "Invalid payment method" });
      }
  
    } catch (error) {
      console.error("Error processing order:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
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

// Function to update order status and payment status
const updateOrder = async (req, res) => {
  const { orderId, status, payment } = req.body;

  try {
    // Validate that orderId is provided
    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    // Find and update the order
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { status, payment },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.json({
      success: true,
      message: "Order updated successfully",
      data: updatedOrder,
    });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrder };


















