import React, { useState } from 'react'
import Navbar from './components/navbar/navbar'
import { Route, Routes, useActionData } from 'react-router-dom'
import DeliveryArea from './pages/DeliveryArea/DeliveryArea'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/footer/footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Banner from './components/banner/banner'
import FAQ from './pages/FAQ/faq'
import Fish from './pages/Fish/Fish'
import FishDetails from './pages/Fish/FishDetails'
import Orders from './pages/Orders/Orders'
import Payment from './pages/Payment/Payment'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Banner/>
      <Navbar setShowLogin= {setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
        <Route path='/fish' element={<Fish/>} />
        <Route path='/fish-overview' element={<FishDetails/>} />
        <Route path='/faq' element={<FAQ/>} />
        <Route path='/delivery-area' element={<DeliveryArea/>} />
        <Route path='/payment' element={<Payment/>} />
        <Route path='/myorders' element={<Orders/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App

