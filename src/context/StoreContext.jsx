import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const updateItemQuantity = (id, newQuantity) => {
        console.log("Updating item", id, "to quantity", newQuantity); // Debug log
        setCartItems(prev => ({
            ...prev,
            [id]: {
                ...prev[id],
                amount: newQuantity
            }
        }));
    };

    const addToCart = async (itemId, amount, type, price, weight) => {
        const itemDetails = {
            amount,
            type,
            price,
            weight
        };

        // Create a unique key based on item ID and type
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
            await axios.post(url + "/api/cart/add", { itemId, ...itemDetails }, { headers: { Authorization: `Bearer ${token}` } });
        }
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const key in cartItems) {
            const item = cartItems[key];
            total += item.price * item.amount;
        }
        console.log("Calculated Total Amount:", total); // Debugging
        return total;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/product/list");
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + "/api/cart/get", {}, { headers: { Authorization: `Bearer ${token}` } });
            
            // Log the response to understand its structure
            console.log("Cart Data Response:", response.data);
            
            const cartData = response.data.cartData;

            if (cartData && typeof cartData === 'object' && !Array.isArray(cartData)) {
                const fetchedCartItems = Object.entries(cartData).reduce((acc, [key, item]) => {
                    acc[key] = {
                        amount: item.amount,
                        type: item.type,
                        price: item.price,
                        weight: item.weight
                    };
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

    const removeFromCart = async (cartKey) => {
        try {
            setCartItems(prev => {
                const updatedItems = { ...prev };
                delete updatedItems[cartKey];
                return updatedItems;
            });

            if (token) {
                await axios.post(url + "/api/cart/remove", { cartKey }, { headers: { Authorization: `Bearer ${token}` } });
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
        }
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"));
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        addToCart,
        removeFromCart,
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




