import React, { useContext, useState } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
import { MotionConfig, motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';


const AnimatedHamburgerButton = () => {
    const [active, setActive] = useState(false);
    return (
        <MotionConfig
            transition={{
                duration: 0.5,
                ease: "easeInOut",
            }}
        >
            <motion.button
                initial={false}
                animate={active ? "open" : "closed"}
                onClick={() => setActive((pv) => !pv)}
                className="relative h-12 w-12 rounded-full bg-white/0 transition-colors hover:bg-white/20"
            >
                <motion.span
                    variants={VARIANTS.top}
                    className="absolute h-0.5 w-6 bg-white"
                    style={{ y: "-50%", left: "50%", x: "-50%", top: "35%" }}
                />
                <motion.span
                    variants={VARIANTS.middle}
                    className="absolute h-0.5 w-6 bg-white"
                    style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
                />
                <motion.span
                    variants={VARIANTS.bottom}
                    className="absolute h-0.5 w-3 bg-white"
                    style={{
                        x: "-50%",
                        y: "50%",
                        bottom: "35%",
                        left: "calc(50% + 5px)",
                    }}
                />
            </motion.button>
        </MotionConfig>
    );
};

const VARIANTS = {
    top: {
        open: {
            rotate: ["0deg", "0deg", "45deg"],
            top: ["35%", "50%", "50%"],
        },
        closed: {
            rotate: ["45deg", "0deg", "0deg"],
            top: ["50%", "50%", "35%"],
        },
    },
    middle: {
        open: {
            rotate: ["0deg", "0deg", "-45deg"],
        },
        closed: {
            rotate: ["-45deg", "0deg", "0deg"],
        },
    },
    bottom: {
        open: {
            rotate: ["0deg", "0deg", "45deg"],
            bottom: ["35%", "50%", "50%"],
            left: "50%",
        },
        closed: {
            rotate: ["45deg", "0deg", "0deg"],
            bottom: ["50%", "50%", "35%"],
            left: "calc(50% + 5px)",
        },
    },
};


const Navbar = ({ setShowLogin }) => {

    const { getTotalCartAmount,token, setToken } = useContext(StoreContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setToken("");
        navigate("/")
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='navbar' id='navbar'>
            <a href="/">
                <img src={assets.white} alt="" className="logo" />
            </a>

            <div className="navbar-right">
                {!token?<button onClick={() => setShowLogin(true)} className='transition duration-700 ease-in-out navbar-button'>
                    <span className="hide-text">Sign in</span>
                </button>:<div className='navbar-profile'>
                    <img src={assets.profile_icon} alt=''/>
                    <ul className="nav-profile-dropdown">
                        <li><img src={assets.bag_icon}/><p>Orders</p></li>
                        <hr></hr>
                        <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
                    </ul>
                </div>}
                <div className="navbar-search-icon">
                    <Link to="/cart" >
                       <img src={assets.basket_icon} alt=''/>
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
                </div>
                <div className='navbar-hamburger' onClick={toggleSidebar}>
                    <AnimatedHamburgerButton />
                </div>
            </div>


            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.5 }}
                        className="sidebar"
                    >
                        <div className="flex justify-between items-center">
                            <div className="sidebarlogo">
                                <h2>TunaLK</h2>
                            </div>
                        </div>
                        <ul className="menu-list p-4">
                            <div className='icons'>
                                <a href='#home'>Home</a>
                            </div>
                            <br></br>
                            <div className='icons'>
                                <a href='#about'>About</a>
                            </div>
                            <br></br>
                            <div className='icons'>
                                <a href='#products'>Products</a>
                            </div>
                            <br></br>
                            <div className='icons'>
                                <a href='#contact'>Contact</a>
                            </div>
                            <br></br>
                            <div className='icons'>
                                <a href='#faq'>FAQ</a>
                            </div>
                            <br></br>
                            <div className='icons'>
                                <a href='#privacy-policy'>Privacy Policy</a>
                            </div>
                        </ul>
                        <button className="call-button">
                            Contact US
                        </button>
                        <button className="call-button-2">
                            Download our App
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}

export default Navbar;


