import axios from "axios";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";

// Load sensitive data from environment variables
const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
const onepayBaseUrl = process.env.ONEPAY_BASE_URL || "https://merchant-api-live-v2.onepay.lk/api/ipg/gateway/request-transaction/?hash=";
const onepayAppId = process.env.ONEPAY_APP_ID || "FYUZ118E58041E1505AA3";
const onepayHashSalt = process.env.ONEPAY_HASH_SALT || "OSFA118E58041E1505AC9";
const onepayToken = process.env.ONEPAY_TOKEN || "600a2bffbbbfa7782822add71cc80d91b4bec3ac28ee74eb0128f01c05aa569fef28ed5dddeff754.R11F118E58041E1505ADE";

// Function to place an order
const placeOrder = async (req, res) => {
    try {
        // Destructure order details from the request body
        const { orderId, userId, address, items, firstName, lastName, email, phone, total, paymentMethod } = req.body;

        // Validate required fields
        if (!userId || !address || !items || !total || !firstName || !lastName || !email || !phone) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create and save a new order
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

        // Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Transaction details for Onepay
        const transactionDetails = {
            amount: total,
            app_id: onepayAppId,
            reference: newOrder._id.toString(),
            customer_first_name: firstName,
            customer_last_name: lastName,
            customer_phone_number: phone,
            customer_email: email,
            transaction_redirect_url: `${frontendUrl}/verify`, // ensure this is set up correctly on the frontend
            currency: "LKR",
            // Add these lines to ensure redirection happens properly
            redirect: {
                success: `${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
                failure: `${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
            }
        };

        // Hash the transaction details
        const hashString = JSON.stringify(transactionDetails) + onepayHashSalt;
        const hash = crypto.createHash('sha256').update(hashString).digest('hex');

        // Request to Onepay API
        const response = await axios.post(`${onepayBaseUrl}${hash}`, transactionDetails, {
            headers: {
                'Authorization': onepayToken,
                'Content-Type': 'application/json'
            }
        });

        // Handle the response from Onepay
        if (response.data && response.data.data && response.data.data.gateway && response.data.data.gateway.redirect_url) {
            return res.json({ success: true, session_url: response.data.data.gateway.redirect_url });
        } else {
            return res.status(500).json({ success: false, message: "Failed to get redirect URL from Onepay" });
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



export { placeOrder, verifyOrder };













