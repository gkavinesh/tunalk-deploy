import axios from "axios";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";

const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    const onepayBaseUrl = "https://merchant-api-live-v2.onepay.lk/api/ipg/gateway/request-transaction/?hash=";
    const onepayAppId = "FYUZ118E58041E1505AA3";
    const onepayHashSalt = "OSFA118E58041E1505AC9";
    const onepayToken = "600a2bffbbbfa7782822add71cc80d91b4bec3ac28ee74eb0128f01c05aa569fef28ed5dddeff754.R11F118E58041E1505ADE";

    try {
        const { userId, address, items, firstName, lastName, email, phone, total } = req.body;

        if (!userId || !address || !items || !total) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        // Create a new order
        const newOrder = new orderModel({
            userId: userId,
            address: address,
            items: items,
            total: total,
            firstName:firstName,
            lastName:lastName,
            email:email,
            phone:phone
        });

        // Save the new order
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Transaction details for Onepay
        const transactionDetails = {
            amount: total, // Total amount including delivery fee
            app_id: onepayAppId,
            reference: newOrder._id.toString(),
            customer_first_name: firstName,
            customer_last_name: lastName,
            customer_phone_number: phone,
            customer_email: email,
            transaction_redirect_url: `${frontend_url}/verify`, // Ensure this matches your frontend route
            currency: "LKR"
        };

        // Hash the transaction details
        const hashString = JSON.stringify(transactionDetails) + onepayHashSalt;
        const hash = crypto.createHash('sha256').update(hashString).digest('hex');

        // Request to Onepay API
        const response = await axios.get(`${onepayBaseUrl}${hash}`, {
            headers: {
                'Authorization': onepayToken,
                'Content-Type': 'application/json'
            }
        });

        // Handle response from Onepay API
        if (response.data.status === 1000) {
            res.json({ success: true, session_url: response.data.data.gateway.redirect_url });
        } else {
            throw new Error(response.data.message);
        }

    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { placeOrder };










