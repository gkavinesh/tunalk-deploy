// src/pages/Add/Add.jsx

import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Add = ({ url }) => {
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    name: '',
    description: '',
    category: 'Fish',
  });
  const [types, setTypes] = useState([{ type: 'Curry cut', price: '' }]);

  // Get the location object from react-router-dom
  const location = useLocation();

  // Show a success toast message if provided in the location state
  useEffect(() => {
    if (location.state && location.state.message) {
      toast.success(location.state.message);
    }
  }, [location]);

  const typeOptions = [
    'Curry cut',
    'Cleaned',
    'Steaks',
    'Peeled',
    'Tail on',
    'Ring cut',
    'Fillet',
    'Frozen',
  ];

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onImageChange = (event) => {
    setImages([...event.target.files]);
  };

  const onTypeChange = (index, event) => {
    const updatedTypes = types.map((type, i) =>
      i === index ? { ...type, [event.target.name]: event.target.value } : type
    );
    setTypes(updatedTypes);
  };

  const addTypeField = () => {
    setTypes([...types, { type: 'Curry cut', price: '' }]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('types', JSON.stringify(types));

    // Append all images to formData
    images.forEach((image) => {
      formData.append('images', image);
    });

    try {
      const response = await fetch(`${url}/api/product/add`, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        if (result.success) {
          setData({
            name: '',
            description: '',
            category: 'Fish',
          });
          setImages([]);
          setTypes([{ type: 'Curry cut', price: '' }]);
          toast.success(result.message);
        } else {
          toast.error(result.message);
        }
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="add">
      <ToastContainer
        position="bottom-right" // Set the position to bottom-right
        autoClose={5000} // Adjust the duration as needed
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2>Add Products</h2>
      <br />
      <form className="add-form" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>
            Upload Images - Add the main thumbnail image first and then the
            subsidiary images
          </p>
          <label htmlFor="images">
            <div className="image-previews">
              {images.length > 0 ? (
                Array.from(images).map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`preview-${index}`}
                    className="image-preview"
                  />
                ))
              ) : (
                <img src={assets.upload_area} alt="Upload area" />
              )}
            </div>
          </label>
          <input
            onChange={onImageChange}
            type="file"
            id="images"
            hidden
            multiple
            required
          />
        </div>

        <div className="form-grid">
          <div className="left-column">
            <div className="add-product-name flex-col">
              <p>Product Name</p>
              <input
                onChange={onChangeHandler}
                value={data.name}
                type="text"
                name="name"
                placeholder="Name"
              />
            </div>
            <div className="add-product-description flex-col">
              <p>Net Weight : Use this format - Net Weight : XXXgms to XXXgms</p>
              <textarea
                onChange={onChangeHandler}
                value={data.description}
                name="description"
                rows="4"
                placeholder="Type in the net weight in the appropriate format here"
              />
            </div>
          </div>

          <div className="right-column">
            <div className="add-category flex-col">
              <p>Product Category</p>
              <select
                name="category"
                onChange={onChangeHandler}
                value={data.category}
              >
                <option value="Fish">Fish</option>
                <option value="Prawns">Prawns</option>
                <option value="Crab">Crab</option>
                <option value="Hot Deals">Hot Deals</option>
              </select>
            </div>

            <div className="add-types flex-col">
              <p>Product Types and Prices</p>
              {types.map((type, index) => (
                <div key={index} className="type-price-row">
                  <select
                    name="type"
                    value={type.type}
                    className="cut-type"
                    onChange={(event) => onTypeChange(index, event)}
                  >
                    {typeOptions.map((option, i) => (
                      <option key={i} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    name="price"
                    value={type.price}
                    onChange={(event) => onTypeChange(index, event)}
                    placeholder="Price"
                  />
                </div>
              ))}
              <button type="button" className="add-type-button-2" onClick={addTypeField}>
                Add Type
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="add-product-button-2">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Add;









