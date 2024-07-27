import React, { useContext, useState } from 'react';
import './banner.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const Banner = ({ setShowLogin }) => {

  return (
    <div className='back-1'>
      <div className='banner' id='banner'>
        <ul className="banner-menu">
          <a href="https://ibb.co/Pc4sjdb" className="download-link" target="_blank" rel="noopener noreferrer">
            Download our App - 
            <img src={assets.apple} alt='iOS' className='app-logo' />
            <img src={assets.android} alt='Android' className='app-logo' />
          </a>
          <a href='#footer' >Support</a>
          <a href='#shop' >Offers</a>
          
        </ul>
        <div className="banner-right">
        <a href="tel:077-529-1291" className='download-link-2'>
            <img src={assets.phone} alt='iOS' className='other-logo' />
            077-529-1291
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
