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
    
        if (!cartItems[itemId]) {
            setCartItems(prev => ({ ...prev, [itemId]: itemDetails }));
        } else {
            setCartItems(prev => ({
                ...prev,
                [itemId]: {
                    ...prev[itemId],
                    amount: prev[itemId].amount + amount
                }
            }));
        }
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId, ...itemDetails }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems(prev => {
            const updatedItems = { ...prev };
            delete updatedItems[itemId];
            return updatedItems;
        });

        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { Authorization: `Bearer ${token}` } });
        }
    };

    const getTotalCartAmount = () => {
        return Object.keys(cartItems).reduce((total, itemId) => {
            const item = food_list.find(item => item._id === itemId);
            if (item) {
                const { amount, price } = cartItems[itemId];
                return total + (price * amount);
            }
            return total;
        }, 0);
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/product/list");
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
        setCartItems(response.data.cartData);
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
        updateItemQuantity // Include this in the context
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;

