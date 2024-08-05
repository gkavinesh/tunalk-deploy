import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Add from "./pages/Add/Add";
import Order from "./pages/Orders/Orders";
import List from "./pages/List/List";
import Payment from "./pages/Payments/payment";
import Login from "./pages/Login/Login";

const App = () => {
  const url = "http://localhost:4000";

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <Route
            element={
              <>
                <Navbar />
                <div className='app-content'>
                  <Sidebar />
                  <Routes>
                    <Route path='/add' element={<Add url={url} />} />
                    <Route path='/list' element={<List url={url} />} />
                    <Route path='/orders' element={<Order url={url} />} />
                    <Route path='/payment' element={<Payment url={url} />} />
                    <Route path="*" element={<Navigate to="/add" />} />
                  </Routes>
                </div>
              </>
            }
          />
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </div>
  );
};

export default App;


