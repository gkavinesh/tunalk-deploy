import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';

const Add = () => {

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
            <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$20"/>
          </div>
        </div>
        <button type="submit" className="add-btn">ADD</button>

      </form>
      
    </div>
  )
}

export default Add