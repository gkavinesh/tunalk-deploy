import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import DeliveryArea from './pages/DeliveryArea/DeliveryArea';
import Home from './pages/Home/Home';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Cart from './pages/Cart/Cart';
import Footer from './components/footer/footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Banner from './components/banner/banner';
import FAQ from './pages/FAQ/faq';
import Fish from './pages/Fish/Fish';
import FishDetails from './pages/Fish/FishDetails';
import Orders from './pages/Orders/Orders';
import Payment from './pages/Payment/Payment';
import ScrollToTop from './components/scrollToTop/ScrollToTop';
import Preloader from './components/Preloader/preloader';
import Verify from './pages/Verify/Verify';
import Apple from './pages/Phone/Download';
import Redirect from './pages/Redirect/Redirect';

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Use useLocation hook to track route changes

  useEffect(() => {
    // Show the preloader on route changes
    setIsLoading(true);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulated delay for loading (adjust as needed)

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [location]); // Run effect on location change

  return (
    <>
      <Preloader isLoading={isLoading} />
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        <Banner />
        <Navbar setShowLogin={setShowLogin} />
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/fish' element={<Fish />} />
          <Route path='/fish-overview' element={<FishDetails />} />
          <Route path='/faq' element={<FAQ />} />
          <Route path='/delivery-area' element={<DeliveryArea />} />
          <Route path='/payment' element={<Payment />} />
          <Route path='/myorders' element={<Orders />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/download' element={<Apple/>}/>
          <Route path='/redirect' element={<Redirect/>}/>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;



