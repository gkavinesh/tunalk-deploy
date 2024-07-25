import React, { useContext } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,product_list,cartItems,url} = useContext(StoreContext);
  

  return (
    <form  className="place-order">
      <div className="place-order-left">
        <p className='title'> Delivery Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' />
          <input type="text" placeholder='Last Name' />
        </div>
        <input type="text" placeholder='Email Address' />
        <input type="text" placeholder='Street' />
        <div className="multi-fields">
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <input type='text' placeholder='Phone'/>
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>LKR {getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>LKR {getTotalCartAmount()===0?0:200}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>LKR {getTotalCartAmount()===0?0:getTotalCartAmount()+ 200}</b>
            </div>
          </div>
          <button>PROCEED TO PAYMENT </button>
        </div>

      </div>
    </form>
  )
}

export default PlaceOrder
