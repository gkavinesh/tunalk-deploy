import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    // Helper function to extract user ID from token
    const getUserIdFromToken = (token) => {
        try {
            // Decode the JWT token to get the userId
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.userId;
        } catch (error) {
            console.error("Invalid token:", error);
            return null;
        }
    };

    // Function to update item quantity in cart
    const updateItemQuantity = async (cartKey, newQuantity) => {
        const [itemId, type] = cartKey.split('-');

        // Update quantity locally
        setCartItems(prev => ({
            ...prev,
            [cartKey]: {
                ...prev[cartKey],
                amount: newQuantity
            }
        }));

        // Sync the quantity change with the server
        if (token) {
            try {
                await axios.post(url + "/api/cart/update", { userId: getUserIdFromToken(token), itemId, quantity: newQuantity }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                console.error("Error updating item quantity:", error);
            }
        }
    };

    // Function to add item to cart
    const addToCart = async (itemId, amount, type, price, weight) => {
        const itemDetails = {
            amount,
            type,
            price,
            weight
        };

        const cartKey = `${itemId}-${type}`;

        if (!cartItems[cartKey]) {
            setCartItems(prev => ({ ...prev, [cartKey]: itemDetails }));
        } else {
            setCartItems(prev => ({
                ...prev,
                [cartKey]: {
                    ...prev[cartKey],
                    amount: prev[cartKey].amount + amount
                }
            }));
        }

        if (token) {
            try {
                await axios.post(url + "/api/cart/add", { userId: getUserIdFromToken(token), itemId, quantity: amount }, { headers: { Authorization: `Bearer ${token}` } });
            } catch (error) {
                console.error("Error adding item to cart:", error);
            }
        }
    };

    // Function to get total cart amount
    const getTotalCartAmount = () => {
        let total = 0;
        for (const key in cartItems) {
            const item = cartItems[key];
            total += item.price * item.amount;
        }
        return total;
    };

    // Function to fetch the food list
    const fetchFoodList = async () => {
        try {
            const response = await axios.get(url + "/api/product/list");
            setFoodList(response.data.data);
        } catch (error) {
            console.error("Error fetching food list:", error);
        }
    };

    // Function to load cart data from the server
    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", { userId: getUserIdFromToken(token) }, { headers: { Authorization: `Bearer ${token}` } });
            const cartData = response.data.cartData;

            if (cartData && typeof cartData === 'object' && !Array.isArray(cartData)) {
                const fetchedCartItems = Object.entries(cartData).reduce((acc, [key, amount]) => {
                    const foodItem = food_list.find(food => food._id === key.split('-')[0]);
                    if (foodItem) {
                        acc[key] = {
                            amount: amount,
                            type: foodItem.type || '',
                            price: foodItem.price || 0,
                            weight: foodItem.weight || 0
                        };
                    }
                    return acc;
                }, {});
                setCartItems(fetchedCartItems);
            } else {
                console.error("cartData is not an object:", cartData);
            }
        } catch (error) {
            console.error("Error loading cart data:", error);
        }
    };

    // Function to remove item from cart
    const removeFromCart = async (cartKey) => {
        try {
            const [itemId] = cartKey.split('-');
            setCartItems(prev => {
                const updatedItems = { ...prev };
                delete updatedItems[cartKey];
                return updatedItems;
            });

            if (token) {
                await axios.post(url + "/api/cart/remove", { userId: getUserIdFromToken(token), itemId }, { headers: { Authorization: `Bearer ${token}` } });
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    // Function to clear all items from cart
    const clearCart = async () => {
        try {
            setCartItems({});
            if (token) {
                await axios.post(url + "/api/cart/clear", { userId: getUserIdFromToken(token) }, { headers: { Authorization: `Bearer ${token}` } });
            }
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    // Load data on component mount
    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const savedToken = localStorage.getItem("token");
            if (savedToken) {
                setToken(savedToken);
                await loadCartData(savedToken);
            }
        }
        loadData();
    }, [token]); // Re-run when the token changes

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        updateItemQuantity
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;










