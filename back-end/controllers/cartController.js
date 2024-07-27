import userModel from "../models/userModel.js";

// Add items to user cart
const addToCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;
        const quantity = req.body.quantity || 1; // Default to 1 if quantity is not provided

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist

        if (!cartData[itemId]) {
            cartData[itemId] = quantity;
        } else {
            cartData[itemId] += quantity;
        }

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Added To Cart" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        const userId = req.body.userId;
        const itemId = req.body.itemId;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist

        if (cartData[itemId]) {
            cartData[itemId] -= 1;

            // Remove the item if the quantity reaches zero
            if (cartData[itemId] <= 0) {
                delete cartData[itemId];
            }

            await userModel.findByIdAndUpdate(userId, { cartData });
            res.json({ success: true, message: "Removed from cart" });
        } else {
            res.json({ success: false, message: "Item not found in cart" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Fetch user cart data
const getCart = async (req, res) => {
    try {
        const userId = req.body.userId;

        let userData = await userModel.findById(userId);
        let cartData = userData.cartData || {}; // Initialize cartData if it doesn't exist

        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

// Clear user cart
const clearCart = async (req, res) => {
    try {
        const userId = req.body.userId;

        let cartData = {}; // Clear the cart

        await userModel.findByIdAndUpdate(userId, { cartData });
        res.json({ success: true, message: "Cart Cleared" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export { addToCart, removeFromCart, getCart, clearCart };

