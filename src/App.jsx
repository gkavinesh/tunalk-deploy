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

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    <div className='app'>
      <Banner/>
      <Navbar setShowLogin= {setShowLogin}/>
      <MainCat/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/order' element={<PlaceOrder/>} />
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App

