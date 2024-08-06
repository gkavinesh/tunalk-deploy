// src/pages/Homepage/Homepage.jsx

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Add from '../Add/Add';
import Order from '../Orders/Orders';
import List from '../List/List';
import Payment from '../Payments/payment';
import Checkout from '../Checkout/Checkout';

const Homepage = ({ url }) => {
  return (
    <div>
      <Navbar />
      <div className='app-content'>
        <Sidebar />
        <Routes>
          <Route path='/add' element={<Add url={url} />} />
          <Route path='/list' element={<List url={url} />} />
          <Route path='/orders' element={<Order url={url} />} />
          <Route path='/payment' element={<Payment url={url} />} />
          <Route path='/checkout' element={<Checkout url={url} />} />
        </Routes>
      </div>
    </div>
  );
};

export default Homepage;
