import React, { useState } from 'react';
import './Add.css';
import axios from "axios";
import { assets } from '../../assets/assets';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';

const Add = ({ url }) => {
  const [images, setImages] = useState([]);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Fish"
  });
  const [types, setTypes] = useState([{ type: "curry cut", price: "" }]);

  const typeOptions = [
    "Curry cut",
    "Cleaned",
    "Steaks",
    "Peeled",
    "Tail on",
    "Ring cut",
    "Fillet"
  ];

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
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
    setTypes([...types, { type: "curry cut", price: "" }]);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("types", JSON.stringify(types));

    // Append all images to formData
    images.forEach(image => {
      formData.append("images", image);
    });

    try {
      const response = await axios.post(`${url}/api/product/add`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          category: "Fish"
        });
        setImages([]);
        setTypes([{ type: "curry cut", price: "" }]);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Images - <b> Add the main thumbnail image first and then the subsidiary images</b></p>
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
                <img src={assets.upload_area} alt='Upload area' />
              )}
            </div>
          </label>
          <input
            onChange={onImageChange}
            type='file'
            id='images'
            hidden
            multiple
            required
          />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            name='name'
            placeholder='Name'
          />
        </div>
        <div className='add-product-description flex-col'>
          <p>Net Weight : <b>Use this format - Net Weight : XXXgms to XXXgms</b></p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows="2"
            placeholder="Type in the net weight in the appropriate format here"
          />
        </div>
        <div className="add-category-price">
          <div className='add-category flex-col'>
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
        </div>

        <div className="add-types">
          <p>Product Types and Prices</p>
          {types.map((type, index) => (
            <div key={index} className="type-price-row">
              <select
                name="type"
                value={type.type}
                onChange={event => onTypeChange(index, event)}
              >
                {typeOptions.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
              <input
                type="number"
                name="price"
                value={type.price}
                onChange={event => onTypeChange(index, event)}
                placeholder="LKR 2000"
              />
            </div>
          ))}
          <button type="button" onClick={addTypeField} className="add-type-btn">Add Type</button>
        </div>

        <button type="submit" className="add-btn">ADD</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Add;





