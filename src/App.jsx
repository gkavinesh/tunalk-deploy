import React, { useState } from 'react'
import Navbar from './components/navbar/navbar'
import { Route, Routes, useActionData } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Cart from './pages/Cart/Cart'
import Footer from './components/footer/footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Banner from './components/banner/banner'
import MainCat from './components/explore/maincat'
import Fish from './pages/Fish/Fish'
import FishDetails from './pages/Fish/FishDetails'
import Policy from '..//src/pages/PrivacyPolicy/Policy'

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
        <Route path='/fishdetails' element={<FishDetails/>} />
        <Route path='/policy' element={<Policy/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App

