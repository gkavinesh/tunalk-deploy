import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar-2'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon} alt=''/>
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.list_icon} alt=''/>
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon} alt=''/>
                <p>Orders</p>
            </NavLink>
            <NavLink to='/payment' className="sidebar-option">
                <img src={assets.payment} alt=''/>
                <p>Bank transfers</p>
            </NavLink>
            <NavLink to='/kanban' className="sidebar-option">
                <img src={assets.order_icon} alt=''/>
                <p>Kanban</p>
            </NavLink>

        </div>
      
    </div>
  )
}

export default Sidebar
