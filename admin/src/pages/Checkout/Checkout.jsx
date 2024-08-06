import React, { useState, useEffect } from "react";
import "./Checkout.css";

const generateOrderId = () => {
  return `ORD-${Math.floor(Math.random() * 1000000)}`;
};

const generateUserId = () => {
  return [...Array(24)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

const Checkout = ({ url }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [weight, setWeight] = useState("0.5");
  const [quantity, setQuantity] = useState(1);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [userId, setUserId] = useState(generateUserId());
  const [address, setAddress] = useState("");
  const [addressType, setAddressType] = useState("Home");
  const [postcode, setPostcode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bankTransfer");
  const [manualWeight, setManualWeight] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log(`Fetching product list from ${url}/api/product/list`);
        const response = await fetch(`${url}/api/product/list`);
        const data = await response.json();

        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [url]);

  const addToCheckout = () => {
    const actualWeight = manualWeight ? parseFloat(manualWeight) : parseFloat(weight);
  
    if (selectedProduct && selectedType && actualWeight && quantity) {
      // Calculate price per kg from price per 0.5 kg
      const pricePerKg = selectedType.price * 2; // because price is for 0.5 kg
  
      const item = {
        itemId: selectedProduct._id,
        name: selectedProduct.name,
        type: selectedType.type,
        price: pricePerKg,
        weight: actualWeight,
        quantity: parseInt(quantity),
        totalPrice: pricePerKg * actualWeight * parseInt(quantity),
      };
  
      setCheckoutItems([...checkoutItems, item]);
      setSelectedProduct(null);
      setSelectedType(null);
      setWeight("0.5");
      setManualWeight("");
      setQuantity(1);
    } else {
      alert("Please select a product, type, enter a weight, and quantity.");
    }
  };

  const placeOrder = async () => {
    if (
      !address ||
      !postcode ||
      !checkoutItems.length ||
      !firstName ||
      !lastName ||
      !email ||
      !phone
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    const orderData = {
      orderId: generateOrderId(),
      userId,
      address: {
        address,
        type: addressType,
        postcode,
      },
      items: checkoutItems.map((item) => ({
        itemId: item.itemId,
        name: item.name,
        type: item.type,
        price: item.price,
        weight: item.weight,
        amount: item.quantity,
      })),
      total: checkoutItems.reduce((acc, item) => acc + item.totalPrice, 0),
      firstName,
      lastName,
      email,
      phone,
      paymentMethod,
    };

    try {
      console.log(`Placing order to ${url}/api/orders/place`);
      const response = await fetch(`${url}/api/orders/place`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        alert("Order placed successfully!");
        setCheckoutItems([]);
      } else {
        alert("Error placing order: " + result.message);
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Error placing order");
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-container">
        <div className="user-info">
        <h2>Customer Information</h2>
        <br></br>
          <div className="input-row">
            <div className="input-group">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
              />
            </div>
            <div className="input-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="input-group">
              <label>Phone:</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
              />
            </div>
          </div>
          <div className="input-group">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </div>
          <br></br>
          <div className="input-row">
            <div className="input-group">
              <label>Address Type:</label>
              <select
                value={addressType}
                onChange={(e) => setAddressType(e.target.value)}
              >
                <option value="Home">Home</option>
                <option value="Office">Office</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="input-group">
              <label>Postcode:</label>
              <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Postcode"
              />
            </div>
          </div>
        </div>

        <div className="checkout-selection">
        <h2>Product Selection</h2>
        <br></br>
          <div className="input-row">
            <div className="input-group">
              <label>Product:</label>
              <select
                value={selectedProduct ? selectedProduct._id : ""}
                onChange={(e) => {
                  const selected = products.find(
                    (product) => product._id === e.target.value
                  );
                  setSelectedProduct(selected);
                  setSelectedType(null);
                }}
              >
                <option value="" disabled>Select a product</option>
                {products.map((product) => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedProduct && (
              <div className="input-group">
                <label>Type:</label>
                <select
                  value={selectedType ? selectedType.type : ""}
                  onChange={(e) => {
                    const selected = selectedProduct.types.find(
                      (type) => type.type === e.target.value
                    );
                    setSelectedType(selected);
                  }}
                >
                  <option value="" disabled>Select a type</option>
                  {selectedProduct.types.map((type) => (
                    <option key={type.type} value={type.type}>
                      {type.type} - රු{type.price.toFixed(2)} (per 500g)
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="input-row">
          <div className="input-group">
              <label>Weight (kg):</label>
              <select value={weight} onChange={(e) => {
                setWeight(e.target.value);
                setManualWeight(""); // Reset manual weight input
              }}>
                <option value="0.5">0.5 kg</option>
                <option value="1">1 kg</option>
                <option value="1.5">1.5 kg</option>
                <option value="2">2 kg</option>
                <option value="2.5">2.5 kg</option>
                <option value="3">3 kg</option>
                <option value="manual">Enter manually</option>
              </select>
              {weight === "manual" && (
                <input
                  type="number"
                  min="0.5"
                  step="0.5"
                  value={manualWeight}
                  onChange={(e) => setManualWeight(e.target.value)}
                  placeholder="Enter weight"
                />
              )}
            </div>
            <div className="input-group">
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
              />
            </div>
          </div>
          <button className="btn add-to-checkout-btn" onClick={addToCheckout}>
            Add to Checkout
          </button>
      </div>
      <div className="input-group-place">
            <label>Payment Method:</label>
            <br></br>
            <br></br>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="hot"
            >
              <option value="bankTransfer">Bank Transfer</option>
              <option value="cash">Cash on Delivery</option>
            </select>
            <br></br>
            <br></br>
            <button className="btn place-order-btn" onClick={placeOrder}>
            Place Order
          </button>
          </div>
          
        </div>
        <div className="checkout-summary">
            <h2>Order Summary</h2>
            <br></br>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Type</th>
                  <th>Weight</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {checkoutItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.type}</td>
                    <td>{item.weight} kg</td>
                    <td>{item.quantity}</td>
                    <td>රු  {item.price.toFixed(2)}</td>
                    <td>රු {item.totalPrice.toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5"><b>Total Amount:</b></td>
                  <td>රු {checkoutItems.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
    </div>
  );
};

export default Checkout;











