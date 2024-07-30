import React, { useContext, useState } from 'react';
import './navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { MotionConfig, motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import Preloader from '../preloadersub/preloader';

const AnimatedHamburgerButton = ({ isActive }) => {
    return (
        <MotionConfig
            transition={{
                duration: 0.5,
                ease: 'easeInOut',
            }}
        >
            <motion.button
                initial={false}
                animate={isActive ? 'open' : 'closed'}
                className="relative h-12 w-12 rounded-full bg-white/0 transition-colors hover:bg-white/20"
            >
                <motion.span
                    variants={VARIANTS.top}
                    className="absolute h-0.5 w-6 bg-white"
                    style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
                />
                <motion.span
                    variants={VARIANTS.middle}
                    className="absolute h-0.5 w-6 bg-white"
                    style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
                />
                <motion.span
                    variants={VARIANTS.bottom}
                    className="absolute h-0.5 w-3 bg-white"
                    style={{
                        x: '-50%',
                        y: '50%',
                        bottom: '35%',
                        left: 'calc(50% + 5px)',
                    }}
                />
            </motion.button>
        </MotionConfig>
    );
};

const VARIANTS = {
    top: {
        open: {
            rotate: ['0deg', '0deg', '45deg'],
            top: ['35%', '50%', '50%'],
        },
        closed: {
            rotate: ['45deg', '0deg', '0deg'],
            top: ['50%', '50%', '35%'],
        },
    },
    middle: {
        open: {
            rotate: ['0deg', '0deg', '-45deg'],
        },
        closed: {
            rotate: ['-45deg', '0deg', '0deg'],
        },
    },
    bottom: {
        open: {
            rotate: ['0deg', '0deg', '45deg'],
            bottom: ['35%', '50%', '50%'],
            left: '50%',
        },
        closed: {
            rotate: ['45deg', '0deg', '0deg'],
            bottom: ['50%', '50%', '35%'],
            left: 'calc(50% + 5px)',
        },
    },
};

const Navbar = ({ setShowLogin }) => {
    const { getTotalCartAmount, token, setToken, clearCart } = useContext(StoreContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state

    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true); // Show preloader

        setTimeout(async () => {
            localStorage.removeItem('token');
            setToken('');
            await clearCart(); // Clear cart items on logout
            setLoading(false); // Hide preloader
            navigate('/');
        }, 2000); // Preloader duration set to 2 seconds
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="navbar" id="navbar">
            <div className="nav-content">
                <a href="/">
                    <img src={assets.white} alt="" className="logo" />
                </a>
                <div className="navbar-right">
                    {!token ? (
                        <button
                            onClick={() => setShowLogin(true)}
                            className="transition duration-700 ease-in-out navbar-button"
                        >
                            <span className="hide-text">Sign in</span>
                        </button>
                    ) : (
                        <div className="navbar-profile">
                            <img src={assets.profile_icon} alt="" />
                            <ul className="nav-profile-dropdown">
                            <Link to="/myorders">
                                <li>
                                    <img src={assets.bag_icon} />
                                    <p>Orders</p>
                                </li>
                                </Link>
                                <hr></hr>
                                <li onClick={logout}>
                                    <img src={assets.logout_icon} />
                                    <p>Logout</p>
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="navbar-search-icon">
                        <Link to="/cart" className="cart-link">
                            <img src={assets.basket_icon} alt="" />
                        </Link>
                        <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
                    </div>
                    <div className="navbar-hamburger" onClick={toggleSidebar}>
                        <AnimatedHamburgerButton isActive={isSidebarOpen} />
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.5 }}
                        className="bg-gray-100 sidebar"
                    >
                        <div className="sidebar-header">
                            <div className="flex justify-between items-center">
                                <div className="sidebarlogo">
                                    <img src={assets.tunamain} alt=''/>
                                </div>
                            </div>
                            <button className="sidebar-close" onClick={toggleSidebar}>
                                <MdClose /> 
                            </button>
                        </div>
                        <ul className="menu-list p-4">
                            <li className="icons">
                                <Link to="/">Home</Link>
                            </li>
                            <br />
                            <li className="icons">
                                <Link to="/fish">Products</Link>
                            </li>
                            <br />
                            <li className="icons">
                                <Link to="/delivery-area">Delivery Areas</Link>
                            </li>
                            <br />
                            <li className="icons">
                                <Link to="/faq">FAQ</Link>
                            </li>
                        </ul>
                        <div className="sidebar-bottom">
                            <a href="https://ibb.co/Pc4sjdb" className="call-button" target="_blank" rel="noopener noreferrer">Download our App</a>
                            <a href="tel:077-529-1291" className="call-button-2" target="_blank" rel="noopener noreferrer">Contact Us</a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {loading && <Preloader />}
        </div>
    );
};

export default Navbar;











