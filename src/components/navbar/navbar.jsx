import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { FaBars, FaTimes } from 'react-icons/fa';


const Navbar = ({ setShowLogin }) => {

    const [menu, setMenu] = useState("home");
    const { getTotalCartAmount } = useContext(StoreContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='back'>
            <div className='navbar' id='navbar'>
                <a href="/">
                    <img src={assets.white} alt="" className="logo" style={{ width: '250px', height: 'auto' }} />
                </a>


                <div className="navbar-right">
                    <ul className="navbar-menu">
                        <a href='#products' onClick={() => setMenu("products")} className={menu === "products" ? "active" : ""}>Products</a>
                        <a href='#about' onClick={() => setMenu("about")} className={menu === "about" ? "active" : ""}>About </a>
                        <a href='#footer' onClick={() => setMenu("contact")} className={menu === "contact" ? "active" : ""}>Contact</a>
                    </ul>
                    <div className="navbar-search-icon">
                        <Link to="/cart"><img src={assets.basket_icon} alt='' /></Link>
                        <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                    </div>
                    <button onClick={() => setShowLogin(true)} className='navbar-button'>
                        Sign in
                    </button>
                    <div className='navbar-hamburger' onClick={toggleSidebar}>
                        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </div>
                </div>
            </div>
            <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <ul>
                    <li><a href='#products'>Products</a></li>
                    <li><a href='#about'>About</a></li>
                    <li><a href='#footer'>Contact</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
