import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'


const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");
    const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <div className='navbar' id='navbar'>
        <Link to='/'><img src={assets.tuna} alt=""className='logo' /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")}className={menu === "home" ? "active" : ""}>Home</Link>
            <a href='#explore-menu' onClick={()=>setMenu("products")} className={menu === "products" ? "active" : ""}>Products</a>
            <a href='#about' onClick={()=>setMenu("about")} className={menu === "about" ? "active" : ""}>About us</a>
            <a href='#delivery-areas' onClick={()=>setMenu("delivery areas")} className={menu === "delivery areas" ? "active" : ""}>Delivery areas</a>
            <a href='#footer' onClick={()=>setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</a>
        </ul>
        <div className="navbar-right">
            <div className="navbar-search-icon">
                <Link to="/cart"><img src={assets.basket_icon} alt=''/></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            <button onClick={()=> setShowLogin(true)} className='navbar-button'>
                Sign in
            </button>
        </div>
    </div>
  )
}

export default Navbar
