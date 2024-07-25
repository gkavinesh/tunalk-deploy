import axios from "axios";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import crypto from "crypto";



const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";
    const onepayBaseUrl = "https://merchant-api-live-v2.onepay.lk/api/ipg/gateway/request-transaction/?hash="; // Replace with your actual onepay base URL
    const onepayAppId = "FYUZ118E58041E1505AA3";
    const onepayHashSalt = "OSFA118E58041E1505AC9";
    const onepayToken = "600a2bffbbbfa7782822add71cc80d91b4bec3ac28ee74eb0128f01c05aa569fef28ed5dddeff754.R11F118E58041E1505ADE";

    try {
        const { userId, items, amount, address } = req.body;

        if (!userId || !items || !amount || !address) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const newOrder = new orderModel({
            userId: userId,
            items: items,
            amount: amount,
            address: address
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        const line_items = items.map((item) => ({
            name: item.name,
            price: item.price * 100 * 80, // Adjust the multiplier as necessary
            quantity: item.quantity
        }));

        line_items.push({
            name: "Delivery Charges",
            price: 200 * 100 * 80, // Adjust the delivery charges as necessary
            quantity: 1
        });

        const transactionDetails = {
            amount: amount * 100 * 80, // Convert to appropriate unit
            app_id: onepayAppId,
            reference: newOrder._id.toString(),
            customer_first_name: "", // Placeholder, replace as needed
            customer_last_name: "", // Placeholder, replace as needed
            customer_phone_number: "", // Placeholder, replace as needed
            customer_email: "", // Placeholder, replace as needed
            transaction_redirect_url: `${frontend_url}/verify`,
            currency: "LKR"
        };

        const hashString = JSON.stringify(transactionDetails) + onepayHashSalt;
        const hash = crypto.createHash('sha256').update(hashString).digest('hex');

        const response = await axios.post(`${onepayBaseUrl}/single-transaction/?hash=${hash}`, transactionDetails, {
            headers: {
                'Authorization': onepayToken,
                'Content-Type': 'application/json'
            }
        });

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


