import React from 'react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import {Routes,Route} from 'react-router-dom'

const App = () => {

  const url = "http://localhost:4000";

  return (
    <div>
      <Routes>
        <Route path='/' element={<Login/>}/>
      </Routes>
      <Home/>
    </div>
  )
}

export default App

