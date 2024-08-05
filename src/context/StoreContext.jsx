import React, { createContext, useEffect, useState } from "react";

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
  //conslo.log

  // Function to save cart items to local storage
  const saveCartToLocalStorage = (cartItems) => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  // Function to update item quantity in cart
  const updateItemQuantity = async (cartKey, newQuantity) => {
    const [itemId, type] = cartKey.split("-");

    // Update quantity locally
    setCartItems((prev) => {
      const updatedCartItems = {
        ...prev,
        [cartKey]: {
          ...prev[cartKey],
          amount: newQuantity,
        },
      };

      // Save updated cart to local storage
      saveCartToLocalStorage(updatedCartItems);

      return updatedCartItems;
    });

    // Sync the quantity change with the server
    if (token) {
      try {
        const response = await fetch(`${url}/api/cart/update`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: getUserIdFromToken(token),
            itemId,
            quantity: newQuantity
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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
      weight,
    };

    const cartKey = `${itemId}-${type}`;

    setCartItems((prev) => {
      const updatedCartItems = !prev[cartKey]
        ? { ...prev, [cartKey]: itemDetails }
        : {
            ...prev,
            [cartKey]: {
              ...prev[cartKey],
              amount: prev[cartKey].amount + amount,
            },
          };

      // Save updated cart to local storage
      saveCartToLocalStorage(updatedCartItems);

      return updatedCartItems;
    });

    if (token) {
      try {
        const response = await fetch(`${url}/api/cart/add`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: getUserIdFromToken(token),
            itemId,
            quantity: amount
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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
      const response = await fetch(`${url}/api/product/list`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setFoodList(data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  // Function to load cart data from the server
  const loadCartData = async (token) => {
    try {
      const response = await fetch(`${url}/api/cart/get`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: getUserIdFromToken(token) })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const cartData = data.cartData;

      if (cartData && typeof cartData === "object" && !Array.isArray(cartData)) {
        const fetchedCartItems = Object.entries(cartData).reduce((acc, [key, amount]) => {
          const foodItem = food_list.find((food) => food._id === key.split("-")[0]);
          if (foodItem) {
            acc[key] = {
              amount: amount,
              type: foodItem.type || "",
              price: foodItem.price || 0,
              weight: foodItem.weight || 0,
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
      const [itemId] = cartKey.split("-");
      setCartItems((prev) => {
        const updatedItems = { ...prev };
        delete updatedItems[cartKey];

        // Save updated cart to local storage
        saveCartToLocalStorage(updatedItems);

        return updatedItems;
      });

      if (token) {
        const response = await fetch(`${url}/api/cart/remove`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            userId: getUserIdFromToken(token),
            itemId
          })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Function to clear all items from cart
  const clearCart = async () => {
    try {
      setCartItems({});
      localStorage.removeItem("cartItems"); // Clear cart from local storage
      if (token) {
        const response = await fetch(`${url}/api/cart/clear`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userId: getUserIdFromToken(token) })
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  // Load cart items from local storage if they exist
  const loadCartFromLocalStorage = () => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
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
      loadCartFromLocalStorage(); // Load cart items from local storage
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
    updateItemQuantity,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;














