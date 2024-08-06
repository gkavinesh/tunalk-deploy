import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar-2'>
        <div className="sidebar-options">
        <img className='logo' src={assets.logo} alt='logo'/>
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt=''/>
                <p>Add Products</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.list_icon} alt=''/>
                <p>Products</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt=''/>
                <p>Orders</p>
            </NavLink>
            <NavLink to='/payment' className="sidebar-option">
                <img src={assets.payment} alt=''/>
                <p>Payments</p>
            </NavLink>
            <NavLink to='/checkout' className="sidebar-option">
                <img src={assets.cart} alt=''/>
                <p>Manual Checkout</p>
            </NavLink>
        </div>
      
    </div>
  )
}

export default Sidebar
