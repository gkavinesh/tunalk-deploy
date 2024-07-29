import React, { useState, useEffect } from 'react';
import './List.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = ({ url }) => {
  const [list, setList] = useState([]);
  const [editing, setEditing] = useState(null);
  const [updatedPrices, setUpdatedPrices] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/product/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching product list");
      }
    } catch (error) {
      toast.error("Error fetching product list");
    }
  };

  const removeProduct = async (productId) => {
    try {
      const response = await axios.post(`${url}/api/product/remove`, { id: productId });
      if (response.data.success) {
        await fetchList();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Error removing product");
      }
    } catch (error) {
      toast.error("Error removing product");
    }
  };

  const startEditing = (product) => {
    setEditing(product._id);
    setUpdatedPrices(product.types.map(type => ({ type: type.type, price: type.price })));
  };

  const handlePriceChange = (index, newPrice) => {
    const newPrices = [...updatedPrices];
    const price = parseFloat(newPrice); // Convert to number
    if (!isNaN(price)) {
      newPrices[index].price = price;
      setUpdatedPrices(newPrices);
    }
  };

  const savePrices = async (productId) => {
    try {
      const response = await axios.put(`${url}/api/product/update-price`, {
        id: productId,
        types: updatedPrices
      });
      if (response.data.success) {
        setEditing(null);
        await fetchList();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Error updating prices");
      }
    } catch (error) {
      toast.error("Error updating prices");
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






