import React, { useContext, useState } from 'react';
import './banner.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Banner = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className='back-1'>
      <div className='banner' id='banner'>
        <ul className="banner-menu">
          <a href='#' className='download-link'>
            Download our App - 
            <img src={assets.apple} alt='iOS' className='app-logo' />
            <img src={assets.android} alt='Android' className='app-logo' />
          </a>
          <a href='#products' >Support</a>
          <a href='#about' >Offers</a>
          <a href='#footer'>Order Tracking</a>
        </ul>
        <div className="banner-right">
        <a href='#' className='download-link-2'>
            <img src={assets.phone} alt='iOS' className='other-logo' />
            077-777-7777
        </a>
        <a href='#' className='download-link-2'>
            <img src={assets.fastdelivery} alt='iOS' className='other-logo' />
             Delivery in 1 Hour
        </a>
          
        </div>
      </div>
    </div>
  );
}

export default Banner;
