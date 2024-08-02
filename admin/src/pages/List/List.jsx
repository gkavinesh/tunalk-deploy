import React, { useState, useEffect } from 'react';
import './List.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [updatedPrices, setUpdatedPrices] = useState([]);

  const fetchList = async () => {
    try {
      console.log(`Fetching product list from ${url}/api/product/list`);
      const response = await fetch(`${url}/api/product/list`);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Product list data:', data);

      if (data.success) {
        setList(data.data);
      } else {
        toast.error("Error fetching product list: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error in fetchList:", error);
      toast.error("Error fetching product list: " + error.message);
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await fetch(`${url}/api/product/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: productId }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Remove product response:', data);

      if (data.success) {
        await fetchList();
        toast.success(data.message);
      } else {
        toast.error(data.message || "Error removing product");
      }
    } catch (error) {
      console.error("Error in removeProduct:", error);
      toast.error("Error removing product: " + error.message);
    }
  };

  const startEditing = (product) => {
    setEditing(product._id);
    setUpdatedPrices(product.types.map(type => ({ type: type.type, price: String(type.price) })));
  };

  const handlePriceChange = (index, newPrice) => {
    const newPrices = [...updatedPrices];
    if (newPrice === '' || !isNaN(newPrice)) {
      newPrices[index].price = newPrice; // Store as string
      setUpdatedPrices(newPrices);
    }
  };

  const savePrices = async (productId) => {
    try {
      const convertedPrices = updatedPrices.map((type) => ({
        type: type.type,
        price: parseFloat(type.price) || 0, // Convert to number
      }));

      const response = await fetch(`${url}/api/product/update-price`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: productId,
          types: convertedPrices,
        }),
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Save prices response:', data);

      if (data.success) {
        setEditing(null);
        await fetchList();
        toast.success(data.message);
      } else {
        toast.error(data.message || "Error updating prices");
      }
    } catch (error) {
      console.error("Error in savePrices:", error);
      toast.error("Error updating prices: " + error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <h2 className="header">Product List</h2>
      <div className="table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Types and Prices</th>
              <th>Edit</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <React.Fragment key={item._id}>
                <tr>
                  <td>
                    <img src={`${url}/images/${item.images[0]}`} alt={item.name} className="product-image" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>
                    {item._id === editing ? (
                      updatedPrices.map((type, typeIndex) => (
                        <div key={typeIndex} className='type-price'>
                          <p>Type: {type.type}</p>
                          <input
                            type="number"
                            value={type.price}
                            onChange={(e) => handlePriceChange(typeIndex, e.target.value)}
                          />
                        </div>
                      ))
                    ) : (
                      item.types.map((type, typeIndex) => (
                        <div key={typeIndex} className='type-price'>
                          <p>Type: {type.type}</p>
                          <p>Price: රු {type.price}</p>
                        </div>
                      ))
                    )}
                  </td>
                  <td>
                    {item._id === editing ? (
                      <button className="save-button" onClick={() => savePrices(item._id)}>Save</button>
                    ) : (
                      <button className="edit-button" onClick={() => startEditing(item)}>Edit Prices</button>
                    )}
                  </td>
                  <td>
                    {item._id !== editing && (
                      <button className="remove-button" onClick={() => removeProduct(item._id)}>❌</button>
                    )}
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default List;








