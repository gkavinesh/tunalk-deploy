import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";

// Load sensitive data from environment variables
const frontendUrl = "https://localhost:5173";
const onepayBaseUrl = process.env.ONEPAY_BASE_URL || "https://merchant-api-live-v2.onepay.lk/api/ipg/gateway/request-transaction/?hash=";
const onepayAppId = process.env.ONEPAY_APP_ID || "FYUZ118E58041E1505AA3";
const onepayHashSalt = process.env.ONEPAY_HASH_SALT || "OSFA118E58041E1505AC9";
const onepayToken = process.env.ONEPAY_TOKEN || "600a2bffbbbfa7782822add71cc80d91b4bec3ac28ee74eb0128f01c05aa569fef28ed5dddeff754.R11F118E58041E1505ADE";

const placeOrder = async (req, res) => {
    try {
        const { orderId, userId, address, items, firstName, lastName, email, phone, total, paymentMethod } = req.body;

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
            paymentMethod
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        if (paymentMethod === 'onePay') {
            const transactionDetails = {
                amount: total,
                app_id: onepayAppId,
                reference: orderId, // Use orderId as reference
                customer_first_name: firstName,
                customer_last_name: lastName,
                customer_phone_number: phone,
                customer_email: email,
                transaction_redirect_url: `${frontendUrl}/payment-success`, // Redirect URL after payment
                currency: "LKR",
            };

            // Generate hash key
            const hashString = JSON.stringify(transactionDetails).replace(/\s/g, '') + onepayHashSalt;
            const hash = crypto.createHash('sha256').update(hashString).digest('hex');

            const requestOptions = {
                method: 'POST',
                headers: {
                    'Authorization': onepayToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transactionDetails),
            };

            const response = await fetch(`${onepayBaseUrl}/request-payment-link/?hash=${hash}`, requestOptions);
            const responseData = await response.json();

            // Handle the response from Onepay
            if (responseData.status === 1000 && responseData.data && responseData.data.gateway && responseData.data.gateway.redirect_url) {
                // Optionally save IPG transaction ID and amount details to your order model
                await orderModel.findByIdAndUpdate(orderId, {
                    ipgTransactionId: responseData.data.ipg_transaction_id,
                    amountDetails: responseData.data.amount
                });

                return res.json({ 
                    success: true, 
                    session_url: responseData.data.gateway.redirect_url 
                });
            } else {
                return res.status(500).json({ success: false, message: "Failed to get redirect URL from Onepay" });
            }
        } else {
            return res.json({ success: true, message: "Order placed successfully" });
        }
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
// Function to verify an order
const verifyOrder = async (req, res) => {
    const { orderId, success } = req.body;
    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            return res.json({ success: true, message: "Payment successful" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            return res.json({ success: false, message: "Payment not successful, order deleted" });
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

        res.json({ success: true, message: "Order updated successfully", data: updatedOrder });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export { placeOrder, verifyOrder, userOrders, listOrders, updateOrder };














