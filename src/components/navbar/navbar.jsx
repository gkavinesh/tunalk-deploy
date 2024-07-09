import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { FaBars, FaTimes, FaUser, FaShoppingCart, FaSearch } from 'react-icons/fa';

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
                    <img src={assets.white} alt="" className="logo" style={{ width: '230px', height: 'auto' }} />
                </a>

                <div className="navbar-right">
                    <button onClick={() => setShowLogin(true)} className='navbar-button-2'>
                        <FaSearch style={{ marginRight: '10px', marginTop: '4px' }} />
                        Search
                    </button>
                    <button onClick={() => setShowLogin(true)} className='navbar-button'>
                        <FaUser style={{ marginRight: '10px', marginTop: '4px' }} />
                        Sign in
                    </button>
                    <div className="navbar-search-icon">
                        <Link to="/cart" className="navbar-cart-link">
                            <FaShoppingCart size={24} />
                            <span className="navbar-cart-text">Cart</span>
                            <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                        </Link>
                    </div>
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

