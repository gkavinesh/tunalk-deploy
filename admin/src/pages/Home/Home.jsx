import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from "../Add/Add"
import Order from "../Orders/Orders"
import List from "../List/List"
import Payment from "../Payments/payment"

const Home = () => {

  const url = "http://localhost:4000";

  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <div className='app-content'>
        <Sidebar/>
        <Routes>
          <Route path='/add' element={<Add url={url}/>}/>
          <Route path='/list' element={<List url={url}/>}/>
          <Route path='/orders' element={<Order url={url}/>}/>
          <Route path='/payment' element={<Payment url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default Home