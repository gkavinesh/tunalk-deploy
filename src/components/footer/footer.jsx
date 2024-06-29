import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const footer = () => {
  return (
    <div className='footer'id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
            <img src={assets.tuna}alt="" style={{ width: '220px', height: '40px' }} className='logo' />
                <p>Tunalk offers the finest fresh seafood, sourced daily and delivered with care. Our commitment to quality ensures every product, from shrimp to fish fillets, meets the highest standards of freshness and taste. For gourmet meals or casual gatherings, trust Tunalk for seafood excellence. Explore our range and taste the difference.</p>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>home</li>
                    <li>products</li>
                    <li>delivery areas</li>
                    <li>privacy policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>075-999-9999</li>
                    <li>contact@tuna.com</li>
                    <li><a href="#">Get our Mobile App</a></li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className='footer-copyright'>Copyright 2024 © Tuna.lk - All Rights Reserved | Designed by 12BK Pvt Ltd</p>
    </div>
    
    
  )
}

export default footer
