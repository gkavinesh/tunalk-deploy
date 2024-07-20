import React, { useEffect, useState } from 'react';
import './Add.css';
import axios from "axios"
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';


const Add = () => {

  const url = "http://localhost:4000"

  const [image,setImage] = useState(false)
  const [data,setData] = useState({
    name:"",
    description:"",
    price:"",
    category:"Fish"
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name",data.name)
    formData.append("description",data.description)
    formData.append("price",Number(data.price))
    formData.append("category",data.category)
    formData.append("image",image)
    const response = await axios.post(`${url}/api/product/add`,formData);
    if (response.data.success){
      setData({
        name:"",
        description:"",
        price:"",
        category:"Fish"
      })
      setImage(false)
      toast.success(response.data.message);

    }else {


    }
  }


  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler} >
        <div className="add-img-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt=''/>
          </label>
          <input onChange={(e)=>setImage(e.target.files[0])} type='file' id='image' hidden required/>
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here'/>
        </div>
        <div className='add-product-description flex-col'>
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Write content here"/>
        </div>
        <div className="add-category-price">
          <div className='add-category flex-col'>
            <p>Product Category</p>
            <select name="Category">
            <option value="Fish">Fish</option>
            <option value="Prawns">Prawns</option>
            <option value="Crab">Crab</option>
            <option value="Hot Deals">Hot Deals</option>
            <option value="Combo Offers">Combo Offers</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="LKR 2000"/>
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>

      </form>
      
    </div>
  )
}

export default Add
